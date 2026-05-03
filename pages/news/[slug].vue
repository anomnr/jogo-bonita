<template>
  <main class="min-h-screen bg-jogo-dark text-jogo-light p-20">
    <h1 class="text-5xl font-black">INI HALAMAN DETAIL NEWS</h1>
    <p class="mt-4">Slug: {{ route.params.slug }}</p>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
</script>