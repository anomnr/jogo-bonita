<template>
  <div class="min-h-screen bg-transparent text-jogo-light font-sans pt-24 pb-20 selection:bg-teal-500 selection:text-white">
    <div class="container mx-auto px-4 max-w-7xl">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto">
        
        <div class="lg:col-span-5 flex flex-col justify-between rounded-[2.5rem] bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/[0.08] border-t-white/[0.25] border-l-white/[0.18] p-5 md:p-7 backdrop-blur-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden group transition-all duration-500 hover:border-white/[0.2] animate-stagger-1">
          
          <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-teal-400/20 to-transparent blur-2xl pointer-events-none"></div>

          <div class="absolute inset-0 opacity-[0.035] pointer-events-none bg-noise-pattern"></div>

          <div class="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-[#0A1628] shadow-inner">
            <img 
              src="/images/christabella_bonita.jpg" 
              alt="Christabella Bonita" 
              class="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
            />
            
            <div class="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest uppercase text-teal-300">
              ID // 14TH-GEN
            </div>

            <div class="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 backdrop-blur-md border border-teal-500/30 text-[10px] text-teal-300">
              <span class="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
              Active Trainee
            </div>
          </div>

          <div class="mt-6 space-y-3 px-1">
            <div>
              <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
                Christabella Bonita
              </h1>
              <p class="text-xs uppercase tracking-[0.3em] text-teal-400/80 mt-0.5 font-mono">
                Official Trainee Dossier
              </p>
            </div>

            <div class="pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-2.5 text-xs">
              <div v-for="stat in quickStats" :key="stat.label" class="bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.03]">
                <span class="text-white/40 block text-[9px] uppercase font-mono tracking-wider">{{ stat.label }}</span>
                <span class="font-semibold text-white/90 mt-0.5 block">{{ stat.value }}</span>
              </div>
            </div>
          </div>

        </div>

        <div class="lg:col-span-7 flex flex-col gap-6 justify-between">
          
          <div class="rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/[0.07] border-t-white/[0.22] border-l-white/[0.15] p-8 md:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group animate-stagger-2">
            
            <div class="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-teal-400/20 transition-all duration-700 pointer-events-none"></div>

            <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-teal-400/90 block mb-3 flex items-center gap-2">
              <span class="w-1 h-1 rounded-full bg-teal-400"></span> Catchphrase Signal
            </span>

            <blockquote class="text-xl md:text-2xl font-light leading-relaxed text-white/90 tracking-wide">
              <span class="font-accent text-teal-300 text-4xl md:text-5xl block mb-2 drop-shadow-md">“Ding Dong! Skate, Spin, Smile.”</span>
              Halo, aku Bella! Siap meluncur dan memutar kebahagiaan di hati kalian!
            </blockquote>

            <p class="mt-4 text-xs md:text-sm text-jogo-light/70 leading-relaxed border-t border-white/[0.06] pt-4">
              Hadir dengan pesona yang tidak memaksa. Di mata <em>Jogo Bonita</em>, gadis kelahiran 2011 ini bukan sekadar sosok yang menarik dilihat, melainkan anomali frekuensi yang memberi warna baru lewat tiap putaran kecilnya di atas panggung.
            </p>

            <div class="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-white/50">
              <span>NICKNAME: <strong class="text-white font-sans">Bonbon</strong></span>
              <span class="text-teal-400/70">STATUS: MENJAGA_DALAM_SENYAP</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div class="rounded-[2.2rem] bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/[0.07] border-t-white/[0.2] border-l-white/[0.12] p-7 backdrop-blur-2xl shadow-xl flex flex-col justify-between group hover:border-white/[0.18] transition-all duration-500 animate-stagger-3">
              <div>
                <div class="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-300 mb-4 group-hover:scale-110 transition-transform">
                  ✨
                </div>
                <span class="text-[9px] font-mono tracking-widest uppercase text-white/40 block mb-1">Presence</span>
                <h3 class="text-lg font-bold text-white mb-2">Anggun & Lembut</h3>
                <p class="text-xs text-white/70 leading-relaxed">
                  Kehadiran yang terasa halus, nyaman dipandang, dan tetap meninggalkan kesan tajam lewat pembawaan yang sangat rapi.
                </p>
              </div>
              <div class="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-teal-400/80">
                <span>RESONANCE</span>
                <span>99.4%</span>
              </div>
            </div>

            <div class="rounded-[2.2rem] bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/[0.07] border-t-white/[0.2] border-l-white/[0.12] p-7 backdrop-blur-2xl shadow-xl flex flex-col justify-between group hover:border-white/[0.18] transition-all duration-500 animate-stagger-4">
              <div>
                <div class="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 mb-4 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <span class="text-[9px] font-mono tracking-widest uppercase text-white/40 block mb-1">Output</span>
                <h3 class="text-lg font-bold text-white mb-2">Cerah Menghidupkan</h3>
                <p class="text-xs text-white/70 leading-relaxed">
                  Setiap sudut teater terasa lebih hangat berkat ekspresi persisten dan energi ringan yang mampu merubah mood penonton.
                </p>
              </div>
              <div class="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-cyan-400/80">
                <span>ATMOSPHERE</span>
                <span>WARM_ARCTIC</span>
              </div>
            </div>

          </div>

        </div>

        <div class="lg:col-span-12 rounded-[2.5rem] bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-white/[0.04] border border-white/[0.08] border-t-white/[0.22] border-l-white/[0.15] p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden animate-stagger-5">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-8 gap-4">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-[0.3em] text-teal-400 block mb-1">Historical Timeline</span>
              <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Jejak Langkah & Catatan Panggung</h2>
            </div>
            <p class="text-xs font-mono text-white/50 max-w-sm text-left md:text-right">
              "Merayakan setiap kemajuan kecilnya bersama, mencatatnya dalam baris kode yang tak akan pudar."
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div v-for="(step, idx) in milestones" :key="step.title" class="relative pl-6 border-l-2 border-white/10 hover:border-teal-400 transition-colors duration-500 group/step">
              <div class="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-[#0A1628] border-2 border-white/30 group-hover/step:border-teal-400 group-hover/step:bg-teal-400 transition-all duration-300 group-hover/step:shadow-[0_0_12px_#2dd4bf]"></div>
              
              <span class="text-xs font-mono font-bold text-teal-400 block mb-1">{{ step.kicker }}</span>
              <h4 class="text-base font-bold text-white mb-1.5">{{ step.title }}</h4>
              <p class="text-xs text-white/65 leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
