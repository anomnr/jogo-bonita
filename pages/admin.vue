<template>
  <main class="min-h-screen bg-jogo-dark text-jogo-light font-sans py-12 px-4">
    <section class="container mx-auto max-w-7xl">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 border-b border-jogo-light/15 pb-6">
        <div>
          <p class="text-xs uppercase tracking-[0.35em] text-jogo-light/45 mb-3">
            Admin Area
          </p>
          <h1 class="font-accent text-5xl md:text-7xl tracking-wide">
            Markas Penjaga
          </h1>
          <p class="mt-3 text-sm text-jogo-light/60">
            Input manual kegiatan Bella yang belum muncul di data API.
          </p>
        </div>

        <NuxtLink
          to="/"
          class="w-fit text-sm border border-jogo-light/25 px-5 py-2 rounded-full hover:bg-jogo-light hover:text-jogo-dark transition"
        >
          ← Kembali ke Stadion
        </NuxtLink>

        <button
          @click="logout"
          class="w-fit text-sm border border-red-400/40 text-red-300 px-5 py-2 rounded-full hover:bg-red-500 hover:text-white transition"
        >
          Logout
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside class="lg:col-span-4">
          <div class="rounded-3xl border border-jogo-light/15 bg-jogo-light/[0.04] p-6 lg:sticky lg:top-24">
            <h2 class="text-2xl font-black mb-2">
              {{ editingId ? 'Edit Kegiatan' : 'Tambah Kegiatan' }}
            </h2>

            <p class="text-sm text-jogo-light/50 mb-6">
              {{ editingId ? 'Ubah data kegiatan yang sudah tersimpan.' : 'Cukup isi tanggal, tipe, dan nama show/event.' }}
            </p>

            <form @submit.prevent="saveShow" class="space-y-5">
              <div>
                <label class="label">Tanggal</label>
                <input v-model="form.date" type="date" required class="input" />
              </div>

              <div>
                <label class="label">Tipe</label>
                <select v-model="form.type" required class="input">
                  <option value="SHOW">SHOW</option>
                  <option value="EVENT">EVENT</option>
                </select>
              </div>

              <div>
                <label class="label">Nama Show / Event</label>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  placeholder="Contoh: JKT48 SCHOOL"
                  class="input"
                />
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="w-full rounded-xl bg-jogo-light text-jogo-dark font-black py-3 hover:opacity-90 transition disabled:opacity-50"
              >
                {{ loading ? 'Menyimpan...' : editingId ? 'Update Kegiatan' : 'Simpan Kegiatan' }}
              </button>

              <button
                v-if="editingId"
                type="button"
                @click="cancelEdit"
                class="w-full rounded-xl border border-jogo-light/20 text-jogo-light font-black py-3 hover:bg-jogo-light hover:text-jogo-dark transition"
              >
                Batal Edit
              </button>

              <p v-if="message" class="text-sm text-jogo-light/60">
                {{ message }}
              </p>
            </form>
          </div>
        </aside>

        <section class="lg:col-span-8">
          <div class="rounded-3xl border border-jogo-light/15 bg-jogo-light/[0.04] p-6">
            <div class="flex items-center justify-between gap-4 mb-6 border-b border-jogo-light/10 pb-4">
              <div>
                <h2 class="text-2xl font-black">
                  Daftar Kegiatan Bella
                </h2>
                <p class="text-sm text-jogo-light/50 mt-1">
                  Data dari Supabase tabel <code>shows</code>.
                </p>
              </div>

              <button
                @click="fetchShows"
                class="text-xs uppercase tracking-widest border border-jogo-light/20 px-4 py-2 rounded-full hover:bg-jogo-light hover:text-jogo-dark transition"
              >
                Refresh
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="text-xs uppercase tracking-[0.2em] text-jogo-light/45 border-b border-jogo-light/10">
                    <th class="pb-4 font-medium">Tanggal</th>
                    <th class="pb-4 font-medium">Tipe</th>
                    <th class="pb-4 font-medium">Nama</th>
                    <th class="pb-4 font-medium">Source</th>
                    <th class="pb-4 font-medium text-right">Aksi</th>
                  </tr>
                </thead>

                <tbody class="text-sm">
                  <tr
                    v-for="show in shows"
                    :key="show.id"
                    class="border-b border-jogo-light/5 hover:bg-jogo-light/[0.04] transition"
                  >
                    <td class="py-4 text-jogo-light/75">
                      {{ formatDate(show.date) }}
                    </td>

                    <td class="py-4">
                      <span class="rounded-full border border-jogo-light/20 px-3 py-1 text-xs font-bold">
                        {{ show.type }}
                      </span>
                    </td>

                    <td class="py-4 font-semibold">
                      {{ show.title }}
                    </td>

                    <td class="py-4 text-jogo-light/45">
                      {{ show.source || 'manual' }}
                    </td>

                    <td class="py-4 text-right">
                      <div class="flex justify-end gap-2">
                        <button
                          @click="startEdit(show)"
                          class="text-xs border border-jogo-light/30 px-3 py-1 rounded-full hover:bg-jogo-light hover:text-jogo-dark transition"
                        >
                          Edit
                        </button>

                        <button
                          @click="deleteShow(show.id)"
                          class="text-xs border border-red-500/40 text-red-300 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white transition"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr v-if="shows.length === 0">
                    <td colspan="5" class="py-12 text-center text-jogo-light/40">
                      Belum ada data kegiatan.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: () => {
    const user = useSupabaseUser()

    if (!user.value) {
      return navigateTo('/admin-login')
    }
  }
})

