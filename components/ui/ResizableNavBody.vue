<template>
  <div
    class="nav-body relative z-[60] mx-auto flex w-full max-w-[1400px] flex-row items-center justify-between gap-4 self-start rounded-full px-4 py-2 md:px-6"
    :class="{ 'nav-body--visible': visible }"
    :style="{ '--nav-collapsed-w': collapsedWidth }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { navbarVisibleKey } from '~/utils/navbarVisible'

withDefaults(
  defineProps<{
    /** Width the bar collapses to on desktop; clamped to the viewport */
    collapsedWidth?: string
  }>(),
  { collapsedWidth: '1040px' }
)

// Falls back to a static bar if rendered outside <UiResizableNavbar>.
const visible = inject(navbarVisibleKey, ref(false))
</script>

<style scoped>
.nav-body {
  width: 100%;
  border: 1px solid transparent;
  background-color: transparent;
  transition:
    width 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.4s ease,
    border-color 0.4s ease,
    box-shadow 0.4s ease;
}

.nav-body--visible {
  background-color: rgb(5 11 20 / 0.7);
  border-color: rgb(255 255 255 / 0.08);
  backdrop-filter: blur(16px);
  box-shadow:
    0 16px 68px rgba(0, 0, 0, 0.45),
    0 0 24px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

/* The width/lift only happens on desktop — mobile keeps the full-bleed bar
   until we settle on its own treatment. */
@media (min-width: 768px) {
  .nav-body--visible {
    width: min(var(--nav-collapsed-w, 1040px), calc(100vw - 3rem));
    transform: translateY(10px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-body {
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }

  .nav-body--visible {
    transform: none;
  }
}
</style>
