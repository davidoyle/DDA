import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { buildFileRoutes, inlineText, parsePage } from '../src/lib/markdown.mjs';

const root = path.resolve(new URL('..', import.meta.url).pathname), dist = path.join(root, 'dist');
const manifest = JSON.parse(await readFile(path.join(root, 'src/content/public-pages.json'), 'utf8'));
const fileRoutes = buildFileRoutes(manifest);
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${manifest.map((p) => `  <url><loc>https://ddanalytics.ca${p.route}</loc></url>`).join('\n')}\n</urlset>\n`;

// `node scripts/generate-route-entrypoints.mjs --sitemap` refreshes public/sitemap.xml only.
if (process.argv.includes('--sitemap')) {
  await writeFile(path.join(root, 'public/sitemap.xml'), sitemap);
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
    else if (b.type === 'image') out.push(`<figure><img src="${escape(b.src)}" alt="${escape(b.alt)}"></figure>`);
    else if (b.type === 'toc') out.push(`<nav aria-label="${escape(b.label)}"><strong>${escape(b.label)}</strong>\n${b.items.map((x) => `<a href="#${x.slug}">${escape(x.text)}</a>`).join("\n")}</nav>`);
    else if (b.type === 'table') out.push(`<table><thead><tr>${b.header.map((h) => `<th scope="col">${inline(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${inline(c)}</th>` : `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
  }
  return out.join('\n');
}

const shell = await readFile(path.join(dist, 'index.html'), 'utf8');
if (shell.includes('static-shell')) throw new Error('dist/index.html is already prerendered. Run `vite build` first.');
for (const page of manifest) {
  const source = await readFile(path.join(root, page.file), 'utf8');
  const blocks = parsePage(source, page.file, fileRoutes);
  const canonical = `https://ddanalytics.ca${page.route}`;
  const title = `${page.title} | DDA`;
  const html = shell
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${escape(page.description)}">`)
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escape(title)}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escape(page.description)}" />`)
    .replace(/<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${page.type === 'article' ? 'article' : 'website'}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escape(title)}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escape(page.description)}" />`)
    .replace('</head>', `<link rel="canonical" href="${canonical}" /><meta property="og:url" content="${canonical}" /></head>`)
    .replace('<div id="root"></div>', `<div id="root"><div class="site-shell static-shell"><header class="site-header"><div class="nav-wrap"><a class="brand" href="/" aria-label="DDA home"><img class="brand-logo" src="/images/dda-logo-white.png" alt="" width="870" height="313"></a><nav class="static-nav" aria-label="Primary navigation"><a href="/what-we-do/">What we do</a><a href="/insights/">Insights</a><a href="/who-we-are/">Who we are</a><a class="nav-contact" href="/contact/">Talk to DDA</a></nav></div></header><main class="static-public template-${page.type}"><article>${render(blocks)}</article></main><footer class="site-footer"><p><a href="/public-interest/">Public interest analysis</a> <a href="/privacy/">Privacy</a> <a href="/legal/">Legal</a> <a href="/terms/">Terms</a> <a href="/accessibility/">Accessibility</a></p></footer></div></div>`);
  const dir = page.route === '/' ? dist : path.join(dist, page.route);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
}
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`Prerendered HTML, metadata and sitemap for ${manifest.length} public routes.`);
