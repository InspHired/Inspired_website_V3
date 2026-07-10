import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { adminApi } from '../services/api';
import './AdminDashboard.css';

// 1. Professional Minimalist SVG Icon Set (Clean, Uniform Weight)
const DashboardIcons = {
    Hero: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
        </svg>
    ),
    Info: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
        </svg>
    ),
    Ecosystem: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    ),
    Team: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    Testimonials: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    ),
    Footer: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
        </svg>
    ),
    User: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
    )
};

// 2. Exact Sidebar Order - Matches your exact HomePage section lineup
const COMPONENTS = {
    'hero': { label: 'Hero Section', icon: <DashboardIcons.Hero /> },
    'info': { label: 'Info & Stats', icon: <DashboardIcons.Info /> },
    'ecosystem': { label: 'Ecosystem Section', icon: <DashboardIcons.Ecosystem /> },
    'team': { label: 'Team Members', icon: <DashboardIcons.Team /> },
    'testimonials': { label: 'Client Testimonials', icon: <DashboardIcons.Testimonials /> },
    'footer': { label: 'Footer Settings', icon: <DashboardIcons.Footer /> }
};

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [content, setContent] = useState([]);
    const [groupedContent, setGroupedContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [editingContent, setEditingContent] = useState({});
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [selectedComponent, setSelectedComponent] = useState('hero');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const response = await adminApi.getContent();
            let data = [];
            
            if (response && response.data) {
                if (response.data.data && Array.isArray(response.data.data)) {
                    data = response.data.data;
                } else if (Array.isArray(response.data)) {
                    data = response.data;
                }
            }

            // Normalizing sections gracefully
            const processedData = data.map(item => ({
                ...item,
                component: item.component || item.section || 'unknown'
            }));

            setContent(processedData);

            // Regroup matching database fields
            const grouped = {};
            processedData.forEach(item => {
                const comp = item.component;
                if (!grouped[comp]) grouped[comp] = [];
                grouped[comp].push(item);
            });
            setGroupedContent(grouped);

            // Setup state (auto-unpacks JSON card structures if it reads objects)
            const initialEdit = {};
            processedData.forEach(item => {
                try {
                    if (item.value && (item.value.startsWith('{') || item.value.startsWith('['))) {
                        initialEdit[item.id] = JSON.parse(item.value);
                    } else {
                        initialEdit[item.id] = item.value || '';
                    }
                } catch {
                    initialEdit[item.id] = item.value || '';
                }
            });
            setEditingContent(initialEdit);

        } catch (error) {
            console.error('Error tracking dashboard models:', error);
            showMessage('Error synchronizing dataset nodes', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleValueChange = (id, newValue, nestedKey = null) => {
        setEditingContent(prev => {
            if (nestedKey) {
                const updatedObj = typeof prev[id] === 'object' ? { ...prev[id] } : {};
                updatedObj[nestedKey] = newValue;
                return { ...prev, [id]: updatedObj };
            }
            return { ...prev, [id]: newValue };
        });
    };

    const showMessage = (msg, type = 'success') => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => { setMessage(''); setMessageType(''); }, 4000);
    };

    const handleSaveAll = async () => {
        setSaving(true);
        try {
            const updates = [];
            content.forEach(item => {
                let currentVal = editingContent[item.id];
                
                if (typeof currentVal === 'object' && currentVal !== null) {
                    currentVal = JSON.stringify(currentVal);
                }

                if (currentVal !== item.value) {
                    updates.push({ id: item.id, value: currentVal });
                }
            });

            if (updates.length === 0) {
                showMessage('No data adjustments to deploy', 'info');
                setSaving(false);
                return;
            }

            for (const update of updates) {
                await adminApi.updateContent(update.id, update.value);
            }

            showMessage('Changes updated successfully!', 'success');
            await fetchContent();
        } catch (error) {
            showMessage('Database commit sequence rejected', 'error');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const activeItems = groupedContent[selectedComponent] || [];

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Syncing content blocks...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <button className="mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? '✕' : '☰'}
            </button>

            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Insp<span>Hired</span></h2>
                    <div className="admin-profile">
                        <div className="admin-avatar"><DashboardIcons.User /></div>
                        <div className="admin-info">
                            <p className="admin-name">{user?.name || 'Admin'}</p>
                            <p className="admin-role">Content Hub Manager</p>
                        </div>
                    </div>
                </div>
                
                <nav className="sidebar-nav">
                    {Object.entries(COMPONENTS).map(([key, config]) => (
                        <button
                            key={key}
                            className={`nav-btn ${selectedComponent === key ? 'active' : ''}`}
                            onClick={() => { setSelectedComponent(key); setSidebarOpen(false); }}
                        >
                            <span className="nav-icon">{config.icon}</span>
                            <span className="nav-label">{config.label}</span>
                        </button>
                    ))}
                </nav>
                
                <div className="sidebar-footer">
                    <button onClick={logout} className="logout-btn">Logout</button>
                </div>
            </aside>
            
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="header-left">
                        <h1>{COMPONENTS[selectedComponent]?.label} Control Panel</h1>
                        <span className="content-count">{activeItems.length} Field Entity Node(s)</span>
                    </div>
                    <button onClick={handleSaveAll} className="save-btn" disabled={saving}>
                        {saving ? 'Publishing...' : 'Publish Changes'}
                    </button>
                </header>
                
                {message && <div className={`message-banner ${messageType}`}>{message}</div>}
                
                <div className="dashboard-content">
                    {activeItems.length === 0 ? (
                        <div className="empty-state">
                            <p>No database records match this section key yet.</p>
                            <span className="hint">We will re-align your tables next.</span>
                        </div>
                    ) : (
                        <div className="content-editor">
                            {activeItems.map(item => {
                                const stateValue = editingContent[item.id];
                                const isCardObject = typeof stateValue === 'object' && stateValue !== null;

                                return (
                                    <div key={item.id} className="editor-item">
                                        <div className="item-meta-header">
                                            <span className="field-type-badge">
                                                {isCardObject ? 'Unified Card Package' : 'Standard Field'}
                                            </span>
                                            <span className="field-system-id">{item.field?.toUpperCase().replace(/_/g, ' ')}</span>
                                        </div>

                                        {isCardObject ? (
                                            <div className="unified-editable-card">
                                                {Object.keys(stateValue).map(key => (
                                                    <div key={key} className="card-inner-row">
                                                        <label>{key.replace(/_/g, ' ').toUpperCase()}</label>
                                                        {stateValue[key]?.length > 140 ? (
                                                            <textarea
                                                                className="editor-textarea"
                                                                value={stateValue[key] || ''}
                                                                onChange={(e) => handleValueChange(item.id, e.target.value, key)}
                                                            />
                                                        ) : (
                                                            <input
                                                                className="editor-input"
                                                                type="text"
                                                                value={stateValue[key] || ''}
                                                                onChange={(e) => handleValueChange(item.id, e.target.value, key)}
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="editor-input-wrapper">
                                                {(stateValue?.length || 0) > 180 ? (
                                                    <textarea
                                                        className="editor-textarea"
                                                        value={stateValue || ''}
                                                        onChange={(e) => handleValueChange(item.id, e.target.value)}
                                                    />
                                                ) : (
                                                    <input
                                                        className="editor-input"
                                                        type="text"
                                                        value={stateValue || ''}
                                                        onChange={(e) => handleValueChange(item.id, e.target.value)}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;