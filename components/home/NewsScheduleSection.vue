<template>
  <main class="mx-auto max-w-[1400px] px-5 md:px-8 py-16 text-white selection:bg-teal-500/30 selection:text-white">
    
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- NEWS COLUMN -->
      <div class="lg:col-span-7">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.06] pb-5 mb-8 gap-4">
          <div>
            <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Berita Terbaru</h2>
          </div>
          <NuxtLink to="/news" class="text-[11px] font-mono text-white/40 hover:text-white transition-colors flex items-center gap-1.5 font-medium">
            Lihat Semua &rarr;
          </NuxtLink>
        </div>

        <div class="space-y-3">
          <NuxtLink
            v-for="item in latestNews"
            :key="item.id"
            :to="`/news/${item.slug}`"
            class="flex flex-col md:flex-row items-start md:items-center gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-teal-400/30 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer group/news"
          >
            <div class="flex items-center gap-3 md:w-1/3 shrink-0">
              <span class="text-[9px] font-mono font-semibold px-2.5 py-1 bg-white/[0.06] border border-white/[0.08] text-white/70 rounded-lg uppercase tracking-widest group-hover/news:border-teal-400/30 transition-colors">
                {{ item.category }}
              </span>
              <span class="text-xs font-mono text-white/40">
                {{ new Date(item.created_at).toLocaleDateString('id-ID') }}
              </span>
            </div>

            <p class="text-sm md:text-base font-semibold group-hover/news:text-teal-400 transition-colors flex-1 leading-snug">
              {{ item.title }}
            </p>
          </NuxtLink>

          <div
            v-if="latestNews.length === 0"
            class="py-14 text-center border border-dashed border-white/[0.08] rounded-xl"
          >
            <p class="text-[11px] font-mono text-white/40 tracking-wide">Belum ada transmisi berita terbaru.</p>
          </div>
        </div>
      </div>

      <!-- SIDEBAR -->
      <div class="lg:col-span-5 flex flex-col gap-6">
        
        <!-- Upcoming schedule -->
        <div class="rounded-xl border border-white/[0.06] bg-white/[0.02] p-7 md:p-8 flex flex-col min-h-[300px]">
          <div class="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-teal-400/70 block mb-1">Upcoming</span>
              <h2 class="text-xl font-extrabold tracking-tight">Misi Terdekat</h2>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="pendingSchedules" class="flex-1 flex items-center justify-center text-[11px] font-mono text-white/40 animate-pulse">
            Menyelaraskan jadwal...
          </div>

          <!-- Empty state -->
          <div v-else-if="upcomingSchedules.length === 0" class="flex-1 flex flex-col items-center justify-center text-center py-6">
            <p class="text-[11px] font-mono text-white/35 tracking-wide">Jadwal belum tersedia.</p>
          </div>

          <!-- Schedule card -->
          <div v-else class="flex-1 flex flex-col justify-between">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-400/[0.06] border border-teal-400/[0.12] mb-4">
                <span class="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                <span class="text-[9px] font-mono tracking-widest uppercase text-teal-400 font-semibold">
                  {{ upcomingSchedules[0].type === 'SHOW' ? 'Show Utama' : 'Event' }}
                </span>
              </div>
              
              <h3 class="text-2xl md:text-3xl font-extrabold leading-tight mb-2 text-white tracking-tight">
                {{ upcomingSchedules[0].event_name }}
              </h3>
              <p class="text-xs font-mono text-white/50 tracking-wide">
                {{ formatDate(upcomingSchedules[0].date_time) }}
              </p>
            </div>

            <div class="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/50">
              <p class="flex items-center gap-2">
                <span class="text-teal-400/60">&#x2022;</span> {{ upcomingSchedules[0].location }}
              </p>
            </div>
          </div>
        </div>

        <!-- ============================================ -->
        <!-- COUNTDOWN #MenantiBella                      -->
        <!-- ============================================ -->
        <div class="rounded-xl border border-white/[0.06] bg-white/[0.02] p-7 md:p-8 relative overflow-hidden">
          <!-- Subtle aurora glow behind the section -->
          <div class="absolute inset-0 pointer-events-none">
            <div class="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-gradient-to-br from-jogo-cyan/10 to-jogo-teal/5 blur-2xl"></div>
          </div>

          <div class="relative z-10">
            <!-- Header -->
            <div class="border-b border-white/[0.06] pb-4 mb-6">
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-jogo-cyan/70 block mb-1">#MenantiBella</span>
              <h2 class="text-xl font-extrabold tracking-tight">Menuju 16 Tahun Bella</h2>
            </div>

            <!-- Copywriting -->
            <p class="text-xs text-white/45 leading-relaxed mb-6 font-mono">
              Setiap detik adalah bentuk kesetiaan.<br/>
              Kami menunggu hari Bella memiliki ruangnya sendiri.
            </p>

            <!-- Countdown grid -->
            <div class="grid grid-cols-4 gap-2 mb-5">
              <div
                v-for="unit in countdownUnits"
                :key="unit.label"
                class="flex flex-col items-center gap-1.5"
              >
                <!-- Number box -->
                <div class="w-full aspect-square flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.07] relative overflow-hidden">
                  <!-- Shimmer line at top -->
                  <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  <span
                    class="text-xl md:text-2xl font-extrabold tabular-nums tracking-tight text-white transition-all duration-300"
                    :class="unit.value !== unit.prevValue ? 'countdown-flip' : ''"
                  >
                    {{ String(unit.value).padStart(2, '0') }}
                  </span>
                </div>
                <!-- Label -->
                <span class="text-[9px] font-mono uppercase tracking-[0.18em] text-white/30">{{ unit.label }}</span>
              </div>
            </div>

            <!-- Target date -->
            <div class="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
              <span class="w-1 h-1 rounded-full bg-jogo-cyan/60 animate-pulse flex-shrink-0"></span>
              <span class="text-[10px] font-mono text-white/30 tracking-wide">Target: 2 Maret 2027</span>
            </div>
          </div>
        </div>

        <!-- Community CTA -->
        <NuxtLink
          to="/contact"
          class="block rounded-xl border border-white/[0.06] bg-white/[0.02] p-7 md:p-8 group hover:border-white/[0.12] transition-colors duration-300"
        >
          <div class="text-center">
            <span class="font-accent text-3xl text-white group-hover:text-teal-400 transition-colors duration-300 block mb-2">
              Join Jogo Bonita
            </span>
            <p class="text-[10px] font-mono uppercase tracking-[0.2em] text-white/35">
              Mari Menjaga Dalam Senyap
            </p>
          </div>
        </NuxtLink>

      </div>
    </div>

    <!-- ============================================ -->
    <!-- RECAP SHOW CAROUSEL                          -->
    <!-- ============================================ -->
    <div class="mt-14 md:mt-20">
      <!-- Section header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.06] pb-5 mb-8 gap-4">
        <div>
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-teal-400/70 block mb-1">Histori</span>
          <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Recap Show</h2>
        </div>

        <div v-if="pastShows.length > 0" class="flex items-center gap-4 self-start sm:self-auto">
          <span class="text-[11px] font-mono text-white/30 tabular-nums">
            {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(pastShows.length).padStart(2, '0') }}
          </span>
          <div class="hidden sm:flex items-center gap-2">
            <button
              type="button"
              aria-label="Sebelumnya"
              :disabled="!canScrollLeft"
              @click="scrollByCard(-1)"
              class="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/50 hover:text-teal-400 hover:border-teal-400/30 hover:bg-teal-400/[0.06] active:scale-[0.92] disabled:opacity-25 disabled:pointer-events-none transition-all duration-300"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Selanjutnya"
              :disabled="!canScrollRight"
              @click="scrollByCard(1)"
              class="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/50 hover:text-teal-400 hover:border-teal-400/30 hover:bg-teal-400/[0.06] active:scale-[0.92] disabled:opacity-25 disabled:pointer-events-none transition-all duration-300"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="pendingPastShows" class="flex gap-5 overflow-hidden pb-6">
        <div
          v-for="n in 4"
          :key="n"
          class="shrink-0 w-[240px] sm:w-[280px] h-[220px] rounded-[1.5rem] border border-white/[0.06] bg-white/[0.03] animate-pulse"
        ></div>
      </div>

      <!-- Empty -->
      <div
        v-else-if="pastShows.length === 0"
        class="py-14 text-center border border-dashed border-white/[0.08] rounded-xl"
      >
        <p class="text-[11px] font-mono text-white/35 tracking-wide">Belum ada rekap show yang tersimpan.</p>
      </div>

      <!-- Carousel -->
      <div
        v-else
        class="relative"
      >
        <!-- Fade edges -->
        <div
          class="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-jogo-void to-transparent z-10 pointer-events-none transition-opacity duration-300"
          :class="canScrollLeft ? 'opacity-100' : 'opacity-0'"
        ></div>
        <div
          class="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-jogo-void to-transparent z-10 pointer-events-none transition-opacity duration-300"
          :class="canScrollRight ? 'opacity-100' : 'opacity-0'"
        ></div>

        <!-- Scrollable track -->
        <div
          ref="carouselRef"
          class="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory recap-carousel select-none"
          :class="isDragging ? 'scroll-auto cursor-grabbing' : 'scroll-smooth cursor-grab'"
          @scroll="handleCarouselScroll"
          @pointerdown="onDragStart"
          @pointermove="onDragMove"
          @pointerup="onDragEnd"
          @pointerleave="onDragEnd"
        >
          <div
            v-for="(show, index) in pastShows"
            :key="show.id"
            class="snap-start shrink-0 w-[240px] sm:w-[280px] rounded-[1.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] p-6 flex flex-col gap-5 hover:-translate-y-1.5 hover:border-teal-400/30 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_-15px_rgba(45,212,191,0.18)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group/card relative overflow-hidden"
          >
            <!-- Liquid background glow on hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-teal-400/10 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <!-- Ghost numeral watermark -->
            <span class="absolute -top-3 -right-2 text-[5.5rem] font-extrabold leading-none text-white/[0.04] group-hover/card:text-teal-400/[0.08] transition-colors duration-500 select-none pointer-events-none tabular-nums">
              {{ String(index + 1).padStart(2, '0') }}
            </span>

            <!-- Header row -->
            <div class="flex items-center justify-between relative z-10">
              <span class="text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-lg bg-teal-400/[0.08] border border-teal-400/[0.2] text-teal-400 tracking-widest uppercase shadow-[inset_0_1px_0_rgba(45,212,191,0.2)]">
                Show ke-{{ index + 1 }}
              </span>
              <div class="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover/card:border-teal-400/40 group-hover/card:bg-teal-400/10 transition-all duration-500">
                <svg class="w-3.5 h-3.5 text-teal-400/70 group-hover/card:text-teal-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                </svg>
              </div>
            </div>

            <!-- Setlist title -->
            <h3 class="text-lg md:text-xl font-extrabold text-white leading-tight tracking-tight group-hover/card:text-teal-400 transition-colors duration-300 relative z-10 flex-1 flex items-center">
              {{ show.title }}
            </h3>

            <!-- Date -->
            <div class="pt-4 border-t border-white/[0.06] relative z-10">
              <span class="text-[11px] font-mono text-white/40 tracking-wide flex items-center gap-2">
                <span class="w-1 h-1 rounded-full bg-white/20 group-hover/card:bg-teal-400/50 transition-colors"></span>
                {{ formatDate(show.date) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Scroll progress bar -->
        <div class="mt-4 h-[3px] w-full rounded-full bg-white/[0.05] overflow-hidden">
          <div
            class="h-full rounded-full bg-gradient-to-r from-teal-400/70 to-teal-300 transition-[width,transform] duration-150 ease-out"
            :style="{ width: progressWidth + '%', transform: `translateX(${progressOffset}%)` }"
          ></div>
        </div>
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const supabase = useSupabaseClient()

// ==========================================
// LOGIKA BERITA (NEWS)
// ==========================================
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

  if (error) {
    console.error('FETCH NEWS ERROR:', error)
    return
  }
  latestNews.value = data || []
}

// ==========================================
// LOGIKA JADWAL (HANYA MENAMPILKAN 1 TERDEKAT)
// ==========================================
type ScheduleItem = {
  id: string
  event_name: string
  date_time: string
  location: string
  type: 'SHOW' | 'EVENT'
}

const upcomingSchedules = ref<ScheduleItem[]>([])
const pendingSchedules = ref(true)

const getTodayLocalDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const fetchSchedules = async () => {
  pendingSchedules.value = true
  const todayString = getTodayLocalDate()
  const { data, error } = await supabase
    .from('shows')
    .select('id, date, type, title, source')
    .gte('date', todayString)
    .order('date', { ascending: true })
    .limit(1) // Kita limit 1 saja karena tidak pakai slider lagi

  if (error) {
    console.error('FETCH SCHEDULES ERROR:', error)
    pendingSchedules.value = false
    return
  }

  upcomingSchedules.value = (data || []).map((item) => ({
    id: item.id,
    event_name: item.title,
    date_time: item.date,
    type: item.type,
    location: item.type === 'SHOW' ? 'Teater JKT48, fX Sudirman' : 'Event'
  }))
  pendingSchedules.value = false
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'short', year: 'numeric'
  })
}

