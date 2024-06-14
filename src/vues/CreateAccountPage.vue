<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PocketBase from 'pocketbase'
import { useRouter } from 'vue-router'
import LogoMain from '@/components/icons/LogoMain.vue'

const router = useRouter()

let pbInstance: PocketBase | null = null // Typing for PocketBase
const currentUser = ref<any>(null) // Better to replace 'any' with actual user type
const username = ref<string>('')
const password = ref<string>('')
const fullName = ref<string>('')

onMounted(async () => {
  pbInstance = new PocketBase('http://127.0.0.1:8090')

  pbInstance.authStore.onChange(() => {
    currentUser.value = pbInstance!.authStore.model
  }, true)
})

const doLogin = async () => {
  try {
    const authData = await pbInstance!.collection('users').authWithPassword(username.value, password.value)

    // after the above you can also access the auth data from the authStore
    console.log(pbInstance!.authStore.isValid)
    console.log(pbInstance!.authStore.token)
    console.log(pbInstance!.authStore.model)

    // Redirect to home if login is successful
    router.replace('/home')
  } catch (error) {
    alert((error as Error).message)
  }
}

const doCreateAccount = async () => {
  try {
    const data = {
      username: `user_${self.crypto.randomUUID().split('-')[0]}`,
      email: username.value,
      emailVisibility: true,
      password: password.value,
      passwordConfirm: password.value,
      name: fullName.value
    }

    const record = await pbInstance!.collection('users').create(data)

    // Call login after account creation
    await doLogin()
  } catch (error) {
    alert((error as Error).message)
  }
}
</script>

<template>
  <div class="flex min-h-fill items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div class="flex min-h-fill items-center justify-center">
        <LogoMain />
      </div>
      <h1>S'inscrire</h1>
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
        <div></div>
        <div class="mt-7">
          <label for="fullName" class="block text-sm font-medium leading-6 text-gray-900">Nom</label>
          <div class="mt-2">
            <input
              v-model="fullName"
              type="text"
              name="fullName"
              id="fullName"
              autocomplete="none"
              placeholder="Entrez votre nom"
              class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="sm:col-span-2 sm:col-start-1 mt-2">
          <button
            type="button"
            @click="doCreateAccount"
            class="mr-3 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            S’inscrire
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
