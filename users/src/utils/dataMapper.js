// users/src/utils/dataMapper.js

/**
 * Safely extracts text from array of objects or strings
 * @param {Array} items - Array of items (could be strings or objects)
 * @param {string} textKey - The key to extract text from
 * @returns {Array} - Array of strings
 */
export const extractTextArray = (items, textKey = 'feature_text') => {
    if (!items || !Array.isArray(items)) {
        return [];
    }
    
    return items.map((item) => {
        if (typeof item === 'string') {
            return item;
        }
        if (typeof item === 'object' && item !== null) {
            if (item[textKey]) {
                return item[textKey];
            }
            const commonKeys = ['text', 'description', 'name', 'title', 'value', 'feature_text'];
            for (const key of commonKeys) {
                if (item[key] && typeof item[key] === 'string') {
                    return item[key];
                }
            }
            try {
                return JSON.stringify(item);
            } catch (e) {
                return String(item);
            }
        }
        return String(item);
    });
};

/**
 * Safely extracts features from platform data
 */
export const extractFeatures = (features) => {
    return extractTextArray(features, 'feature_text');
};

/**
 * Safely maps platform data from database
 */
export const mapPlatforms = (platforms) => {
    if (!platforms || !Array.isArray(platforms)) {
        return [];
    }
    
    return platforms.map((platform) => ({
        label: platform.label || '',
        name: platform.name || '',
        tagline: platform.tagline || '',
        description: platform.description || '',
        features: extractFeatures(platform.features || []),
        accent: platform.accent_color || platform.accent || '#509b9e',
        cta: platform.cta_text || platform.cta || 'Learn more',
        ctaUrl: platform.cta_url || platform.ctaHref || '#',
        image: platform.image_url || platform.img || '',
        sortOrder: platform.sort_order || 0
    }));
};

/**
 * Safely maps team member data from database
 */
export const mapTeamMembers = (team) => {
    if (!team || !Array.isArray(team)) {
        return [];
    }
    
    return team.map((member) => ({
        name: member.name || '',
        role: member.role || '',
        image: member.image_url || member.img || '',
        accent: member.accent_color || member.accent || '#509b9e',
        bio: member.bio || '',
        sortOrder: member.sort_order || 0
    }));
};

/**
 * Safely maps testimonial data from database
 */
export const mapTestimonials = (testimonials) => {
    if (!testimonials || !Array.isArray(testimonials)) {
        return [];
    }
    
    return testimonials.map((testimonial) => ({
        quote: testimonial.quote || testimonial.text || '',
        name: testimonial.client_name || testimonial.name || '',
        role: testimonial.role || '',
        accent: testimonial.accent_color || testimonial.accent || '#509b9e'
    }));
};

/**
 * Safely maps about timeline data
 */
export const mapTimeline = (timeline) => {
    if (!timeline || !Array.isArray(timeline)) {
        return [];
    }
    
    return timeline.map((item) => ({
        year: item.year || '',
        text: item.text || '',
        accent: item.accent_color || item.accent || '#509b9e',
        sortOrder: item.sort_order || 0
    }));
};

/**
 * Safely maps about values data
 */
export const mapValues = (values) => {
    if (!values || !Array.isArray(values)) {
        return [];
    }
    
    return values.map((value) => ({
        title: value.title || '',
        description: value.description || '',
        icon: value.icon_type || value.icon || 'pulse',
        accent: value.accent_color || value.accent || '#509b9e',
        sortOrder: value.sort_order || 0
    }));
};

/**
 * Safely maps curriculum modules
 */
export const mapModules = (modules) => {
    if (!modules || !Array.isArray(modules)) {
        return [];
    }
    
    return modules.map((module) => ({
        moduleNumber: module.module_number || '',
        title: module.title || '',
        items: extractTextArray(module.items || []),
        accent: module.accent_color || module.accent || '#509b9e'
    }));
};

/**
 * Safely maps career tracks
 */
export const mapTracks = (tracks) => {
    if (!tracks || !Array.isArray(tracks)) {
        return [];
    }
    
    return tracks.map((track) => ({
        trackId: track.track_id || '',
        title: track.title || '',
        description: track.description || '',
        bulletPoints: extractTextArray(track.bullet_points || [])
    }));
};

/**
 * Safely maps service offerings
 */
export const mapOfferings = (offerings) => {
    if (!offerings || !Array.isArray(offerings)) {
        return [];
    }
    
    return offerings.map((offering) => ({
        number: offering.service_number || '',
        title: offering.title || '',
        description: offering.description || '',
        accent: offering.accent_color || offering.accent || '#509b9e'
    }));
};

/**
 * Safely maps screening items
 */
export const mapScreeningItems = (items) => {
    if (!items || !Array.isArray(items)) {
        return [];
    }
    
    return items.map((item) => ({
        title: item.title || '',
        description: item.description || '',
        icon: item.icon_class || item.icon || 'fa-check',
        accent: item.accent_color || item.accent || '#509b9e'
    }));
};