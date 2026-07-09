import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        Insp<span>Hired</span>
      </div>

      <ul className="nav-links">
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
    </header>
  );
}

export default Navbar;