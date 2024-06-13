import PocketBase from 'pocketbase';

// Initialisation de PocketBase
export const pb = new PocketBase('http://127.0.0.1:8090');

// Définition des types pour les réponses des événements
interface EventsResponse {
  id: string;
  nom: string;
  Date_debut: string;
  Date_fin: string;
  Lieu: string;
  sport: string;
  nmb_participants: number;
  description: string;
}

interface Message {
  id: string;
  content: string;
  author: string;
  expand?: {
    author?: {
      name: string;
    };
  };
}

// Fonction pour récupérer tous les événements
export async function allEvents(): Promise<EventsResponse[]> {
  try {
    const events = await pb.collection('events').getFullList<EventsResponse>({
      sort: '+Date_debut'
    });
    console.log('Événements récupérés:', events);
    return events;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des événements:", error.message);
    throw error;
  }
}

// Fonction pour créer un événement
export async function createEvent(form: { value: EventsResponse }) {
  try {
    await pb.collection('events').create(form.value);
    alert('Événement créé avec succès');
    form.value = {
      id: '',
      nom: '',
      Date_debut: '',
      Date_fin: '',
      Lieu: '',
      sport: '',
      nmb_participants: 0,
      description: ''
    };
  } catch (error: any) {
    console.error("Erreur lors de la création de l'événement:", error.message);
    throw error;
  }
}

// Fonction pour récupérer les messages
export async function fetchMessages(): Promise<Message[]> {
  try {
    const messages = await pb.collection('messages').getFullList<Message>({
      sort: '-created',
      expand: 'author'
    });
    console.log('Fetched messages:', messages);
    return messages;
  } catch (error: any) {
    console.error('Error fetching messages:', error.message);
    throw error;
  }
}

// Fonction pour envoyer un message
export async function sendMessage(content: string, authorId: string): Promise<Message> {
  try {
    const newMessage = await pb.collection('messages').create({
      content,
      author: authorId
    });
    return newMessage;
  } catch (error: any) {
    console.error('Error sending message:', error.message);
    throw error;
  }
}

// Fonction pour envoyer un formulaire de contact
export async function sendContactForm(data: {
  name: string;
  email: string;
  objet: string;
  message: string;
  consent: boolean;
}): Promise<void> {
  try {
    await pb.collection('contacts').create(data);
  } catch (error: any) {
    console.error("Erreur lors de l'envoi du message de contact:", error.message);
    throw error;
  }
}

// Fonction pour obtenir les coordonnées géographiques d'une adresse
export async function getGeocode(address: string): Promise<{ lat: number, lon: number }> {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const data = await response.json();
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    } else {
      throw new Error('Adresse non trouvée');
    }
  } catch (error: any) {
    console.error('Erreur de géocodage:', error.message);
    throw error;
  }
}

// Fonction pour obtenir les événements avec leurs coordonnées géographiques
export async function getEventsWithCoordinates(): Promise<(EventsResponse & { latitude: number | null, longitude: number | null })[]> {
  try {
    const events = await allEvents();
    const eventsWithCoordinates = await Promise.all(events.map(async (event) => {
      if (event.Lieu) {
        try {
          const { lat, lon } = await getGeocode(event.Lieu);
          return { ...event, latitude: lat, longitude: lon };
        } catch (geocodeError: any) {
          console.error(`Erreur de géocodage pour l'adresse ${event.Lieu}:`, geocodeError.message);
          return { ...event, latitude: null, longitude: null };
        }
      } else {
        return { ...event, latitude: null, longitude: null };
      }
    }));
    return eventsWithCoordinates;
  } catch (error: any) {
    console.error('Erreur lors de la récupération des événements avec coordonnées:', error.message);
    throw error;
  }
}
