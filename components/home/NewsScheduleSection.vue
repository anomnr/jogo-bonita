<template>
  <main class="mx-auto max-w-[1400px] px-5 py-16 text-white md:px-8 md:py-24">

    <div class="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">

      <!-- ============================================================ -->
      <!-- NEWS                                                          -->
      <!-- ============================================================ -->
      <section>
        <div class="mb-8 flex items-end justify-between gap-4 border-b border-white/[0.06] pb-5">
          <div>
            <span class="mb-1.5 block text-[10px] font-mono uppercase tracking-[0.25em] text-jogo-cyan/70">Transmisi</span>
            <h2 class="text-2xl font-extrabold tracking-tight text-white md:text-3xl">Berita Terbaru</h2>
          </div>
          <NuxtLink
            to="/news"
            class="group flex shrink-0 items-center gap-1.5 text-[11px] font-mono font-medium text-white/40 transition-colors hover:text-white"
          >
            Lihat Semua
            <ArrowUpRight :size="13" :stroke-width="2" class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </NuxtLink>
        </div>

        <!-- Error -->
        <div v-if="newsError" class="py-12">
          <p class="text-[11px] font-mono tracking-wide text-white/45">Transmisi berita gagal dimuat.</p>
          <button type="button" class="retry mt-3" @click="fetchNews">
            <RotateCw :size="12" :stroke-width="2" />
            Coba lagi
          </button>
        </div>

        <!-- Loading -->
        <div v-else-if="pendingNews" class="space-y-6">
          <div class="skeleton aspect-[16/7] w-full rounded-2xl"></div>
          <div class="space-y-5 border-t border-white/[0.06] pt-5">
            <div v-for="n in 3" :key="n" class="space-y-2.5">
              <div class="skeleton h-2 w-32 rounded-full"></div>
              <div class="skeleton h-3.5 rounded-full" :style="{ width: 88 - n * 9 + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- Empty -->
        <div v-else-if="latestNews.length === 0" class="py-14">
          <p class="text-sm font-semibold text-white/70">Belum ada transmisi.</p>
          <p class="mt-1.5 text-[11px] font-mono tracking-wide text-white/35">
            Berita terbaru akan muncul di sini begitu dipublikasikan.
          </p>
        </div>

        <!-- Data: one lead story, then a divided list -->
        <div v-else>
          <NuxtLink v-if="leadStory" :to="`/news/${leadStory.slug}`" class="group block">
            <div
              v-if="leadStory.image_url && !leadImageFailed"
              class="relative mb-5 aspect-[16/7] overflow-hidden rounded-2xl border border-white/[0.07]"
            >
              <img
                :src="leadStory.image_url"
                :alt="leadStory.title"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                @error="leadImageFailed = true"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-jogo-void/80 via-transparent to-transparent"></div>
            </div>

            <div class="flex items-center gap-3">
              <span class="tag">{{ leadStory.category }}</span>
              <span class="text-[11px] font-mono tracking-wide text-white/40">{{ formatShort(leadStory.created_at) }}</span>
            </div>

            <h3 class="mt-3 text-xl font-extrabold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-jogo-cyan md:text-2xl">
              {{ leadStory.title }}
            </h3>

            <p v-if="leadStory.excerpt" class="mt-2.5 max-w-[62ch] text-sm leading-relaxed text-white/50">
              {{ leadStory.excerpt }}
            </p>
          </NuxtLink>

          <div v-if="restStories.length" class="mt-8 divide-y divide-white/[0.06] border-t border-white/[0.06]">
            <NuxtLink
              v-for="item in restStories"
              :key="item.id"
              :to="`/news/${item.slug}`"
              class="group flex items-start gap-5 py-5 transition-colors duration-300"
            >
              <div class="flex min-w-0 flex-1 flex-col gap-2">
                <div class="flex items-center gap-3">
                  <span class="tag">{{ item.category }}</span>
                  <span class="text-[11px] font-mono tracking-wide text-white/35">{{ formatShort(item.created_at) }}</span>
                </div>
                <p class="text-sm font-semibold leading-snug text-white/85 transition-colors duration-300 group-hover:text-jogo-cyan md:text-base">
                  {{ item.title }}
                </p>
              </div>
              <ArrowUpRight
                :size="15"
                :stroke-width="2"
                class="mt-1 shrink-0 text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-jogo-cyan"
              />
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- SIDEBAR - three panels, three different constructions        -->
      <!-- ============================================================ -->
      <div class="flex flex-col gap-14">

        <!-- 1. A bordered container: a discrete, upcoming object -->
        <section class="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] md:p-7">
          <div class="mb-5 flex items-center justify-between">
            <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-jogo-cyan/70">Upcoming</span>
            <span v-if="upcomingSchedules.length" class="live-dot h-1.5 w-1.5 rounded-full bg-jogo-cyan"></span>
          </div>

          <div v-if="schedulesError">
            <p class="text-[11px] font-mono tracking-wide text-white/45">Jadwal gagal dimuat.</p>
            <button type="button" class="retry mt-3" @click="fetchSchedules">
              <RotateCw :size="12" :stroke-width="2" />
              Coba lagi
            </button>
          </div>

          <div v-else-if="pendingSchedules" class="space-y-3">
            <div class="skeleton h-2.5 w-20 rounded-full"></div>
            <div class="skeleton h-6 w-full rounded-full"></div>
            <div class="skeleton h-2.5 w-2/3 rounded-full"></div>
          </div>

          <div v-else-if="upcomingSchedules.length === 0">
            <p class="text-sm font-semibold text-white/70">Jadwal belum tersedia.</p>
            <p class="mt-1.5 text-[11px] font-mono tracking-wide text-white/35">Misi berikutnya akan tayang begitu diumumkan.</p>
          </div>

          <div v-else-if="nextMission">
            <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
              {{ nextMission.type === 'SHOW' ? 'Show Utama' : 'Event' }}
            </span>
            <h3 class="mt-2 text-xl font-extrabold leading-tight tracking-tight text-white md:text-2xl">
              {{ nextMission.event_name }}
            </h3>
            <dl class="mt-5 space-y-2.5 border-t border-white/[0.06] pt-4 text-[11px] font-mono tracking-wide text-white/50">
              <div class="flex items-center gap-2.5">
                <CalendarDays :size="13" :stroke-width="2" class="shrink-0 text-white/30" />
                <dd>{{ formatDate(nextMission.date_time) }}</dd>
              </div>
              <div class="flex items-center gap-2.5">
                <MapPin :size="13" :stroke-width="2" class="shrink-0 text-white/30" />
                <dd>{{ nextMission.location }}</dd>
              </div>
            </dl>
          </div>
        </section>

        <!-- 2. No container at all: the countdown carries itself typographically -->
        <section>
          <div class="border-b border-white/[0.06] pb-4">
            <span class="mb-1.5 block text-[10px] font-mono uppercase tracking-[0.25em] text-jogo-cyan/70">#MenantiBella</span>
            <h2 class="text-xl font-extrabold tracking-tight text-white">Menuju 16 Tahun Bella</h2>
          </div>

          <p class="mt-5 text-xs leading-relaxed text-white/45">
            Setiap detik adalah bentuk kesetiaan.<br />
            Kami menunggu hari Bella memiliki ruangnya sendiri.
          </p>

          <!-- Visual digits are decorative; the sr-only line below carries the
               meaning so screen readers are not re-announced every second. -->
          <div class="mt-7 flex items-end" aria-hidden="true">
            <div
              v-for="(unit, index) in countdownUnits"
              :key="unit.label"
              class="flex flex-col pr-5 sm:pr-6"
              :class="[
                index > 0 && 'border-l border-white/[0.08] pl-5 sm:pl-6',
                unit.minor && 'opacity-45'
              ]"
            >
              <span
                :key="unit.value"
                class="font-extrabold leading-none tracking-tight tabular-nums text-white"
                :class="unit.minor ? 'text-xl' : 'text-3xl md:text-4xl countdown-flip'"
              >
                {{ String(unit.value).padStart(2, '0') }}
              </span>
              <span class="mt-2 text-[9px] font-mono uppercase tracking-[0.2em] text-white/35">
                {{ unit.label }}
              </span>
            </div>
          </div>

          <p class="sr-only">{{ countdownSummary }}</p>

          <p class="mt-6 border-t border-white/[0.06] pt-4 text-[10px] font-mono tracking-wide text-white/30">
            Target: 2 Maret 2027
          </p>
        </section>

        <!-- 3. Flattest of the three: a hairline and a line of script -->
        <NuxtLink to="/contact" class="group block border-t border-white/[0.08] pt-6">
          <span class="block font-accent text-3xl leading-none text-white transition-colors duration-300 group-hover:text-jogo-cyan">
            Join Jogo Bonita
          </span>
          <span class="mt-2.5 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-white/35">
            Mari Menjaga Dalam Senyap
            <ArrowUpRight :size="12" :stroke-width="2" class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </NuxtLink>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- RECAP CAROUSEL                                                -->
    <!-- ============================================================ -->
    <section class="mt-20 md:mt-28">
      <div class="mb-8 flex flex-col justify-between gap-4 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-end">
        <div>
          <span class="mb-1.5 block text-[10px] font-mono uppercase tracking-[0.25em] text-jogo-cyan/70">Histori</span>
          <h2 class="text-2xl font-extrabold tracking-tight text-white md:text-3xl">Recap Show</h2>
        </div>

        <div v-if="pastShows.length > 0" class="flex items-center gap-4 self-start sm:self-auto">
          <span class="text-[11px] font-mono tabular-nums text-white/30">
            {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(pastShows.length).padStart(2, '0') }}
          </span>
          <div class="hidden items-center gap-2 sm:flex">
            <button type="button" aria-label="Sebelumnya" :disabled="!canScrollLeft" class="nav-btn" @click="scrollByCard(-1)">
              <ChevronLeft :size="16" :stroke-width="2" />
            </button>
            <button type="button" aria-label="Selanjutnya" :disabled="!canScrollRight" class="nav-btn" @click="scrollByCard(1)">
              <ChevronRight :size="16" :stroke-width="2" />
            </button>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-if="pastShowsError" class="py-12">
        <p class="text-[11px] font-mono tracking-wide text-white/45">Rekap show gagal dimuat.</p>
        <button type="button" class="retry mt-3" @click="fetchPastShows">
          <RotateCw :size="12" :stroke-width="2" />
          Coba lagi
        </button>
      </div>

      <!-- Loading -->
      <div v-else-if="pendingPastShows" class="flex gap-5 overflow-hidden pb-6">
        <div v-for="n in 4" :key="n" class="skeleton h-[220px] w-[240px] shrink-0 rounded-2xl sm:w-[280px]"></div>
      </div>

      <!-- Empty -->
      <div v-else-if="pastShows.length === 0" class="py-14">
        <p class="text-sm font-semibold text-white/70">Belum ada rekap show.</p>
        <p class="mt-1.5 text-[11px] font-mono tracking-wide text-white/35">Riwayat show akan terkumpul di sini seiring waktu.</p>
      </div>

      <!-- Carousel -->
      <div v-else class="relative">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-jogo-void to-transparent transition-opacity duration-300"
          :class="canScrollLeft ? 'opacity-100' : 'opacity-0'"
        ></div>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-jogo-void to-transparent transition-opacity duration-300"
          :class="canScrollRight ? 'opacity-100' : 'opacity-0'"
        ></div>

        <div
          ref="carouselRef"
          class="recap-carousel flex select-none gap-5 overflow-x-auto pb-2 snap-x snap-mandatory"
          :class="isDragging ? 'scroll-auto cursor-grabbing' : 'scroll-smooth cursor-grab'"
          @scroll="handleCarouselScroll"
          @pointerdown="onDragStart"
          @pointermove="onDragMove"
          @pointerup="onDragEnd"
          @pointerleave="onDragEnd"
        >
          <article
            v-for="(show, index) in pastShows"
            :key="show.id"
            class="group/card relative flex w-[240px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-jogo-cyan/25 hover:bg-white/[0.04] sm:w-[280px]"
          >
            <span
              class="pointer-events-none absolute -right-2 -top-3 select-none text-[5.5rem] font-extrabold leading-none tabular-nums text-white/[0.04] transition-colors duration-500 group-hover/card:text-jogo-cyan/[0.07]"
              aria-hidden="true"
            >
              {{ String(index + 1).padStart(2, '0') }}
            </span>

            <span class="relative z-10 self-start text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
              Show ke-{{ index + 1 }}
            </span>

            <h3 class="relative z-10 my-8 text-lg font-extrabold leading-tight tracking-tight text-white transition-colors duration-300 group-hover/card:text-jogo-cyan md:text-xl">
              {{ show.title }}
            </h3>

            <span class="relative z-10 flex items-center gap-2 border-t border-white/[0.06] pt-4 text-[11px] font-mono tracking-wide text-white/40">
              <CalendarDays :size="12" :stroke-width="2" class="shrink-0 text-white/25" />
              {{ formatDate(show.date) }}
            </span>
          </article>
        </div>

        <!-- Progress: transform only, never width -->
        <div class="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.05]">
          <div
            class="h-full w-full origin-left rounded-full bg-jogo-cyan/50 transition-transform duration-150 ease-out"
            :style="{ transform: `translateX(${progressShift}%) scaleX(${progressScale})` }"
          ></div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, MapPin, RotateCw } from 'lucide-vue-next'

