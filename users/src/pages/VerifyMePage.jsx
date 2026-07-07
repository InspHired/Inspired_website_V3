import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqData = [
  { q: "What types of backgrounds can VerifyMe authenticate?", a: "We provide comprehensive authentication checks including South African ID verification, global qualification audits, criminal record clearances via biometric scans, and driver's license validation." },
  { q: "How long do typical screening pipelines take?", a: "Standard identity and credential verifications yield instant to 24-hour response vectors, while advanced background histories are completed within 48 hours." },
  { q: "Is the platform compliant with national privacy frameworks?", a: "Completely. The framework operates under strict POPIA compliance architectures, securing user data structures with end-to-end encryption protocols." }
];

const audienceItems = [
  { title: "HR Leaders", text: "Execute candidate background screening smoothly without exiting the central panel." },
  { title: "Risk Officers", text: "Enforce complete protection paradigms over organizational placement tracks." },
  { title: "SME Builders", text: "Run individual profile evaluations securely on an flexible, agile pay-per-check plan." },
  { title: "Job Seekers", text: "Maintain permanent ownership of authentic digital career credentials." },
];

const features = [
  { title: "Identity & biometrics", text: "Instant connection loops with national population registers. Confirms identity numbers and flags biometric records with total technical fidelity.", icon: "fa-id-card", accent: "var(--teal)" },
  { title: "Qualification auditing", text: "Direct mapping channels alongside global educational databases. Verifies academic degrees, specialized diplomas, and professional trade certifications.", icon: "fa-graduation-cap", accent: "var(--orange)" },
  { title: "Criminal clearances", text: "Secure linkage to verified digital criminal record databases, ensuring full corporate compliance vectors are meticulously satisfied.", icon: "fa-user-shield", accent: "var(--navy)" },
  { title: "Reference harvesting", text: "Automated communication sequences targeting historic corporate supervisors. Collects and stores structural workspace telemetry cleanly.", icon: "fa-history", accent: "var(--yellow)" },
];

