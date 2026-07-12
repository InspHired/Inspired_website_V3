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
        version: '1.0.0',
        endpoints: {
            public: '/api/public/:page',
            admin: {
                login: 'POST /api/admin/login',
                verify: 'GET /api/admin/verify',
                content: 'GET /api/admin/content',
                update: 'PUT /api/admin/content/:id'
            },
            test: '/api/test'
        }
    });
});

// ============================================
// PUBLIC ROUTES - For Users App
// ============================================

// Get public content for any page
app.get('/api/public/:page', async (req, res) => {
    try {
        const { page } = req.params;
        const pageHandlers = {
            'home': getHomeContent,
            'about': getAboutContent,
            'contact': getContactContent,
            'career-lab': getCareerLabContent,
            'employers': getEmployersContent,
            'services': getServicesContent
        };

        const handler = pageHandlers[page];
        if (!handler) {
            return res.status(404).json({ 
                success: false, 
                message: 'Page not found' 
            });
        }

        const data = await handler(supabase);
        res.json({ success: true, data });
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
// PAGE CONTENT HANDLERS
// ============================================

async function getHomeContent(supabase) {
    const [hero, info, steps, platforms, team, testimonials, footer] = await Promise.all([
        supabase.from('home_hero').select('*').limit(1).single(),
        supabase.from('home_info').select('*').limit(1).single(),
        supabase.from('home_recruitment_steps').select('*').order('sort_order'),
        supabase.from('home_ecosystem_platforms').select('*').order('sort_order'),
        supabase.from('home_team_members').select('*').order('sort_order'),
        supabase.from('home_testimonials').select('*').order('sort_order'),
        supabase.from('home_footer').select('*').limit(1).single()
    ]);

    // Get features for each platform
    const platformsWithFeatures = await Promise.all((platforms.data || []).map(async (platform) => {
        const { data } = await supabase
            .from('home_ecosystem_features')
            .select('feature_text')
            .eq('platform_id', platform.id)
            .order('sort_order');
        return { ...platform, features: data || [] };
    }));

    return {
        hero: hero.data || null,
        info: info.data || null,
        steps: steps.data || [],
        platforms: platformsWithFeatures || [],
        team: team.data || [],
        testimonials: testimonials.data || [],
        footer: footer.data || null
    };
}

async function getAboutContent(supabase) {
    const [hero, missionVision, story, timeline, values, subscribe] = await Promise.all([
        supabase.from('about_hero').select('*').limit(1).single(),
        supabase.from('about_mission_vision').select('*').limit(1).single(),
        supabase.from('about_story').select('*').limit(1).single(),
        supabase.from('about_timeline_items').select('*').order('sort_order'),
        supabase.from('about_values').select('*').order('sort_order'),
        supabase.from('about_subscribe').select('*').limit(1).single()
    ]);

    return {
        hero: hero.data || null,
        missionVision: missionVision.data || null,
        story: story.data || null,
        timeline: timeline.data || [],
        values: values.data || [],
        subscribe: subscribe.data || null
    };
}

async function getContactContent(supabase) {
    const [hero, info, services, timePreferences, placeholders, successMessage] = await Promise.all([
        supabase.from('contact_hero').select('*').limit(1).single(),
        supabase.from('contact_info').select('*').limit(1).single(),
        supabase.from('contact_services').select('*').order('sort_order'),
        supabase.from('contact_time_preferences').select('*').order('sort_order'),
        supabase.from('contact_form_placeholders').select('*'),
        supabase.from('contact_success_message').select('*').limit(1).single()
    ]);

    return {
        hero: hero.data || null,
        info: info.data || null,
        services: services.data || [],
        timePreferences: timePreferences.data || [],
        placeholders: placeholders.data || [],
        successMessage: successMessage.data || null
    };
}

async function getCareerLabContent(supabase) {
    const [hero, tracks, modules, differentiation] = await Promise.all([
        supabase.from('career_lab_hero').select('*').limit(1).single(),
        supabase.from('career_lab_tracks').select('*'),
        supabase.from('career_lab_modules').select('*').order('module_number'),
        supabase.from('career_lab_differentiation').select('*').limit(1).single()
    ]);

    return {
        hero: hero.data || null,
        tracks: tracks.data || [],
        modules: modules.data || [],
        differentiation: differentiation.data || null
    };
}

async function getEmployersContent(supabase) {
    const [hero, processSteps, quote, verification, testimonials, finalCta] = await Promise.all([
        supabase.from('employers_hero').select('*').limit(1).single(),
        supabase.from('employers_process_steps').select('*').order('sort_order'),
        supabase.from('employers_quote').select('*').limit(1).single(),
        supabase.from('employers_verification_items').select('*').order('sort_order'),
        supabase.from('employers_testimonials').select('*').order('sort_order'),
        supabase.from('employers_final_cta').select('*').limit(1).single()
    ]);

    return {
        hero: hero.data || null,
        processSteps: processSteps.data || [],
        quote: quote.data || null,
        verification: verification.data || [],
        testimonials: testimonials.data || [],
        finalCta: finalCta.data || null
    };
}

async function getServicesContent(supabase) {
    const [hero, offerings, skillsTraining, screening] = await Promise.all([
        supabase.from('services_hero').select('*').limit(1).single(),
        supabase.from('services_offerings').select('*').order('sort_order'),
        supabase.from('services_skills_training').select('*').limit(1).single(),
        supabase.from('services_screening_items').select('*').order('sort_order')
    ]);

    return {
        hero: hero.data || null,
        offerings: offerings.data || [],
        skillsTraining: skillsTraining.data || null,
        screening: screening.data || []
    };
}

// ============================================
// ADMIN ROUTES
// ============================================

// Admin login
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

// Verify admin token
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

        // Fetch ALL content from all tables across all pages
        const [
            // Home
            homeHero,
            homeInfo,
            homeSteps,
            homePlatforms,
            homeFeatures,
            homeTeam,
            homeTestimonials,
            homeFooter,
            // About
            aboutHero,
            aboutMissionVision,
            aboutStory,
            aboutTimeline,
            aboutValues,
            aboutSubscribe,
            // Contact
            contactHero,
            contactInfo,
            contactServices,
            contactTimePreferences,
            contactPlaceholders,
            contactSuccessMessage,
            // Career Lab
            careerLabHero,
            careerLabTracks,
            careerLabModules,
            careerLabDifferentiation,
            // Employers
            employersHero,
            employersProcessSteps,
            employersQuote,
            employersVerification,
            employersTestimonials,
            employersFinalCta,
            // Services
            servicesHero,
            servicesOfferings,
            servicesScreening,
            servicesSkillsTraining
        ] = await Promise.all([
            // Home
            supabase.from('home_hero').select('*'),
            supabase.from('home_info').select('*'),
            supabase.from('home_recruitment_steps').select('*').order('sort_order'),
            supabase.from('home_ecosystem_platforms').select('*').order('sort_order'),
            supabase.from('home_ecosystem_features').select('*'),
            supabase.from('home_team_members').select('*').order('sort_order'),
            supabase.from('home_testimonials').select('*').order('sort_order'),
            supabase.from('home_footer').select('*'),
            // About
            supabase.from('about_hero').select('*'),
            supabase.from('about_mission_vision').select('*'),
            supabase.from('about_story').select('*'),
            supabase.from('about_timeline_items').select('*').order('sort_order'),
            supabase.from('about_values').select('*').order('sort_order'),
            supabase.from('about_subscribe').select('*'),
            // Contact
            supabase.from('contact_hero').select('*'),
            supabase.from('contact_info').select('*'),
            supabase.from('contact_services').select('*').order('sort_order'),
            supabase.from('contact_time_preferences').select('*').order('sort_order'),
            supabase.from('contact_form_placeholders').select('*'),
            supabase.from('contact_success_message').select('*'),
            // Career Lab
            supabase.from('career_lab_hero').select('*'),
            supabase.from('career_lab_tracks').select('*'),
            supabase.from('career_lab_modules').select('*').order('module_number'),
            supabase.from('career_lab_differentiation').select('*'),
            // Employers
            supabase.from('employers_hero').select('*'),
            supabase.from('employers_process_steps').select('*').order('sort_order'),
            supabase.from('employers_quote').select('*'),
            supabase.from('employers_verification_items').select('*').order('sort_order'),
            supabase.from('employers_testimonials').select('*').order('sort_order'),
            supabase.from('employers_final_cta').select('*'),
            // Services
            supabase.from('services_hero').select('*'),
            supabase.from('services_offerings').select('*').order('sort_order'),
            supabase.from('services_screening_items').select('*').order('sort_order'),
            supabase.from('services_skills_training').select('*')
        ]);

        // Transform all data for admin dashboard
        const transformedData = [];

        // Helper to add simple table fields
        const addTableFields = (data, page, section, table, fields, type = 'text') => {
            (data || []).forEach(item => {
                fields.forEach(field => {
                    const value = item[field];
                    if (value !== undefined && value !== null) {
                        transformedData.push({
                            id: `${page}-${section}-${item.id}-${field}`,
                            page: page,
                            section: section,
                            field: field,
                            value: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
                            type: field.includes('image') || field.includes('url') ? 'image' : 
                                   typeof value === 'object' ? 'json' : type,
                            table: table,
                            originalId: item.id,
                            originalKey: field
                        });
                    }
                });
            });
        };

        // Helper to add JSON items
        const addJsonItems = (data, page, section, table, fieldPrefix, jsonFields) => {
            (data || []).forEach((item, index) => {
                const jsonData = {};
                jsonFields.forEach(f => {
                    if (item[f] !== undefined && item[f] !== null) {
                        jsonData[f] = item[f];
                    }
                });
                transformedData.push({
                    id: `${page}-${section}-${item.id}`,
                    page: page,
                    section: section,
                    field: `${fieldPrefix}_${index + 1}`,
                    value: JSON.stringify(jsonData),
                    type: 'json',
                    table: table,
                    originalId: item.id
                });
            });
        };

        // ============ HOME ============
        addTableFields(homeHero.data, 'home', 'hero', 'home_hero', 
            ['badge', 'title', 'description', 'cta_primary_text', 'cta_primary_url', 'cta_secondary_text', 'cta_secondary_url']);
        addTableFields(homeInfo.data, 'home', 'info', 'home_info', 
            ['eyebrow', 'title', 'description_1', 'description_2', 'quote']);
        addJsonItems(homeSteps.data, 'home', 'steps', 'home_recruitment_steps', 'step', ['step_id', 'label', 'color', 'detail']);
        addJsonItems(homePlatforms.data, 'home', 'ecosystem', 'home_ecosystem_platforms', 'platform', 
            ['label', 'name', 'tagline', 'description', 'accent_color', 'cta_text', 'cta_url', 'image_url']);
        addJsonItems(homeTeam.data, 'home', 'team', 'home_team_members', 'member', ['name', 'role', 'image_url', 'accent_color']);
        addJsonItems(homeTestimonials.data, 'home', 'testimonials', 'home_testimonials', 'testimonial', ['quote', 'client_name', 'role', 'accent_color']);
        addTableFields(homeFooter.data, 'home', 'footer', 'home_footer', 
            ['company_name', 'tagline', 'address', 'phone', 'email', 'facebook_url', 'twitter_url', 'linkedin_url', 'instagram_url', 'copyright']);

        // ============ ABOUT ============
        addTableFields(aboutHero.data, 'about', 'hero', 'about_hero', 
            ['eyebrow', 'title', 'description', 'years_in_business', 'founded_year', 'location', 'image_url']);
        addTableFields(aboutMissionVision.data, 'about', 'mission-vision', 'about_mission_vision', 
            ['mission', 'mission_icon', 'mission_color', 'vision', 'vision_icon', 'vision_color']);
        addTableFields(aboutStory.data, 'about', 'story', 'about_story', ['title', 'description_1', 'description_2']);
        addJsonItems(aboutTimeline.data, 'about', 'timeline', 'about_timeline_items', 'timeline', ['year', 'text', 'accent_color']);
        addJsonItems(aboutValues.data, 'about', 'values', 'about_values', 'value', ['title', 'description', 'icon_type', 'accent_color']);
        addTableFields(aboutSubscribe.data, 'about', 'subscribe', 'about_subscribe', 
            ['title', 'description', 'button_text', 'placeholder_text', 'success_message']);

        // ============ CONTACT ============
        addTableFields(contactHero.data, 'contact', 'hero', 'contact_hero', ['tag', 'title', 'description']);
        addTableFields(contactInfo.data, 'contact', 'info', 'contact_info', 
            ['email', 'phone', 'hours_title', 'hours_time', 'booking_url', 'booking_text']);
        addJsonItems(contactServices.data, 'contact', 'services', 'contact_services', 'service', ['service_name', 'sort_order']);
        addJsonItems(contactTimePreferences.data, 'contact', 'time-preferences', 'contact_time_preferences', 'time', ['preference', 'sort_order']);
        addJsonItems(contactPlaceholders.data, 'contact', 'placeholders', 'contact_form_placeholders', 'placeholder', ['field_name', 'placeholder_text', 'is_required']);
        addTableFields(contactSuccessMessage.data, 'contact', 'success-message', 'contact_success_message', ['title', 'message']);

        // ============ CAREER LAB ============
        addTableFields(careerLabHero.data, 'career-lab', 'hero', 'career_lab_hero', ['tag', 'title', 'description']);
        // Journey steps are stored as JSON in the hero table - handle separately
        (careerLabHero.data || []).forEach(item => {
            if (item.journey_steps) {
                transformedData.push({
                    id: `career-lab-hero-${item.id}-journey_steps`,
                    page: 'career-lab',
                    section: 'hero',
                    field: 'journey_steps',
                    value: typeof item.journey_steps === 'string' ? item.journey_steps : JSON.stringify(item.journey_steps),
                    type: 'json',
                    table: 'career_lab_hero',
                    originalId: item.id,
                    originalKey: 'journey_steps'
                });
            }
        });
        addJsonItems(careerLabTracks.data, 'career-lab', 'tracks', 'career_lab_tracks', 'track', ['track_id', 'title', 'description', 'bullet_points']);
        addJsonItems(careerLabModules.data, 'career-lab', 'modules', 'career_lab_modules', 'module', ['module_number', 'title', 'items', 'accent_color']);
        addTableFields(careerLabDifferentiation.data, 'career-lab', 'differentiation', 'career_lab_differentiation', 
            ['title', 'description', 'free_track_title', 'free_track_items', 'coaching_title', 'coaching_items']);

        // ============ EMPLOYERS ============
        addTableFields(employersHero.data, 'employers', 'hero', 'employers_hero', 
            ['tag', 'title', 'description', 'cta_primary_text', 'cta_primary_url', 'cta_secondary_text', 'cta_secondary_url']);
        addJsonItems(employersProcessSteps.data, 'employers', 'process', 'employers_process_steps', 'step', ['step_number', 'title', 'description', 'accent_color']);
        addTableFields(employersQuote.data, 'employers', 'quote', 'employers_quote', ['quote', 'attribution']);
        addJsonItems(employersVerification.data, 'employers', 'verification', 'employers_verification_items', 'verify', ['title', 'icon_class', 'accent_color']);
        addJsonItems(employersTestimonials.data, 'employers', 'testimonials', 'employers_testimonials', 'testimonial', ['quote', 'client_name', 'accent_color']);
        addTableFields(employersFinalCta.data, 'employers', 'final-cta', 'employers_final_cta', 
            ['title', 'description', 'cta_primary_text', 'cta_primary_url', 'cta_secondary_text', 'cta_secondary_url', 'cta_tertiary_text', 'cta_tertiary_url']);

        // ============ SERVICES ============
        addTableFields(servicesHero.data, 'services', 'hero', 'services_hero', ['tag', 'title', 'description']);
        addJsonItems(servicesOfferings.data, 'services', 'offerings', 'services_offerings', 'offering', ['service_number', 'title', 'description', 'accent_color']);
        addJsonItems(servicesScreening.data, 'services', 'screening', 'services_screening_items', 'screening', ['title', 'description', 'icon_class', 'accent_color']);
        addTableFields(servicesSkillsTraining.data, 'services', 'skills-training', 'services_skills_training', 
            ['title', 'description', 'cta_primary_text', 'cta_primary_url', 'cta_secondary_text', 'cta_secondary_url', 'visual_title', 'visual_description']);

        console.log(`✅ Total content items: ${transformedData.length}`);
        console.log(`📊 Pages: ${[...new Set(transformedData.map(item => item.page))].join(', ')}`);

        res.json({ 
            success: true, 
            data: transformedData,
            total: transformedData.length
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
        const { value, table, originalId, originalKey } = req.body;
        
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

        let result;
        let updateData = { updated_at: new Date().toISOString() };

        // Handle JSON fields that need parsing
        if (originalKey && ['journey_steps', 'free_track_items', 'coaching_items', 'items', 'bullet_points'].includes(originalKey)) {
            try {
                const parsed = typeof value === 'string' ? JSON.parse(value) : value;
                updateData[originalKey] = parsed;
            } catch (e) {
                // If it's already an array or object, use as is
                updateData[originalKey] = value;
            }
        } else if (originalKey && ['years_in_business', 'founded_year', 'sort_order'].includes(originalKey)) {
            // Handle numeric fields
            updateData[originalKey] = parseInt(value) || 0;
        } else {
            // Regular text field
            updateData[originalKey] = value;
        }

        // Special handling for JSON items (tracks, modules, steps, etc.)
        if (id.includes('track-') || id.includes('module-') || id.includes('step-') || 
            id.includes('platform-') || id.includes('member-') || id.includes('testimonial-') ||
            id.includes('verify-') || id.includes('offering-') || id.includes('screening-') ||
            id.includes('timeline-') || id.includes('value-') || id.includes('service-') ||
            id.includes('time-') || id.includes('placeholder-')) {
            try {
                const parsed = JSON.parse(value);
                // Update all fields in the JSON
                result = await supabase
                    .from(table)
                    .update({ ...parsed, updated_at: new Date().toISOString() })
                    .eq('id', originalId);
            } catch (e) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Invalid JSON format' 
                });
            }
        } else {
            // Simple field update
            result = await supabase
                .from(table)
                .update(updateData)
                .eq('id', originalId);
        }

        if (result?.error) throw result.error;

        res.json({ 
            success: true, 
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
// TEST ENDPOINTS
// ============================================
app.get('/api/test', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Backend is running! ✅',
        timestamp: new Date().toISOString(),
        endpoints: [
            'GET /',
            'GET /api/test',
            'GET /api/public/:page',
            'POST /api/admin/login',
            'GET /api/admin/verify',
            'GET /api/admin/content',
            'PUT /api/admin/content/:id'
        ]
    });
});

app.get('/api/test-data', async (req, res) => {
    try {
        // Count all tables
        const tables = [
            'home_hero', 'home_info', 'home_recruitment_steps', 'home_ecosystem_platforms', 
            'home_ecosystem_features', 'home_team_members', 'home_testimonials', 'home_footer',
            'about_hero', 'about_mission_vision', 'about_story', 'about_timeline_items', 
            'about_values', 'about_subscribe',
            'contact_hero', 'contact_info', 'contact_services', 'contact_time_preferences',
            'contact_form_placeholders', 'contact_success_message',
            'career_lab_hero', 'career_lab_tracks', 'career_lab_modules', 'career_lab_differentiation',
            'employers_hero', 'employers_process_steps', 'employers_quote', 'employers_verification_items',
            'employers_testimonials', 'employers_final_cta',
            'services_hero', 'services_offerings', 'services_screening_items', 'services_skills_training'
        ];

        const results = {};
        for (const table of tables) {
            const { count, error } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });
            results[table] = error ? 'error' : count;
        }

        res.json({
            success: true,
            tables: results,
            total: Object.values(results).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0)
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
    console.log(`📄 Pages: http://localhost:${PORT}/api/public/:page`);
    console.log(`🔐 Admin Login: http://localhost:${PORT}/api/admin/login`);
    console.log(`📋 Admin Content: http://localhost:${PORT}/api/admin/content`);
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