// ==========================================
// LOGIKA RECAP SHOW (HISTORI SHOW LALU)
// ==========================================
type PastShow = {
  id: string
  title: string
  date: string
  type: string
}

const pastShows = ref<PastShow[]>([])
const pendingPastShows = ref(true)
const carouselRef = ref<HTMLElement | null>(null)

// Carousel navigation state
const activeIndex = ref(0)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const progressWidth = ref(0)
const progressOffset = ref(0)

const CARD_GAP = 20 // px, matches gap-5

const getCardWidth = () => {
  const track = carouselRef.value
  const firstCard = track?.firstElementChild as HTMLElement | null
  return firstCard ? firstCard.offsetWidth + CARD_GAP : 0
}

const handleCarouselScroll = () => {
  const track = carouselRef.value
  if (!track) return

  const maxScroll = track.scrollWidth - track.clientWidth
  canScrollLeft.value = track.scrollLeft > 4
  canScrollRight.value = track.scrollLeft < maxScroll - 4

  const cardWidth = getCardWidth()
  activeIndex.value = cardWidth ? Math.round(track.scrollLeft / cardWidth) : 0

  const visibleRatio = maxScroll > 0 ? track.clientWidth / track.scrollWidth : 1
  progressWidth.value = Math.min(100, visibleRatio * 100)
  progressOffset.value = maxScroll > 0
    ? (track.scrollLeft / maxScroll) * (100 - progressWidth.value)
    : 0
}

