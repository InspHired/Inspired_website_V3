import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { adminApi } from '../services/api';
import './AdminDashboard.css';

// Professional SVG Icons
const Icons = {
    Dashboard: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
    ),
    Home: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
    ),
    About: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
        </svg>
    ),
    Services: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
        </svg>
    ),
    Career: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 6V2M8 18l4 4 4-4M8 6l4-4 4 4"/>
            <rect x="4" y="10" width="16" height="12" rx="2"/>
        </svg>
    ),
    Contact: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
    ),
    Logout: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
    ),
    Save: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
        </svg>
    ),
    User: () => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    ),
    ChevronRight: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
        </svg>
    )
};

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPage, setSelectedPage] = useState('home');
    const [editingContent, setEditingContent] = useState({});
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const pages = [
        { id: 'home', label: 'Home', icon: Icons.Home },
        { id: 'about', label: 'About', icon: Icons.About },
        { id: 'services', label: 'Services', icon: Icons.Services },
        { id: 'career-lab', label: 'Career Lab', icon: Icons.Career },
        { id: 'contact', label: 'Contact', icon: Icons.Contact }
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
            showMessage('Error loading content', 'error');
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

            showMessage('All changes saved successfully!', 'success');
            await fetchContent();
        } catch (error) {
            showMessage('Error saving changes', 'error');
            console.error('Save error:', error);
        } finally {
            setSaving(false);
        }
    };

    const getPageContent = () => {
        return content.filter(item => item.page === selectedPage);
    };

    const pageContent = getPageContent();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

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
            <button className="mobile-toggle" onClick={toggleSidebar}>
                {sidebarOpen ? '✕' : '☰'}
            </button>

            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Insp<span>Hired</span></h2>
                    <div className="admin-profile">
                        <div className="admin-avatar">
                            <Icons.User />
                        </div>
                        <div className="admin-info">
                            <p className="admin-name">{user?.name || 'Admin'}</p>
                            <p className="admin-role">{user?.role || 'Administrator'}</p>
                        </div>
                    </div>
                </div>
                
                <nav className="sidebar-nav">
                    {pages.map(page => {
                        const IconComponent = page.icon;
                        return (
                            <button
                                key={page.id}
                                className={`nav-btn ${selectedPage === page.id ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedPage(page.id);
                                    setSidebarOpen(false);
                                }}
                            >
                                <span className="nav-icon">
                                    <IconComponent />
                                </span>
                                <span className="nav-label">{page.label}</span>
                            </button>
                        );
                    })}
                </nav>
                
                <div className="sidebar-footer">
                    <button onClick={logout} className="logout-btn">
                        <span className="logout-icon"><Icons.Logout /></span>
                        Logout
                    </button>
                </div>
            </aside>
            
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="header-left">
                        <span className="page-icon">
                            {pages.find(p => p.id === selectedPage)?.icon && 
                                React.createElement(pages.find(p => p.id === selectedPage).icon)}
                        </span>
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
                            <span className="save-icon"><Icons.Save /></span>
                            {saving ? 'Saving...' : 'Save All Changes'}
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
                                             item.section.includes('badge') ? '🏷️' :
                                             item.section.includes('mission') ? '🎯' :
                                             item.section.includes('vision') ? '👁️' :
                                             item.section.includes('values') ? '💎' :
                                             item.section.includes('service') ? '⚡' :
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