<template>
  <!-- On mobile the bar is position:fixed, so it must not sit inside an ancestor
       that gets a transform — that would turn it into a positioned child and drag
       it around with the header. Teleporting to <body> keeps it docked. -->
  <Teleport to="body" :disabled="!isDocked">
    <div :class="rootClass">
      <div
        ref="barEl"
        class="relative flex items-center gap-1 md:gap-3 rounded-full border border-white/[0.07] bg-jogo-void/40 px-1 py-1 shadow-lg shadow-black/40 backdrop-blur-xl"
      >
        <!-- The "tubelight": a single element that slides between items -->
        <div
          class="pointer-events-none absolute left-0 top-0 rounded-full bg-jogo-cyan/10 ring-1 ring-inset ring-jogo-cyan/25"
          :class="hasMeasured && 'lamp-animated'"
          :style="lampStyle"
          aria-hidden="true"
        >
          <div class="absolute -top-[5px] left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-jogo-cyan">
            <div class="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-jogo-cyan/25 blur-md" />
            <div class="absolute -top-1 h-6 w-8 rounded-full bg-jogo-cyan/25 blur-md" />
            <div class="absolute left-2 top-0 h-4 w-4 rounded-full bg-jogo-cyan/25 blur-sm" />
          </div>
        </div>

        <NuxtLink
          v-for="(item, index) in items"
          :key="item.name"
          :ref="(el: any) => setLinkRef(el, index)"
          :to="item.url"
          :aria-current="index === activeIndex ? 'page' : undefined"
          :aria-label="item.name"
          class="relative z-10 cursor-pointer rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300 md:px-6 md:text-xs"
          :class="index === activeIndex ? 'text-jogo-cyan' : 'text-white/60 hover:text-white'"
        >
          <span class="hidden md:inline">{{ item.name }}</span>
          <span class="flex md:hidden">
            <component :is="item.icon" :size="18" :stroke-width="2.5" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type Component } from 'vue'
import { useRoute } from 'vue-router'

export interface NavItem {
  /** Label shown on desktop, and the aria-label on mobile */
  name: string
  /** Route path — also used to decide which item is active */
  url: string
  /** Any lucide-vue-next icon component */
  icon: Component
}

const props = withDefaults(
  defineProps<{
    items: NavItem[]
    /**
     * floating  — docks itself: bottom-center on mobile, top-center on desktop
     * embedded  — bottom-center on mobile, inline (in the header flow) on desktop
     */
    variant?: 'floating' | 'embedded'
  }>(),
  { variant: 'floating' }
)

const route = useRoute()

const rootClass = computed(() =>
  props.variant === 'floating'
    ? 'fixed bottom-0 left-1/2 z-50 mb-5 -translate-x-1/2 md:top-0 md:bottom-auto md:mb-0 md:pt-6'
    : 'fixed bottom-0 left-1/2 z-50 mb-5 -translate-x-1/2 md:static md:mb-0 md:flex md:flex-1 md:translate-x-0 md:justify-center'
)

/* ---------------------------------------------------------------
   Active item is derived from the route, not from click state, so
   the lamp stays correct on back/forward and deep links such as
   /comic/42 -> "Komik". Longest matching prefix wins.
--------------------------------------------------------------- */
const activeIndex = computed(() => {
  const path = route.path
  let best = -1
  let bestLength = -1

  props.items.forEach((item, index) => {
    const url = item.url
    const matches = url === '/' ? path === '/' : path === url || path.startsWith(`${url}/`)
    if (matches && url.length > bestLength) {
      best = index
      bestLength = url.length
    }
  })

  return best
})

/* ---------------------------------------------------------------
   Dock mode. Starts false on both the server and the first client
   render so hydration matches, then resolves for real on mount.
--------------------------------------------------------------- */
const isDocked = ref(false)
let mql: MediaQueryList | null = null
const syncDocked = () => {
  isDocked.value = mql?.matches ?? false
}

/* ---------------------------------------------------------------
   Lamp positioning. Framer Motion's `layoutId` is React-only, so the
   slide is done by measuring the active link and moving one absolutely
   positioned element with a CSS transform transition.
--------------------------------------------------------------- */
const barEl = ref<HTMLElement | null>(null)
const linkEls = ref<HTMLElement[]>([])
const hasMeasured = ref(false)
const lamp = ref({ left: 0, top: 0, width: 0, height: 0, visible: false })

const setLinkRef = (el: any, index: number) => {
  const node = (el?.$el ?? el) as HTMLElement | undefined
  if (node instanceof HTMLElement) linkEls.value[index] = node
}

const measure = () => {
  const el = linkEls.value[activeIndex.value]
  if (!el || !barEl.value || !el.offsetWidth) {
    lamp.value = { ...lamp.value, visible: false }
    return
  }

  lamp.value = {
    left: el.offsetLeft,
    top: el.offsetTop,
    width: el.offsetWidth,
    height: el.offsetHeight,
    visible: true
  }
}

const lampStyle = computed(() => ({
  transform: `translate3d(${lamp.value.left}px, ${lamp.value.top}px, 0)`,
  width: `${lamp.value.width}px`,
  height: `${lamp.value.height}px`,
  opacity: lamp.value.visible ? '1' : '0'
}))

watch(
  [activeIndex, isDocked, () => props.items],
  async () => {
    await nextTick()
    measure()
  },
  { deep: true }
)

let observer: ResizeObserver | null = null

onMounted(async () => {
  mql = window.matchMedia('(max-width: 767px)')
  syncDocked()
  mql.addEventListener('change', syncDocked)

  await nextTick()
  measure()
  // Position without animating on the very first paint.
  requestAnimationFrame(() => {
    hasMeasured.value = true
  })

  if (typeof ResizeObserver !== 'undefined' && barEl.value) {
    observer = new ResizeObserver(() => measure())
    observer.observe(barEl.value)
  }
  window.addEventListener('resize', measure)
  // Labels reflow once the webfont lands, which changes every item width.
  document.fonts?.ready.then(() => measure()).catch(() => {})
})

onBeforeUnmount(() => {
  mql?.removeEventListener('change', syncDocked)
  observer?.disconnect()
  window.removeEventListener('resize', measure)
})
</script>

<style scoped>
.lamp-animated {
  transition:
    transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1),
    width 0.45s cubic-bezier(0.34, 1.4, 0.64, 1),
    opacity 0.25s ease;
}

@media (prefers-reduced-motion: reduce) {
  .lamp-animated {
    transition: opacity 0.2s ease;
  }
}
</style>
