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
            Kelola kegiatan dan news Jogo Bonita.
          </p>
        </div>

        <div class="flex gap-3">
          <NuxtLink
            to="/"
            class="w-fit text-sm border border-jogo-light/25 px-5 py-2 rounded-full hover:bg-jogo-light hover:text-jogo-dark transition"
          >
            ← Kembali
          </NuxtLink>

          <button
            @click="logout"
            class="w-fit text-sm border border-red-400/40 text-red-300 px-5 py-2 rounded-full hover:bg-red-500 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div class="flex gap-3 mb-8">
        <button
          @click="activeTab = 'shows'"
          class="px-5 py-2 rounded-full border transition"
          :class="activeTab === 'shows'
            ? 'bg-jogo-light text-jogo-dark border-jogo-light'
            : 'border-jogo-light/20 text-jogo-light'"
        >
          Kegiatan
        </button>

        <button
          @click="activeTab = 'news'"
          class="px-5 py-2 rounded-full border transition"
          :class="activeTab === 'news'
            ? 'bg-jogo-light text-jogo-dark border-jogo-light'
            : 'border-jogo-light/20 text-jogo-light'"
        >
          News
        </button>
      </div>

      <!-- KEGIATAN -->
      <div v-if="activeTab === 'shows'" class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside class="lg:col-span-4">
          <div class="rounded-3xl border border-jogo-light/15 bg-jogo-light/[0.04] p-6 lg:sticky lg:top-24">
            <h2 class="text-2xl font-black mb-2">
              {{ showEditingId ? 'Edit Kegiatan' : 'Tambah Kegiatan' }}
            </h2>

            <form @submit.prevent="saveShow" class="space-y-5 mt-6">
              <div>
                <label class="label">Tanggal</label>
                <input v-model="showForm.date" type="date" required class="input" />
              </div>

              <div>
                <label class="label">Tipe</label>
                <select v-model="showForm.type" required class="input">
                  <option value="SHOW">SHOW</option>
                  <option value="EVENT">EVENT</option>
                </select>
              </div>

              <div>
                <label class="label">Nama Show / Event</label>
                <input
                  v-model="showForm.title"
                  type="text"
                  required
                  placeholder="Contoh: JKT48 SCHOOL"
                  class="input"
                />
              </div>

              <button
                type="submit"
                :disabled="showLoading"
                class="w-full rounded-xl bg-jogo-light text-jogo-dark font-black py-3 hover:opacity-90 transition disabled:opacity-50"
              >
                {{ showLoading ? 'Menyimpan...' : showEditingId ? 'Update Kegiatan' : 'Simpan Kegiatan' }}
              </button>

              <button
                v-if="showEditingId"
                type="button"
                @click="cancelShowEdit"
                class="w-full rounded-xl border border-jogo-light/20 text-jogo-light font-black py-3 hover:bg-jogo-light hover:text-jogo-dark transition"
              >
                Batal Edit
              </button>

              <p v-if="showMessage" class="text-sm text-jogo-light/60">
                {{ showMessage }}
              </p>
            </form>
          </div>
        </aside>

        <section class="lg:col-span-8">
          <div class="rounded-3xl border border-jogo-light/15 bg-jogo-light/[0.04] p-6">
            <div class="flex items-center justify-between gap-4 mb-6 border-b border-jogo-light/10 pb-4">
              <div>
                <h2 class="text-2xl font-black">Daftar Kegiatan Bella</h2>
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
                          @click="startShowEdit(show)"
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

      <!-- NEWS -->
      <div v-if="activeTab === 'news'" class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside class="lg:col-span-4">
          <div class="rounded-3xl border border-jogo-light/15 bg-jogo-light/[0.04] p-6 lg:sticky lg:top-24">
            <h2 class="text-2xl font-black mb-2">
              {{ newsEditingId ? 'Edit News' : 'Tambah News' }}
            </h2>

            <form
              @submit.prevent="saveNews"
              autocomplete="off"
              class="space-y-5 mt-6"
            >
              <input
                v-model="newsForm.title"
                placeholder="Title"
                autocomplete="off"
                class="input"
              />

              <input
                v-model="newsForm.slug"
                placeholder="Slug otomatis kalau kosong"
                autocomplete="off"
                class="input"
              />

              <input
                v-model="newsForm.category"
                placeholder="Category"
                autocomplete="off"
                class="input"
              />

              <input
                v-model="newsForm.image_url"
                placeholder="Image URL"
                autocomplete="off"
                class="input"
              />

              <input
                v-model="newsForm.source_url"
                placeholder="Source URL"
                autocomplete="off"
                class="input"
              />

              <textarea
                v-model="newsForm.excerpt"
                placeholder="Excerpt"
                class="input min-h-24"
              />

              <textarea
                v-model="newsForm.content"
                placeholder="Content"
                class="input min-h-48"
              />

              <label class="flex items-center gap-2 text-sm">
                <input v-model="newsForm.published" type="checkbox" />
                Published
              </label>

              <button
                type="submit"
                class="w-full rounded-xl bg-jogo-light text-jogo-dark font-black py-3 hover:opacity-90 transition"
              >
                {{ newsEditingId ? 'Update News' : 'Tambah News' }}
              </button>

              <button
                v-if="newsEditingId"
                type="button"
                @click="resetNewsForm"
                class="w-full rounded-xl border border-jogo-light/20 text-jogo-light font-black py-3 hover:bg-jogo-light hover:text-jogo-dark transition"
              >
                Batal Edit
              </button>

              <p v-if="newsMessage" class="text-sm text-jogo-light/60">
                {{ newsMessage }}
              </p>
            </form>
          </div>
        </aside>

        <section class="lg:col-span-8">
          <div class="rounded-3xl border border-jogo-light/15 bg-jogo-light/[0.04] p-6">
            <div class="flex items-center justify-between gap-4 mb-6 border-b border-jogo-light/10 pb-4">
              <div>
                <h2 class="text-2xl font-black">Daftar News</h2>
                <p class="text-sm text-jogo-light/50 mt-1">
                  Data dari Supabase tabel <code>news</code>.
                </p>
              </div>

              <button
                @click="fetchNews"
                class="text-xs uppercase tracking-widest border border-jogo-light/20 px-4 py-2 rounded-full hover:bg-jogo-light hover:text-jogo-dark transition"
              >
                Refresh
              </button>
            </div>

            <div class="grid gap-4">
              <div
                v-for="item in newsList"
                :key="item.id"
                class="border border-jogo-light/15 rounded-xl p-5 bg-jogo-light/[0.04]"
              >
                <div class="flex flex-col md:flex-row md:justify-between gap-4">
                  <div>
                    <p class="text-xs opacity-50 uppercase tracking-widest">
                      {{ item.category }} • {{ item.published ? 'Published' : 'Draft' }}
                    </p>

                    <h2 class="text-xl font-bold mt-2">
                      {{ item.title }}
                    </h2>

                    <p class="text-sm opacity-60 mt-1">
                      /news/{{ item.slug }}
                    </p>
                  </div>

                  <div class="flex gap-2 shrink-0">
                    <button @click="editNews(item)" class="text-sm underline">
                      Edit
                    </button>

                    <button @click="togglePublished(item)" class="text-sm underline">
                      {{ item.published ? 'Unpublish' : 'Publish' }}
                    </button>

                    <button @click="deleteNews(item.id)" class="text-sm text-red-400 underline">
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <p v-if="newsList.length === 0" class="py-12 text-center text-jogo-light/40">
                Belum ada news.
              </p>
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

