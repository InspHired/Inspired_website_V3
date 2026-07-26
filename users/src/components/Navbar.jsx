import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="navbar">
      <style>{`
        /* ===== 3D METALLIC BRAND LOGO ===== */
        .brand-logo-container {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          text-decoration: none;
          user-select: none;
          transition: transform 0.2s ease;
        }

        .brand-logo-container:hover {
          transform: translateY(-1px);
        }

        .brand-logo-text {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 1.8rem;
          line-height: 1;
          letter-spacing: -0.02em;
          display: flex;
          align-items: baseline;
        }

        /* 3D Teal "Insp" */
        .logo-insp {
          font-weight: 500;
          background: linear-gradient(180deg, #6ecad0 0%, #509b9e 50%, #306c6e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.15));
        }

        /* 3D Dark Navy "Hired" */
        .logo-hired {
          font-weight: 800;
          background: linear-gradient(180deg, #324e5d 0%, #1f3540 50%, #0d1920 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
        }

        /* Metallic Red Sub-Tagline Bar */
        .logo-tagline-bar {
          margin-top: 2px;
          padding: 2px 8px;
          background: linear-gradient(180deg, #af2828 0%, #8b1818 50%, #630c0c 100%);
          border-radius: 3px;
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.4), /* Top gloss edge */
            inset 0 -1px 2px rgba(0, 0, 0, 0.5),    /* Inner depth shadow */
            0 2px 4px rgba(0, 0, 0, 0.2);           /* Outer drop shadow */
          border: 1px solid #7a1515;
        }

        .logo-tagline-text {
          display: block;
          color: #ffffff;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 0.52rem;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
          white-space: nowrap;
        }


        /* ===== 3D METALLIC NAVBAR BUTTON ===== */
        .btn-consult {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 22px;
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          background: linear-gradient(180deg, #62b1b4 0%, #509b9e 45%, #39797c 100%);
          border: 1px solid #73c8cb;
          border-radius: 50px;
          cursor: pointer;
          letter-spacing: 0.3px;
          position: relative;
          text-decoration: none;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.3s ease;
          
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.6),
            inset 0 -2px 4px rgba(0, 0, 0, 0.25),
            0 3px 0 #285759,
            0 6px 12px rgba(31, 53, 64, 0.2);
          text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.3);
          transform: translateY(-2px);
        }

        .btn-consult:hover {
          background: linear-gradient(180deg, #6bc0c3 0%, #54a5a8 45%, #3d8386 100%);
          transform: translateY(-3px);
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.7),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2),
            0 4px 0 #285759,
            0 8px 16px rgba(80, 155, 158, 0.3);
        }

        .btn-consult:active {
          transform: translateY(1px) !important;
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.3),
            0 0 0 transparent,
            0 2px 4px rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>

      {/* RECREATED BRAND LOGO */}
      <Link to="/" className="brand-logo-container" aria-label="InspHired Recruitment Solutions Home">
        <div className="brand-logo-text">
          <span className="logo-insp">Insp</span>
          <span className="logo-hired">Hired</span>
        </div>
        <div className="logo-tagline-bar">
          <span className="logo-tagline-text">Recruitment Solutions</span>
        </div>
      </Link>

      <button
        type="button"
        className={`hamburger-btn ${isOpen ? "hamburger-btn-open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <ul className={`nav-links ${isOpen ? "nav-links-open" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about-page">About</Link></li>
        <li><Link to="/career-lab">Career Lab</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/employers">Employers</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li>
          <button className="btn-consult">Book Consultation</button>
        </li>
      </ul>

      {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)}></div>}
    </header>
  );
}

export default Navbar;