import { API_BASE_URL } from './config'

const STORAGE_KEY = 'ff_country_code_v1'
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

const CANADA_TIMEZONES = [
  'America/Toronto', 'America/Vancouver', 'America/Montreal',
  'America/Edmonton', 'America/Winnipeg', 'America/Halifax',
  'America/St_Johns', 'America/Regina', 'America/Yellowknife',
  'America/Goose_Bay', 'America/Glace_Bay', 'America/Moncton',
  'America/Nipigon', 'America/Thunder_Bay', 'America/Atikokan',
  'America/Rainy_River', 'America/Cambridge_Bay', 'America/Creston',
  'America/Dawson', 'America/Dawson_Creek', 'America/Fort_Nelson',
  'America/Inuvik', 'America/Whitehorse', 'America/Blanc-Sablon',
  'America/Iqaluit', 'America/Rankin_Inlet', 'America/Resolute',
  'America/Swift_Current',
]

function clearCachedCountryCode() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore storage errors
  }
}

export function getCachedCountryCode() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    // Legacy plain-string values (e.g. 'US') fail JSON.parse or the shape
    // check below; treat them as invalid and clear the entry.
    const parsed = JSON.parse(raw)
    if (
      !parsed || typeof parsed !== 'object' ||
      typeof parsed.code !== 'string' || !parsed.code ||
      typeof parsed.ts !== 'number' ||
      Date.now() - parsed.ts > CACHE_TTL_MS
    ) {
      clearCachedCountryCode()
      return null
    }
    return parsed.code
  } catch {
    clearCachedCountryCode()
    return null
  }
}

export function cacheCountryCode(code) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ code, ts: Date.now() }))
  } catch {
    // ignore storage errors
  }
}

export async function fetchCountryCode() {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)
  try {
    const res = await fetch(`${API_BASE_URL}/api/geo`, { signal: controller.signal })
    if (!res.ok) return null
    const data = await res.json()
    if (data?.success !== true || !data.countryCode) return null
    // Only 'ip-geolocation' is a real lookup path; the backend's error path
    // returns detectionMethod 'fallback' with a hardcoded US default.
    if (data.detectionMethod !== undefined && data.detectionMethod !== 'ip-geolocation') return null
    return data.countryCode
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

export function detectCountryFallback() {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const language = navigator.language || navigator.languages?.[0] || ''

    if (CANADA_TIMEZONES.some(tz => timezone.includes(tz))) return 'CA'
    if (language.startsWith('fr-CA') || language.startsWith('en-CA')) return 'CA'

    return 'US'
  } catch {
    return 'US'
  }
}

export async function detectCountry() {
  const cached = getCachedCountryCode()
  if (cached) return cached

  const fetched = await fetchCountryCode()
  if (fetched) {
    cacheCountryCode(fetched)
    return fetched
  }

  // Heuristic result is intentionally not cached, so a later backend
  // success can correct a wrong guess.
  return detectCountryFallback()
}