const supabase = useSupabaseClient()

// ==========================================
// BERITA (NEWS)
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
const pendingNews = ref(true)
const newsError = ref(false)
const leadImageFailed = ref(false)

// Newest item leads; the rest read as a compact index below it.
const leadStory = computed(() => latestNews.value[0] ?? null)
const restStories = computed(() => latestNews.value.slice(1))

const fetchNews = async () => {
  pendingNews.value = true
  newsError.value = false
  leadImageFailed.value = false

  const { data, error } = await supabase
    .from('news')
    .select('id, title, slug, category, excerpt, image_url, source_url, published, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(4)

  if (error) {
    console.error('FETCH NEWS ERROR:', error)
    newsError.value = true
    pendingNews.value = false
    return
  }

  latestNews.value = data || []
  pendingNews.value = false
}

// ==========================================
// JADWAL (hanya 1 terdekat)
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
const schedulesError = ref(false)

const nextMission = computed(() => upcomingSchedules.value[0])

const getTodayLocalDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const fetchSchedules = async () => {
  pendingSchedules.value = true
  schedulesError.value = false

  const { data, error } = await supabase
    .from('shows')
    .select('id, date, type, title, source')
    .gte('date', getTodayLocalDate())
    .order('date', { ascending: true })
    .limit(1)

  if (error) {
    console.error('FETCH SCHEDULES ERROR:', error)
    schedulesError.value = true
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

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'short', year: 'numeric'
  })

const formatShort = (dateString: string) =>
  new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric'
  })

