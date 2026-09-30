// Usage:
//   node scripts/check-routing.mjs            print curl -I style results for every redirect and the 404 test
//   node scripts/check-routing.mjs --serve 4175   serve dist/ with vercel.json routing, for curl and Lighthouse
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { loadRouter } from './lib/routing.mjs';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const { resolve, follow, config } = await loadRouter(root);
const types = { '.html': 'text/html; charset=utf-8', ".js": "text/javascript", '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' };

const serveAt = process.argv.indexOf('--serve');
if (serveAt > -1) {
  const port = Number(process.argv[serveAt + 1] || 4175);
  createServer((req, res) => {
    const u = new URL(req.url, 'http://localhost');
    const r = resolve(u.pathname, req.headers.host?.startsWith('www.') ? req.headers.host : 'ddanalytics.ca');
    if (r.location) { res.writeHead(r.status, { Location: r.location }); return res.end(); }
    const type = types[path.extname(r.file || '.html')] || 'application/octet-stream';
    const headers = { 'Content-Type': type, 'Cache-Control': u.pathname.startsWith('/assets/') || u.pathname.startsWith('/fonts/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate' };
    if (!r.file) { res.writeHead(r.status, headers); return res.end(); }
    // Vercel compresses text responses. Do the same so timings are realistic.
    const accept = String(req.headers['accept-encoding'] || '');
    const compressible = /^(text\/|application\/(json|xml|javascript)|image\/svg)/.test(type);
    let body = readFileSync(r.file);
    if (compressible && /\bbr\b/.test(accept)) { body = brotliCompressSync(body); headers['Content-Encoding'] = 'br'; }
    else if (compressible && /\bgzip\b/.test(accept)) { body = gzipSync(body); headers['Content-Encoding'] = 'gzip'; }
    headers['Content-Length'] = body.length;
    res.writeHead(r.status, headers);
    if (req.method === 'HEAD') res.end(); else res.end(body);
  }).listen(port, () => console.log(`Serving dist with vercel.json routing on http://localhost:${port}`));
} else {
  const line = (hop) => `HTTP ${hop.status}${hop.location ? `  Location: ${hop.location}` : ''}${hop.rewritten ? '  (SPA rewrite to /index.html)' : ''}`;
  const show = (label, url, host) => {
    const hops = follow(url, host);
    console.log(`$ curl -IL ${host && host !== 'ddanalytics.ca' ? `-H 'Host: ${host}' ` : ''}https://ddanalytics.ca${url}`);
    hops.forEach((h) => console.log(`  ${line(h)}`));
    const redirects = hops.filter((h) => h.location).length;
    console.log(`  => ${label}: ${redirects} redirect hop${redirects === 1 ? '' : 's'}, final ${hops.at(-1).status}\n`);
    return { redirects, final: hops.at(-1).status };
  };
  let failures = 0;
  console.log('== Old URLs (with trailing slash, as they were indexed) ==\n');
  const samples = config.redirects.filter((r) => !r.has).map((r) => r.source.replace(/\/?:path\*\/$/, '/').replace(/\/:path\+\/$/, '/x/'));
  for (const s of samples) { const r = show('old URL', s); if (r.redirects !== 1 || r.final !== 200) failures++; }
  console.log('== Old URLs without a trailing slash ==\n');
  for (const s of samples.slice(0, 4)) { const r = show('old URL, no slash', s.replace(/\/$/, '')); if (r.final !== 200) failures++; }
  console.log('== Canonical, non-slash, www ==\n');
  show('canonical', '/what-we-do/areas/economic-development/');
  show('non-slash public URL', '/what-we-do/areas/economic-development');
  show('www host', '/what-we-do/', 'www.ddanalytics.ca');
  console.log('== Unknown URLs ==\n');
  for (const p of ['/this-page-does-not-exist/', '/what-we-do/areas/not-a-real-area/', '/this-page-does-not-exist']) { const r = show('unknown URL', p); if (r.final !== 404) failures++; }
  process.exit(failures ? 1 : 0);
}
