# DDA UI and layout audit

Date: September 1, 2026  
Basis: `00-FUNCTIONAL-SPEC.md`, `00-UI-SPEC.md`, and the current implementation.

## Executive finding

The implementation establishes the requested dark global chrome, public route inventory, responsive navigation, search, shared editorial typography, utility layouts, and reduced-motion foundation. It does **not yet fully meet** the handoff. In particular, the generic Markdown renderer does not produce all page-specific component templates, navigation dialogs do not yet implement a complete focus trap, search does not expose genuine loading/error states, and core content is client-rendered rather than available without JavaScript.

## Conformance matrix

| Area | Status | Finding |
| --- | --- | --- |
| Twenty canonical routes | Meets | The route map contains P01–P20, with slashless aliases. |
| Existing diagnostic routes | Meets | Existing `/tools/*` and `/model/*` applications remain routed to their original components. |
| Homepage order | Partly meets | Approved copy follows hero, insights, selected work, contact, footer; generic Markdown presentation does not create the full lead/supporting card composition. |
| Dark header and footer | Meets | Both use the dark global shell and real destinations. |
| Desktop mega-menus | Mostly meets | Hover, focus, click, Enter/Space, Escape, focus-leave closure, and the specified entrance motion work. A dedicated hover-intent delay is not implemented. |
| Mobile navigation | Meets | Full-screen navigation, accordions, focus trap, Escape, scroll lock, and focus restoration are implemented. |
| Search | Mostly meets | All 20 public pages are locally indexed with loading, results, empty state, focus trap, Escape, and focus restoration. A runtime error is not expected for the synchronous embedded index. |
| Page-specific templates | Partly meets | The seven service pages now include distinct, labelled evidence structures with written interpretations. Hub, proof-story, and article layouts still share more generic rendering than the specification calls for. |
| Approved copy | Meets, with exception | Public Markdown is imported verbatim; the requested legacy privacy policy intentionally replaces P17 copy. |
| Contact states | Mostly meets | Required validation, focused summary, pending, success, failure, value retention, caution, and no-engagement language are present. Validation-on-blur after first error remains incomplete. |
| Accessibility | Partly meets | Skip link, landmarks, headings, labels, table headers, focus styling, dialog focus traps, and reduced motion exist. Full zoom and keyboard browser-matrix testing remain outstanding. |
| Motion | Mostly meets | Major headings, evidence tables, and contact closes reveal once at 600ms/28px; mega-menu and overlays animate at 240ms; reduced motion removes movement. Card-specific stagger is not implemented because the required card components are not yet present. |
| No-JavaScript content | Does not meet | The Vite SPA requires JavaScript to render public copy. Static entrypoints duplicate the SPA shell rather than prerendering content. |
| SEO | Partly meets | Route titles, descriptions, canonical URLs, Open Graph basics, and a sitemap exist; metadata remains client-rendered rather than prerendered. |
| 404 | Partly meets | A routed 404 exists, but static/no-JavaScript behavior has not been verified. |
| 320px and 200% zoom | Not verified | Responsive rules exist; a formal browser matrix and automated overflow audit have not been completed. |

## Image request

The requested `dda insight page.png` is not present in `.mds` or elsewhere in the repository at the time of this audit. No image reference has been added because doing so would create a broken production asset. Once the file is present, it should be copied to a deployable asset location and placed as an editorial underlay beneath the opening insight-page text with a contrast scrim; if decorative, it should have an empty alternative text or be CSS background imagery.

## Required follow-up

1. Build explicit Home, insight hub, article, selected-work, contact, and utility templates rather than inferring all presentation from Markdown headings.
2. Prerender the 20 public routes and their metadata.
3. Add automated route, internal-link, heading, keyboard, axe, 320px overflow, 200% zoom, and reduced-motion checks.
4. Add the requested insight image after the binary asset is actually available in the repository.
