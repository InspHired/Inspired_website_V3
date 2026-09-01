// users/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ content = {} }) => {
  const currentYear = new Date().getFullYear();

  const footerContent = content || {};
  
  const companyName = footerContent.company_name || 'InspHired';
  const tagline = footerContent.tagline || 'Combating corporate unemployment structural friction across Africa via custom engineering solutions.';
  const address = footerContent.address || 'Bryanston, Johannesburg';
  const phone = footerContent.phone || '+27 11 463 5540';
  const email = footerContent.email || 'info@insphired.co.za';
  const copyright = footerContent.copyright || `© ${currentYear} ${companyName} - Africa's Recruitment Partner.`;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand - with logo image */}
          <div className="footer-brand">
            <Link to="/" className="footer-brand-logo" aria-label="InspHired Recruitment Solutions Home">
              <div className="footer-logo-image-wrapper">
                <img 
                  src="/assets/logo.png" 
                  alt="InspHired Logo" 
                  className="footer-logo-image"
                />
              </div>
            </Link>
            <p className="footer-description">{tagline}</p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-page">About</Link></li>
              <li><Link to="/blog">Blog</Link></li> {/* ← Added Blog Link */}
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/services">Services</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="footer-links">
            <h4 className="footer-heading">Solutions</h4>
            <ul>
              <li><Link to="/verify-me">VerifyMe</Link></li>
              <li><Link to="/worx">InspHired Worx</Link></li>
              <li><Link to="/connect">InspHired Connect</Link></li>
              <li><Link to="/jobot">Jobot by InspHired</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h4 className="footer-heading">Contact</h4>
            <ul>
              <li>
                <span className="footer-icon"><i className="fas fa-phone" aria-hidden="true"></i></span>
                <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
              </li>
              <li>
                <span className="footer-icon"><i className="fas fa-envelope" aria-hidden="true"></i></span>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <span className="footer-icon"><i className="fas fa-map-marker-alt" aria-hidden="true"></i></span>
                <span>{address}</span>
              </li>
            </ul>
            <div className="footer-social">
              {footerContent.facebook_url && (
                <a href={footerContent.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fab fa-facebook-f" aria-hidden="true"></i>
                </a>
              )}
              {footerContent.twitter_url && (
                <a href={footerContent.twitter_url} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                </a>
              )}
              {footerContent.linkedin_url && (
                <a href={footerContent.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                </a>
              )}
              {footerContent.instagram_url && (
                <a href={footerContent.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{copyright}</span>
          <span>Empowering the African workforce.</span>
        </div>
      </div>

      <style>{`
        .footer {
          background: #1a2e38;
          color: #d9d2c9;
          padding: 40px 40px 20px;
          margin-top: 0;
          border-top: 3px solid rgba(80, 155, 158, 0.15);
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.3fr;
          gap: 32px;
          padding-bottom: 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        /* ── FOOTER BRAND LOGO ── */
        .footer-brand-logo {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          text-decoration: none;
          user-select: none;
          transition: transform 0.2s ease;
          margin-bottom: 12px;
        }

        .footer-brand-logo:hover {
          transform: translateY(-1px);
        }

        .footer-logo-image-wrapper {
          display: flex;
          align-items: center;
          height: 50px;
        }

        .footer-logo-image {
          height: 100%;
          width: auto;
          object-fit: contain;
          /* Display as-is - no filters applied */
        }

        .footer-description {
          font-size: 0.85rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
          max-width: 320px;
          margin: 0;
        }

        .footer-heading {
          font-family: 'Playfair Display', Georgia, serif !important;
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 12px 0;
          letter-spacing: 0.5px;
          position: relative;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 24px;
          height: 2px;
          background: var(--teal, #509b9e);
          border-radius: 2px;
          opacity: 0.4;
        }

        .footer-links ul,
        .footer-contact ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links ul li,
        .footer-contact ul li {
          margin-bottom: 6px;
        }

        .footer-links ul li a,
        .footer-contact ul li a {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.3s ease;
          display: inline-block;
        }

        .footer-links ul li a:hover,
        .footer-contact ul li a:hover {
          color: #ffffff;
        }

        .footer-contact ul li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.85rem;
        }

        .footer-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(80, 155, 158, 0.12);
          color: var(--teal, #509b9e);
          font-size: 0.7rem;
          flex-shrink: 0;
        }

        .footer-social {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }

        .footer-social a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.35);
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.75rem;
        }

        .footer-social a:hover {
          background: var(--teal, #509b9e);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(80, 155, 158, 0.25);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.3);
          flex-wrap: wrap;
          gap: 8px;
        }

        .footer-bottom span:last-child {
          color: rgba(255, 255, 255, 0.2);
          font-style: italic;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
        }

        @media (max-width: 768px) {
          .footer {
            padding: 32px 20px 16px;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }

          .footer-description {
            max-width: 100%;
          }

          .footer-logo-image-wrapper {
            height: 40px;
          }
        }

        @media (max-width: 480px) {
          .footer {
            padding: 24px 16px 14px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            padding-bottom: 20px;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 4px;
            padding-top: 14px;
          }

          .footer-heading {
            font-size: 0.85rem;
          }

          .footer-description,
          .footer-links ul li a,
          .footer-contact ul li {
            font-size: 0.8rem;
          }

          .footer-social {
            justify-content: center;
          }

          .footer-logo-image-wrapper {
            height: 35px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;