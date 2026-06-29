import React, { createContext, useState, useContext, useEffect } from 'react';
import { adminApi } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            verifyToken();
        } else {
            setLoading(false);
        }
    }, []);

    const verifyToken = async () => {
        try {
            const response = await adminApi.verify();
            if (response.data.success) {
                setUser(response.data.user);
            } else {
                localStorage.removeItem('adminToken');
            }
        } catch (error) {
            console.error('Token verification failed:', error);
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
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
            return { success: false, error: error.response?.data?.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};