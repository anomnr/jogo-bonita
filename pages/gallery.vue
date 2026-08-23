<template>
  <div class="min-h-screen bg-transparent text-jogo-light pt-28 pb-24 selection:bg-teal-500/30 selection:text-white">
    <div class="mx-auto max-w-[1400px] px-5 md:px-8">

      <!-- Header Editorial -->
      <div class="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
        <div class="max-w-xl">
          <span class="text-[10px] font-mono uppercase tracking-[0.3em] text-teal-400/70 block mb-4">
            Visual Archive
          </span>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
            Galeri Bonita
          </h1>
        </div>
        <p class="text-sm text-white/50 max-w-sm leading-relaxed md:text-right">
          Kumpulan jejak langkah, panggung, dan momen-momen yang terekam dalam perjalanan Bella JKT48.
        </p>
      </div>

      <!-- Asymmetrical Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 auto-rows-[350px] md:auto-rows-[400px] gap-4 md:gap-5">
        
        <div 
          v-for="(photo, index) in enrichedGallery" 
          :key="index" 
          class="group relative overflow-hidden rounded-xl cursor-pointer reveal border border-white/[0.04] hover:border-white/[0.15] transition-colors duration-500"
          :class="[
            photo.spanClass,
            `reveal-delay-${(index % 4) + 1}`
          ]"
        >
          <!-- Background Image with Ken Burns effect -->
          <div class="absolute inset-0 w-full h-full transform transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]">
            <img 
              :src="photo.url" 
              :alt="photo.title" 
              class="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
          </div>
          
          <!-- Gradient Scrim for text legibility -->
          <div class="absolute inset-0 bg-gradient-to-t from-jogo-void via-jogo-void/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

          <!-- Top-right Meta Tag -->
          <div class="absolute top-4 right-4 z-10 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <span class="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-mono tracking-widest uppercase text-white rounded-full">
              {{ photo.category }}
            </span>
          </div>

          <!-- Bottom Content Info -->
          <div class="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6 flex flex-col justify-end h-full">
            <div class="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              
              <div class="flex items-center gap-3 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <span class="text-[10px] font-mono text-teal-400 uppercase tracking-widest">
                  {{ photo.date }}
                </span>
                <span class="w-1 h-1 rounded-full bg-white/30"></span>
                <span class="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                  {{ photo.location }}
                </span>
              </div>

              <h3 class="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-lg group-hover:text-teal-50 transition-colors">
                {{ photo.title }}
              </h3>
            </div>
          </div>
        </div>

      </div>

      <!-- Empty state fallback -->
      <div v-if="enrichedGallery.length === 0" class="flex flex-col items-center justify-center py-32 border border-dashed border-white/[0.08] rounded-xl mt-8">
        <span class="text-4xl mb-4 opacity-20">📷</span>
        <p class="text-white/40 text-sm font-mono uppercase tracking-widest">Arsip Kosong</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'

const rawGallery = [
  { url: '/images/christabella_bonita.jpg', title: 'Kabesha', date: '14 Feb 26', location: 'JKT48 Theater', category: 'Photograph' },
  { url: '/images/christabella_bonita1.jpg', title: 'Instagram', date: '13 Mei 26', location: 'JKT48 Theater', category: 'Photograph' },
  { url: '/images/christabella_bonita2.jpg', title: 'Instagram', date: '13 Mei 26', location: 'JKT48 Theater', category: 'Photograph' },
  { url: '/images/christabella_bonita3.jpg', title: 'Instagram', date: '27 Mei 26', location: 'JKT48 Theater', category: 'Photograph' },
  { url: '/images/christabella_bonita4.jpg', title: 'Instagram', date: '27 Mei 26', location: 'JKT48 Theater', category: 'Photograph' },
  { url: '/images/christabella_bonita5.jpg', title: 'Instagram', date: '03 Jun 26', location: 'Cafe', category: 'Photograph' },
  { url: '/images/christabella_bonita6.jpg', title: 'Instagram', date: '03 Jun 26', location: 'Cafe', category: 'Photograph' },
  { url: '/images/christabella_bonita7.jpg', title: 'Instagram', date: '03 Jun 26', location: 'Cafe', category: 'Photograph' },
  { url: '/images/christabella_bonita8.jpg', title: 'Instagram', date: '03 Jun 26', location: 'Cafe', category: 'Photograph' },
  { url: '/images/christabella_bonita9.jpg', title: 'Instagram', date: '04 Jul 26', location: 'JKT48 Theater', category: 'Photograph' },
  { url: '/images/christabella_bonita10.jpg', title: 'Instagram', date: '04 Jul 26', location: 'JKT48 Theater', category: 'Photograph' },
  { url: '/images/christabella_bonita11.jpg', title: 'Instagram', date: '04 Jul 26', location: 'JKT48 Theater', category: 'Photograph' },
  { url: '/images/christabella_bonita12.jpg', title: 'Instagram', date: '04 Jul 26', location: 'JKT48 Theater', category: 'Photograph' }
]

// Create an asymmetrical bento grid by assigning custom span classes to specific indices
const enrichedGallery = computed(() => {
  return rawGallery.map((photo, index) => {
    let spanClass = 'md:col-span-4' // Default 1/3 width

    // Asymmetric pattern mapping yang lebih ramah resolusi dan foto portrait
    if (index === 0) spanClass = 'md:col-span-4 md:row-span-2'
    else if (index === 1) spanClass = 'md:col-span-4'
    else if (index === 2) spanClass = 'md:col-span-4 md:row-span-2'
    else if (index === 3) spanClass = 'md:col-span-4'
    else if (index === 4) spanClass = 'md:col-span-3 md:row-span-2'
    else if (index === 5) spanClass = 'md:col-span-5'
    else if (index === 6) spanClass = 'md:col-span-4'
    else if (index === 7) spanClass = 'md:col-span-5'
    else if (index === 8) spanClass = 'md:col-span-4'
    else if (index === 9) spanClass = 'md:col-span-3 md:row-span-2'
    else if (index === 10) spanClass = 'md:col-span-5'
    else if (index === 11) spanClass = 'md:col-span-4'
    else if (index === 12) spanClass = 'md:col-span-4 md:row-span-2'
    
    return { ...photo, spanClass }
  })
})

onMounted(() => {
  // Use Intersection Observer for the scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>