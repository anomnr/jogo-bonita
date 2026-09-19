<template>
  <section class="hero relative w-full min-h-[100dvh] overflow-hidden border-b border-white/[0.06]">

    <!-- ========== MEDIA STACK ========== -->
    <div class="absolute inset-0" aria-hidden="true">
      <!-- Renders instantly so the section never waits on the video: this is the
           loading state, the reduced-motion state and the error fallback. -->
      <div class="absolute inset-0 bg-[radial-gradient(125%_95%_at_72%_18%,#13253c_0%,#0a1524_45%,#050b14_100%)]"></div>

      <video
        ref="videoEl"
        class="absolute inset-0 h-full w-full object-cover object-[62%_center] transition-opacity duration-1000 ease-out"
        :class="mediaReady ? 'opacity-[0.42]' : 'opacity-0'"
        muted
        loop
        playsinline
        preload="metadata"
        tabindex="-1"
        @loadeddata="onLoadedData"
        @error="onMediaError"
      >
        <source src="/videos/JKT48 14th Generation Profile_ Bella_1080p.mp4" type="video/mp4" />
      </video>

      <!-- Readability wedge: keeps the copy column dark whatever frame is showing.
           Heaviest on the left, where the text sits. -->
      <div class="absolute inset-0 bg-gradient-to-r from-jogo-void via-jogo-void/88 to-jogo-void/25"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-jogo-void via-transparent to-jogo-void/70"></div>

      <div class="hero-grid absolute inset-0"></div>
    </div>

    <!-- ========== CONTENT ========== -->
    <div class="relative mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-10 px-5 pb-28 pt-32 md:px-8 md:pb-32 lg:grid-cols-[1.45fr_0.55fr] lg:pt-36">

      <div class="max-w-2xl">
        <p class="rise flex items-center gap-2.5 text-[10px] uppercase tracking-[0.4em] text-jogo-light/55" :style="{ '--i': 0 }">
          <span class="pulse-dot relative h-1.5 w-1.5 rounded-full bg-jogo-cyan"></span>
          Official Fanbase of Christabella
        </p>

        <h1 class="rise mt-5 font-accent text-5xl leading-[0.95] tracking-tight text-jogo-light md:text-7xl" :style="{ '--i': 1 }">
          Jogo Bonita
        </h1>

        <p class="rise mt-4 max-w-[46ch] text-sm leading-relaxed text-jogo-light/70 md:text-base" :style="{ '--i': 2 }">
          Rumah dukungan untuk Bella JKT48. Menjaga dalam senyap, bergerak dengan rapi,
          dan merayakan setiap langkah kecilnya bersama.
        </p>

        <div class="rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" :style="{ '--i': 3 }">
          <NuxtLink
            to="/profile"
            class="group inline-flex items-center justify-center gap-2 rounded-full bg-jogo-light px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-jogo-void shadow-[0_18px_40px_-20px_rgba(5,11,20,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-[0.98]"
          >
            Kenali Bella
            <ArrowRight :size="14" :stroke-width="2" class="transition-transform duration-300 group-hover:translate-x-1" />
          </NuxtLink>

          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-jogo-light shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-jogo-cyan/30 hover:bg-white/[0.07] active:translate-y-0 active:scale-[0.98]"
          >
            Gabung Squad
          </NuxtLink>
        </div>

        <!-- Stats read as one divided block, not three floating boxes. -->
        <dl
          ref="statsEl"
          class="stats rise mt-12 grid max-w-xl grid-cols-1 divide-y divide-white/[0.08] border-t border-white/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0"
          :style="{ '--i': 4 }"
          @pointermove="onStatsPointer"
          @pointerleave="onStatsLeave"
        >
          <div
            v-for="item in heroStats"
            :key="item.label"
            class="group flex items-baseline justify-between gap-3 py-4 md:block md:px-6 md:py-5 md:first:pl-0"
          >
            <dt class="order-2 text-[9px] uppercase tracking-[0.25em] text-jogo-light/45 md:order-none md:mt-2">
              {{ item.label }}
            </dt>
            <dd class="order-1 text-2xl font-black leading-none text-jogo-light transition-colors duration-300 group-hover:text-jogo-cyan md:order-none md:text-3xl">
              {{ item.value }}
            </dd>
          </div>
        </dl>
      </div>

      <!-- Asymmetric right rail: mostly negative space, one vertical mark. -->
      <div class="hidden justify-end lg:flex">
        <div class="flex flex-col items-center gap-5">
          <span class="h-24 w-px bg-gradient-to-b from-transparent to-white/20"></span>
          <span class="text-[9px] uppercase tracking-[0.5em] text-jogo-light/35 [writing-mode:vertical-rl]">
            Official Dossier
          </span>
          <span class="h-24 w-px bg-gradient-to-t from-transparent to-white/20"></span>
        </div>
      </div>
    </div>

    <!-- ========== KINETIC STRIP ========== -->
    <div class="absolute inset-x-0 bottom-0 border-t border-white/[0.06] bg-jogo-void/40 backdrop-blur-md">
      <div class="marquee py-3">
        <div class="marquee__track">
          <span v-for="(word, i) in tickerLoop" :key="i" class="flex items-center gap-8 pr-8">
            <span class="whitespace-nowrap text-[9px] uppercase tracking-[0.35em] text-jogo-light/40">{{ word }}</span>
            <span class="h-1 w-1 shrink-0 rounded-full bg-jogo-cyan/40"></span>
          </span>
        </div>
      </div>
    </div>

    <div
      class="scroll-cue pointer-events-none absolute bottom-16 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-jogo-light/40 md:flex"
      :class="{ 'scroll-cue--hidden': hasScrolled }"
    >
      <span class="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
      <span class="scroll-rail relative h-10 w-px bg-white/15"></span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowRight } from 'lucide-vue-next'

