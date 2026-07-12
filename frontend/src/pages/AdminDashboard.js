// frontend/src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { adminApi } from '../services/api';
import './AdminDashboard.css';

// ============================================
// PROFESSIONAL SVG ICON SYSTEM
// ============================================
const Icons = {
    // Navigation Icons
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
    Contact: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
        </svg>
    ),
    Career: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
    ),
    Employers: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M12 2v5"/>
            <path d="M8 4l4 3 4-3"/>
        </svg>
    ),
    Services: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
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
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    ),
    Menu: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
    ),
    Close: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
    ),

    // Section Icons
    Hero: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
    ),
    Info: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
    ),
    Steps: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
    ),
    Ecosystem: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.04.04A10 10 0 0 0 12 20a10 10 0 0 0 7.36-3.04l.04-.04z"/>
            <path d="M4.6 9a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1h12.44a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.04-.04A10 10 0 0 0 12 4a10 10 0 0 0-7.36 3.04l-.04.04z"/>
        </svg>
    ),
    Team: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
    ),
    Testimonials: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
    ),
    Footer: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="3" y1="15" x2="21" y2="15"/>
        </svg>
    ),
    Mission: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
        </svg>
    ),
    Story: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
    ),
    Timeline: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
        </svg>
    ),
    Values: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
    ),
    Subscribe: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
        </svg>
    ),
    ServicesDropdown: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
            <line x1="8" y1="2" x2="8" y2="22"/>
            <line x1="16" y1="2" x2="16" y2="22"/>
            <line x1="2" y1="8" x2="22" y2="8"/>
            <line x1="2" y1="16" x2="22" y2="16"/>
        </svg>
    ),
    Time: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
        </svg>
    ),
    Placeholder: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
        </svg>
    ),
    Success: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
    ),
    Tracks: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12h4l2-5 4 13 2-8 4 4h4"/>
        </svg>
    ),
    Modules: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
            <line x1="6" y1="6" x2="6.01" y2="6"/>
            <line x1="6" y1="18" x2="6.01" y2="18"/>
        </svg>
    ),
    Differentiation: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 3h5v5"/>
            <path d="M21 3l-6.5 6.5"/>
            <path d="M8 21H3v-5"/>
            <path d="M3 21l6.5-6.5"/>
            <path d="M12 8v8"/>
            <path d="M8 12h8"/>
        </svg>
    ),
    Process: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
        </svg>
    ),
    Quote: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
    ),
    Verification: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
        </svg>
    ),
    FinalCta: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 16 16 12 12 8"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
    ),
    Offerings: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
    ),
    Screening: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <circle cx="11" cy="11" r="3"/>
        </svg>
    ),
    Skills: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
        </svg>
    )
};

// ============================================
// ENHANCED COLOR CONFIGURATION
// ============================================

// Predefined color options with friendly names
const PREDEFINED_COLORS = [
    // Brand Colors
    { value: 'var(--teal)', label: 'Teal', hex: '#509b9e', category: 'Brand Colors' },
    { value: 'var(--orange)', label: 'Orange', hex: '#d96b43', category: 'Brand Colors' },
    { value: 'var(--yellow)', label: 'Yellow', hex: '#e4af51', category: 'Brand Colors' },
    { value: 'var(--navy)', label: 'Navy', hex: '#1f3540', category: 'Brand Colors' },
    // Hex Colors
    { value: '#509b9e', label: 'Teal (Hex)', hex: '#509b9e', category: 'Common Colors' },
    { value: '#d96b43', label: 'Orange (Hex)', hex: '#d96b43', category: 'Common Colors' },
    { value: '#e4af51', label: 'Yellow (Hex)', hex: '#e4af51', category: 'Common Colors' },
    { value: '#1f3540', label: 'Navy (Hex)', hex: '#1f3540', category: 'Common Colors' },
    { value: '#2ecc71', label: 'Emerald', hex: '#2ecc71', category: 'Common Colors' },
    { value: '#3498db', label: 'Blue', hex: '#3498db', category: 'Common Colors' },
    { value: '#9b59b6', label: 'Purple', hex: '#9b59b6', category: 'Common Colors' },
    { value: '#e74c3c', label: 'Red', hex: '#e74c3c', category: 'Common Colors' },
    { value: '#f39c12', label: 'Gold', hex: '#f39c12', category: 'Common Colors' },
    { value: '#1abc9c', label: 'Turquoise', hex: '#1abc9c', category: 'Common Colors' },
    { value: '#34495e', label: 'Dark Blue', hex: '#34495e', category: 'Common Colors' },
    { value: '#e67e22', label: 'Orange', hex: '#e67e22', category: 'Common Colors' },
    { value: '#2c3e50', label: 'Dark Navy', hex: '#2c3e50', category: 'Common Colors' },
    { value: '#27ae60', label: 'Green', hex: '#27ae60', category: 'Common Colors' },
    { value: '#2980b9', label: 'Light Blue', hex: '#2980b9', category: 'Common Colors' },
    { value: '#8e44ad', label: 'Deep Purple', hex: '#8e44ad', category: 'Common Colors' },
    { value: '#d35400', label: 'Dark Orange', hex: '#d35400', category: 'Common Colors' },
    { value: '#c0392b', label: 'Dark Red', hex: '#c0392b', category: 'Common Colors' },
    { value: '#16a085', label: 'Dark Turquoise', hex: '#16a085', category: 'Common Colors' }
];

