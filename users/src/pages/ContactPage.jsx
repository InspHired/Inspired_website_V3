import React, { useState } from 'react';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { error } = await supabase
        .from('Contact_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            position: formData.position,
            service: formData.service,
            Contact_time: formData.ContactTime,
            message: formData.message
          }
        ]);

      if (error) {
        console.error(error);
        alert('Failed to submit request.');
        return;
      }

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
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

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
            <span style={styles.heroTag}>Request a Contact</span>

            <h1 style={styles.heroTitle}>
              We'd love to learn more about your needs
            </h1>

            <p style={styles.heroText}>
              Whether you're looking for recruitment solutions,
              executive search, verification services, or workforce
              strategy support, our team is ready to assist.
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
                  placeholder="Full name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  className="Contact-input"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email address *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  className="Contact-input"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  className="Contact-input"
                />

                <input
                  type="text"
                  name="company"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={handleChange}
                  style={styles.input}
                  className="Contact-input"
                />

                <input
                  type="text"
                  name="position"
                  placeholder="Job title"
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
                  <option value="">Select service</option>
                  <option>Recruitment Services</option>
                  <option>Executive Search</option>
                  <option>Verification Services</option>
                  <option>Career Lab Services</option>
                  <option>General Enquiry</option>
                </select>

                <select
                  name="ContactTime"
                  value={formData.ContactTime}
                  onChange={handleChange}
                  style={styles.input}
                  className="Contact-select"
                >
                  <option value="">Preferred Contact time</option>
                  <option>Morning (08:00 - 12:00)</option>
                  <option>Afternoon (12:00 - 17:00)</option>
                  <option>Any time</option>
                </select>

                <textarea
                  name="message"
                  placeholder="Tell us more about your needs..."
                  value={formData.message}
                  onChange={handleChange}
                  style={styles.textarea}
                  className="Contact-textarea"
                />

                <button
                  type="submit"
                  disabled={loading}
                  style={styles.primaryBtn}
                  className="Contact-primary-btn"
                >
                  {loading ? 'Submitting...' : 'Request Contact'}
                </button>
              </form>
            </div>

            {/* INFO CARD */}
            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Need immediate assistance?</h3>

              <div style={styles.infoItem}>
                <span style={styles.infoIcon}><i className="fas fa-envelope" aria-hidden="true"></i></span>
                info@insphired.co.za
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoIcon}><i className="fas fa-phone" aria-hidden="true"></i></span>
                +27 XX XXX XXXX
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoIcon}><i className="fas fa-clock" aria-hidden="true"></i></span>
                Monday - Friday
                <br />
                08:00 - 17:00
              </div>

              <a
                href="https://bookings.cloud.microsoft/book/LandrysDiary@insphired.co.za/?ismsaljsauthenabled=true"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.secondaryBtn}
                className="Contact-secondary-btn"
              >
                Schedule consultation
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
  }
};

export default ContactPage;