const heroStats = [
  { value: '14th', label: 'Generation' },
  { value: 'Bella', label: 'Focus' },
  { value: 'ReBell', label: 'Squad' }
]

const ticker = [
  'Jogo Bonita',
  'Bella JKT48',
  '14th Generation',
  'Menjaga dalam senyap',
  'ReBell Squad',
  'Bergerak dengan rapi'
]
// Duplicated so the -50% translate loops seamlessly.
const tickerLoop = [...ticker, ...ticker]

const videoEl = ref<HTMLVideoElement | null>(null)
const statsEl = ref<HTMLElement | null>(null)
const mediaReady = ref(false)
const hasScrolled = ref(false)

const onLoadedData = () => {
  mediaReady.value = true
}

const onMediaError = () => {
  // Leave the gradient backdrop in place; nothing else to do.
  mediaReady.value = false
}

onMounted(() => {
  const el = videoEl.value
  if (!el) return

  const stillOnly = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (stillOnly) {
    // Hold a single frame rather than looping motion behind the copy.
    el.currentTime = 2
    return
  }

  // play() rather than the autoplay attribute: nothing decodes for
  // reduced-motion viewers, and a blocked play falls back to the gradient.
  el.play().catch(() => {
    mediaReady.value = false
  })
})

// Fades the "scroll" cue away as soon as the visitor actually scrolls,
// rather than leaving a stale hint on screen past the hero.
const onScroll = () => {
  hasScrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

/* Spotlight follows the cursor by writing CSS variables straight to the node,
   deliberately outside Vue reactivity so it never triggers a re-render. */
const onStatsPointer = (event: PointerEvent) => {
  const el = statsEl.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', (event.clientX - rect.left) + 'px')
  el.style.setProperty('--my', (event.clientY - rect.top) + 'px')
  el.style.setProperty('--spot', '1')
}

const onStatsLeave = () => {
  statsEl.value?.style.setProperty('--spot', '0')
}
</script>

<style scoped>
.hero-grid {
  opacity: 0.06;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 78%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 78%, transparent);
}

/* ---- staggered entrance (transform + opacity only) ---- */
.rise {
  opacity: 0;
  transform: translate3d(0, 18px, 0);
  animation: rise 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--i, 0) * 110ms);
}

@keyframes rise {
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

/* ---- stats spotlight ---- */
.stats {
  position: relative;
  isolation: isolate;
}

.stats::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--spot, 0);
  transition: opacity 0.35s ease;
  background: radial-gradient(
    240px circle at var(--mx, 50%) var(--my, 50%),
    rgba(0, 242, 254, 0.07),
    transparent 65%
  );
}

/* ---- perpetual micro-interactions ---- */
.pulse-dot::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 9999px;
  border: 1px solid rgba(0, 242, 254, 0.45);
  animation: ping 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

@keyframes ping {
  0% { transform: scale(0.6); opacity: 0.9; }
  70%, 100% { transform: scale(1.9); opacity: 0; }
}

.marquee {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee 38s linear infinite;
  will-change: transform;
}

.marquee:hover .marquee__track {
  animation-play-state: paused;
}

@keyframes marquee {
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

.scroll-cue {
  opacity: 1;
  transform: translate3d(-50%, 0, 0);
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.scroll-cue--hidden {
  opacity: 0;
  transform: translate3d(-50%, 10px, 0);
}

.scroll-rail::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 40%;
  background: linear-gradient(to bottom, transparent, rgba(0, 242, 254, 0.7));
  animation: rail 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

@keyframes rail {
  0% { transform: translateY(-100%); opacity: 0; }
  35% { opacity: 1; }
  100% { transform: translateY(250%); opacity: 0; }
}

/* ---- reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  .rise {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .marquee__track,
  .pulse-dot::after,
  .scroll-rail::after {
    animation: none;
  }

  .scroll-rail::after {
    opacity: 0.6;
    transform: none;
  }

  .scroll-cue {
    transition: opacity 0.2s ease;
  }

  .scroll-cue--hidden {
    transform: none;
  }
}
</style>
