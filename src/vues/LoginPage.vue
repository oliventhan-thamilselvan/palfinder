<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Pocketbase from 'pocketbase'
import { useRouter } from 'vue-router'
import LogoMain from '@/components/icons/LogoMain.vue'

const router = useRouter()

const pb = new Pocketbase('http://127.0.0.1:8090')
const currentUser = ref<any>(null) // Remplacer 'any' par le type utilisateur approprié si disponible
const username = ref<string>('')
const password = ref<string>('')

onMounted(() => {
  pb.authStore.onChange(() => {
    currentUser.value = pb.authStore.model
  }, true)
})

const doLogin = async () => {
  try {
    await pb.collection('users').authWithPassword(username.value, password.value)
    if (pb.authStore.isValid) {
      router.replace('/home')
    }
  } catch (error: any) {
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
      <h1>Se connecter</h1>
      <div class="sm:col-span-2 sm:col-start-1 mt-4">
        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Adresse mail</label>
        <div class="mt-2">
          <input
            v-model="username"
            type="text"
            name="username"
            id="username"
            autocomplete="none"
            placeholder="Entrez votre adresse mail"
            class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-2 sm:col-start-1 mt-2">
        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
        <div class="mt-2">
          <input
            v-model="password"
            type="password"
            name="password"
            id="password"
            autocomplete="none"
            placeholder="Entrez votre mot de passe"
            class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-2 sm:col-start-1 mt-2">
        <button
          type="button"
          @click="doLogin"
          class="mr-3 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          Se connecter
        </button>
        <button
          type="button"
          @click="router.push('/create-account')"
          class="mr-2 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          S’inscrire
        </button>
        <button
          type="button"
          @click="router.push('/request-change-password')"
          class="float-right px-3 py-2 text-sm font-semibold text-sky-600"
        >
          Mot de passe oublié ?
        </button>
      </div>
    </div>
  </div>
</template>
