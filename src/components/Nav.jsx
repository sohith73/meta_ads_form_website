import { useState } from 'react'
import styles from './navbar.module.css'

const LINKS = [
  { name: 'Home', href: '#top' },
  { name: 'How It Works', href: '#process' },
  { name: 'Testimonials', href: '#testimonials' },
]

export default function Nav({ onOpenCalendly }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function scrollTo(href) {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  function handleLogoClick(e) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 50 }}>
      <nav className={styles.navContainer}>
        <div className={styles.navInner}>

          {/* Logo */}
          <div className={styles.navLeft}>
            <a href="#top" className={styles.navLogoText} onClick={handleLogoClick}>
              FLASHFIRE
            </a>
          </div>

          {/* Desktop links */}
          <ul className={styles.navLinks}>
            {LINKS.map(link => (
              <li key={link.href} className={styles.navLinkItem}>
                <a
                  href={link.href}
                  className={styles.navLinkText}
                  onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className={styles.navRight}>
            <button className={styles.navPrimaryButton} onClick={onOpenCalendly}>
              Book a Demo →
            </button>
          </div>

          {/* Hamburger */}
          <button
            className={styles.navMenuIcon}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <div className={menuOpen ? styles.iconClose : styles.iconHamburger} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className={styles.navMobileMenu}>
            <ul className={styles.navMobileLinks}>
              {LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={styles.navMobileLink}
                    onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Mobile sticky bottom CTA */}
      {!menuOpen && (
        <div className={styles.navMobileButtonsSticky}>
          <button className={styles.navMobilePrimary} onClick={onOpenCalendly}>
            Book a Demo →
          </button>
        </div>
      )}
    </div>
  )
}
