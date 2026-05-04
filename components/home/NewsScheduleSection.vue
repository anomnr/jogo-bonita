<template>
  <main class="container mx-auto px-4 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div class="lg:col-span-2 reveal">
        <div class="flex items-center justify-between border-b-2 border-jogo-light mb-6 pb-2">
          <h2 class="font-bold text-2xl uppercase tracking-wider">Berita Terbaru</h2>

          <NuxtLink to="/news" class="text-sm text-jogo-light/70 hover:text-jogo-light transition">
            Lihat Semua &rarr;
          </NuxtLink>
        </div>

        <div class="space-y-4">
          <NuxtLink
            v-for="item in latestNews"
            :key="item.id"
            :to="`/news/${item.slug}`"
            class="flex flex-col md:flex-row gap-4 py-3 border-b border-jogo-light/10 hover:bg-jogo-light/5 transition p-2 rounded cursor-pointer group"
          >
            <div class="flex items-center gap-3 md:w-1/3 shrink-0">
              <span class="text-[10px] font-bold px-3 py-1 bg-jogo-light text-jogo-dark rounded-sm uppercase tracking-widest group-hover:bg-gray-300 transition">
                {{ item.category }}
              </span>

              <span class="text-sm font-light text-jogo-light/70">
                {{ new Date(item.created_at).toLocaleDateString('id-ID') }}
              </span>
            </div>

            <p class="text-sm md:text-base font-medium group-hover:underline flex-1">
              {{ item.title }}
            </p>
          </NuxtLink>
          <p
            v-if="latestNews.length === 0"
            class="text-sm text-jogo-light/50 italic py-6"
          >
            Belum ada berita terbaru.
          </p>
        </div>
      </div>

      <div class="lg:col-span-1 overflow-hidden reveal reveal-delay-2">
        <div class="flex items-center justify-between border-b-2 border-jogo-light mb-6 pb-2">
          <div>
            <p class="text-[10px] uppercase tracking-[0.3em] text-jogo-light/45 mb-1">
              Upcoming
            </p>
            <h2 class="font-bold text-2xl uppercase tracking-wider">Jadwal</h2>
          </div>

          <div class="flex gap-2">
            <button
              @click="slideLeft"
              aria-label="Geser jadwal ke kiri"
              class="w-9 h-9 rounded-full border border-jogo-light/30 bg-jogo-light/5 flex items-center justify-center hover:bg-jogo-light hover:text-jogo-dark transition cursor-pointer"
            >
              &larr;
            </button>

            <button
              @click="slideRight"
              aria-label="Geser jadwal ke kanan"
              class="w-9 h-9 rounded-full border border-jogo-light/30 bg-jogo-light/5 flex items-center justify-center hover:bg-jogo-light hover:text-jogo-dark transition cursor-pointer"
            >
              &rarr;
            </button>
          </div>
        </div>

        <div class="relative">
          <div class="absolute left-0 top-0 bottom-4 w-10 bg-gradient-to-r from-jogo-dark to-transparent z-10 pointer-events-none"></div>
          <div class="absolute right-0 top-0 bottom-4 w-10 bg-gradient-to-l from-jogo-dark to-transparent z-10 pointer-events-none"></div>

          <div
            ref="slider"
            @mouseenter="stopAutoSlide"
            @mouseleave="startAutoSlide"
            class="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 hide-scrollbar scroll-smooth"
          >
            <div
              v-for="schedule in safeUpcomingSchedules"
              :key="schedule.id"
              class="jb-card snap-center shrink-0 w-[88%] bg-gradient-to-br from-jogo-light/12 via-jogo-light/6 to-transparent border border-jogo-light/20 rounded-2xl p-6 transition duration-300 group flex flex-col justify-between min-h-[190px] relative overflow-hidden"
            >
              <div class="absolute -right-8 -bottom-10 text-[7rem] font-black leading-none text-jogo-light/5 select-none">
                JB
              </div>

              <div class="relative z-10">
                <p class="text-[10px] uppercase tracking-[0.24em] text-jogo-light/45 mb-3">
                  {{ formatDate(schedule.date_time) }}
                </p>

                <h3 class="text-2xl font-black leading-tight mb-5 group-hover:underline decoration-jogo-light/35 underline-offset-4">
                  {{ schedule.event_name }}
                </h3>
              </div>

              <div class="relative z-10 flex items-center justify-between gap-4">
                <p class="text-xs flex items-center gap-2 text-jogo-light/70">
                  <span>📍</span>
                  <span>{{ schedule.location }}</span>
                </p>

                <span class="shrink-0 w-8 h-8 rounded-full border border-jogo-light/20 flex items-center justify-center text-jogo-light/50 group-hover:bg-jogo-light group-hover:text-jogo-dark transition">
                  →
                </span>
              </div>
            </div>

            <div
              v-if="safeUpcomingSchedules.length === 0"
              class="w-full shrink-0 snap-center text-center py-12 text-jogo-light/50 text-sm italic border border-dashed border-jogo-light/20 rounded-xl"
            >
              Belum ada jadwal terbaru.
            </div>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-center gap-2">
          <span
            v-for="schedule in safeUpcomingSchedules"
            :key="`dot-${schedule.id}`"
            class="w-2 h-2 rounded-full bg-jogo-light/25"
          ></span>
        </div>

        <div class="mt-6 reveal reveal-delay-3 rounded-2xl border border-jogo-light/15 bg-gradient-to-br from-jogo-light/10 via-jogo-light/5 to-transparent p-6 md:p-8 relative overflow-hidden">
          <NuxtLink
            to="/contact"
            class="jb-card block bg-gradient-to-br from-jogo-light/12 via-jogo-light/6 to-transparent border border-jogo-light/30 rounded-2xl p-8 transition text-center group relative overflow-hidden"
          >
            <div class="absolute -right-4 -top-4 w-20 h-20 bg-jogo-light/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>

            <p class="text-[10px] uppercase tracking-[0.3em] text-jogo-light/45 mb-2">
              Community
            </p>

            <h3 class="font-accent text-4xl md:text-5xl mb-2 group-hover:scale-105 transition-transform drop-shadow-md">
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
</template>

