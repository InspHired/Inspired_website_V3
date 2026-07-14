import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close the menu automatically whenever the route changes (e.g. after clicking a link)
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="navbar">
      <div className="logo">
        Insp<span>Hired</span>
      </div>

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