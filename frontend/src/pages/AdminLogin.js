import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);
        if (result.success) {
            navigate('/admin/dashboard');
        } else {
            setError(result.error || 'Login failed');
        }
        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <h1>Insp<span>Hired</span></h1>
                    <p>Admin Panel</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@insp-hired.com"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                
                <div className="login-footer">
                    <p>Secure Admin Access</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;