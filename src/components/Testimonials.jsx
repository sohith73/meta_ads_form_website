import styles from './testimonials.module.css'

const testimonials = [
  {
    company: "MiRUs",
    domain: "mirus.ai",
    text: "Flashfire completely transformed my job search experience. The AI-powered platform guided me through my entire application process, automatically tailoring my resume for each role and tracking every application. I landed interviews at MiRUs within just 10 days, and the personalized approach made all the difference. The real-time updates kept me informed every step of the way!",
    user: "Kanchan",
    role: "Health Data Scientist",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/kanchan.jpeg",
  },
  {
    company: "MaineHealth Medical Center",
    domain: "mainehealth.org",
    text: "I was struggling with the overwhelming job application process until I found Flashfire. The resume booster and intelligent job tracker saved me hours daily by automating the tedious parts. The platform's ATS optimization ensured my applications got noticed, and I received an offer from MaineHealth Medical Center in just 3 weeks. This tool is absolutely essential for anyone serious about landing their dream job!",
    user: "Uhtiha",
    role: "Operations Transformation Specialist",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/uhitha.jpeg",
  },
  {
    company: "Skyworks Solutions",
    domain: "skyworksinc.com",
    text: "From complete job search chaos to absolute clarity — Flashfire changed everything for me. The automated application system handled hundreds of applications while I focused on preparing for interviews. I received interview calls from Skyworks Solutions in my first week, and the structured approach made the entire process stress-free. Highly recommend to all job seekers!",
    user: "Anjali",
    role: "Materials Planning Specialist 2",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/anjali.jpeg",
  },
  {
    company: "Akamai Technologies",
    domain: "akamai.com",
    text: "The AI-powered application system from Flashfire was absolutely incredible. It analyzed job descriptions, optimized my resume for each position, and sent out applications automatically. The platform's intelligent matching ensured I only applied to roles that fit my skills. I landed an interview at Akamai Technologies within 2 weeks and couldn't be happier with the results!",
    user: "Akrati",
    role: "Marketing Program Specialist",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/akrati.jpeg",
  },
  {
    company: "Deloitte",
    domain: "deloitte.com",
    text: "Flashfire's advanced ATS optimization technology helped me stand out in a competitive consulting market. The platform's resume tailoring and cover letter generation were spot-on, matching each firm's requirements perfectly. I received multiple offers from top consulting firms including Deloitte, and the entire process was seamless. This is the future of job searching!",
    user: "Neha",
    role: "Strategy Consultant",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/neha.png",
  },
  {
    company: "LVIS",
    domain: "lviscorp.com",
    text: "The automated application system from Flashfire was a complete game-changer for my career. Instead of spending hours on each application, the platform handled everything while I focused on interview prep. The AI-powered resume optimization and job matching were incredibly accurate. I landed an offer at LVIS in just 2 weeks — something I never thought possible!",
    user: "Teja",
    role: "IT & Customer Support Engineer",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/TEJA.jpeg",
  },
  {
    company: "IBM",
    domain: "ibm.com",
    text: "Flashfire's personalized approach made all the difference in my job search. The platform generated tailored cover letters and optimized my resume for each role, ensuring I got noticed by recruiters. The detailed tracking system kept me organized throughout the process. My IBM offer was secured thanks to Flashfire's intelligent automation and attention to detail!",
    user: "Aryan",
    role: "Software Engineer",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aryan.jpg",
  },
  {
    company: "Armorcode",
    domain: "armorcode.com",
    text: "Tracking 200+ applications manually was impossible, but Flashfire made it effortless. The platform's dashboard showed me exactly where I stood with each application, and the automated follow-ups ensured I never missed an opportunity. Flashfire helped me land my dream role at Armorcode, and I couldn't have done it without their comprehensive tracking system!",
    user: "Amit",
    role: "DevOps Engineer",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/amit%20(1).jpg",
  },
  {
    company: "State Street",
    domain: "statestreet.com",
    text: "Flashfire made everything structured and automated, transforming my chaotic job search into a smooth, organized process. The platform's intelligent application system handled all the repetitive work while I focused on what mattered — preparing for interviews. I secured State Street interviews easily, and the entire experience was stress-free and efficient!",
    user: "Rudraksh",
    role: "SDE 1",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/rudraksh.jpg",
  },
  {
    company: "Wise",
    domain: "wise.com",
    text: "The AI-powered resume tailoring from Flashfire was absolutely perfect. Each application was customized to match the job requirements, and the platform's intelligent matching ensured I was applying to the right roles. The automated system saved me countless hours while maintaining quality. I received a Wise offer within a month, and I'm thrilled with the results!",
    user: "Rijul Jain",
    role: "Product Specialist",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/rijul.jpg",
  },
  {
    company: "Barclays",
    domain: "barclays.com",
    text: "Flashfire guided me through my entire application process with precision and efficiency. The platform's comprehensive approach — from resume optimization to automated applications — made everything seamless. The real-time updates and tracking kept me informed throughout. I landed interviews at Barclays within 10 days, and the structured process made all the difference!",
    user: "Aman Guleria",
    role: "BA 1",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aman.jpg",
  },
  {
    company: "Cvent",
    domain: "cvent.com",
    text: "Getting placed at Cvent as a Product Consultant wouldn't have been possible without Flashfire. The platform's automated application system handled everything while I focused on interview preparation. The AI-powered resume optimization and intelligent job matching ensured I was applying to the right roles. Flashfire made my entire job search effortless, and I couldn't be happier with the results!",
    user: "Harkirat Singh",
    role: "Product Consultant",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/harkirat.jpg",
  },
]

