<template>
  <div class="min-h-screen bg-jogo-void text-jogo-light relative selection:bg-teal-500/30 selection:text-white z-0 overflow-x-hidden">
    
    <!-- Aurora background blobs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div class="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-jogo-cyan/20 to-jogo-teal/10 blur-[140px] animate-aurora-1"></div>
      <div class="absolute top-[35%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-blue-600/15 via-jogo-glass/30 to-transparent blur-[160px] animate-aurora-2"></div>
      <div class="absolute -bottom-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-r from-jogo-teal/15 to-emerald-400/8 blur-[150px] animate-aurora-3"></div>
      <div class="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none bg-repeat bg-noise-texture"></div>
    </div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

  </div>
</template>

<style>
@font-face {
  font-family: 'Cookie Supply';
  src: url('/fonts/Cookie-Supply.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
</style>

<style scoped>
@keyframes drift-1 {
  0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
  50% { transform: translateY(40px) translateX(30px) scale(1.08); }
}
@keyframes drift-2 {
  0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
  50% { transform: translateY(-50px) translateX(-40px) scale(0.95); }
}
@keyframes drift-3 {
  0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
  50% { transform: translateY(-30px) translateX(50px) scale(1.05); }
}
.animate-aurora-1 { animation: drift-1 18s ease-in-out infinite; }
.animate-aurora-2 { animation: drift-2 22s ease-in-out infinite; }
.animate-aurora-3 { animation: drift-3 25s ease-in-out infinite; }

.bg-noise-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
</style>