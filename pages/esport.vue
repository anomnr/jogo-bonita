<template>
  <section class="min-h-screen bg-transparent text-white pt-24 pb-20 overflow-hidden selection:bg-teal-500/30 selection:text-white">
    
    <!-- Header — left-aligned, asymmetric -->
    <div class="mx-auto max-w-[1400px] px-5 md:px-8 mb-14">
      <div class="max-w-xl">
        <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-teal-400/70 block mb-3">
          Divisi Kompetitif
        </span>
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 leading-[1.1]">
          Jogo Bonita<br />Esports
        </h1>
        <h2 class="text-sm text-white/40 uppercase tracking-[0.2em] font-mono mb-5">
          Mobile Legends: Bang Bang
        </h2>
        <p class="text-sm text-white/50 leading-relaxed max-w-md">
          Mengawal garis depan dengan ketenangan malam. Inilah punggawa Jogo Bonita yang siap membelah formasi lawan.
        </p>
      </div>
    </div>

    <!-- Roster grid -->
    <div class="mx-auto max-w-[1400px] px-5 md:px-8">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        
        <article
          v-for="(player, index) in roster"
          :key="index"
          class="group/card relative rounded-xl overflow-hidden bg-jogo-void border border-white/[0.06] cursor-pointer transition-all duration-400 hover:border-teal-400/30 reveal"
          :class="`reveal-delay-${(index % 4) + 1}`"
        >
          <!-- Player image -->
          <div class="aspect-[3/4] w-full overflow-hidden relative">
            <img
              :src="player.image"
              :alt="player.ign"
              class="absolute inset-0 w-full h-full object-cover grayscale-[60%] brightness-80 group-hover/card:grayscale-0 group-hover/card:brightness-100 group-hover/card:scale-105 transition-all duration-700 ease-out"
              loading="lazy"
            />
            
            <!-- Gradient scrim -->
            <div class="absolute inset-0 bg-gradient-to-t from-jogo-void via-jogo-void/50 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity duration-500"></div>

            <!-- Role badge -->
            <div class="absolute top-3 left-3 z-10">
              <span class="px-2.5 py-1 bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] text-[9px] font-mono tracking-widest uppercase text-white/70 rounded-lg">
                {{ player.role }}
              </span>
            </div>

            <!-- Player info — slides up on hover -->
            <div class="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
              <div class="transform translate-y-10 group-hover/card:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <h3 class="text-xl md:text-2xl font-extrabold tracking-tight text-white uppercase group-hover/card:text-teal-400 transition-colors">
                  {{ player.ign }}
                </h3>
                <p class="text-[10px] font-mono text-white/50 uppercase tracking-widest mt-0.5">
                  {{ player.name }}
                </p>

                <!-- Quote — revealed on hover -->
                <div class="h-0 group-hover/card:h-auto overflow-hidden mt-0 group-hover/card:mt-3 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-75">
                  <p class="text-[11px] text-white/60 italic leading-relaxed line-clamp-2 border-t border-white/[0.08] pt-2.5">
                    "{{ player.quote }}"
                  </p>
                </div>
              </div>
            </div>
          </div>

        </article>

      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

// Data asli Kakak, ditambah atribut Pop-Up Quote!
const roster = [
  {
    ign: 'Naga Keren',
    name: 'Nares',
    role: 'Roamer',
    image: '/images/nares.jpg',
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
    image: '/images/Vicky.jpg',
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
  },
  {
    ign: 'Flosolyn.',
    name: 'Yuda',
    role: 'Jungler',
    image: '/images/Jungle.jpg',
    quote: 'Bingung mirip nnael apa kairi.'
  },
  {
    ign: 'C4ko',
    name: 'Cako aselole',
    role: 'Explaner',
    image: '/images/Exp.jpg',
    quote: 'kadang jago kadang kiding.'
  },
  {
    ign: 'K1raline',
    name: 'Kira',
    role: 'Goldlaner',
    image: '/images/Gold.jpg',
    quote: '35,36,37,38,39 near aku menang.'
  },
  {
    ign: 'Rapuyy',
    name: 'Rafa',
    role: 'Jungler',
    image: '/images/Jungle.jpg',
    quote: 'Happiness is not only about money, but togetherness can be happiness.'
  }
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  )

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>