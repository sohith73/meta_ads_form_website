const universities = [
  {
    name: 'Harvard University',
    domain: 'harvard.edu',
    wordmark: ['HARVARD', 'UNIVERSITY'],
    color: '#a7a7a7',
  },
  {
    name: 'Stanford University',
    domain: 'stanford.edu',
    wordmark: ['Stanford', 'University'],
    color: '#8c1515',
  },
  {
    name: 'University of Michigan',
    domain: 'umich.edu',
    wordmark: ['UNIVERSITY OF', 'MICHIGAN'],
    color: '#00274c',
  },
  {
    name: 'Berkeley',
    domain: 'berkeley.edu',
    wordmark: ['Berkeley', 'UNIVERSITY OF CALIFORNIA'],
    color: '#003262',
  },
  {
    name: 'Carnegie Mellon University',
    domain: 'cmu.edu',
    wordmark: ['Carnegie', 'Mellon', 'University'],
    color: '#e1bfc4',
  },
]

function getLogoUrl(domain) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}

function getLineStyle(name, index) {
  if (name === 'Berkeley' && index === 1) {
    return { fontSize: '6px', fontWeight: 700, lineHeight: 1, letterSpacing: '0.02em' }
  }
  if (name === 'University of Michigan' && index === 0) {
    return { fontSize: '7px', fontWeight: 700, lineHeight: 1, letterSpacing: '0.03em' }
  }
  return { fontSize: '14px', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.02em' }
}

export default function Trust() {
  return (
    <section style={{ padding: '36px 24px', textAlign: 'center', background: '#fff' }}>
      <p style={{
        fontSize: '20px', fontWeight: 500, color: '#9d9d9d',
        marginBottom: '28px', lineHeight: 1.4,
      }}>
        Trusted by students and graduates from top global universities.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        alignItems: 'center',
        gap: '24px 40px',
        margin: '0 auto',
      }}>
        {universities.map(u => (
          <div
            key={u.name}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '8px', color: u.color, opacity: 0.9, whiteSpace: 'nowrap',
            }}
          >
            <img
              src={getLogoUrl(u.domain)}
              alt=""
              width={28}
              height={28}
              style={{ width: 28, height: 28, objectFit: 'contain', opacity: 0.9 }}
            />
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: 'Georgia, serif' }}>
              {u.wordmark.map((line, i) => (
                <span key={line} style={getLineStyle(u.name, i)}>
                  {line}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
