# Repository Optimization Audit

## Highest-impact opportunities

1. **Split route bundles with `React.lazy` + dynamic imports**
   - All page components are imported eagerly in `src/App.tsx`, so they ship in the initial JS bundle.
   - Current production build produces a single JS asset over 1.1 MB minified (~310 KB gzip), which is a clear signal that route-level code splitting is needed.

2. **Create a single source of truth for routes**
   - Route paths are duplicated in `src/App.tsx` and `scripts/generate-route-entrypoints.mjs`.
   - This adds maintenance risk and can cause broken deep-link entrypoints when one list is updated without the other.

3. **Trim or quarantine unused UI primitives and dependency surface area**
   - The project includes many `src/components/ui/*` components that appear to have no imports in application code.
   - `package.json` also carries a broad dependency set (many Radix packages and tooling) likely inherited from a starter kit.
   - Reducing unused components and dependencies will improve install time, security posture, and maintainability.

## Medium-impact opportunities

4. **Improve build profiling visibility**
   - Add bundle analysis in CI or local checks (e.g., visualizer plugin / budget thresholds) to prevent regressions.

5. **Apply lint autofix cleanup for stale directives**
   - Current lint run reports several "Unused eslint-disable directive" warnings in UI component files.
   - Low risk cleanup that improves signal-to-noise in static analysis.

6. **Defer non-critical diagnostics/tooling code where possible**
   - Tool pages and analytics-heavy experiences can be loaded on demand to improve first paint for marketing routes (`/`, `/services`, `/about`, `/contact`).

## Suggested execution order

1. Add route-level lazy loading and verify no regressions.
2. Generate entrypoint routes from a shared route manifest.
3. Remove unreferenced UI components and uninstall now-unused packages.
4. Add bundle-size budget checks.
5. Run lint autofix and keep warnings at zero.
