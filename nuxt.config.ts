export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@vercel/analytics'
  ],

  supabase: {
    redirect: false
  },
  compatibilityDate: '2024-04-19'
})