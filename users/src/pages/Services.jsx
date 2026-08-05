// users/src/pages/ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import { publicApi } from '../services/api';
import Footer from '../components/Footer';

/* ── SERVICES VISUAL STAGE ── */
function ServicePillarsCanvas() {
  return (
    <div className="pillar-canvas-container">
      <div className="glow-sphere teal-glow"></div>
      <div className="glow-sphere orange-glow"></div>

      <div className="pillar-stage-card">
        <div className="floating-pillar-item float-1">
          <div className="icon-frame teal-border">
            <i className="fas fa-user-tie" aria-hidden="true"></i>
          </div>
          <div className="pillar-badge">
            <span className="badge-dot teal"></span> Executive Search
          </div>
        </div>

        <div className="floating-pillar-item float-2">
          <div className="icon-frame orange-border">
            <i className="fas fa-shield-alt" aria-hidden="true"></i>
          </div>
          <div className="pillar-badge">
            <span className="badge-dot orange"></span> Verification
          </div>
        </div>

        <div className="floating-pillar-item float-3">
          <div className="icon-frame yellow-border">
            <i className="fas fa-users" aria-hidden="true"></i>
          </div>
          <div className="pillar-badge">
            <span className="badge-dot yellow"></span> Bulk Staffing
          </div>
        </div>

        <div className="center-metallic-core">
          <div className="core-pulse-ring"></div>
          <div className="core-brand-tag">
            <span className="core-number">06</span>
            <span className="core-label">Core Solutions</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const ServicesPage = () => {
  const [servicesData, setServicesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Fetch services data directly from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await publicApi.getServices();
        
        if (response.success && response.data) {
          setServicesData(response.data);
          setError(null);
        } else {
          setError(response.error || 'Failed to load services');
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message || 'Error loading services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Default services data (fallback)
  const defaultServices = [
    {
      number: '01',
      title: 'Recruitment Process Outsourcing (RPO)',
      text: 'We take hiring off your plate — managing the entire recruitment process from start to finish, so your team can focus on running the business.',
      accent: 'var(--teal)',
    },
    {
      number: '02',
      title: 'Executive Recruitment',
      text: 'We find and place senior leaders who can genuinely move your business forward, drawing on a deep network built specifically for executive-level hiring.',
      accent: 'var(--orange)',
    },
    {
      number: '03',
      title: 'Specialist Skill Recruitment',
      text: 'For roles that need specific technical expertise — in Engineering, IT, Healthcare, or Finance — we source candidates with the exact credentials the role demands.',
      accent: 'var(--yellow)',
    },
    {
      number: '04',
      title: 'Targeted Headhunting',
      text: "We reach the strongest candidates — the ones not actively job-hunting — and vet them carefully for both skill and cultural fit before they ever reach you.",
      accent: 'var(--navy)',
    },
    {
      number: '05',
      title: 'Bulk & Contract Staffing',
      text: "Scale your workforce quickly for seasonal peaks or big project launches. We handle the payroll and admin, so growth doesn't mean extra overhead.",
      accent: 'var(--teal)',
    },
    {
      number: '06',
      title: 'Efficient Temp Recruitment',
      text: 'Request, track, and manage vetted temporary staff through our staffing app — built for speed, including same-day deployment when you need it.',
      accent: 'var(--orange)',
    },
  ];

  const defaultScreeningItems = [
    { title: 'Biometric criminal checks', text: 'Secure digital identity clearance.', icon: 'fa-fingerprint' },
    { title: 'ID, work permits & driver\'s licenses', text: 'Strict regional legal validations.', icon: 'fa-id-card' },
    { title: 'Education qualifications', text: 'Direct authentication with academic bodies.', icon: 'fa-graduation-cap' },
    { title: 'Employment references', text: 'Complete audio recorded historical verifications.', icon: 'fa-history' },
    { title: 'Interview assistance panels', text: 'Expert cross-examinations for target roles.', icon: 'fa-users' },
  ];

  // Use data from API or fallback to defaults
  const data = servicesData || {};
  const hero = data.hero || {};
  const skillsTraining = data.skillsTraining || {};

  const services = data.offerings && data.offerings.length > 0 
    ? data.offerings.map((item, index) => ({
        number: item.service_number || `0${index + 1}`,
        title: item.title || defaultServices[index]?.title || '',
        text: item.description || defaultServices[index]?.text || '',
        accent: item.accent_color || defaultServices[index]?.accent || 'var(--teal)',
      }))
    : defaultServices;

  const screeningItems = data.screening && data.screening.length > 0
    ? data.screening.map(item => ({
        title: item.title || '',
        text: item.description || '',
        icon: item.icon_class || 'fa-check',
      }))
    : defaultScreeningItems;

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  // Show loading state
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading services...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorIcon}>⚠️</div>
        <h3 style={styles.errorTitle}>Failed to Load Services</h3>
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

        /* ── 3D HEADING SYSTEM ── */
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

        .title-hero {
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          line-height: 1.1;
        }

        .title-section {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          line-height: 1.2;
        }

        .title-sub {
          font-size: clamp(1.4rem, 2vw, 1.8rem);
          line-height: 1.3;
        }

        .title-small {
          font-size: clamp(1.1rem, 1.5vw, 1.3rem);
          line-height: 1.4;
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

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeup { animation: fadeInUp 0.6s ease-out forwards; }

        .service-card {
          transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition) !important;
        }
        .service-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: var(--shadow-md) !important;
        }

        .btn-hover-transition { transition: all var(--transition) !important; }
        .btn-hover-transition:hover { transform: translateY(-2px) !important; opacity: 0.95; }

        .screening-item { transition: background-color var(--transition), border-color var(--transition) !important; }
        .screening-item:hover {
          background-color: var(--bg) !important;
          border-color: rgba(80, 155, 158, 0.35) !important;
        }

        /* ── SERVICE PILLARS CANVAS CSS ── */
        .pillar-canvas-container {
          position: relative;
          width: 100%;
          min-height: 440px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .pillar-stage-card {
          position: relative;
          width: 100%;
          max-width: 460px;
          height: 400px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.4),
            inset 0 1px 1px rgba(255, 255, 255, 0.2);
          transform-style: preserve-3d;
          transform: rotateX(4deg) rotateY(-4deg);
          transition: transform 0.5s ease;
        }
        .pillar-stage-card:hover {
          transform: rotateX(0deg) rotateY(0deg) scale(1.02);
        }

        .glow-sphere {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
        }
        .teal-glow { background: #509b9e; top: -20px; left: -20px; }
        .orange-glow { background: #d96b43; bottom: -20px; right: -20px; }

        .floating-pillar-item {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .float-1 { top: 20px; left: 25px; animation: floatAnim 4s ease-in-out infinite; }
        .float-2 { top: 35px; right: 25px; animation: floatAnim 4.8s ease-in-out infinite 0.8s; }
        .float-3 { bottom: 25px; left: 50%; transform: translateX(-50%); animation: floatAnim 4.2s ease-in-out infinite 1.5s; }

        @keyframes floatAnim {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .icon-frame {
          width: 86px;
          height: 86px;
          border-radius: 50%;
          box-shadow: 0 10px 25px rgba(0,0,0,0.35);
          overflow: hidden;
          background: #1f3540;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          color: #ffffff;
        }
        .teal-border { border: 2px solid #509b9e; }
        .orange-border { border: 2px solid #d96b43; }
        .yellow-border { border: 2px solid #e4af51; }

        .pillar-badge {
          background: rgba(15, 27, 34, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.72rem;
          color: #ffffff;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          white-space: nowrap;
        }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; }
        .badge-dot.teal { background: #509b9e; }
        .badge-dot.orange { background: #d96b43; }
        .badge-dot.yellow { background: #e4af51; }

        .center-metallic-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background: radial-gradient(circle, #2a4554 0%, #172831 100%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.6);
        }
        .core-pulse-ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px dashed rgba(228, 175, 81, 0.4);
          animation: rotateCore 14s linear infinite;
        }
        @keyframes rotateCore {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .core-brand-tag { text-align: center; display: flex; flex-direction: column; }
        .core-number { font-size: 1.5rem; font-weight: 800; color: #e4af51; }
        .core-label {
          font-size: 0.58rem;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.5px;
        }

        /* ── SUBSCRIBE BUTTON 3D METALLIC EFFECT ── */
        .subscribe-btn {
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

        .subscribe-btn:hover {
          background: linear-gradient(180deg, #6bc0c3 0%, #54a5a8 45%, #3d8386 100%);
          transform: translateY(-5px);
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.7),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2),
            0 6px 0 #285759,
            0 12px 20px rgba(80, 155, 158, 0.35);
        }

        .subscribe-btn:active {
          transform: translateY(1px) !important;
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.3),
            0 0 0 transparent,
            0 3px 6px rgba(0, 0, 0, 0.2) !important;
        }

        .subscribe-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: translateY(0) !important;
        }

        /* ── SUBSCRIBE INPUT ── */
        .subscribe-input {
          padding: 14px 20px;
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.06);
          color: #FFFFFF;
          font-size: 0.95rem;
          min-width: 260px;
          outline: none;
          transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
          font-family: inherit;
        }

        .subscribe-input:focus {
          border-color: var(--teal, #509b9e) !important;
          background: rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 0 0 4px rgba(80, 155, 158, 0.15);
        }

        .subscribe-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 900px) {
          .empower-grid { grid-template-columns: 1fr !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual-wrap { margin-top: 30px; }
          .subscribe-row { flex-direction: column !important; }
          .subscribe-row input, .subscribe-row button { width: 100% !important; }
          .service-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <header style={styles.hero}>
        <div style={styles.container}>
          <div className="hero-grid" style={styles.heroGrid}>
            <div style={styles.heroContent} className="animate-fadeup">
              <span className="eyebrow-3d">{hero.tag || 'What we do'}</span>
              <h1 className="title-3d" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', lineHeight: 1.2 }}>
                {hero.title || 'Our services'}
              </h1>
              <p style={styles.heroLead}>
                {hero.description || 'A full ecosystem of recruitment solutions — from executive search to volume placement, candidate development, and background verification — built to solve every part of the hiring challenge.'}
              </p>

              <div style={styles.heroStats}>
                <div style={styles.heroStat}>
                  <span style={styles.heroStatNumber}>06</span>
                  <span style={styles.heroStatLabel}>Core solutions</span>
                </div>
                <div style={styles.heroStatDivider}></div>
                <div style={styles.heroStat}>
                  <span style={styles.heroStatNumber}>05</span>
                  <span style={styles.heroStatLabel}>Screening checks</span>
                </div>
                <div style={styles.heroStatDivider}></div>
                <div style={styles.heroStat}>
                  <span style={styles.heroStatNumber}>
                    <i className="fas fa-map-marker-alt" style={{ fontSize: '1.1rem' }} aria-hidden="true"></i>
                  </span>
                  <span style={styles.heroStatLabel}>South Africa</span>
                </div>
              </div>
            </div>

            <div className="hero-visual-wrap" style={styles.heroVisualWrap}>
              <ServicePillarsCanvas />
            </div>
          </div>
        </div>
      </header>

      {/* ── CORE SOLUTIONS ── */}
      <section style={styles.sectionWhite}>
        <div style={styles.container}>
          <div style={styles.centerHead}>
            <span className="eyebrow-3d" style={{ marginBottom: '8px' }}>Core solutions</span>
            <h2 className="title-3d title-section">Professional recruitment ecosystems</h2>
            <p style={styles.sectionSub}>
              Streamlined frameworks structured to handle everything from executive search pipelines to volume placement logistics.
            </p>
          </div>

          <div style={styles.serviceGrid}>
            {services.map((s) => (
              <div
                key={s.number}
                style={{ ...styles.serviceCard, borderTop: `4px solid ${s.accent}` }}
                className="service-card"
                onMouseEnter={() => setHoveredService(s.number)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <span style={{ ...styles.serviceNumber, color: hoveredService === s.number ? s.accent : 'rgba(31, 53, 64, 0.08)' }}>
                  {s.number}
                </span>
                <h3 className="title-3d" style={{ fontSize: '1.15rem', marginBottom: '12px' }}>{s.title}</h3>
                <p style={styles.serviceText}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMPOWERING CANDIDATES ── */}
      <section style={styles.sectionLight}>
        <div style={styles.container}>
          <div className="empower-grid" style={styles.empowerGrid}>
            <div>
              <span className="eyebrow-3d" style={{ marginBottom: '8px' }}>Empowering candidates</span>
              <h2 className="title-3d title-section">{skillsTraining.title || 'Skills training & development'}</h2>
              <p style={styles.empowerText}>
                {skillsTraining.description || 'We give candidates the practical skills, confidence, and market knowledge to walk into a new role ready to succeed from day one.'}
              </p>
              <div style={styles.btnRow}>
                <a
                  href={skillsTraining.cta_primary_url || 'https://calendly.com/recruitment-insphired/book-a-consultation-with-a-client-relationship-manager?month=2026-05'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.btnPrimary}
                  className="btn-hover-transition"
                >
                  {skillsTraining.cta_primary_text || 'Book consultation'}
                </a>
                <a
                  href={skillsTraining.cta_secondary_url || 'https://insphired.jobs/contact-me-form/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.btnSecondary}
                  className="btn-hover-transition"
                >
                  {skillsTraining.cta_secondary_text || 'Request call back'}
                </a>
              </div>
            </div>

            <div style={styles.empowerVisual}>
              <div style={styles.empowerVisualCard}>
                <div style={styles.empowerIconWrap}>
                  <i className="fas fa-chalkboard-teacher" aria-hidden="true"></i>
                </div>
                <p className="title-3d" style={{ fontSize: '1.15rem', marginBottom: '10px' }}>
                  {skillsTraining.visual_title || 'Training that sticks'}
                </p>
                <p style={styles.empowerVisualText}>
                  {skillsTraining.visual_description || 'Practical, role-ready skills — not just theory — so candidates walk into day one prepared.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RISK MANAGEMENT / SCREENING ── */}
      <section style={styles.sectionWhite}>
        <div style={styles.container}>
          <div style={styles.centerHead}>
            <span className="eyebrow-3d" style={{ marginBottom: '8px' }}>Risk management</span>
            <h2 className="title-3d title-section">Employment verification & background screening</h2>
            <p style={styles.sectionSub}>
              Every candidate we place is thoroughly vetted, so you can hire with full confidence and protect what makes your workplace work.
            </p>
          </div>

          <div style={styles.screeningList}>
            {screeningItems.map((item, i) => (
              <div key={item.title || i} style={styles.screeningItem} className="screening-item">
                <div style={{ ...styles.screeningIcon, background: [`var(--teal)`, `var(--orange)`, `var(--yellow)`, `var(--navy)`, `var(--teal)`][i % 5] + '1A', color: [`var(--teal)`, `var(--orange)`, `var(--yellow)`, `var(--navy)`, `var(--teal)`][i % 5] }}>
                  <i className={`fas ${item.icon || 'fa-check'}`} aria-hidden="true"></i>
                </div>
                <div>
                  <h4 className="title-3d" style={{ fontSize: '1.02rem', marginBottom: '4px' }}>{item.title}</h4>
                  <p style={styles.screeningText}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIBE ── */}
      <section style={styles.subscribeSection}>
        <div style={styles.container}>
          <div style={styles.subscribeCard}>
            <div>
              <h3 className="title-3d" style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '8px' }}>Need one of these services?</h3>
              <p style={styles.subscribeText}>Hey there 👋 Leave your email and our team will reach out to help.</p>
            </div>

            {subscribed ? (
              <div style={styles.subscribeSuccess}>
                <i className="fas fa-check-circle" style={{ marginRight: '8px' }} aria-hidden="true"></i>
                Thanks — we'll be in touch soon!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="subscribe-row" style={styles.subscribeRow}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="subscribe-input"
                />
                <button type="submit" className="subscribe-btn">
                  Get in touch
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const styles = {
  pageWrapper: { color: 'var(--navy)', backgroundColor: 'var(--bg)', lineHeight: 1.65 },
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 32px', width: '100%' },
  hero: { 
    position: 'relative', 
    backgroundColor: 'var(--navy)', 
    padding: '130px 0 90px', 
    color: '#FFFFFF', 
    overflow: 'hidden' 
  },
  heroGrid: { 
    display: 'grid', 
    gridTemplateColumns: '1.1fr 0.9fr', 
    gap: '48px', 
    alignItems: 'center' 
  },
  heroContent: { maxWidth: '620px' },
  heroLead: { 
    fontSize: '1.1rem', 
    color: 'rgba(255,255,255,0.75)', 
    lineHeight: 1.75, 
    marginBottom: '40px', 
    maxWidth: '560px' 
  },
  heroStats: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '28px', 
    flexWrap: 'wrap' 
  },
  heroStat: { display: 'flex', flexDirection: 'column', gap: '4px' },
  heroStatNumber: { 
    fontSize: '1.7rem', 
    fontWeight: 700, 
    color: 'var(--yellow)' 
  },
  heroStatLabel: { 
    fontSize: '0.8rem', 
    color: 'rgba(255,255,255,0.6)', 
    textTransform: 'uppercase', 
    letterSpacing: '0.05em' 
  },
  heroStatDivider: { 
    width: '1px', 
    height: '36px', 
    background: 'rgba(255,255,255,0.15)' 
  },
  heroVisualWrap: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  sectionWhite: { padding: '100px 0', backgroundColor: '#FFFFFF' },
  sectionLight: { padding: '100px 0', backgroundColor: 'var(--bg)' },
  centerHead: { 
    textAlign: 'center', 
    marginBottom: '56px',
    maxWidth: '640px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  sectionSub: { 
    fontSize: '1.05rem', 
    color: '#5B6670', 
    maxWidth: '640px', 
    margin: '0 auto', 
    lineHeight: 1.6,
    marginTop: '16px',
  },
  serviceGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
    gap: '28px' 
  },
  serviceCard: { 
    background: '#FFFFFF', 
    borderRadius: 'var(--radius-card)', 
    padding: '36px 32px', 
    border: '1px solid var(--border-light)', 
    boxShadow: 'var(--shadow-sm)', 
    position: 'relative',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  serviceNumber: { 
    display: 'block', 
    fontSize: '2.4rem', 
    fontWeight: 700, 
    lineHeight: 1, 
    marginBottom: '16px', 
    transition: 'color var(--transition)' 
  },
  serviceText: { 
    fontSize: '0.94rem', 
    color: '#5B6670', 
    lineHeight: 1.65, 
    margin: 0 
  },
  empowerGrid: { 
    display: 'grid', 
    gridTemplateColumns: '1.1fr 0.9fr', 
    gap: '56px', 
    alignItems: 'center' 
  },
  empowerText: { 
    fontSize: '1.05rem', 
    color: '#5B6670', 
    lineHeight: 1.75, 
    marginBottom: '32px', 
    maxWidth: '520px' 
  },
  btnRow: { 
    display: 'flex', 
    gap: '16px', 
    flexWrap: 'wrap' 
  },
  btnPrimary: { 
    background: 'var(--teal)', 
    color: '#FFFFFF', 
    padding: '14px 28px', 
    borderRadius: '40px', 
    textDecoration: 'none', 
    fontWeight: 700, 
    fontSize: '0.95rem', 
    display: 'inline-flex', 
    alignItems: 'center', 
    boxShadow: '0 4px 14px rgba(80, 155, 158, 0.3)' 
  },
  btnSecondary: { 
    background: 'transparent', 
    color: 'var(--navy)', 
    padding: '14px 28px', 
    borderRadius: '40px', 
    textDecoration: 'none', 
    fontWeight: 700, 
    fontSize: '0.95rem', 
    display: 'inline-flex', 
    alignItems: 'center', 
    border: '1.5px solid var(--border-light)' 
  },
  empowerVisual: { display: 'flex', justifyContent: 'center' },
  empowerVisualCard: { 
    background: '#FFFFFF', 
    borderRadius: 'var(--radius-card)', 
    border: '1px solid var(--border-light)', 
    boxShadow: 'var(--shadow-md)', 
    padding: '40px', 
    maxWidth: '340px', 
    textAlign: 'center' 
  },
  empowerIconWrap: { 
    width: '56px', 
    height: '56px', 
    borderRadius: '50%', 
    background: 'rgba(80, 155, 158, 0.12)', 
    color: 'var(--teal)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: '1.4rem', 
    margin: '0 auto 20px' 
  },
  empowerVisualText: { 
    fontSize: '0.92rem', 
    color: '#5B6670', 
    lineHeight: 1.6, 
    margin: 0 
  },
  screeningList: { 
    maxWidth: '820px', 
    margin: '0 auto', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '16px' 
  },
  screeningItem: { 
    display: 'flex', 
    alignItems: 'flex-start', 
    gap: '20px', 
    background: '#FFFFFF', 
    border: '1px solid var(--border-light)', 
    borderRadius: '16px', 
    padding: '24px 28px',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },
  screeningIcon: { 
    width: '48px', 
    height: '48px', 
    borderRadius: '50%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: '1.1rem', 
    flexShrink: 0 
  },
  screeningText: { 
    fontSize: '0.92rem', 
    color: '#5B6670', 
    margin: 0, 
    lineHeight: 1.5 
  },
  subscribeSection: { padding: '80px 0 100px', backgroundColor: 'var(--bg)' },
  subscribeCard: { 
    background: 'linear-gradient(145deg, #1a2e38 0%, #0f1e26 100%)',
    borderRadius: '24px', 
    padding: '48px 56px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    gap: '40px', 
    flexWrap: 'wrap', 
    boxShadow: '0 16px 48px rgba(31, 53, 64, 0.2)' 
  },
  subscribeText: { 
    fontSize: '1rem', 
    color: 'rgba(255,255,255,0.7)', 
    margin: 0 
  },
  subscribeSuccess: { 
    color: 'var(--yellow)', 
    fontWeight: 600, 
    fontSize: '0.95rem' 
  },
  subscribeRow: { 
    display: 'flex', 
    gap: '12px', 
    flexShrink: 0,
    flexWrap: 'wrap',
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

export default ServicesPage;