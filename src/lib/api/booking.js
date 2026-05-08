import { apiClient } from './client';

export async function getCsrfToken() {
    const response = await apiClient.get('/csrf-token');

    return response.data;
}

export async function getAvailability(month) {
    const response = await apiClient.get('/availability', {
        params: { month },
    });

    return response.data;
}

export async function createBooking(payload) {
    if (!sessionStorage.getItem('ljusaitodos_csrf_token')) {
        await getCsrfToken();
    }

    const response = await apiClient.post('/bookings', payload);

    return response.data;
}
