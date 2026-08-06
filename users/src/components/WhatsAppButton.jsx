// users/src/components/WhatsAppButton.jsx
import React, { useState, useEffect } from 'react';

const WhatsAppButton = ({ 
  phoneNumber = '27815536670',
  message = 'Hi! I have a question about your services.',
  position = 'bottom-right',
  showBadge = true,
  badgeCount = '1',
  autoExpand = true,
  expandDelay = 1000
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasAutoExpanded, setHasAutoExpanded] = useState(false);

  // Auto-expand on first load
  useEffect(() => {
    if (autoExpand && !hasAutoExpanded) {
      const timer = setTimeout(() => {
        setIsExpanded(true);
        setHasAutoExpanded(true);
      }, expandDelay);
      
      const hideTimer = setTimeout(() => {
        setIsExpanded(false);
      }, expandDelay + 4000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [autoExpand, expandDelay, hasAutoExpanded]);

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  const isLeft = position === 'bottom-left';

  return (
    <>
      <style>{`
        .whatsapp-float {
          position: fixed;
          bottom: 28px;
          ${isLeft ? 'left: 28px;' : 'right: 28px;'}
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: ${isLeft ? 'flex-start' : 'flex-end'};
          gap: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ── TOOLTIP / EXPANDED MESSAGE ── */
        .whatsapp-tooltip {
          background: #ffffff;
          padding: 14px 20px;
          border-radius: 16px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          font-size: 0.9rem;
          color: #1f3540;
          max-width: 260px;
          line-height: 1.5;
          position: relative;
          animation: slideInRight 0.3s ease-out;
          border: 1px solid rgba(80, 155, 158, 0.15);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .whatsapp-tooltip::after {
          content: '';
          position: absolute;
          bottom: -8px;
          ${isLeft ? 'left: 20px;' : 'right: 20px;'}
          width: 16px;
          height: 16px;
          background: #ffffff;
          transform: rotate(45deg);
          border-right: 1px solid rgba(80, 155, 158, 0.15);
          border-bottom: 1px solid rgba(80, 155, 158, 0.15);
        }

        .whatsapp-tooltip .tooltip-title {
          font-weight: 700;
          color: #1f3540;
          margin-bottom: 2px;
          font-size: 0.95rem;
        }

        .whatsapp-tooltip .tooltip-sub {
          color: #5B6670;
          font-size: 0.85rem;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .whatsapp-tooltip.slide-left {
          animation: slideInLeft 0.3s ease-out;
        }

        /* ── 3D METALLIC MAIN BUTTON ── */
        .whatsapp-btn {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
          text-decoration: none;
          
          /* 3D Metallic Effect */
          background: linear-gradient(145deg, #2d8f5e 0%, #25D366 40%, #1aad5a 60%, #128C7E 100%);
          box-shadow: 
            inset 0 2px 4px rgba(255, 255, 255, 0.3),
            inset 0 -4px 8px rgba(0, 0, 0, 0.3),
            0 4px 0 #0d6b5a,
            0 8px 20px rgba(37, 211, 102, 0.35),
            0 12px 40px rgba(0, 0, 0, 0.15);
          transform: translateY(-3px);
          transition: all 0.15s ease;
        }

        .whatsapp-btn::before {
          content: '';
          position: absolute;
          inset: 4px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at 30% 25%,
            rgba(255, 255, 255, 0.25) 0%,
            transparent 60%
          );
          pointer-events: none;
        }

        .whatsapp-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          pointer-events: none;
        }

        .whatsapp-btn:hover {
          background: linear-gradient(145deg, #35a06a 0%, #2ddb6e 40%, #1fb861 60%, #129c8a 100%);
          transform: translateY(-5px);
          box-shadow: 
            inset 0 2px 4px rgba(255, 255, 255, 0.35),
            inset 0 -4px 8px rgba(0, 0, 0, 0.25),
            0 6px 0 #0d6b5a,
            0 12px 28px rgba(37, 211, 102, 0.45),
            0 16px 48px rgba(0, 0, 0, 0.2);
        }

        .whatsapp-btn:active {
          transform: translateY(1px) !important;
          box-shadow: 
            inset 0 2px 6px rgba(0, 0, 0, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.1),
            0 2px 0 #0d6b5a,
            0 8px 20px rgba(37, 211, 102, 0.3) !important;
        }

        .whatsapp-btn svg {
          width: 34px;
          height: 34px;
          fill: #ffffff;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
          position: relative;
          z-index: 2;
        }

        /* ── PULSE RING ── */
        .whatsapp-pulse {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid rgba(37, 211, 102, 0.35);
          animation: pulseRing 2s ease-out infinite;
          pointer-events: none;
        }

        .whatsapp-pulse-delayed {
          animation-delay: 1s;
        }

        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        /* ── 3D BADGE / NOTIFICATION DOT (Bottom-Left) ── */
        .whatsapp-badge {
          position: absolute;
          bottom: -2px;
          left: -2px;
          min-width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(145deg, #ff6b7a 0%, #ff4757 50%, #c0392b 100%);
          border: 2px solid #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.55rem;
          font-weight: 800;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 0 5px;
          z-index: 3;
          
          /* 3D Badge Effect */
          box-shadow: 
            inset 0 1px 2px rgba(255, 255, 255, 0.3),
            inset 0 -2px 4px rgba(0, 0, 0, 0.25),
            0 2px 0 #8a2a2a,
            0 4px 8px rgba(255, 71, 87, 0.3);
          transform: translateY(-2px);
          transition: all 0.15s ease;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .whatsapp-btn:hover .whatsapp-badge {
          transform: translateY(-3px);
          box-shadow: 
            inset 0 1px 2px rgba(255, 255, 255, 0.35),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2),
            0 3px 0 #8a2a2a,
            0 6px 12px rgba(255, 71, 87, 0.4);
        }

        .whatsapp-btn:active .whatsapp-badge {
          transform: translateY(1px) !important;
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.3),
            0 1px 0 #8a2a2a,
            0 4px 8px rgba(255, 71, 87, 0.2) !important;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .whatsapp-float {
            bottom: 20px;
            ${isLeft ? 'left: 16px;' : 'right: 16px;'}
          }

          .whatsapp-btn {
            width: 56px;
            height: 56px;
          }

          .whatsapp-btn svg {
            width: 30px;
            height: 30px;
          }

          .whatsapp-tooltip {
            max-width: 200px;
            padding: 12px 16px;
            font-size: 0.8rem;
          }

          .whatsapp-badge {
            min-width: 18px;
            height: 18px;
            font-size: 0.5rem;
            bottom: -1px;
            left: -1px;
          }
        }

        @media (max-width: 480px) {
          .whatsapp-float {
            bottom: 16px;
            ${isLeft ? 'left: 12px;' : 'right: 12px;'}
          }

          .whatsapp-btn {
            width: 52px;
            height: 52px;
          }

          .whatsapp-btn svg {
            width: 26px;
            height: 26px;
          }

          .whatsapp-tooltip {
            max-width: 180px;
            padding: 10px 14px;
            font-size: 0.75rem;
          }

          .whatsapp-tooltip .tooltip-title {
            font-size: 0.85rem;
          }

          .whatsapp-badge {
            min-width: 16px;
            height: 16px;
            font-size: 0.45rem;
            bottom: -1px;
            left: -1px;
            border-width: 1.5px;
          }
        }
      `}</style>

      <div className="whatsapp-float">
        {/* Tooltip / Expanded Message */}
        {isExpanded && (
          <div 
            className={`whatsapp-tooltip ${isLeft ? 'slide-left' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setTimeout(() => setIsExpanded(false), 300);
            }}
          >
            <div className="tooltip-title">💬 Chat with us</div>
            <div className="tooltip-sub">We're here to help! Click to chat.</div>
          </div>
        )}

        {/* Main WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
          onMouseEnter={() => {
            setIsHovered(true);
            setIsExpanded(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setTimeout(() => setIsExpanded(false), 500);
          }}
          onClick={() => {
            if (window.gtag) {
              window.gtag('event', 'whatsapp_click', {
                event_category: 'engagement',
                event_label: 'WhatsApp Button'
              });
            }
          }}
          aria-label="Chat with us on WhatsApp"
        >
          <span className="whatsapp-pulse"></span>
          <span className="whatsapp-pulse whatsapp-pulse-delayed"></span>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {showBadge && <span className="whatsapp-badge">{badgeCount}</span>}
        </a>
      </div>
    </>
  );
};

export default WhatsAppButton;