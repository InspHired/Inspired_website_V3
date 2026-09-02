// users/src/services/formTracking.js

// Google Ads Conversion ID
const CONVERSION_ID = 'AW-837330608';

// Ensure gtag function exists
const getGtag = () => {
  if (typeof window === 'undefined') return null;
  if (typeof window.gtag !== 'function') {
    // Fallback: create a mock gtag if not available
    console.warn('⚠️ gtag not available, using fallback');
    window.gtag = function() {
      console.log('📊 gtag fallback:', arguments);
    };
  }
  return window.gtag;
};

export const trackFormSubmission = (formType, formData) => {
  const gtag = getGtag();
  if (!gtag) return;

  // Get form name
  const formName = getFormName(formType);

  // Track the form submission as a conversion
  gtag('event', 'conversion', {
    'send_to': CONVERSION_ID,
    'event_category': 'Form Submission',
    'event_label': formName,
    'value': 1,
    'currency': 'ZAR',
  });

  // Also track as a custom event for more detailed analytics
  gtag('event', 'form_submission', {
    'event_category': 'Forms',
    'event_label': formType,
    'form_type': formType,
    'form_name': formName,
    'user_name': formData.name || formData.fullName || '',
    'user_email': formData.email || '',
    'user_phone': formData.phone || '',
    'company': formData.company || '',
    'service': formData.service || '',
    'position': formData.position || '',
  });

  console.log(`📊 Form tracked: ${formType} submission (${formName})`);
  console.log(`📊 Conversion sent to ${CONVERSION_ID}`);
};

export const getFormName = (formType) => {
  const names = {
    'company': 'Company/Employer Contact Form',
    'jobseeker': 'Job Seeker/Candidate Form',
    'service_request': 'Service Request Form',
    'contact': 'General Contact Form',
  };
  return names[formType] || formType;
};

export const trackPageView = (pageName) => {
  const gtag = getGtag();
  if (!gtag) return;
  
  gtag('event', 'page_view', {
    'event_category': 'Pages',
    'event_label': pageName,
    'page_name': pageName,
    'page_url': window.location.pathname,
  });
};

export const trackButtonClick = (buttonName, buttonLocation) => {
  const gtag = getGtag();
  if (!gtag) return;
  
  gtag('event', 'button_click', {
    'event_category': 'Buttons',
    'event_label': buttonName,
    'button_name': buttonName,
    'button_location': buttonLocation,
  });
};