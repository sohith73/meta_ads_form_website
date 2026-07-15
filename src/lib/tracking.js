const VISITOR_KEY = 'ff_visitor_id_v1'
const TRACKING_KEY = 'ff_tracking_v1'

const PARAM_MAP = {
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_content: 'utmContent',
  utm_term: 'utmTerm',
  fbclid: 'fbclid',
}

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function getVisitorId() {
  try {
    let id = localStorage.getItem(VISITOR_KEY)
    if (!id) {
      id = generateId()
      localStorage.setItem(VISITOR_KEY, id)
    }
    return id
  } catch {
    return generateId()
  }
}

export function captureTrackingParams() {
  try {
    const params = new URLSearchParams(window.location.search)
    const found = {}
    for (const [param, key] of Object.entries(PARAM_MAP)) {
      const value = params.get(param)
      if (value) found[key] = value
    }
    if (Object.keys(found).length === 0) return

    const existing = JSON.parse(sessionStorage.getItem(TRACKING_KEY) || '{}')
    sessionStorage.setItem(TRACKING_KEY, JSON.stringify({ ...existing, ...found }))
  } catch {
    // ignore storage / parse errors
  }
}

function getCookie(name) {
  try {
    const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'))
    return match ? decodeURIComponent(match[1]) : null
  } catch {
    return null
  }
}

export function getTrackingData() {
  let stored = {}
  try {
    stored = JSON.parse(sessionStorage.getItem(TRACKING_KEY) || '{}')
  } catch {
    stored = {}
  }
  return {
    utmSource: stored.utmSource || null,
    utmMedium: stored.utmMedium || null,
    utmCampaign: stored.utmCampaign || null,
    utmContent: stored.utmContent || null,
    utmTerm: stored.utmTerm || null,
    fbclid: stored.fbclid || null,
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc'),
  }
}
