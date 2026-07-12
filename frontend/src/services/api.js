// frontend/src/services/api.js
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

// Add response interceptor for debugging
api.interceptors.response.use(
    (response) => {
        console.log('✅ API Response:', response.config.url, response.status);
        return response;
    },
    (error) => {
        console.error('❌ API Error:', error.config?.url, error.message);
        return Promise.reject(error);
    }
);

// Public API methods
export const publicApi = {
    getPageContent: (page) => {
        console.log(`📄 Fetching ${page} content...`);
        return api.get(`/public/${page}`);
    },
    getAllPages: () => {
        console.log('📄 Fetching all pages...');
        return Promise.all([
            publicApi.getPageContent('home'),
            publicApi.getPageContent('about'),
            publicApi.getPageContent('contact'),
            publicApi.getPageContent('career-lab'),
            publicApi.getPageContent('employers'),
            publicApi.getPageContent('services')
        ]);
    }
};

// Admin API methods
export const adminApi = {
    login: (email, password) => {
        console.log('🔐 Logging in...');
        return api.post('/admin/login', { email, password });
    },
    verify: () => {
        console.log('🔍 Verifying token...');
        return api.get('/admin/verify');
    },
    getContent: () => {
        console.log('📥 Fetching admin content...');
        return api.get('/admin/content');
    },
    updateContent: (id, value, table, originalId, originalKey) => {
        console.log(`📝 Updating content ${id}...`);
        return api.put(`/admin/content/${id}`, { 
            value, 
            table, 
            originalId, 
            originalKey 
        });
    }
};

export default api;