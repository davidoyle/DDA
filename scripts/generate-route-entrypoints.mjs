import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');

// This list must mirror every route actually registered in src/App.tsx.
// It previously carried ~30 entries (dashboard, login, consultation/*,
// booking-confirmation/*, verify-access, payment-success, services/*,
// about, analysis, public-interest, public-sector) left over from an
// earlier route plan that App.tsx no longer implements — visiting any of
// them in the live SPA renders the 404 page, so pre-generating a static
// entrypoint for them was pure dead weight. It was also missing
// tools/bc-pst-impact, a route App.tsx does register, which meant a hard
// refresh on that URL would 404 at the host instead of loading the SPA.
const routes = [
  '',
  'who-we-are',
  'what-we-do',
  'what-we-do/fiscal-impact-growth-modelling',
  'what-we-do/official-community-plan-policy-analysis',
  'what-we-do/economic-development-strategy',
  'what-we-do/labour-market-analysis',
  'what-we-do/resource-sector-complex-planning-analysis',
  'what-we-do/long-range-financial-scenario-planning',
  'what-we-do/public-interest-research-evidence-packages',
  'insights',
  'insights/when-a-housing-target-outruns-delivery',
  'insights/the-trade-gap-hidden-inside-a-workforce-number',
  'insights/what-a-flag-tells-you',
  'selected-work',
  'legal',
  'accessibility',
  'work',
  'method',
  'published',
  'contact',
  'privacy',
  'terms',
  'diagnostics',
  'diagnostics/subscribe',
  'tools',
  'diagnostics/demo',
  'diagnostics/demo/pst-diagnostic',
  'diagnostics/demo/worksafe-repricing',
  'diagnostics/demo/province-comparator',
  'diagnostics/demo/experience-rating',
  'diagnostics/demo/suppression-audit',
  'diagnostics/demo/mental-health-forecaster',
  'diagnostics/demo/surplus-alert',
  'diagnostics/demo/bc-decarbonization-model',
  'diagnostics/demo/executive-risk-brief',
  'tools/worksafe-repricing',
  'tools/pst-diagnostic',
  'tools/bc-pst-impact',
  'tools/mental-health-forecaster',
  'tools/province-comparator',
  'tools/suppression-audit',
  'tools/experience-rating-optimizer',
  'tools/experience-rating',
  'tools/surplus-alert',
  'tools/executive-risk-brief',
  'tools/bc-decarbonization-model',
  'tools/bc-decarbonization',
  'diagnostics/worksafe-repricing',
  'diagnostics/pst-diagnostic',
  'diagnostics/mental-health-forecaster',
  'diagnostics/province-comparator',
  'diagnostics/suppression-audit',
  'diagnostics/experience-rating',
  'diagnostics/surplus-alert',
  'diagnostics/executive-risk-brief',
  'diagnostics/bc-decarbonization-model',
  'worksafebc-repricing-risk-diagnostic',
  'bc-pst-impact-diagnostic',
  'model',
];

const indexHtml = await readFile(indexPath, 'utf8');

for (const route of routes) {
  const routeDir = path.join(distDir, route);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, 'index.html'), indexHtml);
}

console.log(
  `Generated static entrypoints for ${routes.length} routes; preserved the dedicated static 404 page.`,
);
