<template>
  <section id="hashtag-guide" class="relative bg-jogo-dark border-t border-jogo-light/10 py-16 md:py-24 overflow-hidden">
    <div class="absolute inset-0 blueprint-grid pointer-events-none"></div>
    <div class="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-jogo-light/40 to-transparent"></div>
    <div class="absolute -left-32 top-24 w-80 h-80 bg-jogo-light/5 rounded-full blur-3xl"></div>
    <div class="absolute -right-32 bottom-24 w-80 h-80 bg-jogo-light/5 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <div class="max-w-3xl">
          <p class="text-[10px] md:text-xs uppercase tracking-[0.4em] text-jogo-light/55 mb-3">
            Jogo Bonita Playbook
          </p>

          <h2 class="font-accent text-5xl md:text-7xl leading-none mb-5">
            Hashtag Guide
          </h2>

          <p class="text-sm md:text-base text-jogo-light/70 leading-relaxed max-w-2xl">
            Panduan hashtag untuk menjaga dukungan tetap rapi, hangat, dan punya identitas yang sama di setiap momen Bella.
          </p>
        </div>

        <div class="rounded-2xl border border-jogo-light/15 bg-jogo-light/5 px-5 py-4 backdrop-blur-md">
          <p class="text-[10px] uppercase tracking-[0.28em] text-jogo-light/45 mb-1">
            Total Tags
          </p>
          <p class="text-3xl font-black">
            {{ hashtagGuides.length }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
        <article
            v-for="(item, index) in hashtagGuides"
            :key="item.tag"
            class="reveal jb-card group rounded-2xl border border-jogo-light/15 bg-gradient-to-br from-jogo-light/10 via-jogo-light/5 to-transparent p-6 md:p-7 min-h-[230px] transition duration-300"
            :class="`reveal-delay-${(index % 4) + 1}`"
        >
          <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-jogo-light/60 to-transparent"></div>

          <span class="absolute -right-4 -bottom-10 text-[9rem] font-black leading-none text-jogo-light/5 select-none group-hover:text-jogo-light/10 transition">
            #
          </span>

          <div class="relative z-10 h-full flex flex-col">
            <div class="flex items-start justify-between gap-4 mb-8">
              <span class="text-[10px] font-bold uppercase tracking-[0.25em] text-jogo-light/55">
                {{ item.category }}
              </span>

              <span class="text-[10px] font-bold px-2.5 py-1 rounded-full border border-jogo-light/20 text-jogo-light/55">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </div>

            <h3 class="font-bold text-2xl md:text-3xl tracking-tight mb-4 group-hover:underline decoration-jogo-light/40 underline-offset-4">
              {{ item.tag }}
            </h3>

            <p class="text-sm md:text-[15px] leading-relaxed text-jogo-light/70">
              {{ item.description }}
            </p>

            <div class="mt-auto pt-7">
              <button
                type="button"
                class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-jogo-light/50 group-hover:text-jogo-light transition"
                @click="copyHashtag(item.tag)"
              >
                Copy Tag
                <span>→</span>
              </button>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-10 rounded-2xl border border-jogo-light/15 bg-jogo-light/5 p-6 md:p-8 relative overflow-hidden">
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

          <p class="shrink-0 rounded-full border border-jogo-light/20 px-5 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-jogo-light/60">
            {{ copiedTag ? `${copiedTag} copied` : 'Support Bella' }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const copiedTag = ref('')

const hashtagGuides = [
  {
    category: 'Pagi',
    tag: '#BoNdia',
    description: 'isi gess apa wkwk.',
  },
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

const copyHashtag = async (tag) => {
  copiedTag.value = tag

  if (process.client && navigator?.clipboard) {
    await navigator.clipboard.writeText(tag)
  }

  setTimeout(() => {
    copiedTag.value = ''
  }, 1800)
}

import { onMounted } from 'vue'

onMounted(() => {
  const elements = document.querySelectorAll('.reveal')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active')
        }
      })
    },
    {
      threshold: 0.15,
    }
  )

  elements.forEach((el) => observer.observe(el))
})
</script>

<style scoped>
.blueprint-grid {
  opacity: 0.06;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.55) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.55) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
}
</style>

