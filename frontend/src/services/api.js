import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Public API methods
export const publicApi = {
    getContent: (page) => api.get(`/public/content/${page}`),
    getAllContent: () => api.get('/public/content')
};

// Admin API methods
export const adminApi = {
    login: (email, password) => api.post('/admin/login', { email, password }),
    verify: () => api.get('/admin/verify'),
    getContent: () => api.get('/admin/content'),
    updateContent: (id, value) => api.put(`/admin/content/${id}`, { value })
};

export default api;