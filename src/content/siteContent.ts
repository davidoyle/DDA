import { buildFileRoutes, buildTitleRoutes } from '../lib/markdown.mjs';
import manifestData from './public-pages.json';

export type PageType = 'home' | 'hub' | 'capability' | 'area' | 'about' | 'consulting' | 'insights-hub' | 'article' | 'contact' | 'public-interest' | 'utility';
export interface PublicPage { id: string; file: string; route: string; title: string; navTitle: string; type: PageType; description: string; finding?: string; relatedService?: string }

export const pageManifest = manifestData as PublicPage[];

// Approved copy: /content (site copy) and the four legal pages under /.mds.
const raw = import.meta.glob(['../../content/**/*.md', '../../.mds/{17-privacy,18-legal,19-terms,20-accessibility}.md'], { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const byFile: Record<string, string> = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k.replace('../../', ''), v]));

export const pages: Record<string, string> = Object.fromEntries(pageManifest.map((page) => [page.route, byFile[page.file]]));
export const pageByRoute: Record<string, PublicPage> = Object.fromEntries(pageManifest.map((page) => [page.route, page]));
export const fileRoutes = buildFileRoutes(pageManifest);
export const titleRoutes = buildTitleRoutes(pageManifest);
// Same page without the trailing slash. Old-URL redirects live in vercel.json.
export const routeAliases: Record<string, string> = Object.fromEntries(Object.keys(pages).filter((x) => x !== '/').map((x) => [x.slice(0, -1), x]));
