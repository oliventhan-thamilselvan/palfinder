<template>
    <div id="map-container">
      <div id="map"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, nextTick } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import { getEventsWithCoordinates } from '@/backend';
  
  const map = ref<L.Map | null>(null);
  
  onMounted(async () => {
    await nextTick(); // Assurez-vous que l'élément 'map' est prêt
    try {
      console.log('Initialisation de la carte...');
      map.value = L.map('map').setView([47.5101, 6.7996], 13);
      console.log('Carte initialisée:', map.value);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value);
  
      const events = await getEventsWithCoordinates();
      console.log('Événements avec coordonnées:', events);
  
      events.forEach(event => {
        if (event.latitude && event.longitude) {
          const marker = L.marker([event.latitude, event.longitude])
            .addTo(map.value)
            .bindPopup(`<b>${event.nom}</b><br>${event.Lieu}`);
          console.log(`Marqueur ajouté pour ${event.nom}:`, marker);
        }
      });
    } catch (eventsError) {
      console.error('Erreur lors de la récupération des événements avec coordonnées:', eventsError.message);
    }
  });
  </script>
  
  <style scoped>
  #map-container {
    height: 600px; /* Vous pouvez ajuster cette valeur selon vos besoins */
    width: 100%; /* Prendre toute la largeur disponible */
    background-color: #f0f0f0;
  }
  #map {
    height: 100%;
    width: 100%;
  }
  </style>
  