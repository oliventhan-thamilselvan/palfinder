import PocketBase from 'pocketbase'
export const pb = new PocketBase('http://127.0.0.1:8090');

export async function getAllEvents() {
    return await pb.collection('events').getFullList<EventsResponse>({
      sort: 'date_start'
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