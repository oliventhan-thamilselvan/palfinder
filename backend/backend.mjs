import PocketBase from 'pocketbase'
export const pb = new PocketBase('http://127.0.0.1:8090');

export async function getAllEvents() {
    return await pb.collection('events').getFullList<EventsResponse>({
      sort: 'date_start'
    });
} 