// src/components/SubscribeModal.jsx
import React, { useEffect } from 'react';

const SubscribeModal = ({ isOpen, onClose, type }) => {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const title = type === 'newsletter' 
    ? '📧 Subscribe to Newsletter' 
    : '🔔 Get Job Notifications';
  
  const description = type === 'newsletter'
    ? 'Get the latest career tips, company updates, and industry insights delivered to your inbox.'
    : 'Get notified when new job opportunities matching your profile are posted.';

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button style={styles.closeBtn} onClick={onClose}>×</button>
        
        {/* Icon */}
        <div style={styles.iconContainer}>
          <span style={styles.icon}>
            {type === 'newsletter' ? '' : ''}
          </span>
        </div>
        
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.description}>{description}</p>

        {/* ===== KIT.COM FORM ===== */}
        {/* Paste your ENTIRE form code here */}
        <div style={styles.formWrapper}>
          <form 
            action="https://app.kit.com/forms/9789485/subscriptions" 
            className="seva-form formkit-form custom-kit-form" 
            method="post" 
            data-sv-form="9789485" 
            data-uid="f737b97756" 
            data-format="inline" 
            data-version="5" 
            data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
            min-width="400 500 600 700 800"
          >
            <div className="formkit-background" style={{ opacity: 0.2 }}></div>
            <div data-style="minimal">
              <div className="formkit-header" data-element="header" style={{ color: '#4d4d4d', fontSize: '27px', fontWeight: 700 }}>
                <h2>Join the Newsletter</h2>
              </div>
              <div className="formkit-subheader" data-element="subheader" style={{ color: '#686868', fontSize: '18px' }}>
                Subscribe to get our latest content by email.
              </div>
              <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
              <div data-element="fields" data-stacked="false" className="seva-fields formkit-fields">
                <div className="formkit-field">
                  <input 
                    className="formkit-input" 
                    name="email_address" 
                    aria-label="Email Address" 
                    placeholder="Email Address" 
                    required="" 
                    type="email" 
                    style={{ 
                      color: '#000', 
                      borderColor: '#e3e3e3', 
                      borderRadius: '4px', 
                      fontWeight: 400 
                    }}
                  />
                </div>
                <button 
                  data-element="submit" 
                  className="formkit-submit formkit-submit" 
                  style={{ 
                    color: '#ffffff', 
                    backgroundColor: '#509b9e', 
                    borderRadius: '4px', 
                    fontWeight: 400 
                  }}
                >
                  <div className="formkit-spinner"><div></div><div></div><div></div></div>
                  <span className="">Subscribe</span>
                </button>
              </div>
              <div className="formkit-guarantee" data-element="guarantee" style={{ color: '#4d4d4d', fontSize: '13px', fontWeight: 400 }}>
                We won't send you spam. Unsubscribe at any time.
              </div>
              <div className="formkit-powered-by-convertkit-container">
                <a 
                  href="https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic" 
                  data-element="powered-by" 
                  className="formkit-powered-by-convertkit" 
                  data-variant="dark" 
                  target="_blank" 
                  rel="nofollow noopener"
                >
                  Built with Kit
                </a>
              </div>
            </div>
          </form>
        </div>

        {/* Hidden input to add tags based on subscription type */}
        <input type="hidden" name="tags" value={type === 'newsletter' ? 'newsletter' : 'job-notifications'} />
      </div>
    </div>
  );
};

// ===== STYLES =====
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#ffffff',
    padding: '48px',
    borderRadius: '24px',
    maxWidth: '520px',
    width: '90%',
    position: 'relative',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  closeBtn: {
    position: 'absolute',
    top: '16px',
    right: '20px',
    fontSize: '28px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#999',
    transition: 'color 0.2s',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  icon: {
    fontSize: '48px',
    display: 'block',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#1f3540',
    marginBottom: '8px',
    textAlign: 'center',
  },
  description: {
    fontSize: '15px',
    color: '#5B6670',
    marginBottom: '28px',
    lineHeight: 1.6,
    textAlign: 'center',
  },
  formWrapper: {
    marginBottom: '12px',
  },
};

