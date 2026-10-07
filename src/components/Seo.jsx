import { useEffect } from 'react';
import { absoluteUrl, HOME_DESCRIPTION, HOME_TITLE, SHARE_IMAGE_PATH, SITE_NAME } from '../seo/site';

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export default function Seo({
  title = HOME_TITLE,
  description = HOME_DESCRIPTION,
  path = '/',
  imagePath = SHARE_IMAGE_PATH,
  noindex = false,
}) {
  useEffect(() => {
    const url = absoluteUrl(path);
    const image = absoluteUrl(imagePath);

    document.title = title;
    document.documentElement.lang = 'en';
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    upsertLink('canonical', url);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', 'en_IN');
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', image);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);

    const schema = document.getElementById('star-media-schema');
    if (!schema) return undefined;
    try {
      const data = JSON.parse(schema.textContent);
      const graph = Array.isArray(data['@graph']) ? data['@graph'] : [];
      graph.forEach((node) => {
        if (node['@type'] === 'Organization' || (Array.isArray(node['@type']) && node['@type'].includes('Organization'))) {
          node.url = url;
          node.logo = absoluteUrl('/star-media-logo-transparent.png');
        }
        if (node['@type'] === 'WebSite' || node['@type'] === 'WebPage') {
          node.url = url;
        }
      });
      schema.textContent = JSON.stringify(data);
    } catch {
      /* leave the static schema in place */
    }
    return undefined;
  }, [title, description, path, imagePath, noindex]);

  return null;
}
