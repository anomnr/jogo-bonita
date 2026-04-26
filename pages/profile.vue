<template>
  <div class="min-h-screen bg-jogo-dark text-jogo-light font-sans">
    <section class="relative overflow-hidden border-b border-jogo-light/15">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_25%)]"></div>

      <div class="container mx-auto px-4 py-14 md:py-20 relative">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-5">
            <div class="relative rounded-[2rem] overflow-hidden border border-jogo-light/15 bg-jogo-light/5 shadow-2xl">
              <div class="aspect-[4/5] bg-gradient-to-b from-jogo-light/10 via-jogo-dark to-jogo-dark flex items-center justify-center">
                <img src="/images/christabella_bonita.jpg" alt="Christabella Bonita" class="w-full h-full object-cover" />
              </div>

              <div class="absolute top-4 left-4 px-4 py-1 rounded-full border border-jogo-light/20 bg-jogo-dark/60 backdrop-blur-md text-[10px] uppercase tracking-[0.28em]">
                Jogo Bonita
              </div>
            </div>
          </div>

          <div class="lg:col-span-7">
            <p class="text-[11px] uppercase tracking-[0.35em] text-jogo-light/60 mb-3">JKT48</p>

            <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
              Christabella Bonita
              <span class="text-jogo-light/60 text-xl md:text-3xl font-medium ml-2 align-middle">(Bella)</span>
            </h1>

            <p class="max-w-2xl text-sm md:text-lg text-jogo-light/85 leading-relaxed">
              Sosok yang anggun, cerah, dan memikat dalam setiap langkahnya. Halaman ini merangkum
              profil, karakter, dan kesan yang ingin dirayakan Jogo Bonita untuk Christabella Bonita.
            </p>

            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="item in profileDetails" :key="item.label" class="rounded-2xl border border-jogo-light/15 bg-jogo-light/5 p-5">
                <p class="text-[10px] uppercase tracking-[0.24em] text-jogo-light/55 mb-2">{{ item.label }}</p>
                <p class="text-base md:text-lg font-semibold">{{ item.value }}</p>
              </div>
            </div>

            <div class="mt-8 rounded-[2rem] border border-jogo-light/15 bg-gradient-to-br from-jogo-light/10 to-transparent p-6 md:p-8">
              <p class="text-[10px] uppercase tracking-[0.28em] text-jogo-light/55 mb-3">Signature Line</p>
              <p class="text-lg md:text-2xl leading-relaxed font-light italic text-jogo-light">
                “Ding Dong! Skate, Spin, Smile. Halo, aku Bella!”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <main class="container mx-auto px-4 py-12 md:py-16 space-y-12">
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-7">
          <div class="border-b-2 border-jogo-light/80 mb-6 pb-2">
            <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-wider">Tentang Bella</h2>
          </div>

          <div class="space-y-5 text-sm md:text-base text-jogo-light/85 leading-8">
            <p>
              Bella hadir dengan pesona yang lembut namun tetap berkarakter. Ada kesan ringan, manis,
              dan bersinar yang terasa alami dalam cara dirinya tampil, berinteraksi, dan membangun suasana.
            </p>
            <p>
              Di mata Jogo Bonita, Bella bukan hanya sosok yang menarik untuk diikuti, tetapi juga
              sosok yang memberi warna melalui gerak, ekspresi, dan energi yang dibawanya.
            </p>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="border-b-2 border-jogo-light/80 mb-6 pb-2">
            <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-wider">Karakter</h2>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <div v-for="trait in traits" :key="trait.title" class="rounded-2xl border border-jogo-light/15 bg-jogo-light/5 p-5 hover:bg-jogo-light/10 transition">
              <p class="text-[10px] uppercase tracking-[0.24em] text-jogo-light/55 mb-2">{{ trait.label }}</p>
              <h3 class="text-lg font-bold mb-2">{{ trait.title }}</h3>
              <p class="text-sm text-jogo-light/75 leading-7">{{ trait.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="border-b-2 border-jogo-light/80 mb-6 pb-2">
          <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-wider">Highlight</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div v-for="highlight in highlights" :key="highlight.title" class="rounded-[1.75rem] border border-jogo-light/15 bg-jogo-light/5 p-6 hover:bg-jogo-light/10 transition">
            <p class="text-[10px] uppercase tracking-[0.24em] text-jogo-light/55 mb-3">{{ highlight.kicker }}</p>
            <h3 class="text-xl font-bold mb-3">{{ highlight.title }}</h3>
            <p class="text-sm text-jogo-light/75 leading-7">{{ highlight.description }}</p>
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-8">
          <div class="border-b-2 border-jogo-light/80 mb-6 pb-2">
            <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-wider">Galeri Nuansa</h2>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="(image, index) in galleryImages" :key="index" class="overflow-hidden rounded-[1.5rem] border border-jogo-light/15 bg-jogo-light/5 aspect-[4/5]">
              <img :src="image" alt="Bella gallery" class="w-full h-full object-cover hover:scale-105 transition duration-500" />
            </div>
          </div>
        </div>

        <div class="lg:col-span-4">
          <div class="border-b-2 border-jogo-light/80 mb-6 pb-2">
            <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-wider">Profil Singkat</h2>
          </div>

          <div class="space-y-4">
            <div v-for="item in profileInfo" :key="item.label" class="rounded-2xl border border-jogo-light/15 bg-jogo-light/5 p-5">
              <p class="text-[10px] uppercase tracking-[0.24em] text-jogo-light/55 mb-2">{{ item.label }}</p>
              <p class="text-sm md:text-base font-medium leading-7">{{ item.value }}</p>
            </div>
          </div>

          <NuxtLink to="/contact" class="mt-6 block rounded-[1.75rem] border border-jogo-light/20 bg-gradient-to-br from-jogo-light/10 to-transparent p-7 text-center hover:from-jogo-light/20 transition relative overflow-hidden group">
            <div class="absolute -right-5 -top-5 w-20 h-20 rounded-full bg-jogo-light/10 blur-2xl group-hover:scale-150 transition duration-500"></div>
            <h3 class="font-accent text-4xl mb-2 relative">Join Jogo Bonita</h3>
            <p class="text-[10px] uppercase tracking-[0.24em] opacity-70 relative">Mari Menjaga Dalam Senyap</p>
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
const profileDetails = [
  { label: 'Tanggal Lahir', value: '02 Maret 2011' },
  { label: 'Tinggi', value: '161 cm' },
  { label: 'Golongan Darah', value: 'A' },
  { label: 'Horoskop', value: 'Pisces' },
  { label: 'Tim', value: 'Trainee' },
]

const traits = [
  {
    label: 'Aura',
    title: 'Anggun dan Lembut',
    description: 'Kehadiran yang terasa halus, nyaman dipandang, dan tetap meninggalkan kesan kuat lewat pembawaan yang rapi dan elegan.',
  },
  {
    label: 'Energi',
    title: 'Cerah dan Menghidupkan',
    description: 'Setiap momen terasa lebih hangat dengan ekspresi dan energi yang ringan, manis, dan mampu membangun suasana.',
  },
  {
    label: 'Kesan',
    title: 'Manis namun Berkarakter',
    description: 'Ada keseimbangan antara kelembutan visual dan karakter personal yang membuat sosok Bella mudah diingat.',
  },
]

const highlights = [
  {
    kicker: 'Visual',
    title: 'Clean Presence',
    description: 'Pendekatan visual yang sederhana membuat pesona Bella terasa lebih menonjol tanpa perlu elemen yang berlebihan.',
  },
  {
    kicker: 'Persona',
    title: 'Bright Expression',
    description: 'Ekspresi yang cerah dan natural menjadi salah satu daya tarik utama yang memberi identitas kuat pada tiap penampilan.',
  },
  {
    kicker: 'Mood',
    title: 'Soft Elegance',
    description: 'Nuansa lembut, rapi, dan tenang menjadi dasar presentasi profil ini agar tetap selaras dengan identitas Jogo Bonita.',
  },
]

const profileInfo = [
  { label: 'Nama Lengkap', value: 'Christabella Bonita' },
  { label: 'Nama Panggilan', value: 'Bella' },
  { label: 'Catchphrase', value: 'Ding Dong! Skate, Spin, Smile. Halo, aku Bella!' },
  { label: 'Fanbase', value: 'Jogo Bonita' },
  { label: 'Horoskop', value: 'Pisces' },
  { label: 'Tim', value: 'Trainee' },
]

const galleryImages = [
  '/images/christabella_bonita.jpg',
]
</script>