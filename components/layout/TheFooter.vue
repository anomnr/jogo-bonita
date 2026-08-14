<template>
  <footer class="relative border-t border-white/[0.06] bg-jogo-void">
    <div class="mx-auto max-w-[1400px] px-5 md:px-8 py-16 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

        <!-- Brand column -->
        <div class="md:col-span-5">
          <span class="font-accent text-3xl text-white block mb-3">Jogo Bonita</span>
          <p class="text-sm text-white/50 leading-relaxed max-w-sm mb-6">
            Rumah dukungan untuk Bella JKT48. Menjaga dalam senyap, bergerak rapi,
            dan merayakan setiap langkah kecilnya bersama.
          </p>
          <p class="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
            Mari Menjaga Dalam Senyap
          </p>
        </div>

        <!-- Navigation -->
        <div class="md:col-span-3">
          <h3 class="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">
            Navigasi
          </h3>
          <div class="flex flex-col gap-3 text-sm text-white/55">
            <NuxtLink to="/" class="hover:text-white transition-colors duration-200">Beranda</NuxtLink>
            <NuxtLink to="/profile" class="hover:text-white transition-colors duration-200">Profil</NuxtLink>
            <NuxtLink to="/gallery" class="hover:text-white transition-colors duration-200">Galeri</NuxtLink>
            <NuxtLink to="/contact" class="hover:text-white transition-colors duration-200">Kontak</NuxtLink>
            <NuxtLink to="/esport" class="hover:text-white transition-colors duration-200">Esports</NuxtLink>
          </div>
        </div>

        <!-- Hashtags -->
        <div class="md:col-span-4">
          <h3 class="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">
            Hashtag
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in tags"
              :key="tag"
              class="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-white/45 transition-colors duration-200 hover:text-white/70 hover:border-white/[0.12]"
            >
              {{ tag }}
            </span>
          </div>
        </div>

      </div>

      <div class="mt-14 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p class="text-xs text-white/35">
          © {{ new Date().getFullYear() }} Jogo Bonita. Built with love for Bella.
        </p>
        <p class="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25">
          ReBell Squad
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const tags = [
  '#Bellove',
  '#BonDia',
  '#BoNoite',
  '#RaBonBon',
  '#Bellajar',
  '#Bonitastic',
  '#Bellive',
  '#Belletter',
  '#Bellagu',
  '#Belltemu',
  '#Bellastseen',
  '#MenantiBella',
  '#Bellakit',
]
</script>