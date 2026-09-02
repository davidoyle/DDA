# DDA website

Public website and diagnostic applications for DDA: **strategic analysis and decision design for complex public and regulated systems**.

## Stack
React 19, TypeScript, Vite, React Router, Tailwind, Radix UI, and GSAP (available for diagnostic experiences). The public site uses Markdown P01–P20 in `.mds/` as its factual source. `src/content/siteContent.ts` is the authoritative public-page manifest for routes, titles, templates, topics, descriptions, hierarchy, relationships, search, and generated routes.

## Public architecture
Nine template families—Home, Capability Hub, Capability Detail, About, Insights Hub, Insight Article, Selected Work, Contact, and Utility—are selected from the manifest. The shared shell supplies accessible desktop/mobile navigation, capability menu, all-page search, breadcrumbs, active states, footer, and a consistent “Discuss a decision” path. Public tokens are scoped under `.site-shell`; diagnostics retain their original styling and calculations.

The seven capability pages share a decision-led framework and each supplies its own evidence module. Contact includes client-side validation, focused error summary, pending/success/error states, preserved values, and duplicate-submit protection.

## Development
```bash
npm install
npm run dev
npm run lint
npm run build
npm run audit:site
```

The build keeps tool routes code-split and generates deep-link HTML entrypoints. For P01–P20, those documents contain the approved Markdown copy in generated HTML as a no-JavaScript/static fallback before React enhances the page. Unknown paths use `public/404.html`; host rewrite examples are included for Apache and Netlify.

## Documentation
- `docs/content-architecture.md` — audiences, sitemap, and flows
- `docs/colour-palettes.md` — four measured palettes and selected tokens
- `docs/imagery-plan.md` — licensed/commissioned image direction and alt guidance
- `docs/ux-heuristic-audit.md` — implemented Nielsen and B2B fixes
- `docs/ui-layout-audit.md` and `docs/optimization-audit.md` — finished implementation notes
