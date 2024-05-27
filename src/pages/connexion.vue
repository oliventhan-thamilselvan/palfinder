<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Pocketbase from 'pocketbase'
const pb = new Pocketbase('http://127.0.0.1:8090')

onMounted(async () => {
  pb.authStore.onChange(() => {
    loggeduser.value = pb.authStore.model
  }, true)
});

let email = ref('')
let password = ref('')
let loggeduser = ref(null)

const login = async () => {
    try {
        const user = await pb.collection('users').authWithPassword(email.value, password.value)
        loggeduser.value = user
        console.log(loggeduser.value)
    } catch (error) {
        console.error(error)
    }
}

const logout = async () => {
    try {
        await pb.authStore.clear()
        loggeduser.value = null
    } catch (error) {
        console.error(error)
    }
}

const loginGoogle = async () => {
    
}
</script>

<template>
    <h1>Connexion</h1>
    <input v-model="email" type="email">
    <input v-model="password" type="passowrd">
    <button @click="login">Connexion</button>
    <h1 v-if="loggeduser">Salut {{ loggeduser.name }}</h1>
    <button @click="logout" v-if="loggeduser">Déconnexion</button>
</template>