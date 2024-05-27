<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Pocketbase from 'pocketbase'
const pb = new Pocketbase('http://127.0.0.1:8090')

const loggeduser = ref()

onMounted(async () => {
  loggeduser.value = pb.authStore.isValid ? pb.authStore.model : null
  console.log(loggeduser.value)
});
</script>

<template>
  <section v-if="loggeduser">
    <h1>Salut {{ loggeduser.name }}</h1>
  </section>
</template>
