<template>
  <div class="min-h-screen bg-jogo-dark text-jogo-light font-sans">
    <section class="w-full relative bg-jogo-dark border-b-4 border-jogo-light/20">
      <div class="w-full h-[40vh] md:h-[60vh] relative overflow-hidden">
        <video
          src="/videos/JKT48 14th Generation Profile_ Bella_1080p.mp4"
          class="w-full h-full object-cover"
          controls
          loop
          playsinline
        />
      </div>
    </section>

    <main class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-2">
          <div class="flex items-center justify-between border-b-2 border-jogo-light mb-6 pb-2">
            <h2 class="font-bold text-2xl uppercase tracking-wider">Berita Terbaru</h2>
            <NuxtLink to="/news" class="text-sm text-jogo-light/70 hover:text-jogo-light transition">
              Lihat Semua &rarr;
            </NuxtLink>
          </div>

          <div class="space-y-4">
            <div
              v-for="(item, index) in newsList"
              :key="index"
              class="flex flex-col md:flex-row gap-4 py-3 border-b border-jogo-light/10 hover:bg-jogo-light/5 transition p-2 rounded cursor-pointer group"
            >
              <div class="flex items-center gap-3 md:w-1/3 shrink-0">
                <span class="text-[10px] font-bold px-3 py-1 bg-jogo-light text-jogo-dark rounded-sm uppercase tracking-widest group-hover:bg-gray-300 transition">
                  {{ item.category }}
                </span>
                <span class="text-sm font-light text-jogo-light/70">{{ item.date }}</span>
              </div>

              <p class="text-sm md:text-base font-medium group-hover:underline flex-1">
                {{ item.title }}
              </p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1 overflow-hidden">
          <div class="flex items-center justify-between border-b-2 border-jogo-light mb-6 pb-2">
            <h2 class="font-bold text-2xl uppercase tracking-wider">Jadwal</h2>

            <div class="flex gap-2">
              <button
                @click="slideLeft"
                class="w-8 h-8 rounded-full border border-jogo-light/30 flex items-center justify-center hover:bg-jogo-light hover:text-jogo-dark transition cursor-pointer"
              >
                &larr;
              </button>

              <button
                @click="slideRight"
                class="w-8 h-8 rounded-full border border-jogo-light/30 flex items-center justify-center hover:bg-jogo-light hover:text-jogo-dark transition cursor-pointer"
              >
                &rarr;
              </button>
            </div>
          </div>

          <div
            ref="slider"
            @mouseenter="stopAutoSlide"
            @mouseleave="startAutoSlide"
            class="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 hide-scrollbar scroll-smooth"
          >
            <div
              v-for="schedule in safeUpcomingSchedules"
              :key="schedule.id"
              class="snap-center shrink-0 w-[85%] bg-jogo-light/5 border border-jogo-light/20 rounded-xl p-6 hover:bg-jogo-light/10 transition group flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <p class="text-xs text-jogo-light/70 mb-2 border-b border-jogo-light/10 pb-2 inline-block">
                  {{ formatDate(schedule.date_time) }}
                </p>

                <h3 class="text-xl font-bold mb-2 group-hover:text-gray-300 transition">
                  {{ schedule.event_name }}
                </h3>
              </div>

              <p class="text-xs flex items-center gap-2 opacity-80 mt-4">
                📍 {{ schedule.location }}
              </p>
            </div>

            <div
              v-if="safeUpcomingSchedules.length === 0"
              class="w-full shrink-0 snap-center text-center py-12 text-jogo-light/50 text-sm italic border border-dashed border-jogo-light/20 rounded-xl"
            >
              Belum ada jadwal terbaru.
            </div>
          </div>

          <div class="mt-6">
            <NuxtLink
              to="/contact"
              class="block bg-gradient-to-br from-jogo-light/10 to-transparent border border-jogo-light/30 rounded-xl p-8 hover:from-jogo-light/20 transition text-center group relative overflow-hidden"
            >
              <div class="absolute -right-4 -top-4 w-16 h-16 bg-jogo-light/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>

              <h3 class="font-accent text-4xl mb-1 group-hover:scale-105 transition-transform drop-shadow-md">
                Join Jogo Bonita
              </h3>

              <p class="text-[10px] uppercase tracking-[0.2em] opacity-70">
                Mari Menjaga Dalam Senyap
              </p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const newsList = ref([
  { title: 'Pengumuman Mengenai Project Ulang Tahun Bella JKT48 2026', category: 'Event', date: '21 April 2026' },
  { title: 'Rekap Keseruan Personal Meet and Greet Festival: LOVE DREAM PASSION', category: 'News', date: '18 April 2026' },
  { title: 'Jadwal Penjualan Tiket 2-Shot & Photocard Bulan April', category: 'Theater', date: '15 April 2026' },
  { title: 'Update Struktur Kepengurusan Fanbase Jogo Bonita', category: 'Other', date: '10 April 2026' },
])

const upcomingSchedules = ref([
  { id: 1, event_name: 'Pajama Drive', date_time: '2026-04-25T19:00:00', location: 'Teater JKT48, fX Sudirman' },
  { id: 2, event_name: 'Aturan Anti Cinta', date_time: '2026-04-28T14:00:00', location: 'Teater JKT48, fX Sudirman' },
  { id: 3, event_name: 'Video Call with JKT48', date_time: '2026-05-02T16:30:00', location: 'Online' },
])

const safeUpcomingSchedules = computed(() => {
  return Array.isArray(upcomingSchedules.value) ? upcomingSchedules.value : []
})

const formatDate = (dateString) => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

  return new Date(dateString).toLocaleString('id-ID', options)
}

const slider = ref(null)
let slideInterval = null

const slideLeft = () => {
  if (slider.value) {
    slider.value.scrollBy({ left: -300, behavior: 'smooth' })
  }
}

const slideRight = () => {
  if (!slider.value) return

  const maxScroll = slider.value.scrollWidth - slider.value.clientWidth

  if (slider.value.scrollLeft >= maxScroll - 10) {
    slider.value.scrollTo({ left: 0, behavior: 'smooth' })
  } else {
    slider.value.scrollBy({ left: 300, behavior: 'smooth' })
  }
}

const stopAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}

const startAutoSlide = () => {
  stopAutoSlide()

  slideInterval = setInterval(() => {
    slideRight()
  }, 5000)
}

onMounted(() => {
  startAutoSlide()
})

onBeforeUnmount(() => {
  stopAutoSlide()
})
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>