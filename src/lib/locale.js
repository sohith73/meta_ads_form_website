export function getLocaleFromPath(pathname) {
  return pathname === '/en-ca' || pathname.startsWith('/en-ca/') ? 'en-ca' : 'us'
}

export const LOCALE_CONTENT = {
  us: {
    title: 'FlashFire Jobs — Land Interview Calls Faster With Your AI Copilot',
    sub: 'We apply to 1200 USA job applications & track everything while you focus on winning the interview.',
    statusOrder: [
      'F1/OPT (Student, USA)',
      'H1B / Work Visa (USA)',
      'PGWP (Canada)',
      'Just exploring',
    ],
  },
  'en-ca': {
    title: 'FlashFire Jobs — Land Interview Calls Faster With Your AI Copilot (Canada)',
    sub: 'We apply to 1200 US & Canada job applications and track everything while you focus on winning the interview.',
    statusOrder: [
      'PGWP (Canada)',
      'F1/OPT (Student, USA)',
      'H1B / Work Visa (USA)',
      'Just exploring',
    ],
  },
}
