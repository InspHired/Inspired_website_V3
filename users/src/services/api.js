// users/src/services/api.js
import axios from 'axios';

// ============================================
// API URL CONFIGURATION
// ============================================

const API_URL = 'https://inspired-website-v3-fhno.onrender.com/api';

console.log('✅ API URL set to:', API_URL);

// ============================================
// AXIOS INSTANCE
// ============================================

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 30000
});

// ============================================
// INTERCEPTORS
// ============================================

api.interceptors.request.use(
    (config) => {
        console.log('📤 Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log('📥 Response:', response.status, response.config?.url);
        return response;
    },
    (error) => {
        if (error.code === 'ERR_NETWORK') {
            console.error('❌ Network Error - Cannot reach backend');
            console.error('   API URL:', API_URL);
        } else if (error.response) {
            console.error(`❌ API Error: ${error.response.status}`, error.response.data);
        } else {
            console.error('❌ API Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// ============================================
// PUBLIC API
// ============================================

export const publicApi = {
    getHomepage: async () => {
        try {
            console.log('📡 Fetching homepage...');
            const response = await api.get('/public/home');
            return response.data;
        } catch (error) {
            console.error('❌ Error fetching homepage:', error.message);
            return { 
                success: false, 
                error: error.message,
                apiUrl: API_URL
            };
        }
    },

    getAbout: async () => {
        try {
            const response = await api.get('/public/about');
            return response.data;
        } catch (error) {
            console.error('❌ Error fetching about:', error.message);
            return { success: false, error: error.message };
        }
    },

    getContact: async () => {
        try {
            const response = await api.get('/public/contact');
            return response.data;
        } catch (error) {
            console.error('❌ Error fetching contact:', error.message);
            return { success: false, error: error.message };
        }
    },

    getCareerLab: async () => {
        try {
            const response = await api.get('/public/career-lab');
            return response.data;
        } catch (error) {
            console.error('❌ Error fetching career lab:', error.message);
            return { success: false, error: error.message };
        }
    },

    getEmployers: async () => {
        try {
            const response = await api.get('/public/employers');
            return response.data;
        } catch (error) {
            console.error('❌ Error fetching employers:', error.message);
            return { success: false, error: error.message };
        }
    },

    getServices: async () => {
        try {
            const response = await api.get('/public/services');
            return response.data;
        } catch (error) {
            console.error('❌ Error fetching services:', error.message);
            return { success: false, error: error.message };
        }
    },

    getPageContent: async (page) => {
        try {
            console.log(`📡 Fetching ${page}...`);
            const response = await api.get(`/public/${page}`);
            return response.data;
        } catch (error) {
            console.error(`❌ Error fetching ${page}:`, error.message);
            return { success: false, error: error.message };
        }
    },

    getAllPages: async () => {
        try {
            console.log('📡 Fetching all pages...');
            const [home, about, contact, careerLab, employers, services] = await Promise.all([
                api.get('/public/home'),
                api.get('/public/about'),
                api.get('/public/contact'),
                api.get('/public/career-lab'),
                api.get('/public/employers'),
                api.get('/public/services')
            ]);
            return {
                success: true,
                data: {
                    home: home.data,
                    about: about.data,
                    contact: contact.data,
                    careerLab: careerLab.data,
                    employers: employers.data,
                    services: services.data
                }
            };
        } catch (error) {
            console.error('❌ Error fetching all pages:', error.message);
            return { success: false, error: error.message };
        }
    }
};

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

// ============================================
// DEFAULT EXPORT
// ============================================

export default api;