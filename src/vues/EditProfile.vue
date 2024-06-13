<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PocketBase from 'pocketbase'
import { useRouter } from 'vue-router'
import { pb } from '@/backend'

// Typing for PocketBase
let pbInstance: PocketBase | null = null
const currentUser = ref<any>(null) // Better to replace 'any' with actual user type
const avatar = ref<string>('')
const banner = ref<string>('')
const bio = ref<string>('')
const field = ref<string>('')
const sexe = ref<string>('')
const age = ref<number>(0)
const statut = ref<string>('')
const objectif = ref<string>('')
const position = ref<string>('')
const lieu = ref<string>('')
const router = useRouter()

onMounted(async () => {
  pbInstance = new PocketBase('http://127.0.0.1:8090')

  if (!pbInstance.authStore.isValid) {
    router.replace('/login')
  } else {
    currentUser.value = pbInstance.authStore.model
    avatar.value = getAvatarUrl()
    banner.value = getBannerUrl()
    bio.value = currentUser.value?.bio || ''
    field.value = currentUser.value?.field || ''
    sexe.value = currentUser.value?.sexe || ''
    age.value = currentUser.value?.age || 0
    statut.value = currentUser.value?.statut || ''
    objectif.value = currentUser.value?.objectif || ''
    position.value = currentUser.value?.position || ''
    lieu.value = currentUser.value?.lieu || ''
  }
})

const getAvatarUrl = (): string => {
  if (currentUser.value && currentUser.value.avatar) {
    return `${pbInstance!.baseUrl}/api/files/users/${currentUser.value.id}/${currentUser.value.avatar}`
  }
  return ''
}

const getBannerUrl = (): string => {
  if (currentUser.value && currentUser.value.banniere) {
    return `${pbInstance!.baseUrl}/api/files/users/${currentUser.value.id}/${currentUser.value.banniere}`
  }
  return ''
}

const handleAvatarChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files![0]
  avatar.value = URL.createObjectURL(file)
}

const handleBannerChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files![0]
  banner.value = URL.createObjectURL(file)
}

const doUpdateProfile = async () => {
  try {
    const formData = new FormData()
    const avatarFile = document.querySelector<HTMLInputElement>('#avatar')!.files![0]
    const bannerFile = document.querySelector<HTMLInputElement>('#banniere')!.files![0]

    formData.append('avatar', avatarFile)
    formData.append('banniere', bannerFile)
    formData.append('bio', bio.value)
    formData.append('field', field.value)
    formData.append('sexe', sexe.value)
    formData.append('age', age.value.toString())
    formData.append('statut', statut.value)
    formData.append('objectif', objectif.value)
    formData.append('position', position.value)
    formData.append('lieu', lieu.value)
    formData.append('name', currentUser.value.name)

    await pbInstance!.collection('users').update(currentUser.value.id, formData)

    router.replace('/profile')
  } catch (error) {
    alert((error as Error).message)
  }
}
</script>

<template>
  <div class="flex min-h-fill items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <h1>Modifier le profil</h1>
      <div v-if="currentUser">
        <div class="mb-4">
          <label for="banniere" class="block text-sm font-medium leading-6 text-gray-900">Bannière</label>
          <input type="file" id="banniere" @change="handleBannerChange" class="mt-2" />
          <img :src="banner" alt="Banner Preview" class="w-full h-32 object-cover mt-4" v-if="banner" />
        </div>
        <div class="mb-4">
          <label for="avatar" class="block text-sm font-medium leading-6 text-gray-900">Avatar</label>
          <input type="file" id="avatar" @change="handleAvatarChange" class="mt-2" />
          <img :src="avatar" alt="Avatar Preview" class="w-32 h-32 rounded-full mt-4" v-if="avatar" />
        </div>
        <div class="mb-4">
          <label for="bio" class="block text-sm font-medium leading-6 text-gray-900">Bio</label>
          <textarea v-model="bio" id="bio" class="mt-2 w-full px-3 py-2 border rounded-md"></textarea>
        </div>
        <div class="mb-4">
          <label for="field" class="block text-sm font-medium leading-6 text-gray-900">Field</label>
          <select v-model="field" id="field" class="mt-2 w-full px-3 py-2 border rounded-md">
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Badminton">Badminton</option>
            <option value="Volley">Volley</option>
            <option value="Tennis de table">Tennis de table</option>
            <option value="Paddle">Paddle</option>
            <option value="Tennis">Tennis</option>
            <option value="Pétanque">Pétanque</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="sexe" class="block text-sm font-medium leading-6 text-gray-900">Sexe</label>
          <select v-model="sexe" id="sexe" class="mt-2 w-full px-3 py-2 border rounded-md">
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="age" class="block text-sm font-medium leading-6 text-gray-900">Age</label>
          <input v-model="age" type="number" id="age" class="mt-2 w-full px-3 py-2 border rounded-md" />
        </div>
        <div class="mb-4">
          <label for="statut" class="block text-sm font-medium leading-6 text-gray-900">Statut</label>
          <select v-model="statut" id="statut" class="mt-2 w-full px-3 py-2 border rounded-md">
            <option value="Disponible">Disponible</option>
            <option value="Occupé">Occupé</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="objectif" class="block text-sm font-medium leading-6 text-gray-900">Objectif</label>
          <select v-model="objectif" id="objectif" class="mt-2 w-full px-3 py-2 border rounded-md">
            <option value="Fun">Fun</option>
            <option value="Compétitif">Compétitif</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="position" class="block text-sm font-medium leading-6 text-gray-900">Position</label>
          <input v-model="position" type="text" id="position" class="mt-2 w-full px-3 py-2 border rounded-md" />
        </div>
        <div class="mb-4">
          <label for="lieu" class="block text-sm font-medium leading-6 text-gray-900">Lieu</label>
          <input v-model="lieu" type="text" id="lieu" class="mt-2 w-full px-3 py-2 border rounded-md" />
        </div>
        <div class="text-center mt-4">
          <button
            @click="doUpdateProfile"
            class="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-800"
          >
            Mettre à jour
          </button>
          <button
            @click="router.back()"
            class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 ml-2"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


