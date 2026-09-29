export type Inline = { t: 'text'; v: string } | { t: 'strong'; c: Inline[] } | { t: 'em'; c: Inline[] } | { t: 'link'; c: Inline[]; href: string };
export type MdBlock =
  | { type: 'rule' }
  | { type: 'heading'; level: number; text: string; tokens: Inline[]; id: string }
  | { type: 'image'; alt: string; src: string }
  | { type: 'table'; header: Inline[][]; rows: Inline[][][] }
  | { type: 'quote'; lines: Inline[][] }
  | { type: 'list'; items: Inline[][] }
  | { type: 'paragraph'; lines: Inline[][] }
  | { type: 'toc'; label: string; items: { text: string; slug: string }[] };
export function parseInline(s: string): Inline[];
export function inlineText(tokens: Inline[]): string;
export function slugify(text: string): string;
export function buildFileRoutes(manifest: { file: string; route: string }[]): Record<string, string>;
export function resolveHref(href: string, text: string, fromFile: string, fileRoutes: Record<string, string>): string;
export function parsePage(source: string, fromFile: string, fileRoutes: Record<string, string>): MdBlock[];
