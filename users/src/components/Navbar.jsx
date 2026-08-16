import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
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

        .logo-image-wrapper {
          display: flex;
          align-items: center;
          height: 50px;
        }

        .logo-image {
          height: 100%;
          width: auto;
          object-fit: contain;
        }

        /* ===== BOOK CONSULTATION BUTTON ===== */
        .btn-consult {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 22px;
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff !important;
          background: linear-gradient(180deg, #62b1b4 0%, #509b9e 45%, #39797c 100%);
          border: 1px solid #73c8cb;
          border-radius: 50px;
          cursor: pointer;
          letter-spacing: 0.3px;
          position: relative;
          text-decoration: none !important;
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
          color: #ffffff !important;
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.7),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2),
            0 4px 0 #285759,
            0 8px 16px rgba(80, 155, 158, 0.3);
        }

        .btn-consult:active {
          transform: translateY(1px) !important;
          color: #ffffff !important;
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.3),
            0 0 0 transparent,
            0 2px 4px rgba(0, 0, 0, 0.2) !important;
        }

        .btn-consult:visited,
        .btn-consult:focus {
          color: #ffffff !important;
        }

        /* ===== NAV LINKS ===== */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links a {
          text-decoration: none;
          font-size: 1rem;
          font-weight: 700; 
          color: #1f3540;     
          letter-spacing: -0.01em;
          transition: color 0.2s ease, opacity 0.2s ease;
          white-space: nowrap;
        }

        .nav-links a:hover {
          color: #509b9e;
        }

        .nav-links a.active {
          color: #509b9e;
          border-bottom: 2px solid #509b9e;
          padding-bottom: 2px;
        }

        /* ===== DROPDOWN ===== */
        .dropdown-wrapper {
          position: relative;
        }

        .dropdown-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          font-size: 1rem;
          font-weight: 700;
          color: #1f3540;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
          font-family: inherit;
          letter-spacing: -0.01em;
        }

        .dropdown-trigger:hover {
          color: #509b9e;
        }

        .dropdown-trigger .arrow {
          font-size: 1rem;
          font-weight: 700;
          transition: transform 0.3s ease;
          display: inline-block;
          color: #509b9e;
          line-height: 1;
        }

        .dropdown-trigger .arrow.open {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          background: #ffffff;
          min-width: 200px;
          border-radius: 12px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06);
          padding: 10px 0;
          list-style: none;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
          transform: translateX(-50%) translateY(-8px);
          z-index: 1000;
          border: 1px solid rgba(31, 53, 64, 0.06);
        }

        .dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown-menu li {
          margin: 0;
          padding: 0;
        }

        .dropdown-menu a {
          display: block;
          padding: 10px 20px;
          font-size: 0.95rem;
          font-weight: 500;
          color: #1f3540 !important;
          transition: background 0.15s ease, color 0.15s ease;
          border: none;
          text-decoration: none;
          white-space: nowrap;
        }

        .dropdown-menu a:hover {
          background: rgba(80, 155, 158, 0.08);
          color: #509b9e !important;
        }

        .dropdown-menu a.active {
          background: rgba(80, 155, 158, 0.12);
          color: #509b9e !important;
          border-bottom: none !important;
        }

        /* ===== HAMBURGER ===== */
        .hamburger-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 4px;
          z-index: 200;
          border-radius: 4px;
        }

        .hamburger-line {
          display: block;
          width: 26px;
          height: 2.5px;
          background: #1f3540;
          border-radius: 2px;
          transition: 0.25s ease;
          transform-origin: center;
        }

        .hamburger-btn-open .hamburger-line:nth-child(1) {
          transform: translateY(7.5px) rotate(45deg);
        }

        .hamburger-btn-open .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        .hamburger-btn-open .hamburger-line:nth-child(3) {
          transform: translateY(-7.5px) rotate(-45deg);
        }

        .nav-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 50;
          backdrop-filter: blur(2px);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .nav-links {
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .logo-image-wrapper {
            height: 38px;
          }

          .hamburger-btn {
            display: flex;
          }

          .nav-overlay {
            display: block;
          }

          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 75%;
            max-width: 340px;
            height: 100vh;
            background: #ffffff;
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
            padding: 80px 28px 30px;
            margin: 0;
            z-index: 100;
            transition: right 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            box-shadow: -8px 0 30px rgba(0, 0, 0, 0.08);
            overflow-y: auto;
            list-style: none;
          }

          .nav-links-open {
            right: 0;
          }

          .nav-links li {
            width: 100%;
            padding: 6px 0;
            border-bottom: 1px solid rgba(31, 53, 64, 0.04);
          }

          .nav-links li:last-child {
            border-bottom: none;
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid rgba(31, 53, 64, 0.08);
          }

          .nav-links a {
            display: block;
            font-size: 1.1rem;
            padding: 8px 0;
            width: 100%;
          }

          .nav-links a.active {
            border-bottom: none;
            color: #509b9e;
          }

          .btn-consult {
            width: 100%;
            justify-content: center;
            color: #ffffff !important;
          }

          /* Dropdown in mobile */
          .dropdown-wrapper {
            width: 100%;
          }

          .dropdown-trigger {
            width: 100%;
            justify-content: space-between;
            padding: 8px 0;
            font-size: 1.1rem;
          }

          .dropdown-trigger .arrow {
            font-size: 1.1rem;
          }

          .dropdown-menu {
            position: static;
            transform: none;
            box-shadow: none;
            padding: 0 0 0 16px;
            background: transparent;
            opacity: 1;
            visibility: visible;
            height: 0;
            overflow: hidden;
            transition: height 0.3s ease, padding 0.3s ease;
            border: none;
            min-width: unset;
            width: 100%;
            left: auto;
          }

          .dropdown-menu.open {
            height: auto;
            padding: 8px 0 8px 16px;
            transform: none;
          }

          .dropdown-menu a {
            padding: 8px 0;
            font-size: 0.95rem;
          }

          .dropdown-menu a:hover {
            background: transparent;
          }
        }
      `}</style>

      <Link to="/" className="brand-logo-container" aria-label="InspHired Recruitment Solutions Home">
        <div className="logo-image-wrapper">
          <img 
            src="/assets/logo.png" 
            alt="InspHired Logo" 
            className="logo-image"
          />
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
        <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
        <li><Link to="/about-page" className={location.pathname === "/about-page" ? "active" : ""}>About</Link></li>
        <li><Link to="/services" className={location.pathname === "/services" ? "active" : ""}>Services</Link></li>
        <li><Link to="/employers" className={location.pathname === "/employers" ? "active" : ""}>Employers</Link></li>
        
        {/* "Our Brands" Dropdown */}
        <li className="dropdown-wrapper">
          <button
            type="button"
            className="dropdown-trigger"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-expanded={isDropdownOpen}
          >
            Our Brands
            <span className={`arrow ${isDropdownOpen ? "open" : ""}`}>▾</span>
          </button>
          <ul className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
            <li><Link to="/career-lab" onClick={() => setIsDropdownOpen(false)}>Career Lab</Link></li>
            <li><Link to="/connect" onClick={() => setIsDropdownOpen(false)}>Connect</Link></li>
            <li><Link to="/jobot" onClick={() => setIsDropdownOpen(false)}>Jobot</Link></li>
            <li><Link to="/worx" onClick={() => setIsDropdownOpen(false)}>Worx</Link></li>
            <li><Link to="/verify-me" onClick={() => setIsDropdownOpen(false)}>VerifyMe</Link></li>
          </ul>
        </li>

        <li><Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link></li>
        <li>
          <a
            href="https://calendly.com/recruitment-insphired/book-a-consultation-with-a-client-relationship-manager?month=2026-05"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-consult"
          >
            Book Consultation
          </a>
        </li>
      </ul>

      {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)}></div>}
    </header>
  );
}

export default Navbar;