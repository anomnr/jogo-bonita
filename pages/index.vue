<template>
  <div class="min-h-screen bg-jogo-dark text-jogo-light font-sans overflow-hidden">
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
                aria-label="Geser jadwal ke kiri"
                class="w-8 h-8 rounded-full border border-jogo-light/30 flex items-center justify-center hover:bg-jogo-light hover:text-jogo-dark transition cursor-pointer"
              >
                &larr;
              </button>

              <button
                @click="slideRight"
                aria-label="Geser jadwal ke kanan"
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

    <section id="hashtag-guide" class="relative bg-jogo-dark border-t border-jogo-light/10 py-16 md:py-24">
      <div class="blueprint-grid absolute inset-0 pointer-events-none"></div>
      <div class="absolute -left-24 top-20 w-72 h-72 bg-jogo-light/5 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -right-24 bottom-10 w-72 h-72 bg-jogo-light/5 rounded-full blur-3xl pointer-events-none"></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto text-center mb-12">
          <p class="text-[10px] md:text-xs uppercase tracking-[0.35em] text-jogo-light/60 mb-3">
            Jogo Bonita Playbook
          </p>

          <h2 class="font-accent text-5xl md:text-7xl leading-none mb-5">
            Hashtag Guide
          </h2>

          <p class="text-sm md:text-base text-jogo-light/70 leading-relaxed">
            Panduan hashtag untuk menjaga dukungan tetap rapi, hangat, dan punya identitas yang sama di setiap momen Bella.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          <article
            v-for="(item, index) in hashtagGuides"
            :key="item.tag"
            class="group relative overflow-hidden rounded-2xl border border-jogo-light/15 bg-jogo-light/5 p-6 md:p-7 min-h-[210px] hover:-translate-y-1 hover:bg-jogo-light/10 hover:border-jogo-light/35 transition duration-300"
          >
            <div class="absolute inset-x-0 top-0 h-1 bg-jogo-light/50 group-hover:bg-jogo-light transition"></div>

            <span class="absolute -right-3 -bottom-8 text-[8rem] font-black leading-none text-jogo-light/5 select-none group-hover:text-jogo-light/10 transition">
              #
            </span>

            <div class="relative z-10">
              <div class="flex items-start justify-between gap-4 mb-8">
                <span class="text-[10px] font-bold uppercase tracking-[0.25em] text-jogo-light/60">
                  {{ item.category }}
                </span>

                <span class="text-[10px] font-bold px-2.5 py-1 rounded-full border border-jogo-light/20 text-jogo-light/60">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
              </div>

              <h3 class="font-bold text-2xl md:text-3xl tracking-tight mb-4 group-hover:underline decoration-jogo-light/40 underline-offset-4">
                {{ item.tag }}
              </h3>

              <p class="text-sm md:text-[15px] leading-relaxed text-jogo-light/70">
                {{ item.description }}
              </p>
            </div>
          </article>
        </div>

        <div class="mt-10 rounded-2xl border border-jogo-light/15 bg-gradient-to-br from-jogo-light/10 to-transparent p-6 md:p-8 relative overflow-hidden">
          <div class="absolute right-4 top-2 text-[7rem] font-black leading-none text-jogo-light/5 select-none">
            #
          </div>

          <div class="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p class="text-[10px] uppercase tracking-[0.3em] text-jogo-light/50 mb-2">
                Reminder
              </p>

              <h3 class="text-2xl md:text-3xl font-bold mb-2">
                Pakai sesuai konteks, jaga tetap positif.
              </h3>

              <p class="text-sm text-jogo-light/65 leading-relaxed max-w-2xl">
                Setiap hashtag dibuat sebagai identitas dukungan. Gunakan untuk apresiasi, interaksi, review, dan momen kebersamaan Jogo Bonita.
              </p>
            </div>

            <NuxtLink
              to="/contact"
              class="shrink-0 inline-flex items-center justify-center rounded-full bg-jogo-light text-jogo-dark px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-300 transition"
            >
              Gabung Squad
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
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

const hashtagGuides = [
  {
    category: 'Malam',
    tag: '#BoNoite',
    description: 'Gabungan "boa noite" + "Bonita". Penutup hari yang hangat dengan identitas Bella.',
  },
  {
    category: 'PAP Harian',
    tag: '#RaBonita',
    description: 'Terinspirasi dari hari lahir Bella, Rabu, 2 Maret 2011. Momen spesial mingguan untuk apresiasi dan posting tentang Bella.',
  },
  {
    category: 'Review Penampilan',
    tag: '#Bellajar',
    description: 'Digunakan untuk review penampilan Bella, baik theater, live, maupun event sebagai bentuk dukungan untuk berkembang.',
  },
  {
    category: 'Semangat & Growth',
    tag: '#Bonitasic',
    description: 'Simbol dukungan untuk perjalanan, proses, dan perkembangan Bella dari waktu ke waktu.',
  },
  {
    category: 'Live Streaming',
    tag: '#Bellive',
    description: 'Dipakai saat Bella sedang live agar momen streaming lebih mudah dikumpulkan dan diramaikan.',
  },
  {
    category: 'Balasan PM',
    tag: '#Belletter',
    description: 'Untuk momen interaksi personal saat Bella membalas pesan dari fans.',
  },
  {
    category: 'Music',
    tag: '#Bellagu',
    description: 'Semua tentang suara, lagu, dan karya musik Bella.',
  },
  {
    category: 'VC / Meet & Greet',
    tag: '#Belltemu',
    description: 'Untuk interaksi langsung bersama Bella, baik video call maupun event offline.',
  },
  {
    category: 'Fans Squad',
    tag: '#ReBell',
    description: 'Identitas fans Bella yang solid, loyal, dan bergerak bersama sebagai Jogo Bonita.',
  },
]

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

.blueprint-grid {
  opacity: 0.06;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.55) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.55) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
}
</style>