// ==========================================
// RECAP SHOW
// ==========================================
type PastShow = {
  id: string
  title: string
  date: string
  type: string
}

const pastShows = ref<PastShow[]>([])
const pendingPastShows = ref(true)
const pastShowsError = ref(false)
const carouselRef = ref<HTMLElement | null>(null)

const activeIndex = ref(0)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const progressScale = ref(1)
const progressShift = ref(0)

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

  // scaleX + translateX instead of animating width, so the bar stays on the
  // compositor. translateX is relative to the thumb's own (unscaled) width.
  const ratio = maxScroll > 0 ? track.clientWidth / track.scrollWidth : 1
  progressScale.value = Math.min(1, ratio)
  progressShift.value = maxScroll > 0
    ? (track.scrollLeft / maxScroll) * (1 - progressScale.value) * 100
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
  track.scrollLeft = dragStartScrollLeft - (event.clientX - dragStartX)
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
  pastShowsError.value = false

  const { data, error } = await supabase
    .from('shows')
    .select('id, date, type, title')
    .eq('type', 'SHOW')
    .lt('date', getTodayLocalDate())
    .order('date', { ascending: true })

  if (error) {
    console.error('FETCH PAST SHOWS ERROR:', error)
    pastShowsError.value = true
    pendingPastShows.value = false
    return
  }

  pastShows.value = data || []
  pendingPastShows.value = false

  await nextTick()
  handleCarouselScroll()
}

