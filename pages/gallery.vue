<template>
  <div class="min-h-screen bg-jogo-dark text-jogo-light font-sans py-16 px-4 selection:bg-jogo-light selection:text-jogo-dark">
    <div class="container mx-auto max-w-6xl">

      <div class="text-center mb-16">
        <h1 class="font-accent text-5xl md:text-6xl mb-4 text-jogo-light tracking-wide">Galeri Bonita</h1>
        <p class="text-sm md:text-lg font-light text-jogo-light/80 uppercase tracking-[0.3em]">Jejak Langkah Salju</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div v-for="(photo, index) in gallery" :key="index" class="group relative overflow-hidden rounded-xl border border-jogo-light/20 aspect-square cursor-pointer">
          <img :src="photo.url" :alt="photo.caption" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0" />
          
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

// Data galeri sementara. Nanti Kakak bisa ganti URL ini dengan foto asli Bella JKT48!
const gallery = ref([
  { url: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', caption: 'Penampilan Spesial Pajama Drive' },
  { url: 'https://images.unsplash.com/photo-1508931134063-e380f9dc83e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', caption: 'Kejutan di Event Handshake' },
  { url: 'https://images.unsplash.com/photo-1493225457224-b15c9b7ff731?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', caption: 'Sesi Foto Jogo Bonita' },
  { url: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', caption: 'Senyum di Atas Panggung' },
  { url: 'https://images.unsplash.com/photo-1524638431109-93d95c968f03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', caption: 'Latihan Bersama Generasi 11' },
  { url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', caption: 'Menyapa Para Fans' }
])
</script>