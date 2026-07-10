const values = [
  {
    icon: "🔥",
    title: "Passion",
    description:
      "We are driven by purpose and committed to creating meaningful connections between people and opportunities.",
    expanded:
      "Our enthusiasm for people, talent, and growth inspires everything we do, allowing us to deliver exceptional outcomes.",
  },
  {
    icon: "🛡️",
    title: "Integrity",
    description:
      "We operate with honesty, transparency, and professionalism in every interaction.",
    expanded:
      "Trust forms the foundation of our relationships with clients, candidates, and partners across Africa.",
  },
  {
    icon: "✓",
    title: "Accountability",
    description:
      "We take ownership of our actions, commitments, and the results we deliver.",
    expanded:
      "By holding ourselves accountable, we ensure consistency, reliability, and long-term success for our stakeholders.",
  },
];

function Values() {
  return (
    <section id="values" className="container">
      <h2 className="section-title">Our Values</h2>

      <div className="values-grid">
        {values.map((value) => (
          <div className="value-card" key={value.title}>
            <div className="value-icon">{value.icon}</div>

            <h3>{value.title}</h3>

            <p>{value.description}</p>

            <div className="value-expand">{value.expanded}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Values;