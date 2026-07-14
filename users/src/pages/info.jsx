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
  const [completedSteps, setCompletedSteps] = useState([]); // array of completed step ids, in order
  const [shakeId, setShakeId] = useState(null);

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

  const nextUnlockedIndex = completedSteps.length; // index of the one node currently unlocked
  const allComplete = completedSteps.length === flowSteps.length;

  const handleNodeClick = (node, index) => {
    const isCompleted = completedSteps.includes(node.id);
    const isUnlocked = index === nextUnlockedIndex;

    if (isCompleted) {
      // Already done — just show its detail again, no progress change.
      setActiveNode(node.id);
      return;
    }

    if (isUnlocked) {
      setActiveNode(node.id);
      setCompletedSteps((prev) => [...prev, node.id]);
      return;
    }

    // Locked — give a little shake to signal "not yet."
    setShakeId(node.id);
    setTimeout(() => setShakeId(null), 400);
  };

  const active = flowSteps.find((s) => s.id === activeNode);

  return (
    <section id="about" className="container">
      <div className="about-grid">
        <div className="about-text-col">
          <span className="about-eyebrow">Who we are</span>
          <h2 className="section-title">Connecting African talent to real opportunity</h2>

          <p className="section-text">
            InspHired started in 2015 with a simple goal: make hiring feel human
            again. Not another faceless job board, not another CV black hole —
            an actual team of specialists who take the time to understand both
            the candidate and the company on the other side.
          </p>

          <p className="section-text section-text-spaced">
            That focus grew into something bigger — a full ecosystem of tools
            and people working together across the continent. But the mission
            hasn't changed: the right placement can change a life, grow a
            business, and strengthen a community. That's still what drives
            everything we build.
          </p>

          <div className="quote-block">
            We don't just fill jobs — we build careers, relationships, and futures.
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
      `}</style>
    </section>
  );
}

export default About;