const scrollByCard = (direction: 1 | -1) => {
  const track = carouselRef.value
  if (!track) return
  track.scrollBy({ left: direction * getCardWidth(), behavior: 'smooth' })
}

// Pointer-drag scrolling (desktop mouse support)
const isDragging = ref(false)
let dragStartX = 0
let dragStartScrollLeft = 0

const onDragStart = (event: PointerEvent) => {
  const track = carouselRef.value
  if (!track) return
  isDragging.value = true
  dragStartX = event.clientX
  dragStartScrollLeft = track.scrollLeft
  track.setPointerCapture(event.pointerId)
}

const onDragMove = (event: PointerEvent) => {
  const track = carouselRef.value
  if (!track || !isDragging.value) return
  const delta = event.clientX - dragStartX
  track.scrollLeft = dragStartScrollLeft - delta
}

const onDragEnd = (event: PointerEvent) => {
  const track = carouselRef.value
  if (!isDragging.value) return
  isDragging.value = false
  if (track?.hasPointerCapture(event.pointerId)) {
    track.releasePointerCapture(event.pointerId)
  }
}

const fetchPastShows = async () => {
  pendingPastShows.value = true
  const todayString = getTodayLocalDate()
  const { data, error } = await supabase
    .from('shows')
    .select('id, date, type, title')
    .eq('type', 'SHOW')
    .lt('date', todayString)
    .order('date', { ascending: true })

  if (error) {
    console.error('FETCH PAST SHOWS ERROR:', error)
    pendingPastShows.value = false
    return
  }

  pastShows.value = data || []
  pendingPastShows.value = false

  await nextTick()
  handleCarouselScroll()
}

