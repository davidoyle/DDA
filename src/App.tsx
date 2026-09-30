import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout'; import WebsitePage from './pages/WebsitePage'; import { AccessProvider } from './contexts/AccessContext'; import { pageByRoute,pages,routeAliases } from './content/siteContent';
const Tools=lazy(()=>import('./pages/DiagnosticsPage'));const WorkSafe=lazy(()=>import('./pages/WorkSafeBCDiagnosticPage'));const PST=lazy(()=>import('./pages/PSTDiagnostic'));const BCPST=lazy(()=>import('./pages/BCPSTDiagnosticPage'));const Province=lazy(()=>import('./pages/tools/ProvinceComparatorPage'));const Experience=lazy(()=>import('./pages/tools/ExperienceRatingOptimizerPage'));const Suppression=lazy(()=>import('./pages/tools/SuppressionAuditPage'));const Mental=lazy(()=>import('./pages/tools/MentalHealthForecasterPage'));const Surplus=lazy(()=>import('./pages/tools/SurplusAlertPage'));const Decarb=lazy(()=>import('./pages/tools/BCDecarbonizationModelPage'));const Executive=lazy(()=>import('./pages/tools/ExecutiveRiskBriefPage'));const Model=lazy(()=>import('./pages/model'));const NotFound=lazy(()=>import('./pages/NotFoundPage'));
function Head(){
  const {pathname}=useLocation();
  useEffect(()=>{
    const key=pathname==='/'?'/':pathname.endsWith('/')?pathname:pathname+'/';
    const page=pageByRoute[key];
    // Static pages carry their own JSON-LD in the prerendered HTML. Drop it once the visitor navigates elsewhere.
    document.head.querySelectorAll('script[type="application/ld+json"][data-page]').forEach(el=>{if(el.getAttribute('data-page')!==key)el.remove()});
    const title=page?.metaTitle||`${'DDA'} | DDA`;
    const description=page?.description||'DDA investigates complex problems, finds what matters, and builds the analysis needed to act.';
    document.title=title;
    const set=(selector:string,attribute:string,value:string,tag='meta')=>{let element=document.head.querySelector(selector);if(!element){element=document.createElement(tag);document.head.append(element)}element.setAttribute(attribute,value)};
    set('meta[name="description"]','content',description);
    for(const [selector,value] of [['meta[property="og:title"]',title],['meta[name="twitter:title"]',title],['meta[property="og:description"]',description],['meta[name="twitter:description"]',description],['meta[property="og:url"]',`https://ddanalytics.ca${key}`],['meta[property="og:type"]',page?.type==='article'?'article':'website']])set(selector,'content',value);
    set('link[rel="canonical"]','href',`https://ddanalytics.ca${key}`,'link');
  },[pathname]);
  return null
}
const tools=[['tools/worksafe-repricing',WorkSafe],['tools/pst-diagnostic',PST],['tools/bc-pst-impact',BCPST],['tools/province-comparator',Province],['tools/experience-rating',Experience],['tools/suppression-audit',Suppression],['tools/mental-health-forecaster',Mental],['tools/surplus-alert',Surplus],['tools/bc-decarbonization',Decarb],['tools/executive-risk-brief',Executive]] as const;
export default function App(){return <BrowserRouter><AccessProvider><Head/><Suspense fallback={<div className="loading">Loading…</div>}><Routes><Route element={<Layout/>}>{Object.keys(pages).map(path=><Route key={path} path={path} element={<WebsitePage/>}/>)}{Object.entries(routeAliases).map(([from,to])=><Route key={from} path={from} element={<Navigate replace to={to}/>}/>) }<Route path="tools" element={<Tools/>}/>{tools.map(([p,C])=><Route key={p} path={p} element={<C/>}/>)}<Route path="*" element={<NotFound/>}/></Route><Route path="model/*" element={<Model/>}/></Routes></Suspense></AccessProvider></BrowserRouter>}
