import React, { createContext, useState, useContext, useEffect } from 'react';
import { adminApi } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        verifyToken();
    }, []);

    const verifyToken = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await adminApi.verify();
            if (response.data.success) {
                setUser(response.data.user);
            } else {
                localStorage.removeItem('adminToken');
            }
        } catch (err) {
            console.error('Token verification failed:', err);
            localStorage.removeItem('adminToken');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            const response = await adminApi.login(email, password);
            
            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                setUser(response.data.user);
                return { success: true };
            } else {
                setError(response.data.message || 'Login failed');
                return { success: false, error: response.data.message };
            }
        } catch (err) {
            console.error('Login error:', err);
            const errorMessage = err.response?.data?.message || 'Network error. Make sure backend is running.';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};