# Repository optimization audit

## Implemented
- Diagnostic and model applications remain route-level lazy chunks; public redesign did not pull their engines into the marketing shell.
- `siteContent.ts` is the authoritative typed public-page manifest used by routing, metadata, page templates, hierarchy, relationships, and the 20-page search index.
- Static entrypoint generation derives public routes from that manifest and embeds approved Markdown copy for resilient generated HTML.
- Route descriptions and canonical metadata are unique; `sitemap.xml` lists every canonical P01–P20 route plus tools.
- Public palette/layout rules are scoped to `.site-shell`, avoiding a risky rewrite of legacy diagnostic styles.
- Decorative editorial imagery is local and lightweight; no random third-party imagery or runtime image request was added.

## Genuine remaining opportunities
Markdown is currently imported into the public shell so client-side search can cover full copy; this deliberately trades a modest public bundle cost for complete offline search. A future build-time search JSON plus per-route content modules could split it further. The repository retains a broad inherited Radix/UI component surface used across tools; removal requires a separate dependency/import audit. Browser performance budgets and automated axe/Playwright reflow checks would strengthen CI beyond the current structural audit.
