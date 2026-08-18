import React, { useState, useEffect, useRef } from 'react';
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

// Small abstract animated shape-icons
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

// ============================================
// SLIDE-IN ANIMATION HOOK
// ============================================
function useSlideIn(delay = 0) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return { ref, isVisible };
}

// ============================================
// SLIDE-IN CARD COMPONENT - Fixed sizing
// ============================================
function SlideInCard({ children, delay = 0 }) {
  const { ref, isVisible } = useSlideIn(delay);

  return (
    <div
      ref={ref}
      className={`slide-in-card ${isVisible ? 'visible' : ''}`}
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        width: '100%'
      }}
    >
      {children}
    </div>
  );
}

const JobotPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeup { animation: fadeInUp 0.6s ease-out forwards; }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(80, 155, 158, 0.3), 0 0 40px rgba(80, 155, 158, 0.1); }
          50% { box-shadow: 0 0 30px rgba(80, 155, 158, 0.5), 0 0 60px rgba(80, 155, 158, 0.2); }
        }

        .interactive-card {
          transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition) !important;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .interactive-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: var(--shadow-md) !important;
        }

        /* ===== 3D METALLIC BUTTONS (Same as Connect page) ===== */
        .btn-3d-metallic {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 36px;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
          background: linear-gradient(180deg, #62b1b4 0%, #509b9e 45%, #39797c 100%);
          border: 1px solid #73c8cb;
          border-radius: 50px;
          cursor: pointer;
          letter-spacing: 0.5px;
          text-decoration: none;
          position: relative;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.3s ease;
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.6),
            inset 0 -3px 6px rgba(0, 0, 0, 0.3),
            0 4px 0 #285759,
            0 8px 20px rgba(80, 155, 158, 0.35);
          text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.3);
          transform: translateY(-3px);
        }

        .btn-3d-metallic:hover {
          background: linear-gradient(180deg, #6bc0c3 0%, #54a5a8 45%, #3d8386 100%);
          transform: translateY(-5px);
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.7),
            inset 0 -3px 6px rgba(0, 0, 0, 0.25),
            0 5px 0 #285759,
            0 12px 28px rgba(80, 155, 158, 0.45);
        }

        .btn-3d-metallic:active {
          transform: translateY(1px) !important;
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.3),
            0 0 0 transparent,
            0 4px 12px rgba(80, 155, 158, 0.2) !important;
        }

        .btn-3d-metallic i {
          margin-right: 10px;
        }

        .btn-hover-transition { transition: all var(--transition) !important; }

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

        /* ===== SLIDE-IN ANIMATIONS ===== */
        .slide-in-card {
          opacity: 0;
          transform: translateX(60px);
          transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .slide-in-card.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* ===== HERO IMAGE - FIXED ===== */
        .hero-image-wrapper {
          position: relative;
          width: 320px;
          height: 320px;
          margin: 0 auto;
          border-radius: 50%;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 
            0 0 40px rgba(80, 155, 158, 0.2),
            inset 0 0 60px rgba(80, 155, 158, 0.05);
          animation: pulseGlow 3s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.3s ease;
        }

        .hero-image-wrapper img:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .hero-image-wrapper {
            width: 200px;
            height: 200px;
          }
          
          .slide-in-card {
            transform: translateX(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
          }
        }

        @media (max-width: 600px) {
          .slide-in-card {
            transform: translateX(10px);
            transition: opacity 0.4s ease, transform 0.4s ease;
          }
        }
      `}</style>

      {/* ── HERO ── */}
      <header style={styles.heroSection}>
        <div style={styles.container}>
          <div style={styles.heroGrid} className="animate-fadeup">
            <div>
              <span style={styles.eyebrow}>Automated talent sourcing</span>
              <div style={styles.logoRow}>
                <img src="/assets/JB.jpg" alt="Jobot Logo" style={styles.appLogo} />
                <h1 style={styles.pageTitle}>Jobot</h1>
              </div>
              <p style={styles.heroLead}>
                Your strategic corporate hiring assistant. Automate candidate pre-screening, filter top-tier
                talents dynamically, and accelerate your recruitment lifecycles with advanced sorting infrastructure.
              </p>
              <div style={styles.btnRow}>
                <a 
                  href="https://app.insphired.jobs/jobs?standalone=true" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-3d-metallic"
                >
                  <i className="fas fa-external-link-alt" aria-hidden="true"></i>Visit site
                </a>
              </div>
            </div>

            <div style={styles.heroVisualWrap}>
              <div className="hero-image-wrapper">
                <img 
                  src="/assets/JB.jpg" 
                  alt="Jobot - Automated Talent Sourcing" 
                />
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
            {pillars.map((p, index) => (
              <SlideInCard key={p.title} delay={index * 150}>
                <div style={{ ...styles.featureCard, borderTop: `4px solid ${p.accent}` }} className="interactive-card">
                  <div style={{ ...styles.iconBox, backgroundColor: `${p.accent}1A` }}>
                    <PillarIcon type={p.icon} color={p.accent} />
                  </div>
                  <h3 style={styles.cardTitle}>{p.title}</h3>
                  <p style={styles.cardText}>{p.text}</p>
                </div>
              </SlideInCard>
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
            {modules.map((m, index) => (
              <SlideInCard key={m.title} delay={index * 150 + 200}>
                <div style={{ ...styles.featureCard, borderLeft: `4px solid ${m.accent}` }} className="interactive-card">
                  <h4 style={{ ...styles.moduleHeading, color: m.accent }}>{m.title}</h4>
                  <p style={styles.cardText}>{m.text}</p>
                </div>
              </SlideInCard>
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
    fontFamily: "'Playfair Display', Georgia, serif",
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
    fontFamily: "'Playfair Display', Georgia, serif",
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
    gap: '16px',
    flexWrap: 'wrap'
  },
  heroVisualWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: "'Playfair Display', Georgia, serif",
    color: 'var(--teal)',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: '2px',
    display: 'block',
    marginBottom: '10px',
  },
  sectionHeading: {
    fontFamily: "'Playfair Display', Georgia, serif",
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
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
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
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '1.2rem',
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: '12px'
  },
  cardText: {
    fontSize: '0.94rem',
    color: '#5B6670',
    lineHeight: 1.65,
    margin: 0,
    flex: 1
  },
  moduleHeading: {
    fontFamily: "'Playfair Display', Georgia, serif",
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
    fontFamily: "'Playfair Display', Georgia, serif",
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