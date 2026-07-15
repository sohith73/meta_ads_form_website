import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Trust from './components/Trust'
import HowItWorks from './components/HowItWorks'
import Tiles from './components/Tiles'
import Testimonials from './components/Testimonials'
import Employers from './components/Employers'
import Founder from './components/Founder'
import CalendlyModal from './components/CalendlyModal'
import { getLocaleFromPath, LOCALE_CONTENT } from './lib/locale'
import { detectCountry } from './lib/countryDetection'
import { captureTrackingParams } from './lib/tracking'

export default function App() {
  const [showCalendly, setShowCalendly] = useState(false)
  const [locale, setLocale] = useState(() => getLocaleFromPath(window.location.pathname))

  useEffect(() => {
    captureTrackingParams()

    let redirected = false
    try {
      redirected = !!sessionStorage.getItem('ff_geo_redirected_v1')
    } catch {
      redirected = false
    }
    if (window.location.pathname !== '/' || redirected) return

    detectCountry().then(code => {
      if (code !== 'CA') return
      try {
        sessionStorage.setItem('ff_geo_redirected_v1', '1')
      } catch {
        // ignore storage errors
      }
      window.history.replaceState({}, '', '/en-ca' + window.location.search + window.location.hash)
      setLocale('en-ca')
    })
  }, [])

  useEffect(() => {
    document.title = LOCALE_CONTENT[locale].title
  }, [locale])

  return (
    <>
      <Nav onOpenCalendly={() => setShowCalendly(true)} />
      <Hero locale={locale} onOpenCalendly={() => setShowCalendly(true)} />
      <Trust />
      <HowItWorks />
      <Tiles />
      <Testimonials />
      <Employers />
      <Founder />
      <CalendlyModal isVisible={showCalendly} onClose={() => setShowCalendly(false)} />
    </>
  )
}
