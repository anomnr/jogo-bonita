<template>
  <nav
    class="sticky top-0 z-50 w-full border-b border-jogo-light/15 bg-jogo-dark/75 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
  >
    <div class="absolute inset-0 pointer-events-none navbar-grid"></div>

    <div class="container mx-auto px-4 md:px-6 relative">
      <div class="flex items-center justify-between py-3 md:py-4">
        <NuxtLink to="/" class="flex items-center gap-3 group" @click="closeMenu">
          
          <img
            src="/images/Tulisan-putih-versi-BG-transparan.png"
            alt="Jogo Bonita"
            class="h-14 md:h-24 object-contain transition duration-300 group-hover:scale-105"
          />
        </NuxtLink>

        <div class="hidden md:flex items-center gap-2 rounded-full border border-jogo-light/15 bg-jogo-light/5 px-2 py-2">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="nav-link"
            active-class="nav-link-active"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <button
          type="button"
          class="md:hidden w-11 h-11 rounded-xl border border-jogo-light/25 bg-jogo-light/10 text-jogo-light flex items-center justify-center shadow-lg active:scale-95 transition"
          :aria-label="isMenuOpen ? 'Tutup menu' : 'Buka menu'"
          :aria-expanded="isMenuOpen"
          @click="toggleMenu"
        >
          <svg
            v-if="isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="M6 6l12 12" />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        </button>
      </div>

      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-3 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-3 scale-95"
      >
        <div v-if="isMenuOpen" class="md:hidden pb-4">
          <div class="rounded-2xl border border-jogo-light/15 bg-jogo-dark/95 shadow-2xl overflow-hidden">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center justify-between px-5 py-4 text-sm font-bold text-jogo-light/80 border-b border-jogo-light/10 last:border-b-0 hover:bg-jogo-light/10 hover:text-jogo-light transition"
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

<style scoped>
.navbar-grid {
  opacity: 0.05;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.6) 1px, transparent 1px);
  background-size: 28px 28px;
}

.nav-link {
  position: relative;
  padding: 0.65rem 1rem;
  border-radius: 9999px;
  color: rgba(245, 247, 251, 0.72);
  font-size: 0.875rem;
  font-weight: 700;
  transition: all 0.25s ease;
}

.nav-link:hover {
  color: #f5f7fb;
  background: rgba(245, 247, 251, 0.08);
}

.nav-link-active {
  color: #061a33 !important;
  background: #f5f7fb;
  box-shadow: 0 0 24px rgba(245, 247, 251, 0.25);
}
</style>