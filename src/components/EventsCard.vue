<script setup lang="ts">
import type { EventsResponse } from '@/pocketbase-types';
import { computed } from 'vue';

const props = defineProps<EventsResponse>();

// Computed properties for formatted dates and times
const formattedStartDate = computed(() => {
  const date = new Date(props.Date_debut);
  return date.toLocaleDateString('fr-FR');
});

const formattedStartTime = computed(() => {
  const date = new Date(props.Date_debut);
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
});

const formattedEndTime = computed(() => {
  const date = new Date(props.Date_fin);
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
});
</script>

<template>
  <div class="bg-sky-600 shadow-md rounded-lg overflow-hidden max-w-sm mx-auto my-4 text-white">
    <img src="@/assets/event.webp" alt="Event Image" class="w-full h-48 object-cover">
    <div class="px-6 py-4">
      <div class="font-bold text-2xl mb-2">{{ props.nom }}</div>
      <div class="flex items-center mb-2">
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 20s6-6.373 6-10A6 6 0 004 10c0 3.627 6 10 6 10zM8 9a2 2 0 114 0 2 2 0 01-4 0z" clip-rule="evenodd"></path>
        </svg>
        <span class="text-lg"><RouterLink to="/" class="underline">{{ props.Lieu }}</RouterLink></span>
      </div>
      <div class="text-lg mb-2">{{ props.sport }}</div>
      <div class="text-lg mb-2">{{ formattedStartDate }}</div>
      <div class="text-lg mb-2">
        Début : <span class="font-semibold">{{ formattedStartTime }}</span> Fin : <span class="font-semibold">{{ formattedEndTime }}</span>
      </div>
      <div class="flex justify-end">
        <span>{{ props.current_participants }} / {{ props.nmb_participants }} participants</span>
      </div>
      <p class="text-gray-200 text-base mt-4">
        {{ props.description }}
      </p>
    </div>
  </div>
</template>
