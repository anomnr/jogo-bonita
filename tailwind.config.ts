export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        jogo: {
          dark: '#061a33',
          light: '#f5f7fb',
          blue: '#0b376d',
          soft: '#dbeafe',
        },
      },
      fontFamily: {
        accent: ['CookiesSupply', 'cursive'],
        cookies: ['CookiesSupply', 'cursive'],
      },
    },
  },
  plugins: [],
}