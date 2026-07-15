import { detectCountry } from './countryDetection'

const BYPASS_KEY = 'ff_geo_bypass_v1'

// Same heuristic as the Next.js site's ClientLogicWrapper: Indian timezone,
// Indian language prefixes, or the ?test_india=true test override.
const INDIA_LANGUAGE_PREFIXES = ['hi', 'bn', 'te', 'ta', 'gu', 'kn', 'ml', 'pa', 'or']

export function isIndiaClientHeuristic() {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta')) return true

    const language = navigator.language || navigator.languages?.[0] || ''
    if (INDIA_LANGUAGE_PREFIXES.some(prefix => language.startsWith(prefix))) return true

    if (new URLSearchParams(window.location.search).get('test_india') === 'true') return true

    return false
  } catch {
    return false
  }
}

// Heuristic first (instant), then IP country via the backend GeoIP endpoint
// (cached in localStorage by detectCountry) so Indian IPs are blocked even
// with a non-Indian device locale.
export async function detectIndiaBlock() {
  if (isIndiaClientHeuristic()) return true
  try {
    return (await detectCountry()) === 'IN'
  } catch {
    return false
  }
}

export function isGeoBypassed() {
  try {
    return sessionStorage.getItem(BYPASS_KEY) === '1'
  } catch {
    return false
  }
}

export function grantGeoBypass() {
  try {
    sessionStorage.setItem(BYPASS_KEY, '1')
  } catch {
    // ignore storage errors — bypass still works via React state this session
  }
}
