import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { AccessProvider } from './contexts/AccessContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const PublishedPage = lazy(() => import('./pages/PublicInterestPage'));
const MethodPage = lazy(() => import('./pages/MethodPage'));
const ToolsPage = lazy(() => import('./pages/DiagnosticsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const WorkSafeBC = lazy(() => import('./pages/WorkSafeBCDiagnosticPage'));
const PST = lazy(() => import('./pages/PSTDiagnostic'));
const BCPST = lazy(() => import('./pages/BCPSTDiagnosticPage'));
const Province = lazy(() => import('./pages/tools/ProvinceComparatorPage'));
const Experience = lazy(() => import('./pages/tools/ExperienceRatingOptimizerPage'));
const Suppression = lazy(() => import('./pages/tools/SuppressionAuditPage'));
const MentalHealth = lazy(() => import('./pages/tools/MentalHealthForecasterPage'));
const Surplus = lazy(() => import('./pages/tools/SurplusAlertPage'));
const Decarbonization = lazy(() => import('./pages/tools/BCDecarbonizationModelPage'));
const Executive = lazy(() => import('./pages/tools/ExecutiveRiskBriefPage'));
const ModelApp = lazy(() => import('./pages/model'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const metadata: Record<string, [string, string]> = {
  '/': ['David Doyle — DDA', 'DDA builds analytical frameworks for complex planning, policy, and resource sector problems. Finding the story in messy data.'],
  '/work': ['Selected Work — DDA', 'A record of completed analytical work across municipal planning, resource economics, energy policy, institutional research, and diagnostic tools.'],
  '/published': ['Published Analysis — DDA', 'Independent investigative research and institutional analysis. Named public-interest work with full source documentation.'],
  '/method': ['Method — DDA', 'How DDA builds evidence registers, classifies data quality, and structures analysis to survive scrutiny.'],
  '/tools': ['Diagnostic Tools — DDA', 'Open-access diagnostic tools built from public evidence. Workers compensation, tax, climate, and energy economics.'],
  '/model': ['B.C. Energy Fiscal Decision Model — DDA', 'Fiscal simulation platform for BC LNG projects. 48-assumption register with Executive, Analyst, and Audit views.'],
  '/contact': ['Contact — DDA', 'Describe the decision you are facing. David Doyle will respond within 48 hours.'],
  '/privacy': ['Privacy Policy — DDA', 'How DDA collects, uses, and protects personal information.'],
  '/terms': ['Terms of Service — DDA', 'Terms governing use of DDA services and analytical tools.'],
};
const toolTitles: Record<string, string> = {
  'worksafe-repricing':'WorkSafeBC Repricing Risk Diagnostic','pst-diagnostic':'PST Diagnostic Tool','bc-pst-impact':'B.C. PST Impact Diagnostic','province-comparator':'Multi-Province Surplus & Rate Comparator','experience-rating':'Experience Rating Optimizer','suppression-audit':'Claims Suppression Self-Audit','mental-health-forecaster':'Mental Health Claims Surge Forecaster','surplus-alert':'Surplus Run-Down Early-Warning Alert','bc-decarbonization':'BC Decarbonization Model','executive-risk-brief':'Executive Risk Brief Generator'
};

function HeadAndAnalytics() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    const slug = pathname.startsWith('/tools/') ? pathname.split('/').pop()! : '';
    const [title, description] = metadata[pathname] ?? (toolTitles[slug] ? [`${toolTitles[slug]} — DDA`, `Open-access ${toolTitles[slug]} built from documented public evidence.`] : ['DDA', 'Diagnostics, Dataflow, Analysis.']);
    document.title = title;
    const set = (selector: string, attr: string, value: string) => { let el = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null; if (!el) { el = document.createElement(selector.startsWith('link') ? 'link' : 'meta'); document.head.appendChild(el); } el.setAttribute(attr, value); };
    set('meta[name="description"]', 'content', description);
    set('link[rel="canonical"]', 'href', `https://ddanalytics.ca${pathname}`);
    set('meta[property="og:title"]', 'content', title); set('meta[property="og:description"]', 'content', description);
    set('meta[property="og:url"]', 'content', `https://ddanalytics.ca${pathname}`);
    window.gtag?.('config', 'G-BYT5SR4XBR', { page_path: `${pathname}${search}${hash}` });
  }, [pathname, search, hash]);
  return null;
}

const redirects: Record<string,string> = {
  '/analysis':'/work','/public-interest':'/published','/about':'/method','/diagnostics':'/tools',
  '/worksafebc-repricing-risk-diagnostic':'/tools/worksafe-repricing','/bc-pst-impact-diagnostic':'/tools/bc-pst-impact',
  '/diagnostics/pst-diagnostic':'/tools/pst-diagnostic','/diagnostics/worksafe-repricing':'/tools/worksafe-repricing','/diagnostics/province-comparator':'/tools/province-comparator','/diagnostics/experience-rating':'/tools/experience-rating','/diagnostics/suppression-audit':'/tools/suppression-audit','/diagnostics/mental-health-forecaster':'/tools/mental-health-forecaster','/diagnostics/surplus-alert':'/tools/surplus-alert','/diagnostics/bc-decarbonization-model':'/tools/bc-decarbonization','/diagnostics/executive-risk-brief':'/tools/executive-risk-brief'
};
function LegacyRedirect() { const { pathname } = useLocation(); const demo = pathname.replace('/diagnostics/demo/', '/tools/').replace('bc-decarbonization-model','bc-decarbonization'); return <Navigate replace to={redirects[pathname] ?? (pathname.startsWith('/diagnostics/demo/') ? demo : '/tools')} />; }

export default function App() {
  return <BrowserRouter><AccessProvider><HeadAndAnalytics/><Suspense fallback={<div className="min-h-screen"/>}><Routes>
    <Route path="/" element={<Layout/>}><Route index element={<HomePage/>}/><Route path="work" element={<WorkPage/>}/><Route path="published" element={<PublishedPage/>}/><Route path="method" element={<MethodPage/>}/><Route path="tools" element={<ToolsPage/>}/><Route path="contact" element={<ContactPage/>}/><Route path="privacy" element={<PrivacyPolicyPage/>}/><Route path="terms" element={<TermsPage/>}/>
      <Route path="tools/worksafe-repricing" element={<WorkSafeBC/>}/><Route path="tools/pst-diagnostic" element={<PST/>}/><Route path="tools/bc-pst-impact" element={<BCPST/>}/><Route path="tools/province-comparator" element={<Province/>}/><Route path="tools/experience-rating" element={<Experience/>}/><Route path="tools/suppression-audit" element={<Suppression/>}/><Route path="tools/mental-health-forecaster" element={<MentalHealth/>}/><Route path="tools/surplus-alert" element={<Surplus/>}/><Route path="tools/bc-decarbonization" element={<Decarbonization/>}/><Route path="tools/executive-risk-brief" element={<Executive/>}/>
      <Route path="analysis" element={<LegacyRedirect/>}/><Route path="public-interest" element={<LegacyRedirect/>}/><Route path="about" element={<LegacyRedirect/>}/><Route path="diagnostics/*" element={<LegacyRedirect/>}/><Route path="worksafebc-repricing-risk-diagnostic" element={<LegacyRedirect/>}/><Route path="bc-pst-impact-diagnostic" element={<LegacyRedirect/>}/><Route path="consultation/*" element={<Navigate replace to="/contact"/>}/><Route path="booking-confirmation/*" element={<Navigate replace to="/contact"/>}/><Route path="*" element={<NotFoundPage/>}/>
    </Route><Route path="/model" element={<ModelApp/>}/></Routes></Suspense></AccessProvider></BrowserRouter>;
}
