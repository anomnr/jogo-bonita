<template>
  <header
    class="nav-shell fixed inset-x-0 top-0 z-50 w-full px-4 pt-3 md:px-6 md:pt-4"
    :class="{ 'nav-shell--tucked': tucked }"
  >
    <slot />
  </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue'
import { navbarVisibleKey } from '~/utils/navbarVisible'

const props = withDefaults(
  defineProps<{
    /** Scroll distance (px) after which the bar collapses into its pill form */
    threshold?: number
    /** Ignore direction changes smaller than this, so jitter doesn't flap the bar */
    directionTolerance?: number
  }>(),
  { threshold: 100, directionTolerance: 8 }
)

const visible = ref(false)
provide(navbarVisibleKey, visible)

/**
 * Mobile only: scrolling down tucks the top bar away, leaving just the bottom
 * dock. Scrolling back up — or returning near the top — brings it back.
 */
const tucked = ref(false)
let lastY = 0

const onScroll = () => {
  const y = window.scrollY
  visible.value = y > props.threshold

  if (y <= props.threshold) {
    tucked.value = false
  } else if (Math.abs(y - lastY) > props.directionTolerance) {
    tucked.value = y > lastY
  }

  lastY = y
}

onMounted(() => {
  lastY = window.scrollY
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.nav-shell {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
}

/* Desktop keeps the header at all times — it only collapses (see NavBody). */
@media (max-width: 767px) {
  .nav-shell--tucked {
    /* Safe to transform: the tubelight dock teleports to <body> at this
       breakpoint, so no position:fixed descendant gets trapped here. */
    transform: translateY(-130%);
    opacity: 0;
    pointer-events: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-shell {
    transition: opacity 0.2s ease;
  }

  .nav-shell--tucked {
    transform: none;
    visibility: hidden;
  }
}
</style>
