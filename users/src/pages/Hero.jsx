import NetworkCanvas from "./NetworkCanvas";
import AvatarLayer from "./AvatarLayer";
import HeroSpotlight from "../components/HeroSpotlight/HeroStats";
import HeroStats from "../components/HeroSpotlight/HeroStats";

function Hero() {
  return (
    <div className="hero-container" id="home">

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
              className="btn-primary"
            >
              Find Talent
            </a>

            <a
              href="https://connect.insphired.jobs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
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