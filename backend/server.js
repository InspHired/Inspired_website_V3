const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001','http://192.168.1.164:3000'],
    credentials: true
}));
app.use(express.json());

// ============ ROOT ROUTE ============
app.get('/', (req, res) => {
    res.json({ 
        message: 'InspHired API is running!',
        endpoints: {
            public: '/api/public/content/:page',
            admin_login: '/api/admin/login',
            admin_verify: '/api/admin/verify'
        }
    });
});

// ============ PUBLIC ROUTES ============

// Get content for a page
app.get('/api/public/content/:page', async (req, res) => {
    try {
        const { page } = req.params;
        const { data, error } = await supabase
            .from('content')
            .select('section, value')
            .eq('page', page);
        
        if (error) throw error;
        
        const contentMap = {};
        data.forEach(item => {
            contentMap[item.section] = item.value;
        });
        
        res.json({ success: true, data: contentMap });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get all content
app.get('/api/public/content', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('content')
            .select('*')
            .order('page', { ascending: true });
        
        if (error) throw error;
        res.json({ success: true, data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ============ ADMIN ROUTES ============

// Admin login
app.post('/api/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        // Check if admin
        const { data: profile } = await supabase
            .from('profiles')
            .select('role, name')
            .eq('id', data.user.id)
            .single();
        
        if (!profile || profile.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        
        res.json({
            success: true,
            token: data.session.access_token,
            user: {
                id: data.user.id,
                email: data.user.email,
                name: profile.name,
                role: profile.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Verify token
app.get('/api/admin/verify', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token' });
        }
        
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        
        const { data: profile } = await supabase
            .from('profiles')
            .select('role, name')
            .eq('id', user.id)
            .single();
        
        if (!profile || profile.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        
        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: profile.name,
                role: profile.role
            }
        });
    } catch (error) {
        console.error('Verify error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get all content (admin)
app.get('/api/admin/content', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('content')
            .select('*')
            .order('page', { ascending: true })
            .order('section', { ascending: true });
        
        if (error) throw error;
        res.json({ success: true, data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update content
app.put('/api/admin/content/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { value } = req.body;
        
        const { data, error } = await supabase
            .from('content')
            .update({ value, updated_at: new Date() })
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        res.json({ success: true, data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
});