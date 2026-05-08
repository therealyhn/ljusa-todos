import axios from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
    const csrfToken = sessionStorage.getItem('ljusaitodos_csrf_token');

    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        const csrfToken = response.data?.data?.csrf_token;

        if (csrfToken) {
            sessionStorage.setItem('ljusaitodos_csrf_token', csrfToken);
        }

        return response;
    },
    (error) => Promise.reject(normalizeApiError(error)),
);

export function normalizeApiError(error) {
    const response = error.response;
    const payload = response?.data;

    return {
        message: payload?.error || payload?.message || error.message || 'Request failed',
        code: payload?.code || response?.status || 500,
        details: payload?.details || null,
    };
}