type ShowItem = {
  id: string
  date: string
  type: 'SHOW' | 'EVENT'
  title: string
  source?: string
}

const supabase = useSupabaseClient()

const shows = ref<ShowItem[]>([])
const loading = ref(false)
const message = ref('')
const editingId = ref<string | null>(null)

const form = ref({
  date: '',
  type: 'SHOW' as 'SHOW' | 'EVENT',
  title: ''
})

const resetForm = () => {
  form.value = {
    date: '',
    type: 'SHOW',
    title: ''
  }

  editingId.value = null
}

const fetchShows = async () => {
  const { data, error } = await supabase
    .from('shows')
    .select('id, date, type, title, source')
    .order('date', { ascending: false })

  if (error) {
    message.value = error.message
    return
  }

  shows.value = data || []
}

const saveShow = async () => {
  if (editingId.value) {
    await updateShow()
  } else {
    await addShow()
  }
}

const addShow = async () => {
  loading.value = true
  message.value = ''

  const { error } = await supabase.from('shows').insert({
    date: form.value.date,
    type: form.value.type,
    title: form.value.title.trim(),
    source: 'manual',
    member_name: 'Christabella Bonita'
  })

  loading.value = false

  if (error) {
    console.error('INSERT ERROR:', error)
    message.value = error.message
    return
  }

  message.value = 'Kegiatan berhasil disimpan.'
  resetForm()
  await fetchShows()
}

const startEdit = (show: ShowItem) => {
  editingId.value = show.id

  form.value = {
    date: show.date,
    type: show.type,
    title: show.title
  }

  message.value = 'Mode edit aktif.'
}

const updateShow = async () => {
  if (!editingId.value) return

  loading.value = true
  message.value = ''

  const { error } = await supabase
    .from('shows')
    .update({
      date: form.value.date,
      type: form.value.type,
      title: form.value.title.trim(),
      updated_at: new Date().toISOString()
    })
    .eq('id', editingId.value)

  loading.value = false

  if (error) {
    console.error('UPDATE ERROR:', error)
    message.value = error.message
    return
  }

  message.value = 'Kegiatan berhasil diupdate.'
  resetForm()
  await fetchShows()
}

const cancelEdit = () => {
  resetForm()
  message.value = ''
}

const deleteShow = async (id: string) => {
  const confirmed = confirm('Yakin mau hapus kegiatan ini?')
  if (!confirmed) return

  const { error } = await supabase
    .from('shows')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('DELETE ERROR:', error)
    message.value = error.message
    return
  }

  message.value = 'Kegiatan berhasil dihapus.'
  await fetchShows()
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const logout = async () => {
  await supabase.auth.signOut()
  await navigateTo('/admin-login')
}

onMounted(fetchShows)

useHead({
  title: 'Admin - Jogo Bonita'
})
</script>

<style scoped>
.label {
  @apply block mb-2 text-xs uppercase tracking-[0.22em] text-jogo-light/55;
}

.input {
  @apply w-full rounded-xl border border-jogo-light/15 bg-jogo-dark/60 px-4 py-3 text-jogo-light placeholder:text-jogo-light/30 outline-none transition focus:border-jogo-light/45;
}

input[type='date']::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}
</style>