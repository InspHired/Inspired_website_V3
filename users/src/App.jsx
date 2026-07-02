import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CareerLabPage from "./pages/CareerLabPage";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/career-lab" element={<CareerLabPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;