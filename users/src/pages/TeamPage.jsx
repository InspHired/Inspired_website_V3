import { useMemo, useState } from "react";

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

// Default center content when no ring member is selected — generic, no individual photo.
const defaultCenter = {
  name: "InspHired Team",
  role: "The team ready to assist you on your journey",
  img: null,
};

const ringTeam = [
  { name: "Landry Mutombo", role: "Chief Executive", img: "../assets/insphiredTeam/Mr_L.png" },
  { name: "Norma Banda", role: "Managing Partner", img: "../assets/insphiredTeam/Norma.png" },
  { name: "Rochelle Titus", role: "Managing Partner", img: "../assets/insphiredTeam/Rochelle.png" },
  { name: "Joyce Muya", role: "Managing Partner", img: "../assets/insphiredTeam/Joyce.png" },
  { name: "Stefanie Peters", role: "Managing Partner", img: "../assets/insphiredTeam/Steff.png" },
  { name: "Deborah Mubenga", role: "Head of Operations", img: "../assets/insphiredTeam/Deborah.png" },
  { name: "Gègè Sena Saleh", role: "Head of Finance", img: "../assets/insphiredTeam/Gege.png" },
  { name: "Unathi Mbasa", role: "Operations Team Lead", img: "../assets/insphiredTeam/Unathi.png" },
  { name: "Ene-ene Netshiswinzhe", role: "HR Generalist", img: "../assets/insphiredTeam/Ene-ene.png" },
  { name: "Tumelo Mpeta", role: "Talent Marketing & ATS Coordinator", img: "../assets/insphiredTeam/Tumelo.png" },
  { name: "Phamela Mthitshane", role: "Candidate Manager", img: "../assets/insphiredTeam/Phamela.png" },
  { name: "Sharrity Mhlanga", role: "Recruitment Researcher", img: "../assets/insphiredTeam/Sharity.png" },
];

const accentCycle = [C.teal, C.orange, C.yellow, C.navy];

function TeamsPage() {
  const [activeMember, setActiveMember] = useState(null);

  const nodePositions = useMemo(() => {
    const radius = 44;
    return ringTeam.map((member, i) => {
      const angle = (360 / ringTeam.length) * i - 90;
      const rad = (angle * Math.PI) / 180;
      return {
        ...member,
        accent: accentCycle[i % accentCycle.length],
        left: 50 + radius * Math.cos(rad),
        top: 50 + radius * Math.sin(rad),
      };
    });
  }, []);

  const active = ringTeam.find((m) => m.name === activeMember);
  const centerContent = active || defaultCenter;

  return (
    <section style={{ ...s.section, background: C.white }}>
      <div style={s.container}>
        <div style={s.secHead}>
          <span style={s.eyebrow}>Our people</span>
          <h2 style={s.h2}>The team behind InspHired</h2>
          <p style={s.secSub}>
            Experienced recruitment professionals united by one mission —
            connecting great talent with great companies across Africa. Hover or tap to meet the team.
          </p>
        </div>

        <div className="team-circle">
          <svg className="team-connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
            {nodePositions.map((node, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={node.left}
                y2={node.top}
                stroke="rgba(31, 53, 64, 0.1)"
                strokeWidth="0.4"
                strokeDasharray="1.5 2"
              />
            ))}
          </svg>

          {nodePositions.map((node) => (
            <button
              key={node.name}
              type="button"
              className={`team-node ${activeMember === node.name ? "team-node-active" : ""}`}
              style={{ left: `${node.left}%`, top: `${node.top}%` }}
              onClick={() =>
                setActiveMember(activeMember === node.name ? null : node.name)
              }
              aria-pressed={activeMember === node.name}
            >
              <span className="team-avatar" style={{ borderColor: node.accent }}>
                <img
                  src={node.img}
                  alt={node.name}
                  className="team-img"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <span className="team-fallback" style={{ background: `${node.accent}22` }}>
                  <i className="fas fa-user-tie" style={{ color: node.accent }} aria-hidden="true"></i>
                </span>
              </span>

              <span className="team-tooltip" role="tooltip">
                <strong>{node.name}</strong>
                <br />
                {node.role}
              </span>
            </button>
          ))}

          <div className="team-center">
            <span className="team-center-avatar" style={{ borderColor: C.teal }}>
              {centerContent.img ? (
                <img
                  src={centerContent.img}
                  alt={centerContent.name}
                  className="team-img"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <span
                className="team-fallback"
                style={{
                  background: `${C.teal}22`,
                  display: centerContent.img ? "none" : "flex",
                }}
              >
                <i className="fas fa-user-tie" style={{ color: C.teal, fontSize: "2rem" }} aria-hidden="true"></i>
              </span>
            </span>
            <p className="team-center-name">{centerContent.name}</p>
            <p className="team-center-role">{centerContent.role}</p>
          </div>
        </div>

        <p className="team-footnote">
          Backed by a full team of candidate managers, recruitment researchers, account managers, and operations specialists — all on the InspHired bus.
        </p>
      </div>
    </section>
  );
}

export default TeamsPage;