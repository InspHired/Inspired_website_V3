import React, { useState } from 'react';
import Footer from '../components/Footer';

const services = [
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

const screeningItems = [
  { title: 'Biometric criminal checks', text: 'Secure digital identity clearance.', icon: 'fa-fingerprint' },
  { title: 'ID, work permits & driver\u2019s licenses', text: 'Strict regional legal validations.', icon: 'fa-id-card' },
  { title: 'Education qualifications', text: 'Direct authentication with academic bodies.', icon: 'fa-graduation-cap' },
  { title: 'Employment references', text: 'Complete audio recorded historical verifications.', icon: 'fa-history' },
  { title: 'Interview assistance panels', text: 'Expert cross-examinations for target roles.', icon: 'fa-users' },
];

/* ── SERVICES VISUAL STAGE (mirrors About page's avatar canvas) ── */
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
  const [hoveredService, setHoveredService] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div style={styles.pageWrapper}>
      <style>{`
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

        /* ── SERVICE PILLARS CANVAS CSS (mirrors About page avatar canvas) ── */
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
        .float-1 { top: 20px; left: 25px; animation}
        .float-2 { top: 35px; right: 25px; animation}
        .float-3 { bottom: 25px; left: 50%; transform: translateX(-50%); animation}

       

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

        @media (max-width: 900px) {
          .empower-grid { grid-template-columns: 1fr !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual-wrap { margin-top: 30px; }
          .subscribe-row { flex-direction: column !important; }
          .subscribe-row input, .subscribe-row button { width: 100% !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <header style={styles.hero}>
        <div style={styles.container}>
          <div className="hero-grid" style={styles.heroGrid}>
            <div style={styles.heroContent} className="animate-fadeup">
              <span style={styles.eyebrow}>What we do</span>
              <h1 style={styles.heroTitle}>Our services</h1>
              <p style={styles.heroLead}>
                A full ecosystem of recruitment solutions — from executive search
                to volume placement, candidate development, and background
                verification — built to solve every part of the hiring challenge.
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
            <span style={styles.sectionTag}>Core solutions</span>
            <h2 style={styles.sectionHeading}>Professional recruitment ecosystems</h2>
            <p style={styles.sectionSub}>
              Streamlined frameworks structured to handle everything from
              executive search pipelines to volume placement logistics.
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
                <h3 style={styles.serviceTitle}>{s.title}</h3>
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
              <span style={styles.sectionTag}>Empowering candidates</span>
              <h2 style={styles.sectionHeading}>Skills training & development</h2>
              <p style={styles.empowerText}>
                We give candidates the practical skills, confidence, and market
                knowledge to walk into a new role ready to succeed from day one.
              </p>
              <div style={styles.btnRow}>
                <a
                  href="https://calendly.com/recruitment-insphired/book-a-consultation-with-a-client-relationship-manager?month=2026-05"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.btnPrimary}
                  className="btn-hover-transition"
                >
                  Book consultation
                </a>
                <a
                  href="https://insphired.jobs/contact-me-form/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.btnSecondary}
                  className="btn-hover-transition"
                >
                  Request call back
                </a>
              </div>
            </div>

            <div style={styles.empowerVisual}>
              <div style={styles.empowerVisualCard}>
                <div style={styles.empowerIconWrap}>
                  <i className="fas fa-chalkboard-teacher" aria-hidden="true"></i>
                </div>
                <p style={styles.empowerVisualTitle}>Training that sticks</p>
                <p style={styles.empowerVisualText}>
                  Practical, role-ready skills — not just theory — so candidates walk into day one prepared.
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
            <span style={styles.sectionTag}>Risk management</span>
            <h2 style={styles.sectionHeading}>Employment verification & background screening</h2>
            <p style={styles.sectionSub}>
              Every candidate we place is thoroughly vetted, so you can hire with
              full confidence and protect what makes your workplace work.
            </p>
          </div>

          <div style={styles.screeningList}>
            {screeningItems.map((item, i) => (
              <div key={item.title} style={styles.screeningItem} className="screening-item">
                <div style={{ ...styles.screeningIcon, background: [`var(--teal)`, `var(--orange)`, `var(--yellow)`, `var(--navy)`, `var(--teal)`][i % 5] + '1A', color: [`var(--teal)`, `var(--orange)`, `var(--yellow)`, `var(--navy)`, `var(--teal)`][i % 5] }}>
                  <i className={`fas ${item.icon}`} aria-hidden="true"></i>
                </div>
                <div>
                  <h4 style={styles.screeningTitle}>{item.title}</h4>
                  <p style={styles.screeningText}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIBE (mirrors About page) ── */}
      <section style={styles.subscribeSection}>
        <div style={styles.container}>
          <div style={styles.subscribeCard}>
            <div>
              <h3 style={styles.subscribeTitle}>Need one of these services?</h3>
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
                  style={styles.subscribeInput}
                />
                <button type="submit" className="subscribe-btn" style={styles.subscribeBtn}>
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
  hero: { position: 'relative', backgroundColor: 'var(--navy)', padding: '130px 0 90px', color: '#FFFFFF', overflow: 'hidden' },
  heroGrid: { display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' },
  heroContent: { maxWidth: '620px' },
  eyebrow: {
    display: 'inline-block',
    fontSize: '0.8rem',
    letterSpacing: '2px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: 'var(--teal)',
    backgroundColor: 'rgba(80, 155, 158, 0.15)',
    padding: '6px 14px',
    borderRadius: '20px',
    marginBottom: '20px',
  },
  heroTitle: { fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 700, margin: '0 0 20px 0', letterSpacing: '-1px', lineHeight: 1.2 },
  heroLead: { fontSize: '1.1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: '40px', maxWidth: '560px' },
  heroStats: { display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' },
  heroStat: { display: 'flex', flexDirection: 'column', gap: '4px' },
  heroStatNumber: { fontSize: '1.7rem', fontWeight: 700, color: 'var(--yellow)' },
  heroStatLabel: { fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' },
  heroStatDivider: { width: '1px', height: '36px', background: 'rgba(255,255,255,0.15)' },
  heroVisualWrap: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  sectionWhite: { padding: '100px 0', backgroundColor: '#FFFFFF' },
  sectionLight: { padding: '100px 0', backgroundColor: 'var(--bg)' },
  centerHead: { textAlign: 'center', marginBottom: '56px' },
  sectionTag: { color: 'var(--teal)', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', display: 'block', marginBottom: '10px' },
  sectionHeading: { fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px', letterSpacing: '-0.5px' },
  sectionSub: { fontSize: '1.05rem', color: '#5B6670', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 },
  serviceGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' },
  serviceCard: { background: '#FFFFFF', borderRadius: 'var(--radius-card)', padding: '36px 32px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', position: 'relative' },
  serviceNumber: { display: 'block', fontSize: '2.4rem', fontWeight: 700, lineHeight: 1, marginBottom: '16px', transition: 'color var(--transition)' },
  serviceTitle: { fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px' },
  serviceText: { fontSize: '0.94rem', color: '#5B6670', lineHeight: 1.65, margin: 0 },
  empowerGrid: { display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '56px', alignItems: 'center' },
  empowerText: { fontSize: '1.05rem', color: '#5B6670', lineHeight: 1.75, marginBottom: '32px', maxWidth: '520px' },
  btnRow: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  btnPrimary: { background: 'var(--teal)', color: '#FFFFFF', padding: '14px 28px', borderRadius: '40px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', boxShadow: '0 4px 14px rgba(80, 155, 158, 0.3)' },
  btnSecondary: { background: 'transparent', color: 'var(--navy)', padding: '14px 28px', borderRadius: '40px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', border: '1.5px solid var(--border-light)' },
  empowerVisual: { display: 'flex', justifyContent: 'center' },
  empowerVisualCard: { background: '#FFFFFF', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)', padding: '40px', maxWidth: '340px', textAlign: 'center' },
  empowerIconWrap: { width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(80, 155, 158, 0.12)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', margin: '0 auto 20px' },
  empowerVisualTitle: { fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '10px' },
  empowerVisualText: { fontSize: '0.92rem', color: '#5B6670', lineHeight: 1.6, margin: 0 },
  screeningList: { maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' },
  screeningItem: { display: 'flex', alignItems: 'flex-start', gap: '20px', background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '24px 28px' },
  screeningIcon: { width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 },
  screeningTitle: { fontSize: '1.02rem', fontWeight: 700, color: 'var(--navy)', margin: '0 0 4px 0' },
  screeningText: { fontSize: '0.92rem', color: '#5B6670', margin: 0, lineHeight: 1.5 },
  subscribeSection: { padding: '80px 0 100px', backgroundColor: 'var(--bg)' },
  subscribeCard: { background: 'var(--navy)', borderRadius: '24px', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap', boxShadow: '0 16px 36px rgba(31, 53, 64, 0.15)' },
  subscribeTitle: { fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0' },
  subscribeText: { fontSize: '1rem', color: 'rgba(255,255,255,0.7)', margin: 0 },
  subscribeRow: { display: 'flex', gap: '12px', flexShrink: 0 },
  subscribeInput: { padding: '14px 18px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', fontSize: '0.95rem', minWidth: '260px', fontFamily: 'inherit' },
  subscribeBtn: { background: 'var(--teal)', color: '#FFFFFF', border: 'none', padding: '14px 32px', borderRadius: '40px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', whiteSpace: 'nowrap' },
  subscribeSuccess: { color: 'var(--yellow)', fontWeight: 600, fontSize: '0.95rem' },
};

export default ServicesPage;