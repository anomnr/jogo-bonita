<template>
  <main class="container mx-auto px-4 py-12 max-w-7xl font-sans text-white selection:bg-[#00F2FE] selection:text-[#050B14]">
    
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <div class="lg:col-span-7 rounded-[2.5rem] bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/[0.08] border-t-white/[0.22] border-l-white/[0.15] p-8 md:p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group animate-stagger-1">
        
        <div class="absolute -top-32 -right-32 w-80 h-80 bg-[#00F2FE]/10 rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-[#00F2FE]/20"></div>
        <div class="absolute inset-0 opacity-[0.035] pointer-events-none bg-noise-pattern"></div>

        <div class="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.08] pb-6 mb-8 gap-4">
          <div>
            <span class="text-[10px] font-mono uppercase tracking-[0.3em] text-[#00F2FE] block mb-1 font-semibold">Broadcasting Center</span>
            <h2 class="font-extrabold text-3xl tracking-tight">Berita Terbaru</h2>
          </div>
          <NuxtLink to="/news" class="text-xs font-mono text-[#E2C99A] hover:text-white transition flex items-center gap-1 font-semibold">
            Lihat Semua Arsip &rarr;
          </NuxtLink>
        </div>

        <div class="space-y-4 relative z-10">
          <NuxtLink
            v-for="item in latestNews"
            :key="item.id"
            :to="`/news/${item.slug}`"
            class="flex flex-col md:flex-row items-start md:items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#00F2FE]/40 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer overflow-hidden relative group/news"
          >
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-[#00F2FE] transform scale-y-0 group-hover/news:scale-y-100 transition-transform origin-top"></div>
            
            <div class="flex items-center gap-3 md:w-1/3 shrink-0">
              <span class="text-[9px] font-mono font-bold px-2.5 py-1 bg-[#101D2F] border border-white/10 text-white rounded uppercase tracking-widest group-hover/news:border-[#00F2FE]/50 transition">
                {{ item.category }}
              </span>
              <span class="text-xs font-mono font-light text-white/60">
                {{ new Date(item.created_at).toLocaleDateString('id-ID') }}
              </span>
            </div>

            <p class="text-sm md:text-base font-semibold group-hover/news:text-[#00F2FE] transition-colors flex-1 leading-snug">
              {{ item.title }}
            </p>
          </NuxtLink>

          <div
            v-if="latestNews.length === 0"
            class="py-12 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]"
          >
            <p class="font-mono text-xs text-[#E2C99A] tracking-widest uppercase mb-1 font-bold">Frekuensi Sedang Hening</p>
            <p class="text-xs text-white/40 font-light">Belum ada transmisi berita terbaru dari markas pusat.</p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-5 flex flex-col gap-8 animate-stagger-2">
        
        <div class="rounded-[2.5rem] bg-gradient-to-br from-[#101D2F]/80 to-transparent border border-white/[0.08] border-t-white/[0.22] border-l-white/[0.15] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group flex flex-col justify-between min-h-[320px]">
          
          <div class="absolute inset-0 opacity-[0.035] pointer-events-none bg-noise-pattern"></div>
          <div class="absolute top-0 right-0 w-48 h-48 bg-jogo-champagne/5 rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-[#00F2FE]/10"></div>

          <div class="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-5 mb-6">
            <div>
              <p class="text-[9px] uppercase tracking-[0.3em] text-[#E2C99A] mb-1 font-bold">
                Upcoming Stage // Supabase
              </p>
              <h2 class="font-extrabold text-2xl tracking-tight">Misi Terdekat</h2>
            </div>
          </div>

          <div v-if="pendingSchedules" class="flex-1 flex items-center justify-center text-xs font-mono text-white/50 animate-pulse relative z-10">
            Menyelaraskan frekuensi teater...
          </div>

          <div v-else-if="upcomingSchedules.length === 0" class="flex-1 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01] p-6 text-center relative z-10">
            <p class="font-mono text-xs text-[#E2C99A] tracking-widest uppercase mb-1 font-bold">Teater Sedang Senyap</p>
            <p class="text-[11px] text-white/40 font-light px-4">Kapten sedang meracik taktik di bangku cadangan.</p>
          </div>

          <div v-else class="relative flex-1 flex flex-col justify-between">
            
            <div 
              v-if="upcomingSchedules[0].event_name === 'Pajama Drive'" 
              class="absolute right-0 bottom-0 w-64 h-64 opacity-[0.15] mix-blend-screen grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-30 transition-all duration-1000 pointer-events-none -z-0 translate-x-10 translate-y-10"
            >
              <img src="/images/pajama_drive.png" alt="Pajama Drive" class="w-full h-full object-contain" />
            </div>
            <div v-else class="absolute -right-6 -bottom-10 text-[8rem] font-black leading-none text-white/[0.02] select-none group-hover:text-[#00F2FE]/[0.05] transition-colors pointer-events-none -z-0">
              JB
            </div>

            <div class="relative z-10">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 mb-4 backdrop-blur-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse"></span>
                <span class="text-[9px] font-mono tracking-widest uppercase text-[#00F2FE] font-bold">
                  {{ upcomingSchedules[0].type === 'SHOW' ? 'Show Utama' : 'Event' }}
                </span>
              </div>
              
              <h3 class="text-3xl md:text-4xl font-extrabold leading-tight mb-2 drop-shadow-lg text-white group-hover:text-[#00F2FE] transition-colors duration-500">
                {{ upcomingSchedules[0].event_name }}
              </h3>
              <p class="text-xs font-mono text-[#E2C99A] tracking-[0.1em] font-semibold">
                {{ formatDate(upcomingSchedules[0].date_time) }}
              </p>
            </div>

            <div class="relative z-10 mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/70">
              <p class="flex items-center gap-2 font-light">
                <span class="text-[#00F2FE]">📍</span> {{ upcomingSchedules[0].location }}
              </p>
              <span class="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:bg-[#00F2FE] group-hover:text-[#050B14] transition-all">
                →
              </span>
            </div>
          </div>
        </div>

        <NuxtLink
          to="/contact"
          class="block rounded-[2.5rem] bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-white/[0.04] border border-white/[0.08] border-t-white/[0.22] border-l-white/[0.15] p-8 backdrop-blur-3xl shadow-xl relative overflow-hidden group hover:border-[#E2C99A]/50 transition-colors duration-500"
        >
          <div class="absolute inset-0 opacity-[0.035] pointer-events-none bg-noise-pattern"></div>
          <div class="absolute -right-10 -top-10 w-32 h-32 bg-[#E2C99A]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

          <div class="relative z-10 text-center">
            <p class="text-[9px] uppercase font-mono tracking-[0.3em] text-white/50 mb-2 font-bold">Community Access</p>
            <h3 class="font-accent text-4xl md:text-5xl mb-1 text-white group-hover:text-[#E2C99A] transition-colors drop-shadow-md">
              Join Jogo Bonita
            </h3>
            <p class="text-[10px] uppercase font-mono tracking-[0.2em] text-[#00F2FE] font-semibold mt-2">
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

<style scoped>
.bg-noise-pattern {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

@keyframes bento-entrance {
  0% { opacity: 0; transform: translateY(30px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.animate-stagger-1 { animation: bento-entrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
.animate-stagger-2 { animation: bento-entrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
</style>