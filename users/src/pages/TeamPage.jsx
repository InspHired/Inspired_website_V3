import React, { useState, useEffect } from "react";
import "./TeamsCarousel.css";
 
// Color palette
const C = {
  teal: "#509b9e",
  orange: "#d96b43",
  yellow: "#e4af51",
  navy: "#1f3540",
};
 
// Accent color cycle for cards
const accentCycle = [C.teal, C.orange, C.yellow, C.teal, C.orange, C.yellow, C.teal, C.orange, C.yellow, C.teal];
 
const slides = [
  {
    name: "InspHired Hub",
    role: "We Connect",
    desc: "Bridging the gap between forward-thinking companies and top-tier African talent.",
    img: "../assets/insphiredTeam/team.png"
  },
  { name: "Landry Mutombo", role: "Chief Executive", img: "../assets/insphiredTeam/Mr_L.png" },
  { name: "Norma Banda", role: "Managing Partner", img: "../assets/insphiredTeam/Norma.png" },
  { name: "Rochelle Titus", role: "Managing Partner", img: "../assets/insphiredTeam/Rochelle.png" },
  { name: "Joyce Muya", role: "Managing Partner", img: "../assets/insphiredTeam/joyce.png" },
  { name: "Stefanie Peters", role: "Managing Partner", img: "../assets/insphiredTeam/Steff.png" },
  { name: "Deborah Mubenga", role: "Head of Operations", img: "../assets/insphiredTeam/Deborah.png" },
  { name: "Gègè Sena Saleh", role: "Head of Finance", img: "../assets/insphiredTeam/Gege.png" },
  { name: "Unathi Mbasa", role: "Operations Team Lead", img: "../assets/insphiredTeam/Unathii.png" },
  { name: "Ene-ene Netshiswinzhe", role: "HR Generalist", img: "../assets/insphiredTeam/Ene-ene.png" },
  { name: "Tumelo Mpeta", role: "Talent Marketing & ATS Coordinator", img: "../assets/insphiredTeam/Tumelo.png" },
];
 
function TeamsCarousel() {
  const [index, setIndex] = useState(0);
 
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
 
  return (
    <section className="team-section">
      {/* ===== STYLED HEADER ===== */}
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">The InspHired Team</span>
          <h2 className="title-3d">Meet the people behind the vision</h2>
          <p className="subtitle">
            A diverse team of recruitment experts, operations leaders, and innovators
            working together to connect Africa's talent with global opportunities.
          </p>
        </div>
      </div>
 
      {/* ===== CAROUSEL ===== */}
      <div className="stack-container">
        {slides.map((slide, i) => {
          // Calculate positions
          let position = "";
          if (i === index) position = "active";
          else if (i === (index - 1 + slides.length) % slides.length) position = "left";
          else if (i === (index + 1) % slides.length) position = "right";
          else position = "hidden";
 
          // Get accent color for this card
          const accent = accentCycle[i % accentCycle.length];
 
          return (
            <div
              key={i}
              className={`team-card ${position}`}
              style={{
                background: `linear-gradient(160deg, ${accent}33 0%, #f5f0eb 100%)`,
                borderColor: position === "active" ? accent : "rgba(80, 155, 158, 0.1)"
              }}
            >
              <div className="avatar-box" style={{ borderColor: accent }}>
                {slide.img ? (
                  <img src={slide.img} alt={slide.name} />
                ) : (
                  <i className={slide.icon}></i>
                )}
              </div>
              <h3>{slide.name}</h3>
              <p className="role" style={{ color: accent }}>{slide.role}</p>
              <p className="desc">{slide.desc || "Experienced recruitment professional."}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
 
export default TeamsCarousel;