<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PocketBase from 'pocketbase'
import { useRouter } from 'vue-router'

let pb = null
const currentUser = ref(null)
const router = useRouter()

onMounted(async () => {
  pb = new PocketBase('http://127.0.0.1:8090')

  if (!pb.authStore.isValid) {
    router.replace('/login')
  } else {
    currentUser.value = pb.authStore.model
  }
})

const getAvatarUrl = () => {
  if (currentUser.value && currentUser.value.avatar) {
    return `${pb.baseUrl}/api/files/users/${currentUser.value.id}/${currentUser.value.avatar}`
  }
  return ''
}

const getBannerUrl = () => {
  if (currentUser.value && currentUser.value.banniere) {
    return `${pb.baseUrl}/api/files/users/${currentUser.value.id}/${currentUser.value.banniere}`
  }
  return ''
}

const goToEditProfile = () => {
  router.push('/edit-profile')
}

const doLogout = () => {
  pb.authStore.clear()
  router.replace('/login')
}
</script>

<template>
  <div class="profile-container flex flex-col items-center">
    <div class="banner w-full h-40 relative">
      <img :src="getBannerUrl()" alt="Banner" class="w-full h-full object-cover" v-if="currentUser && currentUser.banniere" />
    </div>
    <div class="avatar-container relative -mt-16 w-32 h-32 rounded-full overflow-hidden border-4 border-white">
      <img :src="getAvatarUrl()" alt="Avatar" class="w-full h-full object-cover" v-if="currentUser && currentUser.avatar" />
    </div>
    <div class="profile-details text-center mt-4">
      <h2 class="text-2xl font-bold">{{ currentUser && currentUser.name }}</h2>
      <p class="text-gray-600">{{ currentUser && currentUser.position }}</p>
      <p class="text-gray-600">{{ currentUser && currentUser.lieu }}</p>
    </div>
    <div class="buttons mt-4 flex space-x-2">
      <button @click="goToEditProfile" class="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-800">
        Modifier profil
      </button>
      <button @click="doLogout" class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
        Déconnexion
      </button>
    </div>
    <div class="profile-info mt-6 space-y-4">
      <div class="flex items-center">
        <label class="text-gray-600">Sports préférés :</label>
        <span class="ml-2 px-3 py-1 bg-blue-100 text-sky-600 rounded-full">{{ currentUser && currentUser.field }}</span>
      </div>
      <div class="flex items-center">
        <label class="text-gray-600">Sexe :</label>
        <span class="ml-2">{{ currentUser && currentUser.sexe }}</span>
      </div>
      <div class="flex items-center">
        <label class="text-gray-600">Âge :</label>
        <span class="ml-2">{{ currentUser && currentUser.age }}</span>
      </div>
      <div class="flex items-center">
        <label class="text-gray-600">Statut :</label>
        <span :class="{'bg-green-100 text-green-600': currentUser && currentUser.statut === 'Disponible', 'bg-red-100 text-red-600': currentUser && currentUser.statut === 'Occupé'}" class="ml-2 px-3 py-1 rounded-full">
          {{ currentUser && currentUser.statut }}
        </span>
      </div>
      <div class="flex items-center">
        <label class="text-gray-600">Objectif :</label>
        <span class="ml-2">{{ currentUser && currentUser.objectif }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding-bottom: 20px;
}

.banner {
  background-color: #f3f3f3;
}

.avatar-container img {
  border-radius: 50%;
}

.profile-details h2 {
  margin-top: 10px;
}

.buttons button {
  margin-top: 10px;
}

.ratings {
  margin-top: 10px;
}

.profile-info div {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.profile-info label {
  font-weight: 600;
}

.profile-info span {
  font-weight: 400;
}
</style>
