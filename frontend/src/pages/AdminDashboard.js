import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { adminApi } from '../services/api';
import './AdminDashboard.css';

// Premium SVG Icons System (Unified 2px stroke, crisp design)
const Icons = {
    Home: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
    ),
    About: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
    ),
    Services: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
        </svg>
    ),
    Career: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
        </svg>
    ),
    Contact: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
        </svg>
    ),
    Logout: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
    ),
    Save: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
        </svg>
    ),
    User: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    ),
    
    /* Clean Content-Type Indicators (Slightly thicker 2.5px stroke for micro-clarity) */
    TextSnippet: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
    ),
    Heading: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4v16M18 4v16M6 12h12"/>
        </svg>
    ),
    Phone: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
    ),
    MapPin: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
        </svg>
    ),
    Image: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
        </svg>
    ),
    Target: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
        </svg>
    )
};

// Helper function to dynamically pull context-relevant field icons
const getSectionIcon = (sectionName) => {
    const name = sectionName.toLowerCase();
    if (name.includes('title') || name.includes('badge')) return <Icons.Heading />;
    if (name.includes('email') || name.includes('description') || name.includes('values') || name.includes('content')) return <Icons.TextSnippet />;
    if (name.includes('phone')) return <Icons.Phone />;
    if (name.includes('address') || name.includes('location')) return <Icons.MapPin />;
    if (name.includes('image') || name.includes('logo') || name.includes('banner')) return <Icons.Image />;
    if (name.includes('mission') || name.includes('vision') || name.includes('target')) return <Icons.Target />;
    return <Icons.TextSnippet />;
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
        setEditingContent(prev => ({ ...prev, [id]: value }));
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
                    updates.push({ id: item.id, value: editingContent[item.id] });
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

    const pageContent = content.filter(item => item.page === selectedPage);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const activePageConfig = pages.find(p => p.id === selectedPage);

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
                            {activePageConfig && activePageConfig.icon && (
                                <activePageConfig.icon />
                            )}
                        </span>
                        <h1>{activePageConfig?.label || selectedPage}</h1>
                        <span className="content-count">{pageContent.length} sections</span>
                    </div>
                    <div className="header-actions">
                        <button onClick={handleSaveAll} className="save-btn" disabled={saving}>
                            <span className="save-icon"><Icons.Save /></span>
                            {saving ? 'Saving...' : 'Save All Changes'}
                        </button>
                    </div>
                </header>
                
                {message && <div className={`message-banner ${messageType}`}>{message}</div>}
                
                <div className="dashboard-content">
                    {pageContent.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">📝</span>
                            <h3>No Content Found</h3>
                            <p>This page doesn't have any content yet.</p>
                        </div>
                    ) : (
                        <div className="content-editor">
                            {pageContent.map(item => (
                                <div key={item.id} className="editor-item">
                                    <label className="editor-label">
                                        <span className="label-icon">
                                            {getSectionIcon(item.section)}
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