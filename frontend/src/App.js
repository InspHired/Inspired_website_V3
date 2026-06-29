import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) return <div>Loading...</div>;
    
    return user ? children : <Navigate to="/admin/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<HomePage />} />
                        
                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/dashboard" element={
                            <PrivateRoute>
                                <AdminDashboard />
                            </PrivateRoute>
                        } />
                        
                        {/* Catch all */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;