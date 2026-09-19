<template>
  <component
    :is="tag"
    v-bind="linkProps"
    class="relative inline-block cursor-pointer rounded-xl px-4 py-2 text-center text-[11px] font-bold uppercase tracking-wider transition duration-200 hover:-translate-y-0.5 active:translate-y-0"
    :class="variantClass"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NuxtLink } from '#components'

const props = withDefaults(
  defineProps<{
    /** Internal route — rendered through NuxtLink */
    to?: string
    /** External URL — rendered as a plain anchor */
    href?: string
    variant?: 'primary' | 'secondary' | 'dark' | 'gradient'
  }>(),
  { variant: 'primary' }
)

const tag = computed(() => {
  if (props.to) return NuxtLink
  if (props.href) return 'a'
  return 'button'
})

const linkProps = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href }
  return { type: 'button' as const }
})

const variantClass = computed(
  () =>
    ({
      primary:
        'bg-teal-400 text-jogo-void shadow-[0_8px_24px_-8px_rgba(45,212,191,0.6)] hover:bg-teal-300',
      secondary: 'bg-transparent text-white/70 shadow-none hover:text-white',
      dark: 'bg-jogo-glass text-white ring-1 ring-inset ring-white/10 hover:bg-jogo-glass/80',
      gradient:
        'bg-gradient-to-b from-jogo-cyan to-jogo-teal text-jogo-void shadow-[inset_0_2px_0_0_rgba(255,255,255,0.3)]'
    })[props.variant]
)
</script>
