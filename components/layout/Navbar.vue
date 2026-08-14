<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500" 
    :class="{ 
      'py-2.5 bg-jogo-void/80 backdrop-blur-2xl border-b border-white/[0.06]': isScrolled || isMenuOpen, 
      'py-5 bg-transparent border-b border-transparent': !isScrolled && !isMenuOpen 
    }"
  >
    <div class="mx-auto px-5 md:px-8 max-w-[1400px] flex items-center justify-between">
      
      <NuxtLink to="/" class="flex items-center gap-3 group relative cursor-pointer z-50">
        <div class="w-11 h-11 rounded-full bg-transparent p-0.5 flex items-center justify-center">
          <img src="/images/jogobonitalogo3.png" alt="Jogo Bonita" class="w-14 h-14 object-contain" />
        </div>
        <div class="flex flex-col">
          <span class="font-accent text-2xl tracking-wider text-white group-hover:text-teal-400 transition-colors duration-300">Jogo Bonita</span>
          <span class="text-[8px] font-mono tracking-[0.2em] uppercase text-white/40 -mt-0.5">Official Dossier</span>
        </div>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-0.5 bg-white/[0.03] p-1 rounded-xl border border-white/[0.05]">
        <NuxtLink 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path"
          class="px-4 py-2 rounded-lg text-[11px] font-medium tracking-wider uppercase transition-all duration-300 relative text-white/60 hover:text-white hover:bg-white/[0.05]"
          exact-active-class="!text-jogo-void !bg-teal-400 font-bold"
        >
          {{ link.name }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3 z-50">
        <NuxtLink 
          to="/contact" 
          class="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-400 text-jogo-void text-[11px] font-bold tracking-wider uppercase hover:bg-teal-300 transition-colors duration-300 active:scale-[0.97]"
        >
          ReBell Squad
        </NuxtLink>

        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden text-white focus:outline-none p-2 ml-1 transition-transform active:scale-95"
          aria-label="Toggle Mobile Menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

    </div>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="md:hidden absolute top-full left-0 right-0 bg-jogo-void/95 backdrop-blur-2xl border-b border-white/[0.06]">
        <nav class="flex flex-col p-5 space-y-1.5">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            @click="isMenuOpen = false"
            class="px-4 py-3 rounded-xl text-sm font-medium tracking-wider uppercase transition-all duration-300 text-white/60 hover:text-white hover:bg-white/[0.04]"
            exact-active-class="!text-jogo-void !bg-teal-400 font-bold"
          >
            {{ link.name }}
          </NuxtLink>

          <NuxtLink 
            to="/contact" 
            @click="isMenuOpen = false"
            class="sm:hidden mt-3 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-400 text-jogo-void text-[11px] font-bold tracking-wider uppercase text-center active:scale-[0.97] transition-transform"
          >
            Join ReBell Squad
          </NuxtLink>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const navLinks = [
  { name: 'Beranda', path: '/' },
  { name: 'Profil', path: '/profile' },
  { name: 'Galeri', path: '/gallery' },
  { name: 'Esports', path: '/esport' },
  { name: 'Komik', path: '/comic' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>