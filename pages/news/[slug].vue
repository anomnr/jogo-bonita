<template>
  <main v-if="news" class="min-h-screen bg-jogo-dark text-jogo-light px-6 py-20">
    <article class="max-w-3xl mx-auto">
      <!-- CATEGORY + DATE -->
      <div class="mb-6">
        <span class="text-xs uppercase tracking-widest bg-jogo-light text-jogo-dark px-3 py-1 rounded">
          {{ news.category || 'News' }}
        </span>

        <p class="text-sm text-jogo-light/60 mt-3">
          {{ formatDate(news.created_at) }}
        </p>
      </div>

      <!-- TITLE -->
      <h1 class="text-4xl md:text-5xl font-black mb-6 leading-tight">
        {{ news.title }}
      </h1>

      <!-- IMAGE -->
      <img
        v-if="news.image_url"
        :src="news.image_url"
        :alt="news.title"
        class="w-full rounded-xl mb-8"
      />

      <!-- CONTENT -->
      <div class="space-y-6">
        <p
          v-for="(paragraph, index) in paragraphs"
          :key="index"
          class="text-[17px] leading-8 text-jogo-light/85 tracking-[0.01em]"
        >
          {{ paragraph }}
        </p>
      </div>

      <!-- SOURCE -->
      <a
        v-if="news.source_url"
        :href="news.source_url"
        target="_blank"
        rel="noopener noreferrer"
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

const siteUrl = 'https://www.jogobonita.com'
const slug = route.params.slug as string

const { data: news } = await useAsyncData(`news-${slug}`, async () => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'News tidak ditemukan'
    })
  }

  return data
})

const paragraphs = computed(() => {
  return (news.value?.content || '')
    .split(/\n\s*\n/)
    .map((paragraph: string) => paragraph.trim())
    .filter(Boolean)
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const cleanDescription = (text?: string) => {
  if (!text) return 'Berita terbaru dari Jogo Bonita untuk Christabella Bonita.'

  return text
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160)
}

const getAbsoluteUrl = (url?: string) => {
  if (!url) return `${siteUrl}/og/default-news.png`

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  return `${siteUrl}${url.startsWith('/') ? url : `/${url}`}`
}

const pageTitle = computed(() => {
  return news.value
    ? `${news.value.title} - Jogo Bonita`
    : 'News - Jogo Bonita'
})

const seoTitle = computed(() => {
  return news.value?.title || 'News - Jogo Bonita'
})

const seoDescription = computed(() => {
  return cleanDescription(news.value?.excerpt || news.value?.content)
})

const pageUrl = computed(() => {
  return `${siteUrl}/news/${slug}`
})

const pageImage = computed(() => {
  return getAbsoluteUrl(news.value?.image_url)
})

useSeoMeta({
  title: () => pageTitle.value,
  description: () => seoDescription.value,

  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDescription.value,
  ogType: 'article',
  ogUrl: () => pageUrl.value,
  ogImage: () => pageImage.value,
  ogImageAlt: () => seoTitle.value,
  ogSiteName: 'Jogo Bonita',
  ogLocale: 'id_ID',

  twitterCard: 'summary_large_image',
  twitterTitle: () => seoTitle.value,
  twitterDescription: () => seoDescription.value,
  twitterImage: () => pageImage.value,
})

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: pageUrl.value
    }
  ],
  meta: [
    {
      property: 'article:published_time',
      content: news.value?.created_at
    }
  ]
}))
</script>