// frontend/src/services/api.js

import axios from "axios";

// ============================================
// API URL CONFIGURATION
// ============================================

const getApiBaseUrl = () => {
    // Production
    if (process.env.NODE_ENV === "production") {
        return (
            process.env.REACT_APP_API_URL ||
            "https://inspired-website-v3-fhno.onrender.com/api"
        );
    }

    // Browser only
    if (typeof window !== "undefined") {
        const host = window.location.hostname;

        // GitHub Codespaces
        if (host.includes("app.github.dev")) {
            return `https://${host.replace("-3000.", "-5000.")}/api`;
        }

        // Localhost
        if (host === "localhost" || host === "127.0.0.1") {
            return "http://localhost:5000/api";
        }
    }

    // Fallback
    return "https://inspired-website-v3-fhno.onrender.com/api";
};

const API_URL = getApiBaseUrl();

console.log(`🔌 API URL (${process.env.NODE_ENV || "development"}): ${API_URL}`);

// ============================================
// AXIOS INSTANCE
// ============================================

const api = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

// ============================================
// REQUEST INTERCEPTOR
// ============================================

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("adminToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log(
            `📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
        );

        return config;
    },
    (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);

// ============================================
// RESPONSE INTERCEPTOR
// ============================================

api.interceptors.response.use(
    (response) => {
        console.log(
            `✅ ${response.config.url} (${response.status})`
        );

        return response;
    },
    (error) => {
        if (error.response) {
            console.error("API Error");

            console.error("Status:", error.response.status);
            console.error("URL:", error.config?.url);
            console.error("Data:", error.response.data);

            if (error.response.status === 401) {
                localStorage.removeItem("adminToken");
                localStorage.removeItem("adminUser");

                if (window.location.pathname !== "/admin/login") {
                    window.location.href = "/admin/login";
                }
            }
        } else if (error.request) {
            console.error("No response received from backend.");
            console.error("Backend URL:", API_URL);
        } else {
            console.error("Axios Error:", error.message);
        }

        return Promise.reject(error);
    }
);

// ============================================
// PUBLIC API
// ============================================

export const publicApi = {
    test: () => api.get("/test"),

    getPageContent: (page) => api.get(`/public/${page}`),

    getAllPages: () =>
        Promise.all([
            api.get("/public/home"),
            api.get("/public/about"),
            api.get("/public/contact"),
            api.get("/public/career-lab"),
            api.get("/public/employers"),
            api.get("/public/services")
        ])
};

// ============================================
// ADMIN API
// ============================================

export const adminApi = {
    login: (email, password) =>
        api.post("/admin/login", { email, password }),

    verify: () =>
        api.get("/admin/verify"),

    getContent: () =>
        api.get("/admin/content"),

    updateContent: (id, value, table, originalId, originalKey) =>
        api.put(`/admin/content/${id}`, {
            value,
            table,
            originalId,
            originalKey
        }),

    // Your backend doesn't have /health.
    // Reuse /test instead.
    health: () =>
        api.get("/test")
};

// ============================================
// HELPERS
// ============================================

export const checkBackend = async () => {
    try {
        const response = await api.get("/test");

        return response.status === 200;
    } catch (error) {
        console.error("Backend unavailable:", error.message);
        return false;
    }
};

export const getApiUrl = () => API_URL;

export const getErrorMessage = (error) => {
    if (error.response) {
        return (
            error.response.data?.message ||
            error.response.data?.error ||
            `Server Error (${error.response.status})`
        );
    }

    if (error.request) {
        return `Cannot connect to ${API_URL}`;
    }

    return error.message || "Unknown error";
};

export default api;
