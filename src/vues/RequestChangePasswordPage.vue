<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PocketBase from 'pocketbase'
import { useRouter } from 'vue-router'
import LogoMain from '@/components/icons/LogoMain.vue'

const router = useRouter()

onMounted(async () => {
  pb = new PocketBase('http://127.0.0.1:8090')

  pb.authStore.onChange(() => {
    currentUser.value = pb.authStore.model
  }, true)
})

let pb = null
const currentUser = ref()
const email = ref('')

const doRequest = async () => {
  if (email.value === '') 'Un email est requis pour réinitialiser le mot de passe'
  try {
    await pb.collection('users').requestPasswordReset(email.value)
    alert("Un email a été envoyé à l'adresse indiquée")

    pb.authStore.isValid && router.replace('/home')
  } catch (error) {
    alert(error.message)
  }
}
</script>

<template>
  <div class="flex min-h-fill items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div class="flex min-h-fill items-center justify-center">
        <LogoMain />
      </div>
      <h1>Réinitialiser le mot de passe</h1>
      <div class="sm:col-span-2 sm:col-start-1 mt-4">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
          >Adresse mail</label
        >
        <div class="mt-2">
          <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            autocomplete="none"
            placeholder="Entrez votre adresse mail"
            class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div></div>
        <div class="sm:col-span-2 sm:col-start-1 mt-4">
          <button
            type="button"
            @click="doRequest"
            class="mr-3 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Envoyer un mail
          </button>
          <button
            type="button"
            @click="router.back()"
            class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
