import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return user ? children : <Navigate to="/admin/login" replace />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {/* Redirect root to Admin Login */}
                        <Route
                            path="/"
                            element={<Navigate to="/admin/login" replace />}
                        />

                        {/* Optional: Public homepage (still accessible if needed) */}
                        <Route
                            path="/home"
                            element={<HomePage />}
                        />

                        {/* Admin Login */}
                        <Route
                            path="/admin/login"
                            element={<AdminLogin />}
                        />

                        {/* Protected Admin Dashboard */}
                        <Route
                            path="/admin/dashboard"
                            element={
                                <PrivateRoute>
                                    <AdminDashboard />
                                </PrivateRoute>
                            }
                        />

                        {/* Redirect all unknown routes to Admin Login */}
                        <Route
                            path="*"
                            element={<Navigate to="/admin/login" replace />}
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
