// Verifies the manifest, the copy files, links, redirects, generated HTML and sitemap.
// Run automatically at the end of `npm run build`.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { banner, isProduction } from './lib/env.mjs';
import { buildFileRoutes, buildTitleRoutes, parsePage } from '../src/lib/markdown.mjs';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const read = (p) => readFile(path.join(root, p), 'utf8');
const walk = async (dir) => (await readdir(path.join(root, dir), { withFileTypes: true, recursive: true })).filter((e) => e.isFile()).map((e) => path.posix.join(path.relative(root, e.parentPath).split(path.sep).join('/'), e.name));
const failures = [], fail = (m) => failures.push(m);

const manifest = JSON.parse(await read('src/content/public-pages.json'));
const routes = new Set(manifest.map((p) => p.route));
const fileRoutes = buildFileRoutes(manifest);
const titleRoutes = buildTitleRoutes(manifest);
if (routes.size !== manifest.length) fail('manifest contains duplicate routes');
if (new Set(manifest.map((p) => p.file)).size !== manifest.length) fail('manifest contains duplicate files');
for (const p of manifest) if (/selected-work|\/work\/?$/.test(p.route)) fail(`${p.route}: Selected Work is not allowed`);

// Every copy file is routed, and every routed file exists.
const copyFiles = (await walk('content')).filter((f) => f.endsWith('.md'));
for (const f of copyFiles) if (!manifest.some((p) => p.file === f)) fail(`${f}: copy file has no manifest entry`);

const titles = new Map();
for (const page of manifest) {
  if (page.description.length === 0 || page.description.length > 160) fail(`${page.route}: description must be 1 to 160 characters (${page.description.length})`);
  if (titles.has(page.title)) fail(`${page.route}: title duplicates ${titles.get(page.title)}`);
  titles.set(page.title, page.route);
  let source;
  try { source = await read(page.file); } catch { fail(`${page.file}: missing`); continue; }
  if ((source.match(/^# /gm) || []).length !== 1) fail(`${page.file}: expected one H1`);
  if (!page.title || !source.includes(`# ${page.title}`) && page.type !== 'utility') fail(`${page.file}: title does not match the H1`);
  let blocks;
  try { blocks = parsePage(source, page.file, fileRoutes, titleRoutes, page.route); } catch (e) { fail(e.message); continue; }
  const ids = new Set(blocks.filter((b) => b.type === 'heading').map((b) => b.id));
  for (const b of blocks) if (b.type === 'toc') for (const item of b.items) if (!ids.has(item.slug)) fail(`${page.file}: "On this page" entry "${item.text}" matches no heading`);
  if (/\]\([^)]*\.md\)/.test(JSON.stringify(blocks))) fail(`${page.file}: an unconverted .md link remains`);
  if (page.finding) {
    const plain = source.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*/g, '');
    if (!plain.includes(page.finding)) fail(`${page.route}: key finding is not a verbatim quote from the article`);
  }
  if (page.relatedService && !routes.has(page.relatedService)) fail(`${page.route}: related service ${page.relatedService} is not a page`);
  if (page.type === 'contact' && !blocks.some((b) => b.type === 'heading' && b.text === 'What to send')) fail(`${page.file}: the form is placed under "What to send", which is missing`);
  const ctaLinks = JSON.stringify(blocks).match(/"href":"[^"]*","t":"link"|"t":"link","c":\[\{"t":"text","v":"Talk to DDA"\}\],"href":"[^"]*"/g) || [];
  for (const m of ctaLinks) if (!m.includes('/contact/')) fail(`${page.file}: a "Talk to DDA" link does not go to /contact/`);
  if (/\btel:|selected-work/i.test(source)) fail(`${page.file}: contains a phone link or a Selected Work reference`);
}

// Article figures are served from /public and must match the copy folder.
for (const f of await walk('content/insights/assets')) {
  const a = await read(f).catch(() => null), b = await read(f.replace('content/', 'public/')).catch(() => null);
  if (a === null || a !== b) fail(`${f}: public copy is missing or differs`);
}

// Redirects: permanent, land on a real route, and never chain.
const vercel = JSON.parse(await read('vercel.json'));
const isRoute = (d) => routes.has(d) || /^\/tools(\/|$)/.test(d) || d.startsWith('https://ddanalytics.ca/');
for (const r of vercel.redirects) {
  if (r.permanent !== true) fail(`redirect ${r.source}: not permanent`);
  if (!isRoute(r.destination.split(':path')[0].replace(/\$1$/, ''))) fail(`redirect ${r.source} -> ${r.destination}: destination is not a live route`);
  if ([...routes].some((x) => x === r.source || x === `${r.source}/`)) fail(`redirect ${r.source} shadows a live page`);
}

// Generated HTML (present after `vite build`).
const dist = await readFile(path.join(root, 'dist/sitemap.xml'), 'utf8').catch(() => null);
if (dist === null) console.log('dist not built: skipped generated HTML checks.');
else {
  const todoPages = [];
  for (const page of manifest) {
    if (!dist.includes(`<loc>https://ddanalytics.ca${page.route}</loc>`)) fail(`${page.route}: missing from sitemap`);
    const html = await readFile(path.join(root, 'dist', page.route === '/' ? '' : page.route, 'index.html'), 'utf8').catch(() => '');
    const h1 = (await read(page.file)).match(/^# (.+)$/m)?.[1];
    if (!html.includes(`>${h1.replace(/&/g, '&amp;')}</h1>`)) fail(`${page.route}: generated HTML lacks the H1`);
    if (!html.includes(`rel="canonical" href="https://ddanalytics.ca${page.route}"`)) fail(`${page.route}: canonical missing`);
    if ((html.match(/<link rel="canonical"/g) || []).length !== 1) fail(`${page.route}: canonical is not unique`);
    if (!html.includes(`content="${page.description.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`)) fail(`${page.route}: meta description missing`);
    if (/\bTODO\b/.test(html)) todoPages.push(page.route);
    if (/<form|tel:/i.test(html)) fail(`${page.route}: unexpected form or phone link in static HTML`);
  }
  if (todoPages.length) {
    if (isProduction()) fail(`TODO is present in generated HTML: ${todoPages.join(', ')}`);
    else banner(['TODO IS PRESENT IN GENERATED HTML FOR: ' + todoPages.join(', '), 'This is a preview build. A production build fails.']);
  }
}

if (failures.length) { console.error(`Public-site audit failed (${failures.length}):\n- ${failures.join('\n- ')}`); process.exit(1); }
console.log(`Public-site audit passed: ${manifest.length} routes, copy files, links, redirects, metadata and sitemap.`);
