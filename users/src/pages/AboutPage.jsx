import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const values = [
  {
    title: "Passion",
    text: "Life is too short to not love what you do. Passion drives everything we do at InspHired.",
    icon: "pulse",
    accent: "var(--teal)",
  },
  {
    title: "Integrity",
    text: "We act with authenticity and always do the right thing for our candidates, clients, and team.",
    icon: "shield",
    accent: "var(--orange)",
  },
  {
    title: "Accountability",
    text: "We take responsibility for our actions with transparency and commitment to excellence.",
    icon: "check",
    accent: "var(--yellow)",
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

const yearsInBusiness = new Date().getFullYear() - 2015;

// Generic avatar stack for the hero visual — no real photos needed, just varied accent circles.
const heroAvatars = [
  { icon: "fa-user-tie", accent: "var(--teal)" },
  { icon: "fa-user-graduate", accent: "var(--orange)" },
  { icon: "fa-user-astronaut", accent: "var(--yellow)" },
  { icon: "fa-user", accent: "var(--navy)" },
];

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

        .value-card { transition: transform var(--transition), box-shadow var(--transition) !important; }
        .value-card:hover { transform: translateY(-6px) !important; box-shadow: var(--shadow-md) !important; }

        .subscribe-input { transition: border-color var(--transition), box-shadow var(--transition); }
        .subscribe-input:focus {
          outline: none;
          border-color: var(--teal) !important;
          box-shadow: 0 0 0 3px rgba(80, 155, 158, 0.15);
        }
        .subscribe-btn { transition: transform var(--transition), opacity var(--transition); }
        .subscribe-btn:hover { transform: translateY(-2px); opacity: 0.95; }

        .hero-orbit-dot { animation: heroOrbit 10s linear infinite; }
        @keyframes heroOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .hero-avatar-float {
          transition: transform var(--transition);
        }
        .hero-avatar-float:hover {
          transform: translateY(-4px) scale(1.08);
          z-index: 5;
        }

        @media (max-width: 900px) {
          .mv-grid { grid-template-columns: 1fr !important; }
          .subscribe-row { flex-direction: column !important; }
          .subscribe-row input, .subscribe-row button { width: 100% !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual-wrap { margin-top: 40px; }
        }
      `}</style>

      <Navbar />

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
              <div style={styles.orbitRing}>
                <div className="hero-orbit-dot" style={styles.orbitDotWrap}>
                  <div style={styles.orbitDot}></div>
                </div>

                <div style={styles.visualCard}>
                  <img
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=900&auto=format&fit=crop"
                    alt="InspHired team collaborating"
                    style={styles.visualImg}
                  />
                  <div style={styles.visualOverlay}></div>

                  <div style={styles.avatarStack}>
                    {heroAvatars.map((a, i) => (
                      <div
                        key={i}
                        className="hero-avatar-float"
                        style={{
                          ...styles.avatarCircle,
                          borderColor: a.accent,
                          marginLeft: i === 0 ? 0 : -14,
                          zIndex: heroAvatars.length - i,
                        }}
                      >
                        <i className={`fas ${a.icon}`} style={{ color: a.accent, fontSize: '0.9rem' }} aria-hidden="true"></i>
                      </div>
                    ))}
                    <span style={styles.avatarStackLabel}>+ our full team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MISSION & VISION ── */}
      <section style={styles.sectionWhite}>
        <div style={styles.container}>
          <div className="mv-grid" style={styles.mvGrid}>
            <div style={{ ...styles.mvCard, borderTop: '4px solid var(--teal)' }}>
              <div style={{ ...styles.mvIconWrap, background: 'rgba(80, 155, 158, 0.12)', color: 'var(--teal)' }}>
                <i className="fas fa-bullseye" aria-hidden="true"></i>
              </div>
              <h3 style={styles.mvTitle}>Our mission</h3>
              <p style={styles.mvText}>
                To provide innovative recruitment solutions through technology and
                people. To InspHired.
              </p>
            </div>

            <div style={{ ...styles.mvCard, borderTop: '4px solid var(--orange)' }}>
              <div style={{ ...styles.mvIconWrap, background: 'rgba(217, 107, 67, 0.12)', color: 'var(--orange)' }}>
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
                <div style={{ ...styles.timelineDot, background: 'var(--teal)' }}></div>
                <div>
                  <p style={styles.timelineYear}>2015</p>
                  <p style={styles.timelineText}>InspHired founded, focused on bridging candidates and clients.</p>
                </div>
              </div>
              <div style={styles.timelineItem}>
                <div style={{ ...styles.timelineDot, background: 'var(--orange)' }}></div>
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

      {/* ── GET JOB NOTIFICATIONS ── */}
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
    background: 'var(--navy)',
    padding: '130px 0 90px',
    color: '#FFFFFF',
    overflow: 'hidden',
  },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1.15fr 0.85fr',
    gap: '48px',
    alignItems: 'center',
  },
  heroContent: {
    maxWidth: '620px',
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
    marginBottom: '40px',
    maxWidth: '560px',
  },
  heroStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
    flexWrap: 'wrap',
  },
  heroStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  heroStatNumber: {
    fontSize: '1.7rem',
    fontWeight: 700,
    color: 'var(--yellow)',
  },
  heroStatLabel: {
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  heroStatDivider: {
    width: '1px',
    height: '36px',
    background: 'rgba(255,255,255,0.15)',
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
  visualCard: {
    position: 'relative',
    width: '100%',
    borderRadius: 'var(--radius-card)',
    overflow: 'hidden',
    border: '1px dashed rgba(255, 255, 255, 0.18)',
    boxShadow: 'var(--shadow-md)',
    minHeight: '320px',
    display: 'flex',
    alignItems: 'flex-end',
  },
  visualImg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  visualOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(31,53,64,0.9) 0%, rgba(31,53,64,0.35) 55%, rgba(31,53,64,0.05) 100%)',
  },
  avatarStack: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    padding: '24px',
  },
  avatarCircle: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    background: 'var(--navy)',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
  },
  avatarStackLabel: {
    marginLeft: '14px',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#FFFFFF',
  },
  sectionWhite: { padding: '90px 0', backgroundColor: '#FFFFFF' },
  sectionLight: { padding: '90px 0', backgroundColor: 'var(--bg)' },
  eyebrowDark: {
    display: 'block',
    fontSize: '0.8rem',
    letterSpacing: '2px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: 'var(--teal)',
    marginBottom: '10px',
  },
  centerHead: {
    textAlign: 'center',
    marginBottom: '56px',
  },
  sectionHeading: {
    fontSize: 'clamp(1.8rem, 3vw, 2.3rem)',
    fontWeight: 700,
    color: 'var(--navy)',
    letterSpacing: '-0.5px',
    margin: 0,
  },
  mvGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
  },
  mvCard: {
    background: '#FFFFFF',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-card)',
    boxShadow: 'var(--shadow-sm)',
    padding: '40px',
  },
  mvIconWrap: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  mvTitle: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: 'var(--navy)',
    margin: '0 0 12px 0',
  },
  mvText: {
    fontSize: '1rem',
    color: '#5B6670',
    lineHeight: 1.7,
    margin: 0,
  },
  storyRow: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '60px',
    alignItems: 'start',
  },
  storyTextCol: {},
  storyText: {
    fontSize: '1rem',
    color: '#5B6670',
    lineHeight: 1.75,
    marginBottom: '16px',
  },
  storyTimeline: {
    background: '#FFFFFF',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-card)',
    boxShadow: 'var(--shadow-sm)',
    padding: '36px',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },
  timelineItem: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  timelineDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginTop: '6px',
    flexShrink: 0,
  },
  timelineYear: {
    fontSize: '0.85rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--navy)',
    margin: '0 0 4px 0',
  },
  timelineText: {
    fontSize: '0.95rem',
    color: '#5B6670',
    lineHeight: 1.6,
    margin: 0,
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '28px',
  },
  valueCard: {
    background: '#FFFFFF',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-card)',
    boxShadow: 'var(--shadow-sm)',
    padding: '36px',
  },
  valueIconWrap: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  valueTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: 'var(--navy)',
    margin: '0 0 10px 0',
  },
  valueText: {
    fontSize: '0.95rem',
    color: '#5B6670',
    lineHeight: 1.65,
    margin: 0,
  },
  subscribeSection: {
    padding: '80px 0 100px',
    backgroundColor: 'var(--bg)',
  },
  subscribeCard: {
    background: 'var(--navy)',
    borderRadius: 'var(--radius-card)',
    padding: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '40px',
    flexWrap: 'wrap',
    boxShadow: 'var(--shadow-md)',
  },
  subscribeTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#FFFFFF',
    margin: '0 0 8px 0',
  },
  subscribeText: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.7)',
    margin: 0,
  },
  subscribeRow: {
    display: 'flex',
    gap: '12px',
    flexShrink: 0,
  },
  subscribeInput: {
    padding: '14px 18px',
    borderRadius: '40px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.08)',
    color: '#FFFFFF',
    fontSize: '0.95rem',
    minWidth: '260px',
    fontFamily: 'inherit',
  },
  subscribeBtn: {
    background: 'var(--teal)',
    color: '#FFFFFF',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '40px',
    fontWeight: 700,
    fontSize: '0.95rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  subscribeSuccess: {
    color: 'var(--yellow)',
    fontWeight: 600,
    fontSize: '0.95rem',
  },
};

export default AboutPage;