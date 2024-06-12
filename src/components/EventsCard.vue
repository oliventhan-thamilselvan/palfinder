<script setup lang="ts">
import type { EventsResponse } from '@/pocketbase-types';

const props = defineProps<EventsResponse>()
</script>



<template>

<div class="bg-white shadow-md rounded-lg overflow-hidden max-w-sm mx-auto my-4">
    <div class="px-6 py-4">
        <div class="font-bold text-2xl mb-2 text-blue-600">{{ nom }}</div>
        <div class="text-lg mb-2 text-gray-600">Début: <span class="font-semibold">{{ Date_debut }}</span></div>
        <div class="text-lg mb-2 text-gray-600">Fin: <span class="font-semibold">{{ Date_fin }}</span></div>
        <div class="text-lg mb-2 text-gray-600">Lieu: <span class="font-semibold">{{ Lieu }}</span></div>
        <div class="text-lg mb-2 text-gray-600">Sport: <span class="font-semibold">{{ sport }}</span></div>
        <div class="text-lg mb-2 text-gray-600">Participants: <span class="font-semibold">{{ nmb_participants }}</span></div>
        <p class="text-gray-700 text-base mt-4">
            {{ description }}
        </p>
    </div>
    <div class="px-6 pt-4 pb-2 flex justify-end">
        <RouterLink :to="`/${id}`" class="text-blue-600 font-bold hover:underline">LIRE LA SUITE</RouterLink>
    </div>
</div>

  </template>
  