// ==========================================
// COUNTDOWN #MenantiBella
// ==========================================
// Target: 2 Maret 2027 00:00:00 WIB (UTC+7)
const TARGET_DATE = new Date('2027-03-02T00:00:00+07:00').getTime()

type CountdownUnit = {
  label: string
  value: number
  /** Seconds carry the least meaning to someone checking in once a day. */
  minor?: boolean
}

const countdownUnits = ref<CountdownUnit[]>([
  { label: 'Hari', value: 0 },
  { label: 'Jam', value: 0 },
  { label: 'Menit', value: 0 },
  { label: 'Detik', value: 0, minor: true }
])

// Coarse, day-level text for assistive tech — it does not tick.
const countdownSummary = computed(
  () => `Tersisa ${countdownUnits.value[0]?.value ?? 0} hari menuju 2 Maret 2027.`
)

let countdownInterval: ReturnType<typeof setInterval> | null = null

const updateCountdown = () => {
  const diff = Math.max(0, TARGET_DATE - Date.now())
  const totalSeconds = Math.floor(diff / 1000)

  const next = [
    Math.floor(totalSeconds / 86400),
    Math.floor((totalSeconds % 86400) / 3600),
    Math.floor((totalSeconds % 3600) / 60),
    totalSeconds % 60
  ]

  countdownUnits.value.forEach((unit, i) => {
    unit.value = next[i] ?? 0
  })
}

