# DDA UI and layout audit

Date: September 1, 2026  
Basis: `00-FUNCTIONAL-SPEC.md`, `00-UI-SPEC.md`, and the current implementation.

## Executive finding

The implementation establishes the requested dark global chrome, public route inventory, preserved diagnostic destinations, responsive navigation with focus containment, search states, shared editorial typography, service evidence modules, utility layouts, and reduced-motion foundation. It does **not yet fully meet** the handoff. In particular, several page families still rely on the generic Markdown renderer, public content is not prerendered, and full browser-based accessibility and reflow testing remains outstanding.

## Conformance matrix

| Area | Status | Finding |
| --- | --- | --- |
| Twenty canonical routes | Meets | The route map contains P01–P20, with slashless aliases. |
| Existing diagnostic routes | Meets | Existing `/tools/*` and `/model/*` applications remain routed to their original components. |
| Legacy diagnostic aliases | Meets | Historical `/diagnostics/*`, demo, WorkSafeBC, PST, experience-rating, and decarbonization URLs resolve to their corresponding live tools rather than a generic directory. |
| Homepage order | Partly meets | Approved copy follows hero, insights, selected work, contact, footer; generic Markdown presentation does not create the full lead/supporting card composition. |
| Dark header and footer | Meets | Both use the dark global shell and real destinations. |
| Desktop mega-menus | Meets | Delayed hover intent, focus, click, Enter/Space, Escape, outside-pointer closure, focus-leave closure, and the specified entrance motion are implemented. |
| Mobile navigation | Meets | Full-screen navigation, accordions, focus trap, Escape, scroll lock, and focus restoration are implemented. |
| Search | Mostly meets | All 20 public pages are locally indexed with loading, results, empty state, focus trap, Escape, and focus restoration. A runtime error is not expected for the synchronous embedded index. |
| Page-specific templates | Partly meets | The seven service pages now include distinct, labelled evidence structures with written interpretations. Hub, proof-story, and article layouts still share more generic rendering than the specification calls for. |
| Approved copy | Meets, with exception | Public Markdown is imported verbatim; the requested legacy privacy policy intentionally replaces P17 copy. |
| Contact states | Meets | Required and email validation, focused summary, post-submit blur validation, field-level descriptions, pending, success, failure, value retention, caution, and no-engagement language are present. |
| Accessibility | Partly meets | Skip link, landmarks, headings, labels, table headers, focus styling, dialog focus traps, and reduced motion exist. Full zoom and keyboard browser-matrix testing remain outstanding. |
| Motion | Mostly meets | Major headings, evidence tables, and contact closes reveal once at 600ms/28px; mega-menu and overlays animate at 240ms; reduced motion removes movement. Card-specific stagger is not implemented because the required card components are not yet present. |
| No-JavaScript content | Does not meet | The Vite SPA requires JavaScript to render public copy. Static entrypoints duplicate the SPA shell rather than prerendering content. |
| SEO | Partly meets | Route titles, descriptions, canonical URLs, Open Graph basics, and a sitemap exist; metadata remains client-rendered rather than prerendered. |
| 404 | Meets | The routed experience and dedicated no-JavaScript `public/404.html` both provide one H1 and recovery links; entrypoint generation preserves the static file. |
| 320px and 200% zoom | Not verified | Responsive rules exist; a formal browser matrix and automated overflow audit have not been completed. |
| Structural audit | Meets | `npm run audit:site` checks all 20 source files, one-H1 rules, Markdown links, runtime mappings, sitemap URLs, static entrypoints, import depth, and the Insights asset. |

## Image request

The supplied insights image is deployed as a decorative editorial underlay beneath the opening Insights hub text. Layered dark gradients preserve text contrast, the image is hidden from assistive technology, and its focal point is adjusted on small screens.

## Required follow-up

1. Build explicit Home, insight hub, article, selected-work, contact, and utility templates rather than inferring all presentation from Markdown headings.
2. Prerender the 20 public routes and their metadata.
3. Add browser-based keyboard, axe, 320px overflow, 200% zoom, and reduced-motion checks to complement the structural audit.
