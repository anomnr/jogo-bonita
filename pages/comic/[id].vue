<template>
  <main class="min-h-screen bg-black text-white pb-20">
    
    <!-- Top Navigation Bar -->
    <header class="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center justify-between">
      <NuxtLink to="/comic" class="flex items-center text-white/60 hover:text-white transition-colors gap-2 group">
        <div class="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        <span class="hidden sm:inline font-medium tracking-wide">Kembali ke Daftar</span>
      </NuxtLink>
      
      <h1 class="text-lg font-bold tracking-widest uppercase">
        Bab {{ currentId }}
      </h1>
      
      <!-- Placeholder to keep center aligned -->
      <div class="w-[104px] sm:w-[170px]"></div> 
    </header>

    <!-- Comic Viewer -->
    <section class="w-full max-w-4xl mx-auto px-0 sm:px-4 mt-8 flex justify-center min-h-[50vh]">
      <NuxtImg 
        provider="cloudinary"
        :src="`Episode_${currentId}.png`" 
        :alt="`Episode ${currentId}`" 
        width="1200"
        sizes="sm:100vw md:800px lg:1200px"
        format="webp"
        class="w-full max-w-4xl mx-auto object-contain"
      />
    </section>

    <!-- Bottom Navigation -->
    <nav class="max-w-4xl mx-auto px-4 mt-12 flex justify-between items-center gap-4">
      <!-- Previous Button -->
      <NuxtLink 
        v-if="hasPrev"
        :to="prevLink" 
        class="flex-1 flex justify-center items-center py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Prev
      </NuxtLink>
      <div 
        v-else
        class="flex-1 flex justify-center items-center py-4 rounded-xl bg-white/[0.02] border border-white/5 text-white/30 font-bold cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Prev
      </div>

      <!-- Next Button -->
      <NuxtLink 
        v-if="hasNext"
        :to="nextLink" 
        class="flex-1 flex justify-center items-center py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-all"
      >
        Next
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
      <div 
        v-else
        class="flex-1 flex justify-center items-center py-4 rounded-xl bg-white/[0.02] border border-white/5 text-white/30 font-bold cursor-not-allowed"
      >
        Mentok Raw
      </div>
    </nav>
    
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false, // Hide default layout (navbar/footer) for distraction-free reading
  key: (route) => route.fullPath, // Force component remount on param change
  pageTransition: false,
  layoutTransition: false
})

const route = useRoute()
const currentId = computed(() => {
  const id = parseInt(route.params.id as string)
  return isNaN(id) ? 0 : id
})

// Comic data logic
const maxEpisode = 3

// Navigation logic
const hasNext = computed(() => currentId.value < maxEpisode)
const hasPrev = computed(() => currentId.value > 0)
const nextLink = computed(() => `/comic/${currentId.value + 1}`)
const prevLink = computed(() => `/comic/${currentId.value - 1}`)

useHead(() => ({
  title: `Bab ${currentId.value} - JOGO BONITA`,
  meta: [
    { name: 'description', content: `Baca Jogo Bonita Bab ${currentId.value}.` }
  ]
}))
</script>
