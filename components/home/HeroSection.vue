<template>
  <section class="relative w-full min-h-[78vh] md:min-h-[88vh] bg-jogo-dark overflow-hidden border-b border-jogo-light/15">
    <video
      src="/videos/JKT48 14th Generation Profile_ Bella_1080p.mp4"
      class="absolute inset-0 w-full h-full object-cover opacity-55"
      autoplay
      muted
      loop
      playsinline
    />

    <div class="absolute inset-0 bg-gradient-to-r from-jogo-dark via-jogo-dark/65 to-jogo-dark/20"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-jogo-dark via-transparent to-jogo-dark/40"></div>
    <div class="absolute inset-0 hero-grid pointer-events-none"></div>

    <div class="container mx-auto px-4 relative z-10 min-h-[78vh] md:min-h-[88vh] flex items-center">
      <div class="max-w-3xl pt-20 md:pt-10">
        <p class="hero-fade text-[10px] md:text-xs uppercase tracking-[0.45em] text-jogo-light/60 mb-4">
          Official Fanbase of Christabella
        </p>

        <h1 class="hero-fade delay-1 font-accent text-6xl md:text-8xl lg:text-9xl leading-none mb-5 drop-shadow-2xl">
          Jogo Bonita
        </h1>

        <p class="hero-fade delay-2 text-base md:text-xl text-jogo-light/80 leading-relaxed max-w-2xl mb-8">
          Rumah dukungan untuk Bella JKT48. Menjaga dalam senyap, bergerak dengan rapi,
          dan merayakan setiap langkah kecilnya bersama.
        </p>

        <div class="flex flex-col sm:flex-row gap-3">
          <NuxtLink
            to="/profile"
            class="inline-flex items-center justify-center rounded-full bg-jogo-light text-jogo-dark px-7 py-3 text-xs font-black uppercase tracking-[0.22em] hover:bg-gray-300 transition"
          >
            Kenali Bella
          </NuxtLink>

          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center rounded-full border border-jogo-light/30 bg-jogo-light/5 px-7 py-3 text-xs font-black uppercase tracking-[0.22em] text-jogo-light hover:bg-jogo-light/10 transition"
          >
            Gabung Squad
          </NuxtLink>
        </div>

        <div class="mt-10 grid grid-cols-3 gap-3 max-w-xl">
          <div
            v-for="item in heroStats"
            :key="item.label"
            class="rounded-2xl border border-jogo-light/15 bg-jogo-light/5 backdrop-blur-md px-4 py-4"
          >
            <p class="text-2xl md:text-3xl font-black leading-none">
              {{ item.value }}
            </p>
            <p class="text-[10px] uppercase tracking-[0.2em] text-jogo-light/50 mt-2">
              {{ item.label }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-jogo-light/45">
      <span class="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
      <span class="w-[1px] h-10 bg-jogo-light/30"></span>
    </div>
  </section>
</template>

<script setup>
const heroStats = [
  { value: '14th', label: 'Generation' },
  { value: 'Bella', label: 'Focus' },
  { value: 'ReBell', label: 'Squad' },
]
</script>

<style scoped>
.hero-grid {
  opacity: 0.08;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.55) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.55) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
}
</style>