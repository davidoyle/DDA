// SEO data shared by the client (document head) and the prerender script.
export const SITE = 'https://ddanalytics.ca';
export const OG_IMAGE = `${SITE}/og-card.png`;
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;
export const LOCALE = 'en_CA';

export const canonicalUrl = (route) => `${SITE}${route}`;

const PERSON = { '@type': 'Person', name: 'David Doyle', jobTitle: 'Principal', url: canonicalUrl('/who-we-are/') };
const AREA_SERVED = [{ '@type': 'AdministrativeArea', name: 'British Columbia' }, { '@type': 'Country', name: 'Canada' }];

// Breadcrumb trail for a page: Home, the section page where one exists, then the page.
export function trail(page, manifest) {
  if (page.route === '/') return [];
  const parentRoute = page.type === 'capability' || page.type === 'area' ? '/what-we-do/' : page.type === 'article' ? '/insights/' : null;
  const parent = parentRoute && manifest.find((p) => p.route === parentRoute);
  return [{ name: 'Home', route: '/' }, ...(parent ? [{ name: parent.title, route: parent.route }] : []), { name: page.title, route: page.route }];
}

export function jsonLdFor(page, manifest) {
  const blocks = [];
  if (page.route === '/') {
    const capabilities = manifest.filter((p) => p.type === 'capability').map((p) => p.title);
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': ORG_ID,
      name: 'DDA',
      alternateName: ['Diagnostics, Dataflow, Analysis'],
      url: `${SITE}/`,
      email: 'david.doyle@ddanalytics.ca',
      areaServed: AREA_SERVED,
      address: { '@type': 'PostalAddress', addressRegion: 'BC', addressCountry: 'CA' },
      founder: { '@type': 'Person', name: 'David Doyle', jobTitle: 'Principal' },
      knowsAbout: capabilities,
    });
    blocks.push({ '@context': 'https://schema.org', '@type': 'WebSite', '@id': WEBSITE_ID, name: 'DDA', url: `${SITE}/` });
  }
  if (page.type === 'capability' || page.type === 'area') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.title,
      description: page.description,
      url: canonicalUrl(page.route),
      provider: { '@id': ORG_ID },
      areaServed: AREA_SERVED,
    });
  }
  if (page.type === 'article') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: page.title,
      description: page.description,
      url: canonicalUrl(page.route),
      mainEntityOfPage: canonicalUrl(page.route),
      author: PERSON,
      publisher: { '@id': ORG_ID },
      image: [OG_IMAGE],
    });
  }
  const crumbs = trail(page, manifest);
  if (crumbs.length) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: canonicalUrl(c.route) })),
    });
  }
  return blocks;
}
