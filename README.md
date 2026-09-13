# DDA website

Public website and diagnostic applications for **Diagnostics, Dataflow, Analysis**: strategic analysis and decision design for complex public and regulated systems.

## Stack
Vite, React 19, TypeScript, React Router 7, Tailwind 3, Radix UI, Lucide and GSAP. Do not migrate or alter diagnostic calculations as part of public-site work.

## Content and architecture
Approved public copy is `.mds/01-home.md` through `.mds/20-accessibility.md`. `src/content/public-pages.json` is the authoritative route/page manifest; `siteContent.ts` provides its typed runtime join to Markdown. `WebsitePage.tsx` assembles nine public page families and shared evidence, breadcrumb, article-context, contact and CTA modules. `Layout.tsx` owns the accessible header, mobile navigation, mega-menu, search and footer. Public design additions are scoped beneath `.site-shell`; tools retain their established UI.

## Commands
- `npm run dev` — local development
- `npm run lint` — ESLint
- `npm run build` — typecheck, bundle and prerender all public routes
- `npm run audit:site` — verify manifest, approved copy, links, sitemap and generated HTML
- `npm run preview` — preview production output

The build prerenders meaningful route-specific HTML and metadata with `scripts/generate-route-entrypoints.mjs`, using the same manifest as the app. Deployment must preserve SPA fallback for diagnostic routes and serve generated public route files directly.

## Contact configuration
Copy `.env.example` and configure the contact API/server values for the target environment. Do not place secrets or confidential inquiry content in client-side variables.
