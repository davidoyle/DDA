import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');

const routes = [
  'model',
  'model/cashflow',
  'model/fiscal-engine',
  'model/scenarios',
  'model/capital-structure',
  'model/revenue',
  'model/proponent',
  'model/benchmark',
  'model/monte-carlo',
  'model/negotiation',
  'model/utility',
  'model/audit',
  'model/training',
  'diagnostics',
  'worksafebc-repricing-risk-diagnostic',
  'bc-pst-impact-diagnostic',
  'tools/pst-diagnostic',
  'tools/mental-health-forecaster',
  'tools/province-comparator',
  'tools/suppression-audit',
  'tools/experience-rating-optimizer',
  'tools/surplus-alert',
  'tools/executive-risk-brief',
  'tools/bc-decarbonization-model',
  'dashboard',
  'services',
  'about',
  'contact',
  'privacy',
  'terms',
  'consultation',
  'consultation/municipality',
  'consultation/union',
  'consultation/contractor',
  'consultation/law-firm',
  'consultation/association',
  'consultation/journalist',
  'consultation/small-business',
  'booking-confirmation',
  'booking-confirmation/municipality',
  'booking-confirmation/union',
  'booking-confirmation/contractor',
  'booking-confirmation/law-firm',
  'booking-confirmation/association',
  'booking-confirmation/journalist',
  'booking-confirmation/small-business',
];

const indexHtml = await readFile(indexPath, 'utf8');

for (const route of routes) {
  const routeDir = path.join(distDir, route);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, 'index.html'), indexHtml);
}

await writeFile(path.join(distDir, '404.html'), indexHtml);

console.log(`Generated static entrypoints for ${routes.length} routes.`);
