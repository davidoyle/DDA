// Fails the build when a public page breaks an SEO, link, copy or metadata rule.
// Runs after `vite build` and the prerender step.
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { banner, isProduction } from './lib/env.mjs';
import { loadRouter } from './lib/routing.mjs';
import { buildFileRoutes, buildTitleRoutes, parsePage } from '../src/lib/markdown.mjs';
import { LOCALE, OG_IMAGE, SITE, canonicalUrl, jsonLdFor } from '../src/lib/seo.mjs';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const read = (p) => readFile(path.join(root, p), 'utf8');
const walk = async (dir) => (await readdir(path.join(root, dir), { withFileTypes: true, recursive: true })).filter((e) => e.isFile()).map((e) => path.posix.join(path.relative(root, e.parentPath).split(path.sep).join('/'), e.name));
const failures = [], fail = (m) => failures.push(m);
const decode = (s) => s.replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');

const manifest = JSON.parse(await read('src/content/public-pages.json'));
const routes = new Set(manifest.map((p) => p.route));
const fileRoutes = buildFileRoutes(manifest);
const titleRoutes = buildTitleRoutes(manifest);
if (routes.size !== manifest.length) fail('manifest contains duplicate routes');
if (new Set(manifest.map((p) => p.file)).size !== manifest.length) fail('manifest contains duplicate files');
for (const p of manifest) if (/selected-work|\/work\/?$/.test(p.route)) fail(`${p.route}: Selected Work is not allowed`);

// Every copy file is routed.
for (const f of (await walk('content')).filter((f) => f.endsWith('.md'))) if (!manifest.some((p) => p.file === f)) fail(`${f}: copy file has no manifest entry`);

// Metadata rules that apply to the manifest: length and uniqueness of every value shown in search and social.
const seen = { title: new Map(), description: new Map() };
for (const page of manifest) {
  if (!page.metaTitle || page.metaTitle.length > 60) fail(`${page.route}: title must be 1 to 60 characters (${page.metaTitle?.length ?? 0})`);
  if (!page.description || page.description.length > 160) fail(`${page.route}: description must be 1 to 160 characters (${page.description?.length ?? 0})`);
  for (const [kind, value] of [['title', page.metaTitle], ['description', page.description]]) {
    if (seen[kind].has(value)) fail(`${page.route}: ${kind} duplicates ${seen[kind].get(value)}`);
    seen[kind].set(value, page.route);
  }
}

for (const page of manifest) {
  let source;
  try { source = await read(page.file); } catch { fail(`${page.file}: missing`); continue; }
  if ((source.match(/^# /gm) || []).length !== 1) fail(`${page.file}: expected one H1`);
  let blocks;
  try { blocks = parsePage(source, page.file, fileRoutes, titleRoutes, page.route); } catch (e) { fail(e.message); continue; }
  const heads = blocks.filter((b) => b.type === 'heading');
  const ids = new Set();
  for (const h of heads) { if (ids.has(h.id)) fail(`${page.file}: duplicate heading id "${h.id}"`); ids.add(h.id); }
  for (const b of blocks) if (b.type === 'toc') for (const item of b.items) if (!ids.has(item.slug)) fail(`${page.file}: "On this page" entry "${item.text}" matches no heading`);
  if (/\]\([^)]*\.md\)/.test(JSON.stringify(blocks))) fail(`${page.file}: an unconverted .md link remains`);
  if (page.type === 'contact' && !heads.some((b) => b.text === 'What to send')) fail(`${page.file}: the form is placed under "What to send", which is missing`);
  if (page.finding) {
    const plain = source.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*/g, '');
    if (!plain.includes(page.finding)) fail(`${page.route}: key finding is not a verbatim quote from the article`);
  }
  if (page.relatedService && !routes.has(page.relatedService)) fail(`${page.route}: related service ${page.relatedService} is not a page`);
  if (/\btel:|selected-work/i.test(source)) fail(`${page.file}: contains a phone link or a Selected Work reference`);
}

// Article figures are served from /public and must match the copy folder.
for (const f of await walk('content/insights/assets')) {
  const a = await read(f).catch(() => null), b = await read(f.replace('content/', 'public/')).catch(() => null);
  if (a === null || a !== b) fail(`${f}: public copy is missing or differs`);
}

// Social image.
if (!existsSync(path.join(root, 'public/og-card.png'))) fail(`OG image public/og-card.png is missing (${OG_IMAGE})`);

// robots.txt and static files.
const robots = await read('public/robots.txt').catch(() => '');
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail('robots.txt does not list the sitemap');
if (/^Disallow:\s*\/\s*$/m.test(robots)) fail('robots.txt blocks the whole site');

