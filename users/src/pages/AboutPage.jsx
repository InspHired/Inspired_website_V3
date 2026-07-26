import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const values = [
  {
    title: "Passion",
    text: "Life is too short to not love what you do. Passion drives everything we do at InspHired.",
    icon: "pulse",
    accent: "var(--teal, #509b9e)",
  },
  {
    title: "Integrity",
    text: "We act with authenticity and always do the right thing for our candidates, clients, and team.",
    icon: "shield",
    accent: "var(--orange, #d96b43)",
  },
  {
    title: "Accountability",
    text: "We take responsibility for our actions with transparency and commitment to excellence.",
    icon: "check",
    accent: "var(--yellow, #e4af51)",
  },
];

function ValueIcon({ type, color }) {
  switch (type) {
    case "pulse":
      return (
        <svg viewBox="0 0 40 40" className="value-icon">
          <circle cx="20" cy="20" r="7" fill={color} />
          <circle cx="20" cy="20" r="14" fill="none" stroke={color} strokeWidth="1.5" className="vi-pulse-ring" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 40 40" className="value-icon">
          <path d="M20 6 L32 11 V19 C32 27 27 32 20 34 C13 32 8 27 8 19 V11 Z" fill="none" stroke={color} strokeWidth="2" />
          <path d="M14 20 L18 24 L27 14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vi-check-draw" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 40 40" className="value-icon">
          <rect x="9" y="24" width="5" height="8" fill={color} className="vi-gbar vi-gbar-1" />
          <rect x="18" y="18" width="5" height="14" fill={color} className="vi-gbar vi-gbar-2" />
          <rect x="27" y="10" width="5" height="22" fill={color} className="vi-gbar vi-gbar-3" />
        </svg>
      );
    default:
      return null;
  }
}

/* ── REALISTIC AVATAR STAGE COMPONENT ── */
function RealisticAvatarCanvas() {
  return (
    <div className="avatar-canvas-container">
      {/* Background Glows */}
      <div className="glow-sphere teal-glow"></div>
      <div className="glow-sphere orange-glow"></div>

      {/* Main Glass Stage */}
      <div className="avatar-stage-card">

        {/* Recruiter Card */}
        <div className="floating-avatar-item float-1">
          <div className="photo-frame teal-border">
            <img src="/assets/insphiredTeam/Ene-ene.png" alt="Talent Recruiter" className="avatar-img" />
          </div>
          <div className="avatar-badge">
            <span className="badge-dot teal"></span> Talent Recruiter
          </div>
        </div>

        {/* Candidate Card */}
        <div className="floating-avatar-item float-2">
          <div className="photo-frame orange-border">
            <img src="/assets/insphiredTeam/Rochelle.png" alt="Candidate" className="avatar-img" />
          </div>
          <div className="avatar-badge">
            <span className="badge-dot orange"></span> Candidate
          </div>
        </div>

        {/* Enterprise Client Card */}
        <div className="floating-avatar-item float-3">
          <div className="photo-frame yellow-border">
            <img src="/assets/insphiredTeam/Tumelo.png" alt="Enterprise Client" className="avatar-img" />
          </div>
          <div className="avatar-badge">
            <span className="badge-dot yellow"></span> Enterprise Client
          </div>
        </div>

        {/* Central Core Metrics */}
        <div className="center-metallic-core">
          <div className="core-pulse-ring"></div>
          <div className="core-brand-tag">
            <span className="core-number">{new Date().getFullYear() - 2015}+</span>
            <span className="core-label">Years Connecting People</span>
          </div>
        </div>

      </div>
    </div>
  );
}

const yearsInBusiness = new Date().getFullYear() - 2015;

