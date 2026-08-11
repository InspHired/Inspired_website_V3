// admin/src/services/api.js
import axios from "axios";

// ============================================
// API URL - USE ENVIRONMENT VARIABLE
// ============================================

const API_URL = process.env.REACT_APP_API_URL || 'https://inspired-website-v3-fhno.onrender.com/api';

console.log(`🔌 API URL: ${API_URL}`);

// ============================================
// AXIOS INSTANCE
// ============================================

const api = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

// ============================================
// REQUEST INTERCEPTOR
// ============================================

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => Promise.reject(error)
);

// ============================================
// RESPONSE INTERCEPTOR
// ============================================

api.interceptors.response.use(
    (response) => {
        console.log(`✅ ${response.config.url} (${response.status})`);
        return response;
    },
    (error) => {
        if (error.response) {
            console.error('❌ API Error');
            console.error('Status:', error.response.status);
            console.error('URL:', error.config?.url);
            console.error('Data:', error.response.data);

            if (error.response.status === 401) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
                if (window.location.pathname !== '/admin/login') {
                    window.location.href = '/admin/login';
                }
            }
        } else if (error.request) {
            console.error('❌ No response received from backend.');
            console.error('Backend URL:', API_URL);
        } else {
            console.error('❌ Axios Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// ============================================
// ADMIN API
// ============================================

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

    updateContent: (id, value, table, originalId, originalKey, field) => {
        console.log(`📝 Updating content ${id}...`);
        return api.put(`/admin/content/${id}`, {
            value,
            table,
            originalId,
            originalKey: originalKey || field,
            field
        });
    },

    health: () => {
        console.log('🏥 Health check...');
        return api.get('/test');
    }
};

export default api;