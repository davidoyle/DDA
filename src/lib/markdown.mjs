// Shared by the React app and the prerender script. Renders the approved copy
// exactly as written: no text is added, removed or reordered here.

const isImage = (s) => /^!\[[^\]]*\]\([^)]+\)$/.test(s);

export function parseInline(s) {
  const out = [];
  let buf = '';
  let i = 0;
  const flush = () => {
    if (!buf) return;
    // Bare email addresses become mailto links. The text is unchanged.
    let last = 0;
    for (const m of buf.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)) {
      if (m.index > last) out.push({ t: 'text', v: buf.slice(last, m.index) });
      out.push({ t: 'link', c: [{ t: 'text', v: m[0] }], href: `mailto:${m[0]}` });
      last = m.index + m[0].length;
    }
    if (last < buf.length) out.push({ t: 'text', v: buf.slice(last) });
    buf = '';
  };
  while (i < s.length) {
    if (s.startsWith('**', i)) {
      const j = s.indexOf('**', i + 2);
      if (j > i + 2) { flush(); out.push({ t: 'strong', c: parseInline(s.slice(i + 2, j)) }); i = j + 2; continue; }
    }
    if (s[i] === '*') {
      const j = s.indexOf('*', i + 1);
      if (j > i + 1) { flush(); out.push({ t: 'em', c: parseInline(s.slice(i + 1, j)) }); i = j + 1; continue; }
    }
    if (s[i] === '[') {
      const m = /^\[([^\]]+)\]\(([^)]*)\)/.exec(s.slice(i));
      if (m) { flush(); out.push({ t: 'link', c: parseInline(m[1]), href: m[2] }); i += m[0].length; continue; }
    }
    buf += s[i]; i++;
  }
  flush();
  return out;
}

export const inlineText = (tokens) => tokens.map((t) => (t.t === 'text' ? t.v : inlineText(t.c))).join('');

export function slugify(text) {
  return text.toLowerCase().replace(/^\d{2}\s+/, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const splitRow = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());

export function parseMarkdown(source) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  for (let i = 0; i < lines.length;) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }
    if (/^---+$/.test(line)) { blocks.push({ type: 'rule' }); i++; continue; }
    const h = /^(#{1,6}) (.+)$/.exec(line);
    if (h) { blocks.push({ type: 'heading', level: h[1].length, text: h[2].trim() }); i++; continue; }
    if (isImage(line)) {
      const m = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(line);
      blocks.push({ type: 'image', alt: m[1], src: m[2] }); i++; continue;
    }
    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) { rows.push(lines[i]); i++; }
      const cells = rows.map(splitRow).filter((r) => !r.every((c) => /^:?-{3,}:?$/.test(c)));
      blocks.push({ type: 'table', header: cells[0], rows: cells.slice(1) });
      continue;
    }
    if (line.startsWith('> ')) {
      const q = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) { q.push(lines[i].trim().slice(2)); i++; }
      blocks.push({ type: 'quote', lines: q }); continue;
    }
    if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) { items.push(lines[i].trim().slice(2)); i++; }
      blocks.push({ type: 'list', items }); continue;
    }
    const para = [];
    while (i < lines.length) {
      const l = lines[i].trim();
      if (!l || /^(#{1,6} |---+$|\||> |- )/.test(l) || isImage(l)) break;
      para.push(l); i++;
    }
    blocks.push({ type: 'paragraph', lines: para });
  }
  // An italic-only paragraph directly after an image is that figure's caption.
  for (let k = 0; k < blocks.length - 1; k++) {
    const b = blocks[k], n = blocks[k + 1];
    if (b.type === 'image' && n.type === 'paragraph' && n.lines.length === 1 && /^\*[^*]+\*$/.test(n.lines[0])) {
      b.caption = n.lines[0].slice(1, -1);
      blocks.splice(k + 1, 1);
    }
  }
  // "On this page" followed by one line per section title becomes a contents list.
  for (let k = 0; k < blocks.length - 1; k++) {
    const b = blocks[k], n = blocks[k + 1];
    if (b.type === 'paragraph' && b.lines.length === 1 && b.lines[0] === '**On this page**' && n.type === 'paragraph') {
      blocks.splice(k, 2, { type: 'toc', label: 'On this page', items: n.lines });
    }
  }
  return blocks;
}

const normalise = (p) => {
  const out = [];
  for (const part of p.split('/')) {
    if (part === '..') out.pop();
    else if (part && part !== '.') out.push(part);
  }
  return out.join('/');
};
const dirname = (p) => p.split('/').slice(0, -1).join('/');

// Old numbered file names still linked from the legal pages.
export const legacyRoutes = { '.mds/16-contact.md': '/contact/' };

export function buildFileRoutes(manifest) {
  return { ...legacyRoutes, ...Object.fromEntries(manifest.map((p) => [p.file, p.route])) };
}

