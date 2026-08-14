<template>
  <main v-if="news" class="min-h-screen bg-transparent text-jogo-light pt-24 pb-20">
    <article class="mx-auto max-w-[1400px] px-5 md:px-8">

      <!-- Back link -->
      <NuxtLink to="/news" class="inline-flex items-center gap-2 text-[11px] font-mono text-white/35 hover:text-white/60 transition-colors mb-8 uppercase tracking-wider">
        &larr; Semua Berita
      </NuxtLink>

      <!-- Article header -->
      <div class="max-w-3xl mb-10">
        <div class="flex items-center gap-3 mb-5">
          <span class="text-[10px] font-mono font-semibold uppercase tracking-widest bg-teal-400/[0.08] border border-teal-400/[0.15] text-teal-400/80 px-2.5 py-1 rounded-lg">
            {{ news.category || 'News' }}
          </span>
          <span class="text-xs font-mono text-white/35">
            {{ formatDate(news.created_at) }}
          </span>
        </div>

        <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-white mb-6">
          {{ news.title }}
        </h1>
      </div>

      <!-- Hero image -->
      <img
        v-if="news.image_url"
        :src="news.image_url"
        :alt="news.title"
        class="w-full max-w-4xl rounded-xl mb-10"
      />

      <!-- Article body -->
      <div class="max-w-3xl space-y-6">
        <p
          v-for="(paragraph, index) in paragraphs"
          :key="index"
          class="text-base md:text-[17px] leading-8 text-white/75 tracking-[0.01em]"
        >
          {{ paragraph }}
        </p>
      </div>

      <!-- Source link -->
      <a
        v-if="news.source_url"
        :href="news.source_url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 mt-10 text-sm text-white/40 hover:text-white/70 transition-colors border-b border-white/[0.08] pb-0.5"
      >
        Sumber asli &rarr;
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