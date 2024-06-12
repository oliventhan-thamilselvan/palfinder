<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Pocketbase from 'pocketbase';
import { useRouter } from 'vue-router';
import EventsCard from '@/components/EventsCard.vue';
import CreateEventForm from '@/components/CreateEventForm.vue';

let pb = null;
const currentUser = ref();
const router = useRouter();

onMounted(async () => {
  pb = new Pocketbase('http://127.0.0.1:8090');
  !pb.authStore.isValid && router.replace('/login');
  currentUser.value = pb.authStore.isValid ? pb.authStore.model : null;
});

const doLogout = () => {
  pb.authStore.clear();
  currentUser.value = null;
  router.replace('/login');
};

import { allEvents } from '@/backend';

const events = ref();
events.value = await allEvents();
</script>

<template>
  <div class="items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <h2>Welcome {{ (currentUser && currentUser?.name) || currentUser?.email }}</h2>
    <div class="sm:col-span-2 sm:col-start-1 mt-6">
      <button
        type="button"
        @click="doLogout"
        class="mr-3 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
      >
        Déconnexion
      </button>
    </div>

    <CreateEventForm />

    <div class="flex flex-wrap justify-center gap-6 mt-6">
      <EventsCard v-for="event in events" :key="event.id" v-bind="event" />
    </div>
  </div>
</template>
