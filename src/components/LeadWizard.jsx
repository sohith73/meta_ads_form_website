import { useState } from 'react'
import { API_BASE_URL } from '../lib/config'
import { getCachedCountryCode } from '../lib/countryDetection'
import { LOCALE_CONTENT } from '../lib/locale'
import { getVisitorId, getTrackingData } from '../lib/tracking'

const TOTAL = 3

const STATUS_OPTIONS = [
  { value: 'F1/OPT (Student, USA)', ic: '🎓', label: 'F1 / OPT', sub: 'Student, USA' },
  { value: 'H1B / Work Visa (USA)', ic: '💼', label: 'H1B / Work Visa', sub: 'USA' },
  { value: 'PGWP (Canada)', ic: '🍁', label: 'PGWP', sub: 'Canada' },
  { value: 'Just exploring', ic: '🔍', label: 'Just', sub: 'Exploring' },
]

const DIAL_CODES = [
  { value: '+1', label: '🇺🇸 +1' },
  { value: '+91', label: '🇮🇳 +91' },
]

export default function LeadWizard({ locale, onOpenCalendly }) {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState('')
  const [statusErr, setStatusErr] = useState(false)
  const [phone, setPhone] = useState('')
  // Dial code travels with the number so WhatsApp workflows and phone dedupe
  // get a full international number; default follows the detected country.
  const [dial, setDial] = useState(() => (getCachedCountryCode() === 'IN' ? '+91' : '+1'))
  const [phoneErr, setPhoneErr] = useState('')
  const [name, setName] = useState('')
  const [nameErr, setNameErr] = useState('')
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitErr, setSubmitErr] = useState('')
  const [honey, setHoney] = useState('')

  const progress = Math.round((step / TOTAL) * 100) + '%'

  function next() {
    if (step === 1) {
      if (!status) { setStatusErr(true); return }
      setStatusErr(false)
      setStep(2)
    } else if (step === 2) {
      let err = ''
      if (`${dial} ${phone.trim()}`.length > 32) err = 'Phone number is too long.'
      else if (phone.replace(/[^0-9]/g, '').length < 7) err = 'Please enter a valid phone number.'
      setPhoneErr(err)
      if (err) return
      setStep(3)
    }
  }

  function back() { setStep(s => Math.max(s - 1, 1)) }

  async function submit(e) {
    e.preventDefault()
    if (submitting || done) return
    let nErr = ''
    if (name.trim().length < 2) nErr = 'Please enter your full name.'
    else if (name.length > 200) nErr = 'Name must be at most 200 characters.'
    let eErr = ''
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) eErr = 'Please enter a valid email address.'
    else if (email.length > 320) eErr = 'Email must be at most 320 characters.'
    setNameErr(nErr)
    setEmailErr(eErr)
    if (nErr || eErr) return

    setSubmitting(true)
    setSubmitErr('')

    const fullPhone = `${dial} ${phone.trim()}`
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 15000)
    try {
      const res = await fetch(`${API_BASE_URL}/api/meta-ads-form/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name,
          email,
          phone: fullPhone,
          status,
          locale,
          clientGeo: {
            countryCode: getCachedCountryCode(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language || null,
          },
          pageUrl: window.location.href,
          referrer: document.referrer || null,
          visitorId: getVisitorId(),
          ...getTrackingData(),
          _honey: honey,
        }),
      })
      clearTimeout(timer)
      const json = await res.json().catch(() => null)
      if (res.status === 400 && json?.errors && typeof json.errors === 'object') {
        const [field, message] = Object.entries(json.errors)[0] || []
        const msg = typeof message === 'string' && message
          ? message
          : 'Something went wrong. Please try again.'
        setSubmitting(false)
        if (field === 'phone') {
          setPhoneErr(msg)
          setStep(2)
        } else if (field === 'name') {
          setNameErr(msg)
          setStep(3)
        } else if (field === 'email') {
          setEmailErr(msg)
          setStep(3)
        } else if (field === 'status') {
          setSubmitErr(msg)
          setStep(1)
        } else {
          setSubmitErr(msg)
        }
        return
      }
      if (!res.ok || !json?.success) throw new Error('Lead submission failed')

      setDone(true)
      document.body.classList.add('done')
      if (onOpenCalendly) onOpenCalendly({ name: name.trim(), email: email.trim().toLowerCase(), phone: fullPhone })
    } catch {
      setSubmitting(false)
      setSubmitErr('Something went wrong. Please try again.')
    } finally {
      clearTimeout(timer)
    }
  }

  const statusOrder = LOCALE_CONTENT[locale].statusOrder
  const statusOptions = [...STATUS_OPTIONS].sort((a, b) => {
    const ia = statusOrder.indexOf(a.value)
    const ib = statusOrder.indexOf(b.value)
    return (ia === -1 ? statusOrder.length : ia) - (ib === -1 ? statusOrder.length : ib)
  })

  return (
    <form className="card wiz-card" onSubmit={submit} noValidate>
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honey}
        onChange={e => setHoney(e.target.value)}
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />
      {!done && (
        <>
          <div className="wiz-top">
            <div className="wiz-title">Book Your Free Strategy Call</div>
          </div>
          <div className="wiz-progress">
            <span className="wiz-progress-fill" style={{ width: progress }} />
          </div>
          {submitErr && (
            <div className="field-error" style={{ display: 'block', marginBottom: 10 }}>
              {submitErr}
            </div>
          )}
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
            <div style={{ display: 'flex', gap: 8 }}>
              <select
                aria-label="Country code"
                value={dial}
                onChange={e => setDial(e.target.value)}
                style={{
                  flex: '0 0 auto', padding: '13px 8px', borderRadius: 9,
                  border: '1.5px solid var(--line)', background: '#fff',
                  fontSize: '1rem', color: 'var(--ink)', fontFamily: 'inherit',
                }}
              >
                {DIAL_CODES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel-national"
                inputMode="tel"
                placeholder="555 555 5555"
                maxLength={24}
                value={phone}
                onChange={e => { setPhone(e.target.value); setPhoneErr('') }}
              />
            </div>
            <div className="field-error">{phoneErr || 'Please enter a valid phone number.'}</div>
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
              maxLength={200}
              value={name}
              onChange={e => { setName(e.target.value); setNameErr('') }}
            />
            <div className="field-error">{nameErr || 'Please enter your full name.'}</div>
          </div>
          <div className={'field' + (emailErr ? ' invalid' : '')} id="f-email">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="you@email.com"
              maxLength={320}
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailErr('') }}
            />
            <div className="field-error">{emailErr || 'Please enter a valid email address.'}</div>
          </div>
          <div className="wiz-nav">
            <button type="button" className="btn-back" onClick={back}>← Back</button>
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit →'}
            </button>
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
