import LeadWizard from './LeadWizard'
import { LOCALE_CONTENT } from '../lib/locale'

export default function Hero({ locale, onOpenCalendly, geoHoldProps = {} }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-left">
          <div className="badge">Land Interview In 1 Week</div>
          <h1>
            <span style={{display:'block'}}>Land Interview</span>
            <span style={{display:'block', whiteSpace:'nowrap'}}>Calls Faster with</span>
            <span className="hl">FlashFire AI Copilot</span>
          </h1>
          <p className="sub">
            {LOCALE_CONTENT[locale].sub}
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={onOpenCalendly} {...geoHoldProps}>Get Started →</button>
            <a className="btn-ghost" href="#process">See How It Works</a>
          </div>
          <div className="stat-row">
            <div className="stat">
              <div className="num">1,200</div>
              <div className="cap">Applications submitted in 2 months</div>
            </div>
            <div className="stat">
              <div className="num">15+</div>
              <div className="cap">Average interview calls</div>
            </div>
            <div className="stat">
              <div className="num">60+</div>
              <div className="cap">Users landed jobs</div>
            </div>
          </div>
        </div>{/* hero-left */}
        <div className="wiz-wrap" id="capture">
          <LeadWizard locale={locale} onOpenCalendly={onOpenCalendly} />
        </div>
      </div>
    </section>
  )
}
