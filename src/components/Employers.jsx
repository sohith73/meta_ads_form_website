import { useRef, useEffect } from 'react'
import styles from './employers.module.css'

const offerLetters = [
  { name: "Akshad", company: "ICF", linkedinUrl: "#", imagePath: "/images/akshad-offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/Akshad.png" },
  { name: "Aryan", company: "Impact.com", linkedinUrl: "#", imagePath: "/images/aryan-2-offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aryan.png" },
  { name: "Param", company: "Marqeta", linkedinUrl: "#", imagePath: "/images/Param-offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/param.png" },
  { name: "Sage", company: "Sleek Technologies", linkedinUrl: "#", imagePath: "/images/sage offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/sage.png" },
  { name: "Naman", company: "Amplitude", linkedinUrl: "#", imagePath: "/images/naman offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/naman.png" },
  { name: "Kanchan", company: "MiRus", linkedinUrl: "https://www.linkedin.com/in/dr-kanchan-yadav-ba0b18106/", imagePath: "/images/kanchan_offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/kanchan.jpeg" },
  { name: "Uhtiha", company: "MaineHealth Maine Medical Center", linkedinUrl: "https://www.linkedin.com/in/uhitha-doddapaneni-903932128/", imagePath: "/images/uhitha_offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/uhitha.jpeg" },
  { name: "Vaishali Jain", company: "Lila Sciences", linkedinUrl: "#", imagePath: "/images/vaishali_jain_offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/vaishalli_jain.png" },
  { name: "Anjali", company: "Skyworks Solutions, Inc.", linkedinUrl: "https://www.linkedin.com/in/anjalishah6198/", imagePath: "/images/anjali_offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/anjali.jpeg" },
  { name: "Akrati", company: "Akamai Technologies", linkedinUrl: "https://www.linkedin.com/in/akratimalviya/", imagePath: "/images/akrati_offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/akrati.jpeg" },
  { name: "Neha", company: "Deloitte", linkedinUrl: "https://www.linkedin.com/in/neha-senapati/", imagePath: "/images/neha_offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/neha.png" },
  { name: "Teja", company: "LVIS", linkedinUrl: "#", imagePath: "/images/teja_offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/TEJA.jpeg" },
  { name: "Amit", company: "Armorcode", linkedinUrl: "#", imagePath: "/images/amit_offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/amit%20(1).jpg" },
  { name: "Rudraksh", company: "State Street", linkedinUrl: "#", imagePath: "/images/rudraksh_offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/rudraksh.jpg" },
  { name: "Rijul Jain", company: "Wise", linkedinUrl: "https://www.linkedin.com/in/-rijuljain-/", imagePath: "/images/rijul_offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/rijul.jpg" },
  { name: "Aman Guleria", company: "Barclays", linkedinUrl: "#", imagePath: "/images/aman_offer.png", profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aman.jpg" },
]

export default function Employers() {
  const carouselRef = useRef(null)

  const scroll = (dir) => {
    if (!carouselRef.current) return
    carouselRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' })
  }

  return (
    <section className={styles.offerSection}>
      <div className={styles.offerContent}>
        <div className={styles.offerIntro}>
          <h2 className={styles.offerHeading}>60+ Offer letters received</h2>
          <p className={styles.offerSubHeading}>
            Trusted by job seekers across the U.S. Real applications. Real interviews. Real offer letters that turned opportunities into successful careers.
          </p>
          <div className={styles.arrowControls}>
            <button type="button" className={styles.arrowButton} onClick={() => scroll('left')} aria-label="Previous">&larr;</button>
            <button type="button" className={styles.arrowButton} onClick={() => scroll('right')} aria-label="Next">&rarr;</button>
          </div>
        </div>

        <div className={styles.offerCarousel} ref={carouselRef}>
          {offerLetters.map((offer, i) => (
            <div key={i} className={styles.offerCard}>
              <div className={styles.imagePlaceholder}>
                <img
                  src={offer.imagePath}
                  alt={`Offer Letter - ${offer.name}`}
                  className={styles.offerImage}
                  loading="lazy"
                  onError={(e) => { e.target.src = '/images/offer-placeholder.jpg' }}
                />
              </div>
              <div className={styles.offerOverlay}>
                <div className={styles.profileInfo}>
                  <div className={styles.avatar}>
                    <img
                      src={offer.profileImage}
                      alt={offer.name}
                      className={styles.avatarImage}
                      loading="lazy"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  </div>
                  <div>
                    <p className={styles.name}>{offer.name}</p>
                    <p className={styles.company}>{offer.company}</p>
                  </div>
                </div>
                {offer.linkedinUrl !== '#' ? (
                  <a href={offer.linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.linkedinIcon}>in</a>
                ) : (
                  <span className={`${styles.linkedinIcon} ${styles.linkedinIconDummy}`}>in</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
