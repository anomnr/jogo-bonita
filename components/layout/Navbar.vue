<template>
  <UiResizableNavbar>
    <UiResizableNavBody collapsed-width="1040px">

      <NuxtLink to="/" class="group relative z-20 flex shrink-0 cursor-pointer items-center gap-3">
        <img
          src="/images/jogobonitalogo3.png"
          alt="Jogo Bonita"
          class="h-12 w-12 shrink-0 object-contain transition-all duration-500"
        />
        <div class="flex flex-col">
          <span class="font-accent text-2xl leading-tight tracking-wider text-white transition-colors duration-300 group-hover:text-jogo-cyan">
            Jogo Bonita
          </span>
          <span class="brand-sub block overflow-hidden text-[8px] font-mono uppercase tracking-[0.2em] text-white/40">
            Official Dossier
          </span>
        </div>
      </NuxtLink>

      <UiTubelightNavbar :items="navItems" variant="embedded" />

      <UiNavbarButton to="/contact" variant="primary" class="z-20 shrink-0">
        ReBell Squad
      </UiNavbarButton>

    </UiResizableNavBody>
  </UiResizableNavbar>
</template>

<script setup lang="ts">
import { BookOpen, Gamepad2, Home, Images, User } from 'lucide-vue-next'
import type { NavItem } from '~/components/ui/TubelightNavbar.vue'

const navItems: NavItem[] = [
  { name: 'Beranda', url: '/', icon: Home },
  { name: 'Profil', url: '/profile', icon: User },
  { name: 'Galeri', url: '/gallery', icon: Images },
  { name: 'Esports', url: '/esport', icon: Gamepad2 },
  { name: 'Komik', url: '/comic', icon: BookOpen }
]
</script>

<style scoped>
/* The tagline folds away as the bar collapses, buying the nav some room. */
.brand-sub {
  max-height: 1rem;
  opacity: 1;
  transition: max-height 0.4s ease, opacity 0.3s ease;
}

.nav-body--visible .brand-sub {
  max-height: 0;
  opacity: 0;
}
</style>
