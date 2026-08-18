// users/src/pages/info.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useContent } from "../contexts/ContentContext";

// Abstract, shape-based animated icon per stage — no literal imagery, no emoji.
function StageIcon({ type, color }) {
  switch (type) {
    case "candidate":
      return (
        <svg viewBox="0 0 40 40" className="stage-icon icon-pulse">
          <circle cx="20" cy="20" r="7" fill={color} />
          <circle cx="20" cy="20" r="14" fill="none" stroke={color} strokeWidth="1.5" className="pulse-ring" />
        </svg>
      );
    case "screening":
      return (
        <svg viewBox="0 0 40 40" className="stage-icon">
          <rect x="8" y="8" width="24" height="24" rx="4" fill="none" stroke={color} strokeWidth="2" />
          <line x1="8" y1="20" x2="32" y2="20" stroke={color} strokeWidth="2" className="scan-line" />
        </svg>
      );
    case "matching":
      return (
        <svg viewBox="0 0 40 40" className="stage-icon">
          <circle cx="16" cy="20" r="9" fill={color} opacity="0.55" className="orbit-a" />
          <circle cx="24" cy="20" r="9" fill={color} opacity="0.85" className="orbit-b" />
        </svg>
      );
    case "interview":
      return (
        <svg viewBox="0 0 40 40" className="stage-icon wave-bars">
          <rect x="10" y="16" width="4" height="8" fill={color} className="bar bar-1" />
          <rect x="18" y="10" width="4" height="20" fill={color} className="bar bar-2" />
          <rect x="26" y="14" width="4" height="12" fill={color} className="bar bar-3" />
        </svg>
      );
    case "placement":
      return (
        <svg viewBox="0 0 40 40" className="stage-icon icon-launch">
          <polygon points="20,8 27,26 20,21 13,26" fill={color} className="launch-shape" />
        </svg>
      );
    case "growth":
      return (
        <svg viewBox="0 0 40 40" className="stage-icon growth-bars">
          <rect x="9" y="24" width="5" height="8" fill={color} className="gbar gbar-1" />
          <rect x="18" y="18" width="5" height="14" fill={color} className="gbar gbar-2" />
          <rect x="27" y="10" width="5" height="22" fill={color} className="gbar gbar-3" />
        </svg>
      );
    default:
      return null;
  }
}

// Default flow steps (fallback)
const defaultFlowSteps = [
  {
    id: "candidate",
    label: "Candidate",
    color: "var(--teal)",
    detail: "Every journey starts here — a candidate joins the InspHired network, ready to be discovered.",
  },
  {
    id: "screening",
    label: "Screening",
    color: "var(--orange)",
    detail: "Our specialists verify credentials, experience, and fit before any candidate moves forward.",
  },
  {
    id: "matching",
    label: "Matching",
    color: "var(--yellow)",
    detail: "AI-powered matching pairs the right candidate with the right opportunity — no guesswork.",
  },
  {
    id: "interview",
    label: "Interview",
    color: "var(--navy)",
    detail: "Candidates and employers connect directly, with our team supporting every step.",
  },
  {
    id: "placement",
    label: "Placement",
    color: "var(--teal)",
    detail: "The offer is made, accepted, and a new chapter begins — for candidate and employer alike.",
  },
  {
    id: "growth",
    label: "Growth",
    color: "var(--orange)",
    detail: "Placement isn't the finish line. We stay invested in long-term career and business growth.",
  },
];

