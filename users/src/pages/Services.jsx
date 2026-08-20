// users/src/pages/ServicesPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { publicApi } from '../services/api';
import { 
  OrganizationSchema, 
  BreadcrumbSchema, 
  ServiceSchema,
  ProductSchema
} from "../components/Schema";
import { SEO_CONFIG } from "../config/seo.config";
import Footer from '../components/Footer';

// ── SERVICES VISUAL STAGE ──
function ServicePillarsCanvas() {
  return (
    <div className="pillar-canvas-container">
      <div className="glow-sphere teal-glow"></div>
      <div className="glow-sphere orange-glow"></div>

      <div className="pillar-stage-card">
        {/* Top row - 3 items */}
        <div className="pillar-row pillar-row-top">
          <div className="floating-pillar-item">
            <div className="icon-frame teal-border">
              <i className="fas fa-user-tie" aria-hidden="true"></i>
            </div>
            <div className="pillar-badge">
              <span className="badge-dot teal"></span> Executive Search
            </div>
          </div>

          <div className="floating-pillar-item">
            <div className="icon-frame orange-border">
              <i className="fas fa-shield-alt" aria-hidden="true"></i>
            </div>
            <div className="pillar-badge">
              <span className="badge-dot orange"></span> Verification
            </div>
          </div>

          <div className="floating-pillar-item">
            <div className="icon-frame yellow-border">
              <i className="fas fa-users" aria-hidden="true"></i>
            </div>
            <div className="pillar-badge">
              <span className="badge-dot yellow"></span> Bulk Staffing
            </div>
          </div>
        </div>

        {/* Center - 06 Solutions */}
        <div className="center-metallic-core">
          <div className="core-pulse-ring"></div>
          <div className="core-brand-tag">
            <span className="core-number">06</span>
            <span className="core-label">Solutions</span>
          </div>
        </div>

        {/* Bottom row - 3 items */}
        <div className="pillar-row pillar-row-bottom">
          <div className="floating-pillar-item">
            <div className="icon-frame teal-border">
              <i className="fas fa-briefcase" aria-hidden="true"></i>
            </div>
            <div className="pillar-badge">
              <span className="badge-dot teal"></span> RPO
            </div>
          </div>

          <div className="floating-pillar-item">
            <div className="icon-frame orange-border">
              <i className="fas fa-search" aria-hidden="true"></i>
            </div>
            <div className="pillar-badge">
              <span className="badge-dot orange"></span> Headhunting
            </div>
          </div>

          <div className="floating-pillar-item">
            <div className="icon-frame yellow-border">
              <i className="fas fa-clock" aria-hidden="true"></i>
            </div>
            <div className="pillar-badge">
              <span className="badge-dot yellow"></span> Temp Services
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CUSTOM HOOK FOR SCROLL ANIMATIONS ──
const useScrollAnimation = (threshold = 0.15) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            setTimeout(() => {
              element.classList.add('slide-in-visible');
            }, 50);
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, isVisible]);

  return { elementRef, isVisible };
};

// ── ANIMATED SERVICE CARD COMPONENT ──
const AnimatedServiceCard = ({ service, index, hoveredService, setHoveredService }) => {
  const { elementRef } = useScrollAnimation(0.1);
  const delay = 0.2 + (index * 0.25);
  
  return (
    <div
      ref={elementRef}
      className="service-card slide-in-right"
      style={{ 
        ...styles.serviceCard, 
        borderTop: `4px solid ${service.accent}`,
        transitionDelay: `${delay}s`,
        animationDelay: `${delay}s`
      }}
      onMouseEnter={() => setHoveredService(service.number)}
      onMouseLeave={() => setHoveredService(null)}
    >
      <span style={{ 
        ...styles.serviceNumber, 
        color: hoveredService === service.number ? service.accent : 'rgba(31, 53, 64, 0.08)' 
      }}>
        {service.number}
      </span>
      <h3 className="title-3d" style={{ fontSize: '1.15rem', marginBottom: '12px' }}>
        {service.title}
      </h3>
      <p style={styles.serviceText}>{service.text}</p>
    </div>
  );
};

