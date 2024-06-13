import PocketBase from 'pocketbase' ;
export const pb = new PocketBase('http://127.0.0.1:8090');


export async function allEvents() {
    return await pb.collection('events').getFullList<EventsResponse>({
      sort: '+Date_debut' 
    });
} 

const createEvent = async () => {
  try {
    await pb.collection('events').create(form.value)
    alert('Événement créé avec succès')
    form.value = {
      nom: '',
      Date_debut: '',
      Date_fin: '',
      Lieu: '',
      sport: '',
      nmb_participants: '',
      description: ''
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'événement:", error)
  }}

  export async function fetchMessages() {
    try {
      if (!pb.authStore.isValid) {
        throw new Error('User is not authenticated');
      }
      const messages = await pb.collection('messages').getFullList({
        sort: '-created',
        expand: 'author',
      });
      console.log('Fetched messages:', messages);
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }
  
  export async function sendMessage(content: string, authorId: string) {
    try {
      console.log('Sending message with content:', content, 'and authorId:', authorId);
      const newMessage = await pb.collection('messages').create({
        content,
        author: authorId,
      });
      console.log('Message sent:', newMessage);
      return newMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
