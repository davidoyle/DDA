export const SITE: string;
export const OG_IMAGE: string;
export const ORG_ID: string;
export const WEBSITE_ID: string;
export const LOCALE: string;
type Page = { route: string; title: string; type: string; description: string; metaTitle: string };
export function canonicalUrl(route: string): string;
export function trail(page: Page, manifest: Page[]): { name: string; route: string }[];
export function jsonLdFor(page: Page, manifest: Page[]): Record<string, unknown>[];
