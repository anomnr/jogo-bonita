<template>
  <div class="min-h-screen bg-transparent text-jogo-light font-sans py-16 px-4 selection:bg-jogo-light selection:text-jogo-dark">
    <div class="container mx-auto max-w-6xl">

      <div class="text-center mb-16">
        <h1 class="font-accent text-5xl md:text-6xl mb-4 text-jogo-light tracking-wide">Galeri Bonita</h1>
        <p class="text-sm md:text-lg font-light text-jogo-light/80 uppercase tracking-[0.3em]">Jejak Langkah Salju</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div v-for="(photo, index) in gallery" :key="index" class="group relative overflow-hidden rounded-xl border border-jogo-light/20 aspect-square cursor-pointer">
          <img :src="photo.url" :alt="photo.caption" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          
          <div class="absolute inset-0 bg-jogo-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 text-center backdrop-blur-sm">
            <p class="text-jogo-light font-semibold text-lg border-b-2 border-jogo-light/50 pb-2">
              {{ photo.caption }}
            </p>
          </div>
        </div>

      </div>

      <div v-if="gallery.length === 0" class="text-center py-20 border border-dashed border-jogo-light/30 rounded-xl">
        <p class="text-jogo-light/50 font-light text-lg">Burung hantu salju masih mengumpulkan momen indahnya...</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const gallery = ref([
  {
    url: '/images/christabella_bonita.jpg',
    caption: 'Christabella Bonita'
  },
  {
    url: '/images/christabella_bonita1.jpg',
    caption: 'Christabella Bonita'
  },
  {
    url: '/images/christabella_bonita2.jpg',
    caption: 'Christabella Bonita'
  },
  {
    url: '/images/christabella_bonita3.jpg',
    caption: 'Christabella Bonita'
  },
  {
    url: '/images/christabella_bonita4.jpg',
    caption: 'Christabella Bonita'
  },
  {
    url: '/images/christabella_bonita5.jpg',
    caption: 'Christabella Bonita'
  },
  {
    url: '/images/christabella_bonita6.jpg',
    caption: 'Christabella Bonita'
  },
  {
    url: '/images/christabella_bonita7.jpg',
    caption: 'Christabella Bonita'
  },
  {
    url: '/images/christabella_bonita8.jpg',
    caption: 'Christabella Bonita'
  }
])
</script>