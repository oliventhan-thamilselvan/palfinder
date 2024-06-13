<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Pocketbase from 'pocketbase';
import { useRouter } from 'vue-router';
import EventsCard from '@/components/EventsCard.vue';
import CreateEventForm from '@/components/CreateEventForm.vue';
import Chat from '@/components/Chat.vue';
import { allEvents } from '@/backend';

let pb = null;
const currentUser = ref(null);
const router = useRouter();
const events = ref([]);
const showCreateForm = ref(false);
const showChat = ref(false);

onMounted(async () => {
  pb = new Pocketbase('http://127.0.0.1:8090');
  if (!pb.authStore.isValid) {
    router.replace('/login');
  } else {
    currentUser.value = pb.authStore.model;
    events.value = await allEvents();
  }
});

const toggleCreateForm = () => {
  showCreateForm.value = !showCreateForm.value;
};

const toggleChat = () => {
  showChat.value = !showChat.value;
};
</script>

<template>
<div class="w-full max-w-md p-4 text-xl	font-bold">
  <h2 class="text-left">Bienvenue {{ currentUser?.name || currentUser?.email }} !</h2>
</div>



  <div class="relative min-h-screen flex flex-col items-center justify-center">

    <div class="flex flex-col items-center">

      <button
        type="button"
        @click="toggleCreateForm"
        class="rounded-md "
      >
      <svg class="w-16 h-16 mb-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <!-- Cercle bleu -->
        <circle cx="12" cy="12" r="10" fill="#2586CC"/>
        <!-- Icône de plus -->
        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v8m4-4H8"/>
      </svg>      
    </button>
      <a
        class="rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Ajouter un événement
  </a>
    </div>

    <div v-if="showCreateForm" class="mt-6">
      <CreateEventForm />
    </div>

    <div class="flex flex-wrap justify-center gap-6 mt-6">
      <EventsCard v-for="event in events" :key="event.id" v-bind="event" />
    </div>

    <button
      @click="toggleChat"
      class="fixed top-24 right-8 bg-sky-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:bg-sky-800 focus:outline-none"
    >
      Chat
    </button>

    <div v-if="showChat" class="fixed top-24 right-28 bg-white shadow-2xl rounded-lg w-78 h-96 p-4">
      <Chat />
    </div>
  </div>
</template>

<style scoped>
.fixed {
  position: fixed;
}
</style>
