# UX validation plan

Automated release gates are lint, production build and `audit:site`. The build must emit 20 route-specific HTML files containing H1 and body copy, canonical/OG metadata, plus sitemap locations from the same manifest.

Manual matrix: keyboard-only desktop mega-menu, mobile focus trap, Escape restoration, search/no-results, contact validation/API failure, 320px and 1280px widths, 200% browser zoom, reduced motion and forced colours. Check every P01–P20 canonical URL and alias; smoke every existing `/tools/*` route without changing calculations. Inspect for horizontal document overflow (tables may use labelled scroll regions), heading order, one H1, meaningful link text and screen-reader announcement of form/search state.