// ── ANIMATED PROCESS STEP COMPONENT ──
const AnimatedProcessStep = ({ step, index, hoveredStep, setHoveredStep }) => {
  const { elementRef } = useScrollAnimation(0.1);
  const delay = 0.2 + (index * 0.2);
  
  return (
    <div
      ref={elementRef}
      className="process-step slide-in-right"
      style={{ 
        ...styles.processStep,
        borderTop: `4px solid ${step.accent || 'var(--teal)'}`,
        transitionDelay: `${delay}s`,
        animationDelay: `${delay}s`
      }}
      onMouseEnter={() => setHoveredStep(step.number)}
      onMouseLeave={() => setHoveredStep(null)}
    >
      <span style={{ 
        ...styles.processNumber, 
        color: hoveredStep === step.number ? step.accent || 'var(--teal)' : 'rgba(255, 255, 255, 0.15)' 
      }}>
        {step.number}
      </span>
      <div style={styles.processStepContent}>
        <h4 className="title-3d-dark" style={{ fontSize: '1.05rem', marginBottom: '8px' }}>
          {step.title}
        </h4>
        <p style={styles.processText}>{step.text}</p>
      </div>
    </div>
  );
};

// ── ANIMATED VERIFICATION ITEM ──
const AnimatedVerificationItem = ({ item, index }) => {
  const { elementRef } = useScrollAnimation(0.1);
  const delay = 0.2 + (index * 0.08);
  const colors = ['var(--teal)', 'var(--orange)', 'var(--yellow)', 'var(--teal)', 'var(--teal)', 'var(--orange)'];
  
  return (
    <div
      ref={elementRef}
      className="verify-item slide-in-right"
      style={{ 
        ...styles.verifyItem,
        transitionDelay: `${delay}s`,
        animationDelay: `${delay}s`
      }}
    >
      <div style={{ 
        ...styles.verifyIcon, 
        background: colors[index % 6] + '1A', 
        color: colors[index % 6] 
      }}>
        <i className={`fas ${item.icon || 'fa-check'}`} aria-hidden="true"></i>
      </div>
      <h4 className="title-3d-dark" style={{ fontSize: '0.98rem', marginBottom: 0 }}>{item.title}</h4>
    </div>
  );
};

// ── ANIMATED TESTIMONIAL COMPONENT ──
const AnimatedTestimonial = ({ testimonial, index }) => {
  const { elementRef } = useScrollAnimation(0.1);
  const delay = 0.2 + (index * 0.15);
  
  return (
    <div
      ref={elementRef}
      className="testimonial-card slide-in-right"
      style={{ 
        ...styles.testimonialCard,
        borderTop: `4px solid ${testimonial.accent || 'var(--teal)'}`,
        transitionDelay: `${delay}s`,
        animationDelay: `${delay}s`
      }}
    >
      <div style={styles.starRow}>
        {Array.from({ length: 5 }).map((_, i) => (
          <i key={i} className="fas fa-star" style={{ color: testimonial.accent || 'var(--teal)', fontSize: 13 }} aria-hidden="true"></i>
        ))}
      </div>
      <p style={styles.testimonialQuote}>"{testimonial.quote}"</p>
      <p style={styles.testimonialName}>{testimonial.name}</p>
    </div>
  );
};

function StarRow({ color }) {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className="fas fa-star" style={{ color, fontSize: 13 }} aria-hidden="true"></i>
      ))}
    </div>
  );
}

