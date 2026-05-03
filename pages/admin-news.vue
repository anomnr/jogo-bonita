<script setup>
const supabase = useSupabaseClient()

const newsList = ref([])

const form = ref({
  title: '',
  slug: '',
  category: 'News',
  excerpt: '',
  content: '',
  image_url: '',
  source_url: '',
  published: true
})

const fetchNews = async () => {
  const { data } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })

  newsList.value = data || []
}

const addNews = async () => {
  if (!form.value.slug) {
    form.value.slug = form.value.title
      .toLowerCase()
      .replace(/\s+/g, '-')
  }

  await supabase.from('news').insert([form.value])

  await fetchNews()

  // reset form
  form.value = {
    title: '',
    slug: '',
    category: 'News',
    excerpt: '',
    content: '',
    image_url: '',
    source_url: '',
    published: true
  }
}

const deleteNews = async (id) => {
  await supabase.from('news').delete().eq('id', id)
  await fetchNews()
}

onMounted(fetchNews)
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Admin News</h1>

    <!-- FORM -->
    <form @submit.prevent="addNews" class="space-y-4 mb-10">
      <input v-model="form.title" placeholder="Title" class="input" />

      <input v-model="form.slug" placeholder="Slug (optional)" class="input" />

      <input v-model="form.category" placeholder="Category" class="input" />

      <textarea v-model="form.excerpt" placeholder="Excerpt" class="input" />

      <textarea v-model="form.content" placeholder="Content" class="input" />

      <input v-model="form.image_url" placeholder="Image URL" class="input" />

      <input v-model="form.source_url" placeholder="Source URL" class="input" />

      <label class="flex items-center gap-2">
        <input type="checkbox" v-model="form.published" />
        Published
      </label>

      <button class="btn">Tambah News</button>
    </form>

    <!-- LIST -->
    <div class="space-y-4">
      <div
        v-for="item in newsList"
        :key="item.id"
        class="p-4 border rounded"
      >
        <h2 class="font-bold">{{ item.title }}</h2>
        <p class="text-sm opacity-70">{{ item.slug }}</p>

        <button
          @click="deleteNews(item.id)"
          class="text-red-500 text-sm mt-2"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>