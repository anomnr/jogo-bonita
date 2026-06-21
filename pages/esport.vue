<template>
  <section class="min-h-screen bg-transparent text-white py-20 px-6 sm:px-12 overflow-hidden selection:bg-[#00F2FE] selection:text-[#050B14]">
    
    <div class="max-w-7xl mx-auto text-center mb-16 relative z-10 animate-stagger-1">
      <span class="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-[#101D2F] border border-white/10 text-[9px] font-mono tracking-[0.25em] uppercase text-[#00F2FE]">
        <span class="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse"></span>
        Divisi Kompetitif
      </span>
      <h1 class="font-accent text-6xl md:text-8xl text-white mb-2 drop-shadow-lg tracking-wide">
        Jogo Bonita Esports
      </h1>
      <h2 class="text-sm md:text-lg text-white/50 uppercase tracking-[0.3em] font-light mb-6">
        Mobile Legends: Bang Bang
      </h2>
      <p class="text-white/70 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
        Mengawal garis depan dengan ketenangan malam. Inilah punggawa Jogo Bonita yang siap membelah formasi lawan layaknya pisau seluncur di atas es beku.
      </p>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 relative z-10">
      
      <article
        v-for="(player, index) in roster"
        :key="index"
        class="group/card relative rounded-[2rem] overflow-hidden bg-[#0A1628] border border-white/[0.08] border-t-white/[0.22] backdrop-blur-md cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:border-[#00F2FE]/50 hover:shadow-[0_20px_40px_-15px_rgba(0,242,254,0.3)] animate-stagger-2"
        :style="{ animationDelay: `${index * 150}ms` }"
      >
        
        <div class="aspect-[3/4] w-full overflow-hidden relative">
          <img
            :src="player.image"
            :alt="player.ign"
            class="absolute inset-0 w-full h-full object-cover filter grayscale-[80%] brightness-75 group-hover/card:grayscale-0 group-hover/card:brightness-100 group-hover/card:scale-105 transition-all duration-700 ease-out"
          />
          
          <div class="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/70 to-transparent opacity-90 group-hover/card:opacity-100 transition-opacity duration-500"></div>

          <div class="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <span class="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest uppercase text-white rounded-md">
              {{ player.role }}
            </span>
          </div>

          <div class="absolute top-2 right-2 text-5xl font-black text-white/10 font-mono pointer-events-none group-hover/card:text-[#00F2FE]/20 transition-colors duration-500">
            JB
          </div>

          <div class="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end">
            
            <div class="p-6 transform translate-y-[5.5rem] group-hover/card:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              
              <div>
                <h3 class="text-3xl font-black italic tracking-tighter text-white uppercase drop-shadow-lg group-hover/card:text-[#00F2FE] transition-colors">
                  {{ player.ign }}
                </h3>
                <p class="text-[10px] font-mono text-[#E2C99A] uppercase tracking-widest mt-0.5 font-bold">
                  {{ player.name }}
                </p>
              </div>

              <div class="h-[5.5rem] pt-3 mt-3 border-t border-white/[0.15] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100 flex flex-col justify-between">
                <p class="text-[10px] font-light text-white/90 italic leading-relaxed line-clamp-2">
                  "{{ player.quote }}"
                </p>
              </div>

            </div>
          </div>
          
        </div>

      </article>

    </div>
  </section>
</template>

<script setup>
// Data asli Kakak, ditambah atribut Pop-Up Quote!
const roster = [
  {
    ign: 'Naga Keren',
    name: 'Nares',
    role: 'Roamer',
    image: '/images/Roam.jpg',
    quote: 'Funfact Naga Keren itu Nares Ganteng Keren, ga deng canda.'
  },
  {
    ign: 'Lippsy',
    name: 'Alip nur',
    role: 'Midlaner',
    image: '/images/Mid.jpg',
    quote: 'Ganteng setara Song Kang, skill setara Sanz.'
  },
  {
    ign: 'Maung q',
    name: 'Vicky',
    role: 'Midlaner',
    image: '/images/Mid.jpg',
    quote: 'Dilarang Melarang.'
  },
  {
    ign: 'Gambitzzz',
    name: 'Iqbal',
    role: 'Explaner',
    image: '/images/Exp.jpg',
    quote: 'Be patient, trust the process.'
  },
  {
    ign: 'Kirizz',
    name: 'Kirizz',
    role: 'Roamer',
    image: '/images/Roam.jpg',
    quote: 'The game is not over.'
  }
]
</script>

<style scoped>
/* Animasi Masuk Bergelombang (Staggered Entrance) */
@keyframes bento-entrance {
  0% { opacity: 0; transform: translateY(30px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.animate-stagger-1 { animation: bento-entrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
.animate-stagger-2 { animation: bento-entrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
</style>