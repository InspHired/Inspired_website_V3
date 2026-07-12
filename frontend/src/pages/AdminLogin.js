// frontend/src/pages/AdminLogin.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AdminLogin.css';

// ============================================
// PROFESSIONAL SVG ICONS
// ============================================
const Icons = {
    Logo: () => (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#509b9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-5"/>
        </svg>
    ),
    Email: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
        </svg>
    ),
    Password: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
    ),
    Loading: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
    ),
    Shield: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
        </svg>
    ),
    Dashboard: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
    ),
    Zap: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
    ),
    Warning: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 9v4M12 17h.01"/>
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        </svg>
    ),
    Check: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
    )
};

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [backendStatus, setBackendStatus] = useState('checking');
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        checkBackend();
    }, []);

    const checkBackend = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/test');
            if (response.ok) {
                setBackendStatus('online');
            } else {
                setBackendStatus('offline');
            }
        } catch (err) {
            setBackendStatus('offline');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);
        if (result.success) {
            navigate('/admin/dashboard');
        } else {
            setError(result.error || 'Login failed. Please check your credentials.');
        }
        setLoading(false);
    };

    return (
        <div className="login-page">
            <div className="login-background">
                <div className="login-bg-shape shape-1"></div>
                <div className="login-bg-shape shape-2"></div>
                <div className="login-bg-shape shape-3"></div>
                <div className="login-bg-shape shape-4"></div>
            </div>

            <div className="login-container">
                <div className="login-card">
                    <div className="login-brand">
                        <div className="login-logo">
                            <Icons.Logo />
                        </div>
                        <h1>Insp<span>Hired</span></h1>
                        <p className="login-subtitle">Content Management System</p>
                    </div>

                    {backendStatus === 'offline' && (
                        <div className="backend-warning">
                            <span className="warning-icon">
                                <Icons.Warning />
                            </span>
                            <span>Backend not running. Please start the server.</span>
                        </div>
                    )}
                    {backendStatus === 'online' && (
                        <div className="backend-status">
                            <span className="status-dot"></span>
                            <span>Connected to server</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>
                                <span className="label-icon">
                                    <Icons.Email />
                                </span>
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Username"
                                required
                                disabled={loading || backendStatus === 'offline'}
                                className="login-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="label-icon">
                                    <Icons.Password />
                                </span>
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                disabled={loading || backendStatus === 'offline'}
                                className="login-input"
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button 
                            type="submit" 
                            className="login-btn" 
                            disabled={loading || backendStatus === 'offline'}
                        >
                            {loading ? (
                                <span className="btn-loading">
                                    <span className="spinner"></span>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <div className="login-divider">
                            <span>Secure Admin Access</span>
                        </div>
                        <div className="login-credentials">
                        </div>
                    </div>
                </div>

                <div className="login-features">
                    <div className="feature-item">
                        <span className="feature-icon">
                            <Icons.Shield />
                        </span>
                        <span>Secure Authentication</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">
                            <Icons.Dashboard />
                        </span>
                        <span>Content Management</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">
                            <Icons.Zap />
                        </span>
                        <span>Real-time Updates</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;