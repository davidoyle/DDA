# DDA UI and layout audit

Date: September 2, 2026

## Finished implementation
The public experience now uses nine manifest-selected template families rather than an undifferentiated route list. Approved P01–P20 Markdown remains the copy source; presentation adds decision-led hierarchy, capability-specific evidence modules, editorial article measure, selected-work proof rhythm, long-page contents navigation, semantic hierarchical breadcrumbs, natural CTAs, and readable utility layouts.

The navigation follows What we do, Selected work, Insights, Who we are, Search, Contact. Its wide capability menu exposes Diagnose / Model / Design / Equip and all seven applications. Mobile navigation, search, and desktop menus support keyboard use, Escape, focus containment/restoration, scroll lock, active states, and 44px-class primary controls.

Contact supplies labels, required cues, field and summary errors, summary focus, blur revalidation after submit, pending/success/failure announcements, retained entries, confidentiality warning, and duplicate-submit prevention. Tables have column/row headers and a labelled keyboard-scroll region. Motion is progressive, restrained, and removed under reduced-motion preference. Public colour variables are scoped beneath `.site-shell`, preventing diagnostic recolouring.

Generated P01–P20 entrypoints include source copy in HTML; metadata, canonical tags, sitemap records and static deep links are produced for public routes. Diagnostic and model applications remain lazy-loaded and calculations were not altered.

## Verification scope and limitations
Structural audit covers 20 sources, one-H1 rules, links, manifest mapping, sitemap, entrypoints, the editorial asset, contact semantics, and static 404. Responsive CSS explicitly covers 320px-class widths and reduced motion. A full assistive-technology/browser lab matrix (screen readers, browser zoom engines, and physical devices) remains a release QA activity rather than a claim made by this repository audit.
