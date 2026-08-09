# Utils

Direktori ini digunakan untuk menyimpan fungsi utilitas JavaScript murni (pure functions). Nuxt 3 secara otomatis mengimpor (auto-imports) semua file di dalam folder ini.

**Kapan menggunakan `utils/` vs `composables/`?**
Gunakan `utils/` untuk fungsi yang murni mengolah data dan **tidak** bergantung pada state atau Reactivity API Vue.

Contoh:
- `formatters.ts` (misal fungsi `formatDate`, `formatCurrency`)
- `validators.ts` (misal fungsi `isValidEmail`)
