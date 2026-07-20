import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CareerQuiz from '../pages/CareerQuiz';
import CareerCoach from '../assets/career-coach.png';

function CareerLabPage() {
  const [activeTab, setActiveTab] = useState('entry');

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

  const [coachMessage, setCoachMessage] = useState(
    "Hi! Hover over a module and I'll explain it."
);

const moduleMessages = {
  1: "A strong CV isn't enough on its own. I'll show you how recruiters read job adverts and how to tailor every application for better results.",

  2: "Communication can be the deciding factor in an interview. We'll practise professional emails, interviews and workplace etiquette.",

  3: "Employers expect more than technical skills. We'll help you build confidence, accountability and workplace habits that set you apart.",

  4: "Your first role is only the beginning. Let's create a roadmap for long-term career growth and progression.",

  5: "Mindset influences performance. We'll develop resilience, adaptability and the confidence to thrive in professional environments.",

  6: "Many candidates overlook documentation requirements. We'll make sure you're prepared for compliance checks and employer verification."
};

  const journeySteps = [
    { label: 'Job searching', icon: 'fa-search' },
    { label: 'Workplace readiness', icon: 'fa-briefcase' },
    { label: 'Long-term career growth', icon: 'fa-seedling' },
  ];

  return (
    <div style={globalStyles.pageWrapper}>
      <style>{`
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
      `}</style>



      {/* Hero */}
      <header style={styles.hero}>
        <div style={styles.container}>
          <div style={styles.heroContent} className="animate-fadeup">
            <span style={styles.heroTag}>Career Lab</span>
            <h1 style={styles.heroHeading}>Structured career development & coaching for job seekers</h1>
            <p style={styles.heroSubheading}>
              Many talented professionals struggle not because they lack potential, but because they lack access to practical career guidance. Career Lab changes that — giving you the tools, insight, and professional skills to succeed in today's job market.
            </p>

            <div style={styles.journeyPath}>
              {journeySteps.map((step, i) => (
                <React.Fragment key={step.label}>
                  <div style={styles.journeyStep}>
                    <span style={styles.journeyIcon}>
                      <i className={`fas ${step.icon}`} aria-hidden="true"></i>
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
        </div>
      </header>

      {/* Career Track Quiz */}
      <section style={{ ...styles.section, backgroundColor: 'var(--bg)' }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>Find your track</span>
            <h2 style={styles.sectionTitle}>Which programme is right for you?</h2>
            <p style={styles.sectionSub}>
              Answer 10 quick questions and we'll match you to the track that fits where you are right now.
            </p>
          </div>

          <CareerQuiz />
        </div>
      </section>

      {/* Who it's for */}
      <section style={{ ...styles.section, backgroundColor: '#FFFFFF' }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>Targeted tracks</span>
            <h2 style={styles.sectionTitle}>Who it's for</h2>
            <p style={styles.sectionSub}>Career Lab is tailored to two distinct career stages — choose the path that fits where you are right now.</p>
          </div>

          <div style={styles.tabContainer}>
            <button
              onClick={() => setActiveTab('entry')}
              className="tab-btn"
              style={{ ...styles.tabButton, ...(activeTab === 'entry' ? styles.tabButtonActive : {}) }}
            >
              Entry-level candidates
            </button>
            <button
              onClick={() => setActiveTab('mid')}
              className="tab-btn"
              style={{ ...styles.tabButton, ...(activeTab === 'mid' ? styles.tabButtonActive : {}) }}
            >
              Mid-career professionals
            </button>
          </div>

          <div style={styles.audienceContent}>
            {activeTab === 'entry' ? (
              <div style={styles.audiencePanel} className="animate-fadeup">
                <div style={styles.audienceTextSide}>
                  <h3 style={styles.audienceTitle}>Graduates & early-career professionals</h3>
                  <p style={styles.audienceDesc}>Perfect for candidates entering the formal job market for the first time or looking to fast-track their initial corporate visibility breakthrough.</p>
                </div>
                <div style={styles.audienceGridSide}>
                  <h4 style={styles.listHeader}>Ideal for candidates who are:</h4>
                  <ul style={styles.vList}>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check" aria-hidden="true"></i></div> <span>Graduates or early in their careers.</span></li>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check" aria-hidden="true"></i></div> <span>Entering the formal job market for the first time.</span></li>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check" aria-hidden="true"></i></div> <span>Struggling to secure interviews despite applying frequently.</span></li>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check" aria-hidden="true"></i></div> <span>Looking to strengthen their professional profile and personal brand.</span></li>
                  </ul>
                </div>
              </div>
            ) : (
              <div style={styles.audiencePanel} className="animate-fadeup">
                <div style={styles.audienceTextSide}>
                  <h3 style={styles.audienceTitle}>Experienced professionals seeking growth</h3>
                  <p style={styles.audienceDesc}>Designed for professionals aiming to deliberately re-architect their current alignment, master pivot logistics, or climb higher into senior leadership roles.</p>
                </div>
                <div style={styles.audienceGridSide}>
                  <h4 style={styles.listHeader}>Designed for professionals who:</h4>
                  <ul style={styles.vList}>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check" aria-hidden="true"></i></div> <span>Want to position themselves more competitively in the job market.</span></li>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check" aria-hidden="true"></i></div> <span>Need critical guidance navigating career transitions or industry changes.</span></li>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check" aria-hidden="true"></i></div> <span>Are systematically preparing for new executive opportunities or more senior roles.</span></li>
                    <li style={styles.vItem}><div style={styles.vCheck}><i className="fas fa-check" aria-hidden="true"></i></div> <span>Want to outline a clear, highly structured long-term career roadmap.</span></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <div style={styles.curriculumLayout}>

    <div style={styles.moduleGrid}>

        <div style={styles.moduleGrid}>

  {/* Module 1 */}
<div
    style={{ ...styles.moduleCard, borderTop: '5px solid var(--teal)' }}
    className="interactive-card"
    onMouseEnter={() => setCoachMessage(moduleMessages[1])}
>
    <span style={styles.moduleNumber}>01</span>
    <h3 style={styles.cardHeading}>Job application strategy</h3>
    <ul style={styles.cardList}>
      <li>Understanding how to read and interpret job specifications.</li>
      <li>Tailoring your CV and application structure specifically to each role.</li>
      <li>Preparing optimized ATS-friendly CVs to reliably clear automated screening layers.</li>
      <li>Structuring highly impactful cover letters and strong supporting documents.</li>
    </ul>
  </div>

  {/* Module 2 */}
<div
    style={{ ...styles.moduleCard, borderTop: '5px solid var(--teal)' }}
    className="interactive-card"
    onMouseEnter={() => setCoachMessage(moduleMessages[2])}
>
    <span style={styles.moduleNumber}>02</span>
    <h3 style={styles.cardHeading}>Professional communication</h3>
    <ul style={styles.cardList}>
      <li>Mastering secure email and communication etiquette in professional environments.</li>
      <li>Live interview dynamics — how to consistently speak with absolute clarity and calm confidence.</li>
      <li>Maintaining pristine professional tone and alignment across digital platforms and social media.</li>
    </ul>
  </div>

  {/* Module 3 */}
  <div
    style={{ ...styles.moduleCard, borderTop: '5px solid var(--teal)' }}
    className="interactive-card"
    onMouseEnter={() => setCoachMessage(moduleMessages[3])}
>
    <span style={styles.moduleNumber}>03</span>
    <h3 style={styles.cardHeading}>Workplace readiness</h3>
    <ul style={styles.cardList}>
      <li>Advanced personal time management paradigms and true personal accountability frameworks.</li>
      <li>Meeting complex deadlines cleanly and balancing competing work priorities.</li>
      <li>Receiving, processing, and executing constructively on difficult professional performance feedback.</li>
    </ul>
  </div>

  {/* Module 4 */}
  <div
    style={{ ...styles.moduleCard, borderTop: '5px solid var(--teal)' }}
    className="interactive-card"
    onMouseEnter={() => setCoachMessage(moduleMessages[4])}
>
    <span style={styles.moduleNumber}>04</span>
    <h3 style={styles.cardHeading}>Career growth & navigation</h3>
    <ul style={styles.cardList}>
      <li>Deep-dive look into interpreting the complete end-to-end employment lifecycle.</li>
      <li>Proactively mapping and planning long-term career milestone developments.</li>
      <li>Spotting hidden internal opportunities and styling yourself for seamless career progression.</li>
    </ul>
  </div>

  {/* Module 5 */}
  <div
    style={{ ...styles.moduleCard, borderTop: '5px solid var(--teal)' }}
    className="interactive-card"
    onMouseEnter={() => setCoachMessage(moduleMessages[5])}
>
    <span style={styles.moduleNumber}>05</span>
    <h3 style={styles.cardHeading}>Professional mindset</h3>
    <ul style={styles.cardList}>
      <li>Building corporate workspace resilience, critical emotional IQ, and systemic adaptability.</li>
      <li>Polishing reliable everyday behavior protocols, high work ethic, and absolute integrity parameters.</li>
      <li>Cultivating a dynamic growth mindset that modern premium employers consistently look out for.</li>
    </ul>
  </div>

  {/* Module 6 */}
 <div
    style={{ ...styles.moduleCard, borderTop: '5px solid var(--teal)' }}
    className="interactive-card"
    onMouseEnter={() => setCoachMessage(moduleMessages[6])}
>
    <span style={styles.moduleNumber}>06</span>
    <h3 style={styles.cardHeading}>Compliance & documentation</h3>
    <ul style={styles.cardList}>
      <li>Clean preparation systems for strict biometric background checks and screening protocols.</li>
      <li>Ensuring personal data records, validation files, and identity parameters are audit-compliant.</li>
      <li>Understanding precisely what verification elements employers check and why it protects company culture.</li>
    </ul>
  </div>

</div>

    </div>

   <div style={styles.avatarPanel}>

    <motion.img
        src={CareerCoach}
        alt="Career Coach"
        style={styles.avatar}

        animate={{

    y:[0,-10,0]

}}

transition={{

    duration:4,

    repeat:Infinity

}}
    />

    <div style={styles.speechBubble}>
      <AnimatePresence mode="wait">

<motion.div
    key={coachMessage}

    initial={{opacity:0,y:10}}

    animate={{opacity:1,y:0}}

    exit={{opacity:0,y:-10}}

    transition={{duration:0.25}}

>

{coachMessage}

</motion.div>

</AnimatePresence>
    </div>

</div>

</div>

      {/* Differentiation */}
      <section style={styles.diffSection}>
        <div style={styles.container}>
          <div style={styles.diffGrid}>
            <div style={styles.diffLeft}>
              <span style={styles.diffTag}>Complementary ecosystems</span>
              <h3 style={styles.diffTitle}>How Career Lab differs from our recruitment services</h3>
              <p style={styles.diffDesc}>
                Our core recruitment services remain completely free to candidates and are dedicated to finding, processing, and placing talent directly into active enterprise client networks.
              </p>
            </div>
            <div style={styles.diffRight}>
              <div style={styles.diffBox}>
                <h4 style={styles.diffBoxTitle}>Free recruitment track</h4>
                <ul style={styles.diffBoxList}>
                  <li><i className="fas fa-check-circle" style={{ color: 'var(--teal)', marginRight: '10px' }} aria-hidden="true"></i> Matching candidates to active partner company opportunities</li>
                  <li><i className="fas fa-check-circle" style={{ color: 'var(--teal)', marginRight: '10px' }} aria-hidden="true"></i> Processing and routing your applications</li>
                  <li><i className="fas fa-check-circle" style={{ color: 'var(--teal)', marginRight: '10px' }} aria-hidden="true"></i> Facilitating final client interviews and contract placements</li>
                </ul>
              </div>
              <div style={{ ...styles.diffBox, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}>
                <h4 style={{ ...styles.diffBoxTitle, color: '#FFFFFF' }}>Career Lab coaching</h4>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                  A separate, highly structured professional enhancement program for candidates who want hands-on guided coaching to maximize baseline employability parameters.
                </p>
                <ul style={{ ...styles.diffBoxList, color: 'rgba(255,255,255,0.85)' }}>
                  <li><i className="fas fa-chevron-right" style={{ color: 'var(--yellow)', marginRight: '10px', fontSize: '0.8rem' }} aria-hidden="true"></i> Build missing professional business skills</li>
                  <li><i className="fas fa-chevron-right" style={{ color: 'var(--yellow)', marginRight: '10px', fontSize: '0.8rem' }} aria-hidden="true"></i> Clarify long-term direction</li>
                  <li><i className="fas fa-chevron-right" style={{ color: 'var(--yellow)', marginRight: '10px', fontSize: '0.8rem' }} aria-hidden="true"></i> Optimize profile conversion tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration + Assessment CTA */}
      <section id="register-interest" style={{ ...styles.section, backgroundColor: '#FFFFFF' }}>
        <div style={styles.container}>
          <div style={styles.formSplitGrid}>
            <div style={styles.formCard}>
              <span style={styles.sectionTag}>Enrollment pathway</span>
              <h3 style={styles.formSectionTitle}>Register your interest</h3>
              <p style={styles.formSectionSub}>Tell us a bit about yourself and we'll be in touch with full programme details.</p>

              <form onSubmit={handleSubmit} style={styles.actualForm}>
                <div style={styles.formRow}>
                  <div>
                    <label style={styles.label}>First name</label>
                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="form-input" />
                  </div>
                  <div>
                    <label style={styles.label}>Last name</label>
                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="form-input" />
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div>
                    <label style={styles.label}>Phone number</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="form-input" />
                  </div>
                  <div>
                    <label style={styles.label}>Email address</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="form-input" />
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div>
                    <label style={styles.label}>Current career status</label>
                    <select name="careerStatus" required value={formData.careerStatus} onChange={handleInputChange} className="form-input" style={{ height: '51px' }}>
                      <option value="">Select status...</option>
                      <option value="Graduate / student">Graduate / student</option>
                      <option value="Employed and looking for growth">Employed and looking for growth</option>
                      <option value="Unemployed and actively job searching">Unemployed and actively job searching</option>
                      <option value="Career transitioning">Career transitioning</option>
                    </select>
                  </div>
                  <div>
                    <label style={styles.label}>Target industry</label>
                    <input type="text" name="industry" placeholder="e.g. Technology, Healthcare" required value={formData.industry} onChange={handleInputChange} className="form-input" />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={styles.label}>Biggest career challenge right now</label>
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

            <div style={styles.assessmentCard}>
              <div style={styles.assessmentOverlay}></div>
              <div style={styles.assessmentContent}>
                <span style={styles.assessmentTag}>Diagnostic tool</span>
                <h3 style={styles.assessmentTitle}>Find out your career readiness score</h3>
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

      <Footer />
    </div>
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
  hero: {
    position: 'relative',
    padding: '140px 0 110px 0',
    color: '#FFFFFF',
    backgroundColor: 'var(--navy)',
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
    color: 'var(--teal)',
    backgroundColor: 'rgba(80, 155, 158, 0.15)',
    padding: '6px 14px',
    borderRadius: '20px',
    display: 'inline-block',
    marginBottom: '24px'
  },
  heroHeading: {
    fontSize: '3.5rem',
    fontWeight: 700,
    lineHeight: 1.15,
    margin: '0 0 24px 0',
    color: '#FFFFFF',
    letterSpacing: '-1px'
  },
  heroSubheading: {
    fontSize: '1.15rem',
    lineHeight: 1.65,
    color: 'rgba(255,255,255,0.7)',
    margin: '0 0 36px 0',
    maxWidth: '780px'
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
  sectionHeader: {
    marginBottom: '56px',
    textAlign: 'center',
  },
  sectionTag: {
    color: 'var(--teal)',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: '2px',
    display: 'block',
    marginBottom: '10px',
  },
  sectionTitle: {
    fontSize: '2.4rem',
    fontWeight: 700,
    marginBottom: '16px',
    color: 'var(--navy)',
    letterSpacing: '-0.5px'
  },
  sectionSub: {
    color: '#5B6670',
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
  audienceTitle: {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: '16px',
    lineHeight: 1.3
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
    gridTemplateColumns: "2fr 1fr",
    gap: "50px",
    alignItems: "start"
},

moduleGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "30px"
},

avatarPanel: {
    position: "sticky",
    top: "120px",
    textAlign: "center"
},
  modulesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '32px'
  },
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 'var(--radius-card)',
    padding: '40px 36px',
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
    right: '36px'
  },
  cardHeading: {
    fontSize: '1.25rem',
    fontWeight: 700,
    marginBottom: '20px',
    color: 'var(--navy)',
    paddingRight: '40px'
  },
  cardList: {
    paddingLeft: '20px',
    margin: '0',
    color: '#5B6670',
    fontSize: '0.93rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    lineHeight: '1.5'
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
  diffTag: {
    fontSize: '0.8rem',
    letterSpacing: '2px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: 'var(--teal)',
    marginBottom: '16px',
    display: 'block'
  },
  diffTitle: {
    fontSize: '2.2rem',
    fontWeight: 700,
    lineHeight: 1.25,
    margin: '0 0 20px 0',
    letterSpacing: '-0.5px'
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
  formSectionTitle: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: 'var(--navy)',
    margin: '0 0 8px 0'
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
    fontWeight: 700,
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
  }
};

export default CareerLabPage;