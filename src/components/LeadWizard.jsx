import { useState } from 'react'

const TOTAL = 3

export default function LeadWizard({ onOpenCalendly }) {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState('')
  const [statusErr, setStatusErr] = useState(false)
  const [phone, setPhone] = useState('')
  const [phoneErr, setPhoneErr] = useState(false)
  const [name, setName] = useState('')
  const [nameErr, setNameErr] = useState(false)
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState(false)
  const [done, setDone] = useState(false)

  const progress = Math.round((step / TOTAL) * 100) + '%'
  const firstName = name.trim().split(' ')[0] || ''

  function next() {
    if (step === 1) {
      if (!status) { setStatusErr(true); return }
      setStatusErr(false)
      setStep(2)
    } else if (step === 2) {
      const ok = phone.replace(/[^0-9]/g, '').length >= 7
      setPhoneErr(!ok)
      if (!ok) return
      setStep(3)
    }
  }

  function back() { setStep(s => Math.max(s - 1, 1)) }

  async function submit(e) {
    e.preventDefault()
    const nameOk = name.trim().length >= 2
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    setNameErr(!nameOk)
    setEmailErr(!emailOk)
    if (!nameOk || !emailOk) return

    setDone(true)
    document.body.classList.add('done')
    if (onOpenCalendly) onOpenCalendly()

    const data = new FormData()
    data.append('status', status)
    data.append('phone', phone)
    data.append('name', name)
    data.append('email', email)
    data.append('_subject', 'New FlashFire Jobs lead')
    data.append('_honey', '')

    fetch('https://formsubmit.co/ajax/pranjal.t@myfrido.com', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data,
    }).catch(() => {})
  }

  const statusOptions = [
    { value: 'F1/OPT (Student, USA)', ic: '🎓', label: 'F1 / OPT', sub: 'Student, USA' },
    { value: 'H1B / Work Visa (USA)', ic: '💼', label: 'H1B / Work Visa', sub: 'USA' },
    { value: 'PGWP (Canada)', ic: '🍁', label: 'PGWP', sub: 'Canada' },
    { value: 'Just exploring', ic: '🔍', label: 'Just', sub: 'Exploring' },
  ]

  return (
    <form className="card wiz-card" onSubmit={submit} noValidate>
      {!done && (
        <>
          <div className="wiz-top">
            <div className="wiz-title">Book Your Free Strategy Call</div>
          </div>
          <div className="wiz-progress">
            <span className="wiz-progress-fill" style={{ width: progress }} />
          </div>
        </>
      )}

      {/* Step 1 */}
      {!done && step === 1 && (
        <div>
          <p className="wiz-q">What's your current status?</p>
          <div className="tile-grid" role="radiogroup" aria-label="Current status">
            {statusOptions.map(opt => (
              <label
                key={opt.value}
                className={'opt' + (status === opt.value ? ' picked' : '')}
              >
                <input
                  type="radio"
                  name="status"
                  value={opt.value}
                  checked={status === opt.value}
                  onChange={() => { setStatus(opt.value); setStatusErr(false) }}
                />
                <span className="ic">{opt.ic}</span>
                <span>{opt.label}<br /><small>{opt.sub}</small></span>
              </label>
            ))}
          </div>
          {statusErr && (
            <div className="field-error" style={{ display: 'block', marginBottom: 10 }}>
              Please select one option to continue.
            </div>
          )}
          <button type="button" className="submit-btn" onClick={next}>Continue →</button>
        </div>
      )}

      {/* Step 2 */}
      {!done && step === 2 && (
        <div>
          <p className="wiz-q">What's the best number to reach you on?</p>
          <div className={'field' + (phoneErr ? ' invalid' : '')} id="f-phone">
            <label htmlFor="phone">Phone / WhatsApp number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+1 555 555 5555"
              value={phone}
              onChange={e => { setPhone(e.target.value); setPhoneErr(false) }}
            />
            <div className="field-error">Please enter a valid phone number.</div>
          </div>
          <div className="wiz-nav">
            <button type="button" className="btn-back" onClick={back}>← Back</button>
            <button type="button" className="submit-btn" onClick={next}>Continue →</button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {!done && step === 3 && (
        <div>
          <p className="wiz-q">Almost there — where should we send your plan?</p>
          <div className={'field' + (nameErr ? ' invalid' : '')} id="f-name">
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              placeholder="e.g. Ananya Rao"
              value={name}
              onChange={e => { setName(e.target.value); setNameErr(false) }}
            />
            <div className="field-error">Please enter your full name.</div>
          </div>
          <div className={'field' + (emailErr ? ' invalid' : '')} id="f-email">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailErr(false) }}
            />
            <div className="field-error">Please enter a valid email address.</div>
          </div>
          <div className="wiz-nav">
            <button type="button" className="btn-back" onClick={back}>← Back</button>
            <button type="submit" className="submit-btn">Submit →</button>
          </div>
          <p className="fine">By submitting, you agree to be contacted by FlashFire about your job search.</p>
        </div>
      )}

      {/* Success */}
      {done && (
        <div className="success active" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 style={{ margin: '0 0 10px', fontSize: '1.4rem', fontWeight: 700 }}>Successfully Submitted!</h3>
          <p style={{ color: '#666', margin: '0 auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Your details have been received successfully.</p>
        </div>
      )}
    </form>
  )
}