<script setup lang="ts">

const supabase = useSupabaseClient()

type NewsItem = {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string | null
  image_url: string | null
  source_url: string | null
  published: boolean
  created_at: string
}

const latestNews = ref<NewsItem[]>([])

const fetchNews = async () => {
  const { data, error } = await supabase
    .from('news')
    .select('id, title, slug, category, excerpt, image_url, source_url, published, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(4)

  console.log('HOMEPAGE NEWS DATA:', data)
  console.log('HOMEPAGE NEWS ERROR:', error)

  if (error) {
    alert(error.message)
    console.error('FETCH NEWS ERROR:', error)
    return
  }

  latestNews.value = data || []
}

type ScheduleItem = {
  id: string
  event_name: string
  date_time: string
  location: string
  type: 'SHOW' | 'EVENT'
}

const upcomingSchedules = ref<ScheduleItem[]>([])
const slider = ref<HTMLElement | null>(null)

let slideInterval: ReturnType<typeof setInterval> | null = null

const today = new Date()
today.setHours(0, 0, 0, 0)

const getTodayLocalDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const fetchSchedules = async () => {
  const todayString = getTodayLocalDate()

  console.log('TODAY FILTER:', todayString)

  const { data, error } = await supabase
    .from('shows')
    .select('id, date, type, title, source')
    .gte('date', todayString)
    .order('date', { ascending: true })

  if (error) {
    console.error('FETCH SCHEDULES ERROR:', error)
    return
  }

  console.log('SCHEDULE DATA:', data)

  upcomingSchedules.value = (data || []).map((item) => ({
    id: item.id,
    event_name: item.title,
    date_time: item.date,
    type: item.type,
    location: item.type === 'SHOW' ? 'Teater JKT48, fX Sudirman' : 'Event'
  }))
}

const safeUpcomingSchedules = computed(() => {
  return Array.isArray(upcomingSchedules.value) ? upcomingSchedules.value : []
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const slideLeft = () => {
  if (!slider.value) return

  slider.value.scrollBy({ left: -300, behavior: 'smooth' })
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

onMounted(async () => {
  await Promise.all([
    fetchNews(),
    fetchSchedules()
  ])

  startAutoSlide()
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