onMounted(async () => {
  await Promise.all([fetchNews(), fetchSchedules(), fetchPastShows()])

  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval)
})
</script>

<style scoped>
.tag {
  font-size: 9px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 3px 8px;
  white-space: nowrap;
  transition: border-color 0.3s ease, color 0.3s ease;
}

.group:hover .tag {
  border-color: rgba(0, 242, 254, 0.28);
  color: rgba(0, 242, 254, 0.85);
}

.retry {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9999px;
  padding: 7px 14px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.retry:hover {
  color: #00f2fe;
  border-color: rgba(0, 242, 254, 0.3);
}

.retry:active {
  transform: scale(0.97);
}

.nav-btn {
  display: flex;
  height: 36px;
  width: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-btn:hover:not(:disabled) {
  color: #00f2fe;
  border-color: rgba(0, 242, 254, 0.3);
}

.nav-btn:active:not(:disabled) {
  transform: scale(0.92);
}

.nav-btn:disabled {
  opacity: 0.25;
  pointer-events: none;
}

/* Skeletons match the real layout's footprint rather than spinning. */
.skeleton {
  background: rgba(255, 255, 255, 0.04);
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  animation: shimmer 1.6s ease-in-out infinite;
}

@keyframes shimmer {
  to {
    transform: translateX(100%);
  }
}

.live-dot {
  position: relative;
}

.live-dot::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 9999px;
  border: 1px solid rgba(0, 242, 254, 0.4);
  animation: ping 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

@keyframes ping {
  0% { transform: scale(0.6); opacity: 0.9; }
  70%, 100% { transform: scale(1.9); opacity: 0; }
}

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
  background: rgba(0, 242, 254, 0.25);
}

/* Keyed digits remount on change, so the animation actually replays. */
@keyframes flip-in {
  0% { transform: translateY(-8px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

.countdown-flip {
  animation: flip-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (prefers-reduced-motion: reduce) {
  .countdown-flip,
  .skeleton::after,
  .live-dot::after {
    animation: none;
  }
}
</style>
