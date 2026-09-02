// users/src/pages/CareerLabPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import { publicApi } from '../services/api';
import { 
  OrganizationSchema, 
  BreadcrumbSchema, 
  ServiceSchema,
  FAQSchema 
} from "../components/Schema";
import { SEO_CONFIG } from "../config/seo.config";
import CareerQuiz from '../pages/CareerQuiz';
import CareerCoach from '../assets/career-coach.png';

/* ── CAREER GROWTH CANVAS (mirrors About page's avatar canvas) ── */
function CareerGrowthCanvas() {
  return (
    <div className="pillar-canvas-container">
      <div className="glow-sphere teal-glow"></div>
      <div className="glow-sphere orange-glow"></div>

      <div className="pillar-stage-card">
        <div className="floating-pillar-item float-1">
          <div className="icon-frame teal-border">
            <i className="fas fa-file-alt" aria-hidden="true"></i>
          </div>
          <div className="pillar-badge">
            <span className="badge-dot teal"></span> CV Strategy
          </div>
        </div>

        <div className="floating-pillar-item float-2">
          <div className="icon-frame orange-border">
            <i className="fas fa-comments" aria-hidden="true"></i>
          </div>
          <div className="pillar-badge">
            <span className="badge-dot orange"></span> Interview Skills
          </div>
        </div>

        <div className="floating-pillar-item float-3">
          <div className="icon-frame yellow-border">
            <i className="fas fa-chart-line" aria-hidden="true"></i>
          </div>
          <div className="pillar-badge">
            <span className="badge-dot yellow"></span> Job Search Strategy
          </div>
        </div>

        <div className="floating-pillar-item float-4">
          <div className="icon-frame yellow-border">
            <i className="fas fa-chart-line" aria-hidden="true"></i>
          </div>
          <div className="pillar-badge">
            <span className="badge-dot yellow"></span> Personal Branding
          </div>
        </div>

        <div className="center-metallic-core">
          <div className="core-pulse-ring"></div>
          <div className="core-brand-tag">
            <span className="core-number">04</span>
            <span className="core-label">Coaching Modules</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CareerLabPage() {
  const [careerLabData, setCareerLabData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('entry');
  const [hoveredModule, setHoveredModule] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    careerStatus: '',
    industry: '',
    challenge: '',
    consent: false
  });

  // Fetch career lab content from API
  useEffect(() => {
    const fetchCareerLab = async () => {
      try {
        setLoading(true);
        const response = await publicApi.getCareerLab();
        
        if (response.success && response.data) {
          setCareerLabData(response.data);
          setError(null);
        } else {
          setError(response.error || 'Failed to load career lab content');
        }
      } catch (err) {
        console.error('Error fetching career lab:', err);
        setError(err.message || 'Error loading career lab content');
      } finally {
        setLoading(false);
      }
    };

    fetchCareerLab();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  // Use data from API or fallback to defaults
  const data = careerLabData || {};
  const hero = data.hero || {};
  const differentiation = data.differentiation || {};

  // Tracks from backend or fallback
  const defaultEntryTrack = {
    title: "Graduates & early-career professionals",
    description: "Perfect for candidates entering the formal job market for the first time or looking to fast-track their initial corporate visibility breakthrough.",
    bullet_points: [
      "Graduates or early in their careers.",
      "Entering the formal job market for the first time.",
      "Struggling to secure interviews despite applying frequently.",
      "Looking to strengthen their professional profile and personal brand."
    ]
  };

  const defaultMidTrack = {
    title: "Experienced professionals seeking growth",
    description: "Designed for professionals aiming to deliberately re-architect their current alignment, master pivot logistics, or climb higher into senior leadership roles.",
    bullet_points: [
      "Want to position themselves more competitively in the job market.",
      "Need critical guidance navigating career transitions or industry changes.",
      "Are systematically preparing for new executive opportunities or more senior roles.",
      "Want to outline a clear, highly structured long-term career roadmap."
    ]
  };

  // Get tracks from backend
  const tracks = data.tracks || [];
  const entryTrack = tracks.find(t => t.track_id === 'entry') || defaultEntryTrack;
  const midTrack = tracks.find(t => t.track_id === 'mid') || defaultMidTrack;

  // Modules from backend or fallback
  const defaultModules = [
    {
      module_number: '01',
      title: 'Job application strategy',
      items: [
        'Understanding how to read and interpret job specifications.',
        'Tailoring your CV and application structure specifically to each role.',
        'Preparing optimized ATS-friendly CVs to reliably clear automated screening layers.',
        'Structuring highly impactful cover letters and strong supporting documents.'
      ],
      accent_color: 'var(--teal)'
    },
    {
      module_number: '02',
      title: 'Professional communication',
      items: [
        'Mastering secure email and communication etiquette in professional environments.',
        'Live interview dynamics — how to consistently speak with absolute clarity and calm confidence.',
        'Maintaining pristine professional tone and alignment across digital platforms and social media.'
      ],
      accent_color: 'var(--orange)'
    },
    {
      module_number: '03',
      title: 'Workplace readiness',
      items: [
        'Advanced personal time management paradigms and true personal accountability frameworks.',
        'Meeting complex deadlines cleanly and balancing competing work priorities.',
        'Receiving, processing, and executing constructively on difficult professional performance feedback.'
      ],
      accent_color: 'var(--navy)'
    },
    {
      module_number: '04',
      title: 'Career growth & navigation',
      items: [
        'Deep-dive look into interpreting the complete end-to-end employment lifecycle.',
        'Proactively mapping and planning long-term career milestone developments.',
        'Spotting hidden internal opportunities and styling yourself for seamless career progression.'
      ],
      accent_color: 'var(--yellow)'
    },
    {
      module_number: '05',
      title: 'Professional mindset',
      items: [
        'Building corporate workspace resilience, critical emotional IQ, and systemic adaptability.',
        'Polishing reliable everyday behavior protocols, high work ethic, and absolute integrity parameters.',
        'Cultivating a dynamic growth mindset that modern premium employers consistently look out for.'
      ],
      accent_color: 'var(--teal)'
    },
    {
      module_number: '06',
      title: 'Compliance & documentation',
      items: [
        'Clean preparation systems for strict biometric background checks and screening protocols.',
        'Ensuring personal data records, validation files, and identity parameters are audit-compliant.',
        'Understanding precisely what verification elements employers check and why it protects company culture.'
      ],
      accent_color: 'var(--orange)'
    }
  ];

  const modules = data.modules && data.modules.length > 0 
    ? data.modules.map((item, index) => ({
        module_number: item.module_number || `0${index + 1}`,
        title: item.title || defaultModules[index]?.title || '',
        items: item.items || defaultModules[index]?.items || [],
        accent_color: item.accent_color || defaultModules[index]?.accent_color || 'var(--teal)'
      }))
    : defaultModules;

  // Module messages for coach
  const moduleMessages = {};
  modules.forEach((mod, index) => {
    moduleMessages[index + 1] = mod.items && mod.items.length > 0 
      ? `Module ${mod.module_number}: ${mod.title}. Key skills: ${mod.items.slice(0, 2).join(', ')}...`
      : `Module ${mod.module_number}: ${mod.title}. Hover for more details.`;
  });

  // Hero journey steps
  const journeySteps = hero.journey_steps || [
    { label: 'Job searching', icon: 'fa-search' },
    { label: 'Workplace readiness', icon: 'fa-briefcase' },
    { label: 'Long-term career growth', icon: 'fa-seedling' },
  ];

  const [coachMessage, setCoachMessage] = useState(
    moduleMessages[1] || "Hi! Hover over a module and I'll explain it."
  );

  // ============ SEO VARIABLES ============
  const companyName = SEO_CONFIG.companyName;
  const siteUrl = SEO_CONFIG.siteUrl;
  const pageTitle = "Career Lab | " + companyName;
  const pageDescription = "Structured career development & coaching for job seekers. Get expert guidance on CV writing, interview skills, job search strategy, and long-term career growth.";
  const pageKeywords = "career coaching, career development, job search, CV writing, interview skills, professional development, career growth, South Africa";
  const pageUrl = siteUrl + "/career-lab";
  const ogImage = siteUrl + "/og-image-careerlab.jpg";

  // FAQ data for schema
  const faqData = [
    {
      question: "What is Career Lab?",
      answer: "Career Lab is a structured career development and coaching program designed to help job seekers build professional skills, optimize their job search strategy, and accelerate their career growth."
    },
    {
      question: "Who is Career Lab for?",
      answer: "Career Lab is for two distinct groups: entry-level candidates (graduates and early-career professionals) and mid-career professionals seeking growth, career transitions, or senior leadership roles."
    },
    {
      question: "How is Career Lab different from recruitment services?",
      answer: "While our recruitment services are free and focus on matching candidates to active job opportunities, Career Lab is a paid coaching program that builds foundational professional skills, clarifies career direction, and optimizes your professional profile."
    },
    {
      question: "What will I learn in Career Lab?",
      answer: "Career Lab covers six core modules: Job Application Strategy, Professional Communication, Workplace Readiness, Career Growth & Navigation, Professional Mindset, and Compliance & Documentation."
    }
  ];

  // Service schema data
  const serviceData = {
    name: "Career Lab - Career Development Program",
    description: "Structured career coaching and professional development program for job seekers at all levels.",
    serviceType: "Career Coaching",
    price: "0.00",
    priceCurrency: "ZAR"
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
          <p style={styles.loadingText}>Loading Career Lab content...</p>
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
          <h3 style={styles.errorTitle}>Failed to Load Career Lab Page</h3>
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
              "name": "South Africa"
            },
            "url": pageUrl,
            "offers": {
              "@type": "Offer",
              "price": serviceData.price,
              "priceCurrency": serviceData.priceCurrency,
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>

        {/* Course Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Career Lab Career Development Program",
            "description": pageDescription,
            "provider": {
              "@type": "Organization",
              "name": companyName,
              "url": siteUrl
            },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "online",
              "courseWorkload": "PT8H"
            }
          })}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>

      {/* ============ SCHEMA COMPONENTS ============ */}
      <OrganizationSchema />
      <BreadcrumbSchema 
        items={[
          { name: 'Home', url: siteUrl }, 
          { name: 'Career Lab', url: pageUrl }
        ]} 
      />
      <ServiceSchema {...serviceData} />

      {/* ============ MAIN CONTENT ============ */}
      <div style={globalStyles.pageWrapper}>
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
          button:focus-visible,
          input:focus-visible,
          select:focus-visible,
          textarea:focus-visible {
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
            color: #ffffff;
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

          .titleL {
            font-family: 'Playfair Display', Georgia, serif !important;
            font-weight: 700;
            color: white;
          }
            .title-3dd {
            font-family: 'Playfair Display', Georgia, serif !important;
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
            transform: translateY(-4px) !important;
            box-shadow: var(--shadow-md) !important;
          }

          .btn-hover-transition { transition: all var(--transition) !important; }
          .btn-hover-transition:hover { transform: translateY(-2px) !important; opacity: 0.95; }

          .form-input {
            width: 100%;
            padding: 14px 16px;
            border: 1px solid var(--border-light);
            border-radius: 10px;
            font-size: 0.95rem;
            color: var(--navy);
            background-color: var(--bg);
            transition: all var(--transition);
            outline: none;
          }
          .form-input:focus {
            border-color: var(--teal);
            background-color: #FFFFFF;
            box-shadow: 0 0 0 3px rgba(80, 155, 158, 0.15);
          }

          .tab-btn {
            transition: all var(--transition);
          }

          .quiz-option {
            transition: border-color var(--transition), background-color var(--transition), transform var(--transition);
          }
          .quiz-option:hover {
            border-color: var(--teal) !important;
            background-color: #FFFFFF !important;
            transform: translateX(4px);
          }
          .quiz-option:hover i {
            opacity: 1 !important;
          }

          /* ── PILLAR CANVAS CSS ── */
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
          .float-1 { top: 20px; left: 25px; }
          .float-2 { top: 35px; right: 25px; }
          .float-3 { bottom: 20px; left: 25px; }
          .float-4 { bottom: 35px; right: 25px; }

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
            width: 100px;
            height: 100px;
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
            .hero-grid { grid-template-columns: 1fr !important; }
            .hero-visual-wrap { margin-top: 30px; }
            .curriculum-grid { grid-template-columns: 1fr !important; }
            .diff-grid { grid-template-columns: 1fr !important; }
            .form-split-grid { grid-template-columns: 1fr !important; }
            .journey-path { flex-wrap: wrap; justify-content: center; }
          }

          @media (max-width: 640px) {
            .moduleGrid { grid-template-columns: 1fr !important; }
            .audiencePanel { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">Career Lab - Structured Career Development & Coaching</h1>

        {/* Hero */}
        <header className="hero-section" role="banner">
          <div style={styles.container}>
            <div className="hero-grid" style={styles.heroGrid}>
              <div style={styles.heroContent} className="animate-fadeup">
                <span className="hero-eyebrow">{hero.tag || 'Career Lab'}</span>
                <h2 className="hero-heading">
                  {hero.title || 'Structured career development & coaching for job seekers'}
                </h2>
                <p className="hero-description">
                  {hero.description || 'Many talented professionals struggle not because they lack potential, but because they lack access to practical career guidance. Career Lab changes that — giving you the tools, insight, and professional skills to succeed in today\'s job market.'}
                </p>

                <div style={styles.journeyPath} className="journey-path">
                  {journeySteps.map((step, i) => (
                    <React.Fragment key={step.label || i}>
                      <div style={styles.journeyStep}>
                        <span style={styles.journeyIcon}>
                          <i className={`fas ${step.icon || 'fa-circle'}`} aria-hidden="true"></i>
                        </span>
                        {step.label}
                      </div>
                      {i < journeySteps.length - 1 && (
                        <div style={styles.journeyArrow}>
                          <i className="fas fa-arrow-right" aria-hidden="true"></i>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="hero-visual-wrap" style={styles.heroVisualWrap}>
                <CareerGrowthCanvas />
              </div>
            </div>
          </div>
        </header>

        {/* Career Track Quiz */}
        <section style={{ ...styles.section, backgroundColor: 'var(--bg)' }} aria-labelledby="quiz-heading">
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <span className="eyebrow-3d">Find your track</span>
              <h2 id="quiz-heading" className="title-3d title-section">Which programme is right for you?</h2>
              <p style={styles.sectionSub}>
                Answer 10 quick questions and we'll match you to the track that fits where you are right now.
              </p>
            </div>

            <CareerQuiz />
          </div>
        </section>

        {/* Who it's for */}
        <section style={{ ...styles.section, backgroundColor: '#FFFFFF' }} aria-labelledby="audience-heading">
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <span className="eyebrow-3d">Targeted tracks</span>
              <h2 id="audience-heading" className="title-3d title-section">Who it's for</h2>
              <p style={styles.sectionSub}>Career Lab is tailored to two distinct career stages — choose the path that fits where you are right now.</p>
            </div>

            <div style={styles.tabContainer} role="tablist">
              <button
                onClick={() => setActiveTab('entry')}
                className="tab-btn"
                role="tab"
                aria-selected={activeTab === 'entry'}
                style={{ ...styles.tabButton, ...(activeTab === 'entry' ? styles.tabButtonActive : {}) }}
              >
                Entry-level candidates
              </button>
              <button
                onClick={() => setActiveTab('mid')}
                className="tab-btn"
                role="tab"
                aria-selected={activeTab === 'mid'}
                style={{ ...styles.tabButton, ...(activeTab === 'mid' ? styles.tabButtonActive : {}) }}
              >
                Mid-career professionals
              </button>
            </div>

            <div style={styles.audienceContent}>
              {activeTab === 'entry' ? (
                <div style={styles.audiencePanel} className="animate-fadeup">
                  <div style={styles.audienceTextSide}>
                    <h3 className="title-3d" style={{ fontSize: '1.6rem', marginBottom: '16px' }}>{entryTrack.title}</h3>
                    <p style={styles.audienceDesc}>{entryTrack.description}</p>
                  </div>
                  <div style={styles.audienceGridSide}>
                    <h4 style={styles.listHeader}>Ideal for candidates who are:</h4>
                    <ul style={styles.vList}>
                      {(entryTrack.bullet_points || []).map((point, idx) => (
                        <li key={idx} style={styles.vItem}>
                          <div style={styles.vCheck}><i className="fas fa-check" aria-hidden="true"></i></div> 
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div style={styles.audiencePanel} className="animate-fadeup">
                  <div style={styles.audienceTextSide}>
                    <h3 className="title-3d" style={{ fontSize: '1.6rem', marginBottom: '16px' }}>{midTrack.title}</h3>
                    <p style={styles.audienceDesc}>{midTrack.description}</p>
                  </div>
                  <div style={styles.audienceGridSide}>
                    <h4 style={styles.listHeader}>Designed for professionals who:</h4>
                    <ul style={styles.vList}>
                      {(midTrack.bullet_points || []).map((point, idx) => (
                        <li key={idx} style={styles.vItem}>
                          <div style={styles.vCheck}><i className="fas fa-check" aria-hidden="true"></i></div> 
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section style={{ ...styles.section, backgroundColor: 'var(--bg)' }} aria-labelledby="curriculum-heading">
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <span className="eyebrow-3d">Structured curriculum</span>
              <h2 id="curriculum-heading" className="title-3d title-section">What you'll learn</h2>
              <p style={styles.sectionSub}>
                Six focused modules covering everything from job applications to long-term career navigation.
              </p>
            </div>

            <div style={styles.curriculumLayout} className="curriculum-grid">
              <div style={styles.moduleGrid} className="moduleGrid">
                {modules.map((mod, index) => (
                  <div
                    key={mod.module_number}
                    style={{ ...styles.moduleCard, borderTop: `5px solid ${mod.accent_color || 'var(--teal)'}` }}
                    className="interactive-card"
                    onMouseEnter={() => {
                      setCoachMessage(moduleMessages[index + 1] || `Module ${mod.module_number}: ${mod.title}`);
                      setHoveredModule(mod.module_number);
                    }}
                    onMouseLeave={() => setHoveredModule(null)}
                  >
                    <span
                      style={{
                        ...styles.moduleNumber,
                        color: hoveredModule === mod.module_number ? mod.accent_color : 'rgba(31, 53, 64, 0.06)',
                      }}
                    >
                      {mod.module_number}
                    </span>
                    <h3 className="title-3d" style={{ fontSize: '1.25rem', marginBottom: '20px', paddingRight: '40px' }}>{mod.title}</h3>
                    <ul style={styles.cardList}>
                      {(mod.items || []).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div style={styles.avatarPanel}>
                <motion.img
                  src={CareerCoach}
                  alt="Career Coach avatar - hover over modules for coaching tips"
                  style={styles.avatar}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div style={styles.speechBubble} role="status" aria-live="polite">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={coachMessage}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      {coachMessage}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Differentiation */}
        <section style={styles.diffSection} aria-labelledby="diff-heading">
          <div style={styles.container}>
            <div style={styles.diffGrid}>
              <div style={styles.diffLeft}>
                <span className="eyebrow-3d" style={{ color: 'var(--teal)', borderColor: 'rgba(80,155,158,0.3)' }}>Complementary ecosystems</span>
                <h3 id="diff-heading" className="titleL" style={{ fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '20px' }}>
                  {differentiation.title || 'How Career Lab differs from our recruitment services'}
                </h3>
                <p style={styles.diffDesc}>
                  {differentiation.description || 'Our core recruitment services remain completely free to candidates and are dedicated to finding, processing, and placing talent directly into active enterprise client networks.'}
                </p>
              </div>
              <div style={styles.diffRight}>
                <div style={styles.diffBox}>
                  <h4 style={styles.diffBoxTitle}>{differentiation.free_track_title || 'Free recruitment track'}</h4>
                  <ul style={styles.diffBoxList}>
                    {(differentiation.free_track_items || [
                      'Matching candidates to active partner company opportunities',
                      'Processing and routing your applications',
                      'Facilitating final client interviews and contract placements'
                    ]).map((item, idx) => (
                      <li key={idx}>
                        <i className="fas fa-check-circle" style={{ color: 'var(--teal)', marginRight: '10px' }} aria-hidden="true"></i> 
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ ...styles.diffBox, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}>
                  <h4 style={{ ...styles.diffBoxTitle, color: '#FFFFFF' }}>{differentiation.coaching_title || 'Career Lab coaching'}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                    A separate, highly structured professional enhancement program for candidates who want hands-on guided coaching to maximize baseline employability parameters.
                  </p>
                  <ul style={{ ...styles.diffBoxList, color: 'rgba(255,255,255,0.85)' }}>
                    {(differentiation.coaching_items || [
                      'Build missing professional business skills',
                      'Clarify long-term direction',
                      'Optimize profile conversion tracking'
                    ]).map((item, idx) => (
                      <li key={idx}>
                        <i className="fas fa-chevron-right" style={{ color: 'var(--yellow)', marginRight: '10px', fontSize: '0.8rem' }} aria-hidden="true"></i> 
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration + Assessment CTA */}
        <section id="register-interest" style={{ ...styles.section, backgroundColor: '#FFFFFF' }} aria-labelledby="register-heading">
          <div style={styles.container}>
            <div style={styles.formSplitGrid}>
              <div style={styles.formCard}>
                <span className="eyebrow-3d">Enrollment pathway</span>
                <h3 id="register-heading" className="title-3d" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Register your interest</h3>
                <p style={styles.formSectionSub}>Tell us a bit about yourself and we'll be in touch with full programme details.</p>

                <form onSubmit={handleSubmit} style={styles.actualForm} noValidate>
                  <div style={styles.formRow}>
                    <div>
                      <label style={styles.label} htmlFor="firstName">First name</label>
                      <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="form-input" aria-required="true" />
                    </div>
                    <div>
                      <label style={styles.label} htmlFor="lastName">Last name</label>
                      <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="form-input" aria-required="true" />
                    </div>
                  </div>

                  <div style={styles.formRow}>
                    <div>
                      <label style={styles.label} htmlFor="phone">Phone number</label>
                      <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} className="form-input" aria-required="true" />
                    </div>
                    <div>
                      <label style={styles.label} htmlFor="email">Email address</label>
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="form-input" aria-required="true" />
                    </div>
                  </div>

                  <div style={styles.formRow}>
                    <div>
                      <label style={styles.label} htmlFor="careerStatus">Current career status</label>
                      <select id="careerStatus" name="careerStatus" required value={formData.careerStatus} onChange={handleInputChange} className="form-input" style={{ height: '51px' }} aria-required="true">
                        <option value="">Select status...</option>
                        <option value="Graduate / student">Graduate / student</option>
                        <option value="Employed and looking for growth">Employed and looking for growth</option>
                        <option value="Unemployed and actively job searching">Unemployed and actively job searching</option>
                        <option value="Career transitioning">Career transitioning</option>
                      </select>
                    </div>
                    <div>
                      <label style={styles.label} htmlFor="industry">Target industry</label>
                      <input type="text" id="industry" name="industry" placeholder="e.g. Technology, Healthcare" required value={formData.industry} onChange={handleInputChange} className="form-input" aria-required="true" />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={styles.label} htmlFor="challenge">Biggest career challenge right now</label>
                    <textarea id="challenge" name="challenge" rows="3" required value={formData.challenge} onChange={handleInputChange} className="form-input" placeholder="Describe what hurdles you are currently facing..." aria-required="true"></textarea>
                  </div>

                  <div style={styles.consentRow}>
                    <input type="checkbox" id="consent" name="consent" required checked={formData.consent} onChange={handleInputChange} style={styles.checkbox} aria-required="true" />
                    <label htmlFor="consent" style={styles.consentLabel}>
                      I consent to being contacted by InspHired regarding the Career Lab programme.
                    </label>
                  </div>

                  <button type="submit" style={styles.submitBtn} className="btn-3d-primary">Submit my interest</button>
                </form>
              </div>

              <div style={styles.assessmentCard}>
                <div style={styles.assessmentOverlay}></div>
                <div style={styles.assessmentContent}>
                  <span className="eyebrow-3d" style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}>Diagnostic tool</span>
                  <h3 className="title-3dd" style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '16px' }}>Find out your career readiness score</h3>
                  <p style={styles.assessmentDesc}>
                    Not sure where to start? Take our free career readiness assessment to get a personalised snapshot of where you stand — and what to focus on next to accelerate your career.
                  </p>
                  <a
                    href="https://insphired.jobs/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.assessmentBtn}
                    className="btn-hover-transition"
                  >
                    Take the free assessment <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }} aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const globalStyles = {
  pageWrapper: {
    color: 'var(--navy)',
    backgroundColor: 'var(--bg)',
    lineHeight: 1.6,
  }
};

const styles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 32px',
    width: '100%',
  },
  sectionHeader: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 48px auto',
  },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1.15fr 0.85fr',
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
  journeyPath: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: '14px 24px',
    borderRadius: 'var(--radius-card)',
    border: '1px dashed rgba(255, 255, 255, 0.18)',
    flexWrap: 'wrap',
    gap: '16px'
  },
  journeyStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#FFFFFF',
  },
  journeyIcon: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'var(--teal)',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    flexShrink: 0,
  },
  journeyArrow: {
    fontSize: '0.7rem',
    color: 'var(--yellow)',
    display: 'flex',
    alignItems: 'center'
  },
  section: {
    padding: '100px 0',
  },
  sectionSub: {
    color: '#5B6670',
    maxWidth: '680px',
    margin: '0 auto',
    fontSize: '1.05rem',
    marginTop: '16px',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '48px',
  },
  tabButton: {
    padding: '14px 28px',
    borderRadius: '40px',
    border: '1px solid var(--border-light)',
    backgroundColor: '#FFFFFF',
    color: 'var(--navy)',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  tabButtonActive: {
    backgroundColor: 'var(--navy)',
    color: '#FFFFFF',
    borderColor: 'var(--navy)',
    boxShadow: 'var(--shadow-sm)'
  },
  audienceContent: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  audiencePanel: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '48px',
    backgroundColor: 'var(--bg)',
    padding: '48px',
    borderRadius: 'var(--radius-card)',
    border: '1px solid var(--border-light)',
    alignItems: 'center',
  },
  audienceTextSide: {
    paddingRight: '16px'
  },
  audienceDesc: {
    color: '#5B6670',
    fontSize: '1rem',
    lineHeight: 1.6
  },
  audienceGridSide: {
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-sm)'
  },
  listHeader: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: 'var(--navy)',
    margin: '0 0 20px 0'
  },
  curriculumLayout: {
    display: "grid",
    gridTemplateColumns: "2.2fr 1fr",
    gap: "40px",
    alignItems: "start",
  },
  moduleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },
  avatarPanel: {
    position: "sticky",
    top: "120px",
    textAlign: "center"
  },
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 'var(--radius-card)',
    padding: '22px 20px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--border-light)',
  },
  moduleNumber: {
    fontSize: '2.8rem',
    fontWeight: 700,
    lineHeight: 1,
    color: 'rgba(31, 53, 64, 0.06)',
    position: 'absolute',
    top: '32px',
    right: '36px',
    transition: 'color var(--transition)',
  },
  cardList: {
    paddingLeft: '18px',
    margin: '0',
    color: '#5B6670',
    fontSize: '0.85rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    lineHeight: '1.45'
  },
  diffSection: {
    padding: '100px 0',
    backgroundColor: 'var(--navy)',
    color: '#FFFFFF'
  },
  diffGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '64px',
    alignItems: 'center'
  },
  diffLeft: {
    maxWidth: '480px'
  },
  diffDesc: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '1.05rem',
    lineHeight: 1.65,
    margin: 0
  },
  diffRight: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  diffBox: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '32px'
  },
  diffBoxTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: 'var(--teal)',
    margin: '0 0 16px 0'
  },
  diffBoxList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    fontSize: '0.93rem',
    color: 'rgba(255,255,255,0.85)'
  },
  formSplitGrid: {
    display: 'grid',
    gridTemplateColumns: '1.3fr 1fr',
    gap: '48px',
    alignItems: 'start'
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-card)',
    padding: '48px',
    boxShadow: 'var(--shadow-sm)'
  },
  formSectionSub: {
    color: '#5B6670',
    fontSize: '0.98rem',
    margin: '0 0 36px 0'
  },
  actualForm: {
    display: 'flex',
    flexDirection: 'column'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--navy)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px'
  },
  consentRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '32px'
  },
  checkbox: {
    marginTop: '4px',
    cursor: 'pointer',
    width: '16px',
    height: '16px',
    accentColor: 'var(--teal)'
  },
  consentLabel: {
    fontSize: '0.9rem',
    color: '#5B6670',
    lineHeight: 1.4,
    cursor: 'pointer'
  },
  submitBtn: {
    backgroundColor: 'var(--teal)',
    color: '#FFFFFF',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer',
    alignSelf: 'flex-start'
  },
  assessmentCard: {
    position: 'relative',
    borderRadius: 'var(--radius-card)',
    overflow: 'hidden',
    height: '100%',
    minHeight: '480px',
    backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop')",
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    boxShadow: 'var(--shadow-md)',
    display: 'flex',
    alignItems: 'flex-end'
  },
  assessmentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(31, 53, 64, 0.95) 0%, rgba(31, 53, 64, 0.75) 50%, rgba(31, 53, 64, 0.3) 100%)',
    zIndex: 1
  },
  assessmentContent: {
    position: 'relative',
    zIndex: 2,
    padding: '48px',
    color: '#FFFFFF'
  },
  assessmentDesc: {
    opacity: 0.9,
    fontSize: '0.96rem',
    lineHeight: 1.6,
    marginBottom: '32px'
  },
  assessmentBtn: {
    backgroundColor: '#FFFFFF',
    color: 'var(--navy)',
    padding: '14px 28px',
    borderRadius: '40px',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '0.95rem',
    display: 'inline-flex',
    alignItems: 'center',
    boxShadow: 'var(--shadow-sm)'
  },
  vList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  vItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '14px',
    fontSize: '0.93rem',
    color: '#5B6670',
  },
  vCheck: {
    backgroundColor: 'rgba(80, 155, 158, 0.12)',
    color: 'var(--teal)',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.65rem',
    flexShrink: 0,
    marginTop: '2px',
  },
  avatar: {
    width: "280px",
    borderRadius: "50%",
    boxShadow: "0 25px 60px rgba(0,0,0,.15)"
  },
  speechBubble: {
    marginTop: "25px",
    padding: "20px",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,.12)",
    fontSize: ".95rem",
    lineHeight: 1.6
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

export default CareerLabPage;