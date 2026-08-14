<template>
  <div class="min-h-screen bg-transparent text-jogo-light pt-24 pb-20 selection:bg-teal-500/30 selection:text-white">
    <div class="mx-auto max-w-[1400px] px-5 md:px-8">

      <!-- Header — left-aligned -->
      <div class="mb-14 max-w-lg">
        <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">Hubungi Kami</h1>
        <p class="text-sm text-white/45 leading-relaxed">
          Mari bergabung bersama Jogo Bonita dan menjadi bagian dari komunitas pendukung Bella.
        </p>
      </div>

      <!-- Cards — asymmetric layout -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        <!-- Community card — wider -->
        <div class="md:col-span-7 rounded-xl border border-white/[0.06] bg-white/[0.02] p-7 md:p-9 flex flex-col justify-between">
          <div>
            <h2 class="text-xl font-bold text-white mb-3 tracking-tight">Komunitas Salju</h2>
            <p class="text-sm text-white/50 leading-relaxed max-w-md mb-8">
              Jadilah bagian dari penjaga di malam Arktik. Mari bersama-sama mengawal dan mendukung setiap langkah perjalanan Bonita.
            </p>
          </div>
          <a 
            href="https://forms.gle/ymLXrWX6j2noxitw6" 
            target="_blank" 
            class="inline-flex items-center justify-center w-full md:w-auto rounded-xl bg-teal-400 text-jogo-void font-bold py-3 px-8 text-sm hover:bg-teal-300 transition-colors active:scale-[0.97] transition-transform"
          >
            Bergabung Sekarang
          </a>
        </div>

        <!-- Social media card — narrower -->
        <div class="md:col-span-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-7 md:p-9">
          <h2 class="text-xl font-bold text-white mb-3 tracking-tight">Media Sosial</h2>
          <p class="text-sm text-white/50 leading-relaxed mb-6">
            Ikuti update terbaru dari markas Jogo Bonita.
          </p>
          <div class="space-y-2.5">
            <a 
              href="https://www.instagram.com/jogobonita__/" 
              target="_blank" 
              class="flex items-center justify-between w-full border border-white/[0.08] text-white/70 font-medium py-3 px-5 rounded-xl hover:bg-white/[0.04] hover:border-white/[0.14] hover:text-white transition-all text-sm group"
            >
              Instagram
              <span class="text-white/25 group-hover:text-white/50 transition-colors">&rarr;</span>
            </a>
            <a 
              href="https://x.com/Jogobonita_" 
              target="_blank" 
              class="flex items-center justify-between w-full border border-white/[0.08] text-white/70 font-medium py-3 px-5 rounded-xl hover:bg-white/[0.04] hover:border-white/[0.14] hover:text-white transition-all text-sm group"
            >
              Twitter / X
              <span class="text-white/25 group-hover:text-white/50 transition-colors">&rarr;</span>
            </a>
            <a 
              href="https://www.tiktok.com/@jogobonita_" 
              target="_blank" 
              class="flex items-center justify-between w-full border border-white/[0.08] text-white/70 font-medium py-3 px-5 rounded-xl hover:bg-white/[0.04] hover:border-white/[0.14] hover:text-white transition-all text-sm group"
            >
              TikTok
              <span class="text-white/25 group-hover:text-white/50 transition-colors">&rarr;</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>