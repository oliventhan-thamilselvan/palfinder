<template>
    <div class="max-w-lg mx-auto my-4 p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold mb-4 text-sky-600">Créer un événement</h2>
      <form @submit.prevent="createEvent">
        <div class="mb-4">
          <label for="nom" class="block text-gray-700 font-bold mb-2">Nom</label>
          <input v-model="form.nom" id="nom" type="text" class="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="Date_debut" class="block text-gray-700 font-bold mb-2">Date de début</label>
          <input v-model="form.Date_debut" id="Date_debut" type="datetime-local" class="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="Date_fin" class="block text-gray-700 font-bold mb-2">Date de fin</label>
          <input v-model="form.Date_fin" id="Date_fin" type="datetime-local" class="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="Lieu" class="block text-gray-700 font-bold mb-2">Lieu</label>
          <input v-model="form.Lieu" id="Lieu" type="text" class="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="sport" class="block text-gray-700 font-bold mb-2">Sport</label>
          <input v-model="form.sport" id="sport" type="text" class="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="nmb_participants" class="block text-gray-700 font-bold mb-2">Nombre de participants</label>
          <input v-model="form.nmb_participants" id="nmb_participants" type="number" class="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
          <textarea v-model="form.description" id="description" class="w-full px-3 py-2 border rounded-md" rows="4" required></textarea>
        </div>
        <button type="submit" class="bg-sky-600 text-white px-4 py-2 rounded-md font-bold hover:bg-sky-800">Créer</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import Pocketbase from 'pocketbase';
  
  const form = ref({
    nom: '',
    Date_debut: '',
    Date_fin: '',
    Lieu: '',
    sport: '',
    nmb_participants: '',
    description: ''
  });
  
  let pb = new Pocketbase('http://127.0.0.1:8090');
  
  const createEvent = async () => {
    try {
      await pb.collection('events').create({
        ...form.value,
        Date_debut: new Date(form.value.Date_debut).toISOString(),
        Date_fin: new Date(form.value.Date_fin).toISOString(),
      });
      alert('Événement créé avec succès');
      form.value = {
        nom: '',
        Date_debut: '',
        Date_fin: '',
        Lieu: '',
        sport: '',
        nmb_participants: '',
        description: ''
      };
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement:', error);
    }
  };
  </script>
  