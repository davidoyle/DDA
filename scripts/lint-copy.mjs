// Copy lint. Runs before every build and never edits copy.
//   Always fails:            em dashes, "rather than"
//   Fails in production:     TODO   (VERCEL_ENV=production, or DDA_STRICT=1)
//   Warns loudly elsewhere:  TODO   (preview and local builds still render the page)
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { banner, isProduction } from './lib/env.mjs';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const manifest = JSON.parse(await readFile(path.join(root, 'src/content/public-pages.json'), 'utf8'));
const errors = [], todos = [];

for (const page of manifest) {
  const source = await readFile(path.join(root, page.file), 'utf8');
  source.split('\n').forEach((line, i) => {
    const where = `${page.file}:${i + 1}`;
    if (line.includes('—')) errors.push(`${where} em dash`);
    if (/rather than/i.test(line)) errors.push(`${where} "rather than"`);
    if (/\bTODO\b/.test(line)) todos.push(`${where} ${page.route}  ${line.trim().slice(0, 120)}`);
  });
}

if (todos.length) {
  if (isProduction()) errors.push(...todos.map((t) => `${t}  (TODO blocks production)`));
  else banner(['TODO FOUND IN PUBLISHED COPY. THIS PREVIEW SHOWS IT. PRODUCTION WILL FAIL.', ...todos]);
}
if (errors.length) {
  console.error(`Copy lint failed (${errors.length}):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`Copy lint passed: ${manifest.length} pages${todos.length ? `, ${todos.length} TODO warning(s)` : ''}.`);
