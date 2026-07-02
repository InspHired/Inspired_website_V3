function About() {
  return (
    <section id="about" className="container">
      <div className="about-grid">
        <div>
          <h2 className="section-title">
            Where African Talent Meets Opportunity
          </h2>

          <p className="section-text">
            Founded in 2015, InspHired set out with a clear mission - to bridge
            the gap between candidates and clients through innovative technology
            and dedicated talent specialists. What started as a focused
            recruitment firm has steadily grown into a full talent ecosystem
            serving employers and job seekers across the continent.
          </p>

          <p className="section-text section-text-spaced">
            Today, InspHired operates a multi-platform digital infrastructure
            engineered to simplify hiring. We are home to a team of passionate
            professionals who believe the right placement changes lives -
            creating long-term value for candidates, growing enterprises, and
            communities across Africa.
          </p>

          <div className="quote-block">
            We don't just fill jobs - we build careers, relationships, and
            futures.
          </div>
        </div>

        <div className="recruitment-circle">
          <div className="flow-node node1">
            <span>👤</span>
            <p>Candidate</p>
          </div>

          <div className="flow-node node2">
            <span>📋</span>
            <p>Screening</p>
          </div>

          <div className="flow-node node3">
            <span>🤝</span>
            <p>Matching</p>
          </div>

          <div className="flow-node node4">
            <span>💬</span>
            <p>Interview</p>
          </div>

          <div className="flow-node node5">
            <span>🚀</span>
            <p>Placement</p>
          </div>

          <div className="flow-node node6">
            <span>🌍</span>
            <p>Growth</p>
          </div>

          <div className="orbit">
            <div className="orbit-dot"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;