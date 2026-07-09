import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CareerLabPage = () => {
  // State to manage the active audience tab/toggle
  const [activeTab, setActiveTab] = useState('entry');

  // Form State
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

  return (
    <div style={globalStyles.pageWrapper}>
      {/* Global CSS for Animations, Hover States, and Form Elements */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeup { animation: fadeInUp 0.6s ease-out forwards; }
        
        .interactive-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease !important;
        }
        .interactive-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 16px 32px -5px rgba(0, 129, 143, 0.12) !important;
        }

        .btn-hover-transition { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important; }
        .btn-hover-transition:hover { transform: translateY(-2px) !important; opacity: 0.95; }
        
        .form-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #334155;
          background-color: #F8FAFC;
          transition: all 0.2s ease;
          outline: none;
        }
        .form-input:focus {
          border-color: #00818F;
          background-color: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(0, 129, 143, 0.1);
        }
      `}</style>

      <Navbar />

      {/* Redesigned Premium Plain Dark Blue Hero Section */}
      <header style={styles.hero}>
        <div style={styles.container}>
          <div style={styles.heroContent} className="animate-fadeup">
            <span style={styles.heroTag}>Career Lab</span>
            <h1 style={styles.heroHeading}>Structured Career Development & Coaching for Job Seekers</h1>
            <p style={styles.heroSubheading}>
              Many talented professionals struggle not because they lack potential, but because they lack access to practical career guidance. Career Lab changes that — giving you the tools, insight, and professional skills to succeed in today's job market.
            </p>
            
            {/* Action Row & Journey Path */}
            <div style={styles.heroActionRow}>
              <div style={styles.journeyPath}>
                <span style={styles.journeyStep}>Job Searching</span>
                <div style={styles.journeyArrow}><i className="fas fa-chevron-right"></i></div>
                <span style={styles.journeyStep}>Workplace Readiness</span>
                <div style={styles.journeyArrow}><i className="fas fa-chevron-right"></i></div>
                <span style={styles.journeyStep}>Long-Term Career Growth</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Section: Who It's For */}
      <section style={{ ...styles.section, backgroundColor: '#FFFFFF' }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>Targeted Tracks</span>
            <h2 style={styles.sectionTitle}>Who It's For</h2>
            <p style={styles.sectionSub}>Career Lab is tailored to two distinct career stages — choose the path that fits where you are right now.</p>
          </div>

          {/* Toggle Tab Row */}
          <div style={styles.tabContainer}>
            <button 
              onClick={() => setActiveTab('entry')} 
              style={{...styles.tabButton, ...(activeTab === 'entry' ? styles.tabButtonActive : {})}}
            >
              Entry-Level Candidates
            </button>
            <button 
              onClick={() => setActiveTab('mid')} 
              style={{...styles.tabButton, ...(activeTab === 'mid' ? styles.tabButtonActive : {})}}
            >
              Mid-Career Professionals
            </button>
          </div>

          {/* Tab Windows */}
          <div style={styles.audienceContent}>
            {activeTab === 'entry' ? (
              <div style={styles.audiencePanel} className="animate-fadeup">
                <div style={styles.audienceTextSide}>
                  <h3 style={styles.audienceTitle}>Graduates & Early-Career Professionals</h3>
                  <p style={styles.audienceDesc}>Perfect for candidates entering the formal job market for the first time or looking to fast-track their initial corporate visibility breakthrough.</p>
                </div>
                <div style={styles.audienceGridSide}>
                  <h4 style={styles.listHeader}>Ideal for candidates who are:</h4>
                  <ul style={styles.vList}>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check"></i></div> <span>Graduates or early in their careers.</span></li>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check"></i></div> <span>Entering the formal job market for the first time.</span></li>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check"></i></div> <span>Struggling to secure interviews despite applying frequently.</span></li>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check"></i></div> <span>Looking to strengthen their professional profile and personal brand.</span></li>
                  </ul>
                </div>
              </div>
            ) : (
              <div style={styles.audiencePanel} className="animate-fadeup">
                <div style={styles.audienceTextSide}>
                  <h3 style={styles.audienceTitle}>Experienced Professionals Seeking Growth</h3>
                  <p style={styles.audienceDesc}>Designed for professionals aiming to deliberately re-architect their current alignment, master pivot logistics, or climb higher into senior leadership roles.</p>
                </div>
                <div style={styles.audienceGridSide}>
                  <h4 style={styles.listHeader}>Designed for professionals who:</h4>
                  <ul style={styles.vList}>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check"></i></div> <span>Want to position themselves more competitively in the job market.</span></li>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check"></i></div> <span>Need critical guidance navigating career transitions or industry changes.</span></li>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check"></i></div> <span>Are systematically preparing for new executive opportunities or more senior roles.</span></li>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check"></i></div> <span>Want to outline a clear, highly structured long-term career roadmap.</span></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section: What the Programme Covers */}
      <section style={{ ...styles.section, backgroundColor: '#F8FAFC' }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={{...styles.sectionTag, color: '#6E1D14'}}>Curriculum Structure</span>
            <h2 style={styles.sectionTitle}>What the Programme Covers</h2>
            <p style={styles.sectionSub}>Career Lab focuses on six core modules built around practical skills employers expect but candidates are rarely taught.</p>
          </div>

          <div style={styles.gridThree}>
            {/* Module 1 */}
            <div style={{ ...styles.moduleCard, borderTop: '5px solid #00818F' }} className="interactive-card">
              <span style={styles.moduleNumber}>01</span>
              <h3 style={styles.cardHeading}>Job Application Strategy</h3>
              <ul style={styles.cardList}>
                <li>Understanding how to read and interpret job specifications.</li>
                <li>Tailoring your CV and application structure specifically to each role.</li>
                <li>Preparing optimized ATS-friendly CVs to reliably clear automated screening layers.</li>
                <li>Structuring highly impactful cover letters and strong supporting documents.</li>
              </ul>
            </div>

            {/* Module 2 */}
            <div style={{ ...styles.moduleCard, borderTop: '5px solid #6E1D14' }} className="interactive-card">
              <span style={styles.moduleNumber}>02</span>
              <h3 style={styles.cardHeading}>Professional Communication</h3>
              <ul style={styles.cardList}>
                <li>Mastering secure email and communication etiquette in professional environments.</li>
                <li>Live interview dynamics — how to consistently speak with absolute clarity and calm confidence.</li>
                <li>Maintaining pristine professional tone and alignment across digital platforms and social media.</li>
              </ul>
            </div>

            {/* Module 3 */}
            <div style={{ ...styles.moduleCard, borderTop: '5px solid #334155' }} className="interactive-card">
              <span style={styles.moduleNumber}>03</span>
              <h3 style={styles.cardHeading}>Workplace Readiness</h3>
              <ul style={styles.cardList}>
                <li>Advanced personal time management paradigms and true personal accountability frameworks.</li>
                <li>Meeting complex deadlines cleanly and balancing competing work priorities.</li>
                <li>Receiving, processing, and executing constructively on difficult professional performance feedback.</li>
              </ul>
            </div>

            {/* Module 4 */}
            <div style={{ ...styles.moduleCard, borderTop: '5px solid #334155' }} className="interactive-card">
              <span style={styles.moduleNumber}>04</span>
              <h3 style={styles.cardHeading}>Career Growth & Navigation</h3>
              <ul style={styles.cardList}>
                <li>Deep-dive look into interpreting the complete end-to-end employment lifecycle.</li>
                <li>Proactively mapping and planning long-term career milestone developments.</li>
                <li>Spotting hidden internal opportunities and styling yourself for seamless career progression.</li>
              </ul>
            </div>

            {/* Module 5 */}
            <div style={{ ...styles.moduleCard, borderTop: '5px solid #00818F' }} className="interactive-card">
              <span style={styles.moduleNumber}>05</span>
              <h3 style={styles.cardHeading}>Professional Mindset</h3>
              <ul style={styles.cardList}>
                <li>Building corporate workspace resilience, critical emotional IQ, and systemic adaptability.</li>
                <li>Polishing reliable everyday behavior protocols, high work ethic, and absolute integrity parameters.</li>
                <li>Cultivating a dynamic growth mindset that modern premium employers consistently look out for.</li>
              </ul>
            </div>

            {/* Module 6 */}
            <div style={{ ...styles.moduleCard, borderTop: '5px solid #6E1D14' }} className="interactive-card">
              <span style={styles.moduleNumber}>06</span>
              <h3 style={styles.cardHeading}>Compliance & Documentation</h3>
              <ul style={styles.cardList}>
                <li>Clean preparation systems for strict biometric background checks and screening protocols.</li>
                <li>Ensuring personal data records, validation files, and identity parameters are audit-compliant.</li>
                <li>Understanding precisely what verification elements employers check and why it protects company culture.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Differentiation Banner */}
      <section style={styles.diffSection}>
        <div style={styles.container}>
          <div style={styles.diffGrid}>
            <div style={styles.diffLeft}>
              <span style={styles.diffTag}>Complementary Ecosystems</span>
              <h3 style={styles.diffTitle}>How Career Lab Differs from Our Recruitment Services</h3>
              <p style={styles.diffDesc}>
                Our core recruitment services remain **completely free** to candidates and are dedicated to finding, processing, and placing talent directly into active enterprise client networks.
              </p>
            </div>
            <div style={styles.diffRight}>
              <div style={styles.diffBox}>
                <h4 style={styles.diffBoxTitle}>Free Recruitment Track</h4>
                <ul style={styles.diffBoxList}>
                  <li><i className="fas fa-check-circle" style={{color: '#00818F', marginRight: '10px'}}></i> Matching candidates to active partner company opportunities</li>
                  <li><i className="fas fa-check-circle" style={{color: '#00818F', marginRight: '10px'}}></i> Processing and routing your applications</li>
                  <li><i className="fas fa-check-circle" style={{color: '#00818F', marginRight: '10px'}}></i> Facilitating final client interviews and contract placements</li>
                </ul>
              </div>
              <div style={{...styles.diffBox, backgroundColor: '#1E293B', borderColor: '#334155'}}>
                <h4 style={{...styles.diffBoxTitle, color: '#FFFFFF'}}>Career Lab Coaching</h4>
                <p style={{color: '#94A3B8', fontSize: '0.92rem', margin: '0 0 16px 0', lineHeight: 1.5}}>
                  A separate, highly structured professional enhancement program for candidates who want hands-on guided coaching to maximize baseline employability parameters.
                </p>
                <ul style={{...styles.diffBoxList, color: '#CBD5E1'}}>
                  <li><i className="fas fa-chevron-right" style={{color: '#00818F', marginRight: '10px', fontSize: '0.8rem'}}></i> Build missing professional business skills</li>
                  <li><i className="fas fa-chevron-right" style={{color: '#00818F', marginRight: '10px', fontSize: '0.8rem'}}></i> Clarify long-term direction</li>
                  <li><i className="fas fa-chevron-right" style={{color: '#00818F', marginRight: '10px', fontSize: '0.8rem'}}></i> Optimize profile conversion tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Registration Form & Assessment CTA (Split Grid Layout) */}
      <section style={{ ...styles.section, backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div style={styles.container}>
          <div style={styles.formSplitGrid}>
            
            {/* Left Column: Form Integration */}
            <div style={styles.formCard}>
              <span style={styles.sectionTag}>Enrollment Pathway</span>
              <h3 style={styles.formSectionTitle}>Register Your Interest</h3>
              <p style={styles.formSectionSub}>Tell us a bit about yourself and we'll be in touch with full programme details.</p>
              
              <form onSubmit={handleSubmit} style={styles.actualForm}>
                <div style={styles.formRow}>
                  <div>
                    <label style={styles.label}>First Name</label>
                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="form-input" />
                  </div>
                  <div>
                    <label style={styles.label}>Last Name</label>
                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="form-input" />
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div>
                    <label style={styles.label}>Phone Number</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="form-input" />
                  </div>
                  <div>
                    <label style={styles.label}>Email Address</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="form-input" />
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div>
                    <label style={styles.label}>Current Career Status</label>
                    <select name="careerStatus" required value={formData.careerStatus} onChange={handleInputChange} className="form-input" style={{height: '51px'}}>
                      <option value="">Select Status...</option>
                      <option value="Graduate / student">Graduate / student</option>
                      <option value="Employed and looking for growth">Employed and looking for growth</option>
                      <option value="Unemployed and actively job searching">Unemployed and actively job searching</option>
                      <option value="Career transitioning">Career transitioning</option>
                    </select>
                  </div>
                  <div>
                    <label style={styles.label}>Target Industry</label>
                    <input type="text" name="industry" placeholder="e.g. Technology, Healthcare" required value={formData.industry} onChange={handleInputChange} className="form-input" />
                  </div>
                </div>

                <div style={{marginBottom: '20px'}}>
                  <label style={styles.label}>Biggest Career Challenge Right Now</label>
                  <textarea name="challenge" rows="3" required value={formData.challenge} onChange={handleInputChange} className="form-input" placeholder="Describe what hurdles you are currently facing..."></textarea>
                </div>

                <div style={styles.consentRow}>
                  <input type="checkbox" id="consent" name="consent" required checked={formData.consent} onChange={handleInputChange} style={styles.checkbox} />
                  <label htmlFor="consent" style={styles.consentLabel}>
                    I consent to being contacted by InspHired regarding the Career Lab programme.
                  </label>
                </div>

                <button type="submit" style={styles.submitBtn} className="btn-hover-transition">Submit my interest</button>
              </form>
            </div>

            {/* Right Column: Assessment Lead Capture Card */}
            <div style={styles.assessmentCard}>
              <div style={styles.assessmentOverlay}></div>
              <div style={styles.assessmentContent}>
                <span style={styles.assessmentTag}>Diagnostic Tool</span>
                <h3 style={styles.assessmentTitle}>Find Out Your Career Readiness Score</h3>
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
                  Take the free assessment <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }}></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Layout Styling Configuration Object
const globalStyles = {
  pageWrapper: {
    fontFamily: "'Inter', sans-serif",
    color: '#334155',
    backgroundColor: '#FFFFFF',
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
  hero: {
    position: 'relative',
    padding: '140px 0 110px 0',
    color: '#FFFFFF',
    backgroundColor: '#0B1329', // Solid premium deep corporate navy blue
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '880px',
    position: 'relative',
    zIndex: 2,
  },
  heroTag: {
    fontSize: '0.8rem',
    letterSpacing: '2px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#00818F',
    backgroundColor: 'rgba(0, 129, 143, 0.12)',
    padding: '6px 14px',
    borderRadius: '20px',
    display: 'inline-block',
    marginBottom: '24px'
  },
  heroHeading: {
    fontSize: '3.5rem',
    fontWeight: 800,
    lineHeight: 1.15,
    margin: '0 0 24px 0',
    color: '#FFFFFF',
    letterSpacing: '-1.5px'
  },
  heroSubheading: {
    fontSize: '1.15rem',
    lineHeight: 1.65,
    color: '#94A3B8',
    margin: '0 0 36px 0',
    maxWidth: '780px'
  },
  heroActionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap'
  },
  journeyPath: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: '10px 20px',
    borderRadius: '50px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    flexWrap: 'wrap',
    gap: '12px'
  },
  journeyStep: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#E2E8F0'
  },
  journeyArrow: {
    fontSize: '0.7rem',
    color: '#00818F',
    display: 'flex',
    alignItems: 'center'
  },
  section: {
    padding: '100px 0',
  },
  sectionHeader: {
    marginBottom: '56px',
    textAlign: 'center',
  },
  sectionTag: {
    color: '#00818F',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: '2px',
    display: 'block',
    marginBottom: '10px',
  },
  sectionTitle: {
    fontSize: '2.4rem',
    fontWeight: 800,
    marginBottom: '16px',
    color: '#1E2223',
    letterSpacing: '-0.5px'
  },
  sectionSub: {
    color: '#64748B',
    maxWidth: '680px',
    margin: '0 auto',
    fontSize: '1.05rem',
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
    border: '1px solid #E2E8F0',
    backgroundColor: '#FFFFFF',
    color: '#64748B',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  tabButtonActive: {
    backgroundColor: '#1E2223',
    color: '#FFFFFF',
    borderColor: '#1E2223',
    boxShadow: '0 10px 20px -5px rgba(30, 34, 35, 0.2)'
  },
  audienceContent: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  audiencePanel: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '48px',
    backgroundColor: '#F8FAFC',
    padding: '48px',
    borderRadius: '24px',
    border: '1px solid #E2E8F0',
    alignItems: 'center',
  },
  audienceTextSide: {
    paddingRight: '16px'
  },
  audienceTitle: {
    fontSize: '1.6rem',
    fontWeight: 800,
    color: '#1E2223',
    marginBottom: '16px',
    lineHeight: 1.3
  },
  audienceDesc: {
    color: '#475569',
    fontSize: '1rem',
    lineHeight: 1.6
  },
  audienceGridSide: {
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
  },
  listHeader: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: '#1E2223',
    margin: '0 0 20px 0'
  },
  gridThree: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '32px',
  },
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '40px 36px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.02)',
    border: '1px solid #E2E8F0',
  },
  moduleNumber: {
    fontSize: '2.8rem',
    fontWeight: 800,
    lineHeight: 1,
    color: 'rgba(15, 17, 18, 0.06)',
    position: 'absolute',
    top: '32px',
    right: '36px'
  },
  cardHeading: {
    fontSize: '1.25rem',
    fontWeight: 700,
    marginBottom: '20px',
    color: '#1E2223',
    paddingRight: '40px'
  },
  cardList: {
    paddingLeft: '20px',
    margin: 0,
    color: '#475569',
    fontSize: '0.93rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    lineHeight: 1.5
  },
  diffSection: {
    padding: '100px 0',
    backgroundColor: '#0F1112',
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
  diffTag: {
    fontSize: '0.8rem',
    letterSpacing: '2px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#00818F',
    marginBottom: '16px',
    display: 'block'
  },
  diffTitle: {
    fontSize: '2.2rem',
    fontWeight: 800,
    lineHeight: 1.25,
    margin: '0 0 20px 0',
    letterSpacing: '-0.5px'
  },
  diffDesc: {
    color: '#94A3B8',
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
    backgroundColor: '#1E2223',
    border: '1px solid #2A3032',
    borderRadius: '16px',
    padding: '32px'
  },
  diffBoxTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: '#00818F',
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
    color: '#E2E8F0'
  },
  formSplitGrid: {
    display: 'grid',
    gridTemplateColumns: '1.3fr 1fr',
    gap: '48px',
    alignItems: 'start'
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '24px',
    padding: '48px',
    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.03)'
  },
  formSectionTitle: {
    fontSize: '1.8rem',
    fontWeight: 800,
    color: '#1E2223',
    margin: '0 0 8px 0'
  },
  formSectionSub: {
    color: '#64748B',
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
    color: '#475569',
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
    accentColor: '#00818F'
  },
  consentLabel: {
    fontSize: '0.9rem',
    color: '#475569',
    lineHeight: 1.4,
    cursor: 'pointer'
  },
  submitBtn: {
    backgroundColor: '#1E2223',
    color: '#FFFFFF',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer',
    alignSelf: 'flex-start'
  },
  assessmentCard: {
    position: 'relative',
    borderRadius: '24px',
    overflow: 'hidden',
    height: '100%',
    minHeight: '480px',
    backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop')",
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
    display: 'flex',
    alignItems: 'flex-end'
  },
  assessmentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(110, 29, 20, 0.98) 0%, rgba(110, 29, 20, 0.8) 50%, rgba(15, 17, 18, 0.4) 100%)',
    zIndex: 1
  },
  assessmentContent: {
    position: 'relative',
    zIndex: 2,
    padding: '48px',
    color: '#FFFFFF'
  },
  assessmentTag: {
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: '6px 14px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '1px',
    display: 'inline-block',
    marginBottom: '16px'
  },
  assessmentTitle: {
    fontSize: '1.8rem',
    fontWeight: 800,
    lineHeight: 1.3,
    marginBottom: '16px',
    letterSpacing: '-0.5px'
  },
  assessmentDesc: {
    opacity: 0.9,
    fontSize: '0.96rem',
    lineHeight: 1.6,
    marginBottom: '32px'
  },
  assessmentBtn: {
    backgroundColor: '#FFFFFF',
    color: '#6E1D14',
    padding: '14px 28px',
    borderRadius: '40px',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '0.95rem',
    display: 'inline-flex',
    alignItems: 'center',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
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
    color: '#475569',
  },
  vCheck: {
    backgroundColor: 'rgba(0, 129, 143, 0.08)',
    color: '#00818F',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.65rem',
    flexShrink: 0,
    marginTop: '2px',
  }
};

export default CareerLabPage;