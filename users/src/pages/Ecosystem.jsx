import React from "react";
import { useMemo, useState } from "react";

const C = {
  bg: "#faf6f0",
  textDark: "#000000",
  teal: "#509b9e",
  orange: "#d96b43",
  yellow: "#e4af51",
  navy: "#1f3540",
  borderLight: "#e5dfd5",
  shadowSm: "0 8px 30px rgba(0, 0, 0, 0.05)",
  shadowMd: "0 12px 40px rgba(0, 0, 0, 0.07)",
  radiusCard: "24px",
  transition: "0.25s ease",
};

const ecosystemPlatforms = [
  {
    label: "Proprietary AI",
    name: "Jobot by InspHired",
    tagline: "In-house AI Applicant Tracking System",
    desc: "Jobot manages the full recruitment pipeline — from job spec to placement — ensuring speed, consistency, and quality on every search we run.",
    features: ["AI-powered candidate matching", "Full pipeline management", "ATS & CRM in one platform", "Built & owned by InspHired"],
    cta: "Learn more",
    ctaHref: "/jobot",
    accent: C.teal,
    mockIcon: "fas fa-robot",
    img: "/assets/JobBot.png",
  },
  {
    label: "Temp & contract",
    name: "InspHired Worx",
    tagline: "On-demand temp booking platform",
    desc: "A pre-vetted talent pool and on-demand temp booking platform. Request, manage, and deploy temporary staff rapidly — without the admin burden.",
    features: ["Pre-vetted talent pool", "On-demand booking", "Shift-based placements", "Rapid deployment"],
    cta: "Learn more",
    ctaHref: "/worx",
    accent: C.orange,
    mockIcon: "fas fa-users",
    img: "/assets/InspHiredWorx.png",
  },
  {
    label: "Free for candidates",
    name: "InspHired Connect",
    tagline: "Free job board & CRM",
    desc: "A free job board and CRM connecting qualified candidates directly with open opportunities. Upload a CV, get matched, apply — all in one place.",
    features: ["Free for all candidates", "Smart talent matching", "Direct employer access", "Career pathway tools"],
    cta: "Learn more",
    ctaHref: "/connect",
    accent: C.yellow,
    mockIcon: "fas fa-bolt",
    img: "/assets/InspHiredConnect.png",
  },
  {
    label: "Verification",
    name: "VerifyMe",
    tagline: "Background checks & screening",
    desc: "Every InspHired candidate is screened through VerifyMe before being presented — giving you full confidence in every hire.",
    features: ["Criminal & biometric checks", "Education verification", "Employment history", "ID & work permits"],
    cta: "Learn more",
    ctaHref: "/verify-me",
    accent: C.navy,
    mockIcon: "fas fa-shield-alt",
    img: "/assets/VerifyMe.png",
  },
];

const s = {
  section: { padding: "80px 0" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" },
  secHead: { textAlign: "center", maxWidth: 640, margin: "0 auto 48px" },
  eyebrow: {
    display: "inline-block",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: C.teal,
    marginBottom: 12,
  },
  h2: { fontSize: 32, fontWeight: 700, color: C.textDark, margin: "0 0 12px" },
  secSub: { fontSize: 16, lineHeight: 1.6, color: "#5B6670", margin: 0 },

  ecoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
  },
  ecoCard: {
    background: "#FFFFFF",
    border: `1px solid ${C.borderLight}`,
    borderRadius: C.radiusCard,
    boxShadow: C.shadowSm,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    transition: `box-shadow ${C.transition}, transform ${C.transition}`,
  },
  ecoTopRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  ecoLabel: {
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: 999,
    border: "1px solid",
  },
  ecoCircleBadge: {
    position: "relative",
    width: 64,
    height: 64,
    borderRadius: "50%",
    overflow: "hidden",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#FFFFFF",
    border: `1px solid ${C.borderLight}`,
  },
  ecoBadgeImg: {
    width: "70%",
    height: "70%",
    objectFit: "contain",
  },
  ecoBadgeIconFallback: {
    position: "absolute",
    inset: 0,
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
  ecoName: { fontSize: 19, fontWeight: 700, color: C.textDark, margin: "0 0 4px" },
  ecoTagline: { fontSize: 14, fontWeight: 500, margin: "0 0 12px" },
  ecoDesc: { fontSize: 14, lineHeight: 1.6, color: "#5B6670", margin: "0 0 16px", flexGrow: 1 },
  ecoList: { listStyle: "none", margin: "0 0 20px", padding: 0, display: "flex", flexDirection: "column", gap: 8 },
  ecoListItem: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.textDark },
  ecoCheck: { fontSize: 11 },
  ecoCta: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 600,
    padding: "10px 16px",
    borderRadius: 8,
    border: "1.5px solid",
    textDecoration: "none",
    marginTop: "auto",
    transition: `background ${C.transition}, transform ${C.transition}`,
  },
};

function Ecosystem() {
  return (
    <section style={{ ...s.section, background: C.bg }}>
      <div style={s.container}>
        <div style={s.secHead}>
          <span style={s.eyebrow}>The InspHired Ecosystem</span>
          <h2 style={s.h2}>More than a recruitment agency</h2>
          <p style={s.secSub}>
            Four connected platforms, each solving a different part of the employment challenge — working together as one ecosystem.
          </p>
        </div>

        <div style={s.ecoGrid}>
          {ecosystemPlatforms.map((p, i) => (
            <div key={i} style={s.ecoCard} className="eco-card">
              <div style={s.ecoTopRow}>
                <div
                  style={{
                    ...s.ecoLabel,
                    color: p.accent,
                    borderColor: `${p.accent}25`,
                    background: `${p.accent}0C`,
                  }}
                >
                  {p.label}
                </div>

                <div style={s.ecoCircleBadge}>
                  {p.img ? (
                    <img
                      src={p.img}
                      alt={`${p.name} logo`}
                      style={s.ecoBadgeImg}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div style={{ ...s.ecoBadgeIconFallback, background: `${p.accent}12` }}>
                    <i className={p.mockIcon} style={{ color: p.accent, fontSize: "1.2rem" }} aria-hidden="true"></i>
                  </div>
                </div>
              </div>

              <h3 style={s.ecoName}>{p.name}</h3>
              <p style={{ ...s.ecoTagline, color: p.accent }}>{p.tagline}</p>
              <p style={s.ecoDesc}>{p.desc}</p>

              <ul style={s.ecoList}>
                {p.features.map((f, fi) => (
                  <li key={fi} style={s.ecoListItem}>
                    <i className="fas fa-check" style={{ ...s.ecoCheck, color: p.accent }} aria-hidden="true"></i>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={p.ctaHref}
                style={{ ...s.ecoCta, borderColor: p.accent, color: p.accent }}
                className="btn-t"
                aria-label={`${p.cta} about ${p.name}`}
              >
                {p.cta} <i className="fas fa-arrow-right" style={{ marginLeft: "6px", fontSize: "0.75rem" }} aria-hidden="true"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Ecosystem;