const ServicesPage = () => {
  const [servicesData, setServicesData] = useState(null);
  const [employersData, setEmployersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Fetch services and employers data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesResponse, employersResponse] = await Promise.all([
          publicApi.getServices(),
          publicApi.getEmployers()
        ]);
        
        if (servicesResponse.success && servicesResponse.data) {
          setServicesData(servicesResponse.data);
        } else {
          setError(servicesResponse.error || 'Failed to load services');
        }

        if (employersResponse.success && employersResponse.data) {
          setEmployersData(employersResponse.data);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Error loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Default services data (fallback)
  const defaultServices = [
    {
      number: '01',
      title: 'Recruitment Process Outsourcing (RPO)',
      text: 'We take hiring off your plate — managing the entire recruitment process from start to finish, so your team can focus on running the business.',
      accent: 'var(--teal)',
    },
    {
      number: '02',
      title: 'Executive Recruitment',
      text: 'We find and place senior leaders who can genuinely move your business forward, drawing on a deep network built specifically for executive-level hiring.',
      accent: 'var(--orange)',
    },
    {
      number: '03',
      title: 'Specialist Skill Recruitment',
      text: 'For roles that need specific technical expertise — in Engineering, IT, Healthcare, or Finance — we source candidates with the exact credentials the role demands.',
      accent: 'var(--yellow)',
    },
    {
      number: '04',
      title: 'Targeted Headhunting',
      text: "We reach the strongest candidates — the ones not actively job-hunting — and vet them carefully for both skill and cultural fit before they ever reach you.",
      accent: 'var(--navy)',
    },
    {
      number: '05',
      title: 'Bulk & Contract Staffing',
      text: "Scale your workforce quickly for seasonal peaks or big project launches. We handle the payroll and admin, so growth doesn't mean extra overhead.",
      accent: 'var(--teal)',
    },
    {
      number: '06',
      title: 'Efficient Temp Recruitment',
      text: 'Request, track, and manage vetted temporary staff through our staffing app — built for speed, including same-day deployment when you need it.',
      accent: 'var(--orange)',
    },
  ];

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
  const data = servicesData || {};
  const hero = data.hero || {};
  const skillsTraining = data.skillsTraining || {};

  // Employers data
  const employersDataObj = employersData || {};
  const employersQuote = employersDataObj.quote || {};
  const employersFinalCta = employersDataObj.finalCta || {};

  const services = data.offerings && data.offerings.length > 0
    ? data.offerings.map((item, index) => ({
      number: item.service_number || `0${index + 1}`,
      title: item.title || defaultServices[index]?.title || '',
      text: item.description || defaultServices[index]?.text || '',
      accent: item.accent_color || defaultServices[index]?.accent || 'var(--teal)',
    }))
    : defaultServices;

  const processSteps = employersDataObj.processSteps && employersDataObj.processSteps.length > 0
    ? employersDataObj.processSteps.map((item, index) => ({
      number: item.step_number || `0${index + 1}`,
      title: item.title || defaultProcessSteps[index]?.title || '',
      text: item.description || defaultProcessSteps[index]?.text || '',
      accent: item.accent_color || defaultProcessSteps[index]?.accent || 'var(--teal)',
    }))
    : defaultProcessSteps;

  const verificationItems = employersDataObj.verification && employersDataObj.verification.length > 0
    ? employersDataObj.verification.map(item => ({
      title: item.title || '',
      icon: item.icon_class || 'fa-check',
    }))
    : defaultVerificationItems;

  const testimonials = employersDataObj.testimonials && employersDataObj.testimonials.length > 0
    ? employersDataObj.testimonials.map(item => ({
      quote: item.quote || '',
      name: item.client_name || '',
      accent: item.accent_color || 'var(--teal)',
    }))
    : defaultTestimonials;

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  // ============ SEO VARIABLES ============
  const companyName = SEO_CONFIG.companyName;
  const siteUrl = SEO_CONFIG.siteUrl;
  const pageTitle = "Our Services | " + companyName;
  const pageDescription = "Comprehensive recruitment solutions including RPO, executive search, specialist recruitment, headhunting, bulk staffing, and temp services across South Africa.";
  const pageKeywords = "recruitment services, RPO, executive search, headhunting, bulk staffing, temp recruitment, South Africa, hiring solutions";
  const pageUrl = siteUrl + "/services";
  const ogImage = siteUrl + "/og-image-services.jpg";

  // Generate service schemas for each offering
  const serviceSchemas = services.map(service => ({
    name: service.title,
    description: service.text,
    serviceType: "Recruitment Service",
    areaServed: "ZA"
  }));

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
          <p style={styles.loadingText}>Loading services...</p>
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
          <h3 style={styles.errorTitle}>Failed to Load Services</h3>
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
        
        {/* JSON-LD Structured Data - Services */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Recruitment Services",
            "description": pageDescription,
            "provider": {
              "@type": "Organization",
              "name": companyName,
              "url": siteUrl
            },
            "serviceType": "Recruitment and Staffing",
            "areaServed": {
              "@type": "Country",
              "name": "South Africa"
            },
            "url": pageUrl,
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Recruitment Services",
              "itemListElement": services.map((service, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service.title,
                  "description": service.text
                },
                "position": index + 1
              }))
            }
          })}
        </script>

        {/* Verification Services Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Employment Verification & Background Screening",
            "description": "Comprehensive background screening and verification services including criminal checks, ID verification, education authentication, and employment references.",
            "provider": {
              "@type": "Organization",
              "name": companyName
            },
            "serviceType": "Background Screening"
          })}
        </script>
      </Helmet>

      {/* ============ SCHEMA COMPONENTS ============ */}
      <OrganizationSchema />
      <BreadcrumbSchema 
        items={[
          { name: 'Home', url: siteUrl }, 
          { name: 'Services', url: pageUrl }
        ]} 
      />

      {/* Individual service schemas */}
      {serviceSchemas.map((service, index) => (
        <ServiceSchema key={index} {...service} />
      ))}

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
          button:focus-visible,
          input:focus-visible,
          select:focus-visible,
          textarea:focus-visible {
            outline: 2px solid #509b9e;
            outline-offset: 2px;
          }

          /* ── UNIFIED HERO STYLE ── */
          .hero-section {
            background: linear-gradient(145deg, #1a2e38 0%, #0f1e26 100%);
            color: #ffffff;
            padding: 130px 0 100px;
            position: relative;
            overflow: hidden;
            border-bottom: 4px solid rgba(80, 155, 158, 0.3);
          }

          /* ── SUBSCRIBE HEADING ── */
          .subscribe-heading {
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: clamp(1.3rem, 2vw, 1.8rem);
            font-weight: 700;
            color: #ffffff;
            line-height: 1.2;
            letter-spacing: -0.02em;
            margin: 0 0 8px 0;
          }

          /* ── HERO EYEBROW ── */
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

          /* ── HERO HEADING ── */
          .hero-heading {
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: clamp(2.2rem, 4vw, 3rem);
            font-weight: 700;
            color: #ffffff;
            line-height: 1.2;
            letter-spacing: -0.02em;
            margin: 0 0 20px 0;
          }

          /* ── HERO DESCRIPTION ── */
          .hero-description {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.75);
            line-height: 1.75;
            max-width: 560px;
            margin-bottom: 24px;
          }

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

          .title-3d-dark {
            display: block;
            font-family: 'Playfair Display', Georgia, serif !important;
            font-weight: 700;
            margin-bottom: 12px;
            letter-spacing: -0.02em;
            position: relative;
            text-shadow: 
              0 2px 4px rgba(0, 0, 0, 0.3),
              0 8px 16px rgba(0, 0, 0, 0.2),
              0 12px 32px rgba(0, 0, 0, 0.15);
            transform: translateY(-4px);
            background: linear-gradient(180deg, #ffffff 30%, #a8c4cc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
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

          .eyebrow-3d-dark {
            display: inline-block;
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--teal, #509b9e);
            background: rgba(80, 155, 158, 0.2);
            padding: 6px 16px;
            border-radius: 20px;
            margin-bottom: 16px;
            border: 1px solid rgba(80, 155, 158, 0.25);
          }

          /* ── FINAL CTA HEADING ── */
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

          /* ── SLIDE IN FROM RIGHT - SLOWER ANIMATION ── */
          .slide-in-right {
            opacity: 0;
            transform: translateX(80px);
            transition: opacity 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                        transform 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .slide-in-right.slide-in-visible {
            opacity: 1;
            transform: translateX(0);
          }

          /* ── SERVICE CARD STYLES ── */
          .service-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease !important;
            will-change: transform, opacity;
          }
          .service-card:hover {
            transform: translateY(-6px) !important;
            box-shadow: var(--shadow-md) !important;
          }

          .process-step {
            transition: transform 0.3s ease, box-shadow 0.3s ease !important;
            will-change: transform, opacity;
          }
          .process-step:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3) !important;
          }

          .verify-item {
            transition: background-color 0.3s ease, border-color 0.3s ease !important;
            will-change: transform, opacity;
          }
          .verify-item:hover {
            background-color: rgba(255, 255, 255, 0.12) !important;
            border-color: rgba(80, 155, 158, 0.5) !important;
          }

          .testimonial-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease !important;
            will-change: transform, opacity;
          }
          .testimonial-card:hover {
            transform: translateY(-6px) !important;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3) !important;
          }

          /* ── SERVICE PILLARS CANVAS CSS ── */
