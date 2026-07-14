import { useState } from 'react';

const questions = [
  {
    q: "How many years of professional work experience do you have?",
    options: [
      { label: "None yet — I'm just starting out", track: 'entry', readiness: 1 },
      { label: "Less than 2 years", track: 'entry', readiness: 2 },
      { label: "3–7 years", track: 'mid', readiness: 2 },
      { label: "8+ years", track: 'mid', readiness: 2 },
    ],
  },
  {
    q: "Are you currently employed?",
    options: [
      { label: "No, actively job searching", track: 'entry', readiness: 1 },
      { label: "Yes, but looking for something new", track: 'mid', readiness: 2 },
      { label: "Yes, and open to opportunities", track: 'mid', readiness: 2 },
      { label: "No, I'm a student or recent graduate", track: 'entry', readiness: 1 },
    ],
  },
  {
    q: "Do you have a completed, up-to-date CV?",
    options: [
      { label: "Yes, fully updated", track: 'mid', readiness: 2 },
      { label: "I have one, but it needs work", track: 'entry', readiness: 1 },
      { label: "No, I haven't started one", track: 'entry', readiness: 0 },
    ],
  },
  {
    q: "Have you had a formal performance review at work before?",
    options: [
      { label: "Yes, several", track: 'mid', readiness: 2 },
      { label: "Once or twice", track: 'mid', readiness: 1 },
      { label: "No, never", track: 'entry', readiness: 1 },
    ],
  },
  {
    q: "What best describes your next career milestone?",
    options: [
      { label: "Landing my first full-time role", track: 'entry', readiness: 1 },
      { label: "Moving into a leadership or senior role", track: 'mid', readiness: 2 },
      { label: "Switching industries entirely", track: 'mid', readiness: 1 },
      { label: "Building confidence for interviews", track: 'entry', readiness: 1 },
    ],
  },
  {
    q: "How comfortable are you walking into a job interview right now?",
    options: [
      { label: "Very comfortable", track: 'mid', readiness: 2 },
      { label: "Somewhat comfortable", track: 'mid', readiness: 1 },
      { label: "Nervous, could use guidance", track: 'entry', readiness: 1 },
      { label: "Not comfortable at all", track: 'entry', readiness: 0 },
    ],
  },
  {
    q: "Do you have a clear sense of your long-term career goal?",
    options: [
      { label: "Yes, very clear", track: 'mid', readiness: 2 },
      { label: "I have a general direction", track: 'mid', readiness: 1 },
      { label: "Still figuring it out", track: 'entry', readiness: 1 },
    ],
  },
  {
    q: "What's your biggest challenge right now?",
    options: [
      { label: "Getting my first interview", track: 'entry', readiness: 1 },
      { label: "Standing out for senior roles", track: 'mid', readiness: 2 },
      { label: "Knowing how to negotiate or lead", track: 'mid', readiness: 1 },
      { label: "Understanding what employers want", track: 'entry', readiness: 0 },
    ],
  },
  {
    q: "Have you ever led or managed a team, project, or direct reports?",
    options: [
      { label: "Yes, regularly", track: 'mid', readiness: 2 },
      { label: "A few times", track: 'mid', readiness: 1 },
      { label: "Not yet", track: 'entry', readiness: 1 },
    ],
  },
  {
    q: "How would you describe where you are in your career journey?",
    options: [
      { label: "Just getting started", track: 'entry', readiness: 1 },
      { label: "Established, looking to grow further", track: 'mid', readiness: 2 },
      { label: "Restarting after a break or transition", track: 'entry', readiness: 1 },
    ],
  },
];

const READINESS_THRESHOLD = 12;

function CareerQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const progress = (step / questions.length) * 100;

  const selectAnswer = (option) => {
    const nextAnswers = [...answers, option];
    setAnswers(nextAnswers);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const entryCount = nextAnswers.filter(a => a.track === 'entry').length;
      const midCount = nextAnswers.filter(a => a.track === 'mid').length;
      const readiness = nextAnswers.reduce((sum, a) => sum + a.readiness, 0);
      const track = entryCount >= midCount ? 'entry' : 'mid';
      const success = readiness >= READINESS_THRESHOLD;

      setResult({ success, track, readiness });
    }
  };

  const retake = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  const scrollToRegister = () => {
    document.getElementById('register-interest')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (result) {
    return (
      <div style={styles.resultCard}>
        {result.success ? (
          <>
            <div style={styles.resultBadge}>
              <i className="fas fa-check-circle" aria-hidden="true"></i>
            </div>
            <span style={styles.resultTag}>Your match</span>
            <h3 style={styles.resultTitle}>
              You're a match for our{' '}
              {result.track === 'entry' ? 'Entry-Level' : 'Mid-Career'} track
            </h3>
            <p style={styles.resultText}>
              Based on your answers, our {result.track === 'entry' ? 'Entry-Level Candidates' : 'Mid-Career Professionals'} programme
              is the strongest fit for where you are right now.
            </p>
            <div style={styles.resultBtnRow}>
              <button type="button" style={styles.resultBtnPrimary} className="btn-hover-transition" onClick={scrollToRegister}>
                Register for this track
              </button>
              <button type="button" style={styles.resultBtnGhost} className="btn-hover-transition" onClick={retake}>
                Retake quiz
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ ...styles.resultBadge, background: 'rgba(217, 107, 67, 0.12)', color: 'var(--orange)' }}>
              <i className="fas fa-info-circle" aria-hidden="true"></i>
            </div>
            <span style={styles.resultTag}>Not quite there yet</span>
            <h3 style={styles.resultTitle}>Let's talk it through together</h3>
            <p style={styles.resultText}>
              Your answers don't point to a clear track just yet — that's completely
              normal, and it just means a quick conversation with our team will help more
              than a quiz result. We're happy to guide you from here.
            </p>
            <div style={styles.resultBtnRow}>
              <a href="/contact" style={styles.resultBtnPrimary} className="btn-hover-transition">
                Talk to a specialist
              </a>
              <button type="button" style={styles.resultBtnGhost} className="btn-hover-transition" onClick={retake}>
                Retake quiz
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  const current = questions[step];

  return (
    <div style={styles.quizCard}>
      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
      </div>
      <p style={styles.stepLabel}>Question {step + 1} of {questions.length}</p>

      <h3 style={styles.questionText}>{current.q}</h3>

      <div style={styles.optionsList}>
        {current.options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            style={styles.optionBtn}
            className="quiz-option"
            onClick={() => selectAnswer(opt)}
          >
            {opt.label}
            <i className="fas fa-arrow-right" style={styles.optionArrow} aria-hidden="true"></i>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  quizCard: {
    background: '#FFFFFF',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-card)',
    boxShadow: 'var(--shadow-sm)',
    padding: '40px',
    maxWidth: '620px',
    margin: '0 auto',
  },
  progressTrack: {
    width: '100%',
    height: '8px',
    borderRadius: '20px',
    background: 'var(--bg)',
    overflow: 'hidden',
    marginBottom: '12px',
  },
  progressFill: {
    height: '100%',
    background: 'var(--teal)',
    borderRadius: '20px',
    transition: 'width 0.4s ease',
  },
  stepLabel: {
    fontSize: '0.8rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--teal)',
    marginBottom: '20px',
  },
  questionText: {
    fontSize: '1.35rem',
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: '28px',
    lineHeight: 1.4,
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  optionBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    textAlign: 'left',
    padding: '16px 20px',
    borderRadius: '12px',
    border: '1px solid var(--border-light)',
    background: 'var(--bg)',
    color: 'var(--navy)',
    fontSize: '0.98rem',
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  optionArrow: {
    fontSize: '0.8rem',
    color: 'var(--teal)',
    opacity: 0,
  },
  resultCard: {
    background: '#FFFFFF',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-card)',
    boxShadow: 'var(--shadow-md)',
    padding: '48px',
    maxWidth: '620px',
    margin: '0 auto',
    textAlign: 'center',
  },
  resultBadge: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'rgba(80, 155, 158, 0.12)',
    color: 'var(--teal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.6rem',
    margin: '0 auto 20px',
  },
  resultTag: {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--teal)',
    marginBottom: '10px',
  },
  resultTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: '14px',
    lineHeight: 1.3,
  },
  resultText: {
    fontSize: '0.98rem',
    color: '#5B6670',
    lineHeight: 1.65,
    marginBottom: '28px',
  },
  resultBtnRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '14px',
    flexWrap: 'wrap',
  },
  resultBtnPrimary: {
    background: 'var(--teal)',
    color: '#FFFFFF',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '40px',
    fontWeight: 700,
    fontSize: '0.95rem',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
  },
  resultBtnGhost: {
    background: 'transparent',
    color: 'var(--navy)',
    border: '1.5px solid var(--border-light)',
    padding: '14px 28px',
    borderRadius: '40px',
    fontWeight: 700,
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
};

export default CareerQuiz;