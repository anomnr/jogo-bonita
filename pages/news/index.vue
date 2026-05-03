<template>
  <main class="min-h-screen bg-jogo-dark text-jogo-light font-sans py-20 px-4">
    <section class="container mx-auto max-w-6xl">
      <div class="text-center mb-14">
        <p class="text-[10px] md:text-xs uppercase tracking-[0.45em] text-jogo-light/50 mb-4">
          Jogo Bonita Updates
        </p>

        <h1 class="font-accent text-5xl md:text-7xl tracking-wide mb-5">
          news
        </h1>

        <p class="max-w-2xl mx-auto text-sm md:text-base text-jogo-light/65 leading-relaxed">
          Kumpulan update, pengumuman, dan catatan aktivitas seputar Christabella Bonita dan Jogo Bonita.
        </p>
      </div>

      <div class="grid gap-5">
        <NuxtLink
          v-for="item in newsList"
          :key="item.slug"
          :to="`/news/${item.slug}`"
          class="group jb-card rounded-2xl border border-jogo-light/15 bg-jogo-light/[0.04] hover:bg-jogo-light/[0.08] transition p-6 md:p-8"
        >
          <div class="flex flex-col md:flex-row md:items-start gap-5">
            <div class="md:w-48 shrink-0">
              <span class="inline-flex text-[10px] font-bold px-3 py-1 bg-jogo-light text-jogo-dark rounded-sm uppercase tracking-widest">
                {{ item.category }}
              </span>

              <p class="mt-3 text-xs text-jogo-light/50 uppercase tracking-[0.2em]">
                {{ item.date }}
              </p>
            </div>

            <div class="flex-1">
              <h2 class="text-xl md:text-3xl font-black leading-tight group-hover:underline underline-offset-4 decoration-jogo-light/40">
                {{ item.title }}
              </h2>

              <p class="mt-4 text-sm md:text-base text-jogo-light/65 leading-relaxed">
                {{ item.excerpt }}
              </p>

              <p class="mt-5 text-xs uppercase tracking-[0.25em] text-jogo-light/45 group-hover:text-jogo-light transition">
                Baca selengkapnya →
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { newsList } from '~/data/news'

useHead({
  title: 'News - Jogo Bonita'
})
</script>