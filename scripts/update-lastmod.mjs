// Run from a full clone, after committing: npm run lastmod
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { gitDate, isShallow, sha } from './lib/lastmod.mjs';

const root = path.resolve(new URL('..', import.meta.url).pathname);
if (isShallow(root)) { console.error('Shallow clone: cannot compute lastmod. Run this from a full clone.'); process.exit(1); }
const manifest = JSON.parse(await readFile(path.join(root, 'src/content/public-pages.json'), 'utf8'));
const cache = {};
for (const { file } of manifest) { const lastmod = gitDate(root, file); if (lastmod) cache[file] = { lastmod, sha: await sha(root, file) }; }
await writeFile(path.join(root, 'src/content/lastmod.json'), `${JSON.stringify(cache, null, 2)}\n`);
console.log(`Wrote src/content/lastmod.json for ${Object.keys(cache).length} source files.`);