// ===== CUSTOM CSS =====
const customStyles = `
  /* ===== OVERRIDE KIT.COM STYLES ===== */
  
  /* Form Container */
  .custom-kit-form {
    border: none !important;
    max-width: 100% !important;
    padding: 0 !important;
    background: transparent !important;
  }
  
  .custom-kit-form .formkit-background {
    display: none !important;
  }
  
  /* Hide Kit's header since we have our own */
  .custom-kit-form .formkit-header {
    display: none !important;
  }
  
  .custom-kit-form .formkit-subheader {
    display: none !important;
  }
  
  /* Input Field */
  .custom-kit-form .formkit-input {
    width: 100% !important;
    padding: 14px 16px !important;
    border-radius: 12px !important;
    border: 2px solid #e5dfd5 !important;
    font-size: 16px !important;
    font-family: inherit !important;
    background-color: #faf6f0 !important;
    color: #1f3540 !important;
    transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
    margin-bottom: 12px !important;
  }
  
  .custom-kit-form .formkit-input:focus {
    border-color: #509b9e !important;
    box-shadow: 0 0 0 3px rgba(80, 155, 158, 0.15) !important;
    background-color: #ffffff !important;
    outline: none !important;
  }
  
  .custom-kit-form .formkit-input:hover {
    border-color: #3d8386 !important;
  }
  
  /* Submit Button */
  .custom-kit-form .formkit-submit {
    width: 100% !important;
    padding: 16px 32px !important;
    background: linear-gradient(180deg, #62b1b4 0%, #509b9e 45%, #39797c 100%) !important;
    color: #ffffff !important;
    border: 1px solid #73c8cb !important;
    border-radius: 50px !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    font-family: inherit !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
    box-shadow: 0 4px 15px rgba(80, 155, 158, 0.3) !important;
    text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.3) !important;
    margin-bottom: 0 !important;
  }
  
  .custom-kit-form .formkit-submit:hover {
    background: linear-gradient(180deg, #6bc0c3 0%, #54a5a8 45%, #3d8386 100%) !important;
    transform: translateY(-3px) !important;
    box-shadow: 0 8px 25px rgba(80, 155, 158, 0.4) !important;
  }
  
  .custom-kit-form .formkit-submit:active {
    transform: translateY(0px) !important;
    box-shadow: 0 2px 10px rgba(80, 155, 158, 0.2) !important;
  }
  
  .custom-kit-form .formkit-submit > span {
    padding: 0 !important;
    background: transparent !important;
  }
  
  /* Spinner */
  .custom-kit-form .formkit-spinner {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
  }
  
  .custom-kit-form .formkit-spinner > div {
    width: 8px !important;
    height: 8px !important;
    background-color: #ffffff !important;
    border-radius: 50% !important;
    animation: kit-spinner 1.2s ease-in-out infinite !important;
  }
  
  .custom-kit-form .formkit-spinner > div:nth-child(2) {
    animation-delay: 0.2s !important;
  }
  
  .custom-kit-form .formkit-spinner > div:nth-child(3) {
    animation-delay: 0.4s !important;
  }
  
  @keyframes kit-spinner {
    0%, 80%, 100% {
      transform: scale(0);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  /* Fields Layout */
  .custom-kit-form .formkit-fields {
    display: flex !important;
    flex-direction: column !important;
    margin: 0 !important;
    gap: 12px !important;
  }
  
  .custom-kit-form .formkit-field {
    min-width: 100% !important;
    margin: 0 !important;
    flex: 1 0 100% !important;
  }
  
  /* Guarantee Text */
  .custom-kit-form .formkit-guarantee {
    font-size: 13px !important;
    color: #999 !important;
    text-align: center !important;
    margin-top: 16px !important;
    margin-bottom: 0 !important;
  }
  
  /* Powered By - Hide */
  .custom-kit-form .formkit-powered-by-convertkit-container {
    display: none !important;
  }
  
  /* Alert Messages */
  .custom-kit-form .formkit-alert {
    border-radius: 12px !important;
    padding: 12px !important;
    font-size: 14px !important;
    text-align: center !important;
    margin: 0 0 16px 0 !important;
    width: 100% !important;
  }
  
  .custom-kit-form .formkit-alert-success {
    background-color: #ecfdf5 !important;
    border-color: #a7f3d0 !important;
    color: #065f46 !important;
  }
  
  .custom-kit-form .formkit-alert-error {
    background-color: #fef2f2 !important;
    border-color: #fecaca !important;
    color: #d96b43 !important;
  }
  
  /* Responsive */
  @media (max-width: 600px) {
    .custom-kit-form .formkit-input {
      font-size: 14px !important;
      padding: 12px 14px !important;
    }
    .custom-kit-form .formkit-submit {
      font-size: 14px !important;
      padding: 14px 24px !important;
    }
  }
`;

// Inject custom styles
const styleSheet = document.createElement("style");
styleSheet.textContent = customStyles;
document.head.appendChild(styleSheet);

export default SubscribeModal;