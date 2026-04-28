<template>
  <footer class="relative bg-jogo-dark border-t border-jogo-light/15 overflow-hidden">
    <div class="absolute inset-0 footer-grid pointer-events-none"></div>

    <div class="container mx-auto px-4 py-12 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p class="text-[10px] uppercase tracking-[0.35em] text-jogo-light/45 mb-3">
            Jogo Bonita
          </p>

          <h2 class="font-accent text-5xl leading-none mb-4">
            ReBell Squad
          </h2>

          <p class="text-sm text-jogo-light/65 leading-relaxed max-w-sm">
            Rumah dukungan untuk Bella JKT48. Menjaga dalam senyap, bergerak rapi,
            dan merayakan setiap langkah kecilnya bersama.
          </p>
        </div>

        <div>
          <h3 class="text-sm font-black uppercase tracking-[0.25em] mb-4">
            Navigasi
          </h3>

          <div class="flex flex-col gap-3 text-sm text-jogo-light/65">
            <NuxtLink to="/" class="hover:text-jogo-light transition">Beranda</NuxtLink>
            <NuxtLink to="/profile" class="hover:text-jogo-light transition">Profil</NuxtLink>
            <NuxtLink to="/gallery" class="hover:text-jogo-light transition">Galeri</NuxtLink>
            <NuxtLink to="/contact" class="hover:text-jogo-light transition">Kontak</NuxtLink>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-black uppercase tracking-[0.25em] mb-4">
            Hashtag
          </h3>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in tags"
              :key="tag"
              class="rounded-full border border-jogo-light/15 bg-jogo-light/5 px-3 py-1.5 text-xs text-jogo-light/65"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <div class="mt-12 pt-6 border-t border-jogo-light/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p class="text-xs text-jogo-light/45">
          © {{ new Date().getFullYear() }} Jogo Bonita. Built with love for Bella.
        </p>

        <p class="text-[10px] uppercase tracking-[0.25em] text-jogo-light/40">
          Mari Menjaga Dalam Senyap
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const tags = [
  '#ReBell',
  '#Bellive',
  '#Belltemu',
  '#Bellajar',
  '#RaBonita',
]
</script>

<style scoped>
.footer-grid {
  opacity: 0.045;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.55) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.55) 1px, transparent 1px);
  background-size: 34px 34px;
}
</style>