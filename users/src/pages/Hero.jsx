import NetworkCanvas from "./NetworkCanvas";
import AvatarLayer from "./AvatarLayer";
import HeroStats from "../components/HeroSpotlight/HeroStats";

function Hero() {
  return (
    <div className="hero-container" id="home">
      <style>{`
        .hero-title {
          font-family: 'Playfair Display', Georgia, serif !important;
          color: #1f3540 !important;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        /* Base style for both Hero CTA buttons */
        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 32px;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 700;
          text-decoration: none;
          border-radius: 50px; /* Modern sleek capsule shape */
          cursor: pointer;
          letter-spacing: 0.3px;
          position: relative;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.3s ease;
          
          /* Smooth hardware acceleration for 3D press effect */
          transform: translateY(-3px); 
        }

        /* ===== PRIMARY METALLIC TEAL BUTTON ("Find Talent") ===== */
        .hero-btn-primary {
          color: #ffffff;
          background: linear-gradient(180deg, #62b1b4 0%, #509b9e 45%, #39797c 100%);
          border: 1px solid #73c8cb;
          
          /* Metallic depth & 3D shadow stack */
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.6),    /* Top metallic highlight */
            inset 0 -2px 4px rgba(0, 0, 0, 0.25),        /* Inner bottom depth shadow */
            0 4px 0 #285759,                             /* 3D solid button edge */
            0 8px 15px rgba(31, 53, 64, 0.25);          /* Ambient floor drop-shadow */
          
          text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.3);
        }

        .hero-btn-primary:hover {
          background: linear-gradient(180deg, #6bc0c3 0%, #54a5a8 45%, #3d8386 100%);
          transform: translateY(-5px);
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.7),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2),
            0 6px 0 #285759,
            0 12px 20px rgba(80, 155, 158, 0.35);
        }

        /* ===== SECONDARY METALLIC SILVER/STEEL BUTTON ("Available Jobs") ===== */
        .hero-btn-secondary {
          color: #1f3540;
          background: linear-gradient(180deg, #ffffff 0%, #e6ecef 50%, #c8d3d8 100%);
          border: 1px solid #ffffff;
          
          /* Metallic chrome/steel depth stack */
          box-shadow: 
            inset 0 1px 2px rgba(255, 255, 255, 0.9),    /* Gloss top sheen */
            inset 0 -2px 4px rgba(31, 53, 64, 0.15),     /* Metallic bottom shadow */
            0 4px 0 #9eb0b8,                             /* Solid 3D steel rim */
            0 8px 15px rgba(31, 53, 64, 0.15);          /* Ambient drop shadow */
            
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .hero-btn-secondary:hover {
          background: linear-gradient(180deg, #ffffff 0%, #edf2f4 50%, #d4e0e5 100%);
          transform: translateY(-5px);
          box-shadow: 
            inset 0 1px 2px rgba(255, 255, 255, 1),
            inset 0 -2px 4px rgba(31, 53, 64, 0.12),
            0 6px 0 #9eb0b8,
            0 12px 20px rgba(31, 53, 64, 0.2);
        }

        /* ===== REALISTIC 3D PRESS / CLICK EFFECT FOR BOTH ===== */
        .hero-btn:active {
          transform: translateY(1px) !important;
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.3),
            0 0 0 transparent,
            0 3px 6px rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>

      <NetworkCanvas />
      <AvatarLayer />
      <HeroStats />

      <div className="hero-content">
        <div className="hero-left">
          <div className="badge">
            Africa's Recruitment Partner · Est. 2015
          </div>

          <h1 className="hero-title">
            Connecting great talent with great companies
          </h1>

          <p className="hero-desc">
            We don't just fill jobs — we build careers,
            relationships, and futures.
            InspHired has been solving Africa's employment
            challenges through innovative technology and
            people who care.
          </p>

          <div className="cta-group">
            <a
              href="https://app.insphired.jobs/jobs?standalone=true"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-btn-primary"
            >
              Find Talent
            </a>

            <a
              href="https://connect.insphired.jobs"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-btn-secondary"
            >
              Available Jobs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;