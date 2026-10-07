import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const root = path.dirname(fileURLToPath(import.meta.url))
const PRODUCTION_ORIGIN = 'https://starmediainfluencer.com'
const PRIVATE_PATHS = ['/admin', '/dashboard', '/login', '/signup', '/checkout', '/cart', '/profile', '/api']

function seoPlugin(siteUrl) {
  const origin = (siteUrl || PRODUCTION_ORIGIN).trim().replace(/\/+$/, '')
  const robots = [
    'User-agent: *',
    'Allow: /',
    '',
    ...PRIVATE_PATHS.map((route) => `Disallow: ${route}`),
    '',
    origin ? `Sitemap: ${origin}/sitemap.xml` : '# Set VITE_SITE_URL before the production build to publish the sitemap URL.',
    '',
  ].join('\n')
  const sitemap = origin
    ? `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${origin}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`
    : null

  const writeFiles = (directory) => {
    fs.mkdirSync(directory, { recursive: true })
    fs.writeFileSync(path.join(directory, 'robots.txt'), robots)
    const sitemapPath = path.join(directory, 'sitemap.xml')
    if (sitemap) fs.writeFileSync(sitemapPath, sitemap)
    else if (fs.existsSync(sitemapPath)) fs.unlinkSync(sitemapPath)
  }

  return {
    name: 'star-media-seo',
    configResolved() {
      writeFiles(path.join(root, 'public'))
    },
    transformIndexHtml(html) {
      const pageUrl = origin ? `${origin}/` : ''
      const image = origin
        ? `${origin}/images/star-media-agency-poster.png`
        : '/images/star-media-agency-poster.png'
      const withUrls = (node) => (pageUrl ? { ...node, url: pageUrl } : node)
      const schema = {
        '@context': 'https://schema.org',
        '@graph': [
          withUrls({
            '@type': ['Organization', 'LocalBusiness'],
            name: 'STAR MEDIA',
            email: 'contact@starmediainfluencer.com',
            ...(pageUrl
              ? {
                  logo: `${origin}/star-media-logo-transparent.png`,
                  image,
                }
              : {}),
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Kanchenjunga Bldg, 18, Barakhamba Rd, Fire Brigade Lane, Barakhamba',
              addressLocality: 'New Delhi',
              addressRegion: 'Delhi',
              postalCode: '110001',
              addressCountry: 'IN',
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '10:00',
              closes: '19:00',
            },
            sameAs: ['https://www.instagram.com/starmedia_influencer/'],
          }),
          withUrls({
            '@type': 'WebSite',
            name: 'STAR MEDIA',
            inLanguage: 'en',
          }),
          withUrls({
            '@type': 'WebPage',
            name: 'STAR MEDIA — Influencer Marketing Agency in New Delhi',
            description:
              'STAR MEDIA in New Delhi connects brands with 10,000+ verified creators for influencer campaigns, UGC, and measurable results.',
            inLanguage: 'en',
            isPartOf: withUrls({
              '@type': 'WebSite',
              name: 'STAR MEDIA',
            }),
          }),
        ],
      }
      const tags = [
        pageUrl ? `<link rel="canonical" href="${pageUrl}" />` : '',
        pageUrl ? `<meta property="og:url" content="${pageUrl}" />` : '',
        `<script type="application/ld+json" id="star-media-schema">${JSON.stringify(schema)}</script>`,
      ].filter(Boolean).join('\n    ')
      const withImage = origin
        ? html.replaceAll('content="/images/star-media-agency-poster.png"', `content="${image}"`)
        : html
      return withImage.replace('</head>', `    ${tags}\n  </head>`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, '')
  return {
  appType: 'mpa',
  plugins: [
    react(),
    tailwindcss(),
    seoPlugin(env.VITE_SITE_URL),
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react';
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'motion';
          }
        },
      },
    },
  },
  }
})

