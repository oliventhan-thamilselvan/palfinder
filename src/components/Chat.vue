<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { fetchMessages, sendMessage } from '@/backend';
import PocketBase from 'pocketbase';

const messages = ref([]);
const newMessageContent = ref('');
const currentUser = ref(null);
let intervalId = null;

const updateMessages = async () => {
  try {
    const fetchedMessages = await fetchMessages();
    messages.value = fetchedMessages;
    console.log('Updated messages:', messages.value);
    nextTick(() => {
      const messagesContainer = document.querySelector('.messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

onMounted(async () => {
  const pb = new PocketBase('http://127.0.0.1:8090');
  if (pb.authStore.isValid) {
    currentUser.value = pb.authStore.model;
    console.log('Current user:', currentUser.value);
  } else {
    console.error('User is not authenticated');
    return;
  }

  try {
    await updateMessages();
  } catch (error) {
    console.error('Error fetching messages:', error);
  }

  intervalId = setInterval(updateMessages, 1000); // Mise à jour des messages toutes les 5 secondes
});

onUnmounted(() => {
  clearInterval(intervalId);
});

const handleSendMessage = async () => {
  if (!currentUser.value) {
    console.error('No user is currently authenticated');
    return;
  }
  if (newMessageContent.value.trim() === '') return;
  try {
    console.log('Sending message:', newMessageContent.value);
    const newMessage = await sendMessage(newMessageContent.value, currentUser.value.id);
    console.log('Message sent:', newMessage);
    messages.value.push(newMessage);
    newMessageContent.value = '';
    nextTick(() => {
      const messagesContainer = document.querySelector('.messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
</script>

<template>
  <div class="chat-container">
    <div class="messages">
      <div v-for="message in messages" :key="message.id" class="message">
        <strong v-if="message.expand && message.expand.author">{{ message.expand.author.name }}:</strong>
        <strong v-else>Unknown:</strong>
        {{ message.content }}
      </div>
    </div>
    <div class="new-message">
      <input v-model="newMessageContent" placeholder="Écrivez un message..." />
      <button @click="handleSendMessage">Envoyer</button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  max-width: 250px; /* Ajuster la largeur maximale */
  margin: 0 auto;
  height: 100%;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #ccc;
  margin-bottom: 8px;
  max-height: 400px; /* Augmenter la hauteur maximale */
  font-size: 14px;
  word-wrap: break-word; /* Assurer que le texte reste dans la boîte */
  display: flex;
  flex-direction: column-reverse; /* Afficher les nouveaux messages en bas */
}

.message {
  margin-bottom: 8px;
}

.new-message {
  display: flex;
}

.new-message input {
  flex-grow: 1;
  padding: 0px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
  font-size: 14px;
}

.new-message button {
  padding: 8px 6px;
  border: none;
  background-color: #28a745;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.new-message button:hover {
  background-color: #218838;
}
</style>