function Info({ content: propContent }) {
  const { content: contextContent, loading } = useContent();
  const [infoData, setInfoData] = useState(null);
  const [flowSteps, setFlowSteps] = useState(defaultFlowSteps);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [shakeId, setShakeId] = useState(null);

  // Fetch and map info data
  useEffect(() => {
    try {
      // Get info data from props or context
      let infoContent = null;
      
      if (propContent && Object.keys(propContent).length > 0) {
        console.log("📦 Using info from props:", propContent);
        infoContent = propContent;
      } else if (contextContent && contextContent.home && contextContent.home.info) {
        console.log("📦 Using info from context:", contextContent.home.info);
        infoContent = contextContent.home.info;
      }

      if (infoContent) {
        setInfoData(infoContent);
      }

      // Get steps from context or use default
      let stepsData = defaultFlowSteps;
      if (contextContent && contextContent.home && contextContent.home.steps) {
        const dbSteps = contextContent.home.steps;
        if (dbSteps && dbSteps.length > 0) {
          // Map database steps to the expected format
          stepsData = dbSteps.map((step) => ({
            id: step.step_id || step.id || '',
            label: step.label || '',
            color: step.color || 'var(--teal)',
            detail: step.detail || '',
          }));
          console.log("📦 Using steps from context:", stepsData);
        }
      }

      setFlowSteps(stepsData);
      setError(null);
    } catch (err) {
      console.error("❌ Error fetching info data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [propContent, contextContent]);

  // Compute node positions - Responsive radius based on screen size
  const getRadius = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 480) return 32;
      if (width < 768) return 38;
      if (width < 1024) return 42;
    }
    return 44;
  };

  const nodePositions = useMemo(() => {
    const radius = getRadius();
    return flowSteps.map((step, i) => {
      const angle = (360 / flowSteps.length) * i - 90;
      const rad = (angle * Math.PI) / 180;
      return {
        ...step,
        left: 50 + radius * Math.cos(rad),
        top: 50 + radius * Math.sin(rad),
      };
    });
  }, [flowSteps]);

  const nextUnlockedIndex = completedSteps.length;
  const allComplete = completedSteps.length === flowSteps.length;

  const handleNodeClick = (node, index) => {
    const isCompleted = completedSteps.includes(node.id);
    const isUnlocked = index === nextUnlockedIndex;

    if (isCompleted) {
      setActiveNode(node.id);
      return;
    }

    if (isUnlocked) {
      setActiveNode(node.id);
      setCompletedSteps((prev) => [...prev, node.id]);
      return;
    }

    setShakeId(node.id);
    setTimeout(() => setShakeId(null), 400);
  };

  const active = flowSteps.find((s) => s.id === activeNode);

  // Show loading state
  if (isLoading || loading) {
    return (
      <section className="about-section">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">Who we are</span>
            <h2 className="title-3d">Connecting African talent to real opportunity</h2>
          </div>
          <div className="info-loading">
            <div className="loading-spinner"></div>
            <p>Loading content...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="about-section">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">Who we are</span>
            <h2 className="title-3d">Connecting African talent to real opportunity</h2>
          </div>
          <div className="info-error">
            <p>⚠️ {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        </div>
      </section>
    );
  }

  // Use data from database or fallback to defaults
  const info = infoData || {};

  return (
    <section className="about-section">
      <div className="container">
        {/* ===== STYLED HEADER ===== */}
        <div className="sec-head">
          <span className="eyebrow">{info.eyebrow || 'Who we are'}</span>
          <h2 className="title-3d">{info.title || 'Connecting African talent to real opportunity'}</h2>
        </div>

        {/* ===== ABOUT CONTENT ===== */}
        <div className="about-grid">
          <div className="about-text-col">
            <p className="section-text">
              {info.description_1 || "InspHired started in 2015 with a simple goal: make hiring feel human again. Not another faceless job board, not another CV black hole — an actual team of specialists who take the time to understand both the candidate and the company on the other side."}
            </p>

            <p className="section-text">
              {info.description_2 || "That focus grew into something bigger — a full ecosystem of tools and people working together across the continent. But the mission hasn't changed: the right placement can change a life, grow a business, and strengthen a community. That's still what drives everything we build."}
            </p>

            <div className="quote-block">
              {info.quote || "We don't just fill jobs — we build careers, relationships, and futures."}
            </div>
          </div>

          <div className="recruitment-circle">
            <div className="orbit">
              <div className="orbit-dot"></div>
            </div>

            <svg className="flow-connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
              {nodePositions.map((node, i) => {
                const next = nodePositions[(i + 1) % nodePositions.length];
                const isPathLit = completedSteps.includes(node.id) && completedSteps.includes(next.id);
                return (
                  <line
                    key={i}
                    x1={node.left}
                    y1={node.top}
                    x2={next.left}
                    y2={next.top}
                    stroke={isPathLit ? "var(--teal)" : "rgba(31, 53, 64, 0.15)"}
                    strokeWidth={isPathLit ? "1" : "0.5"}
                    strokeDasharray="2 2"
                    style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }}
                  />
                );
              })}
            </svg>

            {nodePositions.map((node, i) => {
              const isCompleted = completedSteps.includes(node.id);
              const isUnlocked = i === nextUnlockedIndex;
              const isLocked = !isCompleted && !isUnlocked;

              return (
                <button
                  key={node.id}
                  type="button"
                  className={[
                    "flow-node",
                    activeNode === node.id ? "flow-node-active" : "",
                    isLocked ? "flow-node-locked" : "",
                    isUnlocked ? "flow-node-unlocked" : "",
                    shakeId === node.id ? "flow-node-shake" : "",
                  ].join(" ").trim()}
                  style={{ left: `${node.left}%`, top: `${node.top}%` }}
                  onClick={() => handleNodeClick(node, i)}
                  aria-pressed={activeNode === node.id}
                  aria-disabled={isLocked}
                >
                  <span
                    className="flow-node-avatar"
                    style={{
                      background: isLocked ? "rgba(31, 53, 64, 0.06)" : `${node.color}1A`,
                      borderColor: isLocked ? "rgba(31, 53, 64, 0.15)" : node.color,
                    }}
                  >
                    {isLocked ? (
                      <i className="fas fa-lock" style={{ color: "rgba(31, 53, 64, 0.35)", fontSize: "0.9rem" }} aria-hidden="true"></i>
                    ) : (
                      <StageIcon type={node.id} color={node.color} />
                    )}
                    {isCompleted && (
                      <span className="flow-node-check" style={{ background: node.color }}>
                        <i className="fas fa-check" aria-hidden="true"></i>
                      </span>
                    )}
                  </span>
                  <p style={{ color: isLocked ? "rgba(31, 53, 64, 0.4)" : "var(--navy)" }}>{node.label}</p>
                  <span className="flow-tooltip" role="tooltip">
                    {isLocked ? "Complete the previous stage first" : node.detail}
                  </span>
                </button>
              );
            })}

            <div className="circle-center">
              {active ? (
                <>
                  <p className="center-label" style={{ color: active.color }}>
                    {active.label}
                  </p>
                  <p className="center-detail">{active.detail}</p>
                </>
              ) : allComplete ? (
                <>
                  <p className="center-label" style={{ color: "var(--teal)" }}>
                    <i className="fas fa-star" aria-hidden="true"></i> All stages explored
                  </p>
                  <p className="center-detail">You've walked the full InspHired journey.</p>
                </>
              ) : (
                <>
                  <span className="center-progress">
                    {completedSteps.length}/{flowSteps.length}
                  </span>
                  <p className="center-detail">Tap the glowing stage to begin</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .flow-node-locked { cursor: not-allowed; opacity: 0.55; }
        .flow-node-unlocked .flow-node-avatar { animation: nodeGlow 1.8s ease-in-out infinite; }
        @keyframes nodeGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(80, 155, 158, 0.35); }
          50% { box-shadow: 0 0 0 8px rgba(80, 155, 158, 0); }
        }
        .flow-node-shake { animation: nodeShake 0.4s ease; }
        @keyframes nodeShake {
          0%, 100% { transform: translate(-50%, -50%) translateX(0); }
          25% { transform: translate(-50%, -50%) translateX(-4px); }
          75% { transform: translate(-50%, -50%) translateX(4px); }
        }
        .flow-node-check {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.55rem;
          border: 2px solid #fff;
        }
        .center-progress {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--teal);
          margin: 0 0 6px;
        }
        .title-3d {
          display: block;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 700;
          color: #1f3540;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
          position: relative;
          
          /* Glass 3D Effect */
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
        .eyebrow {
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
        .about-section {
          padding: clamp(50px, 8vw, 80px) 0;
          background: #faf6f0;
          overflow: hidden;
        }
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 32px);
          width: 100%;
        }
        .sec-head {
          text-align: center;
          margin-bottom: clamp(32px, 6vw, 56px);
          max-width: 640px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 16px;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(30px, 5vw, 60px);
          align-items: start;
        }
        .about-text-col {
          padding-top: 8px;
        }
        .section-text {
          font-size: clamp(0.95rem, 1.2vw, 1.05rem);
          color: #3d3d3d;
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .quote-block {
          background: #f5f0e9;
          padding: clamp(20px, 2.5vw, 32px) clamp(24px, 3vw, 40px);
          border-radius: var(--radius-card, 24px);
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          font-weight: 500;
          line-height: 1.5;
          color: var(--navy);
          margin-top: 32px;
          border-left: 4px solid var(--teal);
        }
        .recruitment-circle {
          position: relative;
          width: clamp(300px, 40vw, 380px);
          height: clamp(300px, 40vw, 380px);
          margin: auto;
          border: 2px dashed rgba(80, 155, 158, 0.3);
          border-radius: 50%;
        }
        .flow-connectors {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .flow-node {
          position: absolute;
          width: clamp(70px, 10vw, 96px);
          text-align: center;
          transform: translate(-50%, -50%);
          transition: transform var(--transition);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
        }
        .flow-node:hover,
        .flow-node-active {
          transform: translate(-50%, -50%) scale(1.1);
          z-index: 3;
        }
        .flow-node-avatar {
          width: clamp(44px, 6vw, 60px);
          height: clamp(44px, 6vw, 60px);
          border-radius: 50%;
          border: 1.5px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          box-shadow: var(--shadow-sm);
          transition: box-shadow var(--transition);
          position: relative;
        }
        .flow-node:hover .flow-node-avatar,
        .flow-node-active .flow-node-avatar {
          box-shadow: var(--shadow-md);
        }
        .flow-node p {
          margin-top: clamp(6px, 1vw, 10px);
          font-size: clamp(11px, 1.2vw, 14px);
          color: var(--navy);
          font-weight: 500;
          white-space: nowrap;
        }
        .stage-icon {
          width: clamp(22px, 3vw, 30px);
          height: clamp(22px, 3vw, 30px);
        }
        .flow-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          width: 170px;
          background: var(--navy);
          color: #fff;
          font-size: 12px;
          line-height: 1.5;
          font-weight: 400;
          padding: 10px 12px;
          border-radius: 10px;
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--transition), transform var(--transition);
          z-index: 4;
        }
        .flow-node:hover .flow-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .circle-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: clamp(100px, 14vw, 130px);
          height: clamp(100px, 14vw, 130px);
          border-radius: 50%;
          background: var(--bg);
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
          color: var(--navy);
          text-align: center;
          box-shadow: var(--shadow-sm);
          padding: 12px;
        }
        .center-label {
          font-size: clamp(11px, 1.2vw, 13px);
          font-weight: 700;
          margin: 0 0 4px;
        }
        .center-detail {
          font-size: clamp(9px, 1vw, 10.5px);
          font-weight: 400;
          color: var(--navy);
          opacity: 0.85;
          line-height: 1.4;
          margin: 0;
        }
        .orbit {
          position: absolute;
          width: clamp(240px, 32vw, 300px);
          height: clamp(240px, 32vw, 300px);
          top: 50%;
          left: 50%;
          margin-left: calc(clamp(240px, 32vw, 300px) / -2);
          margin-top: calc(clamp(240px, 32vw, 300px) / -2);
          animation: orbit 8s linear infinite;
          pointer-events: none;
        }
        .orbit-dot {
          width: clamp(12px, 1.5vw, 16px);
          height: clamp(12px, 1.5vw, 16px);
          background: var(--orange);
          border-radius: 50%;
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 20px rgba(217, 107, 67, 0.5);
        }
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .info-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          min-height: 200px;
        }
        .info-loading .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e5dfd5;
          border-top: 3px solid #509b9e;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        .info-loading p {
          margin-top: 16px;
          color: #7a8790;
          font-size: 14px;
        }
        .info-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          min-height: 200px;
          text-align: center;
        }
        .info-error p {
          color: #d96b43;
          font-size: 16px;
          margin-bottom: 16px;
        }
        .info-error button {
          padding: 10px 24px;
          background: #509b9e;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .info-error button:hover {
          background: #3d7a7d;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* ===== RESPONSIVE BREAKPOINTS ===== */
        @media (max-width: 1024px) {
          .about-grid {
            gap: 40px;
          }
          .recruitment-circle {
            width: 320px;
            height: 320px;
          }
          .flow-node {
            width: 80px;
          }
          .flow-node-avatar {
            width: 52px;
            height: 52px;
          }
        }

        @media (max-width: 820px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .about-text-col {
            padding-top: 0;
          }
          .recruitment-circle {
            width: 340px;
            height: 340px;
            margin-top: 20px;
          }
          .flow-node {
            width: 76px;
          }
          .flow-node-avatar {
            width: 48px;
            height: 48px;
          }
          .circle-center {
            width: 110px;
            height: 110px;
          }
          .center-detail {
            font-size: 9px;
          }
          .orbit {
            width: 260px;
            height: 260px;
            margin-left: -130px;
            margin-top: -130px;
          }
          .quote-block {
            font-size: 1.1rem;
            padding: 20px 24px;
          }
        }

        @media (max-width: 600px) {
          .about-section {
            padding: 40px 0;
          }
          .sec-head {
            margin-bottom: 24px;
          }
          .sec-head .eyebrow {
            font-size: 0.65rem;
            padding: 4px 12px;
          }
          .sec-head .title-3d {
            font-size: 1.8rem;
          }
          .recruitment-circle {
            width: 280px;
            height: 280px;
          }
          .flow-node {
            width: 64px;
          }
          .flow-node p {
            font-size: 10px;
            white-space: nowrap;
          }
          .flow-node-avatar {
            width: 40px;
            height: 40px;
          }
          .stage-icon {
            width: 20px;
            height: 20px;
          }
          .circle-center {
            width: 90px;
            height: 90px;
          }
          .center-progress {
            font-size: 1.4rem;
          }
          .center-label {
            font-size: 10px;
          }
          .center-detail {
            display: none;
          }
          .orbit {
            width: 220px;
            height: 220px;
            margin-left: -110px;
            margin-top: -110px;
          }
          .orbit-dot {
            width: 10px;
            height: 10px;
            top: -5px;
          }
          .quote-block {
            font-size: 1rem;
            padding: 16px 20px;
            border-left-width: 3px;
          }
          .section-text {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 400px) {
          .recruitment-circle {
            width: 240px;
            height: 240px;
          }
          .flow-node {
            width: 56px;
          }
          .flow-node p {
            font-size: 9px;
          }
          .flow-node-avatar {
            width: 34px;
            height: 34px;
            border-width: 1.5px;
          }
          .stage-icon {
            width: 18px;
            height: 18px;
          }
          .circle-center {
            width: 76px;
            height: 76px;
            padding: 6px;
          }
          .center-progress {
            font-size: 1.1rem;
          }
          .center-label {
            font-size: 8px;
          }
          .orbit {
            width: 190px;
            height: 190px;
            margin-left: -95px;
            margin-top: -95px;
          }
          .flow-node-check {
            width: 14px;
            height: 14px;
            font-size: 0.45rem;
            bottom: -4px;
            right: -4px;
          }
          .flow-tooltip {
            width: 130px;
            font-size: 10px;
            padding: 6px 10px;
          }
        }
      `}</style>
    </section>
  );
}

export default Info;