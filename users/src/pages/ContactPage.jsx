// users/src/pages/ContactPage.jsx
import React, { useState, useEffect } from 'react';
import { publicApi } from '../services/api';
import Footer from '../components/Footer';
import useWeb3Forms from '@web3forms/react';

const ContactPage = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

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

  // Web3Forms configuration
  const { submit } = useWeb3Forms({
    access_key:'635d93a9-3b33-4efa-8e41-22fe6f5adbac',
    settings: {
      from_name: 'Insphired Website',
      subject: 'New Contact Form Submission',
    },
    onSuccess: (message, data) => {
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Our team will contact you shortly.'
      });
      // Reset form
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
      setSubmitting(false);
    },
    onError: (message, data) => {
      setSubmitStatus({
        type: 'error',
        message: message || 'Failed to submit form. Please try again.'
      });
      setSubmitting(false);
    },
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

  // Clear status message after 5 seconds
  useEffect(() => {
    if (submitStatus.message) {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: '', message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Send form data using Web3Forms
      await submit(formData);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.'
      });
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

  // Map configuration with your office address
  const mapConfig = {
    address: info.address || 'Block D, La Rocca Business Park, 321 Main Road, Bryanston, Johannesburg, 2191',
    latitude: info.latitude || -26.0581,
    longitude: info.longitude || 28.0245,
    zoom: 16
  };

  // Show loading state
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading contact page...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
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
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');

        .hero-section {
          background: linear-gradient(145deg, #1a2e38 0%, #0f1e26 100%);
          color: #ffffff;
          padding: 130px 0 100px;
          position: relative;
          overflow: hidden;
          border-bottom: 4px solid rgba(80, 155, 158, 0.3);
        }

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

        .hero-heading {
          font-family: 'Playfair Display', Georgia, serif !important;
          font-size: clamp(2.2rem, 4vw, 3rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0 0 20px 0;
        }

        .hero-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.75;
          max-width: 560px;
          margin-bottom: 24px;
        }

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

        /* Status message styles */
        .status-success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .status-error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .map-container {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.06);
          position: relative;
          background: #f0f2f5;
        }

        .map-container iframe {
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
        }

        @media (max-width: 900px) {
          .Contact-grid { 
            grid-template-columns: 1fr !important; 
          }
          .hero-section {
            padding: 100px 0 60px;
          }
        }

        @media (max-width: 600px) {
          .map-container {
            height: 200px !important;
          }
        }
      `}</style>

      {/* ── HERO ── */}
      <header className="hero-section">
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <span className="hero-eyebrow">{hero.tag || 'Request a Contact'}</span>
            <h1 className="hero-heading">
              {hero.title || "We'd love to learn more about your needs"}
            </h1>
            <p className="hero-description">
              {hero.description || "Whether you're looking for recruitment solutions, executive search, verification services, or workforce strategy support, our team is ready to assist."}
            </p>
          </div>
        </div>
      </header>

      {/* FORM SECTION */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.contactGrid} className="Contact-grid">

            {/* FORM */}
            <div style={styles.formCard}>
              <span className="eyebrow-3d">Let's talk</span>
              <h2 className="title-3d title-section">Request your Contact</h2>

              {/* Status Message Display */}
              {submitStatus.message && (
                <div className={submitStatus.type === 'success' ? 'status-success' : 'status-error'}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder={placeholders.name || 'Full name *'}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  className="Contact-input"
                />

                <input
                  type="email"
                  name="email"
                  placeholder={placeholders.email || 'Email address *'}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  className="Contact-input"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder={placeholders.phone || 'Phone number *'}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  className="Contact-input"
                />

                <input
                  type="text"
                  name="company"
                  placeholder={placeholders.company || 'Company name'}
                  value={formData.company}
                  onChange={handleChange}
                  style={styles.input}
                  className="Contact-input"
                />

                <input
                  type="text"
                  name="position"
                  placeholder={placeholders.position || 'Job title'}
                  value={formData.position}
                  onChange={handleChange}
                  style={styles.input}
                  className="Contact-input"
                />

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  style={styles.input}
                  className="Contact-select"
                  required
                >
                  <option value="">{placeholders.service || 'Select service'}</option>
                  {serviceOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>

                <select
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

                <textarea
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

            {/* INFO CARD WITH STATIC MAP */}
            <div style={styles.infoCard}>
              <h3 className="title-3d" style={{ fontSize: '1.5rem', marginBottom: '24px' }}>
                Need immediate assistance?
              </h3>

              <div style={styles.infoItem}>
                <span style={styles.infoIcon}>
                  <i className="fas fa-envelope" aria-hidden="true"></i>
                </span>
                {info.email || 'info@insphired.co.za'}
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoIcon}>
                  <i className="fas fa-phone" aria-hidden="true"></i>
                </span>
                {info.phone || '+27 11 463 5540'}
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoIcon}>
                  <i className="fas fa-clock" aria-hidden="true"></i>
                </span>
                {info.hours_title || 'Monday - Friday'}
                <br />
                {info.hours_time || '08:00 - 17:00'}
              </div>

              {/* Address with map link */}
              <div style={styles.infoItem}>
                <span style={styles.infoIcon}>
                  <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                </span>
                <div>
                  <div style={{ marginBottom: '8px', lineHeight: '1.5' }}>
                    <strong>Block D</strong>, La Rocca Business Park<br />
                    321 Main Road, Bryanston<br />
                    Johannesburg, 2191
                  </div>
                  <a
                    href={`https://www.google.com/maps?q=${mapConfig.latitude},${mapConfig.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#509b9e',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>

              {/* STATIC MAP - No API Key Required */}
              <div style={{ marginBottom: '24px' }}>
                <div className="map-container" style={{ height: '250px' }}>
                  <iframe
                    title="Insphired Office Location - Bryanston, Johannesburg"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mapConfig.address)}&z=${mapConfig.zoom}&output=embed&hl=en`}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
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

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default ContactPage;