# Repository Optimization Audit

## Resolved

1. **Route-level code splitting** — every tool, model, and diagnostics page is
   already `React.lazy`-loaded in `src/App.tsx`. The homepage's initial JS
   payload is a single ~318 KB (~100 KB gzip) vendor+app chunk plus CSS;
   the largest chunks (recharts' `BarChart`, `PSTDiagnostic`) only load on
   the routes that need them.
2. **Single source of truth for routes** — `scripts/generate-route-entrypoints.mjs`
   carried ~30 entries (`dashboard`, `login`, `consultation/*`,
   `booking-confirmation/*`, `verify-access`, `payment-success`, `services/*`,
   `about`, `analysis`, `public-interest`, `public-sector`) for routes
   `src/App.tsx` doesn't register — visiting any of them 404s in the live
   SPA. It was also missing four routes that *do* exist
   (`tools/bc-pst-impact`, `tools/experience-rating`, `tools/bc-decarbonization`,
   `published`), so a hard refresh on those URLs would 404 at the host. The
   list has been pruned to match `App.tsx` exactly; `npm run audit:site`
   still passes.
3. **Unused UI primitives and dependency surface** — removed 32 unreferenced
   `src/components/ui/*` primitives (verified zero imports anywhere in
   `src`) and the now-orphaned dependencies behind them: 13 `@radix-ui/*`
   packages, `cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`,
   `next-themes`, `react-day-picker`, `react-resizable-panels`, `sonner`,
   `vaul`. `npm install` now installs 135 fewer packages.
4. **Stale lint directives** — `eslint . --report-unused-disable-directives`
   reports none; this was already clean by the time of this pass.

## Still open

5. **Bundle analysis in CI** — no visualizer plugin or size-budget check
   exists yet to catch a future regression back into a large eager chunk.
