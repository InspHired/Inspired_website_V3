// users/src/services/api.js
import axios from 'axios';

// ============================================
// FORCE USE RENDER BACKEND - Local backend not running
// ============================================
const API_URL = 'https://inspired-website-v3-fhno.onrender.com/api';

console.log('✅ API URL set to:', API_URL);

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 30000 // 30 seconds for Render (might be cold start)
});

// Add request interceptor for debugging
api.interceptors.request.use(
    (config) => {
        console.log('📤 Request:', config.method.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
api.interceptors.response.use(
    (response) => {
        console.log('📥 Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        if (error.code === 'ERR_NETWORK') {
            console.error('❌ Network Error - Cannot reach backend');
            console.error('   API URL:', API_URL);
            console.error('   Make sure:');
            console.error('   1. Backend is running on Render');
            console.error('   2. The URL is correct');
        } else if (error.response) {
            console.error(`❌ API Error: ${error.response.status}`, error.response.data);
        } else {
            console.error('❌ API Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// ============================================
// PUBLIC API METHODS
// ============================================
export const publicApi = {
    getHomepage: async () => {
        try {
            console.log('📡 Fetching homepage from Render...');
            const response = await api.get('/public/home');
            console.log('✅ Homepage fetched:', response.data.success ? 'Success' : 'Failed');
            return response.data;
        } catch (error) {
            console.error('❌ Error fetching homepage:', error.message);
            return { 
                success: false, 
                error: error.message,
                code: error.code,
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
            console.log(`📡 Fetching ${page} page from Render...`);
            const response = await api.get(`/public/${page}`);
            return response.data;
        } catch (error) {
            console.error(`❌ Error fetching ${page}:`, error.message);
            return { success: false, error: error.message };
        }
    },

    // ============================================
    // BULK FETCH - Get all pages at once
    // ============================================
    getAllPages: async () => {
        try {
            console.log('📡 Fetching all pages from Render...');
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
// ADMIN API METHODS - For Admin Dashboard
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
        console.log('   Table:', table);
        console.log('   Original ID:', originalId);
        console.log('   Original Key:', originalKey);
        console.log('   Field:', field);
        
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