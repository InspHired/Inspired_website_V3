// users/src/pages/Ecosystem.jsx
import React, { useState, useEffect } from "react";
import { useContent } from "../contexts/ContentContext";
import "./Ecosystem.css";

const C = {
  teal: "#509b9e",
  orange: "#d96b43",
  yellow: "#e4af51",
  navy: "#1f3540",
};

const defaultPlatforms = [
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
    accent: C.navy,
    img: "/assets/VerifyMee.png",
  },
];

function Ecosystem({ content: propContent }) {
  const { content: contextContent, loading } = useContent();
  const [platforms, setPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to get content from props, then context, then fallback to defaults
    const getPlatforms = () => {
      // Check if content is passed via props
      if (propContent && propContent.length > 0) {
        console.log("📦 Using platforms from props:", propContent);
        return propContent;
      }

      // Check if content is available from context
      if (contextContent && contextContent.home && contextContent.home.platforms) {
        console.log("📦 Using platforms from context:", contextContent.home.platforms);
        return contextContent.home.platforms;
      }

      // Fallback to defaults
      console.log("📦 Using default platforms");
      return defaultPlatforms;
    };

    const platformsData = getPlatforms();
    
    // Map the data to the expected format with safe defaults
    const mappedPlatforms = platformsData.map((p) => {
      // CRITICAL FIX: Handle features properly
      let features = [];
      
      if (p.features && Array.isArray(p.features)) {
        features = p.features.map((f) => {
          // If feature is an object with feature_text (from database)
          if (typeof f === 'object' && f !== null) {
            // Check for feature_text (database column)
            if (f.feature_text) {
              return f.feature_text;
            }
            // If it has a text property
            if (f.text) {
              return f.text;
            }
            // If it's any other object, try to convert to string
            return JSON.stringify(f);
          }
          // If feature is a string, use it as is
          if (typeof f === 'string') {
            return f;
          }
          // Fallback
          return String(f);
        });
      }
      
      return {
        label: p.label || '',
        name: p.name || '',
        tagline: p.tagline || '',
        features: features,
        cta: p.cta_text || p.cta || 'Learn more',
        ctaHref: p.cta_url || p.ctaHref || '#',
        accent: p.accent_color || p.accent || C.teal,
        img: p.image_url || p.img || '',
      };
    });

    console.log("📊 Mapped platforms:", mappedPlatforms);
    setPlatforms(mappedPlatforms);
    setIsLoading(false);
  }, [propContent, contextContent]);

  // Show loading state
  if (isLoading || loading) {
    return (
      <section className="eco-section">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">The InspHired Ecosystem</span>
            <h2 className="title-3d title-section">More than a recruitment agency</h2>
            <p className="subtitle">
              Four connected platforms, each solving a different part of the employment challenge — working together as one ecosystem.
            </p>
          </div>
          <div className="eco-loading">
            <div className="loading-spinner"></div>
            <p>Loading ecosystem...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="eco-section">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">The InspHired Ecosystem</span>
          <h2 className="title-3d title-section">More than a recruitment agency</h2>
          <p className="subtitle">
            Four connected platforms, each solving a different part of the employment challenge — working together as one ecosystem.
          </p>
        </div>

        <div className="eco-grid">
          {platforms && platforms.length > 0 ? (
            platforms.map((p, i) => (
              <div key={i} className="eco-card" style={{ "--accent": p.accent }}>
                <div className="eco-top-curve" style={{ background: p.accent }}>
                  {p.img ? (
                    <img src={p.img} alt={`${p.name} logo`} className="eco-hero-img" />
                  ) : (
                    <div className="eco-placeholder" style={{ background: p.accent }}>
                      <span>{p.name?.charAt(0) || 'P'}</span>
                    </div>
                  )}
                </div>
                <div className="eco-content">
                  <span className="eco-label" style={{ color: p.accent }}>{p.label}</span>
                  <h3 className="eco-name">{p.name}</h3>
                  <p className="eco-tagline" style={{ color: p.accent }}>{p.tagline}</p>
                  
                  <ul className="eco-list">
                    {p.features && p.features.length > 0 ? (
                      p.features.map((f, fi) => (
                        <li key={`${i}-${fi}`}>
                          <span className="eco-bullet" style={{ background: p.accent }}>●</span>
                          {f}
                        </li>
                      ))
                    ) : (
                      <li>
                        <span className="eco-bullet" style={{ background: p.accent }}>●</span>
                        No features available
                      </li>
                    )}
                  </ul>

                  <a href={p.ctaHref} className="eco-btn" style={{ borderColor: p.accent }}>
                    {p.cta}
                    <span className="eco-arrow" style={{ background: p.accent }}>→</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="eco-empty">
              <p>No platforms available.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .eco-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          min-height: 200px;
        }
        
        .eco-loading .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e5dfd5;
          border-top: 3px solid #509b9e;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        
        .eco-loading p {
          margin-top: 16px;
          color: #7a8790;
          font-size: 14px;
        }
        
        .eco-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 3rem;
          font-weight: 700;
          font-family: 'Playfair Display', Georgia, serif;
        }
        
        .eco-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px;
          color: #7a8790;
          font-size: 1rem;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

export default Ecosystem;