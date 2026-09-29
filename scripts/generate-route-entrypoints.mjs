import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { buildFileRoutes, buildTitleRoutes, parsePage } from '../src/lib/markdown.mjs';
import { LOCALE, OG_IMAGE, canonicalUrl, jsonLdFor, trail } from '../src/lib/seo.mjs';
import { lastmods } from './lib/lastmod.mjs';

const root = path.resolve(new URL('..', import.meta.url).pathname), dist = path.join(root, 'dist');
const manifest = JSON.parse(await readFile(path.join(root, 'src/content/public-pages.json'), 'utf8'));
const fileRoutes = buildFileRoutes(manifest);
const titleRoutes = buildTitleRoutes(manifest);
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

async function sitemapXml() {
  const { out, shallow } = await lastmods(root, manifest.map((p) => p.file));
  const missing = manifest.filter((p) => !out[p.file]).length;
  if (missing) console.warn(`sitemap: no lastmod for ${missing} page(s)${shallow ? ' (shallow clone and no fresh src/content/lastmod.json; run `npm run lastmod` from a full clone)' : ''}.`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${manifest.map((p) => `  <url><loc>${canonicalUrl(p.route)}</loc>${out[p.file] ? `<lastmod>${out[p.file]}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>\n`;
}

// `node scripts/generate-route-entrypoints.mjs --sitemap` refreshes public/sitemap.xml only.
if (process.argv.includes('--sitemap')) {
  await writeFile(path.join(root, 'public/sitemap.xml'), await sitemapXml());
  console.log(`Wrote public/sitemap.xml (${manifest.length} routes).`);
  process.exit(0);
}

const inline = (tokens) => tokens.map((t) => t.t === 'text' ? escape(t.v) : t.t === 'strong' ? `<strong>${inline(t.c)}</strong>` : t.t === 'em' ? `<em>${inline(t.c)}</em>` : `<a href="${escape(t.href)}">${inline(t.c)}</a>`).join('');

function render(blocks) {
  const levels = [...new Set(blocks.filter((b) => b.type === 'heading').map((b) => b.level))].sort((a, b) => a - b);
  const out = [];
  for (const b of blocks) {
    if (b.type === 'heading') { const l = Math.min(6, levels.indexOf(b.level) + 1); out.push(`<h${l} id="${b.id}">${inline(b.tokens)}</h${l}>`); }
    else if (b.type === 'paragraph') out.push(`<p>${b.lines.map(inline).join('<br>')}</p>`);
    else if (b.type === 'list') out.push(`<ul>${b.items.map((x) => `<li>${inline(x)}</li>`).join('')}</ul>`);
    else if (b.type === 'quote') out.push(`<blockquote><p>${b.lines.map(inline).join('<br>')}</p></blockquote>`);
    else if (b.type === 'image') out.push(`<figure><img src="${escape(b.src)}" alt="${escape(b.alt)}">${b.caption ? `<figcaption>${inline(b.caption)}</figcaption>` : ''}</figure>`);
    else if (b.type === 'toc') out.push(`<nav aria-label="${escape(b.label)}"><strong>${escape(b.label)}</strong>\n${b.items.map((x) => `<a href="#${x.slug}">${escape(x.text)}</a>`).join('\n')}</nav>`);
    else if (b.type === 'table') out.push(`<table><thead><tr>${b.header.map((h) => `<th scope="col">${inline(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${inline(c)}</th>` : `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
  }
  return out.join('\n');
}

const linkList = (pages) => pages.map((p) => `<a href="${p.route}">${escape(p.title)}</a>`).join('');
const byType = (t) => manifest.filter((p) => p.type === t);
const find = (route) => manifest.find((p) => p.route === route);
const footer = `<footer class="site-footer"><div class="footer-grid"><div><div class="brand">DDA</div><p>Deep investigation and analysis for complex public, industrial, regulated, and institutional problems.</p><p>DDA: Diagnostics, Dataflow, Analysis.</p><p>Metro Vancouver, British Columbia</p></div><nav aria-label="Footer navigation"><h2>Navigate</h2>${linkList(['/what-we-do/', '/insights/', '/who-we-are/', '/public-interest/', '/for-consulting-teams/'].map(find))}<a href="/contact/">Talk to DDA</a></nav><nav aria-label="Capabilities"><h2>Capabilities</h2>${linkList(byType('capability'))}</nav><nav aria-label="Areas"><h2>Areas</h2>${linkList(byType('area'))}</nav><div><h2>Information</h2><a href="/tools/">Diagnostic tools</a>${linkList(byType('utility'))}</div></div></footer>`;

// Replace an existing tag in the shell. A missing tag is a build error, not a silent skip.
const swap = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) throw new Error(`index.html is missing ${label}`);
  return html.replace(pattern, () => replacement);
};
const metaTag = (attr, key, value) => new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`);

const shell = await readFile(path.join(dist, 'index.html'), 'utf8');
if (shell.includes('static-shell')) throw new Error('dist/index.html is already prerendered. Run `vite build` first.');

for (const page of manifest) {
  const source = await readFile(path.join(root, page.file), 'utf8');
  const blocks = parsePage(source, page.file, fileRoutes, titleRoutes, page.route);
  const canonical = canonicalUrl(page.route);
  const title = escape(page.metaTitle), description = escape(page.description);
  let html = shell;
  html = swap(html, /<title>.*?<\/title>/, `<title>${title}</title>`, '<title>');
  html = swap(html, metaTag('name', 'description'), `<meta name="description" content="${description}" />`, 'meta description');
  html = swap(html, metaTag('property', 'og:title'), `<meta property="og:title" content="${title}" />`, 'og:title');
  html = swap(html, metaTag('property', 'og:description'), `<meta property="og:description" content="${description}" />`, 'og:description');
  html = swap(html, metaTag('property', 'og:type'), `<meta property="og:type" content="${page.type === 'article' ? 'article' : 'website'}" />`, 'og:type');
  html = swap(html, metaTag('name', 'twitter:title'), `<meta name="twitter:title" content="${title}" />`, 'twitter:title');
  html = swap(html, metaTag('name', 'twitter:description'), `<meta name="twitter:description" content="${description}" />`, 'twitter:description');
  for (const [attr, key] of [['property', 'og:image'], ['name', 'twitter:image']]) html = swap(html, metaTag(attr, key), `<meta ${attr}="${key}" content="${OG_IMAGE}" />`, key);
  html = swap(html, metaTag('property', 'og:locale'), `<meta property="og:locale" content="${LOCALE}" />`, 'og:locale');
  const ld = jsonLdFor(page, manifest).map((b) => `<script type="application/ld+json" data-page="${page.route}">${JSON.stringify(b).replaceAll('<', '\\u003c')}</script>`).join('');
  html = swap(html, /<\/head>/, `<link rel="canonical" href="${canonical}" /><meta property="og:url" content="${canonical}" />${ld}</head>`, '</head>');
  const crumbs = trail(page, manifest);
  const breadcrumb = crumbs.length ? `<nav class="public-breadcrumb" aria-label="Breadcrumb">${crumbs.map((c, i) => i < crumbs.length - 1 ? `<a href="${c.route}">${escape(c.name)}</a><span aria-hidden="true">/</span>` : `<span aria-current="page">${escape(c.name)}</span>`).join('')}</nav>` : '';
  html = swap(html, /<div id="root"><\/div>/, `<div id="root"><div class="site-shell static-shell"><header class="site-header"><div class="nav-wrap"><a class="brand" href="/" aria-label="DDA home"><img class="brand-logo" src="/images/dda-logo-white-small.png" alt="" width="348" height="125"></a><nav class="static-nav" aria-label="Primary navigation"><a href="/what-we-do/">What we do</a><a href="/insights/">Insights</a><a href="/who-we-are/">Who we are</a><a class="nav-contact" href="/contact/">Talk to DDA</a></nav></div></header>${breadcrumb}<main class="static-public template-${page.type}"><article>${render(blocks)}</article></main>${footer}</div></div>`, 'root element');
  const dir = page.route === '/' ? dist : path.join(dist, page.route);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
}
await writeFile(path.join(dist, 'sitemap.xml'), await sitemapXml());
console.log(`Prerendered HTML, metadata, JSON-LD and sitemap for ${manifest.length} public routes.`);
