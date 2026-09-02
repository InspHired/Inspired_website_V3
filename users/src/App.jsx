// users/src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ContentProvider } from "./contexts/ContentContext";
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
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import FormConfirmation from "./pages/FormConfirmation"; // ✅ Make sure this import exists
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-page" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/employers" element={<EmployersPage />} />
          <Route path="/jobot" element={<JobotPage />} />
          <Route path="/career-lab" element={<CareerLabPage />} />
          <Route path="/worx" element={<WorxPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/verify-me" element={<VerifyMePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          {/* ✅ Add this route */}
          <Route path="/form-confirmation" element={<FormConfirmation />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </BrowserRouter>
    </ContentProvider>
  );
}

export default App;