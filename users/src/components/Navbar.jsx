function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        Insp<span>Hired</span>
      </div>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#ecosystem">Ecosystem</a></li>
        <li><a href="#career-lab">Career Lab</a></li>
        <li><a href="#values">Values</a></li>
        <li><a href="#team">Team</a></li>
        <li><a href="#contact">Contact</a></li>
        <li>
          <button className="btn-consult">Book Consultation</button>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;