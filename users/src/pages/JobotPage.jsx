import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqData = [
  { q: "What is Jobot?", a: "Jobot is an intelligent, automated recruitment assistant designed to streamline high-volume talent sourcing, background screening, and optimized matching protocols." },
  { q: "How does it improve applicant quality?", a: "By leveraging multi-layered vetting metrics and automated initial verification assessments, it filters out unqualified applications before they ever hit your desk." },
  { q: "Can it scale for multi-regional enterprise teams?", a: "Absolutely. Jobot supports complex operational structures, enabling distinct cross-provincial filtering rules and localized team compliance pipelines." }
];

const pillars = [
  {
    title: "Intelligent filtering",
    text: "Instantly scan thousands of digital profiles to extract ideal candidates based on background, experience, and custom filters.",
    icon: "candidate",
    accent: "var(--teal)",
  },
  {
    title: "Pre-vetted match",
    text: "Every recommendation undergoes programmatic validation protocols to guarantee premium output alignment before interview rounds.",
    icon: "matching",
    accent: "var(--orange)",
  },
  {
    title: "Scalable flow",
    text: "Easily handle seasonal applicant spikes without degrading structural review processing speeds or increasing staff overheads.",
    icon: "growth",
    accent: "var(--yellow)",
  },
];

const modules = [
  {
    title: "Recruiter command hub",
    text: "Monitor pending applicant paths, adjust assessment rules instantly across operational nodes, and build historical placement trend reports.",
    accent: "var(--teal)",
  },
  {
    title: "Dynamic matrix rules",
    text: "Establish tailored evaluation metrics based on technical standards, regional constraints, and target soft-skill indicators.",
    accent: "var(--orange)",
  },
  {
    title: "Automated verification",
    text: "Seamlessly confirm profile authenticity, background highlights, and professional certifications without manual, third-party interventions.",
    accent: "var(--navy)",
  },
];

// Small abstract animated shape-icons, reused from the same visual language as the About/Team sections.
function PillarIcon({ type, color }) {
  switch (type) {
    case "candidate":
      return (
        <svg viewBox="0 0 40 40" className="pillar-icon">
          <circle cx="20" cy="20" r="7" fill={color} />
          <circle cx="20" cy="20" r="14" fill="none" stroke={color} strokeWidth="1.5" className="pi-pulse-ring" />
        </svg>
      );
    case "matching":
      return (
        <svg viewBox="0 0 40 40" className="pillar-icon">
          <circle cx="16" cy="20" r="9" fill={color} opacity="0.55" className="pi-orbit-a" />
          <circle cx="24" cy="20" r="9" fill={color} opacity="0.85" className="pi-orbit-b" />
        </svg>
      );
    case "growth":
      return (
        <svg viewBox="0 0 40 40" className="pillar-icon">
          <rect x="9" y="24" width="5" height="8" fill={color} className="pi-gbar pi-gbar-1" />
          <rect x="18" y="18" width="5" height="14" fill={color} className="pi-gbar pi-gbar-2" />
          <rect x="27" y="10" width="5" height="22" fill={color} className="pi-gbar pi-gbar-3" />
        </svg>
      );
    default:
      return null;
  }
}

const JobotPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeup { animation: fadeInUp 0.6s ease-out forwards; }

        .interactive-card {
          transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition) !important;
        }
        .interactive-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: var(--shadow-md) !important;
        }

        .btn-hover-transition { transition: all var(--transition) !important; }
        .btn-hover-transition:hover { transform: translateY(-2px) !important; opacity: 0.95; }

        .metric-block { transition: transform var(--transition), box-shadow var(--transition) !important; }
        .metric-block:hover { transform: translateY(-4px) scale(1.03) !important; box-shadow: var(--shadow-md) !important; }

        .faq-item-transition { transition: border-color var(--transition), background-color var(--transition) !important; cursor: pointer; }
        .faq-item-transition:hover {
          border-color: rgba(80, 155, 158, 0.35) !important;
          background-color: var(--bg) !important;
        }

        .faq-chevron { transition: transform var(--transition); }
        .faq-chevron.open { transform: rotate(90deg); }

        .faq-answer-wrap {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease;
        }
        .faq-answer-wrap.open { max-height: 200px; }

        .pillar-icon { width: 34px; height: 34px; }

        .pi-pulse-ring {
          transform-origin: center;
          animation: piPulseRing 2s ease-out infinite;
        }
        @keyframes piPulseRing {
          0% { transform: scale(0.7); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .pi-orbit-a { animation: piOrbitA 3s ease-in-out infinite; transform-origin: 20px 20px; }
        .pi-orbit-b { animation: piOrbitB 3s ease-in-out infinite; transform-origin: 20px 20px; }
        @keyframes piOrbitA { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(2px); } }
        @keyframes piOrbitB { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-2px); } }

        .pi-gbar { transform-origin: bottom center; animation: piGrowBar 2s ease-in-out infinite; }
        .pi-gbar-1 { animation-delay: 0s; }
        .pi-gbar-2 { animation-delay: 0.25s; }
        .pi-gbar-3 { animation-delay: 0.5s; }
        @keyframes piGrowBar { 0%, 100% { transform: scaleY(0.85); } 50% { transform: scaleY(1); } }

        .hero-orbit-dot {
          animation: heroOrbit 10s linear infinite;
        }
        @keyframes heroOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <header style={styles.heroSection}>
        <div style={styles.container}>
          <div style={styles.heroGrid} className="animate-fadeup">
            <div>
              <span style={styles.eyebrow}>Automated talent sourcing</span>
              <div style={styles.logoRow}>
                <img src="/assets/JobBot.png" alt="Jobot Logo" style={styles.appLogo} />
                <h1 style={styles.pageTitle}>Jobot</h1>
              </div>
              <p style={styles.heroLead}>
                Your strategic corporate hiring assistant. Automate candidate pre-screening, filter top-tier
                talents dynamically, and accelerate your recruitment lifecycles with advanced sorting infrastructure.
              </p>
              <div style={styles.btnRow}>
                <a href="https://app.insphired.jobs/jobs?standalone=true" target="_blank" rel="noreferrer" style={styles.btnPrimary} className="btn-hover-transition">
                  <i className="fas fa-external-link-alt" style={{ marginRight: '8px' }} aria-hidden="true"></i>Visit site
                </a>
              </div>
            </div>

            <div style={styles.heroVisualWrap}>
              <div style={styles.orbitRing}>
                <div className="hero-orbit-dot" style={styles.orbitDotWrap}>
                  <div style={styles.orbitDot}></div>
                </div>
                <div style={styles.glassCard}>
                  <div style={{ display: 'flex', gap: '16px', textAlign: 'center' }}>
                    <div style={styles.metricBlock} className="metric-block">
                      <div style={{ ...styles.metricNumber, color: 'var(--teal)' }}>24/7</div>
                      <div style={styles.metricLabel}>Smart screening</div>
                    </div>
                    <div style={styles.metricBlock} className="metric-block">
                      <div style={{ ...styles.metricNumber, color: 'var(--orange)' }}>85%</div>
                      <div style={styles.metricLabel}>Time saved</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── VALUES / KEY PILLARS ── */}
      <section style={styles.sectionLight}>
        <div style={styles.container}>
          <div style={styles.centerHead}>
            <span style={styles.sectionTag}>Why teams love it</span>
            <h2 style={styles.sectionHeading}>Why choose Jobot</h2>
            <p style={styles.sectionSub}>Eliminating high-volume operational bottlenecks using programmatic pipeline tracking.</p>
          </div>

          <div style={styles.featureGrid}>
            {pillars.map((p) => (
              <div key={p.title} style={{ ...styles.featureCard, borderTop: `4px solid ${p.accent}` }} className="interactive-card">
                <div style={{ ...styles.iconBox, backgroundColor: `${p.accent}1A` }}>
                  <PillarIcon type={p.icon} color={p.accent} />
                </div>
                <h3 style={styles.cardTitle}>{p.title}</h3>
                <p style={styles.cardText}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTEM APP MODULES ── */}
      <section style={styles.sectionWhite}>
        <div style={styles.container}>
          <div style={styles.centerHead}>
            <span style={styles.sectionTag}>Under the hood</span>
            <h2 style={styles.sectionHeading}>Application modules</h2>
            <p style={styles.sectionSub}>Enterprise toolsets architected for high-velocity hiring environments.</p>
          </div>

          <div style={styles.featureGrid}>
            {modules.map((m) => (
              <div key={m.title} style={{ ...styles.featureCard, borderLeft: `4px solid ${m.accent}` }} className="interactive-card">
                <h4 style={{ ...styles.moduleHeading, color: m.accent }}>{m.title}</h4>
                <p style={styles.cardText}>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={styles.sectionLight}>
        <div style={styles.container}>
          <div style={styles.centerHead}>
            <span style={styles.sectionTag}>Good to know</span>
            <h2 style={styles.sectionHeading}>Frequently asked questions</h2>
            <p style={styles.sectionSub}>Tap a question to expand the answer.</p>
          </div>
          <div style={styles.faqWrapper}>
            {faqData.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  style={{
                    ...styles.faqCard,
                    borderColor: isOpen ? 'var(--teal)' : 'var(--border-light)',
                  }}
                  className="faq-item-transition"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpenFaq(isOpen ? null : i);
                    }
                  }}
                >
                  <h4 style={styles.faqQuestion}>
                    <i className="far fa-question-circle" style={styles.faqIcon} aria-hidden="true"></i>
                    <span style={{ flex: 1 }}>{item.q}</span>
                    <i className={`fas fa-chevron-right faq-chevron ${isOpen ? 'open' : ''}`} style={{ color: 'var(--teal)', fontSize: '0.85rem' }} aria-hidden="true"></i>
                  </h4>
                  <div className={`faq-answer-wrap ${isOpen ? 'open' : ''}`}>
                    <p style={styles.faqAnswer}>{item.a}</p>
                  </div>
                </div>
              );
            })}
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
    width: '100%'
  },
  heroSection: {
    backgroundColor: 'var(--navy)',
    padding: '130px 0 100px 0',
    position: 'relative',
    overflow: 'hidden',
  },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '60px',
    alignItems: 'center'
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
    marginBottom: '18px',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px'
  },
  appLogo: {
    width: '48px',
    height: '48px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 12px rgba(80, 155, 158, 0.3))'
  },
  pageTitle: {
    fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
    fontWeight: 700,
    color: '#FFFFFF',
    margin: 0,
    lineHeight: 1.15,
    letterSpacing: '-1px'
  },
  heroLead: {
    fontSize: '1.05rem',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '32px',
    maxWidth: '580px',
    lineHeight: 1.7
  },
  btnRow: {
    display: 'flex',
    gap: '16px'
  },
  btnPrimary: {
    background: 'var(--orange)',
    color: '#FFFFFF',
    padding: '14px 32px',
    borderRadius: '40px',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '0.95rem',
    display: 'inline-flex',
    alignItems: 'center',
    boxShadow: '0 4px 14px rgba(217, 107, 67, 0.35)',
  },
  heroVisualWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbitRing: {
    position: 'relative',
    width: '100%',
    maxWidth: '380px',
    display: 'flex',
    justifyContent: 'center',
  },
  orbitDotWrap: {
    position: 'absolute',
    inset: '-14px',
    pointerEvents: 'none',
  },
  orbitDot: {
    position: 'absolute',
    top: '-6px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'var(--yellow)',
    boxShadow: '0 0 16px rgba(228, 175, 81, 0.6)',
  },
  glassCard: {
    background: 'rgba(255, 255, 255, 0.07)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px dashed rgba(255, 255, 255, 0.18)',
    borderRadius: 'var(--radius-card)',
    padding: '40px',
    maxWidth: '380px',
    width: '100%',
  },
  metricBlock: {
    flex: 1,
    padding: '20px 16px',
    background: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-sm)',
  },
  metricNumber: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: '4px'
  },
  metricLabel: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    fontWeight: 700,
    letterSpacing: '1px',
    color: 'var(--navy)'
  },
  sectionWhite: {
    padding: '100px 0',
    backgroundColor: '#FFFFFF'
  },
  sectionLight: {
    padding: '100px 0',
    backgroundColor: 'var(--bg)'
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
    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
    fontWeight: 700,
    color: 'var(--navy)',
    lineHeight: 1.2,
    marginBottom: '16px',
    letterSpacing: '-0.5px'
  },
  sectionSub: {
    fontSize: '1.05rem',
    color: '#5B6670',
    maxWidth: '620px',
    margin: '0 auto',
    lineHeight: 1.6
  },
  centerHead: {
    textAlign: 'center',
    marginBottom: '64px'
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '32px'
  },
  featureCard: {
    background: '#FFFFFF',
    borderRadius: 'var(--radius-card)',
    padding: '44px 36px',
    border: '1px solid var(--border-light)',
    boxShadow: 'var(--shadow-sm)',
    position: 'relative',
    overflow: 'hidden'
  },
  iconBox: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: '12px'
  },
  cardText: {
    fontSize: '0.94rem',
    color: '#5B6670',
    lineHeight: 1.65,
    margin: 0
  },
  moduleHeading: {
    fontSize: '1.2rem',
    fontWeight: 700,
    marginBottom: '12px'
  },
  faqWrapper: {
    maxWidth: '780px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  faqCard: {
    background: '#FFFFFF',
    borderRadius: '14px',
    padding: '24px 28px',
    border: '1px solid var(--border-light)',
  },
  faqQuestion: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--navy)',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  faqIcon: {
    marginRight: '14px',
    color: 'var(--teal)',
    fontSize: '1.1rem',
    flexShrink: 0
  },
  faqAnswer: {
    fontSize: '0.94rem',
    color: '#5B6670',
    margin: '14px 0 0 0',
    paddingLeft: '28px',
    lineHeight: 1.65
  }
};

export default JobotPage;