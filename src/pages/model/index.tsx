import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ModelNav from '@/components/model/ModelNav';
const AssumptionsPage = lazy(() => import('./AssumptionsPage'));
const CashFlowPage = lazy(() => import('./CashFlowPage'));
const FiscalEnginePage = lazy(() => import('./FiscalEnginePage'));
const ScenariosPage = lazy(() => import('./ScenariosPage'));
const CapitalStructurePage = lazy(() => import('./CapitalStructurePage'));
const RevenuePage = lazy(() => import('./RevenuePage'));
const ProponentPage = lazy(() => import('./ProponentPage'));
const BenchmarkPage = lazy(() => import('./BenchmarkPage'));
const MonteCarloPage = lazy(() => import('./MonteCarloPage'));
const NegotiationPage = lazy(() => import('./NegotiationPage'));
const UtilityPage = lazy(() => import('./UtilityPage'));
const AuditPage = lazy(() => import('./AuditPage'));
const TrainingPage = lazy(() => import('./TrainingPage'));
export default function ModelApp() { return <div className="min-h-screen bg-slate-100 lg:flex"><ModelNav /><main className="flex-1 p-6 lg:p-8"><Suspense fallback={<div className="rounded border bg-white p-6">Loading model…</div>}><Routes><Route index element={<AssumptionsPage />} /><Route path="cashflow" element={<CashFlowPage />} /><Route path="fiscal-engine" element={<FiscalEnginePage />} /><Route path="scenarios" element={<ScenariosPage />} /><Route path="capital-structure" element={<CapitalStructurePage />} /><Route path="revenue" element={<RevenuePage />} /><Route path="proponent" element={<ProponentPage />} /><Route path="benchmark" element={<BenchmarkPage />} /><Route path="monte-carlo" element={<MonteCarloPage />} /><Route path="negotiation" element={<NegotiationPage />} /><Route path="utility" element={<UtilityPage />} /><Route path="audit" element={<AuditPage />} /><Route path="training" element={<TrainingPage />} /><Route path="*" element={<Navigate to="/model" replace />} /></Routes></Suspense></main></div>; }
