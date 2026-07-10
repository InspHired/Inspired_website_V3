import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/AboutPage";
import JobotPage from "./pages/JobotPage";
import CareerLabPage from "./pages/CareerLabPage";
import WorxPage from "./pages/WorxPage";
import ConnectPage from "./pages/ConnectPage";
import VerifyMePage from "./pages/VerifyMePage";
import Services from "./pages/Services";
import EmployersPage from "./pages/EmployersPage";
import ContactPage from "./pages/ContactPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-page" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/employers" element={<EmployersPage />} />
        <Route path="/jobot" element={<JobotPage />} />
        <Route path="/career-lab" element={<CareerLabPage />} />
        <Route path="/worx" element={<WorxPage />} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/verify-me" element={<VerifyMePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;