<template>
  <section id="hashtag-guide" class="relative border-t border-white/[0.06] py-20 md:py-28 overflow-hidden">

    <div class="mx-auto max-w-[1400px] px-5 md:px-8 relative z-10">
      
      <!-- Section header -->
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
        <div class="max-w-xl">
          <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            Hashtag Guide
          </h2>
          <p class="text-sm text-white/50 leading-relaxed">
            Panduan hashtag untuk menjaga dukungan tetap rapi, hangat, dan punya identitas yang sama di setiap momen Bella.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-[10px] font-mono uppercase tracking-wider text-white/30">Total Tags</span>
          <span class="text-2xl font-extrabold text-white">{{ hashtagGuides.length }}</span>
        </div>
      </div>

      <!-- Hashtag grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
        <component
          :is="item.tag === '#Bellastseen' ? 'a' : 'article'"
          v-for="(item, index) in hashtagGuides"
          :key="item.tag"
          :href="item.tag === '#Bellastseen' ? 'https://x.com/Jogobonita_/status/2058428087931695548?s=20' : undefined"
          :target="item.tag === '#Bellastseen' ? '_blank' : undefined"
          class="reveal jb-card group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-7 min-h-[210px] transition-colors duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
          :class="[
            `reveal-delay-${(index % 4) + 1}`,
            item.tag === '#Bellastseen' ? 'cursor-pointer block' : ''
          ]"
        >
          <div class="relative z-10 h-full flex flex-col">
            <div class="flex items-start justify-between gap-4 mb-6">
              <span class="text-[10px] font-mono uppercase tracking-[0.18em] text-white/35">
                {{ item.category }}
              </span>
              <span class="text-[10px] font-mono text-white/25 tabular-nums">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </div>

            <h3 class="font-bold text-xl md:text-2xl tracking-tight mb-3 text-white group-hover:text-teal-400 transition-colors duration-300">
              {{ item.tag }}
            </h3>

            <p class="text-sm leading-relaxed text-white/50 flex-1">
              {{ item.description }}
            </p>

            <div class="mt-6 pt-4 border-t border-white/[0.04]">
              <button
                type="button"
                class="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35 group-hover:text-teal-400/70 transition-colors"
                @click="copyHashtag(item.tag)"
              >
                Copy Tag
                <span class="transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </button>
            </div>
          </div>
        </component>
      </div>

      <!-- Reminder strip -->
      <div class="mt-10 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h3 class="text-lg md:text-xl font-bold text-white mb-1.5">
              Pakai sesuai konteks, jaga tetap positif.
            </h3>
            <p class="text-sm text-white/45 leading-relaxed max-w-xl">
              Setiap hashtag dibuat sebagai identitas dukungan. Gunakan untuk apresiasi, interaksi, review, dan momen kebersamaan Jogo Bonita.
            </p>
          </div>

          <span class="shrink-0 rounded-xl border border-white/[0.08] px-5 py-3 text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-white/40 transition-colors"
            :class="copiedTag ? 'border-teal-400/30 text-teal-400/70' : ''"
          >
            {{ copiedTag ? `${copiedTag} copied` : 'Support Bella' }}
          </span>
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
    category: 'Semua tentang Bella',
    tag: '#Bellove',
    description: 'Hashtag utama yang dipilih secara pribadi oleh Bella sebagai rumah untuk segala bentuk dukungan, apresiasi, dan cinta dari para fans.',
  },
  {
    category: 'Pagi',
    tag: '#BonDia',
    description: 'Ucapan Selamat Pagi dengan sentuhan identitas Bella. Awali hari dengan semangat dan dukungan untuk perjalanan Bella.',
  },
  {
    category: 'Malam',
    tag: '#BoNoite',
    description: 'Gabungan "boa noite" + "Bonita". Penutup hari yang hangat dengan identitas Bella.',
  },
  {
    category: 'PAP Harian',
    tag: '#RaBonBon',
    description: 'Terinspirasi dari hari lahir Bella, Rabu, 2 Maret 2011. Momen spesial mingguan untuk apresiasi dan posting tentang Bella.',
  },
  {
    category: 'Review Penampilan',
    tag: '#Bellajar',
    description: 'Digunakan untuk review penampilan Bella, baik theater, live, maupun event sebagai bentuk dukungan untuk berkembang.',
  },
  {
    category: 'Semangat & Growth',
    tag: '#Bonitastic',
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
    category: 'Momen Langsung',
    tag: '#Bellastseen',
    description: 'Wadah untuk mengumpulkan fancam, foto, dan berbagai momen ketika para #ReBell bertemu atau menyaksikan Bella secara langsung.',
  },
  {
    category: 'Penantian Panjang',
    tag: '#MenantiBella',
    description: 'Hashtag untuk menghitung setiap hari dan menyimpan harapan hingga Bella memiliki media sosialnya sendiri.',
  },
  {
    category: 'Karya Tangan',
    tag: '#Bellakit',
    description: 'Tempat untuk menampung konten dan hasil kreativitas Bella dan #ReBell yang berhubungan dengan merakit atau sedang membuat sebuah karya.',
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
