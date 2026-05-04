<template>
  <main v-if="news" class="min-h-screen bg-jogo-dark text-jogo-light px-6 py-20">
    <article class="max-w-3xl mx-auto">
      
      <!-- CATEGORY + DATE -->
      <div class="mb-6">
        <span class="text-xs uppercase tracking-widest bg-jogo-light text-jogo-dark px-3 py-1 rounded">
          {{ news.category }}
        </span>

        <p class="text-sm text-jogo-light/60 mt-3">
          {{ formatDate(news.created_at) }}
        </p>
      </div>

      <!-- TITLE -->
      <h1 class="text-4xl md:text-5xl font-black mb-6 leading-tight">
        {{ news.title }}
      </h1>

      <!-- IMAGE (optional) -->
      <img
        v-if="news.image_url"
        :src="news.image_url"
        class="w-full rounded-xl mb-8"
      />

      <!-- CONTENT -->
      <div class="prose prose-invert max-w-none">
        <p>{{ news.content }}</p>
      </div>

      <!-- SOURCE -->
      <a
        v-if="news.source_url"
        :href="news.source_url"
        target="_blank"
        class="inline-block mt-10 text-sm underline opacity-70 hover:opacity-100"
      >
        Sumber asli →
      </a>
    </article>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const supabase = useSupabaseClient()

const { data: news } = await useAsyncData(`news-${route.params.slug}`, async () => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', route.params.slug)
    .eq('published', true)
    .single()

  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'News tidak ditemukan'
    })
  }

  return data
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

useHead(() => ({
  title: news.value ? `${news.value.title} - Jogo Bonita` : 'News - Jogo Bonita'
}))
</script>