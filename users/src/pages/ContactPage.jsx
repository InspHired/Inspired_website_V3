// users/src/pages/ContactPage.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { publicApi } from '../services/api';
import { 
  OrganizationSchema, 
  BreadcrumbSchema 
} from "../components/Schema";
import { SEO_CONFIG } from "../config/seo.config";
import Footer from '../components/Footer';

const ContactPage = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    service: '',
    ContactTime: '',
    message: ''
  });

  // Fetch contact page content from API
  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const response = await publicApi.getContact();
        
        if (response.success && response.data) {
          setContactData(response.data);
          setError(null);
        } else {
          setError(response.error || 'Failed to load contact content');
        }
      } catch (err) {
        console.error('Error fetching contact:', err);
        setError(err.message || 'Error loading contact content');
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Send form data to your backend API
      const response = await fetch('https://inspired-website-v3-fhno.onrender.com/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Thank you! Our team will contact you shortly.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          position: '',
          service: '',
          ContactTime: '',
          message: ''
        });
      } else {
        alert(result.message || 'Failed to submit request. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Use data from API or fallback to defaults
  const data = contactData || {};
  const hero = data.hero || {};
  const info = data.info || {};

  // Service options from backend or fallback
  const serviceOptions = data.services && data.services.length > 0
    ? data.services.map(item => item.service_name || item)
    : ['Recruitment Services', 'Executive Search', 'Verification Services', 'Career Lab Services', 'General Enquiry'];

  // Time preferences from backend or fallback
  const timeOptions = data.timePreferences && data.timePreferences.length > 0
    ? data.timePreferences.map(item => item.preference || item)
    : ['Morning (08:00 - 12:00)', 'Afternoon (12:00 - 17:00)', 'Any time'];

  // Placeholders from backend or fallback
  const placeholders = data.placeholders || {};

  // ============ SEO VARIABLES ============
  const companyName = SEO_CONFIG.companyName;
  const siteUrl = SEO_CONFIG.siteUrl;
  const pageTitle = "Contact Us | " + companyName;
  const pageDescription = "Get in touch with our team. We're here to help with your recruitment, career, and workforce needs across South Africa.";
  const pageKeywords = "contact, recruitment services, career help, South Africa, hiring solutions, get in touch";
  const pageUrl = siteUrl + "/contact";
  const ogImage = siteUrl + "/og-image-contact.jpg";

  // Show loading state
  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading... | {companyName}</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading contact page...</p>
        </div>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <Helmet>
          <title>Error | {companyName}</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div style={styles.errorContainer}>
          <div style={styles.errorIcon}>⚠️</div>
          <h3 style={styles.errorTitle}>Failed to Load Contact Page</h3>
          <p style={styles.errorText}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={styles.retryButton}
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* ============ SEO HELMET ============ */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={companyName} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={companyName} />
        <meta property="og:locale" content="en_ZA" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#509b9e" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* JSON-LD Structured Data - ContactPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact " + companyName,
            "description": pageDescription,
            "url": pageUrl,
            "mainEntity": {
              "@type": "Organization",
              "name": companyName,
              "url": siteUrl,
              "email": info.email || "info@insphired.co.za",
              "telephone": info.phone || "+27 XX XXX XXXX",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["English"],
                "areaServed": "ZA"
              }
            }
          })}
        </script>

        {/* Contact Form Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebForm",
            "name": "Contact Form",
            "description": "Contact form for recruitment and career inquiries",
            "potentialAction": {
              "@type": "CommunicateAction",
              "about": "Contact us for recruitment and career services"
            }
          })}
        </script>
      </Helmet>

      {/* ============ SCHEMA COMPONENTS ============ */}
      <OrganizationSchema />
      <BreadcrumbSchema 
        items={[
          { name: 'Home', url: siteUrl }, 
          { name: 'Contact', url: pageUrl }
        ]} 
      />

      {/* ============ MAIN CONTENT ============ */}
      <div style={styles.pageWrapper}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');

          /* Accessibility */
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
          }

          a:focus-visible,
          button:focus-visible,
          input:focus-visible,
          select:focus-visible,
          textarea:focus-visible {
            outline: 2px solid #509b9e;
            outline-offset: 2px;
          }

          /* ── UNIFIED HERO STYLE (Matches About Page) ── */
          .hero-section {
            background: linear-gradient(145deg, #1a2e38 0%, #0f1e26 100%);
            color: #ffffff;
            padding: 130px 0 100px;
            position: relative;
            overflow: hidden;
            border-bottom: 4px solid rgba(80, 155, 158, 0.3);
          }

          /* ── HERO EYEBROW - Clean, No Effects ── */
          .hero-eyebrow {
            display: inline-block;
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--teal, #509b9e);
            background: rgba(80, 155, 158, 0.15);
            padding: 6px 16px;
            border-radius: 20px;
            margin-bottom: 20px;
            border: 1px solid rgba(80, 155, 158, 0.15);
          }

          /* ── HERO HEADING - Pure White, No Effects ── */
          .hero-heading {
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: clamp(2.2rem, 4vw, 3rem);
            font-weight: 700;
            color: #ffffff;
            line-height: 1.2;
            letter-spacing: -0.02em;
            margin: 0 0 20px 0;
          }

          /* ── HERO DESCRIPTION - Clean, No Effects ── */
          .hero-description {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.75);
            line-height: 1.75;
            max-width: 560px;
            margin-bottom: 24px;
          }

          /* ── 3D HEADING SYSTEM (For body content only) ── */
          .title-3d {
            display: block;
            font-family: 'Playfair Display', Georgia, serif !important;
            font-weight: 700;
            color: #1f3540;
            margin-bottom: 12px;
            letter-spacing: -0.02em;
            position: relative;
            text-shadow: 
              0 2px 4px rgba(0, 0, 0, 0.05),
              0 8px 16px rgba(80, 155, 158, 0.08),
              0 12px 32px rgba(0, 0, 0, 0.04);
            transform: translateY(-4px);
            background: linear-gradient(180deg, #1f3540 30%, #3a5a6b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 4px 8px rgba(31, 53, 64, 0.15));
          }

          .title-section {
            font-size: clamp(2rem, 3.5vw, 2.8rem);
            line-height: 1.2;
          }

          /* ── BODY EYEBROW ── */
          .eyebrow-3d {
            display: inline-block;
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--teal, #509b9e);
            background: rgba(80, 155, 158, 0.1);
            padding: 6px 16px;
            border-radius: 20px;
            margin-bottom: 16px;
            border: 1px solid rgba(80, 155, 158, 0.15);
          }

          /* ── 3D METALLIC BUTTONS ── */
          .btn-3d-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 14px 32px;
            font-family: inherit;
            font-size: 0.95rem;
            font-weight: 700;
            text-decoration: none;
            border-radius: 50px;
            cursor: pointer;
            letter-spacing: 0.3px;
            position: relative;
            transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.3s ease;
            transform: translateY(-3px);
            border: none;
            color: #ffffff;
            background: linear-gradient(180deg, #62b1b4 0%, #509b9e 45%, #39797c 100%);
            border: 1px solid #73c8cb;
            box-shadow: 
              inset 0 1px 1px rgba(255, 255, 255, 0.6),
              inset 0 -2px 4px rgba(0, 0, 0, 0.25),
              0 4px 0 #285759,
              0 8px 15px rgba(31, 53, 64, 0.25);
            text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.3);
          }

          .btn-3d-primary:hover {
            background: linear-gradient(180deg, #6bc0c3 0%, #54a5a8 45%, #3d8386 100%);
            transform: translateY(-5px);
            box-shadow: 
              inset 0 1px 1px rgba(255, 255, 255, 0.7),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2),
              0 6px 0 #285759,
              0 12px 20px rgba(80, 155, 158, 0.35);
          }

          .btn-3d-primary:active {
            transform: translateY(1px) !important;
            box-shadow: 
              inset 0 2px 4px rgba(0, 0, 0, 0.3),
              0 0 0 transparent,
              0 3px 6px rgba(0, 0, 0, 0.2) !important;
          }

          .btn-3d-secondary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 14px 32px;
            font-family: inherit;
            font-size: 0.95rem;
            font-weight: 700;
            text-decoration: none;
            border-radius: 50px;
            cursor: pointer;
            letter-spacing: 0.3px;
            position: relative;
            transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.3s ease;
            transform: translateY(-3px);
            border: none;
            color: #ffffff;
            background: transparent;
            border: 1.5px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 4px 0 rgba(255, 255, 255, 0.1);
            text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
          }

          .btn-3d-secondary:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: translateY(-5px);
            box-shadow: 0 6px 0 rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.5);
          }

          .btn-3d-secondary:active {
            transform: translateY(1px) !important;
            box-shadow: 0 2px 0 rgba(255, 255, 255, 0.05) !important;
          }

          .Contact-input, .Contact-select, .Contact-textarea {
            transition: border-color var(--transition), box-shadow var(--transition);
          }
          .Contact-input:focus, .Contact-select:focus, .Contact-textarea:focus {
            outline: none;
            border-color: var(--teal) !important;
            box-shadow: 0 0 0 3px rgba(80, 155, 158, 0.15);
          }

        @media (max-width: 900px) {
          .Contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

        {/* ── HERO ── */}
        <header className="hero-section" role="banner">
          <div style={styles.container}>
            <div style={styles.heroContent}>
              <span className="hero-eyebrow">{hero.tag || 'Request a Contact'}</span>
              <h2 className="hero-heading">
                {hero.title || "We'd love to learn more about your needs"}
              </h2>
              <p className="hero-description">
                {hero.description || "Whether you're looking for recruitment solutions, executive search, verification services, or workforce strategy support, our team is ready to assist."}
              </p>
            </div>
          </div>
        </header>

        {/* FORM SECTION */}
        <section style={styles.section} aria-labelledby="contact-heading">
          <div style={styles.container}>
            <div style={styles.contactGrid} className="Contact-grid">

              {/* FORM */}
              <div style={styles.formCard}>
                <span className="eyebrow-3d">Let's talk</span>
                <h2 id="contact-heading" className="title-3d title-section">Request your Contact</h2>

                <form onSubmit={handleSubmit} noValidate>
                  <label htmlFor="name" className="sr-only">Full name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={placeholders.name || 'Full name *'}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    className="Contact-input"
                    aria-required="true"
                  />

                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={placeholders.email || 'Email address *'}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    className="Contact-input"
                    aria-required="true"
                  />

                  <label htmlFor="phone" className="sr-only">Phone number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder={placeholders.phone || 'Phone number *'}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    className="Contact-input"
                    aria-required="true"
                  />

                  <label htmlFor="company" className="sr-only">Company name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder={placeholders.company || 'Company name'}
                    value={formData.company}
                    onChange={handleChange}
                    style={styles.input}
                    className="Contact-input"
                  />

                  <label htmlFor="position" className="sr-only">Job title</label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    placeholder={placeholders.position || 'Job title'}
                    value={formData.position}
                    onChange={handleChange}
                    style={styles.input}
                    className="Contact-input"
                  />

                  <label htmlFor="service" className="sr-only">Service</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    style={styles.input}
                    className="Contact-select"
                    required
                    aria-required="true"
                  >
                    <option value="">{placeholders.service || 'Select service'}</option>
                    {serviceOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>

                  <label htmlFor="ContactTime" className="sr-only">Preferred Contact time</label>
                  <select
                    id="ContactTime"
                    name="ContactTime"
                    value={formData.ContactTime}
                    onChange={handleChange}
                    style={styles.input}
                    className="Contact-select"
                  >
                    <option value="">{placeholders.ContactTime || 'Preferred Contact time'}</option>
                    {timeOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>

                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder={placeholders.message || 'Tell us more about your needs...'}
                    value={formData.message}
                    onChange={handleChange}
                    style={styles.textarea}
                    className="Contact-textarea"
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-3d-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {submitting ? 'Submitting...' : 'Request Contact'}
                  </button>
                </form>
              </div>

            {/* INFO CARD */}
            <div style={styles.infoCard}>
              <h3 className="title-3d" style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Need immediate assistance?</h3>

              <div style={styles.infoItem}>
                <span style={styles.infoIcon}><i className="fas fa-envelope" aria-hidden="true"></i></span>
                {info.email || 'info@insphired.co.za'}
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoIcon}><i className="fas fa-phone" aria-hidden="true"></i></span>
                {info.phone || '+27 XX XXX XXXX'}
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoIcon}><i className="fas fa-clock" aria-hidden="true"></i></span>
                {info.hours_title || 'Monday - Friday'}
                <br />
                {info.hours_time || '08:00 - 17:00'}
              </div>

                <a
                  href={info.booking_url || 'https://bookings.cloud.microsoft/book/LandrysDiary@insphired.co.za/?ismsaljsauthenabled=true'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {info.booking_text || 'Schedule consultation'}
                </a>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const styles = {
  pageWrapper: {
    color: 'var(--navy)',
    backgroundColor: 'var(--bg)',
  },

  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 32px'
  },

  heroContent: {
    maxWidth: '750px',
    position: 'relative',
    zIndex: 2,
  },

  section: {
    padding: '100px 0'
  },

  contactGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '40px'
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: 'var(--radius-card)',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--border-light)',
  },

  input: {
    width: '100%',
    padding: '16px',
    marginBottom: '20px',
    borderRadius: '12px',
    border: '1px solid var(--border-light)',
    fontSize: '1rem',
    backgroundColor: 'var(--bg)',
    color: 'var(--navy)',
    fontFamily: 'inherit',
  },

  textarea: {
    width: '100%',
    minHeight: '180px',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid var(--border-light)',
    marginBottom: '24px',
    resize: 'vertical',
    backgroundColor: 'var(--bg)',
    color: 'var(--navy)',
    fontFamily: 'inherit',
    fontSize: '1rem',
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: 'var(--radius-card)',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--border-light)',
    height: 'fit-content'
  },

  infoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '24px',
    color: '#5B6670',
    lineHeight: 1.8
  },

  infoLink: {
    color: 'var(--teal)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    ':hover': {
      color: '#3d8386',
      textDecoration: 'underline'
    }
  },

  infoIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(80, 155, 158, 0.12)',
    color: 'var(--teal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '0.85rem',
    marginTop: '2px',
  },

  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#faf6f0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },

  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #e5dfd5',
    borderTop: '3px solid #509b9e',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  },

  loadingText: {
    marginTop: '16px',
    color: '#7a8790',
    fontSize: '14px'
  },

  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#faf6f0',
    padding: '40px 20px',
    textAlign: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },

  errorIcon: { fontSize: '48px', marginBottom: '16px' },
  errorTitle: { fontSize: '22px', fontWeight: 700, color: '#1f3540', margin: '0 0 8px 0' },
  errorText: { color: '#d96b43', fontSize: '16px', marginBottom: '24px' },
  retryButton: {
    padding: '14px 40px',
    backgroundColor: '#509b9e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    boxShadow: '0 4px 15px rgba(80, 155, 158, 0.3)'
  }
};

// Add keyframes for spinner animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default ContactPage;