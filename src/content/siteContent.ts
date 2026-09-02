import home from '../../.mds/01-home.md?raw'; import what from '../../.mds/02-what-we-do.md?raw';
import p03 from '../../.mds/03-fiscal-impact-growth-modelling.md?raw'; import p04 from '../../.mds/04-official-community-plan-policy-analysis.md?raw'; import p05 from '../../.mds/05-economic-development-strategy.md?raw'; import p06 from '../../.mds/06-labour-market-analysis.md?raw'; import p07 from '../../.mds/07-resource-sector-complex-planning-analysis.md?raw'; import p08 from '../../.mds/08-long-range-financial-scenario-planning.md?raw'; import p09 from '../../.mds/09-public-interest-research-evidence-packages.md?raw';
import who from '../../.mds/10-who-we-are.md?raw'; import insights from '../../.mds/11-insights.md?raw'; import p12 from '../../.mds/12-insight-housing-target-delivery.md?raw'; import p13 from '../../.mds/13-insight-trade-gap-workforce-number.md?raw'; import p14 from '../../.mds/14-insight-what-a-flag-tells-you.md?raw'; import selected from '../../.mds/15-selected-work.md?raw'; import contact from '../../.mds/16-contact.md?raw'; import privacy from '../../.mds/17-privacy.md?raw'; import legal from '../../.mds/18-legal.md?raw'; import terms from '../../.mds/19-terms.md?raw'; import accessibility from '../../.mds/20-accessibility.md?raw';
import manifestData from './public-pages.json';
export type PageType='home'|'capability-hub'|'capability-detail'|'about'|'insights-hub'|'article'|'selected-work'|'contact'|'utility';
export interface PublicPage {id:string;file:string;route:string;title:string;navTitle:string;type:PageType;description:string;topics:string[];readTime?:string}
export const pageManifest=manifestData as PublicPage[];
const sources=[home,what,p03,p04,p05,p06,p07,p08,p09,who,insights,p12,p13,p14,selected,contact,privacy,legal,terms,accessibility];
export const pages:Record<string,string>=Object.fromEntries(pageManifest.map((page,index)=>[page.route,sources[index]]));
export const pageByRoute:Record<string,PublicPage>=Object.fromEntries(pageManifest.map(page=>[page.route,page]));
export const routeAliases:Record<string,string>={...Object.fromEntries(Object.keys(pages).filter(x=>x!='/').map(x=>[x.slice(0,-1),x]))};
