// Resolves a request against vercel.json the way Vercel does. The route table comes from
// @vercel/routing-utils (the code Vercel itself uses to turn vercel.json into routes), so redirect
// order and trailing-slash behaviour are real. Filesystem lookup and the 404 fallback are emulated.
import { existsSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getTransformedRoutes } from '@vercel/routing-utils';

export async function loadRouter(root) {
  const config = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'));
  const { routes, error } = getTransformedRoutes({ trailingSlash: config.trailingSlash, redirects: config.redirects, rewrites: config.rewrites });
  if (error) throw new Error(`vercel.json is invalid: ${error.message}`);
  const dist = path.join(root, 'dist');
  const fileFor = (pathname) => {
    const clean = decodeURIComponent(pathname);
    for (const candidate of [path.join(dist, clean), path.join(dist, clean, 'index.html')]) {
      if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
    }
    return null;
  };
  const substitute = (template, match) => template.replace(/\$(\d+)/g, (_, n) => match[Number(n)] ?? '');
  const hasHost = (r, host) => !r.has || r.has.every((h) => h.type !== 'host' || new RegExp(`^${h.value}$`).test(host));

  // Returns { status, location?, file? } for one request.
  function resolve(pathname, host = 'ddanalytics.ca') {
    let phase = 'pre';
    for (const r of routes) {
      if (r.handle === 'filesystem') {
        phase = 'post';
        const f = fileFor(pathname);
        if (f) return { status: 200, file: f };
        continue;
      }
      const match = pathname.match(new RegExp(r.src));
      if (!match || !hasHost(r, host)) continue;
      if (r.headers?.Location && r.status) return { status: r.status, location: substitute(r.headers.Location, match) };
      if (r.dest && phase === 'post') { const f = fileFor(substitute(r.dest, match)); if (f) return { status: 200, file: f, rewritten: true }; }
    }
    const notFound = path.join(dist, '404.html');
    return { status: 404, file: existsSync(notFound) ? notFound : null };
  }

  // Follows redirects. Returns every hop, like curl -IL.
  function follow(url, host = 'ddanalytics.ca') {
    const hops = [];
    let current = url;
    for (let i = 0; i < 8; i++) {
      const isAbsolute = /^https?:\/\//.test(current);
      const u = new URL(current, `https://${host}`);
      const h = isAbsolute ? u.host : host;
      const r = resolve(u.pathname, h);
      hops.push({ url: `${u.protocol}//${h}${u.pathname}`, status: r.status, location: r.location, rewritten: r.rewritten });
      if (!r.location) break;
      current = r.location;
    }
    return hops;
  }
  return { resolve, follow, routes, config };
}