const footerCompanies = [
  { name: "Wise", domain: "wise.com" },
  { name: "Deloitte", domain: "deloitte.com" },
  { name: "Amazon", domain: "amazon.com" },
  { name: "Microsoft", domain: "microsoft.com" },
  { name: "Google", domain: "google.com" },
  { name: "Akamai", domain: "akamai.com" },
  { name: "Skyworks", domain: "skyworksinc.com" },
]

function handleImgError(e, domain) {
  const target = e.target
  const attempts = parseInt(target.getAttribute('data-attempts') || '0')
  if (attempts === 0) {
    target.setAttribute('data-attempts', '1')
    target.src = `https://logo.clearbit.com/${domain}?size=128`
    return
  }
  if (attempts === 1) {
    target.setAttribute('data-attempts', '2')
    target.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    return
  }
  target.style.opacity = '0.3'
}

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials]

  return (
    <section className={styles.milestoneContainer} id="testimonials">
      <h4 className={styles.sectionHeading}>Interviews Secured Through Flashfire Smart Job Search</h4>

      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {doubled.map((t, i) => (
            <div key={i} className={styles.marqueeCard}>
              <div className={styles.companyHeader}>
                <div className={styles.companyLogoIcon}>
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${t.domain}&sz=128`}
                    alt={t.company}
                    className={styles.companyLogo}
                    loading="lazy"
                    onError={(e) => handleImgError(e, t.domain)}
                  />
                </div>
                <p className={styles.companyName}>{t.company}</p>
              </div>
              <p className={styles.testimonialText}>{t.text}</p>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  <img
                    src={t.image}
                    alt={t.user}
                    className={styles.userAvatarImage}
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className={styles.userName}>{t.user}</p>
                  <p className={styles.userCompany}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footerLogos}>
        {footerCompanies.map((company, i) => (
          <span key={i}>
            <span className={styles.footerIcon}>
              <img
                src={`https://www.google.com/s2/favicons?domain=${company.domain}&sz=128`}
                alt={company.name}
                className={styles.footerLogo}
                loading="lazy"
                onError={(e) => handleImgError(e, company.domain)}
              />
            </span>
            {company.name}
          </span>
        ))}
      </div>
    </section>
  )
}
