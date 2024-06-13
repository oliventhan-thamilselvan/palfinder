<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import LogoIcon from '@/components/icons/PalFinderHeader.vue';
import Pocketbase from 'pocketbase';

const activeMenu = ref(false);
const currentUser = ref(null);
const router = useRouter();
let pb = null;

onMounted(async () => {
  pb = new Pocketbase('http://127.0.0.1:8090');
  if (!pb.authStore.isValid) {
    router.replace('/login');
  } else {
    currentUser.value = pb.authStore.model;
  }

  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

function handleClickOutside(event) {
  const menu = document.getElementById('dropdown-menu');
  const avatar = document.getElementById('user-avatar');
  if (menu && !menu.contains(event.target) && !avatar.contains(event.target)) {
    activeMenu.value = false;
  }
}

const doLogout = () => {
  pb.authStore.clear();
  currentUser.value = null;
  activeMenu.value = false;
  router.replace('/login');
};

const getAvatarUrl = () => {
  if (currentUser.value && currentUser.value.avatar) {
    return `${pb.baseUrl}/api/files/users/${currentUser.value.id}/${currentUser.value.avatar}`;
  }
  return '';
};

const toggleMenu = () => {
  activeMenu.value = !activeMenu.value;
};
</script>

<template>
  <header class="flex items-center justify-between px-4 h-20 border-b-2 border-b-indigo-100 gap-8 lg:py-0 bg-sky-600">
    <RouterLink class="z-30" to="/">
      <LogoIcon />
    </RouterLink>

    <div v-if="currentUser" class="flex items-center gap-4 ml-auto relative">
      <div
        id="user-avatar"
        class="w-10 h-10 rounded-full border-2 border-white object-cover cursor-pointer flex items-center justify-center bg-gray-400"
        @click="toggleMenu"
      >
        <img
          v-if="currentUser && currentUser.avatar"
          :src="getAvatarUrl()"
          alt="User Avatar"
          class="w-full h-full rounded-full"
        />
        <span v-else class="text-white text-xl">?</span>
      </div>

      <div
        v-if="activeMenu"
        id="dropdown-menu"
        class="absolute right-0 mt-48 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
      >
        <RouterLink
          to="/profile"
          class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          @click="activeMenu = false"
        >
          Profil
        </RouterLink>
        <button
          @click="doLogout"
          class="block w-full text-left px-4 py-2 text-white bg-red-600 hover:bg-red-700"
        >
          Déconnexion
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
#dropdown-menu {
  z-index: 50; /* Assure que le menu reste au-dessus de tout autre élément */
}
</style>
