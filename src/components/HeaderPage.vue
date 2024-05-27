<script setup lang="ts">
const activeMenu = ref(false)
import { RouterLink } from 'vue-router'
import LogoIcon from '@/components/icons/PalFinderHeader.vue'

import { ref } from 'vue'
function closeMenu() {
  activeMenu.value = false
}
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
      <ul v-if="estConnecté" class="mt-[25vh] ml-16 lg:m-0 lg:flex">
        <li class="menu-item uppercase text-white">
          <RouterLink to="/events" @click="closeMenu" class="menu-link">mes évènements</RouterLink>
        </li>
        <li class="menu-item uppercase text-white">
          <RouterLink to="/#" @click="closeMenu" class="menu-link">messagerie</RouterLink>
        </li>
      </ul>
      <div class="flex items-center gap-4 px-4">
        <div v-if="estConnecté">
          <button @click="logout" class="flex-1 p-3 text-white font-bold lg:flex-none lg:px-6">
            Déconnexion
          </button>
          <RouterLink :to="`${url}`"
            ><button
              @click="closeMenu"
              class="flex-1 p-3 rounded-lg border-2 border-white font-bold text-white lg:flex-none lg:px-6"
            >
              {{ estConnecté.username }}
            </button></RouterLink
          >
        </div>
        <RouterLink
          v-else
          to="/connexion"
          class="flex-1 p-3 rounded-lg border-2 text-white border-white font-bold lg:flex-none lg:px-6"
        >
          Se connecter
        </RouterLink>
      </div>
    </nav>
  </header>
</template>
