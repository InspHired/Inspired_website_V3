// users/src/pages/AboutPage.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { publicApi } from "../services/api";

// Hardcoded Team Members (stays as is)
const teamMembers = [
  {
    name: "Landry Mutombo",
    role: "Leadership & Platform Ecosystems",
    avatar: "/images/landry.jpg",
    fallback: "https://ui-avatars.com/api/?name=Landry+Mutombo&background=509b9e&color=fff&size=250&font-size=0.35",
    accent: "var(--teal, #509b9e)",
  },
  {
    name: "Norma Banda",
    role: "Strategic Operations & Talent Lead",
    avatar: "/images/norma.jpg",
    fallback: "https://ui-avatars.com/api/?name=Norma+Banda&background=d96b43&color=fff&size=250&font-size=0.35",
    accent: "var(--orange, #d96b43)",
  },
  {
    name: "Daniela Sounes",
    role: "Consulting Partner",
    avatar: "/images/daniela.jpg",
    fallback: "https://ui-avatars.com/api/?name=Daniela+Sounes&background=e4af51&color=fff&size=250&font-size=0.35",
    accent: "var(--yellow, #e4af51)",
  },
];

// Hardcoded Timeline Data (stays as is)
const milestones = [
  {
    year: "2015",
    step: "01 — 06",
    subtitle: "THE FOUNDATION",
    title: "The InspHired Journey Begins",
    description:
      "InspHired Recruitment Solutions was founded with a vision to become Africa's number one solution to recruitment challenges through innovative talent solutions and people.",
    accent: "var(--teal, #509b9e)",
  },
  {
    year: "2022",
    step: "02 — 06",
    subtitle: "RECORD BREAKING",
    title: "Record-Breaking Performance",
    description:
      "Achieved a record revenue year, reflecting growing client trust, increased placement success, and sustained growth across recruitment and workforce solutions.",
    accent: "var(--orange, #d96b43)",
  },
  {
    year: "2023",
    step: "03 — 06",
    subtitle: "SCALING OPERATIONS",
    title: "Building for Scale",
    description:
      "Strengthened operational infrastructure, governance, systems, and recruitment processes to support a growing client base and prepare the business for its next phase of growth.",
    accent: "var(--yellow, #e4af51)",
  },
  {
    year: "2024",
    step: "04 — 06",
    subtitle: "REGIONAL EXPANSION",
    title: "Regional Expansion",
    description:
      "Expanded operations across Johannesburg, Cape Town, and Kinshasa, allowing InspHired to support more clients, candidates, and workforce initiatives across multiple regions.",
    accent: "var(--teal, #509b9e)",
  },
  {
    year: "2025",
    step: "05 — 06",
    subtitle: "A DECADE OF IMPACT",
    title: "10 Years of InspHiring & Digital Innovation",
    description:
      "Celebrated a decade of partnering with clients and changing lives through meaningful placements while launching InspHired Worx, InspHired Connect, and VerifyMe, expanding our digital and workforce solutions offering.",
    accent: "var(--orange, #d96b43)",
  },
  {
    year: "2026",
    step: "06 — 06",
    subtitle: "NEW CHAPTER",
    title: "A New Home, A New Chapter",
    description:
      "Relocated to our new La Rocca headquarters and introduced an enhanced organisational structure focused on collaboration, efficiency, and sustainable growth. Early results have already translated into stronger team performance and revenue growth.",
    accent: "var(--yellow, #e4af51)",
  },
];

