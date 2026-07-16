const steps = [
  {
    number: 1,
    title: 'Resume Tailoring',
    detail: 'Your resume is customized for each role with role-specific keywords and formatting recruiters love.',
    image: 'https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/step1.png',
  },
  {
    number: 2,
    title: 'LinkedIn Optimization',
    detail: 'We rewrite your LinkedIn to stand out in U.S. recruiter searches, using AI-powered keyword matching.',
    image: 'https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/step2.png',
  },
  {
    number: 3,
    title: 'Smart Job Applications',
    detail: 'We apply to 1000+ curated jobs that match your goals, location, and visa needs - no spam, just precision.',
    image: 'https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/step3.png',
  },
  {
    number: 4,
    title: 'Get Interview Calls',
    detail: 'Start receiving interview invites as we track and optimize every application. You focus on prep, we handle the hustle.',
    image: 'https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/step4.png',
  },
]

import { trackButtonClick } from '../lib/tracking'

export default function HowItWorks() {
  function handleGetStarted(e) {
    e.preventDefault()
    trackButtonClick('Get Started', 'how_it_works')
    const el = document.getElementById('capture')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section id="process" style={{ background: '#fffbf9', padding: '56px 0', fontFamily: 'inherit' }}>
      <div style={{ maxWidth: 1350, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{
            maxWidth: 700, margin: '0 auto',
            fontSize: 'clamp(30px, 4vw, 42px)', fontWeight: 800,
            lineHeight: 1.08, color: '#080b10', letterSpacing: '-0.02em',
          }}>
            How Flashfire's AI Job Automation Platform Works in 4 Simple Steps
          </h2>
          <p style={{
            maxWidth: 600, margin: '20px auto 0',
            fontSize: 13, fontWeight: 700, lineHeight: 1.55, color: '#545b65',
          }}>
            Flashfire simplifies job hunting using AI job application automation, handling everything from resume optimization to automated job submissions and tracking.
          </p>
          <button
            onClick={handleGetStarted}
            style={{
              marginTop: 28,
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#ff5a1f', color: '#fff',
              padding: '12px 28px', fontSize: 15, fontWeight: 700,
              border: 'none', cursor: 'pointer', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#e04d18'}
            onMouseLeave={e => e.currentTarget.style.background = '#ff5a1f'}
          >
            Get Started <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
          </button>
        </div>

        {/* 2×2 Grid */}
        <div className="how-steps-grid">
          {steps.map(step => (
            <div
              key={step.number}
              style={{
                display: 'flex', flexDirection: 'column',
                minHeight: 330,
                border: '6px solid #f8f0eb',
                background: '#f8f0eb',
              }}
            >
              {/* Text block */}
              <div style={{ background: '#fff', padding: '20px 24px 24px' }}>
                <p style={{ marginBottom: 16, fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, lineHeight: 1 }}>
                  <span style={{
                    background: 'linear-gradient(90deg, #d84a22, #f05a23, #ff7a2a)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    \\ STEP {step.number}
                  </span>
                </p>
                <h3 style={{ marginBottom: 8, fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 800, lineHeight: 1.08, color: '#24272d' }}>
                  {step.title}
                </h3>
                <p style={{ maxWidth: 420, fontSize: 13, fontWeight: 700, lineHeight: 1.42, color: '#232933', margin: 0 }}>
                  {step.detail}
                </p>
              </div>

              {/* Image block */}
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#f8f0eb', padding: '36px 24px',
              }}>
                <img
                  src={step.image}
                  alt={`Step ${step.number}`}
                  style={{ height: 'clamp(80px, 10vw, 112px)', width: 'auto', objectFit: 'contain' }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  )
}
