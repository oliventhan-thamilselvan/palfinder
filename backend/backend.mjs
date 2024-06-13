import PocketBase from 'pocketbase'
export const pb = new PocketBase('http://127.0.0.1:8090');

export async function allEvents() {
  try {
      const events = await pb.collection('events').getFullList<EventsResponse>({
          sort: '+Date_debut'
      });
      console.log('Événements récupérés:', events);
      return events;
  } catch (error) {
      console.error("Erreur lors de la récupération des événements:", error.message);
      throw error;
  }
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
  }
}

export async function fetchMessages() {
  try {
    const messages = await pb.collection('messages').getFullList({
      sort: '-created',
      expand: 'author'
    })
    console.log('Fetched messages:', messages)
    return messages
  } catch (error) {
    console.error('Error fetching messages:', error)
    throw error
  }
}

export async function sendMessage(content: string, authorId: string) {
  try {
    const newMessage = await pb.collection('messages').create({
      content,
      author: authorId
    })
    return newMessage
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}

export async function sendContactForm(data: {
  name: string
  email: string
  objet: string
  message: string
  consent: boolean
}) {
  try {
    await pb.collection('contacts').create(data)
  } catch (error) {
    console.error("Erreur lors de l'envoi du message de contact:", error)
    throw error
  }
}

export async function getGeocode(address: string): Promise<{ lat: number, lon: number }> {
  try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();
      if (data && data.length > 0) {
          return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
      } else {
          throw new Error('Adresse non trouvée');
      }
  } catch (error) {
      console.error('Erreur de géocodage:', error);
      throw error;
  }
}

export async function getEventsWithCoordinates() {
  try {
      const events = await allEvents();
      const eventsWithCoordinates = await Promise.all(events.map(async (event) => {
          if (event.Lieu) {
              try {
                  const { lat, lon } = await getGeocode(event.Lieu);
                  return { ...event, latitude: lat, longitude: lon };
              } catch (geocodeError) {
                  console.error(`Erreur de géocodage pour l'adresse ${event.Lieu}:`, geocodeError);
                  return { ...event, latitude: null, longitude: null };
              }
          } else {
              return { ...event, latitude: null, longitude: null };
          }
      }));
      return eventsWithCoordinates;
  } catch (error) {
      console.error('Erreur lors de la récupération des événements avec coordonnées:', error);
      throw error;
  }
}
