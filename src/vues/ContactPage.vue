<template>
    <div class="flex flex-col items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-md space-y-6">
        <div class="bg-white p-2 rounded-lg">
          <h1 class="text-2xl font-bold">Contact</h1>
          <p class="text-sm text-gray-600 mt-2">
            Que ce soit pour partager vos impressions sur l'application, suggérer des améliorations, demander de l'aide, proposer un partenariat, ou toute autre demande, nous sommes à votre écoute et nous engageons à vous répondre dans les plus brefs délais.
          </p>
        </div>
        <div class="bg-blue-100 p-8 rounded-lg shadow-md">
          <form @submit.prevent="handleSubmit">
            
            <div class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-bold">Nom*</label>
                <input
                  v-model="form.name"
                  type="text"
                  id="name"
                  class="w-full p-2 mt-1 border rounded"
                  required
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-bold">Mail*</label>
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  class="w-full p-2 mt-1 border rounded"
                  required
                />
              </div>
              <div>
                <label for="objet" class="block text-sm font-bold">Objet*</label>
                <input
                  v-model="form.objet"
                  type="text"
                  id="objet"
                  class="w-full p-2 mt-1 border rounded"
                  required
                />
              </div>
              <div>
                <label for="message" class="block text-sm font-bold">Message*</label>
                <textarea
                  v-model="form.message"
                  id="message"
                  class="w-full p-2 mt-1 border rounded"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div class="flex items-center">
                <input
                  v-model="form.consent"
                  type="checkbox"
                  id="consent"
                  class="mr-2"
                  required
                />
                <label for="consent" class="text-sm">J'accepte les conditions RGPD*</label>
              </div>
            </div>
            <div class="mt-6">
                <div v-if="successMessage" class="text-green-600 mb-4">{{ successMessage }}</div>
              <button
                type="submit"
                class="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { sendContactForm } from '@/backend';
  
  const form = ref({
    name: '',
    email: '',
    objet: '',
    message: '',
    consent: false,
  });
  
  const successMessage = ref('');
  
  const handleSubmit = async () => {
    try {
      await sendContactForm(form.value);
      successMessage.value = 'Votre message a été envoyé avec succès.';
      // Réinitialiser les champs du formulaire
      form.value = {
        name: '',
        email: '',
        objet: '',
        message: '',
        consent: false,
      };
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message de contact:', error);
      alert('Une erreur est survenue lors de l\'envoi du message');
    }
  };
  </script>
  
  <style scoped>
  input, textarea {
    border: 1px solid #ccc;
  }
  button {
    transition: background-color 0.3s;
  }
  </style>
  