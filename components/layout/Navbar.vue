<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500" 
    :class="{ 
      'py-3 bg-jogo-void/70 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_30px_0_rgba(0,0,0,0.5)]': isScrolled || isMenuOpen, 
      'py-6 bg-transparent border-b-0': !isScrolled && !isMenuOpen 
    }"
  >
    <div class="container mx-auto px-4 max-w-7xl flex items-center justify-between">
      
      <NuxtLink to="/" class="flex items-center gap-3 group relative cursor-pointer z-50">
        <div class="w-12 h-12 rounded-full bg-transparent p-1 flex items-center justify-center">
          <img src="/images/jogobonitalogo3.png" alt="Jogo Bonita" class="w-15 h-15 object-contain" />
        </div>
        <div class="flex flex-col">
          <span class="font-accent text-2xl md:text-3xl tracking-wider text-white group-hover:text-jogo-cyan transition-colors drop-shadow-md">Jogo Bonita</span>
          <span class="text-[8px] font-mono tracking-[0.25em] uppercase text-jogo-champagne -mt-1 opacity-90 font-semibold">Official Dossier</span>
        </div>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-1 bg-white/[0.02] p-1.5 rounded-full border border-white/[0.05] backdrop-blur-lg">
        <NuxtLink 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path"
          class="px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 relative text-white/70 hover:text-white hover:bg-white/[0.05]"
          exact-active-class="!text-jogo-void !bg-jogo-cyan font-bold shadow-[0_0_20px_rgba(0,242,254,0.6)]"
        >
          {{ link.name }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3 z-50">
        <NuxtLink 
          to="/contact" 
          class="hidden sm:block relative px-5 py-2.5 rounded-full bg-gradient-to-r from-jogo-cyan to-jogo-teal text-jogo-void text-xs font-bold tracking-wider uppercase overflow-hidden group hover:shadow-[0_0_25px_rgba(0,242,254,0.5)] transition-all duration-500 cursor-pointer"
        >
          <span class="absolute inset-0 w-full h-full bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          <span class="relative flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-jogo-void animate-ping"></span>
            ReBell Squad
          </span>
        </NuxtLink>

        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden text-white focus:outline-none p-2 ml-1 transition-transform active:scale-95"
          aria-label="Toggle Mobile Menu"
        >
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

    </div>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-full opacity-0"
    >
      <div v-if="isMenuOpen" class="md:hidden absolute top-full left-0 right-0 bg-jogo-void/95 backdrop-blur-3xl border-b border-white/[0.08] shadow-2xl -z-10">
        <nav class="flex flex-col p-6 space-y-3">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            @click="isMenuOpen = false"
            class="px-5 py-3.5 rounded-xl text-sm font-medium tracking-wider uppercase transition-all duration-300 text-white/70 hover:text-white hover:bg-white/[0.05]"
            exact-active-class="!text-jogo-void !bg-jogo-cyan font-bold shadow-[0_0_20px_rgba(0,242,254,0.6)]"
          >
            {{ link.name }}
          </NuxtLink>

          <NuxtLink 
            to="/contact" 
            @click="isMenuOpen = false"
            class="sm:hidden mt-4 relative px-5 py-3.5 rounded-xl bg-gradient-to-r from-jogo-cyan to-jogo-teal text-jogo-void text-xs font-bold tracking-wider uppercase text-center overflow-hidden group shadow-[0_0_15px_rgba(0,242,254,0.3)] block"
          >
            <span class="relative flex items-center justify-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-jogo-void animate-ping"></span>
              Join ReBell Squad
            </span>
          </NuxtLink>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false) // State penentu HP menu terbuka/tutup

const navLinks = [
  { name: 'Beranda', path: '/' },
  { name: 'Profil', path: '/profile' },
  { name: 'Galeri', path: '/gallery' },
  { name: 'Esports', path: '/esport' }
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