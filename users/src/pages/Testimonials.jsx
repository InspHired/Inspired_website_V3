// users/src/pages/Testimonials.jsx
import React from "react";

const C = {
  teal: "#509b9e",
  orange: "#d96b43",
  yellow: "#e4af51",
  navy: "#1f3540",
  bg: "#faf6f0",
  white: "#FFFFFF",
  borderLight: "#e5dfd5",
  slateLight: "#7a8790",
};

const s = {
  section: { padding: "80px 0" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" },
  secHead: { textAlign: "center", maxWidth: 640, margin: "0 auto 48px" },
  secSub: { fontSize: 16, lineHeight: 1.6, color: C.slateLight, margin: 0 },
};

const defaultTestimonials = [
  {
    quote: "I would just like to say a massive thank you for believing in me. Your professionalism throughout the process was exceptional.",
    name: "Jermaine C.",
    role: "Successful candidate",
    accent: C.teal,
  },
  {
    quote: "That is why I like your work. Honestly, I think you are my best recruiter.",
    name: "Jodene L.",
    role: "Satisfied client",
    accent: C.orange,
  },
  {
    quote: "Thank you for giving me the opportunity. You guided me through the process and I'll be forever grateful!",
    name: "Nicole L.",
    role: "Successful candidate",
    accent: C.yellow,
  },
];

function StarRow({ color }) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={color}
          style={{ flexShrink: 0 }}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function Testimonials({ content = [] }) {
  const testimonials = content && content.length > 0 ? content : defaultTestimonials;

  return (
    <section style={{ ...s.section, background: C.bg }}>
      <div style={s.container}>
        <div style={s.secHead}>
          <span className="eyebrow-3d">Testimonials</span>
          <h2 className="title-3d title-section">What people say</h2>
          <p style={s.secSub}>
            Real words from candidates and clients we've had the privilege to work with.
          </p>
        </div>

        <div className="testimonial-grid" style={styles.grid}>
          {testimonials.map((t, index) => {
            const accent = t.accent_color || t.accent || C.teal;
            const name = t.client_name || t.name || '';
            const role = t.role || '';
            const quote = t.quote || t.text || '';

            return (
              <div
                key={name || index}
                style={{ ...styles.card, borderTop: `4px solid ${accent}` }}
                className="testimonial-card"
              >
                <div style={{ marginBottom: 12 }}>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill={accent}
                    style={{ opacity: 0.35 }}
                  >
                    <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
                  </svg>
                </div>

                <StarRow color={accent} />

                <p style={styles.quoteText}>"{quote}"</p>

                <div style={styles.footer}>
                  <div
                    style={{
                      ...styles.avatar,
                      background: `${accent}18`,
                      color: accent,
                      border: `1px solid ${accent}40`,
                    }}
                  >
                    {name.charAt(0) || 'A'}
                  </div>
                  <div>
                    <p style={styles.name}>{name}</p>
                    <p style={styles.role}>{role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
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

        .title-section {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          line-height: 1.2;
        }

        /* ── EYEBROW - Matches About/Services pages ── */
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

        .testimonial-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(31, 53, 64, 0.1) !important;
        }

        @media (max-width: 900px) {
          .testimonial-grid { 
            grid-template-columns: 1fr !important; 
          }
        }
      `}</style>
    </section>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 28,
  },
  card: {
    position: "relative",
    background: C.white,
    border: `1px solid ${C.borderLight}`,
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(31, 53, 64, 0.04)",
    padding: "36px 32px",
    display: "flex",
    flexDirection: "column",
  },
  quoteText: {
    fontSize: 15,
    lineHeight: 1.65,
    color: C.navy,
    fontStyle: "italic",
    marginBottom: 24,
    flexGrow: 1,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    paddingTop: 18,
    borderTop: `1px solid ${C.borderLight}`,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 16,
    fontFamily: "'Playfair Display', Georgia, serif",
    flexShrink: 0,
  },
  name: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 15,
    fontWeight: 700,
    color: C.navy,
    margin: 0,
  },
  role: {
    fontSize: 12.5,
    color: C.slateLight,
    margin: "2px 0 0",
  },
};

export default Testimonials;