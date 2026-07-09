import React, { useState } from 'react';
import Footer from '../components/Footer';

const services = [
  {
    number: '01',
    title: 'Recruitment Process Outsourcing (RPO)',
    text: 'Streamline your structural hiring operations. We manage the entire recruitment lifecycle end-to-end, unlocking absolute operational freedom so you can scale core operations.',
    accent: 'var(--teal)',
  },
  {
    number: '02',
    title: 'Executive Recruitment',
    text: 'We specialize in sourcing and placing top-tier executives capable of charting enterprise roadmaps. Our deep executive network matches the right leader with your strategic vision.',
    accent: 'var(--orange)',
  },
  {
    number: '03',
    title: 'Specialist Skill Recruitment',
    text: 'Catering directly to specialized functions across Engineering, IT, Healthcare, and Corporate Finance. Our niche domain divisions source talent with the exact credentials you request.',
    accent: 'var(--yellow)',
  },
  {
    number: '04',
    title: 'Targeted Headhunting',
    text: "Engage high-value passive candidates who aren't actively browsing job boards. Every strategic outreach path integrates strict behavioral assessments and meticulous team alignment roadmaps.",
    accent: 'var(--navy)',
  },
  {
    number: '05',
    title: 'Bulk & Contract Staffing',
    text: 'Scale production rapidly during seasonal demand peaks or complex project kickoffs. We absorb your end-to-end payroll administration risk and operational bottlenecks seamlessly.',
    accent: 'var(--teal)',
  },
  {
    number: '06',
    title: 'Efficient Temp Recruitment',
    text: 'Leverage our cutting-edge staffing app to request, track, and manage vetted talent on demand. Built cleanly to support fast, same-day site deployment requirements.',
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

const ServicesPage = () => {
  const [hoveredService, setHoveredService] = useState(null);

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

        .hero-orbit-dot { animation: heroOrbit 10s linear infinite; }
        @keyframes heroOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @media (max-width: 900px) {
          .empower-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <header style={styles.hero}>
        <div style={styles.container}>
          <div style={styles.heroContent} className="animate-fadeup">
            <span style={styles.eyebrow}>What we do</span>
            <h1 style={styles.heroTitle}>Our services</h1>
            <p style={styles.heroLead}>
              A full ecosystem of recruitment solutions — from executive search
              to volume placement, candidate development, and background
              verification — built to solve every part of the hiring challenge.
            </p>
          </div>

          <div style={styles.heroVisualWrap}>
            <div className="hero-orbit-dot" style={styles.orbitDotWrap}>
              <div style={styles.orbitDot}></div>
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
                We equip talent pipelines with practical technical skillsets,
                workforce confidence, and market insights to excel right from
                day one.
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
              Protect company culture and verify integrity parameters using
              absolute data transparency protocols.
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

      <Footer />
    </div>
  );
};

const styles = {
  pageWrapper: {
    color: 'var(--navy)',
    backgroundColor: 'var(--bg)',
    lineHeight: 1.65,
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 32px',
    width: '100%',
  },
  hero: {
    position: 'relative',
    backgroundColor: 'var(--navy)',
    padding: '130px 0 100px',
    color: '#FFFFFF',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '720px',
    position: 'relative',
    zIndex: 2,
  },
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
  heroTitle: {
    fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
    fontWeight: 700,
    margin: '0 0 20px 0',
    letterSpacing: '-1px',
    lineHeight: 1.15,
  },
  heroLead: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.75,
    maxWidth: '640px',
  },
  heroVisualWrap: {
    position: 'absolute',
    top: '50%',
    right: '8%',
    transform: 'translateY(-50%)',
  },
  orbitDotWrap: {
    position: 'relative',
    width: '160px',
    height: '160px',
  },
  orbitDot: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'var(--yellow)',
    boxShadow: '0 0 16px rgba(228, 175, 81, 0.6)',
  },
  sectionWhite: { padding: '100px 0', backgroundColor: '#FFFFFF' },
  sectionLight: { padding: '100px 0', backgroundColor: 'var(--bg)' },
  centerHead: {
    textAlign: 'center',
    marginBottom: '56px',
  },
  sectionTag: {
    color: 'var(--teal)',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: '2px',
    display: 'block',
    marginBottom: '10px',
  },
  sectionHeading: {
    fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: '16px',
    letterSpacing: '-0.5px',
  },
  sectionSub: {
    fontSize: '1.05rem',
    color: '#5B6670',
    maxWidth: '640px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  serviceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '28px',
  },
  serviceCard: {
    background: '#FFFFFF',
    borderRadius: 'var(--radius-card)',
    padding: '36px 32px',
    border: '1px solid var(--border-light)',
    boxShadow: 'var(--shadow-sm)',
    position: 'relative',
  },
  serviceNumber: {
    display: 'block',
    fontSize: '2.4rem',
    fontWeight: 700,
    lineHeight: 1,
    marginBottom: '16px',
    transition: 'color var(--transition)',
  },
  serviceTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: '12px',
  },
  serviceText: {
    fontSize: '0.94rem',
    color: '#5B6670',
    lineHeight: 1.65,
    margin: 0,
  },
  empowerGrid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '56px',
    alignItems: 'center',
  },
  empowerText: {
    fontSize: '1.05rem',
    color: '#5B6670',
    lineHeight: 1.75,
    marginBottom: '32px',
    maxWidth: '520px',
  },
  btnRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
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
    boxShadow: '0 4px 14px rgba(80, 155, 158, 0.3)',
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
    border: '1.5px solid var(--border-light)',
  },
  empowerVisual: {
    display: 'flex',
    justifyContent: 'center',
  },
  empowerVisualCard: {
    background: '#FFFFFF',
    borderRadius: 'var(--radius-card)',
    border: '1px solid var(--border-light)',
    boxShadow: 'var(--shadow-md)',
    padding: '40px',
    maxWidth: '340px',
    textAlign: 'center',
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
    margin: '0 auto 20px',
  },
  empowerVisualTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: '10px',
  },
  empowerVisualText: {
    fontSize: '0.92rem',
    color: '#5B6670',
    lineHeight: 1.6,
    margin: 0,
  },
  screeningList: {
    maxWidth: '820px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  screeningItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
    background: '#FFFFFF',
    border: '1px solid var(--border-light)',
    borderRadius: '16px',
    padding: '24px 28px',
  },
  screeningIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    flexShrink: 0,
  },
  screeningTitle: {
    fontSize: '1.02rem',
    fontWeight: 700,
    color: 'var(--navy)',
    margin: '0 0 4px 0',
  },
  screeningText: {
    fontSize: '0.92rem',
    color: '#5B6670',
    margin: 0,
    lineHeight: 1.5,
  },
};

export default ServicesPage;