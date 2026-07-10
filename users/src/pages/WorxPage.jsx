import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqData = [
  { q: "What is InspHired Worx?", a: "InspHired Worx is an on-demand temporary staffing platform connecting enterprises with vetted temporary labor, automating everything from scheduling to background verification." },
  { q: "Can I use it for emergency, last-minute shift allocations?", a: "Yes. Our advanced location tracking algorithms are optimized to find verified temporary staff nearby to cover critical gaps immediately." },
  { q: "How is payroll admin controlled?", a: "The platform features a comprehensive dashboard handling multi-branch assignment logic, cross-provincial compliance checks, and automated digital invoicing." }
];

const pillars = [
  { title: "Instant access", text: "Gain immediate access to a pool of qualified and pre-screened temporary staff ready to fill staffing needs at a moment's notice.", icon: "fa-bolt", accent: "var(--teal)" },
  { title: "Streamlined search", text: "Our user-friendly interface and advanced search filters enable you to discover the perfect verified candidate quickly and efficiently.", icon: "fa-sliders-h", accent: "var(--orange)" },
  { title: "Effortless admin", text: "The system automates complex backend workflows like payroll processing, timesheets, invoicing, and local compliance constraints.", icon: "fa-file-invoice-dollar", accent: "var(--yellow)" },
];

const modules = [
  { title: "Corporate dashboard", text: "Coordinate external shift configurations over multiple branches seamlessly. Establish regional rules, track cross-team deployments, and analyze historical spend pipelines maps.", accent: "var(--teal)" },
  { title: "GEO location filter", text: "Pinpoint active, vetted candidates within localized radiuses. Drastically cuts transit lag for immediate emergency assignments.", accent: "var(--orange)" },
  { title: "Performance matrices", text: "Ensure premium service delivery metrics across shift boundaries. Log direct workspace reviews, monitor attendance tracking, and rate shift output metrics inside the interface.", accent: "var(--navy)" },
];