// Hardcoded Values (stays as is)
const defaultValues = [
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
          <circle
            cx="20"
            cy="20"
            r="14"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            className="vi-pulse-ring"
          />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 40 40" className="value-icon">
          <path
            d="M20 6 L32 11 V19 C32 27 27 32 20 34 C13 32 8 27 8 19 V11 Z"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
          <path
            d="M14 20 L18 24 L27 14"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="vi-check-draw"
          />
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

/* ── RADIAL TIMELINE HERO (Hardcoded) ── */
function CurvedTimelineHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % milestones.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const current = milestones[activeIndex];
  const rotationDeg = activeIndex * -45 + 90;

  return (
    <div className="polibio-hero-stage">
      {/* Top Bar Navigation Counter */}
      <div className="polibio-top-bar">
        <span className="brand-tag">✦ InspHired / Timeline</span>
        <span className="step-counter">{current.step}</span>
      </div>

      {/* Main Grid Section */}
      <div className="polibio-main-grid">
        {/* Left Column: Enlarged Emerging Wheel */}
        <div className="polibio-arc-container">
          <div
            className="polibio-wheel-rotator"
            style={{ transform: `rotate(${rotationDeg}deg)` }}
          >
            <svg viewBox="0 0 600 600" className="polibio-wheel-svg">
              {/* Outer Thin Guide Ring */}
              <circle
                cx="300"
                cy="300"
                r="285"
                fill="none"
                stroke="rgba(255, 255, 255, 0.18)"
                strokeWidth="1.5"
              />

              {/* Segmented Ticked Outer Rim */}
              {Array.from({ length: 48 }).map((_, i) => (
                <line
                  key={i}
                  x1="300"
                  y1="18"
                  x2="300"
                  y2="30"
                  stroke={i % 2 === 0 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)"}
                  strokeWidth={i % 2 === 0 ? "2" : "1"}
                  transform={`rotate(${i * 7.5} 300 300)`}
                />
              ))}

              {/* Block Segment Dial Ring */}
              <circle
                cx="300"
                cy="300"
                r="245"
                fill="none"
                stroke="rgba(80, 155, 158, 0.25)"
                strokeWidth="42"
                strokeDasharray="18 4"
              />

              {/* Inner Guide Line */}
              <circle
                cx="300"
                cy="300"
                r="220"
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1"
              />

              {/* Milestone Years */}
              {milestones.map((m, idx) => {
                const angle = idx * 45;
                const isActive = idx === activeIndex;
                return (
                  <text
                    key={m.year}
                    x="300"
                    y="70"
                    fill={isActive ? "#ffffff" : "rgba(255, 255, 255, 0.35)"}
                    fontSize={isActive ? "19" : "15"}
                    fontWeight={isActive ? "700" : "500"}
                    textAnchor="middle"
                    transform={`rotate(${angle} 300 300)`}
                    className="wheel-year-text"
                  >
                    {m.year}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Pointer Button */}
          <button
            className="polibio-pointer-btn"
            onClick={() => {
              setActiveIndex((prev) => (prev + 1) % milestones.length);
              setIsPlaying(false);
            }}
            style={{ backgroundColor: current.accent }}
            title="Next Milestone"
          >
            <i className="fas fa-hand-pointer pointer-icon"></i>
          </button>

          {/* Focal Guide Line */}
          <div className="polibio-focal-line"></div>
        </div>

        {/* Middle Column: Story Details */}
        <div className="polibio-story-col">
          <h2 className="story-main-title">{current.title}</h2>
          <p className="story-desc-text">{current.description}</p>
        </div>

        {/* Right Column: Hero Year Display */}
        <div className="polibio-year-col">
          <div className="year-header">
            <h1 className="story-eyebrow">Our Story</h1>
            <span className="story-subtitle">{current.subtitle}</span>
          </div>

          <div className="big-year-display">
            <span key={current.year} className="giant-year-num">
              {current.year}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="polibio-bottom-bar">
        <div className="node-selector">
          {milestones.map((m, idx) => (
            <button
              key={m.year}
              onClick={() => {
                setActiveIndex(idx);
                setIsPlaying(false);
              }}
              className={`selector-dot-btn ${idx === activeIndex ? "active" : ""}`}
            >
              <span>{m.year}</span>
            </button>
          ))}
        </div>

        <button
          className="pause-toggle"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? "⏸ Pause" : "▶ Auto Play"}
        </button>
      </div>
    </div>
  );
}

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Fetch about page content from API for body sections only
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const response = await publicApi.getAbout();
        
        if (response.success && response.data) {
          setAboutData(response.data);
          setError(null);
        } else {
          setError(response.error || 'Failed to load about content');
        }
      } catch (err) {
        console.error('Error fetching about:', err);
        setError(err.message || 'Error loading about content');
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  // Use data from API or fallback to defaults (only for body sections)
  const data = aboutData || {};
  const missionVision = data.missionVision || {};
  const story = data.story || {};
  const timeline = data.timeline || [];
  const subscribe = data.subscribe || {};

  // Values from API or fallback
  const values = data.values && data.values.length > 0
    ? data.values.map(item => ({
        title: item.title || '',
        text: item.description || '',
        icon: item.icon_type || 'pulse',
        accent: item.accent_color || 'var(--teal, #509b9e)',
      }))
    : defaultValues;

  // Show loading state
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading about page...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorIcon}>⚠️</div>
        <h3 style={styles.errorTitle}>Failed to Load About Page</h3>
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
        /* ── IMPORT PLAYFAIR DISPLAY ── */
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

        /* ── VALUE ICONS ── */
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

        /* ── RADIAL TIMELINE HERO ── */
        .polibio-hero-stage {
          background: linear-gradient(145deg, #1a2e38 0%, #0f1e26 100%);
          color: #ffffff;
          padding: 30px 6% 30px;
          min-height: 580px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          font-family: inherit;
          border-bottom: 4px solid rgba(80, 155, 158, 0.3);
        }

        .polibio-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 16px;
          position: relative;
          z-index: 10;
        }

        .brand-tag {
          color: var(--teal, #509b9e);
          font-weight: 600;
          letter-spacing: 1px;
        }

        .step-counter {
          background: rgba(255, 255, 255, 0.06);
          padding: 4px 16px;
          border-radius: 20px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
        }

        .polibio-main-grid {
          display: grid;
          grid-template-columns: 340px 1fr 1.1fr;
          gap: 30px;
          align-items: center;
          margin: 20px 0;
          position: relative;
          z-index: 2;
        }

        .polibio-story-col {
          max-width: 400px;
          z-index: 2;
        }

        .story-main-title {
          font-family: 'Playfair Display', Georgia, serif !important;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 500;
          color: #ffffff;
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .story-desc-text {
          font-size: 0.95rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
        }

        .polibio-arc-container {
          position: relative;
          width: 340px;
          height: 480px;
          display: flex;
          align-items: center;
          z-index: 1;
        }

        .polibio-wheel-rotator {
          position: absolute;
          left: -360px;
          top: -60px;
          width: 720px;
          height: 720px;
          z-index: 1;
          transition: transform 0.9s cubic-bezier(0.25, 1, 0.5, 1);
          pointer-events: none;
        }

        .polibio-wheel-svg {
          width: 100%;
          height: 100%;
        }

        .wheel-year-text {
          transition: fill 0.3s ease, font-size 0.3s ease;
          user-select: none;
          letter-spacing: 1px;
        }

        .polibio-pointer-btn {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: none;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 4;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          transition: transform 0.3s ease, background-color 0.4s ease;
        }

        .polibio-pointer-btn:hover {
          transform: translateY(-50%) scale(1.1);
        }

        .pointer-icon {
          font-size: 1.25rem;
        }

        .polibio-focal-line {
          position: absolute;
          width: 70px;
          height: 2px;
          background: rgba(255, 255, 255, 0.8);
          right: 65px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          pointer-events: none;
        }

        .polibio-year-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          z-index: 2;
        }

        .year-header {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin-bottom: 8px;
        }

        .story-eyebrow {
          font-family: 'Playfair Display', Georgia, serif !important;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 400;
          color: #ffffff;
          letter-spacing: -0.5px;
          margin: 0;
          line-height: 1.1;
        }

        .story-subtitle {
          font-size: 0.72rem;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.45);
          font-weight: 600;
          text-transform: uppercase;
          margin-top: 4px;
        }

        .big-year-display {
          overflow: hidden;
          height: 140px;
        }

        .giant-year-num {
          font-size: clamp(5.5rem, 10vw, 9.5rem);
          font-weight: 300;
          line-height: 1;
          color: #ffffff;
          letter-spacing: -3px;
          display: block;
          animation: slideUpYear 0.5s ease-out;
        }

        @keyframes slideUpYear {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .polibio-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 18px;
          position: relative;
          z-index: 10;
        }

        .node-selector {
          display: flex;
          gap: 16px;
        }

        .selector-dot-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.35);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 8px;
          transition: color 0.3s ease;
          position: relative;
        }

        .selector-dot-btn.active {
          color: var(--yellow, #e4af51);
        }

        .selector-dot-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--yellow, #e4af51);
          border-radius: 2px;
        }

        .pause-toggle {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 6px 18px;
          border-radius: 20px;
          font-size: 0.75rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .pause-toggle:hover {
          background: rgba(255, 255, 255, 0.14);
        }

        /* ── CARDS ── */
        .value-card, .team-card { 
          transition: transform 0.3s ease, box-shadow 0.3s ease !important; 
        }
        .value-card:hover, .team-card:hover { 
          transform: translateY(-8px) !important; 
          box-shadow: 0 16px 40px rgba(0,0,0,0.08) !important; 
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

        /* ── BODY SECTION ── */
        .about-body {
          position: relative;
          z-index: 2;
          background: var(--bg, #faf6f0);
          margin-top: 0;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .polibio-main-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 20px;
          }
          .polibio-story-col { max-width: 100%; }
          .polibio-year-col { align-items: center; text-align: center; }
          .year-header { align-items: center; }
          .polibio-arc-container { 
            margin: 20px auto; 
            overflow: hidden;
            width: 100%;
            max-width: 340px;
          }
          .polibio-wheel-rotator {
            left: -50%;
            top: -20px;
            width: 600px;
            height: 600px;
          }
          .polibio-focal-line { display: none; }
          .polibio-pointer-btn { 
            right: 5px;
            width: 48px;
            height: 48px;
          }
          .pointer-icon { font-size: 1rem; }
        }

        @media (max-width: 600px) {
          .polibio-top-bar { flex-direction: column; gap: 8px; text-align: center; }
          .polibio-bottom-bar { flex-direction: column; gap: 16px; }
          .node-selector { flex-wrap: wrap; justify-content: center; }
          .polibio-arc-container { max-width: 280px; }
          .polibio-wheel-rotator { width: 480px; height: 480px; left: -50%; }
          .polibio-pointer-btn { width: 40px; height: 40px; right: 0; }
          .story-main-title { font-size: 1.6rem; }
          .story-eyebrow { font-size: 1.8rem; }
          .giant-year-num { font-size: 4rem; }
          .big-year-display { height: 80px; }
          .subscribe-input { min-width: 100%; }
          .subscribe-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* Timeline Hero - Hardcoded */}
      <CurvedTimelineHero />

      {/* Body Content - Reads from Database */}
      <div className="about-body">
        {/* ── MISSION & VISION ── */}
        <section style={styles.sectionWhite}>
          <div style={styles.container}>
            <div style={styles.centerHead}>
              <span className="eyebrow-3d">Our Purpose</span>
              <h2 className="title-3d title-section">Mission & Vision</h2>
            </div>
            <div className="mv-grid" style={styles.mvGrid}>
              <div style={{ ...styles.mvCard, borderTop: `4px solid ${missionVision.mission_color || 'var(--teal, #509b9e)'}` }}>
                <div
                  style={{
                    ...styles.mvIconWrap,
                    background: `${missionVision.mission_color || 'var(--teal, #509b9e)'}18`,
                    color: missionVision.mission_color || 'var(--teal, #509b9e)',
                  }}
                >
                  <i className={`fas ${missionVision.mission_icon || 'fa-bullseye'}`} aria-hidden="true"></i>
                </div>
                <h3 className="title-3d title-sub" style={{ fontSize: '1.3rem' }}>Our Mission</h3>
                <p style={styles.mvText}>
                  {missionVision.mission || 'To provide innovative recruitment solutions through technology and people. To InspHired.'}
                </p>
              </div>

              <div style={{ ...styles.mvCard, borderTop: `4px solid ${missionVision.vision_color || 'var(--orange, #d96b43)'}` }}>
                <div
                  style={{
                    ...styles.mvIconWrap,
                    background: `${missionVision.vision_color || 'var(--orange, #d96b43)'}18`,
                    color: missionVision.vision_color || 'var(--orange, #d96b43)',
                  }}
                >
                  <i className={`fas ${missionVision.vision_icon || 'fa-eye'}`} aria-hidden="true"></i>
                </div>
                <h3 className="title-3d title-sub" style={{ fontSize: '1.3rem' }}>Our Vision</h3>
                <p style={styles.mvText}>
                  {missionVision.vision || 'To be the number one solution to Africa\'s employment challenges.'}
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
                <span className="eyebrow-3d">Our story</span>
                <h2 className="title-3d title-section">{story.title || 'Where it all began'}</h2>
                <p style={styles.storyText}>
                  {story.description_1 || 'We embarked on a mission in 2015 to transform recruitment through innovation, connecting the right people with the right opportunities.'}
                </p>
                <p style={styles.storyText}>
                  {story.description_2 || 'What started as a focused recruitment firm has steadily grown into a full talent ecosystem — spanning AI-powered candidate matching, on-demand temp staffing, a free job board, and background verification.'}
                </p>
              </div>
              <div style={styles.storyTimeline}>
                {timeline.length > 0 ? (
                  timeline.map((item, index) => (
                    <div key={index} style={styles.timelineItem}>
                      <div
                        style={{ ...styles.timelineDot, background: item.accent_color || 'var(--teal, #509b9e)' }}
                      ></div>
                      <div>
                        <p style={styles.timelineYear}>{item.year}</p>
                        <p style={styles.timelineText}>{item.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section style={styles.sectionWhite}>
          <div style={styles.container}>
            <div style={styles.centerHead}>
              <span className="eyebrow-3d">What drives us</span>
              <h2 className="title-3d title-section">Our Values</h2>
            </div>

            <div style={styles.valuesGrid}>
              {values.map((v, index) => (
                <div
                  key={index}
                  style={{ ...styles.valueCard, borderTop: `4px solid ${v.accent}` }}
                  className="value-card"
                >
                  <div
                    style={{ ...styles.valueIconWrap, background: `${v.accent}1A` }}
                  >
                    <ValueIcon type={v.icon} color={v.accent} />
                  </div>
                  <h3 className="title-3d title-sub" style={{ fontSize: '1.15rem' }}>{v.title}</h3>
                  <p style={styles.valueText}>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEADERSHIP & TEAM (Hardcoded) ── */}
        <section style={styles.sectionLight}>
          <div style={styles.container}>
            <div style={styles.centerHead}>
              <span className="eyebrow-3d">People First</span>
              <h2 className="title-3d title-section">Leadership & Team</h2>
              <p style={styles.sectionSub}>
                Meet the passionate professionals driving InspHired forward.
              </p>
            </div>

            <div style={styles.teamGrid}>
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  style={{ ...styles.teamCard, borderTop: `4px solid ${member.accent}` }}
                  className="team-card"
                >
                  <div style={styles.avatarWrapper}>
                    <img
                      src={member.avatar}
                      alt={member.name}
                      style={{ ...styles.avatarImage, borderColor: member.accent }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = member.fallback;
                      }}
                    />
                  </div>
                  <h3 className="title-3d title-small">{member.name}</h3>
                  <p style={styles.teamRole}>{member.role}</p>
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
                <h3 style={styles.subscribeTitle}>{subscribe.title || 'Get job notifications'}</h3>
                <p style={styles.subscribeText}>
                  {subscribe.description || 'Hey there 👋 Subscribe to stay updated with new opportunities.'}
                </p>
              </div>

              {subscribed ? (
                <div style={styles.subscribeSuccess}>
                  <i
                    className="fas fa-check-circle"
                    style={{ marginRight: "8px" }}
                    aria-hidden="true"
                  ></i>
                  {subscribe.success_message || "You're subscribed — watch your inbox!"}
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="subscribe-row"
                  style={styles.subscribeRow}
                >
                  <input
                    type="email"
                    required
                    placeholder={subscribe.placeholder_text || "Enter your email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="subscribe-input"
                  />
                  <button
                    type="submit"
                    className="subscribe-btn"
                  >
                    {subscribe.button_text || "Subscribe"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    color: "var(--navy, #1f3540)",
    backgroundColor: "var(--bg, #faf6f0)",
    lineHeight: 1.65,
  },
  container: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 32px",
    width: "100%",
  },
  sectionWhite: { padding: "90px 0", backgroundColor: "#FFFFFF" },
  sectionLight: { padding: "90px 0", backgroundColor: "var(--bg, #faf6f0)" },
  centerHead: { 
    textAlign: "center", 
    marginBottom: "56px",
    maxWidth: "640px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  sectionSub: {
    fontSize: "1.05rem",
    color: "#5B6670",
    marginTop: "12px",
    lineHeight: 1.6,
  },
  mvGrid: { 
    display: "grid", 
    gridTemplateColumns: "1fr 1fr", 
    gap: "32px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  mvCard: {
    background: "#FFFFFF",
    border: "1px solid var(--border-light, #e5dfd5)",
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
    padding: "40px",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },
  mvIconWrap: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  mvText: { fontSize: "1rem", color: "#5B6670", lineHeight: 1.7, margin: 0 },
  storyRow: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "60px",
    alignItems: "start",
  },
  storyTextCol: {},
  storyText: {
    fontSize: "1rem",
    color: "#5B6670",
    lineHeight: 1.75,
    marginBottom: "16px",
  },
  storyTimeline: {
    background: "#FFFFFF",
    border: "1px solid var(--border-light, #e5dfd5)",
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
    padding: "36px",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  timelineItem: { display: "flex", gap: "16px", alignItems: "flex-start" },
  timelineDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    marginTop: "6px",
    flexShrink: 0,
  },
  timelineYear: {
    fontSize: "0.85rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "var(--navy, #1f3540)",
    margin: "0 0 4px 0",
  },
  timelineText: { fontSize: "0.95rem", color: "#5B6670", lineHeight: 1.6, margin: 0 },
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "32px",
    maxWidth: "960px",
    margin: "0 auto",
  },
  valueCard: {
    background: "#FFFFFF",
    border: "1px solid var(--border-light, #e5dfd5)",
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
    padding: "40px 32px",
    textAlign: "center",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },
  valueIconWrap: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  valueText: { fontSize: "0.95rem", color: "#5B6670", lineHeight: 1.65, margin: 0 },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "32px",
    maxWidth: "960px",
    margin: "0 auto",
  },
  teamCard: {
    background: "#FFFFFF",
    border: "1px solid var(--border-light, #e5dfd5)",
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
    padding: "40px 24px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },
  avatarWrapper: {
    marginBottom: "16px",
  },
  avatarImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid transparent",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease",
  },
  teamRole: {
    fontSize: "0.9rem",
    color: "#5B6670",
    margin: 0,
  },
  subscribeSection: { padding: "80px 0 100px", backgroundColor: "var(--bg, #faf6f0)" },
  subscribeCard: {
    background: "linear-gradient(145deg, #1a2e38 0%, #0f1e26 100%)",
    borderRadius: "24px",
    padding: "48px 56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "40px",
    flexWrap: "wrap",
    boxShadow: "0 16px 48px rgba(31, 53, 64, 0.2)",
  },
  subscribeTitle: { 
    fontSize: "1.5rem", 
    fontWeight: 700, 
    color: "#FFFFFF", 
    margin: "0 0 8px 0" 
  },
  subscribeText: { 
    fontSize: "1rem", 
    color: "rgba(255,255,255,0.7)", 
    margin: 0 
  },
  subscribeSuccess: { 
    color: "var(--yellow, #e4af51)", 
    fontSize: "1rem", 
    fontWeight: "600" 
  },
  subscribeRow: { 
    display: "flex", 
    gap: "12px", 
    flexShrink: 0,
    flexWrap: "wrap",
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

export default AboutPage;