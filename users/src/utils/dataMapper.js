// users/src/utils/dataMapper.js

/**
 * Safely extracts feature_text from array of objects
 * @param {Array} features - Array of features (could be strings or objects)
 * @returns {Array} - Array of strings
 */
export const extractFeatures = (features) => {
    if (!features || !Array.isArray(features)) {
        return [];
    }
    
    return features.map((feature) => {
        // If it's a string, return it as is
        if (typeof feature === 'string') {
            return feature;
        }
        // If it's an object with feature_text
        if (typeof feature === 'object' && feature !== null) {
            // Check for feature_text (database column)
            if (feature.feature_text) {
                return feature.feature_text;
            }
            // Check for text property
            if (feature.text) {
                return feature.text;
            }
            // If it's any other object, try to stringify
            try {
                return JSON.stringify(feature);
            } catch (e) {
                return String(feature);
            }
        }
        // Fallback
        return String(feature);
    });
};

/**
 * Safely maps platform data from database
 * @param {Array} platforms - Array of platform objects
 * @returns {Array} - Mapped platforms with string features
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
 * @param {Array} team - Array of team member objects
 * @returns {Array} - Mapped team members
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
 * @param {Array} testimonials - Array of testimonial objects
 * @returns {Array} - Mapped testimonials
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
 * Safely maps any array that might contain objects with feature_text
 * @param {Array} items - Array of items
 * @param {string} textKey - The key to extract text from
 * @returns {Array} - Array of strings
 */
export const extractTextArray = (items, textKey = 'text') => {
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
            // Try to find any text-like property
            const textProps = ['feature_text', 'text', 'description', 'name', 'title', 'value'];
            for (const prop of textProps) {
                if (item[prop] && typeof item[prop] === 'string') {
                    return item[prop];
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
 * Safely parses JSON data from database
 * @param {any} data - Data that might be JSON string or object
 * @param {any} fallback - Fallback value if parsing fails
 * @returns {any} - Parsed data or fallback
 */
export const safeJSONParse = (data, fallback = null) => {
    if (data === null || data === undefined) {
        return fallback;
    }
    
    if (typeof data === 'object') {
        return data;
    }
    
    if (typeof data === 'string') {
        try {
            return JSON.parse(data);
        } catch (e) {
            return fallback;
        }
    }
    
    return fallback;
};

/**
 * Checks if an array contains objects that need text extraction
 * @param {Array} arr - Array to check
 * @returns {boolean} - True if array contains objects with text properties
 */
export const needsTextExtraction = (arr) => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) {
        return false;
    }
    
    return arr.some(item => 
        typeof item === 'object' && 
        item !== null && 
        (item.feature_text || item.text || item.description)
    );
};