// Helper function to get color display name
const getColorDisplay = (colorValue) => {
    if (!colorValue) return 'Select color';
    
    // Check predefined colors
    const matched = PREDEFINED_COLORS.find(c => c.value === colorValue);
    if (matched) return matched.label;
    
    // Check if it's a var() color
    if (colorValue.startsWith('var(--')) {
        const name = colorValue.replace('var(--', '').replace(')', '');
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    // Check if it's a hex color
    if (colorValue.startsWith('#')) {
        return colorValue.toUpperCase();
    }
    
    return colorValue;
};

// Helper function to get color hex
const getColorHex = (colorValue) => {
    if (!colorValue) return '#7a8790';
    
    // Check predefined colors
    const matched = PREDEFINED_COLORS.find(c => c.value === colorValue);
    if (matched) return matched.hex;
    
    // Check if it's a var() color
    if (colorValue.startsWith('var(--')) {
        const name = colorValue.replace('var(--', '').replace(')', '');
        const colorMap = {
            'teal': '#509b9e',
            'orange': '#d96b43',
            'yellow': '#e4af51',
            'navy': '#1f3540'
        };
        return colorMap[name] || '#7a8790';
    }
    
    // Check if it's a hex color
    if (colorValue.startsWith('#')) {
        return colorValue;
    }
    
    return '#7a8790';
};

// Helper function to detect if a value is a color field
const isColorField = (field) => {
    if (!field) return false;
    const colorFields = ['color', 'accent_color', 'accent', 'color_value', 'bg_color', 'text_color', 'accent_color_value'];
    return colorFields.some(cf => field.includes(cf) || field === cf);
};

// ============================================
// COMPONENT CONFIGURATION
// ============================================
const COMPONENTS = {
    'home': { 
        label: 'Home', 
        icon: Icons.Home, 
        color: '#509b9e' 
    },
    'about': { 
        label: 'About', 
        icon: Icons.About, 
        color: '#509b9e' 
    },
    'contact': { 
        label: 'Contact', 
        icon: Icons.Contact, 
        color: '#509b9e' 
    },
    'career-lab': { 
        label: 'Career Lab', 
        icon: Icons.Career, 
        color: '#d96b43' 
    },
    'employers': { 
        label: 'For Employers', 
        icon: Icons.Employers, 
        color: '#1f3540' 
    },
    'services': { 
        label: 'Services', 
        icon: Icons.Services, 
        color: '#e4af51' 
    }
};

// Section display names with professional icons
const SECTION_CONFIG = {
    'hero': { 
        label: 'Hero Section', 
        icon: Icons.Hero, 
        description: 'Main banner content' 
    },
    'info': { 
        label: 'About Info', 
        icon: Icons.Info, 
        description: 'Who we are section' 
    },
    'steps': { 
        label: 'Recruitment Steps', 
        icon: Icons.Steps, 
        description: 'Process steps' 
    },
    'ecosystem': { 
        label: 'Ecosystem Platforms', 
        icon: Icons.Ecosystem, 
        description: 'Our platforms' 
    },
    'team': { 
        label: 'Team Members', 
        icon: Icons.Team, 
        description: 'Our people' 
    },
    'testimonials': { 
        label: 'Testimonials', 
        icon: Icons.Testimonials, 
        description: 'Client feedback' 
    },
    'footer': { 
        label: 'Footer', 
        icon: Icons.Footer, 
        description: 'Site footer' 
    },
    'mission-vision': { 
        label: 'Mission & Vision', 
        icon: Icons.Mission, 
        description: 'Our purpose' 
    },
    'story': { 
        label: 'Our Story', 
        icon: Icons.Story, 
        description: 'Company history' 
    },
    'timeline': { 
        label: 'Timeline', 
        icon: Icons.Timeline, 
        description: 'Key milestones' 
    },
    'values': { 
        label: 'Core Values', 
        icon: Icons.Values, 
        description: 'What we believe' 
    },
    'subscribe': { 
        label: 'Subscribe Section', 
        icon: Icons.Subscribe, 
        description: 'Email signup' 
    },
    'services-dropdown': { 
        label: 'Service Options', 
        icon: Icons.ServicesDropdown, 
        description: 'Dropdown options' 
    },
    'time-preferences': { 
        label: 'Time Preferences', 
        icon: Icons.Time, 
        description: 'Contact times' 
    },
    'placeholders': { 
        label: 'Form Placeholders', 
        icon: Icons.Placeholder, 
        description: 'Form labels' 
    },
    'success-message': { 
        label: 'Success Message', 
        icon: Icons.Success, 
        description: 'Thank you message' 
    },
    'tracks': { 
        label: 'Career Tracks', 
        icon: Icons.Tracks, 
        description: 'Program tracks' 
    },
    'modules': { 
        label: 'Curriculum Modules', 
        icon: Icons.Modules, 
        description: 'Course content' 
    },
    'differentiation': { 
        label: 'Differentiation', 
        icon: Icons.Differentiation, 
        description: 'What makes us different' 
    },
    'process': { 
        label: 'Process Steps', 
        icon: Icons.Process, 
        description: 'Recruitment process' 
    },
    'quote': { 
        label: 'Featured Quote', 
        icon: Icons.Quote, 
        description: 'Inspirational quote' 
    },
    'verification': { 
        label: 'Verification Services', 
        icon: Icons.Verification, 
        description: 'Background checks' 
    },
    'final-cta': { 
        label: 'Final CTA', 
        icon: Icons.FinalCta, 
        description: 'Call to action' 
    },
    'offerings': { 
        label: 'Service Offerings', 
        icon: Icons.Offerings, 
        description: 'Our services' 
    },
    'screening': { 
        label: 'Screening Services', 
        icon: Icons.Screening, 
        description: 'Verification items' 
    },
    'skills-training': { 
        label: 'Skills Training', 
        icon: Icons.Skills, 
        description: 'Training section' 
    }
};

// ============================================
// COLOR PICKER COMPONENT
// ============================================
const ColorPicker = ({ value, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [customColor, setCustomColor] = useState('');
    const [colorInput, setColorInput] = useState('');
    const [activeTab, setActiveTab] = useState('predefined');

    const handleColorSelect = (colorValue) => {
        onChange(colorValue);
        setIsOpen(false);
    };

    const handleCustomColor = (e) => {
        const color = e.target.value;
        setCustomColor(color);
        onChange(color);
    };

    const handleHexInput = (e) => {
        const color = e.target.value;
        setColorInput(color);
        if (color.match(/^#[0-9a-fA-F]{6}$/)) {
            onChange(color);
        }
    };

    const handleColorNameInput = (e) => {
        const name = e.target.value.toLowerCase();
        setColorInput(name);
        const matched = PREDEFINED_COLORS.find(c => 
            c.label.toLowerCase() === name || 
            c.value.toLowerCase() === `var(--${name})`
        );
        if (matched) {
            onChange(matched.value);
        } else if (name) {
            onChange(`var(--${name})`);
        }
    };

    const applyCustomColor = () => {
        if (customColor) {
            onChange(customColor);
            setIsOpen(false);
        }
        if (colorInput) {
            onChange(colorInput);
            setIsOpen(false);
        }
    };

    const currentHex = getColorHex(value);
    const currentLabel = getColorDisplay(value);

    // Group colors by category
    const groupedColors = PREDEFINED_COLORS.reduce((acc, color) => {
        if (!acc[color.category]) acc[color.category] = [];
        acc[color.category].push(color);
        return acc;
    }, {});

    return (
        <div className="color-picker-wrapper">
            <div className="color-picker-trigger" onClick={() => setIsOpen(!isOpen)}>
                <div 
                    className="color-swatch" 
                    style={{ backgroundColor: currentHex }}
                />
                <span className="color-label">{currentLabel}</span>
                <span className="color-arrow">{isOpen ? '▲' : '▼'}</span>
            </div>

            {isOpen && (
                <div className="color-picker-dropdown">
                    <div className="color-picker-tabs">
                        <button 
                            className={`color-tab ${activeTab === 'predefined' ? 'active' : ''}`}
                            onClick={() => setActiveTab('predefined')}
                        >
                            🎨 Presets
                        </button>
                        <button 
                            className={`color-tab ${activeTab === 'custom' ? 'active' : ''}`}
                            onClick={() => setActiveTab('custom')}
                        >
                            ✏️ Custom
                        </button>
                        <button 
                            className={`color-tab ${activeTab === 'hex' ? 'active' : ''}`}
                            onClick={() => setActiveTab('hex')}
                        >
                            # Hex
                        </button>
                    </div>

                    {/* PRESET COLORS */}
                    {activeTab === 'predefined' && (
                        <div className="color-picker-options">
                            {Object.entries(groupedColors).map(([category, colors]) => (
                                <div key={category} className="color-category">
                                    <div className="color-category-label">{category}</div>
                                    <div className="color-category-grid">
                                        {colors.map((option) => (
                                            <div
                                                key={option.value}
                                                className={`color-option ${value === option.value ? 'selected' : ''}`}
                                                onClick={() => handleColorSelect(option.value)}
                                            >
                                                <div 
                                                    className="color-option-swatch" 
                                                    style={{ backgroundColor: option.hex }}
                                                />
                                                <div className="color-option-info">
                                                    <span className="color-option-label">{option.label}</span>
                                                    <span className="color-option-hex">{option.hex}</span>
                                                </div>
                                                {value === option.value && (
                                                    <span className="color-option-check">✓</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* CUSTOM COLOR PICKER */}
                    {activeTab === 'custom' && (
                        <div className="color-picker-custom-section">
                            <div className="color-picker-custom-preview">
                                <div 
                                    className="color-picker-custom-swatch"
                                    style={{ backgroundColor: customColor || currentHex }}
                                />
                                <span className="color-picker-custom-label">
                                    {customColor ? getColorDisplay(customColor) : 'Pick a color'}
                                </span>
                            </div>

                            <div className="color-picker-custom-inputs">
                                <div className="color-picker-custom-row">
                                    <label>Color Picker</label>
                                    <input
                                        type="color"
                                        value={customColor || currentHex}
                                        onChange={handleCustomColor}
                                        className="color-picker-input-large"
                                    />
                                </div>

                                <div className="color-picker-custom-row">
                                    <label>Or enter color name</label>
                                    <input
                                        type="text"
                                        placeholder="teal, orange, navy, etc."
                                        value={colorInput}
                                        onChange={handleColorNameInput}
                                        className="color-picker-text-input"
                                    />
                                </div>

                                <div className="color-picker-custom-hint">
                                    <span>💡 Available names: teal, orange, yellow, navy, blue, red, purple, emerald, gold, turquoise</span>
                                </div>
                            </div>

                            <button 
                                className="color-picker-apply-btn"
                                onClick={applyCustomColor}
                            >
                                Apply Custom Color
                            </button>
                        </div>
                    )}

                    {/* HEX COLOR INPUT */}
                    {activeTab === 'hex' && (
                        <div className="color-picker-hex-section">
                            <div className="color-picker-hex-preview">
                                <div 
                                    className="color-picker-hex-swatch"
                                    style={{ backgroundColor: currentHex }}
                                />
                                <span className="color-picker-hex-label">
                                    {currentHex}
                                </span>
                            </div>

                            <div className="color-picker-hex-inputs">
                                <div className="color-picker-hex-row">
                                    <label>Enter Hex Code</label>
                                    <input
                                        type="text"
                                        placeholder="#FF5733"
                                        value={colorInput || value || ''}
                                        onChange={handleHexInput}
                                        className="color-picker-text-input"
                                    />
                                </div>

                                <div className="color-picker-hex-row">
                                    <label>Or use color picker</label>
                                    <input
                                        type="color"
                                        value={value || '#509b9e'}
                                        onChange={(e) => {
                                            const hex = e.target.value;
                                            setColorInput(hex);
                                            onChange(hex);
                                        }}
                                        className="color-picker-input-large"
                                    />
                                </div>

                                <div className="color-picker-hex-hint">
                                    <span>💡 Enter any valid hex color: #FF0000 (red), #00FF00 (green), #0000FF (blue)</span>
                                </div>
                            </div>

                            <button 
                                className="color-picker-apply-btn"
                                onClick={applyCustomColor}
                            >
                                Apply Hex Color
                            </button>
                        </div>
                    )}

                    <div className="color-picker-current">
                        <span>Current Color: </span>
                        <span 
                            className="color-picker-current-swatch"
                            style={{ backgroundColor: currentHex }}
                        />
                        <span className="color-picker-current-value">{value || 'None'}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

// ============================================
// ADMIN DASHBOARD COMPONENT
// ============================================
const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [content, setContent] = useState([]);
    const [groupedContent, setGroupedContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [editingContent, setEditingContent] = useState({});
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [selectedComponent, setSelectedComponent] = useState('home');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedJson, setExpandedJson] = useState({});

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const response = await adminApi.getContent();
            console.log('🔍 Full API Response:', response);
            
            if (response && response.data && response.data.data) {
                const data = response.data.data;
                console.log('📊 Data length:', data.length);
                
                setContent(data);
                
                const grouped = {};
                data.forEach(item => {
                    const page = item.page || 'unknown';
                    if (!grouped[page]) {
                        grouped[page] = [];
                    }
                    grouped[page].push(item);
                });
                console.log('📊 Grouped by page:', Object.keys(grouped));
                setGroupedContent(grouped);

                const initialEdit = {};
                data.forEach(item => {
                    initialEdit[item.id] = item.value || '';
                });
                setEditingContent(initialEdit);
            }
        } catch (error) {
            console.error('❌ Error fetching content:', error);
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
                    updates.push({
                        id: item.id,
                        value: editingContent[item.id],
                        table: item.table,
                        originalId: item.originalId,
                        originalKey: item.originalKey
                    });
                }
            });

            if (updates.length === 0) {
                showMessage('No changes to save', 'info');
                setSaving(false);
                return;
            }

            showMessage(`Saving ${updates.length} changes...`, 'info');

            for (const update of updates) {
                await adminApi.updateContent(
                    update.id,
                    update.value,
                    update.table,
                    update.originalId,
                    update.originalKey
                );
            }

            showMessage(`✅ ${updates.length} changes saved successfully!`, 'success');
            await fetchContent();
        } catch (error) {
            showMessage('❌ Error saving changes', 'error');
            console.error('Save error:', error);
        } finally {
            setSaving(false);
        }
    };

    const getPageContent = (page) => {
        return groupedContent[page] || [];
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const toggleJsonExpand = (id) => {
        setExpandedJson(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const getFieldLabel = (field) => {
        if (!field) return 'Value';
        return field
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .toUpperCase();
    };

    const getSectionLabel = (section) => {
        if (!section) return 'Unknown';
        return section
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .toUpperCase();
    };

    const parseJsonValue = (value) => {
        try {
            return typeof value === 'string' ? JSON.parse(value) : value;
        } catch (e) {
            return null;
        }
    };

    const formatJsonForDisplay = (value) => {
        try {
            const parsed = typeof value === 'string' ? JSON.parse(value) : value;
            return JSON.stringify(parsed, null, 2);
        } catch (e) {
            return value;
        }
    };

    // Helper to render field value based on type
    const renderField = (item) => {
        const value = editingContent[item.id] || '';
        const isExpanded = expandedJson[item.id] || false;
        
        // Check if this is a color field
        if (isColorField(item.field)) {
            return (
                <div className="color-field-wrapper">
                    <ColorPicker 
                        value={value}
                        onChange={(newValue) => handleContentChange(item.id, newValue)}
                        label={getFieldLabel(item.field)}
                    />
                    <div className="color-field-help">
                        <span className="color-preview-text">
                            Current: <span className="color-name">{getColorDisplay(value)}</span>
                        </span>
                        {value && (
                            <div 
                                className="color-preview-dot" 
                                style={{ backgroundColor: getColorHex(value) }}
                            />
                        )}
                    </div>
                </div>
            );
        }
        
        if (item.type === 'json') {
            const parsed = parseJsonValue(value);
            
            if (!isExpanded) {
                // Collapsed view - show key-value pairs
                return (
                    <div className="json-preview" onClick={() => toggleJsonExpand(item.id)}>
                        <div className="json-preview-content">
                            {parsed ? (
                                <div className="json-preview-grid">
                                    {Object.entries(parsed).map(([key, val]) => {
                                        // Check if this is a color value
                                        const isColor = typeof val === 'string' && 
                                            (val.startsWith('var(--') || val.startsWith('#'));
                                        
                                        if (Array.isArray(val) && val.length > 3) {
                                            return (
                                                <div key={key} className="json-field-item">
                                                    <span className="json-field-label">{key}:</span>
                                                    <span className="json-field-value">
                                                        {val.length} items
                                                        <span className="json-array-badge">Array</span>
                                                    </span>
                                                </div>
                                            );
                                        }
                                        
                                        if (isColor && isColorField(key)) {
                                            return (
                                                <div key={key} className="json-field-item color-highlight">
                                                    <span className="json-field-label">{key}:</span>
                                                    <span className="json-field-value">
                                                        <span 
                                                            className="color-preview-dot" 
                                                            style={{ backgroundColor: getColorHex(val) }}
                                                        />
                                                        {getColorDisplay(val)}
                                                    </span>
                                                </div>
                                            );
                                        }
                                        
                                        return (
                                            <div key={key} className="json-field-item">
                                                <span className="json-field-label">{key}:</span>
                                                <span className="json-field-value">
                                                    {typeof val === 'object' && val !== null 
                                                        ? JSON.stringify(val).substring(0, 40) + (JSON.stringify(val).length > 40 ? '...' : '')
                                                        : String(val)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <span className="json-invalid">Invalid JSON format</span>
                            )}
                        </div>
                        <span className="json-click-hint">Click to edit</span>
                    </div>
                );
            } else {
                // Expanded view - full JSON editor
                return (
                    <div className="json-editor">
                        <div className="json-controls">
                            <button 
                                type="button" 
                                className="json-toggle-btn"
                                onClick={() => toggleJsonExpand(item.id)}
                            >
                                📦 Collapse
                            </button>
                            <span className="json-fields-count">
                                {parsed ? Object.keys(parsed).length : 0} fields
                            </span>
                        </div>
                        <div className="json-editor-help">
                            <span>💡 For colors, use: var(--teal), var(--orange), var(--yellow), var(--navy) or any hex color like #FF5733</span>
                        </div>
                        <textarea
                            className="editor-textarea json-textarea"
                            value={formatJsonForDisplay(value)}
                            onChange={(e) => {
                                try {
                                    JSON.parse(e.target.value);
                                    handleContentChange(item.id, e.target.value);
                                } catch (err) {
                                    handleContentChange(item.id, e.target.value);
                                }
                            }}
                            rows={Math.max(6, (formatJsonForDisplay(value)?.split('\n').length || 6) + 2)}
                            spellCheck={false}
                        />
                    </div>
                );
            }
        } else if (item.type === 'image' || item.field?.includes('image') || item.field?.includes('url')) {
            return (
                <div className="image-field">
                    {value && (
                        <div className="image-preview">
                            <img 
                                src={value} 
                                alt="Preview" 
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <button 
                                className="remove-image-btn"
                                onClick={() => handleContentChange(item.id, '')}
                            >
                                ✕
                            </button>
                        </div>
                    )}
                    <input
                        className="editor-input"
                        type="text"
                        value={value}
                        onChange={(e) => handleContentChange(item.id, e.target.value)}
                        placeholder="Enter image URL"
                    />
                </div>
            );
        } else if (value && value.length > 200) {
            return (
                <textarea
                    className="editor-textarea"
                    value={value}
                    onChange={(e) => handleContentChange(item.id, e.target.value)}
                    rows={4}
                />
            );
        } else {
            return (
                <input
                    className="editor-input"
                    type="text"
                    value={value}
                    onChange={(e) => handleContentChange(item.id, e.target.value)}
                    placeholder={`Enter ${getFieldLabel(item.field)}`}
                />
            );
        }
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
                {sidebarOpen ? <Icons.Close /> : <Icons.Menu />}
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
                            <p className="admin-role">Content Manager</p>
                        </div>
                    </div>
                </div>
                
                <nav className="sidebar-nav">
                    {Object.entries(COMPONENTS).map(([key, config]) => {
                        const IconComponent = config.icon;
                        return (
                            <button
                                key={key}
                                className={`nav-btn ${selectedComponent === key ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedComponent(key);
                                    setSidebarOpen(false);
                                }}
                            >
                                <span className="nav-icon">
                                    <IconComponent />
                                </span>
                                <span className="nav-label">{config.label}</span>
                                <span className="nav-count">
                                    {getPageContent(key).length}
                                </span>
                            </button>
                        );
                    })}
                </nav>
                
                <div className="sidebar-footer">
                    <button onClick={logout} className="logout-btn">
                        <span className="logout-icon">
                            <Icons.Logout />
                        </span>
                        Logout
                    </button>
                </div>
            </aside>
            
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="header-left">
                        <h1>{COMPONENTS[selectedComponent]?.label}</h1>
                        <span className="content-count">
                            {getPageContent(selectedComponent).length} fields
                        </span>
                    </div>
                    <div className="header-actions">
                        <button 
                            onClick={handleSaveAll} 
                            className="save-btn" 
                            disabled={saving}
                        >
                            <span className="save-icon">
                                <Icons.Save />
                            </span>
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
                    {getPageContent(selectedComponent).length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">📝</span>
                            <h3>No Content Found</h3>
                            <p>This page doesn't have any content yet.</p>
                            <p className="hint">Make sure you have run the seed data in your database.</p>
                        </div>
                    ) : (
                        <div className="content-grid">
                            {(() => {
                                const pageItems = getPageContent(selectedComponent);
                                const sections = {};
                                pageItems.forEach(item => {
                                    const section = item.section || 'general';
                                    if (!sections[section]) {
                                        sections[section] = [];
                                    }
                                    sections[section].push(item);
                                });
                                
                                return Object.entries(sections).map(([section, items]) => {
                                    const config = SECTION_CONFIG[section] || { 
                                        label: getSectionLabel(section), 
                                        icon: Icons.Info,
                                        description: ''
                                    };
                                    const IconComponent = config.icon || Icons.Info;
                                    
                                    return (
                                        <div key={section} className="section-card">
                                            <div className="section-card-header">
                                                <div className="section-card-title">
                                                    <span className="section-icon">
                                                        <IconComponent />
                                                    </span>
                                                    <h3>{config.label}</h3>
                                                </div>
                                                <span className="section-item-count">{items.length} items</span>
                                            </div>
                                            {config.description && (
                                                <p className="section-description">{config.description}</p>
                                            )}
                                            <div className="section-card-body">
                                                {items.map(item => (
                                                    <div key={item.id} className="field-card">
                                                        <div className="field-card-label">
                                                            <span className="field-name">
                                                                {getFieldLabel(item.field)}
                                                            </span>
                                                            {item.type === 'image' && <span className="field-badge">🖼️</span>}
                                                            {item.type === 'json' && <span className="field-badge">📋</span>}
                                                            {item.field?.includes('url') && <span className="field-badge">🔗</span>}
                                                            {isColorField(item.field) && <span className="field-badge">🎨</span>}
                                                            <span className="field-table">{item.table?.replace(/_/g, ' ')}</span>
                                                        </div>
                                                        <div className="field-card-value">
                                                            {renderField(item)}
                                                        </div>
                                                        <div className="field-card-meta">
                                                            <span className="field-char-count">
                                                                {(editingContent[item.id] || '').length} characters
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;