type NewsItem = {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string | null
  content: string | null
  image_url: string | null
  source_url: string | null
  published: boolean
  created_at: string
}

const supabase = useSupabaseClient()

const activeTab = ref<'shows' | 'news'>('shows')

const shows = ref<ShowItem[]>([])
const showLoading = ref(false)
const showMessage = ref('')
const showEditingId = ref<string | null>(null)

const showForm = ref({
  date: '',
  type: 'SHOW' as 'SHOW' | 'EVENT',
  title: ''
})

const resetShowForm = () => {
  showForm.value = {
    date: '',
    type: 'SHOW',
    title: ''
  }

  showEditingId.value = null
}

const fetchShows = async () => {
  const { data, error } = await supabase
    .from('shows')
    .select('id, date, type, title, source')
    .order('date', { ascending: false })

  if (error) {
    showMessage.value = error.message
    return
  }

  shows.value = data || []
}

const saveShow = async () => {
  if (showEditingId.value) {
    await updateShow()
  } else {
    await addShow()
  }
}

const addShow = async () => {
  showLoading.value = true
  showMessage.value = ''

  const { error } = await supabase.from('shows').insert({
    date: showForm.value.date,
    type: showForm.value.type,
    title: showForm.value.title.trim(),
    source: 'manual',
    member_name: 'Christabella Bonita'
  })

  showLoading.value = false

  if (error) {
    console.error('INSERT SHOW ERROR:', error)
    showMessage.value = error.message
    return
  }

  showMessage.value = 'Kegiatan berhasil disimpan.'
  resetShowForm()
  await fetchShows()
}

