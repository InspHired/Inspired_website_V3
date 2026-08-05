// users/src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { publicApi } from "../services/api";
import Hero from "../pages/Hero";
import Info from "./info.jsx";
import MissionVision from "../pages/MissionVision";
import Ecosystem from "../pages/Ecosystem";
import Values from "../pages/Values";
import Team from "../pages/TeamPage";
import Testimonials from "../pages/Testimonials.jsx";
import Footer from "../components/Footer";

function HomePage() {
  const location = useLocation();
  const [content, setContent] = useState({
    hero: null,
    info: null,
    platforms: [],
    team: [],
    testimonials: [],
    footer: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch content from backend
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await publicApi.getHomepage();
        
        if (response.success && response.data) {
          setContent({
            hero: response.data.hero || null,
            info: response.data.info || null,
            platforms: response.data.platforms || [],
            team: response.data.team || [],
            testimonials: response.data.testimonials || [],
            footer: response.data.footer || null
          });
        } else {
          setError('Failed to load content');
        }
      } catch (err) {
        console.error('Error fetching homepage content:', err);
        setError(err.message || 'Error loading content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Handle hash scrolling
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // Show loading state
  if (loading) {
    return (
      <div className="loading-container" style={styles.loadingContainer}>
        <div className="loading-spinner" style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading content...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="error-container" style={styles.errorContainer}>
        <p style={styles.errorText}>⚠️ {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={styles.retryButton}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main>
      <Hero content={content.hero || {}} />
      <Info content={content.info || {}} />
      <Ecosystem content={content.platforms || []} />
      <Team content={content.team || []} />
      <Testimonials content={content.testimonials || []} />
      <Footer content={content.footer || {}} />
    </main>
  );
}

// Inline styles for loading/error states
const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#faf6f0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #e5dfd5',
    borderTop: '3px solid #509b9e',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  },
  loadingText: {
    marginTop: '16px',
    color: '#7a8790',
    fontSize: '14px'
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#faf6f0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px'
  },
  errorText: {
    color: '#d96b43',
    fontSize: '16px',
    marginBottom: '20px'
  },
  retryButton: {
    padding: '12px 32px',
    backgroundColor: '#509b9e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  }
};

// Add keyframes for spinner animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default HomePage;