import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        // 60% Dominan: Kanvas latar belakang malam Kutub Utara yang pekat
        'jogo-void': '#050B14',
        
        // 30% Sekunder: Struktur Bento Box & Kaca Obsidian beku
        'jogo-glass': '#101D2F',
        
        // 10% Bioluminescence: Pendaran Aurora & Kursor aktif
        'jogo-cyan': '#00F2FE',
        'jogo-teal': '#4FACFE',
        
        // 5% Penyelamat Gestalt: Jangkar warna hangat yang sangat pelit
        'jogo-champagne': '#E2C99A',

        // Warna warisan Branding Guide Jogo Bonita
        'jogo-dark': '#1E3A5F',
        'jogo-light': '#FFFFFF'
      },
      fontFamily: {
        // Font tulisan tangan yang tegas namun hangat untuk sapaan & logo
        accent: ['"Cookie Supply"', 'cursive'],
        // Font sans-serif yang bersih, netral, dan mudah dibaca untuk teks panjang
        sans: ['Montserrat', 'Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config