import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const processSteps = [
  {
    number: '01',
    title: 'Client Consultation',
    text: 'We start by diving deep into your business goals, culture, and hiring requirements to align our recruitment strategy with your vision.',
    accent: 'var(--teal)',
  },
  {
    number: '02',
    title: 'Position Profile Development',
    text: 'We collaborate with you to create a compelling position profile outlining responsibilities, qualifications, and ideal candidate traits.',
    accent: 'var(--orange)',
  },
  {
    number: '03',
    title: 'Targeted Search Strategy',
    text: 'Using our extensive network and modern sourcing tools, we identify professionals who match your business needs and culture.',
    accent: 'var(--yellow)',
  },
  {
    number: '04',
    title: 'Candidate Screening & Assessment',
    text: 'We conduct interviews, skills assessments, and background checks to ensure only the highest-quality candidates are shortlisted.',
    accent: 'var(--navy)',
  },
  {
    number: '05',
    title: 'Presentation of Shortlist',
    text: 'Receive a curated shortlist of candidates complete with detailed profiles and recommendations.',
    accent: 'var(--teal)',
  },
  {
    number: '06',
    title: 'Final Candidate Selection',
    text: 'We guide you through final interviews and hiring decisions with strategic insights and support.',
    accent: 'var(--orange)',
  },
  {
    number: '07',
    title: 'Post-Placement Support',
    text: 'Our partnership continues after placement with ongoing support to ensure long-term success and smooth onboarding.',
    accent: 'var(--yellow)',
  },
];

const verificationItems = [
  { title: 'Employment verification', icon: 'fa-briefcase' },
  { title: 'Biometric criminal checks', icon: 'fa-fingerprint' },
  { title: 'ID, work permits & driver\u2019s license', icon: 'fa-id-card' },
  { title: 'Education qualifications', icon: 'fa-graduation-cap' },
  { title: 'Employment references', icon: 'fa-history' },
  { title: 'Interview assistance', icon: 'fa-users' },
];

const testimonials = [
  {
    quote: 'InspHired completely transformed our hiring process. Their team consistently delivers exceptional candidates aligned with our company culture.',
    name: 'Global Logistics Group',
    accent: 'var(--teal)',
  },
  {
    quote: 'The professionalism, speed, and verification standards were outstanding. We found top-tier talent faster than ever before.',
    name: 'Fintech Africa',
    accent: 'var(--orange)',
  },
  {
    quote: 'From consultation to onboarding support, the entire recruitment journey felt seamless and highly strategic.',
    name: 'Healthcare Solutions SA',
    accent: 'var(--yellow)',
  },
];

function StarRow({ color }) {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className="fas fa-star" style={{ color, fontSize: 13 }} aria-hidden="true"></i>
      ))}
    </div>
  );
}

