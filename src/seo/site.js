export const SITE_NAME = 'STAR MEDIA';

export const HOME_TITLE = 'STAR MEDIA — Influencer Marketing Agency in New Delhi';

export const HOME_DESCRIPTION =
  'STAR MEDIA in New Delhi connects brands with 10,000+ verified creators for influencer campaigns, UGC, and measurable results.';

export const SHARE_IMAGE_PATH = '/images/star-media-agency-poster.png';

const PRODUCTION_ORIGIN = 'https://starmediainfluencer.com';

export function siteOrigin() {
  return (import.meta.env.VITE_SITE_URL || PRODUCTION_ORIGIN).trim().replace(/\/+$/, '');
}

export function absoluteUrl(path = '/') {
  const origin = siteOrigin();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return origin ? `${origin}${normalized}` : normalized;
}
