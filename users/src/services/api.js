// users/src/services/api.js
import axios from 'axios';

// ============================================
// REPLACE WITH YOUR RENDER BACKEND URL
// ============================================
const RENDER_BACKEND_URL = 'https://inspired-website-v3-fhno.onrender.com/api'; // CHANGE THIS!
const LOCAL_BACKEND_URL = 'http://localhost:5000/api';

// ============================================
// DETECT ENVIRONMENT
// ============================================
const getApiUrl = () => {
    // Check if we're in production (deployed) or local
    const hostname = window.location.hostname;
    
    // If we're on a deployed site (not localhost)
    if (hostname !== 'localhost' && !hostname.includes('127.0.0.1')) {
        console.log('🔗 Running in production, using Render backend');
        return RENDER_BACKEND_URL;
    }
    
    // Local development
    console.log('🔗 Running locally');
    return LOCAL_BACKEND_URL;
};

const API_URL = getApiUrl();

console.log('✅ API URL set to:', API_URL);

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 30000 // 30 seconds for Render (might be cold start)
});

// Add response interceptor for debugging
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
            console.error('Error fetching about:', error.message);
            return { success: false, error: error.message };
        }
    },

    getContact: async () => {
        try {
            const response = await api.get('/public/contact');
            return response.data;
        } catch (error) {
            console.error('Error fetching contact:', error.message);
            return { success: false, error: error.message };
        }
    },

    getCareerLab: async () => {
        try {
            const response = await api.get('/public/career-lab');
            return response.data;
        } catch (error) {
            console.error('Error fetching career lab:', error.message);
            return { success: false, error: error.message };
        }
    },

    getEmployers: async () => {
        try {
            const response = await api.get('/public/employers');
            return response.data;
        } catch (error) {
            console.error('Error fetching employers:', error.message);
            return { success: false, error: error.message };
        }
    },

    getServices: async () => {
        try {
            const response = await api.get('/public/services');
            return response.data;
        } catch (error) {
            console.error('Error fetching services:', error.message);
            return { success: false, error: error.message };
        }
    },

    getPageContent: async (page) => {
        try {
            const response = await api.get(`/public/${page}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${page}:`, error.message);
            return { success: false, error: error.message };
        }
    }
};

export default api;