export function resolveHref(href, text, fromFile, fileRoutes) {
  if (text === 'Talk to DDA') return '/contact/';
  if (/^(https?:|mailto:|tel:)/.test(href)) return href;
  if (href.startsWith('#')) throw new Error(`${fromFile}: unresolved anchor link "${text}" (${href})`);
  const target = normalise(`${dirname(fromFile)}/${href}`);
  if (href.endsWith('.md')) {
    // insights/index.md links to its siblings as "insights/x.md", which is relative to the copy root.
    const route = fileRoutes[target] ?? fileRoutes[normalise(`content/${href}`)];
    if (!route) throw new Error(`${fromFile}: link "${text}" points to ${href}, which is not a routed page`);
    return route;
  }
  if (target.startsWith('content/')) return `/${target.slice('content/'.length)}`;
  throw new Error(`${fromFile}: cannot resolve ${href}`);
}

// Titles of pages that other pages mention by name. Generic labels are left out.
const UNLINKED_TITLES = new Set(['Insights', 'Who we are', 'What we do', 'Talk to DDA']);
export function buildTitleRoutes(manifest) {
  return Object.fromEntries(manifest.filter((p) => p.file.startsWith('content/') && !UNLINKED_TITLES.has(p.title)).map((p) => [p.title, p.route]));
}

// Link an exact-case mention of a page title. Applies to an italic or bold title, and to a plain
// sentence that is the title (or a title of four words or more). Never inside an existing link.
function autolink(tokens, titleRoutes, self) {
  const titles = Object.keys(titleRoutes).sort((a, b) => b.length - a.length);
  const link = (title, c) => ({ t: 'link', href: titleRoutes[title], auto: true, c });
  const known = (title) => title in titleRoutes && titleRoutes[title] !== self;
  const out = [];
  for (const t of tokens) {
    if (t.t === 'link') { out.push(t); continue; }
    if (t.t === 'em' || t.t === 'strong') {
      if (!t.c.every((x) => x.t === 'text')) { out.push({ ...t, c: autolink(t.c, titleRoutes, self) }); continue; }
      const text = inlineText(t.c);
      if (known(text)) { out.push({ t: t.t, c: [link(text, t.c)] }); continue; }
      if (t.t === 'strong' && text.endsWith('.') && known(text.slice(0, -1))) {
        out.push({ t: 'strong', c: [link(text.slice(0, -1), [{ t: 'text', v: text.slice(0, -1) }]), { t: 'text', v: '.' }] });
        continue;
      }
      out.push(t); continue;
    }
    const found = [];
    for (const title of titles) {
      if (!known(title)) continue;
      const words = title.split(' ').length;
      for (let i = t.v.indexOf(title); i >= 0; i = t.v.indexOf(title, i + 1)) {
        const before = t.v.slice(0, i), after = t.v.slice(i + title.length);
        const endsSentence = after === '' || after.startsWith('.');
        const startsOk = words >= 4 ? before === '' || /\s$/.test(before) : before === '' || /\.\s+$/.test(before);
        if (endsSentence && startsOk) found.push({ i, end: i + title.length, title });
      }
    }
    found.sort((x, y) => x.i - y.i || y.end - x.end);
    let pos = 0;
    for (const f of found) {
      if (f.i < pos) continue;
      if (f.i > pos) out.push({ t: 'text', v: t.v.slice(pos, f.i) });
      out.push(link(f.title, [{ t: 'text', v: f.title }]));
      pos = f.end;
    }
    if (pos === 0) out.push(t); else if (pos < t.v.length) out.push({ t: 'text', v: t.v.slice(pos) });
  }
  return out;
}

// Map every internal link and image in a block list to its route, or throw.
export function resolveBlocks(blocks, fromFile, fileRoutes, titleRoutes = {}, self = '') {
  const fixInline = (tokens) => tokens.map((t) => {
    if (t.t === 'link') {
      const text = inlineText(t.c);
      return { ...t, href: resolveHref(t.href, text, fromFile, fileRoutes), c: fixInline(t.c) };
    }
    return t.c ? { ...t, c: fixInline(t.c) } : t;
  });
  const inl = (s) => fixInline(parseInline(s));
  const rich = (s) => autolink(inl(s), titleRoutes, self);
  return blocks.map((b) => {
    switch (b.type) {
      case 'paragraph':
        // Most pages close with a bare bold "Talk to DDA". It becomes a link to /contact/.
        if (b.lines.length === 1 && b.lines[0] === '**Talk to DDA**') {
          return { ...b, lines: [[{ t: 'strong', c: [{ t: 'link', c: [{ t: 'text', v: 'Talk to DDA' }], href: '/contact/' }] }]] };
        }
        return { ...b, lines: b.lines.map(rich) };
      case 'quote': return { ...b, lines: b.lines.map(rich) };
      case 'list': return { ...b, items: b.items.map(rich) };
      case 'toc': return { ...b, items: b.items.map((x) => ({ text: x, slug: slugify(x) })) };
      case 'heading': return { ...b, tokens: inl(b.text), id: slugify(b.text) };
      case 'table': return { ...b, header: b.header.map(inl), rows: b.rows.map((r) => r.map(rich)) };
      case 'image': return { ...b, src: resolveHref(b.src, b.alt, fromFile, fileRoutes), caption: b.caption ? inl(b.caption) : undefined };
      default: return b;
    }
  });
}

export const parsePage = (source, fromFile, fileRoutes, titleRoutes = {}, self = '') => resolveBlocks(parseMarkdown(source), fromFile, fileRoutes, titleRoutes, self);
