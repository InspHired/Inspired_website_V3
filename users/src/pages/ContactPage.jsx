// users/src/pages/ContactPage.jsx
import React, { useState, useEffect } from 'react';
import { publicApi } from '../services/api';
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
        .Contact-input, .Contact-select, .Contact-textarea {
          transition: border-color var(--transition), box-shadow var(--transition);
        }
        .Contact-input:focus, .Contact-select:focus, .Contact-textarea:focus {
          outline: none;
          border-color: var(--teal) !important;
          box-shadow: 0 0 0 3px rgba(80, 155, 158, 0.15);
        }
        .Contact-primary-btn { transition: transform var(--transition), opacity var(--transition); }
        .Contact-primary-btn:hover:not(:disabled) { transform: translateY(-2px); opacity: 0.95; }
        .Contact-primary-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .Contact-secondary-btn { transition: all var(--transition); }
        .Contact-secondary-btn:hover { background-color: var(--teal); color: #FFFFFF !important; }

        @media (max-width: 900px) {
          .Contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HERO */}
      <header style={styles.hero}>
        <div style={styles.heroOverlay}></div>

        <div style={styles.container}>
          <div style={styles.heroContent}>
            <span style={styles.heroTag}>{hero.tag || 'Request a Contact'}</span>

            <h1 style={styles.heroTitle}>
              {hero.title || "We'd love to learn more about your needs"}
            </h1>

            <p style={styles.heroText}>
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
              <span style={styles.sectionTag}>Let's talk</span>
              <h2 style={styles.formTitle}>Request your Contact</h2>

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
                  style={styles.primaryBtn}
                  className="Contact-primary-btn"
                >
                  {submitting ? 'Submitting...' : 'Request Contact'}
                </button>
              </form>
            </div>

            {/* INFO CARD */}
            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Need immediate assistance?</h3>

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
                style={styles.secondaryBtn}
                className="Contact-secondary-btn"
              >
                {info.booking_text || 'Schedule consultation'}
              </a>
            </div>

          </div>
        </div>
      </section>

      <Footer />
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

  hero: {
    background: 'var(--navy)',
    color: '#FFFFFF',
    padding: '140px 0 100px',
    position: 'relative',
    overflow: 'hidden',
  },

  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(90deg, rgba(31,53,64,0.96), rgba(31,53,64,0.75))'
  },

  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '750px'
  },

  heroTag: {
    display: 'inline-block',
    backgroundColor: 'rgba(80, 155, 158, 0.18)',
    color: 'var(--teal)',
    border: '1px solid rgba(80, 155, 158, 0.35)',
    padding: '8px 18px',
    borderRadius: '40px',
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '20px'
  },

  heroTitle: {
    fontSize: '3.4rem',
    fontWeight: 700,
    marginBottom: '24px',
    letterSpacing: '-1px',
    lineHeight: 1.15,
  },

  heroText: {
    fontSize: '1.15rem',
    lineHeight: 1.8,
    color: 'rgba(255,255,255,0.75)',
  },

  section: {
    padding: '100px 0'
  },

  sectionTag: {
    color: 'var(--teal)',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: '2px',
    display: 'block',
    marginBottom: '8px',
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

  formTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '30px',
    color: 'var(--navy)'
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

  infoTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '24px',
    color: 'var(--navy)'
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

  primaryBtn: {
    backgroundColor: 'var(--teal)',
    color: '#FFFFFF',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '40px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '1rem',
  },

  secondaryBtn: {
    display: 'inline-block',
    marginTop: '20px',
    textDecoration: 'none',
    border: '2px solid var(--teal)',
    color: 'var(--teal)',
    padding: '14px 28px',
    borderRadius: '40px',
    fontWeight: 700,
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