import React from "react";
import "./Ecosystem.css";

const C = {
  teal: "#509b9e",
  orange: "#d96b43",
  yellow: "#e4af51",
  navy: "#1f3540",
};

const ecosystemPlatforms = [
  {
    label: "Proprietary AI",
    name: "Jobot by InspHired",
    tagline: "In-house AI Applicant Tracking System",
    features: ["AI-powered candidate matching", "Full pipeline management", "ATS & CRM in one platform"],
    cta: "Learn more",
    ctaHref: "/jobot",
    accent: C.teal,
    img: "/assets/JobBott.png",
  },
  {
    label: "Temp & contract",
    name: "InspHired Worx",
    tagline: "On-demand temp booking platform",
    features: ["Pre-vetted talent pool", "On-demand booking", "Shift-based placements"],
    cta: "Learn more",
    ctaHref: "/worx",
    accent: C.orange,
    img: "/assets/Worx.png",
  },
  {
    label: "Free for candidates",
    name: "InspHired Connect",
    tagline: "Free job board & CRM",
    features: ["Free for all candidates", "Smart talent matching", "Direct employer access"],
    cta: "Learn more",
    ctaHref: "/connect",
    accent: C.yellow,
    img: "/assets/Connect.png",
  },
  {
    label: "Verification",
    name: "VerifyMe",
    tagline: "Background checks & screening",
    features: ["Criminal & biometric checks", "Education verification", "Employment history"],
    cta: "Learn more",
    ctaHref: "/verify-me",
    accent: C.teal,
    img: "/assets/VerifyMee.png",
  },
];

function Ecosystem() {
  return (
    <section className="eco-section">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">The InspHired Ecosystem</span>
          <h2 className="title-3d">More than a recruitment agency</h2>
          <p className="subtitle">
            Four connected platforms, each solving a different part of the employment challenge — working together as one ecosystem.
          </p>
        </div>

        <div className="eco-grid">
          {ecosystemPlatforms.map((p, i) => (
            <div key={i} className="eco-card" style={{ "--accent": p.accent }}>
              <div className="eco-top-curve" style={{ background: p.accent }}>
                <img src={p.img} alt={`${p.name} logo`} className="eco-hero-img" />
              </div>
              <div className="eco-content">
                <span className="eco-label" style={{ color: p.accent }}>{p.label}</span>
                <h3 className="eco-name">{p.name}</h3>
                <p className="eco-tagline" style={{ color: p.accent }}>{p.tagline}</p>
                
                {/* ===== FEATURES/BULLET POINTS ONLY ===== */}
                <ul className="eco-list">
                  {p.features.map((f, fi) => (
                    <li key={fi}>
                      <span className="eco-bullet" style={{ background: p.accent }}>●</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a href={p.ctaHref} className="eco-btn" style={{ borderColor: p.accent }}>
                  {p.cta}
                  <span className="eco-arrow" style={{ background: p.accent }}>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Ecosystem;