const VerifyMePage = () => {
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

        .shield-pulse { animation: shieldPulse 2.4s ease-in-out infinite; }
        @keyframes shieldPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
        }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <header style={styles.heroSection}>
        <div style={styles.container}>
          <div style={styles.heroGrid} className="animate-fadeup">
            <div>
              <span style={styles.eyebrow}>Automated background screening</span>
              <div style={styles.logoRow}>
                <img src="/assets/VerifyMe.png" alt="VerifyMe Logo" style={styles.appLogo} />
                <h1 style={styles.pageTitle}>VerifyMe</h1>
              </div>
              <p style={styles.heroLead}>
                A secure, frictionless candidate credential authentication system engineered to mitigate operational risk
                and protect corporate ecosystems with high-fidelity validation.
              </p>
              <div style={styles.btnRow}>
                <a href="https://verifyme.insphired.jobs" target="_blank" rel="noreferrer" style={styles.btnPrimary} className="btn-hover-transition">
                  <i className="fas fa-external-link-alt" style={{ marginRight: '8px' }} aria-hidden="true"></i>Launch console
                </a>
              </div>
            </div>
            <div style={styles.heroVisualWrap}>
              <div style={styles.orbitRing}>
                <div className="hero-orbit-dot" style={styles.orbitDotWrap}>
                  <div style={styles.orbitDot}></div>
                </div>
                <div style={{ ...styles.glassCard, textAlign: 'center' }}>
                  <div style={styles.iconContainer} className="shield-pulse">
                    <i className="fas fa-shield-alt" style={styles.heroCardIcon} aria-hidden="true"></i>
                  </div>
                  <h3 style={styles.heroCardTitle}>POPIA secure</h3>
                  <p style={styles.heroCardText}>Fully decentralized and encrypted applicant compliance workflows.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MISSION ── */}
      <section style={styles.sectionWhite}>
        <div style={styles.container}>
          <div style={styles.splitRow}>
            <div>
              <span style={styles.sectionTag}>Risk mitigation</span>
              <h2 style={styles.sectionHeading}>Uncompromising integrity checks</h2>
              <p style={styles.bodyText}>
                We streamline verification procedures by centralizing identity management, qualification audits, and reference parameters into a unified dashboard footprint.
              </p>
              <div style={styles.quoteBlock}>
                "To deliver ironclad validation tools that protect corporate infrastructure, reduce operational turnarounds, and empower talent networks with fully verifiable profiles."
              </div>
            </div>
            <div style={styles.audienceCard}>
              <h4 style={styles.audienceHeading}>Enterprise security benefits</h4>
              <ul style={styles.bulletList}>
                {audienceItems.map((item, i) => (
                  <li key={item.title} style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{ ...styles.audienceItemIcon, background: [`var(--teal)`, `var(--orange)`, `var(--yellow)`, `var(--navy)`][i % 4] + '22', color: [`var(--teal)`, `var(--orange)`, `var(--yellow)`, `var(--navy)`][i % 4] }}>
                      <i className="fas fa-check" aria-hidden="true"></i>
                    </div>
                    <span><strong>{item.title}:</strong> {item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={styles.sectionLight}>
        <div style={styles.container}>
          <div style={styles.centerHead}>
            <span style={styles.sectionTag}>Identity infrastructure</span>
            <h2 style={styles.sectionHeading}>Core screening foundations</h2>
          </div>

          <div style={styles.featureGrid}>
            {features.map((f) => (
              <div key={f.title} style={{ ...styles.featureCard, borderTop: `5px solid ${f.accent}` }} className="interactive-card">
                <div style={{ ...styles.featureIconWrap, backgroundColor: `${f.accent}1A`, color: f.accent }}>
                  <i className={`fas ${f.icon}`} aria-hidden="true"></i>
                </div>
                <h3 style={styles.cardTitle}>{f.title}</h3>
                <p style={styles.cardText}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={styles.sectionWhite}>
        <div style={styles.container}>
          <div style={styles.centerHead}>
            <span style={styles.sectionTag}>Fidelity diagnostics</span>
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
  orbitRing: { position: 'relative', width: '100%', maxWidth: '340px', display: 'flex', justifyContent: 'center' },
  orbitDotWrap: { position: 'absolute', inset: '-14px', pointerEvents: 'none' },
  orbitDot: { position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--yellow)', boxShadow: '0 0 16px rgba(228, 175, 81, 0.6)' },
  glassCard: { background: 'rgba(255, 255, 255, 0.07)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px dashed rgba(255, 255, 255, 0.18)', borderRadius: 'var(--radius-card)', padding: '40px', maxWidth: '340px', width: '100%' },
  iconContainer: { width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(80, 155, 158, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px auto', border: '1px solid rgba(80, 155, 158, 0.3)' },
  heroCardIcon: { fontSize: '1.6rem', color: 'var(--teal)' },
  heroCardTitle: { fontWeight: 700, fontSize: '1.2rem', margin: '0 0 8px 0', color: '#FFFFFF' },
  heroCardText: { fontSize: '0.88rem', margin: 0, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 },
  sectionWhite: { padding: '100px 0', backgroundColor: '#FFFFFF' },
  sectionLight: { padding: '100px 0', backgroundColor: 'var(--bg)' },
  splitRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(45%, 1fr))', gap: '64px', alignItems: 'center' },
  sectionTag: { color: 'var(--teal)', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', display: 'block', marginBottom: '10px' },
  sectionHeading: { fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.5px' },
  sectionSub: { fontSize: '1.05rem', color: '#5B6670', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 },
  bodyText: { fontSize: '1rem', color: '#5B6670', lineHeight: 1.7 },
  quoteBlock: { marginTop: '24px', borderLeft: '4px solid var(--teal)', fontStyle: 'italic', color: 'var(--navy)', fontSize: '0.98rem', lineHeight: 1.65, backgroundColor: 'var(--bg)', padding: '16px 20px 16px 24px', borderRadius: '0 12px 12px 0' },
  audienceCard: { background: '#FFFFFF', padding: '44px 36px', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' },
  audienceHeading: { fontWeight: 700, fontSize: '1.2rem', marginBottom: '24px', color: 'var(--navy)', letterSpacing: '-0.3px' },
  bulletList: { listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' },
  centerHead: { textAlign: 'center', marginBottom: '64px' },
  featureGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' },
  featureCard: { background: '#FFFFFF', borderRadius: 'var(--radius-card)', padding: '44px 36px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', position: 'relative', overflow: 'hidden' },
  featureIconWrap: { width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '1.1rem' },
  cardTitle: { fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px' },
  cardText: { fontSize: '0.94rem', color: '#5B6670', lineHeight: 1.65, margin: 0 },
  faqWrapper: { maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' },
  faqCard: { background: '#FFFFFF', borderRadius: '14px', padding: '24px 28px', border: '1px solid var(--border-light)' },
  faqQuestion: { fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' },
  faqIcon: { marginRight: '14px', color: 'var(--teal)', fontSize: '1.1rem', flexShrink: 0 },
  faqAnswer: { fontSize: '0.94rem', color: '#5B6670', margin: '14px 0 0 0', paddingLeft: '28px', lineHeight: 1.65 },
  audienceItemIcon: { width: '24px', height: '24px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginRight: '14px', flexShrink: 0, marginTop: '2px' },
};

export default VerifyMePage;