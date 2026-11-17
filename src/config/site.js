export const SITE_URL = 'https://monsun.io'
export const SITE_NAME = 'Monsun'
export const SITE_TAGLINE = 'Metocean Intelligence & Consultancy'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`
export const CONTACT_EMAIL = 'contact@monsun.io'

export const DEFAULT_DESCRIPTION =
  'Monsun delivers metocean intelligence and consultancy for safer offshore operations — sea state monitoring, marine forecasting, and predictive ocean analytics.'

/** Blog slugs discovered from src/blog — keep in sync when adding posts */
export const BLOG_SLUGS = [
  'beyond-moderate-sea-what-the-metocean-data-shows-in-the-kmp-virgo-transport-8-capsizing',
  'from-ocean-conditions-to-operational-decisions',
  'weather-forecasts-everywhere-but-can-they-help-you-decide',
  'sea-conditions-km-putri-sakinah-accident',
]

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}
