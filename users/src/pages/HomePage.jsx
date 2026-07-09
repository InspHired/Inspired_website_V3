import Hero from "../components/Hero";
import About from "../components/About";
import MissionVision from "../components/MissionVision";
import Ecosystem from "../components/Ecosystem";
import Values from "../components/Values";

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <MissionVision />
      <Ecosystem />
      <Values />
    </main>
  );
}

export default HomePage;