.pillar-canvas-container {
  position: relative;
  width: 100%;
  min-height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
}

.pillar-stage-card {
  position: relative;
  width: 100%;
  max-width: 520px;
  height: 440px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
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

.pillar-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0 10px;
}

.pillar-row-top {
  margin-bottom: auto;
  padding-top: 10px;
}

.pillar-row-bottom {
  margin-top: auto;
  padding-bottom: 10px;
}

.floating-pillar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.icon-frame {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 0 8px 20px rgba(0,0,0,0.35);
  overflow: hidden;
  background: #1f3540;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0;
}
.icon-frame:hover {
  transform: scale(1.08);
  box-shadow: 0 12px 30px rgba(0,0,0,0.5);
}

.teal-border { border: 2px solid #509b9e; }
.orange-border { border: 2px solid #d96b43; }
.yellow-border { border: 2px solid #e4af51; }

.pillar-badge {
  background: rgba(15, 27, 34, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.62rem;
  color: #ffffff;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  white-space: nowrap;
  transition: transform 0.3s ease;
}
.floating-pillar-item:hover .pillar-badge {
  transform: scale(1.05);
}

.badge-dot { 
  width: 5px; 
  height: 5px; 
  border-radius: 50%; 
  flex-shrink: 0;
}
.badge-dot.teal { background: #509b9e; }
.badge-dot.orange { background: #d96b43; }
.badge-dot.yellow { background: #e4af51; }

.center-metallic-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background: radial-gradient(circle, #2a4554 0%, #172831 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.6);
  z-index: 2;
}
.core-pulse-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px dashed rgba(228, 175, 81, 0.4);
  animation: rotateCore 14s linear infinite;
}
@keyframes rotateCore {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.core-brand-tag { 
  text-align: center; 
  display: flex; 
  flex-direction: column; 
  align-items: center;
  justify-content: center;
}
.core-number { 
  font-size: 1.4rem; 
  font-weight: 800; 
  color: #e4af51; 
  line-height: 1;
}
.core-label {
  font-size: 0.5rem;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  letter-spacing: 0.5px;
  margin-top: 2px;
}

@media (max-width: 768px) {
  .pillar-stage-card {
    max-width: 380px;
    height: 380px;
    padding: 15px;
  }
  .icon-frame {
    width: 55px;
    height: 55px;
    font-size: 1rem;
  }
  .pillar-badge {
    font-size: 0.5rem;
    padding: 3px 7px;
  }
  .center-metallic-core {
    width: 70px;
    height: 70px;
  }
  .core-number { font-size: 1.1rem; }
  .core-label { font-size: 0.4rem; }
  .pillar-row {
    padding: 0 5px;
  }
  .floating-pillar-item {
    gap: 4px;
  }
}

@media (max-width: 480px) {
  .pillar-stage-card {
    max-width: 320px;
    height: 340px;
    padding: 10px;
  }
  .icon-frame {
    width: 45px;
    height: 45px;
    font-size: 0.85rem;
  }
  .pillar-badge {
    font-size: 0.45rem;
    padding: 2px 6px;
  }
  .center-metallic-core {
    width: 60px;
    height: 60px;
  }
  .core-number { font-size: 0.9rem; }
  .core-label { font-size: 0.35rem; }
}

          /* ── SUBSCRIBE BUTTON ── */
          .subscribe-btn {
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

          .subscribe-btn:hover {
            background: linear-gradient(180deg, #6bc0c3 0%, #54a5a8 45%, #3d8386 100%);
            transform: translateY(-5px);
            box-shadow: 
              inset 0 1px 1px rgba(255, 255, 255, 0.7),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2),
              0 6px 0 #285759,
              0 12px 20px rgba(80, 155, 158, 0.35);
          }

          .subscribe-btn:active {
            transform: translateY(1px) !important;
            box-shadow: 
              inset 0 2px 4px rgba(0, 0, 0, 0.3),
              0 0 0 transparent,
              0 3px 6px rgba(0, 0, 0, 0.2) !important;
          }

          .subscribe-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: translateY(0) !important;
          }

          /* ── SUBSCRIBE INPUT ── */
          .subscribe-input {
            padding: 14px 20px;
            border-radius: 40px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            background: rgba(255, 255, 255, 0.06);
            color: #FFFFFF;
            font-size: 0.95rem;
            min-width: 260px;
            outline: none;
            transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
            font-family: inherit;
          }

          .subscribe-input:focus {
            border-color: var(--teal, #509b9e) !important;
            background: rgba(255, 255, 255, 0.1) !important;
            box-shadow: 0 0 0 4px rgba(80, 155, 158, 0.15);
          }

          .subscribe-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
          }

          @media (max-width: 900px) {
            .empower-grid { grid-template-columns: 1fr !important; }
            .hero-grid { grid-template-columns: 1fr !important; }
            .hero-visual-wrap { margin-top: 30px; }
            .subscribe-row { flex-direction: column !important; }
            .subscribe-row input, .subscribe-row button { width: 100% !important; }
            .service-grid { grid-template-columns: 1fr !important; }
            .process-grid { grid-template-columns: 1fr !important; }
            .verify-grid { grid-template-columns: 1fr !important; }
            .testimonial-grid { grid-template-columns: 1fr !important; }
            .final-cta-row { flex-direction: column !important; align-items: stretch !important; }
            
            /* Mobile: slide from bottom with slower animation */
            .slide-in-right {
              transform: translateY(50px) !important;
              transition: opacity 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                          transform 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            }
            .slide-in-right.slide-in-visible {
              transform: translateY(0) !important;
            }
          }
        `}</style>

        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">Our Services - Recruitment Solutions</h1>

        {/* ── HERO ── */}
        <header className="hero-section" role="banner">
          <div style={styles.container}>
            <div className="hero-grid" style={styles.heroGrid}>
              <div style={styles.heroContent} className="animate-fadeup">
                <span className="hero-eyebrow">{hero.tag || 'What we do'}</span>
                <h2 className="hero-heading">
                  {hero.title || 'Our services'}
                </h2>
                <p className="hero-description">
                  {hero.description || 'A full ecosystem of recruitment solutions — from executive search to volume placement, candidate development, and background verification — built to solve every part of the hiring challenge.'}
                </p>

                <div style={styles.heroStats}>
                  <div style={styles.heroStat}>
                    <span style={styles.heroStatNumber}>06</span>
                    <span style={styles.heroStatLabel}>Core solutions</span>
                  </div>
                  <div style={styles.heroStatDivider}></div>
                  <div style={styles.heroStat}>
                    <span style={styles.heroStatNumber}>05</span>
                    <span style={styles.heroStatLabel}>Screening checks</span>
                  </div>
                  <div style={styles.heroStatDivider}></div>
                  <div style={styles.heroStat}>
                    <span style={styles.heroStatNumber}>
                      <i className="fas fa-map-marker-alt" style={{ fontSize: '1.1rem' }} aria-hidden="true"></i>
                    </span>
                    <span style={styles.heroStatLabel}>South Africa</span>
                  </div>
                </div>
              </div>

              <div className="hero-visual-wrap" style={styles.heroVisualWrap}>
                <ServicePillarsCanvas />
              </div>
            </div>
          </div>
        </header>

        {/* ── CORE SOLUTIONS ── */}
        <section style={styles.sectionWhite} aria-labelledby="services-heading">
          <div style={styles.container}>
            <div style={styles.centerHead}>
              <span className="eyebrow-3d" style={{ marginBottom: '8px' }}>Core solutions</span>
              <h2 id="services-heading" className="title-3d title-section">Professional recruitment ecosystems</h2>
              <p style={styles.sectionSub}>
                Streamlined frameworks structured to handle everything from executive search pipelines to volume placement logistics.
              </p>
            </div>

            <div style={styles.serviceGrid}>
              {services.map((s, index) => (
                <AnimatedServiceCard
                  key={s.number}
                  service={s}
                  index={index}
                  hoveredService={hoveredService}
                  setHoveredService={setHoveredService}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── EMPOWERING CANDIDATES ── */}
        <section style={styles.sectionLight} aria-labelledby="training-heading">
          <div style={styles.container}>
            <div className="empower-grid" style={styles.empowerGrid}>
              <div>
                <span className="eyebrow-3d" style={{ marginBottom: '8px' }}>Empowering candidates</span>
                <h2 id="training-heading" className="title-3d title-section">{skillsTraining.title || 'Skills training & development'}</h2>
                <p style={styles.empowerText}>
                  {skillsTraining.description || 'We give candidates the practical skills, confidence, and market knowledge to walk into a new role ready to succeed from day one.'}
                </p>
                <div style={styles.btnRow}>
                  <a
                    href={skillsTraining.cta_primary_url || 'https://calendly.com/recruitment-insphired/book-a-consultation-with-a-client-relationship-manager?month=2026-05'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-3d-primary"
                  >
                    {skillsTraining.cta_primary_text || 'Book consultation'}
                  </a>
                  <a
                    href={skillsTraining.cta_secondary_url || 'https://insphired.jobs/contact-me-form/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-3d-secondary"
                  >
                    {skillsTraining.cta_secondary_text || 'Request call back'}
                  </a>
                </div>
              </div>

              <div style={styles.empowerVisual}>
                <div style={styles.empowerVisualCard}>
                  <div style={styles.empowerIconWrap}>
                    <i className="fas fa-chalkboard-teacher" aria-hidden="true"></i>
                  </div>
                  <p className="title-3d" style={{ fontSize: '1.15rem', marginBottom: '10px' }}>
                    {skillsTraining.visual_title || 'Training that sticks'}
                  </p>
                  <p style={styles.empowerVisualText}>
                    {skillsTraining.visual_description || 'Practical, role-ready skills — not just theory — so candidates walk into day one prepared.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOR EMPLOYERS SECTION ── */}
        <section style={styles.sectionEmployers} aria-labelledby="employers-heading">
          <div style={styles.container}>
            <div style={styles.centerHeadDark}>
              <span className="eyebrow-3d-dark" style={{ marginBottom: '8px' }}>For employers</span>
              <h2 id="employers-heading" className="title-3d-dark title-section">A proven hiring framework built for results</h2>
              <p style={styles.sectionSubDark}>
                Every step of our recruitment process is intentionally designed to deliver exceptional candidates and long-term hiring success.
              </p>
            </div>

            {/* Recruitment Process */}
            <div style={styles.processGrid}>
              {processSteps.map((step, index) => (
                <AnimatedProcessStep 
                  key={step.number} 
                  step={step} 
                  index={index}
                  hoveredStep={hoveredStep}
                  setHoveredStep={setHoveredStep}
                />
              ))}
            </div>

            {/* Quote */}
            <div style={styles.quoteWrapDark}>
              <i className="fas fa-quote-left" style={styles.quoteMarkDark} aria-hidden="true"></i>
              <p style={styles.quoteTextDark}>
                {employersQuote.quote || 'Hiring is the most important people function you have, and most of us aren\'t as good at it as we think. Refocusing your resources on hiring better will have a higher return than almost any training program you can develop.'}
              </p>
              <p style={styles.quoteAttributionDark}>{employersQuote.attribution || '— Laszlo Bock'}</p>
            </div>

            {/* Verification Services */}
            <div style={styles.verifySection}>
              <div style={styles.centerHeadDark}>
                <span className="eyebrow-3d-dark" style={{ marginBottom: '8px' }}>Verification services</span>
                <h2 className="title-3d-dark title-section" style={{ marginBottom: '8px' }}>Recruitment backed by trusted verification</h2>
                <p style={styles.sectionSubDark}>
                  We ensure every candidate is thoroughly verified to protect your business and strengthen hiring confidence.
                </p>
              </div>

              <div style={styles.verifyGrid}>
                {verificationItems.map((item, index) => (
                  <AnimatedVerificationItem key={item.title || index} item={item} index={index} />
                ))}
              </div>
            </div>

            {/* Client Testimonials */}
            <div style={styles.testimonialSection}>
              <div style={styles.centerHeadDark}>
                <span className="eyebrow-3d-dark" style={{ marginBottom: '8px' }}>Client testimonials</span>
                <h2 className="title-3d-dark title-section" style={{ marginBottom: '8px' }}>Trusted by growing organisations</h2>
                <p style={styles.sectionSubDark}>
                  Discover how InspHired has transformed recruitment experiences for businesses across Africa.
                </p>
              </div>

              <div style={styles.testimonialGrid}>
                {testimonials.map((testimonial, index) => (
                  <AnimatedTestimonial key={testimonial.name || index} testimonial={testimonial} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SUBSCRIBE ── */}
        <section style={styles.subscribeSection} aria-labelledby="subscribe-heading">
          <div style={styles.container}>
            <div style={styles.subscribeCard}>
              <div>
                <h3 id="subscribe-heading" className="subscribe-heading">
                  {hero.subscribe_title || 'Need one of these services?'}
                </h3>
                <p style={styles.subscribeText}>
                  {hero.subscribe_text || 'Hey there 👋 Leave your email and our team will reach out to help.'}
                </p>
              </div>

              {subscribed ? (
                <div style={styles.subscribeSuccess}>
                  <i className="fas fa-check-circle" style={{ marginRight: '8px' }} aria-hidden="true"></i>
                  Thanks — we'll be in touch soon!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="subscribe-row" style={styles.subscribeRow}>
                  <label htmlFor="subscribe-email" className="sr-only">Email address</label>
                  <input
                    type="email"
                    id="subscribe-email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="subscribe-input"
                    aria-required="true"
                  />
                  <button type="submit" className="subscribe-btn">
                    Get in touch
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const styles = {
  pageWrapper: { color: 'var(--navy)', backgroundColor: 'var(--bg)', lineHeight: 1.65 },
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 32px', width: '100%' },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '48px',
    alignItems: 'center'
  },
  heroContent: { maxWidth: '620px' },
  heroStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
    flexWrap: 'wrap'
  },
  heroStat: { display: 'flex', flexDirection: 'column', gap: '4px' },
  heroStatNumber: {
    fontSize: '1.7rem',
    fontWeight: 700,
    color: 'var(--yellow)'
  },
  heroStatLabel: {
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  heroStatDivider: {
    width: '1px',
    height: '36px',
    background: 'rgba(255,255,255,0.15)'
  },
  heroVisualWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionWhite: { padding: '100px 0', backgroundColor: '#FFFFFF' },
  sectionLight: { padding: '100px 0', backgroundColor: 'var(--bg)' },
  sectionEmployers: { 
    padding: '100px 0', 
    background: 'linear-gradient(145deg, #1a2e38 0%, #0f1e26 100%)',
  },
  centerHead: {
    textAlign: 'center',
    marginBottom: '56px',
    maxWidth: '640px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  centerHeadDark: {
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
  sectionSubDark: {
    fontSize: '1.05rem',
    color: 'rgba(255, 255, 255, 0.75)',
    maxWidth: '640px',
    margin: '0 auto',
    lineHeight: 1.6,
    marginTop: '16px',
  },
  btnRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  },
  serviceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '28px'
  },
  serviceCard: {
    background: '#FFFFFF',
    borderRadius: 'var(--radius-card)',
    padding: '36px 32px',
    border: '1px solid var(--border-light)',
    boxShadow: 'var(--shadow-sm)',
    position: 'relative',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  serviceNumber: {
    display: 'block',
    fontSize: '2.4rem',
    fontWeight: 700,
    lineHeight: 1,
    marginBottom: '16px',
    transition: 'color var(--transition)'
  },
  serviceText: {
    fontSize: '0.94rem',
    color: '#5B6670',
    lineHeight: 1.65,
    margin: 0
  },
  empowerGrid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '56px',
    alignItems: 'center'
  },
  empowerText: {
    fontSize: '1.05rem',
    color: '#5B6670',
    lineHeight: 1.75,
    marginBottom: '32px',
    maxWidth: '520px'
  },
  empowerVisual: { display: 'flex', justifyContent: 'center' },
  empowerVisualCard: {
    background: '#FFFFFF',
    borderRadius: 'var(--radius-card)',
    border: '1px solid var(--border-light)',
    boxShadow: 'var(--shadow-md)',
    padding: '40px',
    maxWidth: '340px',
    textAlign: 'center'
  },
  empowerIconWrap: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'rgba(80, 155, 158, 0.12)',
    color: 'var(--teal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    margin: '0 auto 20px'
  },
  empowerVisualText: {
    fontSize: '0.92rem',
    color: '#5B6670',
    lineHeight: 1.6,
    margin: 0
  },
  // Employer section styles - updated for dark background
  processGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '28px',
    marginBottom: '60px'
  },
  processStep: {
    display: 'flex',
    gap: '20px',
    background: 'rgba(255, 255, 255, 0.06)',
    borderRadius: '16px',
    padding: '28px 24px',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    alignItems: 'flex-start',
    backdropFilter: 'blur(8px)',
  },
  processNumber: {
    fontSize: '2.4rem',
    fontWeight: 700,
    lineHeight: 1,
    flexShrink: 0,
    minWidth: '50px',
    transition: 'color var(--transition)'
  },
  processStepContent: {
    flex: 1
  },
  processText: {
    fontSize: '0.92rem',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 1.6,
    margin: 0
  },
  quoteWrapDark: {
    maxWidth: '820px',
    margin: '0 auto 60px auto',
    textAlign: 'center',
    padding: '40px 30px',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(8px)',
  },
  quoteMarkDark: {
    fontSize: '2rem',
    color: 'rgba(80, 155, 158, 0.5)',
    marginBottom: '20px',
    display: 'block'
  },
  quoteTextDark: {
    fontSize: '1.3rem',
    lineHeight: 1.6,
    color: '#ffffff',
    fontWeight: 500,
    marginBottom: '20px'
  },
  quoteAttributionDark: {
    fontSize: '0.95rem',
    color: 'var(--teal)',
    fontWeight: 600,
    margin: 0
  },
  verifySection: {
    marginBottom: '60px'
  },
  verifyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px'
  },
  verifyItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '16px',
    padding: '22px',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    backdropFilter: 'blur(8px)',
  },
  verifyIcon: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.05rem',
    flexShrink: 0
  },
  testimonialSection: {
    marginTop: '20px'
  },
  testimonialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '28px'
  },
  testimonialCard: {
    background: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 'var(--radius-card)',
    padding: '32px 28px',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backdropFilter: 'blur(8px)',
  },
  testimonialQuote: {
    fontSize: '0.98rem',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 1.65,
    marginBottom: '18px'
  },
  testimonialName: {
    fontSize: '0.92rem',
    fontWeight: 700,
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0
  },
  starRow: {
    display: 'flex',
    gap: '3px',
    marginBottom: '16px'
  },
  subscribeSection: { padding: '80px 0 100px', backgroundColor: 'var(--bg)' },
  subscribeCard: {
    background: 'linear-gradient(145deg, #1a2e38 0%, #0f1e26 100%)',
    borderRadius: '24px',
    padding: '48px 56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '40px',
    flexWrap: 'wrap',
    boxShadow: '0 16px 48px rgba(31, 53, 64, 0.2)'
  },
  subscribeText: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.7)',
    margin: 0
  },
  subscribeSuccess: {
    color: 'var(--yellow)',
    fontWeight: 600,
    fontSize: '0.95rem'
  },
  subscribeRow: {
    display: 'flex',
    gap: '12px',
    flexShrink: 0,
    flexWrap: 'wrap',
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

export default ServicesPage;