const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://192.168.1.164:3000'],
    credentials: true
}));
app.use(express.json());

// ============================================
// ROOT ROUTE
// ============================================
app.get('/', (req, res) => {
    res.json({ 
        message: 'InspHired API is running! 🚀',
        endpoints: {
            public: {
                all: 'GET /api/public/content',
                by_page: 'GET /api/public/content/:page'
            },
            admin: {
                login: 'POST /api/admin/login',
                verify: 'GET /api/admin/verify',
                content: 'GET /api/admin/content',
                update: 'PUT /api/admin/content/:id'
            }
        }
    });
});

// ============================================
// PUBLIC ROUTES - For Users App
// ============================================

// GET /api/public/content - Get all content
app.get('/api/public/content', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('content')
            .select('*')
            .eq('is_active', true)
            .order('page', { ascending: true })
            .order('component', { ascending: true })
            .order('sort_order', { ascending: true });

        if (error) throw error;

        res.json({ 
            success: true, 
            data: data 
        });
    } catch (error) {
        console.error('Error fetching all content:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error',
            error: error.message 
        });
    }
});

// GET /api/public/content/:page - Get content by page
app.get('/api/public/content/:page', async (req, res) => {
    try {
        const { page } = req.params;
        
        const { data, error } = await supabase
            .from('content')
            .select('*')
            .eq('page', page)
            .eq('is_active', true)
            .order('component', { ascending: true })
            .order('sort_order', { ascending: true });

        if (error) throw error;

        // Format for users app
        const contentMap = {};
        data.forEach(item => {
            const key = item.component && item.field 
                ? `${item.component}.${item.field}` 
                : item.field || item.component;
            contentMap[key] = item.value;
        });

        res.json({ 
            success: true, 
            data: contentMap
        });
    } catch (error) {
        console.error('Error fetching page content:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error',
            error: error.message 
        });
    }
});

// ============================================
// ADMIN ROUTES - For Admin Dashboard
// ============================================

// POST /api/admin/login - Admin login
app.post('/api/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('Login attempt for:', email);

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (authError) {
            console.log('Auth error:', authError.message);
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }
        
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role, name')
            .eq('id', authData.user.id)
            .single();
        
        if (profileError || !profile) {
            return res.status(403).json({ 
                success: false, 
                message: 'User profile not found' 
            });
        }
        
        if (profile.role !== 'admin') {
            return res.status(403).json({ 
                success: false, 
                message: 'Not authorized as admin' 
            });
        }
        
        res.json({
            success: true,
            token: authData.session.access_token,
            user: {
                id: authData.user.id,
                email: authData.user.email,
                name: profile.name,
                role: profile.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error',
            error: error.message 
        });
    }
});

// GET /api/admin/verify - Verify admin token
app.get('/api/admin/verify', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'No token provided' 
            });
        }
        
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid or expired token' 
            });
        }
        
        const { data: profile } = await supabase
            .from('profiles')
            .select('role, name')
            .eq('id', user.id)
            .single();
        
        if (!profile || profile.role !== 'admin') {
            return res.status(403).json({ 
                success: false, 
                message: 'Not authorized' 
            });
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
        res.status(500).json({ 
            success: false, 
            message: 'Server error',
            error: error.message 
        });
    }
});

// GET /api/admin/content - Get all content for admin dashboard
app.get('/api/admin/content', async (req, res) => {
    try {
        console.log('🔍 Admin content request received');
        
        // Verify token
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'No token provided' 
            });
        }

        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token' 
            });
        }
        
        console.log('✅ User authenticated:', user.email);

        const { data, error } = await supabase
            .from('content')
            .select('*')
            .eq('is_active', true)
            .order('page', { ascending: true })
            .order('component', { ascending: true })
            .order('sort_order', { ascending: true });
        
        if (error) throw error;
        
        console.log(`✅ Found ${data.length} content items`);
        
        // Keep 'component' field name for admin dashboard
        const transformedData = data.map(item => ({
            id: item.id,
            page: item.page,
            component: item.component,  // ← Keep as 'component'
            field: item.field,
            value: item.value,
            type: item.type || 'text',
            sort_order: item.sort_order || 0,
            is_active: item.is_active
        }));
        
        if (transformedData.length > 0) {
            // Count items by component
            const componentCounts = {};
            transformedData.forEach(item => {
                componentCounts[item.component] = (componentCounts[item.component] || 0) + 1;
            });
            console.log('📊 Items by component:', componentCounts);
        }
        
        res.json({ 
            success: true, 
            data: transformedData 
        });
    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error',
            error: error.message 
        });
    }
});

// PUT /api/admin/content/:id - Update content
app.put('/api/admin/content/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { value } = req.body;
        
        // Verify token
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'No token provided' 
            });
        }

        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token' 
            });
        }
        
        const { data, error } = await supabase
            .from('content')
            .update({ 
                value: value, 
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        
        // Keep 'component' field
        const transformedData = {
            id: data.id,
            page: data.page,
            component: data.component,
            field: data.field,
            value: data.value,
            type: data.type || 'text'
        };
        
        res.json({ 
            success: true, 
            data: transformedData,
            message: 'Content updated successfully'
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error',
            error: error.message 
        });
    }
});

// ============================================
// HOMEPAGE CONTENT
// ============================================
app.get('/api/homepage-content', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('content')
            .select('*')
            .eq('page', 'home')
            .eq('is_active', true)
            .order('component', { ascending: true });

        if (error) throw error;

        // Group by component
        const content = {};
        data.forEach(item => {
            if (!content[item.component]) {
                content[item.component] = {};
            }
            content[item.component][item.field] = item.value;
        });

        res.json({
            success: true,
            content: content
        });
    } catch (error) {
        console.error('Error fetching homepage content:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error',
            error: error.message 
        });
    }
});

// ============================================
// TEST ENDPOINTS
// ============================================
app.get('/api/test', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Backend is running! ✅',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/test-data', async (req, res) => {
    try {
        const { data, error, count } = await supabase
            .from('content')
            .select('*', { count: 'exact' })
            .limit(5);
        
        if (error) {
            return res.json({
                success: false,
                error: error.message,
                hint: 'Table might not exist'
            });
        }
        
        res.json({
            success: true,
            totalCount: count,
            sampleData: data,
            message: count > 0 ? '✅ Data exists!' : '⚠️ No data found in content table'
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`\n🚀 =====================================`);
    console.log(`🚀 InspHired Backend is running!`);
    console.log(`🚀 =====================================`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`📝 Test: http://localhost:${PORT}/api/test`);
    console.log(`📊 Test Data: http://localhost:${PORT}/api/test-data`);
    console.log(`📄 Public: http://localhost:${PORT}/api/public/content`);
    console.log(`🏠 Homepage: http://localhost:${PORT}/api/homepage-content`);
    console.log(`🔐 Admin Login: http://localhost:${PORT}/api/admin/login`);
    console.log(`=====================================\n`);
});

// ============================================
// ERROR HANDLING
// ============================================
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});