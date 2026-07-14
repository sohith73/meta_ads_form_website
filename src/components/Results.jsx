import styles from './results.module.css'

export default function Results() {
  function handleClick(e) {
    e.preventDefault()
    const el = document.getElementById('capture')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section className={styles.resultSection} id="how">

      {/* Right: photo */}
      <div className={styles.resultRight}>
        <img
          src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/heroResultImage.jpg"
          alt="Interview illustration"
          className={styles.resultImage}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Left: content */}
      <div className={styles.resultLeft}>
        <p className={styles.resultTagline}>RESULT THAT SPEAKS</p>

        <h2 className={styles.resultHeading}>
          Get Interviews Faster With AI Job Search &amp; Application Automation
        </h2>

        <div className={styles.resultStats}>
          <div className={styles.resultStatBox}>
            <h3 className={styles.resultStatNumber}>95%</h3>
            <hr className={styles.resultStatsHR} />
            <p className={styles.resultStatText}>Users land interview call within a month*</p>
          </div>
          <div className={styles.resultStatBox}>
            <h3 className={styles.resultStatNumber}>90%</h3>
            <hr className={styles.resultStatsHR} />
            <p className={styles.resultStatText}>Users get job offer within 3 months*</p>
          </div>
        </div>

        <p className={styles.resultNote}>*Based on verified user data from 2024-25 cohort.</p>

        <button className={styles.resultButton} onClick={handleClick}>
          Schedule a Free Career Call
        </button>
      </div>

    </section>
  )
}
