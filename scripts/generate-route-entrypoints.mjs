import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');

const routes = [
  '',
  'analysis',
  'work',
  'services',
  'public-interest',
  'method',
  'about',
  'contact',
  'public-sector',
  'privacy',
  'terms',
  'diagnostics',
  'diagnostics/subscribe',
  'tools',
  'dashboard',
  'consultation',
  'booking-confirmation',
  'verify-access',
  'payment-success',
  'login',
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
  'tools/mental-health-forecaster',
  'tools/province-comparator',
  'tools/suppression-audit',
  'tools/experience-rating-optimizer',
  'tools/surplus-alert',
  'tools/executive-risk-brief',
  'tools/bc-decarbonization-model',
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
  'consultation/municipality',
  'consultation/union',
  'consultation/contractor',
  'consultation/law-firm',
  'consultation/association',
  'consultation/journalist',
  'consultation/small-business',
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
