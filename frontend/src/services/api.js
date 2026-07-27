// frontend/src/services/api.js
import axios from 'axios';

// ============================================
// DYNAMIC API URL CONFIGURATION
// ============================================
const getApiBaseUrl = () => {
    // Production - use environment variable or Render URL
    if (process.env.NODE_ENV === 'production') {
        // Replace with your actual Render backend URL
        return process.env.REACT_APP_API_URL || 'https://inspired-website-v3-fhno.onrender.com/api';
    }
    
    // Development - local or Codespaces
    if (typeof window !== 'undefined') {
        // GitHub Codespaces
        if (window.location.hostname.includes('app.github.dev')) {
            const hostname = window.location.hostname;
            if (hostname.includes('-3000.')) {
                return `https://${hostname.replace('-3000.', '-5000.')}/api`;
            }
            return `https://${hostname.replace(':3000', ':5000')}/api`;
        }
        
        // Local development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:5000/api';
        }
    }
    
    // Fallback
    return 'http://localhost:5000/api';
};

const API_URL = getApiBaseUrl();
console.log(`🔌 API URL (${process.env.NODE_ENV || 'development'}):`, API_URL);

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 30000,
    withCredentials: true,
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
        
        console.log(`📤 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        console.error('❌ Request interceptor error:', error);
        return Promise.reject(error);
    }
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
            // Server responded with error
            console.error(`❌ API Error: ${error.response.status} ${error.response.config?.url}`);
            console.error('   Data:', error.response.data);
            
            // Handle 401 Unauthorized
            if (error.response.status === 401) {
                console.warn('⚠️ Unauthorized - clearing token');
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
                // Redirect to login if not already there
                if (window.location.pathname !== '/admin/login') {
                    window.location.href = '/admin/login';
                }
            }
        } else if (error.request) {
            // Request made but no response received
            console.error(`❌ No response from: ${error.config?.baseURL}${error.config?.url}`);
            console.error('   Check if backend is running at:', API_URL);
        } else {
            // Request setup error
            console.error('❌ Request error:', error.message);
        }
        
        return Promise.reject(error);
    }
);

// ============================================
// PUBLIC API METHODS
// ============================================
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
    },
    test: () => {
        console.log('🔍 Testing API connection...');
        return api.get('/test');
    }
};

// ============================================
// ADMIN API METHODS
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
    updateContent: (id, value, table, originalId, originalKey) => {
        console.log(`📝 Updating content ${id}...`);
        return api.put(`/admin/content/${id}`, { 
            value, 
            table, 
            originalId, 
            originalKey 
        });
    },
    health: () => {
        console.log('❤️ Health check...');
        return api.get('/health');
    }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const checkBackend = async () => {
    try {
        const response = await api.get('/test', { timeout: 5000 });
        return response.status === 200;
    } catch (error) {
        console.error('❌ Backend check failed:', error.message);
        return false;
    }
};

export const getApiUrl = () => API_URL;

export const getErrorMessage = (error) => {
    if (error.response) {
        return error.response.data?.message || 
               error.response.data?.error || 
               `Server error (${error.response.status})`;
    } else if (error.request) {
        return `Cannot connect to backend at ${API_URL}. Please ensure the server is running.`;
    } else {
        return error.message || 'An unexpected error occurred';
    }
};

export default api;
