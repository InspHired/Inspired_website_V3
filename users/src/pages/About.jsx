import { useMemo, useState } from "react";

const flowSteps = [
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

function About() {
  const [activeNode, setActiveNode] = useState(null);

  const nodePositions = useMemo(() => {
    const radius = 44;
    return flowSteps.map((step, i) => {
      const angle = (360 / flowSteps.length) * i - 90;
      const rad = (angle * Math.PI) / 180;
      return {
        ...step,
        left: 50 + radius * Math.cos(rad),
        top: 50 + radius * Math.sin(rad),
      };
    });
  }, []);

  const active = flowSteps.find((s) => s.id === activeNode);

  return (
    <section id="about" className="container">
      <div className="about-grid">
        <div>
          <h2 className="section-title">Where African Talent Meets Opportunity</h2>

          <p className="section-text">
            Founded in 2015, InspHired set out with a clear mission - to bridge
            the gap between candidates and clients through innovative technology
            and dedicated talent specialists. What started as a focused
            recruitment firm has steadily grown into a full talent ecosystem
            serving employers and job seekers across the continent.
          </p>

          <p className="section-text section-text-spaced">
            Today, InspHired operates a multi-platform digital infrastructure
            engineered to simplify hiring. We are home to a team of passionate
            professionals who believe the right placement changes lives -
            creating long-term value for candidates, growing enterprises, and
            communities across Africa.
          </p>

          <div className="quote-block">
            We don't just fill jobs - we build careers, relationships, and futures.
          </div>
        </div>

        <div className="recruitment-circle">
          <div className="orbit">
            <div className="orbit-dot"></div>
          </div>

          <svg className="flow-connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
            {nodePositions.map((node, i) => {
              const next = nodePositions[(i + 1) % nodePositions.length];
              return (
                <line
                  key={i}
                  x1={node.left}
                  y1={node.top}
                  x2={next.left}
                  y2={next.top}
                  stroke="rgba(31, 53, 64, 0.15)"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                />
              );
            })}
          </svg>

          {nodePositions.map((node) => (
            <button
              key={node.id}
              type="button"
              className={`flow-node ${activeNode === node.id ? "flow-node-active" : ""}`}
              style={{ left: `${node.left}%`, top: `${node.top}%` }}
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
              aria-pressed={activeNode === node.id}
            >
              <span className="flow-node-avatar" style={{ background: `${node.color}1A`, borderColor: node.color }}>
                <StageIcon type={node.id} color={node.color} />
              </span>
              <p>{node.label}</p>
              <span className="flow-tooltip" role="tooltip">
                {node.detail}
              </span>
            </button>
          ))}

          <div className="circle-center">
            {active ? (
              <>
                <p className="center-label" style={{ color: active.color }}>
                  {active.label}
                </p>
                <p className="center-detail">{active.detail}</p>
              </>
            ) : (
              <span>InspHired</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;