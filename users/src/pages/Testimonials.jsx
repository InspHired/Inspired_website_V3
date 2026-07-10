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
  eyebrow: {
    display: "inline-block",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: C.teal,
    marginBottom: 12,
  },
  h2: { fontSize: 32, fontWeight: 700, color: C.navy, margin: "0 0 12px" },
  secSub: { fontSize: 16, lineHeight: 1.6, color: C.slateLight, margin: 0 },
};

const testimonials = [
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
    <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className="fas fa-star"
          style={{ color, fontSize: 14 }}
          aria-hidden="true"
        ></i>
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section style={{ ...s.section, background: C.bg }}>
      <div style={s.container}>
        <div style={s.secHead}>
          <span style={s.eyebrow}>Testimonials</span>
          <h2 style={s.h2}>What people say</h2>
          <p style={s.secSub}>
            Real words from candidates and clients we've had the privilege to work with.
          </p>
        </div>

        <div className="testimonial-grid" style={styles.grid}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ ...styles.card, borderTop: `4px solid ${t.accent}` }} className="testimonial-card">
              <i
                className="fas fa-quote-left"
                style={{ ...styles.quoteMark, color: `${t.accent}33` }}
                aria-hidden="true"
              ></i>

              <StarRow color={t.accent} />

              <p style={styles.quoteText}>"{t.quote}"</p>

              <div style={styles.footer}>
                <div style={{ ...styles.avatar, background: `${t.accent}22`, color: t.accent }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p style={styles.name}>{t.name}</p>
                  <p style={styles.role}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonial-card {
          transition: transform var(--transition, 0.25s ease), box-shadow var(--transition, 0.25s ease);
        }
        .testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md, 0 12px 40px rgba(0,0,0,0.07));
        }
        @media (max-width: 900px) {
          .testimonial-grid { grid-template-columns: 1fr !important; }
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
    borderRadius: "var(--radius-card, 24px)",
    boxShadow: "var(--shadow-sm, 0 8px 30px rgba(0,0,0,0.05))",
    padding: "36px 32px",
    display: "flex",
    flexDirection: "column",
  },
  quoteMark: {
    fontSize: 28,
    marginBottom: 8,
  },
  quoteText: {
    fontSize: 15,
    lineHeight: 1.7,
    color: C.navy,
    marginBottom: 24,
    flexGrow: 1,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 15,
    flexShrink: 0,
  },
  name: {
    fontSize: 14,
    fontWeight: 700,
    color: C.navy,
    margin: 0,
  },
  role: {
    fontSize: 12.5,
    color: C.slateLight,
    margin: 0,
  },
};

export default Testimonials;