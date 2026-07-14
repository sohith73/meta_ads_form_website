import { FaWhatsapp } from 'react-icons/fa'
import styles from './founder.module.css'

export default function Founder() {
  const handleWhatsApp = () => {
    const phone = "919817349846"
    const msg = encodeURIComponent("Hi! I'm interested in Flashfire's AI-powered job search automation. Can you help me get started?")
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
  }

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {/* LEFT: Quote card */}
        <div className={styles.quoteCard}>
          <div className={styles.quoteInner}>
            <p className={styles.kicker}>HELPING 1000+ JOB SEEKERS</p>
            <blockquote className={styles.quote}>
              Every line of code we<br />
              write is to help someone<br />
              hear back finally.
            </blockquote>
            <div className={styles.author}>
              <p className={styles.authorName}>Pranjal Tripathi</p>
              <p className={styles.authorRole}>CTO</p>
            </div>
          </div>
          <div className={styles.photoWrap}>
            <img
              src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/pranjal_cto.png"
              alt="Pranjal Tripathi"
              className={styles.photo}
            />
          </div>
        </div>

        {/* RIGHT: WhatsApp CTA */}
        <div className={styles.ctaCard}>
          <h3 className={styles.ctaHeading}>Not sure where to start?<br />Let&rsquo;s talk.</h3>
          <p className={styles.ctaText}>Message us on WhatsApp and we&rsquo;ll guide you step-by-step.</p>
          <button onClick={handleWhatsApp} className={styles.ctaButton}>
            <FaWhatsapp className={styles.waIcon} />
            Connect on WhatsApp
          </button>
          <div className={styles.ctaBgIcon}><FaWhatsapp /></div>
        </div>
      </div>
    </section>
  )
}