// ==========================================
// LOGIKA COUNTDOWN #MenantiBella
// ==========================================
// Target: 2 Maret 2027 00:00:00 WIB (UTC+7)
const TARGET_DATE = new Date('2027-03-02T00:00:00+07:00').getTime()

type CountdownUnit = {
  label: string
  value: number
  prevValue: number
}

const countdownUnits = ref<CountdownUnit[]>([
  { label: 'Hari',   value: 0, prevValue: 0 },
  { label: 'Jam',    value: 0, prevValue: 0 },
  { label: 'Menit',  value: 0, prevValue: 0 },
  { label: 'Detik',  value: 0, prevValue: 0 },
])

let countdownInterval: ReturnType<typeof setInterval> | null = null

const updateCountdown = () => {
  const now = Date.now()
  const diff = Math.max(0, TARGET_DATE - now)

  const totalSeconds = Math.floor(diff / 1000)
  const days    = Math.floor(totalSeconds / 86400)
  const hours   = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const newValues = [days, hours, minutes, seconds]

  countdownUnits.value.forEach((unit, i) => {
    unit.prevValue = unit.value
    unit.value = newValues[i]
  })
}

onMounted(async () => {
  await Promise.all([
    fetchNews(),
    fetchSchedules(),
    fetchPastShows(),
  ])

  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval)
})
</script>

<style scoped>
/* Custom scrollbar for recap carousel */
.recap-carousel::-webkit-scrollbar {
  height: 4px;
}
.recap-carousel::-webkit-scrollbar-track {
  background: transparent;
}
.recap-carousel::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 99px;
}
.recap-carousel::-webkit-scrollbar-thumb:hover {
  background: rgba(79, 172, 254, 0.25);
}

/* Flip animation for countdown digits on change */
@keyframes flip-in {
  0%   { transform: translateY(-8px); opacity: 0; }
  100% { transform: translateY(0px);  opacity: 1; }
}

.countdown-flip {
  animation: flip-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>