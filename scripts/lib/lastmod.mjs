// lastmod for the sitemap: the date of the last git commit that touched each page's source file.
// Vercel clones shallowly, so history is unreliable there. A shallow clone falls back to
// src/content/lastmod.json (written by `npm run lastmod` from a full clone) and only trusts an
// entry whose content hash still matches the file. Anything else gets no lastmod.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const git = (root, args) => { try { return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };
export const isShallow = (root) => git(root, ['rev-parse', '--is-shallow-repository']) !== 'false';
export const sha = async (root, file) => createHash('sha1').update(await readFile(path.join(root, file))).digest('hex');
export const gitDate = (root, file) => git(root, ['log', '-1', '--format=%cs', '--', file]);

export async function lastmods(root, files) {
  const shallow = isShallow(root);
  const cache = JSON.parse(await readFile(path.join(root, 'src/content/lastmod.json'), 'utf8').catch(() => '{}'));
  const out = {};
  for (const file of files) {
    const fromGit = shallow ? '' : gitDate(root, file);
    if (fromGit) { out[file] = fromGit; continue; }
    const hit = cache[file];
    if (hit && hit.sha === await sha(root, file)) out[file] = hit.lastmod;
  }
  return { out, shallow };
}
