// users/src/pages/FormConfirmation.jsx
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from '../config/seo.config';

const FormConfirmation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const formType = searchParams.get('type') || 'contact';

  // Track conversion when page loads
  useEffect(() => {
    // Send conversion to Google Ads
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-837330608',
        'event_category': 'Form Submission',
        'event_label': `${formType}_submission_success`,
        'value': 1,
        'currency': 'ZAR',
      });
      
      console.log(`✅ Conversion tracked: ${formType}_submission_success`);
    }
  }, [formType]);

  const getFormTitle = () => {
    const titles = {
      'company': 'Company/Employer Enquiry',
      'jobseeker': 'Job Seeker Application',
      'service_request': 'Service Request',
      'contact': 'Contact Form',
    };
    return titles[formType] || 'Form Submission';
  };

  const getFormMessage = () => {
    const messages = {
      'company': 'Thank you for your enquiry. Our team will contact you shortly to discuss your recruitment needs.',
      'jobseeker': 'Thank you for your application. Our recruitment team will review your profile and reach out with relevant opportunities.',
      'service_request': 'Thank you for your service request. Our team will get back to you with a tailored solution.',
      'contact': 'Thank you for contacting us. We will respond to your message as soon as possible.',
    };
    return messages[formType] || 'Thank you for your submission. We will be in touch shortly.';
  };

  const getIcon = () => {
    const icons = {
      'company': '🏢',
      'jobseeker': '👤',
      'service_request': '📋',
      'contact': '📧',
    };
    return icons[formType] || '✅';
  };

  return (
    <>
      <Helmet>
        <title>Form Submitted | {SEO_CONFIG.companyName}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div style={styles.pageWrapper}>
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.icon}>{getIcon()}</div>
            <h1 style={styles.title}>Form Submitted Successfully!</h1>
            <p style={styles.subtitle}>{getFormMessage()}</p>
            
            <div style={styles.details}>
            </div>

            <div style={styles.buttonRow}>
              <Link to="/" style={styles.primaryBtn}>Return to Home</Link>
              {formType !== 'service_request' && (
                <Link to="/services" style={styles.secondaryBtn}>Explore Services</Link>
              )}
              {formType === 'jobseeker' && (
                <Link to="/career-lab" style={styles.secondaryBtn}>Explore Career Lab</Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeup {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
};

const styles = {
  pageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#faf6f0',
    padding: '40px 20px',
  },
  container: {
    maxWidth: '600px',
    width: '100%',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '50px 40px',
    boxShadow: '0 16px 48px rgba(0,0,0,0.08)',
    textAlign: 'center',
    border: '1px solid #e5dfd5',
    animation: 'fadeInUp 0.6s ease-out',
  },
  icon: {
    fontSize: '4rem',
    marginBottom: '20px',
  },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#1f3540',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '1.05rem',
    color: '#5B6670',
    lineHeight: 1.7,
    marginBottom: '24px',
  },
  details: {
    backgroundColor: '#faf6f0',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '30px',
    textAlign: 'left',
  },
  buttonRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryBtn: {
    display: 'inline-block',
    padding: '14px 32px',
    backgroundColor: '#509b9e',
    color: '#ffffff',
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '0.95rem',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 4px 15px rgba(80,155,158,0.3)',
  },
  secondaryBtn: {
    display: 'inline-block',
    padding: '14px 32px',
    backgroundColor: 'transparent',
    color: '#1f3540',
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '0.95rem',
    border: '1.5px solid #e5dfd5',
    transition: 'all 0.3s ease',
  },
};

export default FormConfirmation;