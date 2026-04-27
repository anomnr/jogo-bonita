<template>
  <nav class="w-full bg-jogo-dark/80 backdrop-blur-lg border-b border-jogo-light/20 sticky top-0 z-50">
    <div class="container mx-auto px-4 md:px-6">
      <div class="py-3 md:py-4 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center group min-w-0" @click="closeMenu">
          <img
            src="/images/jogobonitalogo2.png"
            alt="Logo"
            class="h-9 w-9 md:h-10 md:w-10 object-contain shrink-0"
          />

          <img
            src="/images/Tulisan biru versi BG transparan.png"
            alt="Jogo Bonita"
            class="h-14 md:h-24 object-contain transition duration-300 group-hover:scale-105"
          />
        </NuxtLink>

        <div class="hidden md:flex items-center gap-8 font-semibold text-sm">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="relative text-jogo-light/80 hover:text-jogo-light transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-jogo-light after:transition-all hover:after:w-full"
            active-class="text-jogo-light after:w-full"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <button
          type="button"
          class="md:hidden relative w-11 h-11 rounded-xl border border-jogo-light/20 bg-jogo-light/5 flex items-center justify-center hover:bg-jogo-light/10 transition"
          :aria-label="isMenuOpen ? 'Tutup menu' : 'Buka menu'"
          :aria-expanded="isMenuOpen"
          @click="toggleMenu"
        >
          <span class="sr-only">Menu</span>

          <span class="relative block w-5 h-4">
            <span
              class="absolute left-0 top-0 h-[2px] w-5 bg-jogo-light rounded-full transition duration-300"
              :class="isMenuOpen ? 'translate-y-[7px] rotate-45' : ''"
            ></span>

            <span
              class="absolute left-0 top-[7px] h-[2px] w-5 bg-jogo-light rounded-full transition duration-300"
              :class="isMenuOpen ? 'opacity-0 translate-x-2' : 'opacity-100'"
            ></span>

            <span
              class="absolute left-0 bottom-0 h-[2px] w-5 bg-jogo-light rounded-full transition duration-300"
              :class="isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''"
            ></span>
          </span>
        </button>
      </div>

      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMenuOpen"
          class="md:hidden pb-4"
        >
          <div class="rounded-2xl border border-jogo-light/15 bg-jogo-dark/95 shadow-2xl overflow-hidden">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center justify-between px-5 py-4 text-sm font-semibold text-jogo-light/80 border-b border-jogo-light/10 last:border-b-0 hover:bg-jogo-light/10 hover:text-jogo-light transition"
              active-class="bg-jogo-light/10 text-jogo-light"
              @click="closeMenu"
            >
              <span>{{ item.label }}</span>
              <span class="text-jogo-light/40">→</span>
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from '#imports'

const route = useRoute()
const isMenuOpen = ref(false)

const navItems = [
  { label: 'Beranda', to: '/' },
  { label: 'Profil', to: '/profile' },
  { label: 'Galeri', to: '/gallery' },
  { label: 'Kontak', to: '/contact' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  }
)
</script>