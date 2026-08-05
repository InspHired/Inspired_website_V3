// users/src/utils/contentHelper.js

/**
 * Get a value from content array by field name
 */
export const getContentValue = (contentArray, fieldName, defaultValue = '') => {
    if (!contentArray || !Array.isArray(contentArray)) {
        return defaultValue;
    }
    
    const item = contentArray.find(item => item.field === fieldName);
    return item ? item.value : defaultValue;
};

/**
 * Get JSON content and parse it
 */
export const getJsonContent = (contentArray, fieldName, defaultValue = {}) => {
    try {
        const value = getContentValue(contentArray, fieldName, '');
        if (!value) return defaultValue;
        
        const parsed = typeof value === 'string' ? JSON.parse(value) : value;
        return parsed;
    } catch (error) {
        console.error('Error parsing JSON for field:', fieldName, error);
        return defaultValue;
    }
};

/**
 * Get all content for a specific section
 */
export const getSectionContent = (contentArray, section) => {
    if (!contentArray || !Array.isArray(contentArray)) {
        return [];
    }
    return contentArray.filter(item => item.section === section);
};

/**
 * Get image URL from content
 */
export const getImageUrl = (contentArray, fieldName, defaultImage = '') => {
    const value = getContentValue(contentArray, fieldName, defaultImage);
    return value || defaultImage;
};

/**
 * Check if content exists
 */
export const hasContent = (contentArray) => {
    return contentArray && Array.isArray(contentArray) && contentArray.length > 0;
};

/**
 * Get content by field name with type checking
 */
export const getTypedContent = (contentArray, fieldName, type = 'string', defaultValue = '') => {
    const value = getContentValue(contentArray, fieldName, defaultValue);
    
    switch(type) {
        case 'number':
            return parseFloat(value) || defaultValue;
        case 'boolean':
            return value === 'true' || value === true || false;
        case 'json':
            return getJsonContent(contentArray, fieldName, defaultValue);
        default:
            return value;
    }
};

/**
 * Get all content grouped by section
 */
export const groupContentBySection = (contentArray) => {
    if (!contentArray || !Array.isArray(contentArray)) {
        return {};
    }
    
    const grouped = {};
    contentArray.forEach(item => {
        const section = item.section || 'general';
        if (!grouped[section]) {
            grouped[section] = [];
        }
        grouped[section].push(item);
    });
    return grouped;
};

/**
 * Create a content hook for a specific page
 */
export const createContentHook = (content, setContent) => {
    return {
        getValue: (field, defaultValue = '') => getContentValue(content, field, defaultValue),
        getJson: (field, defaultValue = {}) => getJsonContent(content, field, defaultValue),
        getImage: (field, defaultImage = '') => getImageUrl(content, field, defaultImage),
        getSection: (section) => getSectionContent(content, section),
        hasContent: () => hasContent(content),
        updateContent: (newContent) => setContent(newContent)
    };
};