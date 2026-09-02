import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = [
  ['01-home.md','/'],['02-what-we-do.md','/what-we-do/'],
  ['03-fiscal-impact-growth-modelling.md','/what-we-do/fiscal-impact-growth-modelling/'],
  ['04-official-community-plan-policy-analysis.md','/what-we-do/official-community-plan-policy-analysis/'],
  ['05-economic-development-strategy.md','/what-we-do/economic-development-strategy/'],
  ['06-labour-market-analysis.md','/what-we-do/labour-market-analysis/'],
  ['07-resource-sector-complex-planning-analysis.md','/what-we-do/resource-sector-complex-planning-analysis/'],
  ['08-long-range-financial-scenario-planning.md','/what-we-do/long-range-financial-scenario-planning/'],
  ['09-public-interest-research-evidence-packages.md','/what-we-do/public-interest-research-evidence-packages/'],
  ['10-who-we-are.md','/who-we-are/'],['11-insights.md','/insights/'],
  ['12-insight-housing-target-delivery.md','/insights/when-a-housing-target-outruns-delivery/'],
  ['13-insight-trade-gap-workforce-number.md','/insights/the-trade-gap-hidden-inside-a-workforce-number/'],
  ['14-insight-what-a-flag-tells-you.md','/insights/what-a-flag-tells-you/'],
  ['15-selected-work.md','/selected-work/'],['16-contact.md','/contact/'],
  ['17-privacy.md','/privacy/'],['18-legal.md','/legal/'],['19-terms.md','/terms/'],
  ['20-accessibility.md','/accessibility/']
];
const failures=[];
const fail=message=>failures.push(message);
const routes=new Set(pages.map(([,route])=>route));
const fileRoutes=new Map(pages);
const siteContent=await readFile(path.join(root,'src/content/siteContent.ts'),'utf8');
const sitemap=await readFile(path.join(root,'public/sitemap.xml'),'utf8');
const entrypoints=await readFile(path.join(root,'scripts/generate-route-entrypoints.mjs'),'utf8');
const styles=await readFile(path.join(root,'src/index.css'),'utf8');
const websitePage=await readFile(path.join(root,'src/pages/WebsitePage.tsx'),'utf8');
const static404=await readFile(path.join(root,'public/404.html'),'utf8');

for(const [file,route] of pages){
 const source=await readFile(path.join(root,'.mds',file),'utf8');
 const h1=(source.match(/^# /gm)||[]).length;
 if(h1!==1)fail(`${file}: expected one H1, found ${h1}`);
 if(!siteContent.includes(`'${route}':`))fail(`${route}: missing from runtime page map`);
 if(!sitemap.includes(`<loc>https://ddanalytics.ca${route}</loc>`))fail(`${route}: missing from sitemap`);
 const entry=route==='/'?"  ''":`  '${route.slice(1,-1)}'`;
 if(!entrypoints.includes(entry))fail(`${route}: missing from static entrypoint list`);
 for(const [,target] of source.matchAll(/\[[^\]]+\]\(\.\/([^\)]+\.md)\)/g)){
   const resolved=fileRoutes.get(target);
   if(!resolved||!routes.has(resolved))fail(`${file}: unresolved internal link ${target}`);
 }
}
await access(path.join(root,'public/dda-insights-page.svg')).catch(()=>fail('Insights editorial asset is missing'));
if(!styles.includes("url('/dda-insights-page.svg')"))fail('Insights editorial asset is not referenced by the public stylesheet');
if(/\.insights-underlay\s*\{[^}]*z-index:\s*-/.test(styles))fail('Insights underlay is behind the page background');
if(!websitePage.includes('onBlur={onBlur}')||!websitePage.includes('aria-describedby='))fail('Contact fields do not expose post-submit blur validation');
if(!static404.includes('<h1>')||!static404.includes('href="/"'))fail('Static 404 is missing its heading or recovery link');
if(entrypoints.includes("writeFile(path.join(distDir, '404.html'), indexHtml)"))fail('Build overwrites the dedicated static 404 page');
if(!siteContent.includes("../../.mds/01-home.md?raw"))fail('Markdown imports do not resolve from src/content');

if(failures.length){console.error(`Public-site audit failed (${failures.length}):\n- ${failures.join('\n- ')}`);process.exit(1)}
console.log(`Public-site audit passed: ${pages.length} routes, headings, links, sitemap entries, static entrypoints, and editorial asset.`);
