import aura from '../assets/promotions/Video-4101.mp4';
import hashtag from '../assets/promotions/Video-456.mp4';
import coming from '../assets/promotions/Video-88428.mp4';

export const promotionsData = [
  {
    id: 'promo-aura',
    brand: 'Aura Salon & Academy',
    shortName: 'Aura',
    byline: 'By Shilpa',
    category: 'Beauty',
    creator: 'Aura Salon & Academy',
    video: aura,
    poster: '/promotions/aura.jpg',
    offer: 'Beauty, makeup, nails, and hair',
    detail:
      'A storefront reel for Aura Salon & Academy, with beauty, makeup, nails, and hair on the sign.',
    format: 'Brand Reel',
    placement: 'Instagram Reels',
    objective: 'Walk-in awareness for the salon and academy',
    highlights: ['Beauty', 'Makeup', 'Nails', 'Hair'],
  },
  {
    id: 'promo-hashtag',
    brand: '#Hashtag',
    shortName: '#Hashtag',
    byline: 'Fashion store',
    category: 'Fashion',
    creator: '#Hashtag',
    video: hashtag,
    poster: '/promotions/hashtag.jpg',
    offer: 'Storefront fashion edit',
    detail: 'A street reel of the #Hashtag shop, with the lit sign and clothing in the window.',
    format: 'Brand Reel',
    placement: 'Instagram Reels',
    objective: 'Store discovery and footfall',
    highlights: ['Retail', 'Fashion', 'Storefront'],
  },
  {
    id: 'promo-coming',
    brand: 'Something is Coming',
    shortName: 'Teaser',
    byline: 'Launch teaser',
    category: 'Launch',
    creator: 'Something is Coming',
    video: coming,
    poster: '/promotions/coming.jpg',
    offer: 'The rumours are all true',
    detail:
      'A teaser film with the lines “The rumours are all true” and “Something is Coming”.',
    format: 'Teaser Reel',
    placement: 'Instagram Reels',
    objective: 'Build curiosity before the launch',
    highlights: ['Teaser', 'Launch', 'Coming soon'],
  },
];
