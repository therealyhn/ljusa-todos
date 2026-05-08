import { apiClient } from './client';

export async function getAdminCsrfToken() {
    const response = await apiClient.get('/admin/csrf-token');

    return response.data.data;
}

export async function loginAdmin(credentials) {
    if (!sessionStorage.getItem('ljusaitodos_csrf_token')) {
        await getAdminCsrfToken();
    }

    const response = await apiClient.post('/admin/login', credentials);

    return response.data.data;
}

export async function logoutAdmin() {
    const response = await apiClient.post('/admin/logout');

    return response.data.data;
}

export async function getCurrentAdmin() {
    const response = await apiClient.get('/admin/me');

    return response.data.data;
}

export async function getAdminBookings(params) {
    const response = await apiClient.get('/bookings', { params });

    return response.data.data;
}

export async function updateAdminBooking(id, payload) {
    const response = await apiClient.patch(`/bookings/${id}`, payload);

    return response.data.data;
}

export async function setAvailabilityOverride(date, payload) {
    const response = await apiClient.patch(`/availability/${date}`, payload);

    return response.data.data;
}

export async function clearAvailabilityOverride(date) {
    const response = await apiClient.delete(`/availability/${date}`);

    return response.data.data;
}
