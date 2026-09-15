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

  // Private server-side Cloudinary credentials — never exposed to the client
  runtimeConfig: {
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  compatibilityDate: '2024-04-19'
})