/* ── EMPLOYER NETWORK CANVAS (mirrors About page's avatar canvas) ── */
function EmployerNetworkCanvas() {
  return (
    <div className="pillar-canvas-container">
      <div className="glow-sphere teal-glow"></div>
      <div className="glow-sphere orange-glow"></div>

      <div className="pillar-stage-card">
        <div className="floating-pillar-item float-1">
          <div className="icon-frame teal-border">
            <i className="fas fa-handshake" aria-hidden="true"></i>
          </div>
          <div className="pillar-badge">
            <span className="badge-dot teal"></span> Consultation
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
            <i className="fas fa-user-check" aria-hidden="true"></i>
          </div>
          <div className="pillar-badge">
            <span className="badge-dot yellow"></span> Placement
          </div>
        </div>

        <div className="center-metallic-core">
          <div className="core-pulse-ring"></div>
          <div className="core-brand-tag">
            <span className="core-number">07</span>
            <span className="core-label">Step Process</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const ForEmployersPage = () => {
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

        .verify-item { transition: background-color var(--transition), border-color var(--transition) !important; }
        .verify-item:hover {
          background-color: var(--bg) !important;
          border-color: rgba(80, 155, 158, 0.35) !important;
        }

        /* ── EMPLOYER NETWORK CANVAS CSS (mirrors About page avatar canvas) ── */
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

        @media (max-width: 900px) {
          .process-grid { grid-template-columns: 1fr !important; }
          .verify-grid { grid-template-columns: 1fr !important; }
          .final-cta-row { flex-direction: column !important; align-items: stretch !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual-wrap { margin-top: 30px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <header style={styles.hero}>
        <div style={styles.container}>
          <div className="hero-grid" style={styles.heroGrid}>
            <div style={styles.heroContent} className="animate-fadeup">
              <span style={styles.eyebrow}>For employers</span>
              <h1 style={styles.heroTitle}>Strategic recruitment solutions for modern African businesses</h1>
              <p style={styles.heroLead}>
                Our comprehensive recruitment services are designed to connect your
                organisation with top-tier professionals who align with your
                culture, vision, and long-term business goals.
              </p>

              <div style={styles.heroStats}>
                <div style={styles.heroStat}>
                  <span style={styles.heroStatNumber}>07</span>
                  <span style={styles.heroStatLabel}>Process steps</span>
                </div>
                <div style={styles.heroStatDivider}></div>
                <div style={styles.heroStat}>
                  <span style={styles.heroStatNumber}>06</span>
                  <span style={styles.heroStatLabel}>Verification checks</span>
                </div>
                <div style={styles.heroStatDivider}></div>
                <div style={styles.heroStat}>
                  <span style={styles.heroStatNumber}>
                    <i className="fas fa-map-marker-alt" style={{ fontSize: '1.1rem' }} aria-hidden="true"></i>
                  </span>
                  <span style={styles.heroStatLabel}>South Africa</span>
                </div>
              </div>

              <div style={{ ...styles.btnRow, marginTop: '36px' }}>
                <a
                  href="https://bookings.cloud.microsoft/book/LandrysDiary@insphired.co.za/?ismsaljsauthenabled=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.btnPrimary}
                  className="btn-hover-transition"
                >
                  Schedule consultation
                </a>
                <Link to="/contact" style={styles.btnSecondaryDark} className="btn-hover-transition">
                  Request callback
                </Link>
              </div>
            </div>

            <div className="hero-visual-wrap" style={styles.heroVisualWrap}>
              <EmployerNetworkCanvas />
            </div>
          </div>
        </div>
      </header>

      {/* ── RECRUITMENT PROCESS ── */}
      <section style={styles.sectionWhite}>
        <div style={styles.container}>
          <div style={styles.centerHead}>
            <span style={styles.sectionTag}>Our recruitment process</span>
            <h2 style={styles.sectionHeading}>A proven hiring framework built for results</h2>
            <p style={styles.sectionSub}>
              Every step of our recruitment process is intentionally designed to
              deliver exceptional candidates and long-term hiring success.
            </p>
          </div>

          <div className="process-grid" style={styles.processGrid}>
            {processSteps.map((step) => (
              <div key={step.number} style={{ ...styles.processCard, borderTop: `4px solid ${step.accent}` }} className="interactive-card">
                <span style={styles.processNumber}>{step.number}</span>
                <h3 style={styles.processTitle}>{step.title}</h3>
                <p style={styles.processText}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section style={styles.quoteSection}>
        <div style={styles.container}>
          <div style={styles.quoteWrap}>
            <i className="fas fa-quote-left" style={styles.quoteMark} aria-hidden="true"></i>
            <p style={styles.quoteText}>
              Hiring is the most important people function you have, and most of
              us aren't as good at it as we think. Refocusing your resources on
              hiring better will have a higher return than almost any training
              program you can develop.
            </p>
            <p style={styles.quoteAttribution}>— Laszlo Bock</p>
          </div>
        </div>
      </section>

      {/* ── VERIFICATION SERVICES ── */}
      <section style={styles.sectionLight}>
        <div style={styles.container}>
          <div style={styles.centerHead}>
            <span style={styles.sectionTag}>Verification services</span>
            <h2 style={styles.sectionHeading}>Recruitment backed by trusted verification</h2>
            <p style={styles.sectionSub}>
              We ensure every candidate is thoroughly verified to protect your
              business and strengthen hiring confidence.
            </p>
          </div>

          <div className="verify-grid" style={styles.verifyGrid}>
            {verificationItems.map((item, i) => (
              <div key={item.title} style={styles.verifyItem} className="verify-item">
                <div
                  style={{
                    ...styles.verifyIcon,
                    background: [`var(--teal)`, `var(--orange)`, `var(--yellow)`, `var(--navy)`, `var(--teal)`, `var(--orange)`][i % 6] + '1A',
                    color: [`var(--teal)`, `var(--orange)`, `var(--yellow)`, `var(--navy)`, `var(--teal)`, `var(--orange)`][i % 6],
                  }}
                >
                  <i className={`fas ${item.icon}`} aria-hidden="true"></i>
                </div>
                <h4 style={styles.verifyTitle}>{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={styles.sectionWhite}>
        <div style={styles.container}>
          <div style={styles.centerHead}>
            <span style={styles.sectionTag}>Client testimonials</span>
            <h2 style={styles.sectionHeading}>Trusted by growing organisations</h2>
            <p style={styles.sectionSub}>
              Discover how InspHired has transformed recruitment experiences for
              businesses across Africa.
            </p>
          </div>

          <div style={styles.testimonialGrid}>
            {testimonials.map((t) => (
              <div key={t.name} style={{ ...styles.testimonialCard, borderTop: `4px solid ${t.accent}` }} className="interactive-card">
                <StarRow color={t.accent} />
                <p style={styles.testimonialQuote}>"{t.quote}"</p>
                <p style={styles.testimonialName}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={styles.finalCta}>
        <div style={styles.container}>
          <div className="final-cta-row" style={styles.finalCtaRow}>
            <div>
              <h2 style={styles.finalCtaTitle}>How can we InspHire you today?</h2>
              <p style={styles.finalCtaText}>
                Let's discuss your business needs and build a workforce designed for growth.
              </p>
            </div>
            <div style={styles.finalCtaBtns}>
              <a
                href="https://bookings.cloud.microsoft/book/LandrysDiary@insphired.co.za/?ismsaljsauthenabled=true"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.btnPrimary}
                className="btn-hover-transition"
              >
                Schedule consultation
              </a>
              <Link to="/contact" style={styles.btnSecondaryLight} className="btn-hover-transition">
                Request callback
              </Link>
              <a
                href="https://worx.insphired.jobs/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.btnSecondaryLight}
                className="btn-hover-transition"
              >
                Worx (temp hiring platform)
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
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '48px',
    alignItems: 'center',
  },
  heroContent: {
    maxWidth: '620px',
    position: 'relative',
    zIndex: 2,
  },
  heroVisualWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
    flexWrap: 'wrap',
  },
  heroStat: { display: 'flex', flexDirection: 'column', gap: '4px' },
  heroStatNumber: { fontSize: '1.7rem', fontWeight: 700, color: 'var(--yellow)' },
  heroStatLabel: { fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' },
  heroStatDivider: { width: '1px', height: '36px', background: 'rgba(255,255,255,0.15)' },
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
    fontSize: 'clamp(2.2rem, 4vw, 3rem)',
    fontWeight: 700,
    margin: '0 0 20px 0',
    letterSpacing: '-1px',
    lineHeight: 1.2,
  },
  heroLead: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.75,
    maxWidth: '560px',
    marginBottom: '24px',
  },
  btnRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    background: 'var(--teal)',
    color: '#FFFFFF',
    padding: '14px 30px',
    borderRadius: '40px',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '0.95rem',
    display: 'inline-flex',
    alignItems: 'center',
    boxShadow: '0 4px 14px rgba(80, 155, 158, 0.3)',
  },
  btnSecondaryDark: {
    background: 'transparent',
    color: '#FFFFFF',
    padding: '14px 30px',
    borderRadius: '40px',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '0.95rem',
    display: 'inline-flex',
    alignItems: 'center',
    border: '1.5px solid rgba(255,255,255,0.3)',
  },
btnSecondaryLight: {
  background: 'transparent',
  color: '#FFFFFF',
  padding: '14px 30px',
  borderRadius: '40px',
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: '0.95rem',
  display: 'inline-flex',
  alignItems: 'center',
  border: '1.5px solid rgba(255,255,255,0.3)',
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
  processGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '28px',
  },
  processCard: {
    background: '#FFFFFF',
    borderRadius: 'var(--radius-card)',
    padding: '32px 28px',
    border: '1px solid var(--border-light)',
    boxShadow: 'var(--shadow-sm)',
  },
  processNumber: {
    display: 'block',
    fontSize: '1.6rem',
    fontWeight: 700,
    color: 'var(--teal)',
    marginBottom: '14px',
  },
  processTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: '10px',
  },
  processText: {
    fontSize: '0.92rem',
    color: '#5B6670',
    lineHeight: 1.6,
    margin: 0,
  },
  quoteSection: {
    padding: '80px 0',
    backgroundColor: 'var(--navy)',
  },
  quoteWrap: {
    maxWidth: '820px',
    margin: '0 auto',
    textAlign: 'center',
  },
  quoteMark: {
    fontSize: '2rem',
    color: 'rgba(80, 155, 158, 0.5)',
    marginBottom: '20px',
  },
  quoteText: {
    fontSize: '1.3rem',
    lineHeight: 1.6,
    color: '#FFFFFF',
    fontWeight: 500,
    marginBottom: '20px',
  },
  quoteAttribution: {
    fontSize: '0.95rem',
    color: 'var(--yellow)',
    fontWeight: 600,
    margin: 0,
  },
  verifyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
  },
  verifyItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: '#FFFFFF',
    border: '1px solid var(--border-light)',
    borderRadius: '16px',
    padding: '22px',
  },
  verifyIcon: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.05rem',
    flexShrink: 0,
  },
  verifyTitle: {
    fontSize: '0.98rem',
    fontWeight: 700,
    color: 'var(--navy)',
    margin: 0,
  },
  testimonialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '28px',
  },
  testimonialCard: {
    background: 'var(--bg)',
    borderRadius: 'var(--radius-card)',
    padding: '32px 28px',
    border: '1px solid var(--border-light)',
  },
  testimonialQuote: {
    fontSize: '0.98rem',
    color: 'var(--navy)',
    lineHeight: 1.65,
    marginBottom: '18px',
  },
  testimonialName: {
    fontSize: '0.92rem',
    fontWeight: 700,
    color: '#5B6670',
    margin: 0,
  },
  finalCta: {
    padding: '90px 0',
    backgroundColor: 'var(--bg)',
  },
  finalCtaRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '40px',
    background: 'var(--navy)',
    borderRadius: 'var(--radius-card)',
    padding: '48px',
    boxShadow: 'var(--shadow-md)',
  },
  finalCtaTitle: {
    fontSize: '1.7rem',
    fontWeight: 700,
    color: '#FFFFFF',
    margin: '0 0 10px 0',
    letterSpacing: '-0.5px',
  },
  finalCtaText: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.7)',
    margin: 0,
  },
  finalCtaBtns: {
    display: 'flex',
    gap: '14px',
    flexWrap: 'wrap',
    flexShrink: 0,
  },
};

export default ForEmployersPage;