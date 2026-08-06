// users/src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { publicApi } from "../services/api";
import { 
    mapPlatforms, 
    mapTeamMembers, 
    mapTestimonials 
} from "../utils/dataMapper";
import Hero from "../pages/Hero";
import Info from "./info.jsx";
import Ecosystem from "../pages/Ecosystem";
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
        setError(null);
        
        console.log("📡 Fetching homepage content...");
        const response = await publicApi.getHomepage();
        
        console.log("📦 Homepage response:", response);
        
        if (response.success && response.data) {
          // Apply data mappers to ensure all JSON data is properly formatted
          const platforms = mapPlatforms(response.data.platforms || []);
          const team = mapTeamMembers(response.data.team || []);
          const testimonials = mapTestimonials(response.data.testimonials || []);
          
          console.log("📊 Mapped platforms:", platforms);
          console.log("📊 Mapped team:", team);
          console.log("📊 Mapped testimonials:", testimonials);
          
          setContent({
            hero: response.data.hero || null,
            info: response.data.info || null,
            platforms: platforms,
            team: team,
            testimonials: testimonials,
            footer: response.data.footer || null
          });
          
          console.log("✅ Content loaded successfully");
          console.log("📊 Platforms count:", platforms.length);
          console.log("📊 Team count:", team.length);
          console.log("📊 Testimonials count:", testimonials.length);
        } else {
          console.error("❌ Failed to load content:", response.error);
          setError(response.error || 'Failed to load content');
        }
      } catch (err) {
        console.error('❌ Error fetching homepage content:', err);
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
        <span style={styles.errorIcon}>⚠️</span>
        <h3 style={styles.errorTitle}>Failed to Load Content</h3>
        <p style={styles.errorText}>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={styles.retryButton}
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <main>
      <style>{`
        /* ── IMPORT PLAYFAIR DISPLAY ── */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');

        /* ── 3D HEADING SYSTEM ── */
        .title-3d {
          display: block;
          font-family: 'Playfair Display', Georgia, serif !important;
          font-weight: 700;
          color: #1f3540;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
          position: relative;
          text-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.05),
            0 8px 16px rgba(80, 155, 158, 0.08),
            0 12px 32px rgba(0, 0, 0, 0.04);
          transform: translateY(-4px);
          background: linear-gradient(180deg, #1f3540 30%, #3a5a6b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 4px 8px rgba(31, 53, 64, 0.15));
        }

        .title-section {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          line-height: 1.2;
        }

        .title-sub {
          font-size: clamp(1.4rem, 2vw, 1.8rem);
          line-height: 1.3;
        }

        .title-small {
          font-size: clamp(1.1rem, 1.5vw, 1.3rem);
          line-height: 1.4;
        }

        .eyebrow-3d {
          display: inline-block;
          font-family: 'Playfair Display', Georgia, serif !important;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--teal, #509b9e);
          background: rgba(80, 155, 158, 0.1);
          padding: 6px 16px;
          border-radius: 20px;
          margin-bottom: 16px;
          border: 1px solid rgba(80, 155, 158, 0.15);
        }

        .section-header-center {
          text-align: center;
          margin-bottom: 56px;
          max-width: 640px;
          margin-left: auto;
          margin-right: auto;
        }

        .section-description {
          font-size: 1.05rem;
          color: #5B6670;
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.6;
          margin-top: 16px;
        }
      `}</style>

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
    padding: '40px 20px',
    textAlign: 'center'
  },
  errorIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    display: 'block'
  },
  errorTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#1f3540',
    margin: '0 0 8px 0'
  },
  errorText: {
    color: '#d96b43',
    fontSize: '16px',
    marginBottom: '24px',
    maxWidth: '500px'
  },
  retryButton: {
    padding: '14px 40px',
    backgroundColor: '#509b9e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.2s',
    boxShadow: '0 4px 15px rgba(80, 155, 158, 0.3)',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(80, 155, 158, 0.4)'
    }
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