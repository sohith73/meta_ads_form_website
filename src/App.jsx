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
import GeoBlockModal from './components/GeoBlockModal'
import { getLocaleFromPath, LOCALE_CONTENT } from './lib/locale'
import { detectCountry } from './lib/countryDetection'
import { captureTrackingParams } from './lib/tracking'
import { detectIndiaBlock, isGeoBypassed, grantGeoBypass } from './lib/geoBlock'
import { useGeoBypass } from './lib/useGeoBypass'

export default function App() {
  const [showCalendly, setShowCalendly] = useState(false)
  const [calendlyLead, setCalendlyLead] = useState(null)
  const [locale, setLocale] = useState(() => getLocaleFromPath(window.location.pathname))
  const [isIndiaBlocked, setIsIndiaBlocked] = useState(false)
  const [geoBypassed, setGeoBypassed] = useState(() => isGeoBypassed())
  const [showGeoBlock, setShowGeoBlock] = useState(false)

  // Nav/Hero buttons pass a click event; only the wizard passes lead data.
  // Prefilling Calendly with the submitted email is what lets the backend
  // webhook match the booking back to the meta lead and flip it to scheduled.
  function openCalendly(lead) {
    if (lead && typeof lead === 'object' && typeof lead.email === 'string') {
      setCalendlyLead(lead)
    }
    // India geo-block: never open Calendly for Indian visitors unless the
    // 5-second hold bypass was used this session.
    if (isIndiaBlocked && !geoBypassed) {
      setShowGeoBlock(true)
      return
    }
    setShowCalendly(true)
  }

  // Holding a CTA for 5 seconds bypasses the block and opens Calendly
  // (same behavior as the Next.js site's useGeoBypass on its CTAs).
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      grantGeoBypass()
      setGeoBypassed(true)
      setShowGeoBlock(false)
      setShowCalendly(true)
    },
  })
  const geoHoldProps = isIndiaBlocked && !geoBypassed ? getButtonProps() : {}

  useEffect(() => {
    detectIndiaBlock().then(setIsIndiaBlocked)
  }, [])

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
      <Nav onOpenCalendly={openCalendly} geoHoldProps={geoHoldProps} />
      <Hero locale={locale} onOpenCalendly={openCalendly} geoHoldProps={geoHoldProps} />
      <Trust />
      <HowItWorks />
      <Tiles />
      <Testimonials />
      <Employers />
      <Founder />
      <CalendlyModal isVisible={showCalendly} lead={calendlyLead} onClose={() => setShowCalendly(false)} />
      <GeoBlockModal isVisible={showGeoBlock} onClose={() => setShowGeoBlock(false)} />
    </>
  )
}
