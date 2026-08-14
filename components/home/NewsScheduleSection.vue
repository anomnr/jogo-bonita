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
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

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

onMounted(async () => {
  await Promise.all([
    fetchNews(),
    fetchSchedules()
  ])
})
</script>