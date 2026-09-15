<template>
  <!-- Menampilkan gambar jika API berhasil merespons -->
  <img
    v-if="!pending && data && data.url"
    :src="data.url"
    v-bind="$attrs" 
  />
  
  <!-- Efek loading skeleton abu-abu saat gambar sedang dimuat -->
  <div 
    v-else 
    class="bg-gray-200 animate-pulse flex items-center justify-center" 
    v-bind="$attrs"
  >
    <span class="text-gray-400 text-sm">Memuat...</span>
  </div>
</template>

<script setup>
// Wajib ada: Mencegah Vue menumpuk class CSS di elemen yang salah
defineOptions({ inheritAttrs: false })

const props = defineProps({
  imageId: {
    type: String,
    required: true
  }
});

// Fetch ke backend API yang sudah dibuat sebelumnya
const { data, pending } = await useFetch('/api/get-image', {
  query: { publicId: props.imageId }
});
</script>