const startShowEdit = (show: ShowItem) => {
  showEditingId.value = show.id

  showForm.value = {
    date: show.date,
    type: show.type,
    title: show.title
  }

  showMessage.value = 'Mode edit aktif.'
}

const updateShow = async () => {
  if (!showEditingId.value) return

  showLoading.value = true
  showMessage.value = ''

  const { error } = await supabase
    .from('shows')
    .update({
      date: showForm.value.date,
      type: showForm.value.type,
      title: showForm.value.title.trim(),
      updated_at: new Date().toISOString()
    })
    .eq('id', showEditingId.value)

  showLoading.value = false

  if (error) {
    console.error('UPDATE SHOW ERROR:', error)
    showMessage.value = error.message
    return
  }

  showMessage.value = 'Kegiatan berhasil diupdate.'
  resetShowForm()
  await fetchShows()
}

const cancelShowEdit = () => {
  resetShowForm()
  showMessage.value = ''
}

const deleteShow = async (id: string) => {
  const confirmed = confirm('Yakin mau hapus kegiatan ini?')
  if (!confirmed) return

  const { error } = await supabase
    .from('shows')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('DELETE SHOW ERROR:', error)
    showMessage.value = error.message
    return
  }

  showMessage.value = 'Kegiatan berhasil dihapus.'
  await fetchShows()
}

const newsList = ref<NewsItem[]>([])
const newsMessage = ref('')
const newsEditingId = ref<string | null>(null)

const emptyNewsForm = () => ({
  title: '',
  slug: '',
  category: 'News',
  excerpt: '',
  content: '',
  image_url: '',
  source_url: '',
  published: true
})

const newsForm = ref(emptyNewsForm())

const makeSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const fetchNews = async () => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('FETCH NEWS ERROR:', error)
    newsMessage.value = error.message
    return
  }

  newsList.value = data || []
}

const saveNews = async () => {
  newsMessage.value = ''

  const payload = {
    ...newsForm.value,
    slug: newsForm.value.slug || makeSlug(newsForm.value.title)
  }

  if (newsEditingId.value) {
    const { error } = await supabase
      .from('news')
      .update(payload)
      .eq('id', newsEditingId.value)

    if (error) {
      console.error('UPDATE NEWS ERROR:', error)
      newsMessage.value = error.message
      return
    }

    newsMessage.value = 'News berhasil diupdate.'
  } else {
    const { error } = await supabase
      .from('news')
      .insert(payload)

    if (error) {
      console.error('INSERT NEWS ERROR:', error)
      newsMessage.value = error.message
      return
    }

    newsMessage.value = 'News berhasil disimpan.'
  }

  resetNewsForm()
  await fetchNews()
}

const editNews = (item: NewsItem) => {
  newsEditingId.value = item.id

  newsForm.value = {
    title: item.title,
    slug: item.slug,
    category: item.category,
    excerpt: item.excerpt || '',
    content: item.content || '',
    image_url: item.image_url || '',
    source_url: item.source_url || '',
    published: item.published
  }

  activeTab.value = 'news'
  newsMessage.value = 'Mode edit aktif.'
}

const togglePublished = async (item: NewsItem) => {
  const { error } = await supabase
    .from('news')
    .update({ published: !item.published })
    .eq('id', item.id)

  if (error) {
    console.error('TOGGLE NEWS ERROR:', error)
    newsMessage.value = error.message
    return
  }

  await fetchNews()
}

const deleteNews = async (id: string) => {
  const confirmed = confirm('Yakin hapus news ini?')
  if (!confirmed) return

  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('DELETE NEWS ERROR:', error)
    newsMessage.value = error.message
    return
  }

  newsMessage.value = 'News berhasil dihapus.'
  await fetchNews()
}

const resetNewsForm = () => {
  newsEditingId.value = null
  newsForm.value = emptyNewsForm()
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

onMounted(async () => {
  await Promise.all([
    fetchShows(),
    fetchNews()
  ])
})

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