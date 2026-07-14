import styles from './tiles.module.css'

export default function Tiles() {
  return (
    <section className={styles.statsSection}>
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.iconPlaceholder}>
            <img src="/images/investment.png" alt="Return on Investment" className={styles.iconImage} />
          </div>
          <h3>
            <span className={styles.highlight}>200x</span> Return on Investment
          </h3>
          <p>Students see a 200x ROI with greater pay, quicker offers, and long-term growth.</p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.iconPlaceholder}>
            <img src="/images/appliction.png" alt="Applications Sent" className={styles.iconImage} />
          </div>
          <h3>
            <span className={styles.highlight}>300K+</span> Applications Sent Wisely
          </h3>
          <p>ATS-friendly resumes and personalized cover letters have been added to more than 300k applications.</p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.iconPlaceholder}>
            <img src="/images/time.png" alt="Time to Interview" className={styles.iconImage} />
          </div>
          <h3>
            <span className={styles.highlight}>One Week</span> Before Your Initial Interview
          </h3>
          <p>Within the first seven days of using Flashfire, users report receiving calls for interviews.</p>
        </div>
      </div>
    </section>
  )
}
