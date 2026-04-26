<template>
  <div class="min-h-screen bg-jogo-dark text-jogo-light font-sans py-12 px-4 selection:bg-jogo-light selection:text-jogo-dark">
    <div class="container mx-auto max-w-7xl">

      <div class="flex justify-between items-end mb-10 border-b border-jogo-light/20 pb-6">
        <div>
          <h1 class="font-accent text-5xl text-jogo-light tracking-wide mb-2">Markas Penjaga</h1>
          <p class="text-sm font-light text-jogo-light/70 uppercase tracking-widest">Dashboard Manajemen Jadwal Bonita</p>
        </div>
        
        <NuxtLink to="/" class="text-sm border border-jogo-light/30 px-4 py-2 rounded-full hover:bg-jogo-light hover:text-jogo-dark transition-all">
          &larr; Kembali ke Stadion
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <div class="lg:col-span-4">
          <div class="bg-jogo-light/5 backdrop-blur-md border border-jogo-light/20 p-6 rounded-2xl sticky top-24">
            <h2 class="text-xl font-bold mb-6 border-b border-jogo-light/10 pb-2">Tambah Jadwal Baru</h2>
            
            <form @submit.prevent="addSchedule" class="space-y-4">
              <div>
                <label class="block text-xs uppercase tracking-wider text-jogo-light/70 mb-1">Nama Event</label>
                <input 
                  v-model="form.event_name" 
                  type="text" 
                  required
                  placeholder="Contoh: Pajama Drive"
                  class="w-full bg-jogo-dark/50 border border-jogo-light/20 rounded-lg px-4 py-2 text-jogo-light placeholder:text-jogo-light/30 focus:outline-none focus:border-jogo-light transition-colors"
                />
              </div>

              <div>
                <label class="block text-xs uppercase tracking-wider text-jogo-light/70 mb-1">Tanggal & Waktu</label>
                <input 
                  v-model="form.date_time" 
                  type="datetime-local" 
                  required
                  class="w-full bg-jogo-dark/50 border border-jogo-light/20 rounded-lg px-4 py-2 text-jogo-light focus:outline-none focus:border-jogo-light transition-colors style-calendar"
                />
              </div>

              <div>
                <label class="block text-xs uppercase tracking-wider text-jogo-light/70 mb-1">Lokasi</label>
                <input 
                  v-model="form.location" 
                  type="text" 
                  required
                  placeholder="Contoh: Teater JKT48, fX Sudirman"
                  class="w-full bg-jogo-dark/50 border border-jogo-light/20 rounded-lg px-4 py-2 text-jogo-light placeholder:text-jogo-light/30 focus:outline-none focus:border-jogo-light transition-colors"
                />
              </div>

              <button 
                type="submit" 
                class="w-full mt-4 bg-jogo-light text-jogo-dark font-bold py-3 rounded-xl hover:opacity-90 transition shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                Simpan Jadwal
              </button>
            </form>
          </div>
        </div>

        <div class="lg:col-span-8">
          <div class="bg-jogo-light/5 backdrop-blur-md border border-jogo-light/20 p-6 rounded-2xl">
            <h2 class="text-xl font-bold mb-6 border-b border-jogo-light/10 pb-2">Daftar Jadwal Bonita</h2>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="text-xs uppercase tracking-wider text-jogo-light/50 border-b border-jogo-light/10">
                    <th class="pb-3 font-medium">Event</th>
                    <th class="pb-3 font-medium">Tanggal</th>
                    <th class="pb-3 font-medium">Lokasi</th>
                    <th class="pb-3 font-medium text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <tr v-for="schedule in schedules" :key="schedule.id" class="border-b border-jogo-light/5 hover:bg-jogo-light/5 transition-colors group">
                    <td class="py-4 font-semibold">{{ schedule.event_name }}</td>
                    <td class="py-4 text-jogo-light/80">{{ formatDate(schedule.date_time) }}</td>
                    <td class="py-4 text-jogo-light/80">{{ schedule.location }}</td>
                    <td class="py-4 text-right">
                      <button @click="deleteSchedule(schedule.id)" class="text-xs border border-red-500/50 text-red-400 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                        Hapus
                      </button>
                    </td>
                  </tr>
                  
                  <tr v-if="schedules.length === 0">
                    <td colspan="4" class="py-8 text-center text-jogo-light/40 font-light">
                      Belum ada jadwal yang ditambahkan.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Ini adalah data reaktif sementara. Nanti Kakak tinggal ganti fungsi CRUD-nya menggunakan Supabase API.
const schedules = ref([
  { id: 1, event_name: 'Pajama Drive', date_time: '2026-04-25T19:00', location: 'Teater JKT48' },
  { id: 2, event_name: 'Aturan Anti Cinta', date_time: '2026-04-28T14:00', location: 'Teater JKT48' },
])

const form = ref({
  event_name: '',
  date_time: '',
  location: ''
})

// Fungsi Tambah Data
const addSchedule = () => {
  // Logic Supabase Insert ditaruh di sini nantinya
  const newId = schedules.value.length ? Math.max(...schedules.value.map(s => s.id)) + 1 : 1
  schedules.value.unshift({ id: newId, ...form.value })
  
  // Reset Form
  form.value = { event_name: '', date_time: '', location: '' }
}

// Fungsi Hapus Data
const deleteSchedule = (id) => {
  // Logic Supabase Delete ditaruh di sini nantinya
  if (confirm('Apakah kamu yakin ingin menghapus jadwal ini?')) {
    schedules.value = schedules.value.filter(s => s.id !== id)
  }
}

// Format Tanggal agar lebih cantik
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}
</script>

<style scoped>
/* Sedikit styling custom untuk memperbaiki tampilan ikon kalender bawaan browser agar putih */
.style-calendar::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}
</style>