const quickStats = [
  { label: 'Generasi', value: '14th Generation' },
  { label: 'Tanggal Lahir', value: '02 Maret 2011' },
  { label: 'Tinggi Badan', value: '161 cm' },
  { label: 'Golongan Darah', value: 'A (Alpha)' },
  { label: 'Zodiak', value: 'Pisces ♓' },
  { label: 'Status Roster', value: 'Trainee JKT48' }
]

const milestones = [
  {
    kicker: 'Langkah Awal',
    title: 'Pengumuman 14th Gen',
    desc: 'Secara resmi diperkenalkan ke hadapan publik sebagai bagian dari regenerasi idola paling fenomena.'
  },
  {
    kicker: 'Fase Pemanasan',
    title: 'Pajama Drive Debut',
    desc: 'Mencetak menit bermain perdana di panggung sakral FX Sudirman. Membuktikan energi "Skate & Spin" secara nyata.'
  },
  {
    kicker: 'Misi Masa Depan',
    title: 'Menuju Roster Utama',
    desc: 'Mengawal penuh setiap proses adaptasi Bella hingga meraih seragam tim inti, tanpa keriuhan yang tak perlu.'
  }
]
</script>

<style scoped>
/* Injeksi Tekstur Noise Murni ke dalam kartu Obsidian */
.bg-noise-pattern {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* Rekayasa Animasi Masuk Bergelombang (Staggered Entrance) ala MotionSites */
@keyframes bento-entrance {
  0% { opacity: 0; transform: translateY(30px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.animate-stagger-1 { animation: bento-entrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
.animate-stagger-2 { animation: bento-entrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
.animate-stagger-3 { animation: bento-entrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
.animate-stagger-4 { animation: bento-entrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
.animate-stagger-5 { animation: bento-entrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }
</style>