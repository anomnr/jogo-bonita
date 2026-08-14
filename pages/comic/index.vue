<template>
  <main class="max-w-7xl mx-auto px-4 pt-24 pb-12 sm:pt-28 md:pt-32">
    
    <!-- Hero Banner Section -->
    <section class="bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-2xl border border-white/[0.08] border-t-white/[0.22] border-l-white/[0.15] rounded-2xl p-5 sm:p-6 md:p-8 mb-8 sm:mb-10">
      
      <!-- Mobile: stack vertically, centered cover -->
      <div class="flex flex-col sm:flex-row gap-5 sm:gap-6 md:gap-8">
        <!-- Cover -->
        <div class="w-2/3 max-w-[200px] mx-auto sm:mx-0 sm:w-1/4 lg:w-1/5 shrink-0">
          <img 
            src="/images/poster.png" 
            alt="JOGO BONITA Cover" 
            class="w-full aspect-[2/3] object-cover rounded-xl shadow-lg border border-white/[0.08] border-t-white/[0.18] border-l-white/[0.12]"
          />
        </div>

        <!-- Info -->
        <div class="flex-1 flex flex-col justify-center text-center sm:text-left">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
            JOGO BONITA
          </h1>
          <p class="text-white/60 font-medium mb-3 sm:mb-4 text-sm">
            Original Story by Jogo Bonita
          </p>
          <p class="text-white/80 leading-relaxed max-w-[65ch] mb-6 sm:mb-8 text-sm md:text-base">
            Christabella Bonita has always dreamed of becoming an idol. As she takes her first steps toward that dream, hope and doubt begin to walk side by side. Every choice, every fear, and every unanswered question pushes her to discover what it truly means to keep believing.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-3 mt-auto">
            <NuxtLink to="/comic/0" class="px-6 sm:px-8 py-3 rounded-lg bg-teal-400 hover:bg-teal-300 hover:shadow-[0_0_30px_rgba(45,212,191,0.15)] text-jogo-void font-bold tracking-wide transition-all duration-300 text-center text-sm sm:text-base">
              BACA DARI BAB 0
            </NuxtLink>
            <NuxtLink :to="`/comic/${chapters[0].id}`" class="px-6 sm:px-8 py-3 rounded-lg bg-gradient-to-br from-white/[0.06] to-white/[0.01] hover:from-white/[0.1] hover:to-white/[0.03] border border-white/[0.1] border-t-white/[0.18] text-white font-bold tracking-wide transition-all duration-300 text-center backdrop-blur-xl text-sm sm:text-base">
              BAB TERBARU
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter List Section -->
    <section>
      <div class="border-b border-white/10 pb-3 sm:pb-4 mb-2">
        <h2 class="text-lg sm:text-xl font-bold text-white uppercase tracking-wider">Chapter List</h2>
      </div>

      <div class="flex flex-col">
        <NuxtLink 
          v-for="chapter in chapters" 
          :key="chapter.id" 
          :to="'/comic/' + chapter.id"
          class="group flex items-center p-3 sm:p-4 border-b border-white/[0.05] hover:bg-gradient-to-r hover:from-white/[0.04] hover:to-transparent transition-all duration-300 gap-3 sm:gap-4 md:gap-6"
        >
          <!-- Thumbnail — smaller on mobile -->
          <div class="w-16 sm:w-24 md:w-32 aspect-video shrink-0 overflow-hidden rounded border border-white/[0.08] border-t-white/[0.15]">
            <img :src="chapter.cover" :alt="chapter.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          
          <!-- Info — allow wrapping on mobile -->
          <div class="flex-1 min-w-0">
            <h3 class="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-teal-400 transition-colors leading-snug">
              {{ chapter.title }}
            </h3>
            <p class="text-white/50 text-xs sm:text-sm mt-1">
              {{ chapter.date }}
            </p>
          </div>
          
          <!-- Arrow Icon -->
          <div class="ml-auto text-white/30 group-hover:text-white transition-colors shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useHead({
  title: 'JOGO BONITA - Comic Index',
  meta: [
    { name: 'description', content: 'Baca komik Jogo Bonita.' }
  ]
})

const chapters = ref([
  { id: 3, title: "Bab 3: Teman Yang Menikmati Hasil — The Bitter Truth", date: "12 Aug 2026", cover: "/images/poster.png" },
  { id: 2, title: "Bab 2: Sinyal Hilang, Mimpi Melayang — The Regret", date: "05 Aug 2026", cover: "/images/poster.png" },
  { id: 1, title: "Bab 1: Ambisi Dua Dunia — The Problem", date: "29 Jul 2026", cover: "/images/poster.png" },
  { id: 0, title: "Bab 0: Aku Christabella Bonita — The Beginning", date: "22 Jul 2026", cover: "/images/poster.png" }
])
</script>
