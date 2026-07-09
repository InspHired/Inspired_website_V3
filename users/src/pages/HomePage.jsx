import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../pages/Hero";
import Info from "./info.jsx";
import MissionVision from "../pages/MissionVision";
import Ecosystem from "../pages/Ecosystem";
import Values from "../pages/Values";
import Team from "../pages/TeamPage";
import Testimonials from "../pages/Testimonials.jsx"

import Footer from "../components/Footer";

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <main>
      <Hero />
      <Info />
      <Ecosystem />
      <Team />
      <Testimonials />
      <Footer />
    </main>
  );
}

export default HomePage;