<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Pocketbase from 'pocketbase';
import { useRouter } from 'vue-router';
import EventsCard from '@/components/EventsCard.vue';
import CreateEventForm from '@/components/CreateEventForm.vue';
import { allEvents } from '@/backend';

let pb = null;
const currentUser = ref(null);
const router = useRouter();
const events = ref([]);
const showCreateForm = ref(false);

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
</script>

<template>
  <div class="items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <h2>Welcome {{ currentUser?.name || currentUser?.email }}</h2>
    <div class="sm:col-span-2 sm:col-start-1 mt-6">
      <button
        type="button"
        @click="toggleCreateForm"
        class="mr-3 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
      >
        Ajouter un événement
      </button>
    </div>

    <div v-if="showCreateForm" class="mt-6">
      <CreateEventForm />
    </div>

    <div class="flex flex-wrap justify-center gap-6 mt-6">
      <EventsCard v-for="event in events" :key="event.id" v-bind="event" />
    </div>
  </div>
</template>
