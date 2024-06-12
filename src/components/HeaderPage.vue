<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
});

function closeMenu() {
  activeMenu.value = false;
}

const doLogout = () => {
  pb.authStore.clear();
  currentUser.value = null;
  router.replace('/login');
};
</script>

<template>
  <header
    class="flex items-center justify-between px-4 h-20 border-b-2 border-b-indigo-100 gap-8 lg:py-0 bg-sky-600"
  >
    <RouterLink class="z-30" to="/">
      <LogoIcon />
    </RouterLink>

    <button
      class="relative z-50 flex h-5 w-8 flex-col justify-between lg:hidden"
      @click="activeMenu = !activeMenu"
    >
      <span
        class="block ease h-[2px] w-full transform rounded-full bg-white transition duration-300"
        :class="{ 'translate-y-[9px] rotate-45 bg-white': activeMenu }"
      ></span>
      <span
        class="block ease h-[2px] w-full transform rounded-full bg-white transition duration-300"
        :class="{ 'bg-black opacity-0': activeMenu }"
      ></span>
      <span
        class="block ease h-[2px] w-full transform rounded-full bg-white transition duration-300"
        :class="{ '-translate-y-[9px] -rotate-45 bg-white': activeMenu }"
      ></span>
    </button>

    <nav
      class="z-40 invisible opacity-0 fixed inset-0 h-screen w-screen bg-sky-600 text-2xl text-black transition-all duration-300 ease-in-out lg:visible lg:relative lg:flex lg:h-auto lg:w-auto lg:items-center lg:bg-transparent lg:text-sm lg:font-bold lg:uppercase lg:tracking-wide lg:text-black lg:opacity-100"
      :class="{ '!visible opacity-100': activeMenu }"
      v-scroll-lock="activeMenu"
    >
      <button
        type="button"
        @click="doLogout"
        class="mt-4 mr-3 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 lg:mt-0"
      >
        Déconnexion
      </button>
    </nav>
  </header>
</template>
