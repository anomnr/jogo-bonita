<template>
  <div class="min-h-screen bg-transparent text-jogo-light pt-20 pb-24 selection:bg-teal-500/30 selection:text-white">
    <div class="mx-auto max-w-[1400px] px-5 md:px-8">

      <!-- ═══════════════════════════════════════════
           HERO: Asymmetric split — portrait left, identity right
           ═══════════════════════════════════════════ -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12 items-start mb-20 lg:mb-28">

        <!-- Left: Portrait with floating badge & grayscale reveal -->
        <div class="lg:col-span-5 relative profile-reveal" style="--reveal-delay: 0s">
          <div
            class="group/portrait relative rounded-2xl overflow-hidden aspect-[3/4] bg-jogo-void
                   border border-white/[0.08] border-t-white/[0.25] border-l-white/[0.15]"
          >
            <img
              src="/images/christabella_bonita.jpg"
              alt="Christabella Bonita — Trainee JKT48 Gen 14"
              class="w-full h-full object-cover transition-all duration-700
                     ease-[cubic-bezier(0.16,1,0.3,1)]
                     group-hover/portrait:scale-110"
              loading="eager"
            />
            <!-- Gradient scrim at bottom -->
            <div class="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-jogo-void/90 via-jogo-void/40 to-transparent pointer-events-none"></div>

            <!-- Status chip — bottom left -->
            <div class="absolute bottom-5 left-5 flex items-center gap-2.5 px-3.5 py-2 rounded-full
                        bg-white/[0.05] backdrop-blur-2xl
                        border border-white/[0.08] border-t-white/[0.2]">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-jogo-cyan opacity-60"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-jogo-cyan"></span>
              </span>
              <span class="text-[11px] tracking-wide text-white/90 font-medium">Active Trainee</span>
            </div>

            <!-- Generation badge — top right -->
            <div class="absolute top-4 right-4 px-3 py-1.5 rounded-full
                        bg-white/[0.05] backdrop-blur-2xl
                        border border-white/[0.08] border-t-white/[0.2]
                        text-[10px] font-mono uppercase tracking-[0.2em] text-jogo-champagne/80">
              Gen 14
            </div>
          </div>
        </div>

        <!-- Right: Identity block — editorial vertical stack -->
        <div class="lg:col-span-7 flex flex-col justify-center pt-8 lg:pt-4">

          <span
            class="text-[10px] font-mono uppercase tracking-[0.25em] text-jogo-cyan/70 mb-4 profile-reveal"
            style="--reveal-delay: 0.08s"
          >14th Generation · JKT48</span>

          <h1
            class="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] text-white mb-2 profile-reveal"
            style="--reveal-delay: 0.14s"
          >
            Christabella<br class="hidden md:block" /> Bonita
          </h1>

          <p
            class="text-sm md:text-base text-white/55 leading-relaxed max-w-[52ch] mb-8 profile-reveal"
            style="--reveal-delay: 0.22s"
          >
            Christabella Bonita Claura Chandra — gadis Tangerang kelahiran 2011 yang mengantongi pesona seorang
            <em>natural performer</em>. Dari arena <em>ice skating</em> ke panggung teater JKT48,
            setiap gerakannya bawa kehangatan dan determinasi yang bikin kamu susah berpaling.
          </p>

          <!-- Quick stats — horizontal list -->
          <div
            class="grid grid-cols-3 gap-x-6 gap-y-4 border-t border-white/[0.08] pt-6 profile-reveal"
            style="--reveal-delay: 0.28s"
          >
            <div v-for="stat in quickStats" :key="stat.label">
              <span class="block text-[10px] font-mono uppercase tracking-wider text-white/35 mb-1">{{ stat.label }}</span>
              <span class="block text-sm font-semibold text-white/90">{{ stat.value }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           BENTO GRID: Biodata (left) + Timeline (right)
           ═══════════════════════════════════════════ -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20 lg:mb-28">

        <!-- ─── LEFT COLUMN: Biodata + Jikoshoukai + Trivia ─── -->
        <div class="lg:col-span-5 flex flex-col gap-6">

          <!-- Biodata Card -->
          <div class="obsidian-card rounded-2xl p-6 md:p-8 reveal">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-lg bg-jogo-cyan/10 flex items-center justify-center">
                <svg class="w-4 h-4 text-jogo-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 class="text-lg font-bold text-white tracking-tight">Biodata</h2>
            </div>

            <div class="space-y-4">
              <div v-for="item in biodata" :key="item.label" class="flex items-start gap-3">
                <span class="text-[11px] font-mono uppercase tracking-wider text-white/30 w-24 shrink-0 pt-0.5">{{ item.label }}</span>
                <span class="text-sm text-white/80 leading-relaxed">{{ item.value }}</span>
              </div>
            </div>
          </div>

          <!-- Jikoshoukai Card -->
          <div class="obsidian-card rounded-2xl p-6 md:p-8 reveal">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-8 h-8 rounded-lg bg-jogo-champagne/10 flex items-center justify-center">
                <svg class="w-4 h-4 text-jogo-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h2 class="text-lg font-bold text-white tracking-tight">Jikoshoukai</h2>
              <span class="text-[9px] font-mono uppercase tracking-wider text-white/25 ml-auto">自己紹介</span>
            </div>

            <div class="relative pl-5 border-l-2 border-jogo-champagne/20">
              <p class="text-sm text-white/65 leading-relaxed italic mb-3">
                "Ding-dong! Skate, spin, smile."
              </p>
              <span class="text-[10px] font-mono text-jogo-champagne/50">— Panggung JKT48 Theater</span>
            </div>

            <div class="mt-5 pt-4 border-t border-white/[0.06]">
              <span class="block text-[10px] font-mono uppercase tracking-wider text-white/30 mb-2">Panggilan Fans</span>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="nick in nicknames"
                  :key="nick"
                  class="px-3 py-1 rounded-full text-[11px] font-medium
                         bg-white/[0.04] border border-white/[0.08]
                         text-white/70 transition-all duration-300
                         hover:bg-jogo-champagne/10 hover:border-jogo-champagne/20 hover:text-jogo-champagne/90"
                >{{ nick }}</span>
              </div>
            </div>
          </div>

          <!-- Trivia Card -->
          <div class="obsidian-card rounded-2xl p-6 md:p-8 reveal">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-lg bg-jogo-teal/10 flex items-center justify-center">
                <svg class="w-4 h-4 text-jogo-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 class="text-lg font-bold text-white tracking-tight">Fakta & Trivia</h2>
            </div>

            <div class="space-y-3">
              <div
                v-for="(fact, idx) in triviaFacts"
                :key="idx"
                class="flex items-start gap-3 group/fact"
              >
                <span class="text-jogo-champagne/50 text-sm mt-0.5 transition-colors duration-300
                             group-hover/fact:text-jogo-champagne">✦</span>
                <p class="text-sm text-white/55 leading-relaxed transition-colors duration-300
                          group-hover/fact:text-white/75">{{ fact }}</p>
              </div>
            </div>
          </div>

          <!-- Signature Traits — compact cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="trait in traits"
              :key="trait.title"
              class="obsidian-card rounded-2xl p-5 group/trait reveal"
            >
              <span class="block text-[10px] font-mono uppercase tracking-[0.2em] mb-2"
                :class="trait.accentClass">{{ trait.tag }}</span>
              <h3 class="text-base font-bold text-white tracking-tight mb-2">{{ trait.title }}</h3>
              <p class="text-[13px] text-white/50 leading-relaxed">{{ trait.desc }}</p>
              <div class="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-3">
                <div class="w-full bg-white/[0.06] rounded-full h-1 overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-1000 ease-out trait-bar"
                    :class="trait.barClass"
                    :style="`--bar-width: ${trait.barWidth}`"></div>
                </div>
                <span class="text-[9px] font-mono whitespace-nowrap"
                  :class="trait.labelClass">{{ trait.barLabel }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ─── RIGHT COLUMN: Career Timeline ─── -->
        <div class="lg:col-span-7">
          <div class="obsidian-card rounded-2xl p-6 md:p-8 reveal">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-8 h-8 rounded-lg bg-jogo-cyan/10 flex items-center justify-center">
                <svg class="w-4 h-4 text-jogo-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 class="text-lg font-bold text-white tracking-tight">Jejak Langkah</h2>
            </div>
            <p class="text-sm text-white/40 max-w-[50ch] leading-relaxed mb-8">
              Merayakan setiap momen kecilnya — dari pengumuman pertama hingga panggung yang semakin besar.
            </p>

            <!-- Interactive Timeline -->
            <div class="relative pl-8 md:pl-10">
              <!-- Vertical line -->
              <div class="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-jogo-cyan/30 via-white/[0.08] to-transparent"></div>

              <div
                v-for="(step, idx) in milestones"
                :key="step.title"
                class="relative pb-10 last:pb-0 group/step reveal"
              >
                <!-- Timeline node -->
                <div
                  class="absolute -left-[calc(2rem+5px)] md:-left-[calc(2.5rem+5px)] top-1.5 w-[10px] h-[10px] rounded-full border-2
                         transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  :class="idx === 0
                    ? 'bg-jogo-champagne border-jogo-champagne shadow-[0_0_12px_rgba(226,201,154,0.4)]'
                    : 'bg-jogo-void border-white/20 group-hover/step:border-jogo-champagne group-hover/step:bg-jogo-champagne group-hover/step:shadow-[0_0_10px_rgba(226,201,154,0.3)]'"
                ></div>

                <!-- Content -->
                <div class="pb-2">
                  <div class="flex items-center gap-3 mb-1.5">
                    <span class="text-[11px] font-mono font-semibold tracking-wide"
                      :class="idx === 0
                        ? 'text-jogo-champagne'
                        : 'text-white/40 group-hover/step:text-jogo-champagne/70 transition-colors duration-300'"
                    >{{ step.kicker }}</span>
                    <span v-if="step.badge"
                      class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider
                             bg-jogo-champagne/10 text-jogo-champagne/70 border border-jogo-champagne/15">
                      {{ step.badge }}
                    </span>
                  </div>
                  <h4 class="text-base md:text-lg font-bold text-white mb-2 tracking-tight">{{ step.title }}</h4>
                  <p class="text-sm text-white/50 leading-relaxed max-w-[50ch]">{{ step.desc }}</p>

                  <!-- Gallery thumbnails if available -->
                  <div v-if="step.images && step.images.length" class="flex gap-2 mt-4">
                    <div
                      v-for="(img, imgIdx) in step.images"
                      :key="imgIdx"
                      class="w-16 h-16 rounded-lg overflow-hidden border border-white/[0.08]
                             group/thumb cursor-pointer
                             transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                             hover:border-white/[0.2] hover:scale-[1.02]"
                    >
                      <img
                        :src="img"
                        :alt="`${step.title} — foto ${imgIdx + 1}`"
                        class="w-full h-full object-cover opacity-60
                               transition-all duration-500
                               group-hover/thumb:opacity-100"
                      />
                    </div>
                  </div>
                </div>

                <!-- Connector line between items -->
                <div v-if="idx < milestones.length - 1"
                  class="absolute left-0 top-6 bottom-0 w-px bg-transparent"></div>
              </div>
            </div>
          </div>

          <!-- ─── Photo Mosaic — small asymmetric grid ─── -->
          <div class="mt-6 grid grid-cols-3 gap-3 reveal">
            <div
              v-for="(photo, idx) in galleryPhotos"
              :key="idx"
              class="group/photo rounded-xl overflow-hidden border border-white/[0.08] border-t-white/[0.15]
                     transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                     hover:scale-[1.02] hover:border-white/[0.15]"
              :class="photo.span"
            >
              <img
                :src="photo.src"
                :alt="photo.alt"
                class="w-full h-full object-cover transition-all duration-700
                       ease-[cubic-bezier(0.16,1,0.3,1)]
                       group-hover/photo:scale-110"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           BOTTOM: Fun Facts / Closing message
           ═══════════════════════════════════════════ -->
      <section class="reveal">
        <div class="obsidian-card rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto">
          <p class="font-accent text-3xl md:text-4xl text-jogo-champagne/60 mb-4">Jogo Bonita</p>
          <p class="text-sm text-white/45 leading-relaxed max-w-[45ch] mx-auto mb-6">
            Ruang kecil dari fans yang percaya bahwa perjalanan Bella baru saja dimulai.
            Setiap langkah kecilnya, kita rayakan bersama.
          </p>
          <div class="flex items-center justify-center gap-3 text-white/25">
            <span class="w-8 h-px bg-white/10"></span>
            <span class="text-jogo-champagne/50 text-xs">✦</span>
            <span class="w-8 h-px bg-white/10"></span>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

// ─── BIODATA ───
const quickStats = [
  { label: 'Panggilan', value: 'Bella, Bonbon' },
  { label: 'Lahir', value: '02 Maret 2011' },
  { label: 'Tinggi', value: '161 cm' },
  { label: 'Gol. Darah', value: 'A' },
  { label: 'Zodiak', value: 'Pisces ♓' },
  { label: 'Bergabung', value: '14 Feb 2026' }
]

const biodata = [
  { label: 'Nama Lengkap', value: 'Christabella Bonita Claura Chandra' },
  { label: 'Tempat Lahir', value: 'Tangerang, Banten' },
  { label: 'Tanggal Lahir', value: '2 Maret 2011 (15 tahun)' },
  { label: 'Zodiak', value: 'Pisces ♓' },
  { label: 'Tinggi Badan', value: '161 cm' },
  { label: 'Gol. Darah', value: 'Tipe A' },
  { label: 'Hobi', value: 'Ice Skating, Dance, Menyanyi' },
  { label: 'Generasi', value: '14th Generation JKT48' },
  { label: 'Debut', value: '14 Februari 2026' }
]

const nicknames = ['Bella', 'Bonbon', 'Bon', 'Bonita']

// ─── TRIVIA ───
const triviaFacts = [
  'Sebelum menjadi trainee JKT48, Bella adalah seorang penggemar setia yang rajin datang ke handshake event dan teater.',
  'Punya background di ice skating — makanya gerakan panggungnya terasa sangat halus dan terkontrol.',
  'Dijuluki "Es Krim Vanilla" oleh sesama trainee karena penampilannya yang manis tapi bikin ketagihan.',
  'Di antara Gen 14, Bella dikenal sebagai anak yang paling cepat menghafal koreografi baru.',
  'Terkenal dengan senyum khasnya yang selalu muncul bahkan saat koreografi paling intens.',
  'Fans sering menyebut momennya di panggung sebagai "Bonbon Time" — saat semua mata otomatis tertuju padanya.'
]

// ─── TRAITS ───
const traits = [
  {
    tag: 'Presence',
    title: 'Anggun & Lembut',
    desc: 'Pembawaan yang halus, rapi, dan tetap meninggalkan jejak elegan di setiap tampilan.',
    accentClass: 'text-jogo-cyan/70',
    barClass: 'bg-jogo-cyan/50',
    barWidth: '94%',
    barLabel: 'Resonance'
  },
  {
    tag: 'Output',
    title: 'Cerah Menghidupkan',
    desc: 'Energi ringan yang bikin setiap sudut teater terasa lebih hangat dan menyenangkan.',
    accentClass: 'text-white/40',
    barClass: 'bg-white/20',
    barWidth: '88%',
    barLabel: 'Atmosphere'
  }
]

const labelClass = 'text-white/35'

// ─── MILESTONES ───
const milestones = [
  {
    kicker: '14 Februari 2026',
    badge: 'Debut',
    title: 'Pengumuman Generasi 14',
    desc: 'Resmi diperkenalkan sebagai anggota Generasi 14 JKT48. Dari kursi penonton ke atas panggung — mimpi yang jadi kenyataan.',
    images: ['/images/christabella_bonita1.jpg', '/images/christabella_bonita2.jpg']
  },
  {
    kicker: 'Mei 2026',
    badge: 'Center',
    title: 'Debut Setlist Pajama Drive',
    desc: 'Mencetak debut panggung pertamanya dan langsung dipercaya memegang posisi Global Center di setlist legendaris Pajama Drive.',
    images: ['/images/pajama_drive.png']
  },
  {
    kicker: 'Juni 2026',
    badge: null,
    title: 'Unit Song: Junjou Shugi & Jean Da Arc',
    desc: 'Membuktikan kualitas performanya lewat posisi center di "Junjou Shugi" dan tampil memukau di "Kagami no Naka no Jean Da Arc".',
    images: ['/images/christabella_bonita3.jpg']
  },
  {
    kicker: 'Juli 2026',
    badge: null,
    title: 'Pertumbuhan Fanbase',
    desc: 'Komunitas Jogo Bonita tumbuh pesat — dari segelintir pengagum menjadi barisan fans yang solid dan saling mendukung.',
    images: null
  },
  {
    kicker: 'Agustus 2026',
    badge: 'Ongoing',
    title: 'Perjalanan Berlanjut...',
    desc: 'Setiap show baru, setiap latihan, setiap senyum di teater — Bella terus menuliskan ceritanya. Dan kita, di sini, menemaninya.',
    images: null
  }
]

// ─── GALLERY ───
const galleryPhotos = [
  { src: '/images/christabella_bonita4.jpg', alt: 'Bella portrait 1', span: 'row-span-2 aspect-[3/5]' },
  { src: '/images/christabella_bonita5.jpg', alt: 'Bella portrait 2', span: 'aspect-square' },
  { src: '/images/christabella_bonita6.jpg', alt: 'Bella portrait 3', span: 'aspect-square' },
  { src: '/images/christabella_bonita7.jpg', alt: 'Bella portrait 4', span: 'aspect-square' },
  { src: '/images/christabella_bonita8.jpg', alt: 'Bella portrait 5', span: 'aspect-square' }
]

// ─── INTERSECTION OBSERVER ───
let observer = null

onMounted(() => {
  // Scroll-triggered reveal
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el)
  })

  // Trait bar animation
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.style.getPropertyValue('--bar-width')
          barObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 }
  )

  document.querySelectorAll('.trait-bar').forEach((el) => {
    el.style.width = '0%'
    barObserver.observe(el)
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* ═══════════════════════════════════════════
   OBSIDIAN ARCTIC 2.0 — Textured Glass Cards
   ═══════════════════════════════════════════ */
.obsidian-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top-color: rgba(255, 255, 255, 0.25);
  border-left-color: rgba(255, 255, 255, 0.15);
  transition:
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.obsidian-card:hover {
  transform: scale(1.02);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow:
    0 0 30px rgba(0, 242, 254, 0.03),
    0 8px 32px rgba(0, 0, 0, 0.3);
}

/* ═══════════════════════════════════════════
   STAGGERED HERO ENTRANCE
   ═══════════════════════════════════════════ */
.profile-reveal {
  opacity: 0;
  transform: translateY(24px);
  animation: profileEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: var(--reveal-delay, 0s);
}

@keyframes profileEntrance {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ═══════════════════════════════════════════
   SCROLL-REVEAL (IntersectionObserver driven)
   ═══════════════════════════════════════════ */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.reveal-active {
  opacity: 1;
  transform: translateY(0);
}

/* ═══════════════════════════════════════════
   REDUCED MOTION
   ═══════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  .profile-reveal,
  .reveal {
    opacity: 1;
    transform: none;
    animation: none;
    transition: none;
  }

  .obsidian-card:hover {
    transform: none;
  }

  .trait-bar {
    width: var(--bar-width) !important;
    transition: none;
  }
}
</style>