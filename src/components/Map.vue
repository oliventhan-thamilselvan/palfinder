<template>
  <div>
    <div id="map" style="height: 600px;"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getEventsWithCoordinates } from '@/backend';

const map = ref<L.Map | null>(null);

onMounted(async () => {
  map.value = L.map('map').setView([48.8566, 2.3522], 13); // Paris coordinates as default

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map.value);

  try {
    const events = await getEventsWithCoordinates();
    console.log('Événements avec coordonnées:', events);
    for (const event of events) {
      if (event.latitude && event.longitude) {
        L.marker([event.latitude, event.longitude])
          .addTo(map.value)
          .bindPopup(`<b>${event.nom}</b><br>${event.Lieu}`)
          .openPopup();
      }
    }
  } catch (eventsError) {
    console.error('Erreur lors de la récupération des événements avec coordonnées:', eventsError.message);
  }
});
</script>

<style scoped>
#map {
  height: 100vh;
}
</style>