// Redirects and status codes, through the same route table Vercel builds from vercel.json.
const router = await loadRouter(root);
const isRoute = (d) => routes.has(d) || /^\/tools\/?$/.test(d) || /^\/tools\/[\w-]+\/?$/.test(d) || d.startsWith(`${SITE}/`);
for (const r of router.config.redirects) {
  if (r.permanent !== true) fail(`redirect ${r.source}: not permanent`);
  if (!isRoute(r.destination.replace(/:path[*+]\/?$/, '').replace(/\$1$/, ''))) fail(`redirect ${r.source} -> ${r.destination}: destination is not a live route`);
  if (!r.has && routes.has(r.source)) fail(`redirect ${r.source} shadows a live page`);
  if (!r.has) {
    const sample = r.source.replace(/\/?:path\*$/, '').replace(/\/:path\+$/, '/x');
    const hops = router.follow(sample);
    if (hops.filter((h) => h.location).length !== 1 || hops.at(-1).status !== 200) fail(`redirect ${sample}: expected one hop to a 200, got ${hops.map((h) => h.status).join(' > ')}`);
  }
}
// vercel.json keeps the catch-all SPA rewrite, so unknown URLs return 200 with the in-app not-found page.

// Generated HTML (present after `vite build` and the prerender step).
const sitemap = await readFile(path.join(root, 'dist/sitemap.xml'), 'utf8').catch(() => null);
if (sitemap === null) console.log('dist not built: skipped generated HTML checks.');
else {
  const todoPages = [];
  const pageValues = { title: new Map(), description: new Map() };
  const tag = (html, attr, key) => decode(html.match(new RegExp(`<meta\\s+${attr}="${key}"\\s+content="([^"]*)"`))?.[1] ?? '');
  const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of sitemapLocs) if (!loc.startsWith(`${SITE}/`) || !loc.endsWith('/') && !/\.\w+$/.test(loc)) fail(`sitemap: ${loc} is not a canonical URL`);
  for (const page of manifest) {
    const where = page.route;
    if (!sitemapLocs.includes(canonicalUrl(page.route))) fail(`${where}: missing from sitemap`);
    const html = await readFile(path.join(root, 'dist', page.route === '/' ? '' : page.route, 'index.html'), 'utf8').catch(() => '');
    if (!html) { fail(`${where}: no generated HTML`); continue; }
    // Head values.
    const title = decode(html.match(/<title>(.*?)<\/title>/)?.[1] ?? '');
    const description = tag(html, 'name', 'description');
    if (title !== page.metaTitle) fail(`${where}: <title> differs from the manifest`);
    if (description !== page.description) fail(`${where}: meta description differs from the manifest`);
    for (const [attr, key, expect] of [['property', 'og:title', page.metaTitle], ['name', 'twitter:title', page.metaTitle], ['property', 'og:description', page.description], ['name', 'twitter:description', page.description]]) if (tag(html, attr, key) !== expect) fail(`${where}: ${key} differs from the manifest`);
    for (const [kind, value] of [['title', title], ['description', description]]) { if (pageValues[kind].has(value)) fail(`${where}: generated ${kind} duplicates ${pageValues[kind].get(value)}`); pageValues[kind].set(value, where); }
    if (title.length > 60) fail(`${where}: title over 60 characters`);
    if (description.length > 160) fail(`${where}: description over 160 characters`);
    // H1.
    const h1s = html.match(/<h1[\s>]/g) || [];
    if (h1s.length === 0) fail(`${where}: no H1`);
    if (h1s.length > 1) fail(`${where}: ${h1s.length} H1 elements`);
    // Canonical.
    const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((m) => m[1]);
    if (canonicals.length === 0) fail(`${where}: canonical missing`);
    else if (canonicals.length > 1) fail(`${where}: more than one canonical`);
    else if (!canonicals[0].startsWith(`${SITE}/`)) fail(`${where}: canonical ${canonicals[0]} is not on ${SITE}`);
    else if (canonicals[0] !== canonicalUrl(page.route)) fail(`${where}: canonical ${canonicals[0]} is not this page`);
    if (tag(html, 'property', 'og:url') !== canonicalUrl(page.route)) fail(`${where}: og:url is not the canonical URL`);
    // Language, viewport, robots, social.
    if (!/<html lang="en-CA"/.test(html)) fail(`${where}: html lang must be en-CA`);
    if (!/<meta name="viewport"/.test(html)) fail(`${where}: viewport meta missing`);
    if (!/<meta name="robots" content="index, follow, max-image-preview:large"/.test(html)) fail(`${where}: robots meta must be index, follow, max-image-preview:large`);
    if (tag(html, 'property', 'og:image') !== OG_IMAGE || tag(html, 'name', 'twitter:image') !== OG_IMAGE) fail(`${where}: og:image and twitter:image must be ${OG_IMAGE}`);
    if (tag(html, 'name', 'twitter:card') !== 'summary_large_image') fail(`${where}: twitter:card must be summary_large_image`);
    if (tag(html, 'property', 'og:type') !== (page.type === 'article' ? 'article' : 'website')) fail(`${where}: og:type is wrong`);
    if (tag(html, 'property', 'og:site_name') !== 'DDA') fail(`${where}: og:site_name must be DDA`);
    if (tag(html, 'property', 'og:locale') !== LOCALE) fail(`${where}: og:locale must be ${LOCALE}`);
    // JSON-LD.
    const scripts = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/g)].map((m) => m[1]);
    if (scripts.length === 0) fail(`${where}: JSON-LD missing`);
    const parsed = [];
    for (const s of scripts) { try { parsed.push(JSON.parse(s)); } catch { fail(`${where}: JSON-LD is not valid JSON`); } }
    const expected = jsonLdFor(page, manifest);
    if (JSON.stringify(parsed) !== JSON.stringify(expected)) fail(`${where}: JSON-LD does not match what the manifest generates`);
    const kinds = parsed.map((b) => b['@type']);
    const need = [...(page.route === '/' ? ['ProfessionalService', 'WebSite'] : []), ...(page.type === 'capability' || page.type === 'area' ? ['Service'] : []), ...(page.type === 'article' ? ['Article'] : []), ...(page.route === '/' ? [] : ['BreadcrumbList'])];
    for (const k of need) if (!kinds.includes(k)) fail(`${where}: JSON-LD ${k} missing`);
    for (const b of parsed) {
      if (b['@context'] !== 'https://schema.org') fail(`${where}: JSON-LD ${b['@type']} has no schema.org @context`);
      const flat = JSON.stringify(b);
      if (/"(telephone|streetAddress|postalCode|datePublished|dateModified|sameAs)"/.test(flat)) fail(`${where}: JSON-LD ${b['@type']} carries a property that was not approved`);
      if (b['@type'] === 'Article') for (const k of ['headline', 'author', 'publisher', 'description', 'image']) if (!b[k]) fail(`${where}: Article is missing ${k}`);
      if (b['@type'] === 'Service') for (const k of ['name', 'description', 'provider', 'areaServed']) if (!b[k]) fail(`${where}: Service is missing ${k}`);
      if (b['@type'] === 'BreadcrumbList') { b.itemListElement.forEach((it, i) => { if (it.position !== i + 1 || !it.name || !it.item) fail(`${where}: BreadcrumbList item ${i + 1} is malformed`); }); if (b.itemListElement.at(-1)?.item !== canonicalUrl(page.route)) fail(`${where}: BreadcrumbList must end at this page`); }
    }
    // Images: every <img> has alt; content images have text.
    for (const m of html.matchAll(/<img\b[^>]*>/g)) {
      if (!/\balt="/.test(m[0])) fail(`${where}: image without alt: ${m[0].slice(0, 80)}`);
      else if (/<figure><img/.test(html.slice(Math.max(0, m.index - 8), m.index + 12)) && /\balt=""/.test(m[0])) fail(`${where}: figure image has empty alt`);
      const src = m[0].match(/\bsrc="([^"]+)"/)?.[1];
      if (src?.startsWith('/') && !existsSync(path.join(root, 'dist', src))) fail(`${where}: image ${src} does not exist`);
    }
    // Duplicate ids and in-page anchors.
    const idList = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    const dup = idList.find((x, i) => idList.indexOf(x) !== i);
    if (dup) fail(`${where}: duplicate id "${dup}"`);
    // Internal links resolve, and none needs a redirect.
    const body = html.slice(html.indexOf('<div id="root">'));
    for (const m of body.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
      const href = decode(m[1]);
      if (href.startsWith('#')) { if (!idList.includes(href.slice(1))) fail(`${where}: anchor ${href} matches no id`); continue; }
      if (/^(mailto:|tel:)/.test(href)) continue;
      if (/^https?:/.test(href) && !href.startsWith(`${SITE}/`)) continue;
      const hops = router.follow(href.replace(SITE, ''));
      if (hops.at(-1).status !== 200) fail(`${where}: link ${href} resolves to ${hops.at(-1).status}`);
      else if (hops.length > 1) fail(`${where}: link ${href} needs a redirect; link the canonical URL`);
    }
    if (/\bTODO\b/.test(html)) todoPages.push(page.route);
    if (/<form|tel:/i.test(html)) fail(`${where}: unexpected form or phone link in static HTML`);
  }
  if (todoPages.length) {
    if (isProduction()) fail(`TODO is present in generated HTML: ${todoPages.join(', ')}`);
    else banner(['TODO IS PRESENT IN GENERATED HTML FOR: ' + todoPages.join(', '), 'This is a preview build. A production build fails.']);
  }
  const notFound = await readFile(path.join(root, 'dist/404.html'), 'utf8').catch(() => '');
  if (!/noindex/.test(notFound)) fail('404.html must carry noindex');
}

if (failures.length) { console.error(`Public-site audit failed (${failures.length}):\n- ${failures.join('\n- ')}`); process.exit(1); }
console.log(`Public-site audit passed: ${manifest.length} routes, ${router.config.redirects.length} redirects, copy, links, metadata, JSON-LD, social tags and sitemap.`);
