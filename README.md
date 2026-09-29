# DDA website

Public website and diagnostic applications for **Diagnostics, Dataflow, Analysis**: strategic analysis and decision design for complex public and regulated systems.

## Stack
Vite, React 19, TypeScript, React Router 7, Tailwind 3, Radix UI, Lucide and GSAP. Do not migrate or alter diagnostic calculations as part of public-site work.

## Content and architecture
Approved public copy lives in `content/` (home, hub, capabilities, areas, insights, and single pages). The privacy, legal, terms and accessibility pages stay in `.mds/`. Copy is never edited in code. `src/content/public-pages.json` is the route manifest (file, route, title, description, type). `src/lib/markdown.mjs` parses the copy and converts `.md` links to routes. The React app and the prerender script share it. `WebsitePage.tsx` supplies layout only. `Layout.tsx` owns the header, mega menu, search and footer.

## Commands
- `npm run dev`: local development
- `npm run lint`: ESLint
- `npm run lint:copy`: copy lint. Fails on em dashes and "rather than". Fails on TODO in production (`VERCEL_ENV=production` or `DDA_STRICT=1`) and warns loudly elsewhere.
- `npm run build`: copy lint, typecheck, bundle, prerender every public route, audit
- `npm run audit:site`: verify manifest, links, redirects, metadata, sitemap and generated HTML
- `npm run sitemap`: refresh `public/sitemap.xml` after adding a page

## Redirects
All redirects are in `vercel.json` with `permanent: true`. Vercel serves these as 308. Do not add client-side redirects for old URLs.

## Contact configuration
Copy `.env.example` and configure the contact API/server values for the target environment. Do not place secrets or confidential inquiry content in client-side variables.