const AboutPage = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div style={styles.pageWrapper}>
      

      <style>{`
        .value-icon { width: 34px; height: 34px; }

        .vi-pulse-ring {
          transform-origin: center;
          animation: viPulseRing 2s ease-out infinite;
        }
        @keyframes viPulseRing {
          0% { transform: scale(0.7); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        .vi-check-draw {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
          animation: viCheckDraw 2.4s ease-in-out infinite;
        }
        @keyframes viCheckDraw {
          0% { stroke-dashoffset: 20; }
          40% { stroke-dashoffset: 0; }
          80% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }

        .vi-gbar { transform-origin: bottom center; animation: viGrowBar 2s ease-in-out infinite; }
        .vi-gbar-1 { animation-delay: 0s; }
        .vi-gbar-2 { animation-delay: 0.25s; }
        .vi-gbar-3 { animation-delay: 0.5s; }
        @keyframes viGrowBar { 0%, 100% { transform: scaleY(0.85); } 50% { transform: scaleY(1); } }

        /* ── REALISTIC AVATAR STAGE CSS ── */
        .avatar-canvas-container {
          position: relative;
          width: 100%;
          min-height: 440px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .avatar-stage-card {
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

        .avatar-stage-card:hover {
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

        .floating-avatar-item {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          transition: transform 0.3s ease;
        }

        .float-1 { top: 20px; left: 25px; animation: floatAnim 4s ease-in-out infinite; }
        .float-2 { top: 35px; right: 25px; animation: floatAnim 4.8s ease-in-out infinite 0.8s; }
        .float-3 { bottom: 25px; left: 50%; transform: translateX(-50%); animation: floatAnim 4.2s ease-in-out infinite 1.5s; }

        @keyframes floatAnim {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        /* Image Photo Frames */
        .photo-frame {
          width: 86px;
          height: 86px;
          border-radius: 50%;
          padding: 3px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.35);
          overflow: hidden;
          background: #1f3540;
        }

        .teal-border { border: 2px solid #509b9e; }
        .orange-border { border: 2px solid #d96b43; }
        .yellow-border { border: 2px solid #e4af51; }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          display: block;
        }

        .avatar-badge {
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

        .core-brand-tag {
          text-align: center;
          display: flex;
          flex-direction: column;
        }
        .core-number {
          font-size: 1.5rem;
          font-weight: 800;
          color: #e4af51;
        }
        .core-label {
          font-size: 0.58rem;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.5px;
        }

        .value-card { transition: transform 0.25s ease, box-shadow 0.25s ease !important; }
        .value-card:hover { transform: translateY(-6px) !important; box-shadow: 0 12px 30px rgba(0,0,0,0.08) !important; }

        @media (max-width: 900px) {
          .mv-grid { grid-template-columns: 1fr !important; }
          .subscribe-row { flex-direction: column !important; }
          .subscribe-row input, .subscribe-row button { width: 100% !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual-wrap { margin-top: 30px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <header style={styles.hero}>
        <div style={styles.container}>
          <div className="hero-grid" style={styles.heroGrid}>
            <div style={styles.heroContent}>
              <span style={styles.eyebrow}>About us</span>
              <h1 style={styles.heroTitle}>InspHired Recruitment Solutions</h1>
              <p style={styles.heroLead}>
                Founded in 2015, InspHired Recruitment Solutions is a talent solution
                provider focused on innovation, using technology and people to bridge
                the gap between candidates and clients.
              </p>

              <div style={styles.heroStats}>
                <div style={styles.heroStat}>
                  <span style={styles.heroStatNumber}>{yearsInBusiness}+</span>
                  <span style={styles.heroStatLabel}>Years in business</span>
                </div>
                <div style={styles.heroStatDivider}></div>
                <div style={styles.heroStat}>
                  <span style={styles.heroStatNumber}>2015</span>
                  <span style={styles.heroStatLabel}>Founded</span>
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
              <RealisticAvatarCanvas />
            </div>
          </div>
        </div>
      </header>

      {/* ── MISSION & VISION ── */}
      <section style={styles.sectionWhite}>
        <div style={styles.container}>
          <div className="mv-grid" style={styles.mvGrid}>
            <div style={{ ...styles.mvCard, borderTop: '4px solid var(--teal, #509b9e)' }}>
              <div style={{ ...styles.mvIconWrap, background: 'rgba(80, 155, 158, 0.12)', color: 'var(--teal, #509b9e)' }}>
                <i className="fas fa-bullseye" aria-hidden="true"></i>
              </div>
              <h3 style={styles.mvTitle}>Our mission</h3>
              <p style={styles.mvText}>
                To provide innovative recruitment solutions through technology and
                people. To InspHired.
              </p>
            </div>

            <div style={{ ...styles.mvCard, borderTop: '4px solid var(--orange, #d96b43)' }}>
              <div style={{ ...styles.mvIconWrap, background: 'rgba(217, 107, 67, 0.12)', color: 'var(--orange, #d96b43)' }}>
                <i className="fas fa-eye" aria-hidden="true"></i>
              </div>
              <h3 style={styles.mvTitle}>Our vision</h3>
              <p style={styles.mvText}>
                To be the number one solution to Africa's employment challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section style={styles.sectionLight}>
        <div style={styles.container}>
          <div style={styles.storyRow}>
            <div style={styles.storyTextCol}>
              <span style={styles.eyebrowDark}>Our story</span>
              <h2 style={styles.sectionHeading}>Where it all began</h2>
              <p style={styles.storyText}>
                We embarked on a mission in 2015 to transform recruitment through
                innovation, connecting the right people with the right opportunities.
              </p>
              <p style={styles.storyText}>
                What started as a focused recruitment firm has steadily grown into
                a full talent ecosystem — spanning AI-powered candidate matching,
                on-demand temp staffing, a free job board, and background
                verification — all built to serve employers and job seekers across
                the continent.
              </p>
            </div>
            <div style={styles.storyTimeline}>
              <div style={styles.timelineItem}>
                <div style={{ ...styles.timelineDot, background: 'var(--teal, #509b9e)' }}></div>
                <div>
                  <p style={styles.timelineYear}>2015</p>
                  <p style={styles.timelineText}>InspHired founded, focused on bridging candidates and clients.</p>
                </div>
              </div>
              <div style={styles.timelineItem}>
                <div style={{ ...styles.timelineDot, background: 'var(--orange, #d96b43)' }}></div>
                <div>
                  <p style={styles.timelineYear}>Today</p>
                  <p style={styles.timelineText}>A multi-platform ecosystem serving candidates and employers across Africa.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={styles.sectionWhite}>
        <div style={styles.container}>
          <div style={styles.centerHead}>
            <span style={styles.eyebrowDark}>What drives us</span>
            <h2 style={styles.sectionHeading}>Our values</h2>
          </div>

          <div style={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.title} style={{ ...styles.valueCard, borderTop: `4px solid ${v.accent}` }} className="value-card">
                <div style={{ ...styles.valueIconWrap, background: `${v.accent}1A` }}>
                  <ValueIcon type={v.icon} color={v.accent} />
                </div>
                <h3 style={styles.valueTitle}>{v.title}</h3>
                <p style={styles.valueText}>{v.text}</p>
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
              <h3 style={styles.subscribeTitle}>Get job notifications</h3>
              <p style={styles.subscribeText}>Hey there 👋 Subscribe to stay updated with new opportunities.</p>
            </div>

            {subscribed ? (
              <div style={styles.subscribeSuccess}>
                <i className="fas fa-check-circle" style={{ marginRight: '8px' }} aria-hidden="true"></i>
                You're subscribed — watch your inbox!
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
                  Subscribe
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
  pageWrapper: { color: 'var(--navy, #1f3540)', backgroundColor: 'var(--bg, #faf6f0)', lineHeight: 1.65 },
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 32px', width: '100%' },
  hero: { background: 'var(--navy, #1f3540)', padding: '130px 0 90px', color: '#FFFFFF', overflow: 'hidden' },
  heroGrid: { display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' },
  heroContent: { maxWidth: '620px' },
  eyebrow: {
    display: 'inline-block',
    fontSize: '0.8rem',
    letterSpacing: '2px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: 'var(--teal, #509b9e)',
    backgroundColor: 'rgba(80, 155, 158, 0.15)',
    padding: '6px 14px',
    borderRadius: '20px',
    marginBottom: '20px',
  },
  heroTitle: { fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 700, margin: '0 0 20px 0', letterSpacing: '-1px', lineHeight: 1.2 },
  heroLead: { fontSize: '1.1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: '40px', maxWidth: '560px' },
  heroStats: { display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' },
  heroStat: { display: 'flex', flexDirection: 'column', gap: '4px' },
  heroStatNumber: { fontSize: '1.7rem', fontWeight: 700, color: 'var(--yellow, #e4af51)' },
  heroStatLabel: { fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' },
  heroStatDivider: { width: '1px', height: '36px', background: 'rgba(255,255,255,0.15)' },
  heroVisualWrap: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  sectionWhite: { padding: '90px 0', backgroundColor: '#FFFFFF' },
  sectionLight: { padding: '90px 0', backgroundColor: 'var(--bg, #faf6f0)' },
  eyebrowDark: { display: 'block', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--teal, #509b9e)', marginBottom: '10px' },
  centerHead: { textAlign: 'center', marginBottom: '56px' },
  sectionHeading: { fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', fontWeight: 700, color: 'var(--navy, #1f3540)', letterSpacing: '-0.5px', margin: 0 },
  mvGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' },
  mvCard: { background: '#FFFFFF', border: '1px solid var(--border-light, #e5dfd5)', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.04)', padding: '40px' },
  mvIconWrap: { width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '20px' },
  mvTitle: { fontSize: '1.3rem', fontWeight: 700, color: 'var(--navy, #1f3540)', margin: '0 0 12px 0' },
  mvText: { fontSize: '1rem', color: '#5B6670', lineHeight: 1.7, margin: 0 },
  storyRow: { display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '60px', alignItems: 'start' },
  storyTextCol: {},
  storyText: { fontSize: '1rem', color: '#5B6670', lineHeight: 1.75, marginBottom: '16px' },
  storyTimeline: { background: '#FFFFFF', border: '1px solid var(--border-light, #e5dfd5)', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.04)', padding: '36px', display: 'flex', flexDirection: 'column', gap: '28px' },
  timelineItem: { display: 'flex', gap: '16px', alignItems: 'flex-start' },
  timelineDot: { width: '12px', height: '12px', borderRadius: '50%', marginTop: '6px', flexShrink: 0 },
  timelineYear: { fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--navy, #1f3540)', margin: '0 0 4px 0' },
  timelineText: { fontSize: '0.95rem', color: '#5B6670', lineHeight: 1.6, margin: 0 },
  valuesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' },
  valueCard: { background: '#FFFFFF', border: '1px solid var(--border-light, #e5dfd5)', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.04)', padding: '36px' },
  valueIconWrap: { width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' },
  valueTitle: { fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy, #1f3540)', margin: '0 0 10px 0' },
  valueText: { fontSize: '0.95rem', color: '#5B6670', lineHeight: 1.65, margin: 0 },
  subscribeSection: { padding: '80px 0 100px', backgroundColor: 'var(--bg, #faf6f0)' },
  subscribeCard: { background: 'var(--navy, #1f3540)', borderRadius: '24px', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap', boxShadow: '0 16px 36px rgba(31, 53, 64, 0.15)' },
  subscribeTitle: { fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0' },
  subscribeText: { fontSize: '1rem', color: 'rgba(255,255,255,0.7)', margin: 0 },
  subscribeRow: { display: 'flex', gap: '12px', flexShrink: 0 },
  subscribeInput: { padding: '14px 18px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', fontSize: '0.95rem', minWidth: '260px', fontFamily: 'inherit' },
  subscribeBtn: { background: 'var(--teal, #509b9e)', color: '#FFFFFF', border: 'none', padding: '14px 32px', borderRadius: '40px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', whiteSpace: 'nowrap' },
  subscribeSuccess: { color: 'var(--yellow, #e4af51)', fontWeight: 600, fontSize: '0.95rem' },
};

export default AboutPage;