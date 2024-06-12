<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PocketBase from 'pocketbase'
import HeaderPage from './components/HeaderPage.vue';
import FooterPage from './components/FooterPage.vue';
</script>

<template>
  <HeaderPage />
  <suspense>
    <router-view />
  </suspense>
  <FooterPage />
</template>
