export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@vercel/analytics',
    '@nuxt/image'
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  supabase: {
    redirect: false
  },

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/ilac24r7/image/upload/'
    }
  },

  compatibilityDate: '2024-04-19'
})