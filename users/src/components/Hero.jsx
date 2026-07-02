import NetworkCanvas from "./NetworkCanvas";

function Hero() {
  return (
    <div className="hero-container" id="home">
      <NetworkCanvas />

      <div className="hero-content">
        <div className="hero-left">
          <div className="badge">
            Africa's Recruitment Partner · Est. 2015
          </div>

          <h1 className="hero-title">
            Connecting great talent with great companies
          </h1>

          <p className="hero-desc">
            We don't just fill jobs — we build careers, relationships, and
            futures. InspHired has been solving Africa's employment challenges
            through innovative technology and people who care.
          </p>

          <div className="cta-group">
            <button className="btn-primary">Find Talent</button>
            <button className="btn-secondary">Available Jobs</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;