import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');

const legacyRoutes = [
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
  'analysis',
  'work',
  'services',
  'services/economic-regional-strategy',
  'services/land-use-planning',
  'services/labour-market-workforce-risk',
  'services/regulatory-institutional-cost',
  'services/financial-policy-modelling',
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

const manifestSource = await readFile(path.resolve(__dirname,'..','src/content/siteContent.ts'),'utf8');
const publicRoutes=[...manifestSource.matchAll(/define\('([^']+)'/g)].map(match=>match[1].replace(/^\//,'').replace(/\/$/,''));
const routes=[...new Set([...publicRoutes,...legacyRoutes])];
const mdFiles=(await import('node:fs/promises')).readdir(path.resolve(__dirname,'..','.mds')).then(files=>files.filter(file=>/^\d{2}-.+\.md$/.test(file)).sort());
const escape=value=>value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function renderMarkdown(source){return source.split(/\n\n+/).map(block=>{const value=block.trim();if(!value)return '';const heading=value.match(/^(#{1,3}) (.+)$/s);if(heading&&!heading[2].includes('\n')){const level=heading[1].length;return `<h${level}>${escape(heading[2])}</h${level}>`}if(value.startsWith('- '))return `<ul>${value.split('\n').map(line=>`<li>${escape(line.slice(2))}</li>`).join('')}</ul>`;return `<p>${escape(value.replace(/\n/g,' '))}</p>`}).join('\n')}
const sources=new Map();for(const [index,file] of (await mdFiles).entries()){const route=publicRoutes[index];if(route!==undefined)sources.set(route,await readFile(path.resolve(__dirname,'..','.mds',file),'utf8'))}
const indexHtml = await readFile(indexPath, 'utf8');

for (const route of routes) {
  const routeDir = path.join(distDir, route);
  await mkdir(routeDir, { recursive: true });
  const source=sources.get(route);const title=source?.match(/^# (.+)$/m)?.[1];
  const shell=source?indexHtml.replace('<div id="root"></div>',`<div id="root"><main class="static-public-copy">${renderMarkdown(source)}</main></div>`).replace(/<title>.*?<\/title>/,`<title>${escape(title??'DDA')} — DDA</title>`):indexHtml;
  await writeFile(path.join(routeDir, 'index.html'), shell);
}

console.log(`Generated static entrypoints for ${routes.length} routes; preserved the dedicated static 404 page.`);