const WorxPage = () => {
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
        .faq-answer-wrap { overflow: hidden; max-height: 0; transition: max-height 0.3s ease; }
        .faq-answer-wrap.open { max-height: 200px; }

        .hero-orbit-dot { animation: heroOrbit 10s linear infinite; }
        @keyframes heroOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>


      {/* ── HERO ── */}
      <header style={styles.heroSection}>
        <div style={styles.container}>
          <div style={styles.heroGrid} className="animate-fadeup">
            <div>
              <span style={styles.eyebrow}>On-demand workforce allocation</span>
              <div style={styles.logoRow}>
                <img src="/assets/InspHiredWorx.png" alt="Worx Logo" style={styles.appLogo} />
                <h1 style={styles.pageTitle}>InspHired Worx</h1>
              </div>
              <p style={styles.heroLead}>
                Your gateway to automated temporary recruitment. Access instant, verified temporary matches
                backed by 9 years of regional expertise and over 500 validated placements.
              </p>
              <div style={styles.btnRow}>
                <a href="https://worx.insphired.jobs/" target="_blank" rel="noreferrer" style={styles.btnPrimary} className="btn-hover-transition">
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
                      <div style={{ ...styles.metricNumber, color: 'var(--teal)' }}>9 yrs</div>
                      <div style={styles.metricLabel}>In recruitment</div>
                    </div>
                    <div style={styles.metricBlock} className="metric-block">
                      <div style={{ ...styles.metricNumber, color: 'var(--orange)' }}>500+</div>
                      <div style={styles.metricLabel}>Temp placements</div>
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
            <h2 style={styles.sectionHeading}>Why choose us</h2>
            <p style={styles.sectionSub}>Transforming temporary hiring through real-time verification and zero administrative waste.</p>
          </div>

          <div style={styles.featureGrid}>
            {pillars.map((p) => (
              <div key={p.title} style={{ ...styles.featureCard, borderTop: `4px solid ${p.accent}` }} className="interactive-card">
                <div style={{ ...styles.iconBox, backgroundColor: `${p.accent}1A`, color: p.accent }}>
                  <i className={`fas ${p.icon}`} aria-hidden="true"></i>
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
            <p style={styles.sectionSub}>Enterprise architecture tailored to multi-branch operations.</p>
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
                  style={{ ...styles.faqCard, borderColor: isOpen ? 'var(--teal)' : 'var(--border-light)' }}
                  className="faq-item-transition"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenFaq(isOpen ? null : i); } }}
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
  pageWrapper: { color: 'var(--navy)', backgroundColor: 'var(--bg)', lineHeight: 1.65 },
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 32px', width: '100%' },
  heroSection: { backgroundColor: 'var(--navy)', padding: '130px 0 100px 0', position: 'relative', overflow: 'hidden' },
  heroGrid: { display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center' },
  eyebrow: { display: 'inline-block', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--teal)', backgroundColor: 'rgba(80, 155, 158, 0.15)', padding: '6px 14px', borderRadius: '20px', marginBottom: '18px' },
  logoRow: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' },
  appLogo: { width: '48px', height: '48px', objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(80, 155, 158, 0.3))' },
  pageTitle: { fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 700, color: '#FFFFFF', margin: 0, lineHeight: 1.15, letterSpacing: '-1px' },
  heroLead: { fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', marginBottom: '32px', maxWidth: '580px', lineHeight: 1.7 },
  btnRow: { display: 'flex', gap: '16px' },
  btnPrimary: { background: 'var(--orange)', color: '#FFFFFF', padding: '14px 32px', borderRadius: '40px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', boxShadow: '0 4px 14px rgba(217, 107, 67, 0.35)' },
  heroVisualWrap: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  orbitRing: { position: 'relative', width: '100%', maxWidth: '380px', display: 'flex', justifyContent: 'center' },
  orbitDotWrap: { position: 'absolute', inset: '-14px', pointerEvents: 'none' },
  orbitDot: { position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--yellow)', boxShadow: '0 0 16px rgba(228, 175, 81, 0.6)' },
  glassCard: { background: 'rgba(255, 255, 255, 0.07)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px dashed rgba(255, 255, 255, 0.18)', borderRadius: 'var(--radius-card)', padding: '40px', maxWidth: '380px', width: '100%' },
  metricBlock: { flex: 1, padding: '20px 16px', background: '#FFFFFF', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' },
  metricNumber: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '4px' },
  metricLabel: { fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px', color: 'var(--navy)' },
  sectionWhite: { padding: '100px 0', backgroundColor: '#FFFFFF' },
  sectionLight: { padding: '100px 0', backgroundColor: 'var(--bg)' },
  sectionTag: { color: 'var(--teal)', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', display: 'block', marginBottom: '10px' },
  sectionHeading: { fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.5px' },
  sectionSub: { fontSize: '1.05rem', color: '#5B6670', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 },
  centerHead: { textAlign: 'center', marginBottom: '64px' },
  featureGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' },
  featureCard: { background: '#FFFFFF', borderRadius: 'var(--radius-card)', padding: '44px 36px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', position: 'relative', overflow: 'hidden' },
  iconBox: { width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '1.1rem' },
  cardTitle: { fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px' },
  cardText: { fontSize: '0.94rem', color: '#5B6670', lineHeight: 1.65, margin: 0 },
  moduleHeading: { fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' },
  faqWrapper: { maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' },
  faqCard: { background: '#FFFFFF', borderRadius: '14px', padding: '24px 28px', border: '1px solid var(--border-light)' },
  faqQuestion: { fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' },
  faqIcon: { marginRight: '14px', color: 'var(--teal)', fontSize: '1.1rem', flexShrink: 0 },
  faqAnswer: { fontSize: '0.94rem', color: '#5B6670', margin: '14px 0 0 0', paddingLeft: '28px', lineHeight: 1.65 },
};

export default WorxPage;