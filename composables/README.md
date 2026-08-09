# Composables

Direktori ini digunakan untuk menyimpan Vue Composables yang dapat digunakan ulang (reusable) di seluruh aplikasi. Nuxt 3 secara otomatis mengimpor (auto-imports) semua file di dalam folder ini.

**Kapan menggunakan `composables/` vs `utils/`?**
Gunakan `composables/` untuk fungsi yang membutuhkan akses ke Reactivity API Vue (seperti `ref`, `reactive`, `computed`, `watch`) atau lifecycle hooks (seperti `onMounted`).

Contoh:
- `useAuth.ts`
- `useFetchData.ts`
