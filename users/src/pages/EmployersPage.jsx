// users/src/pages/EmployersPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { publicApi } from '../services/api';
import { 
  OrganizationSchema, 
  BreadcrumbSchema, 
  ServiceSchema 
} from "../components/Schema";
import { SEO_CONFIG } from "../config/seo.config";
import Footer from '../components/Footer';

function StarRow({ color }) {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className="fas fa-star" style={{ color, fontSize: 13 }} aria-hidden="true"></i>
      ))}
    </div>
  );
}

/* ── EMPLOYER NETWORK CANVAS ── */
function EmployerNetworkCanvas() {
  return (
   <div className="pillar-canvas-container">
      <div className="glow-sphere teal-glow"></div>
      <div className="glow-sphere orange-glow"></div>

      <div className="pillar-stage-card">
        

        <div className="center-metallic-core">
          <div className="core-pulse-ring"></div>
          <div className="core-brand-tag">
            <span className="core-number">07</span>
            <span className="core-label">Process Steps</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const ForEmployersPage = () => {
  const [employersData, setEmployersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);

  // Fetch employers data directly from API
  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        setLoading(true);
        const response = await publicApi.getEmployers();
        
        if (response.success && response.data) {
          setEmployersData(response.data);
          setError(null);
        } else {
          setError(response.error || 'Failed to load employers content');
        }
      } catch (err) {
        console.error('Error fetching employers:', err);
        setError(err.message || 'Error loading employers content');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  // Default process steps (fallback)
  const defaultProcessSteps = [
    {
      number: '01',
      title: 'Client Consultation',
      text: 'We start by diving deep into your business goals, culture, and hiring requirements to align our recruitment strategy with your vision.',
      accent: 'var(--teal)',
    },
    {
      number: '02',
      title: 'Position Profile Development',
      text: 'We collaborate with you to create a compelling position profile outlining responsibilities, qualifications, and ideal candidate traits.',
      accent: 'var(--orange)',
    },
    {
      number: '03',
      title: 'Targeted Search Strategy',
      text: 'Using our extensive network and modern sourcing tools, we identify professionals who match your business needs and culture.',
      accent: 'var(--yellow)',
    },
    {
      number: '04',
      title: 'Candidate Screening & Assessment',
      text: 'We conduct interviews, skills assessments, and background checks to ensure only the highest-quality candidates are shortlisted.',
      accent: 'var(--navy)',
    },
    {
      number: '05',
      title: 'Presentation of Shortlist',
      text: 'Receive a curated shortlist of candidates complete with detailed profiles and recommendations.',
      accent: 'var(--teal)',
    },
    {
      number: '06',
      title: 'Final Candidate Selection',
      text: 'We guide you through final interviews and hiring decisions with strategic insights and support.',
      accent: 'var(--orange)',
    },
    {
      number: '07',
      title: 'Post-Placement Support',
      text: 'Our partnership continues after placement with ongoing support to ensure long-term success and smooth onboarding.',
      accent: 'var(--yellow)',
    },
  ];

  const defaultVerificationItems = [
    { title: 'Employment verification', icon: 'fa-briefcase' },
    { title: 'Biometric criminal checks', icon: 'fa-fingerprint' },
    { title: 'ID, work permits & driver\'s license', icon: 'fa-id-card' },
    { title: 'Education qualifications', icon: 'fa-graduation-cap' },
    { title: 'Employment references', icon: 'fa-history' },
    { title: 'Interview assistance', icon: 'fa-users' },
  ];

  const defaultTestimonials = [
    {
      quote: 'InspHired completely transformed our hiring process. Their team consistently delivers exceptional candidates aligned with our company culture.',
      name: 'Global Logistics Group',
      accent: 'var(--teal)',
    },
    {
      quote: 'The professionalism, speed, and verification standards were outstanding. We found top-tier talent faster than ever before.',
      name: 'Fintech Africa',
      accent: 'var(--orange)',
    },
    {
      quote: 'From consultation to onboarding support, the entire recruitment journey felt seamless and highly strategic.',
      name: 'Healthcare Solutions SA',
      accent: 'var(--yellow)',
    },
  ];

  // Use data from API or fallback to defaults
  const data = employersData || {};
  const hero = data.hero || {};
  const quote = data.quote || {};
  const finalCta = data.finalCta || {};

  const processSteps = data.processSteps && data.processSteps.length > 0
    ? data.processSteps.map((item, index) => ({
        number: item.step_number || `0${index + 1}`,
        title: item.title || defaultProcessSteps[index]?.title || '',
        text: item.description || defaultProcessSteps[index]?.text || '',
        accent: item.accent_color || defaultProcessSteps[index]?.accent || 'var(--teal)',
      }))
    : defaultProcessSteps;

  const verificationItems = data.verification && data.verification.length > 0
    ? data.verification.map(item => ({
        title: item.title || '',
        icon: item.icon_class || 'fa-check',
      }))
    : defaultVerificationItems;

  const testimonials = data.testimonials && data.testimonials.length > 0
    ? data.testimonials.map(item => ({
        quote: item.quote || '',
        name: item.client_name || '',
        accent: item.accent_color || 'var(--teal)',
      }))
    : defaultTestimonials;

  // ============ SEO VARIABLES ============
  const companyName = SEO_CONFIG.companyName;
  const siteUrl = SEO_CONFIG.siteUrl;
  const pageTitle = "For Employers | " + companyName;
  const pageDescription = "Strategic recruitment solutions for modern African businesses. Find top-tier talent with our comprehensive hiring and verification services.";
  const pageKeywords = "employers, recruitment, hiring, talent acquisition, candidate verification, South Africa, business hiring";
  const pageUrl = siteUrl + "/employers";
  const ogImage = siteUrl + "/og-image-employers.jpg";

  // Service schema data
  const serviceData = {
    name: "Employer Recruitment Services",
    description: "Comprehensive recruitment and talent acquisition services for businesses across Africa.",
    serviceType: "Recruitment Services",
    areaServed: "ZA"
  };

  // Show loading state
  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading... | {companyName}</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading employers content...</p>
        </div>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <Helmet>
          <title>Error | {companyName}</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div style={styles.errorContainer}>
          <div style={styles.errorIcon}>⚠️</div>
          <h3 style={styles.errorTitle}>Failed to Load Employers Page</h3>
          <p style={styles.errorText}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={styles.retryButton}
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* ============ SEO HELMET ============ */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={companyName} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={companyName} />
        <meta property="og:locale" content="en_ZA" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#509b9e" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* JSON-LD Structured Data - Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": serviceData.name,
            "description": serviceData.description,
            "provider": {
              "@type": "Organization",
              "name": companyName,
              "url": siteUrl
            },
            "serviceType": serviceData.serviceType,
            "areaServed": {
              "@type": "Country",
              "name": serviceData.areaServed
            },
            "url": pageUrl,
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>

        {/* Process Steps Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "InspHired Recruitment Process",
            "description": "A proven 7-step recruitment framework for hiring success.",
            "step": processSteps.map((step, index) => ({
              "@type": "HowToStep",
              "position": index + 1,
              "name": step.title,
              "text": step.text
            }))
          })}
        </script>
      </Helmet>

      {/* ============ SCHEMA COMPONENTS ============ */}
      <OrganizationSchema />
      <BreadcrumbSchema 
        items={[
          { name: 'Home', url: siteUrl }, 
          { name: 'For Employers', url: pageUrl }
        ]} 
      />
      <ServiceSchema {...serviceData} />

      {/* ============ MAIN CONTENT ============ */}
      <div style={styles.pageWrapper}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');

          /* Accessibility */
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
          }

          a:focus-visible,
          button:focus-visible {
            outline: 2px solid #509b9e;
            outline-offset: 2px;
          }

          /* ── UNIFIED HERO STYLE (Matches About Page) ── */
          .hero-section {
            background: linear-gradient(145deg, #1a2e38 0%, #0f1e26 100%);
            color: #ffffff;
            padding: 130px 0 100px;
            position: relative;
            overflow: hidden;
            border-bottom: 4px solid rgba(80, 155, 158, 0.3);
          }

          /* ── HERO EYEBROW - Clean, No Effects ── */
          .hero-eyebrow {
            display: inline-block;
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--teal, #509b9e);
            background: rgba(80, 155, 158, 0.15);
            padding: 6px 16px;
            border-radius: 20px;
            margin-bottom: 20px;
            border: 1px solid rgba(80, 155, 158, 0.15);
          }

          /* ── HERO HEADING - Pure White, No Effects ── */
          .hero-heading {
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: clamp(2.2rem, 4vw, 3rem);
            font-weight: 700;
            color: #ffffff;
            line-height: 1.2;
            letter-spacing: -0.02em;
            margin: 0 0 20px 0;
          }

          /* ── HERO DESCRIPTION - Clean, No Effects ── */
          .hero-description {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.75);
            line-height: 1.75;
            max-width: 560px;
            margin-bottom: 24px;
          }

          /* ── 3D HEADING SYSTEM (For body content only) ── */
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

          /* ── BODY EYEBROW ── */
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

          /* ── FINAL CTA HEADING - White, No Effects ── */
          .final-cta-heading {
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: clamp(1.5rem, 2.5vw, 1.8rem);
            font-weight: 700;
            color: #ffffff;
            line-height: 1.2;
            letter-spacing: -0.02em;
            margin: 0 0 10px 0;
          }

          /* ── 3D METALLIC BUTTONS ── */
          .btn-3d-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 14px 32px;
            font-family: inherit;
            font-size: 0.95rem;
            font-weight: 700;
            text-decoration: none;
            border-radius: 50px;
            cursor: pointer;
            letter-spacing: 0.3px;
            position: relative;
            transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.3s ease;
            transform: translateY(-3px);
            border: none;
            color: #ffffff;
            background: linear-gradient(180deg, #62b1b4 0%, #509b9e 45%, #39797c 100%);
            border: 1px solid #73c8cb;
            box-shadow: 
              inset 0 1px 1px rgba(255, 255, 255, 0.6),
              inset 0 -2px 4px rgba(0, 0, 0, 0.25),
              0 4px 0 #285759,
              0 8px 15px rgba(31, 53, 64, 0.25);
            text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.3);
          }

          .btn-3d-primary:hover {
            background: linear-gradient(180deg, #6bc0c3 0%, #54a5a8 45%, #3d8386 100%);
            transform: translateY(-5px);
            box-shadow: 
              inset 0 1px 1px rgba(255, 255, 255, 0.7),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2),
              0 6px 0 #285759,
              0 12px 20px rgba(80, 155, 158, 0.35);
          }

          .btn-3d-primary:active {
            transform: translateY(1px) !important;
            box-shadow: 
              inset 0 2px 4px rgba(0, 0, 0, 0.3),
              0 0 0 transparent,
              0 3px 6px rgba(0, 0, 0, 0.2) !important;
          }

          .btn-3d-secondary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 14px 32px;
            font-family: inherit;
            font-size: 0.95rem;
            font-weight: 700;
            text-decoration: none;
            border-radius: 50px;
            cursor: pointer;
            letter-spacing: 0.3px;
            position: relative;
            transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.3s ease;
            transform: translateY(-3px);
            border: none;
            color: #ffffff;
            background: transparent;
            border: 1.5px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 4px 0 rgba(255, 255, 255, 0.1);
            text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
          }

          .btn-3d-secondary:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: translateY(-5px);
            box-shadow: 0 6px 0 rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.5);
          }

          .btn-3d-secondary:active {
            transform: translateY(1px) !important;
            box-shadow: 0 2px 0 rgba(255, 255, 255, 0.05) !important;
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeup { animation: fadeInUp 0.6s ease-out forwards; }

          .interactive-card {
            transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition) !important;
          }
          .interactive-card:hover {
            transform: translateY(-6px) !important;
            box-shadow: var(--shadow-md) !important;
          }

          .verify-item { transition: background-color var(--transition), border-color var(--transition) !important; }
          .verify-item:hover {
            background-color: var(--bg) !important;
            border-color: rgba(80, 155, 158, 0.35) !important;
          }

          /* ── PROCESS CARDS ── */
          .process-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease !important;
          }
          .process-card:hover {
            transform: translateY(-6px) !important;
            box-shadow: var(--shadow-md) !important;
          }

          /* ── EMPLOYER NETWORK CANVAS ── */
          .pillar-canvas-container {
            position: relative;
            width: 100%;
            min-height: 440px;
            display: flex;
            align-items: center;
            justify-content: center;
            perspective: 1000px;
          }

          .pillar-stage-card {
            position: relative;
            width: 100%;
            max-width: 460px;
            height: 400px;
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(16px);
            border-radius: 28px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow:
              0 20px 50px rgba(0, 0, 0, 0.4),
              inset 0 1px 1px rgba(255, 255, 255, 0.2);
            transform-style: preserve-3d;
            transform: rotateX(4deg) rotateY(-4deg);
            transition: transform 0.5s ease;
          }
          .pillar-stage-card:hover {
            transform: rotateX(0deg) rotateY(0deg) scale(1.02);
          }

          .glow-sphere {
            position: absolute;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.35;
            pointer-events: none;
          }
          .teal-glow { background: #509b9e; top: -20px; left: -20px; }
          .orange-glow { background: #d96b43; bottom: -20px; right: -20px; }

          .floating-pillar-item {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }
          .float-1 { top: 20px; left: 25px; animation: floatAnim 4s ease-in-out infinite; }
          .float-2 { top: 35px; right: 25px; animation: floatAnim 4.8s ease-in-out infinite 0.8s; }
          .float-3 { bottom: 25px; left: 50%; transform: translateX(-50%); animation: floatAnim 4.2s ease-in-out infinite 1.5s; }

          @keyframes floatAnim {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          .icon-frame {
            width: 86px;
            height: 86px;
            border-radius: 50%;
            box-shadow: 0 10px 25px rgba(0,0,0,0.35);
            overflow: hidden;
            background: #1f3540;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.6rem;
            color: #ffffff;
          }
          .teal-border { border: 2px solid #509b9e; }
          .orange-border { border: 2px solid #d96b43; }
          .yellow-border { border: 2px solid #e4af51; }

          .pillar-badge {
            background: rgba(15, 27, 34, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.72rem;
            color: #ffffff;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            white-space: nowrap;
          }
          .badge-dot { width: 6px; height: 6px; border-radius: 50%; }
          .badge-dot.teal { background: #509b9e; }
          .badge-dot.orange { background: #d96b43; }
          .badge-dot.yellow { background: #e4af51; }

          .center-metallic-core {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 180px;
            height: 180px;
            border-radius: 50%;
            background: radial-gradient(circle, #2a4554 0%, #172831 100%);
            border: 1px solid rgba(255, 255, 255, 0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.6);
          }
          .core-pulse-ring {
            position: absolute;
            inset: -8px;
            border-radius: 50%;
            border: 1px dashed rgba(228, 175, 81, 0.4);
            animation: rotateCore 14s linear infinite;
          }
          @keyframes rotateCore {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .core-brand-tag { text-align: center; display: flex; flex-direction: column; }
          .core-number { font-size: 1.5rem; font-weight: 800; color: #e4af51; }
          .core-label {
            font-size: 0.58rem;
            text-transform: uppercase;
            color: rgba(255,255,255,0.7);
            letter-spacing: 0.5px;
          }

          @media (max-width: 900px) {
            .process-grid { grid-template-columns: 1fr !important; }
            .verify-grid { grid-template-columns: 1fr !important; }
            .final-cta-row { flex-direction: column !important; align-items: stretch !important; }
            .hero-grid { grid-template-columns: 1fr !important; }
            .hero-visual-wrap { margin-top: 30px; }
          }
        `}</style>

        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">For Employers - Strategic Recruitment Solutions</h1>

        {/* ── HERO ── */}
        <header className="hero-section" role="banner">
          <div style={styles.container}>
            <div className="hero-grid" style={styles.heroGrid}>
              <div style={styles.heroContent} className="animate-fadeup">
                <span className="hero-eyebrow">{hero.tag || 'For employers'}</span>
                <h2 className="hero-heading">
                  {hero.title || 'Strategic recruitment solutions for modern African businesses'}
                </h2>
                <p className="hero-description">
                  {hero.description || 'Our comprehensive recruitment services are designed to connect your organisation with top-tier professionals who align with your culture, vision, and long-term business goals.'}
                </p>

                <div style={styles.heroStats}>
                  <div style={styles.heroStat}>
                    <span style={styles.heroStatNumber}>07</span>
                    <span style={styles.heroStatLabel}>Process steps</span>
                  </div>
                  <div style={styles.heroStatDivider}></div>
                  <div style={styles.heroStat}>
                    <span style={styles.heroStatNumber}>06</span>
                    <span style={styles.heroStatLabel}>Verification checks</span>
                  </div>
                  <div style={styles.heroStatDivider}></div>
                  <div style={styles.heroStat}>
                    <span style={styles.heroStatNumber}>
                      <i className="fas fa-map-marker-alt" style={{ fontSize: '1.1rem' }} aria-hidden="true"></i>
                    </span>
                    <span style={styles.heroStatLabel}>South Africa</span>
                  </div>
                </div>

                <div style={{ ...styles.btnRow, marginTop: '36px' }}>
                  <a
                    href={hero.cta_primary_url || 'https://bookings.cloud.microsoft/book/LandrysDiary@insphired.co.za/?ismsaljsauthenabled=true'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-3d-primary"
                  >
                    {hero.cta_primary_text || 'Schedule consultation'}
                  </a>
                  <Link to={hero.cta_secondary_url || '/contact'} className="btn-3d-secondary">
                    {hero.cta_secondary_text || 'Request callback'}
                  </Link>
                </div>
              </div>

              <div className="hero-visual-wrap" style={styles.heroVisualWrap}>
                <EmployerNetworkCanvas />
              </div>
            </div>
          </div>
        </header>

        {/* ── RECRUITMENT PROCESS ── */}
        <section style={styles.sectionWhite} aria-labelledby="process-heading">
          <div style={styles.container}>
            <div style={styles.centerHead}>
              <span className="eyebrow-3d" style={{ marginBottom: '8px' }}>Our recruitment process</span>
              <h2 id="process-heading" className="title-3d title-section">A proven hiring framework built for results</h2>
              <p style={styles.sectionSub}>
                Every step of our recruitment process is intentionally designed to deliver exceptional candidates and long-term hiring success.
              </p>
            </div>

            <div className="process-grid" style={styles.processGrid}>
              {processSteps.map((s) => (
                <div
                  key={s.number}
                  style={{ ...styles.processCard, borderTop: `4px solid ${s.accent}` }}
                  className="process-card"
                  onMouseEnter={() => setHoveredService(s.number)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <span style={{ ...styles.processNumber, color: hoveredService === s.number ? s.accent : 'rgba(31, 53, 64, 0.08)' }}>
                    {s.number}
                  </span>
                  <h3 className="title-3d" style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{s.title}</h3>
                  <p style={styles.processText}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUOTE ── */}
        <section style={styles.quoteSection} aria-labelledby="quote-heading">
          <div style={styles.container}>
            <div style={styles.quoteWrap}>
              <i className="fas fa-quote-left" style={styles.quoteMark} aria-hidden="true"></i>
              <blockquote>
                <p id="quote-heading" style={styles.quoteText}>
                  {quote.quote || 'Hiring is the most important people function you have, and most of us aren\'t as good at it as we think. Refocusing your resources on hiring better will have a higher return than almost any training program you can develop.'}
                </p>
                <p style={styles.quoteAttribution}>{quote.attribution || '— Laszlo Bock'}</p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── VERIFICATION SERVICES ── */}
        <section style={styles.sectionLight} aria-labelledby="verification-heading">
          <div style={styles.container}>
            <div style={styles.centerHead}>
              <span className="eyebrow-3d" style={{ marginBottom: '8px' }}>Verification services</span>
              <h2 id="verification-heading" className="title-3d title-section">Recruitment backed by trusted verification</h2>
              <p style={styles.sectionSub}>
                We ensure every candidate is thoroughly verified to protect your business and strengthen hiring confidence.
              </p>
            </div>

            <div className="verify-grid" style={styles.verifyGrid}>
              {verificationItems.map((item, i) => (
                <div key={item.title || i} style={styles.verifyItem} className="verify-item">
                  <div
                    style={{
                      ...styles.verifyIcon,
                      background: [`var(--teal)`, `var(--orange)`, `var(--yellow)`, `var(--navy)`, `var(--teal)`, `var(--orange)`][i % 6] + '1A',
                      color: [`var(--teal)`, `var(--orange)`, `var(--yellow)`, `var(--navy)`, `var(--teal)`, `var(--orange)`][i % 6],
                    }}
                  >
                    <i className={`fas ${item.icon || 'fa-check'}`} aria-hidden="true"></i>
                  </div>
                  <h4 className="title-3d" style={{ fontSize: '0.98rem', marginBottom: 0 }}>{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section style={styles.sectionWhite} aria-labelledby="testimonials-heading">
          <div style={styles.container}>
            <div style={styles.centerHead}>
              <span className="eyebrow-3d" style={{ marginBottom: '8px' }}>Client testimonials</span>
              <h2 id="testimonials-heading" className="title-3d title-section">Trusted by growing organisations</h2>
              <p style={styles.sectionSub}>
                Discover how InspHired has transformed recruitment experiences for businesses across Africa.
              </p>
            </div>

            <div style={styles.testimonialGrid}>
              {testimonials.map((t, index) => (
                <div key={t.name || index} style={{ ...styles.testimonialCard, borderTop: `4px solid ${t.accent}` }} className="interactive-card">
                  <StarRow color={t.accent} />
                  <blockquote>
                    <p style={styles.testimonialQuote}>"{t.quote}"</p>
                  </blockquote>
                  <p style={styles.testimonialName}>— {t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={styles.finalCta} aria-labelledby="cta-heading">
          <div style={styles.container}>
            <div className="final-cta-row" style={styles.finalCtaRow}>
              <div>
                <h2 id="cta-heading" className="final-cta-heading">
                  {finalCta.title || 'How can we InspHire you today?'}
                </h2>
                <p style={styles.finalCtaText}>
                  {finalCta.description || 'Let\'s discuss your business needs and build a workforce designed for growth.'}
                </p>
              </div>
              <div style={styles.finalCtaBtns}>
                <a
                  href={finalCta.cta_primary_url || 'https://bookings.cloud.microsoft/book/LandrysDiary@insphired.co.za/?ismsaljsauthenabled=true'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d-primary"
                >
                  {finalCta.cta_primary_text || 'Schedule consultation'}
                </a>
                <Link to={finalCta.cta_secondary_url || '/contact'} className="btn-3d-secondary">
                  {finalCta.cta_secondary_text || 'Request callback'}
                </Link>
                <a
                  href={finalCta.cta_tertiary_url || 'https://worx.insphired.jobs/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d-secondary"
                >
                  {finalCta.cta_tertiary_text || 'Worx (temp hiring platform)'}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const styles = {
  pageWrapper: {
    color: 'var(--navy)',
    backgroundColor: 'var(--bg)',
    lineHeight: 1.65,
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 32px',
    width: '100%',
  },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '48px',
    alignItems: 'center',
  },
  heroContent: {
    maxWidth: '620px',
    position: 'relative',
    zIndex: 2,
  },
  heroVisualWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
    flexWrap: 'wrap',
  },
  heroStat: { display: 'flex', flexDirection: 'column', gap: '4px' },
  heroStatNumber: { fontSize: '1.7rem', fontWeight: 700, color: 'var(--yellow)' },
  heroStatLabel: { fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' },
  heroStatDivider: { width: '1px', height: '36px', background: 'rgba(255,255,255,0.15)' },
  btnRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  sectionWhite: { padding: '100px 0', backgroundColor: '#FFFFFF' },
  sectionLight: { padding: '100px 0', backgroundColor: 'var(--bg)' },
  centerHead: {
    textAlign: 'center',
    marginBottom: '56px',
    maxWidth: '640px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  sectionSub: {
    fontSize: '1.05rem',
    color: '#5B6670',
    maxWidth: '640px',
    margin: '0 auto',
    lineHeight: 1.6,
    marginTop: '16px',
  },
  processGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '28px',
  },
  processCard: {
    background: '#FFFFFF',
    borderRadius: 'var(--radius-card)',
    padding: '32px 28px',
    border: '1px solid var(--border-light)',
    boxShadow: 'var(--shadow-sm)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  processNumber: {
    display: 'block',
    fontSize: '2.4rem',
    fontWeight: 700,
    lineHeight: 1,
    marginBottom: '16px',
    transition: 'color var(--transition)',
  },
  processText: {
    fontSize: '0.92rem',
    color: '#5B6670',
    lineHeight: 1.6,
    margin: 0,
  },
  quoteSection: {
    padding: '80px 0',
    backgroundColor: 'var(--navy)',
  },
  quoteWrap: {
    maxWidth: '820px',
    margin: '0 auto',
    textAlign: 'center',
  },
  quoteMark: {
    fontSize: '2rem',
    color: 'rgba(80, 155, 158, 0.5)',
    marginBottom: '20px',
  },
  quoteText: {
    fontSize: '1.3rem',
    lineHeight: 1.6,
    color: '#FFFFFF',
    fontWeight: 500,
    marginBottom: '20px',
  },
  quoteAttribution: {
    fontSize: '0.95rem',
    color: 'var(--yellow)',
    fontWeight: 600,
    margin: 0,
  },
  verifyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
  },
  verifyItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: '#FFFFFF',
    border: '1px solid var(--border-light)',
    borderRadius: '16px',
    padding: '22px',
  },
  verifyIcon: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.05rem',
    flexShrink: 0,
  },
  testimonialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '28px',
  },
  testimonialCard: {
    background: 'var(--bg)',
    borderRadius: 'var(--radius-card)',
    padding: '32px 28px',
    border: '1px solid var(--border-light)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  testimonialQuote: {
    fontSize: '0.98rem',
    color: 'var(--navy)',
    lineHeight: 1.65,
    marginBottom: '18px',
  },
  testimonialName: {
    fontSize: '0.92rem',
    fontWeight: 700,
    color: '#5B6670',
    margin: 0,
  },
  finalCta: {
    padding: '90px 0',
    backgroundColor: 'var(--bg)',
  },
  finalCtaRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '40px',
    background: 'var(--navy)',
    borderRadius: 'var(--radius-card)',
    padding: '48px',
    boxShadow: 'var(--shadow-md)',
  },
  finalCtaText: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.7)',
    margin: 0,
  },
  finalCtaBtns: {
    display: 'flex',
    gap: '14px',
    flexWrap: 'wrap',
    flexShrink: 0,
  },
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
    padding: '40px 20px',
    textAlign: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  errorIcon: { fontSize: '48px', marginBottom: '16px' },
  errorTitle: { fontSize: '22px', fontWeight: 700, color: '#1f3540', margin: '0 0 8px 0' },
  errorText: { color: '#d96b43', fontSize: '16px', marginBottom: '24px' },
  retryButton: {
    padding: '14px 40px',
    backgroundColor: '#509b9e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    boxShadow: '0 4px 15px rgba(80, 155, 158, 0.3)'
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

export default ForEmployersPage;