import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Trust from './components/Trust'
import HowItWorks from './components/HowItWorks'
import Tiles from './components/Tiles'
import Testimonials from './components/Testimonials'
import Employers from './components/Employers'
import Founder from './components/Founder'
import CalendlyModal from './components/CalendlyModal'

export default function App() {
  const [showCalendly, setShowCalendly] = useState(false)

  return (
    <>
      <Nav onOpenCalendly={() => setShowCalendly(true)} />
      <Hero onOpenCalendly={() => setShowCalendly(true)} />
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
