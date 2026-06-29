import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { adminApi } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPage, setSelectedPage] = useState('home');
    const [editingContent, setEditingContent] = useState({});
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const pages = [
        { id: 'home', label: ' Home', icon: '🏠' },
        { id: 'about', label: 'ℹ About', icon: 'ℹ️' },
        { id: 'services', label: ' Services', icon: '💼' },
        { id: 'career-lab', label: ' Career Lab', icon: '🎓' },
        { id: 'contact', label: ' Contact', icon: '📧' }
    ];

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await adminApi.getContent();
            if (response.data.success) {
                setContent(response.data.data);
                const initialEdit = {};
                response.data.data.forEach(item => {
                    initialEdit[item.id] = item.value;
                });
                setEditingContent(initialEdit);
            }
        } catch (error) {
            console.error('Error fetching content:', error);
            showMessage('❌ Error loading content', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleContentChange = (id, value) => {
        setEditingContent(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const showMessage = (msg, type = 'success') => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 4000);
    };

    const handleSaveAll = async () => {
        setSaving(true);
        
        try {
            const updates = [];
            content.forEach(item => {
                if (editingContent[item.id] !== item.value) {
                    updates.push({
                        id: item.id,
                        value: editingContent[item.id]
                    });
                }
            });

            if (updates.length === 0) {
                showMessage('No changes to save', 'info');
                setSaving(false);
                return;
            }

            for (const update of updates) {
                await adminApi.updateContent(update.id, update.value);
            }

            showMessage('✅ All changes saved successfully!', 'success');
            await fetchContent();
        } catch (error) {
            showMessage('❌ Error saving changes', 'error');
            console.error('Save error:', error);
        } finally {
            setSaving(false);
        }
    };

    const getPageContent = () => {
        return content.filter(item => item.page === selectedPage);
    };

    const pageContent = getPageContent();

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading content...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>Insp<span>Hired</span></h2>
                    <div className="admin-profile">
                        <div className="admin-avatar">👤</div>
                        <div className="admin-info">
                            <p className="admin-name">{user?.name || 'Admin'}</p>
                            <p className="admin-role">{user?.role || 'Administrator'}</p>
                        </div>
                    </div>
                </div>
                
                <nav className="sidebar-nav">
                    {pages.map(page => (
                        <button
                            key={page.id}
                            className={`nav-btn ${selectedPage === page.id ? 'active' : ''}`}
                            onClick={() => setSelectedPage(page.id)}
                        >
                            <span className="nav-icon">{page.icon}</span>
                            {page.label}
                        </button>
                    ))}
                </nav>
                
                <div className="sidebar-footer">
                    <button onClick={logout} className="logout-btn">
                        🚪 Logout
                    </button>
                </div>
            </aside>
            
            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="header-left">
                        <h1>
                            {pages.find(p => p.id === selectedPage)?.label || selectedPage}
                        </h1>
                        <span className="content-count">
                            {pageContent.length} sections
                        </span>
                    </div>
                    <div className="header-actions">
                        <button 
                            onClick={handleSaveAll} 
                            className="save-btn"
                            disabled={saving}
                        >
                            {saving ? '💾 Saving...' : '💾 Save All Changes'}
                        </button>
                    </div>
                </header>
                
                {message && (
                    <div className={`message-banner ${messageType}`}>
                        {message}
                    </div>
                )}
                
                <div className="dashboard-content">
                    {pageContent.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">📝</span>
                            <h3>No Content Found</h3>
                            <p>This page doesn't have any content yet. Add some content in the database.</p>
                        </div>
                    ) : (
                        <div className="content-editor">
                            {pageContent.map(item => (
                                <div key={item.id} className="editor-item">
                                    <label className="editor-label">
                                        <span className="label-icon">
                                            {item.section.includes('title') ? '📌' :
                                             item.section.includes('description') ? '📝' :
                                             item.section.includes('email') ? '📧' :
                                             item.section.includes('phone') ? '📞' :
                                             item.section.includes('address') ? '📍' :
                                             item.section.includes('image') ? '🖼️' :
                                             '✏️'}
                                        </span>
                                        {item.section.replace(/-/g, ' ').toUpperCase()}
                                    </label>
                                    <div className="editor-input-wrapper">
                                        {item.value && item.value.length > 150 ? (
                                            <textarea
                                                className="editor-textarea"
                                                value={editingContent[item.id] || ''}
                                                onChange={(e) => handleContentChange(item.id, e.target.value)}
                                                rows={4}
                                            />
                                        ) : (
                                            <input
                                                className="editor-input"
                                                type="text"
                                                value={editingContent[item.id] || ''}
                                                onChange={(e) => handleContentChange(item.id, e.target.value)}
                                            />
                                        )}
                                        <span className="char-count">
                                            {(editingContent[item.id] || '').length} characters
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;