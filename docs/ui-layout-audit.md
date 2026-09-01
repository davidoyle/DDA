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
| Desktop mega-menus | Partly meets | Click and Escape work and panels animate; hover intent, focus-leave closure, and full keyboard focus management are incomplete. |
| Mobile navigation | Partly meets | Full-screen navigation, accordions, Escape, scroll lock, and focus restoration exist; focus is not trapped inside the dialog. |
| Search | Partly meets | All 20 public pages are locally indexed with results and empty states; loading and recoverable error states are not meaningful for the synchronous local index, and focus trapping is incomplete. |
| Page-specific templates | Does not meet | A shared Markdown renderer is used instead of the specified hub, seven distinctive service evidence modules, proof-story fields, and article-specific modules. |
| Approved copy | Meets, with exception | Public Markdown is imported verbatim; the requested legacy privacy policy intentionally replaces P17 copy. |
| Contact states | Mostly meets | Required validation, focused summary, pending, success, failure, value retention, caution, and no-engagement language are present. Validation-on-blur after first error remains incomplete. |
| Accessibility | Partly meets | Skip link, landmarks, headings, labels, table headers, focus styling, and reduced motion exist. Dialog focus traps and full zoom/keyboard testing remain outstanding. |
| Motion | Mostly meets | Major headings, evidence tables, and contact closes reveal once at 600ms/28px; mega-menu and overlays animate at 240ms; reduced motion removes movement. Card-specific stagger is not implemented because the required card components are not yet present. |
| No-JavaScript content | Does not meet | The Vite SPA requires JavaScript to render public copy. Static entrypoints duplicate the SPA shell rather than prerendering content. |
| SEO | Partly meets | Titles and descriptions update client-side and a sitemap exists; route-specific descriptions, server-rendered metadata, canonical and complete social metadata remain incomplete. |
| 404 | Partly meets | A routed 404 exists, but static/no-JavaScript behavior has not been verified. |
| 320px and 200% zoom | Not verified | Responsive rules exist; a formal browser matrix and automated overflow audit have not been completed. |

## Image request

The requested `dda insight page.png` is not present in `.mds` or elsewhere in the repository at the time of this audit. No image reference has been added because doing so would create a broken production asset. Once the file is present, it should be copied to a deployable asset location and placed as an editorial underlay beneath the opening insight-page text with a contrast scrim; if decorative, it should have an empty alternative text or be CSS background imagery.

## Required follow-up

1. Build explicit Home, service hub, service detail, insight hub, article, selected-work, contact, and utility templates rather than inferring all presentation from Markdown headings.
2. Implement dialog focus traps and complete mega-menu focus/hover behavior.
3. Prerender the 20 public routes and their metadata.
4. Add automated route, internal-link, heading, keyboard, axe, 320px overflow, 200% zoom, and reduced-motion checks.
5. Add the requested insight image after the binary asset is actually available in the repository.
