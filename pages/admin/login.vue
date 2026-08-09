<template>
  <main class="min-h-screen bg-jogo-dark text-jogo-light flex items-center justify-center px-4">
    <section class="w-full max-w-md rounded-3xl border border-jogo-light/15 bg-jogo-light/[0.04] p-8">
      <p class="text-xs uppercase tracking-[0.35em] text-jogo-light/45 mb-3">
        Admin Login
      </p>

      <h1 class="font-accent text-5xl mb-3">
        Masuk Markas
      </h1>

      <p class="text-sm text-jogo-light/55 mb-8">
        Login dulu sebelum mengelola data kegiatan Bella.
      </p>

      <form @submit.prevent="login" class="space-y-5">
        <div>
          <label class="label">Email</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="admin@email.com"
            class="input"
          />
        </div>

        <div>
          <label class="label">Password</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="input"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-xl bg-jogo-light text-jogo-dark font-black py-3 hover:opacity-90 transition disabled:opacity-50"
        >
          {{ loading ? 'Masuk...' : 'Login' }}
        </button>

        <p v-if="message" class="text-sm text-red-300">
          {{ message }}
        </p>
      </form>

      <NuxtLink
        to="/"
        class="block mt-6 text-center text-sm text-jogo-light/50 hover:text-jogo-light transition"
      >
        ← Kembali ke Stadion
      </NuxtLink>
    </section>
  </main>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const email = ref('')
const password = ref('')
const loading = ref(false)
const message = ref('')

watchEffect(() => {
  if (user.value) {
    navigateTo('/admin')
  }
})

const login = async () => {
  loading.value = true
  message.value = ''

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  loading.value = false

  if (error) {
    message.value = error.message
    return
  }

  await navigateTo('/admin')
}

useHead({
  title: 'Admin Login - Jogo Bonita'
})
</script>

<style scoped>
.label {
  @apply block mb-2 text-xs uppercase tracking-[0.22em] text-jogo-light/55;
}

.input {
  @apply w-full rounded-xl border border-jogo-light/15 bg-jogo-dark/60 px-4 py-3 text-jogo-light placeholder:text-jogo-light/30 outline-none transition focus:border-jogo-light/45;
}
</style>