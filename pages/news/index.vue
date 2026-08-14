<template>
  <main class="min-h-screen bg-transparent text-jogo-light pt-24 pb-20">
    <section class="mx-auto max-w-[1400px] px-5 md:px-8">

      <!-- Header — left-aligned -->
      <div class="mb-12 max-w-lg">
        <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">News</h1>
        <p class="text-sm text-white/45 leading-relaxed">
          Kumpulan update, pengumuman, dan catatan aktivitas seputar Christabella Bonita dan Jogo Bonita.
        </p>
      </div>

      <!-- News list -->
      <div class="grid gap-4">
        <NuxtLink
          v-for="item in newsList"
          :key="item.slug"
          :to="`/news/${item.slug}`"
          class="group rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 p-6 md:p-8"
        >
          <div class="flex flex-col md:flex-row md:items-start gap-5">
            <div class="md:w-44 shrink-0">
              <span class="inline-flex text-[10px] font-mono font-semibold px-2.5 py-1 bg-teal-400/[0.08] border border-teal-400/[0.15] text-teal-400/80 rounded-lg uppercase tracking-widest">
                {{ item.category }}
              </span>

              <p class="mt-3 text-xs font-mono text-white/35 tracking-wide">
                {{ formatDate(item.created_at) }}
              </p>
            </div>

            <div class="flex-1">
              <h2 class="text-lg md:text-2xl font-bold leading-tight text-white group-hover:text-teal-400 transition-colors duration-300 tracking-tight">
                {{ item.title }}
              </h2>

              <p class="mt-3 text-sm text-white/50 leading-relaxed max-w-[60ch]">
                {{ item.excerpt }}
              </p>

              <p class="mt-4 text-[10px] font-mono uppercase tracking-[0.18em] text-white/30 group-hover:text-white/50 transition-colors">
                Baca selengkapnya &rarr;
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

const newsList = ref<any[]>([])

const fetchNews = async () => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('FETCH NEWS ERROR:', error)
    return
  }

  newsList.value = data || []
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

onMounted(fetchNews)

useHead({
  title: 'News - Jogo Bonita'
})
</script>