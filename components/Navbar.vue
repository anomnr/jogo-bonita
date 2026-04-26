<template>
  <nav class="w-full bg-jogo-dark/70 backdrop-blur-lg border-b border-jogo-light/20 sticky top-0 z-50">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      
      <NuxtLink to="/" class="flex items-center group">
        <!-- Logo kecil -->
        <img
          src="/images/jogobonitalogo2.png"
          alt="Logo"
          class="h-10 w-10 object-contain"
        />

        <!-- Tulisan dari gambar -->
        <img
          src="/images/Tulisan biru versi BG transparan.png"
          alt="Jogo Bonita"
          class="h-16 md:h-24 object-contain transition duration-300 group-hover:scale-105"
        />
      </NuxtLink>

      <div class="hidden md:flex gap-8 font-semibold text-sm">
        <NuxtLink to="/">Beranda</NuxtLink>
        <NuxtLink to="/profile">Profil</NuxtLink>
        <NuxtLink to="/gallery">Galeri</NuxtLink>
        <NuxtLink to="/contact">Kontak</NuxtLink>
      </div>

    </div>
  </nav>
</template>