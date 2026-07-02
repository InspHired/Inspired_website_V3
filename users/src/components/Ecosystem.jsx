const ecosystemItems = [
  {
    title: "Jobot by InspHired",
    description: "In-house AI Applicant Tracking System",
    points: [
      "AI-powered candidate matching",
      "Full pipeline management",
      "ATS & CRM",
      "Built & owned by InspHired",
    ],
  },
  {
    title: "InspHired Worx",
    description: "On-demand temp booking platform",
    points: [
      "Pre-vetted talent",
      "Shift bookings",
      "Rapid deployment",
      "Temporary staffing",
    ],
  },
  {
    title: "InspHired Connect",
    description: "Free job board & CRM",
    points: [
      "Free for candidates",
      "Smart matching",
      "Career pathway tools",
      "Direct employer access",
    ],
  },
  {
    title: "VerifyMe",
    description: "Background screening",
    points: [
      "Criminal checks",
      "Education verification",
      "Employment history",
      "ID verification",
    ],
  },
];

function Ecosystem() {
  return (
    <section id="ecosystem" className="container">
      <h2 className="section-title">The InspHired Ecosystem</h2>

      <p className="section-sub">
        More than a recruitment agency - four connected platforms, each solving
        a different part of the employment challenge.
      </p>

      <div className="grid-4 ecosystem-grid">
        {ecosystemItems.map((item) => (
          <div className="card" key={item.title}>
            <span className="card-icon"></span>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

            <ul>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <button className="btn-outline">Learn More</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Ecosystem;