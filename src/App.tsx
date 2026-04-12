import { Suspense, lazy, useEffect, type ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { AccessProvider, useAccess } from '@/contexts/AccessContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const MethodPage = lazy(() => import('./pages/MethodPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PublicSectorPage = lazy(() => import('./pages/PublicSectorPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const BookingConfirmationPage = lazy(() => import('./pages/BookingConfirmationPage'));
const ConsultationLandingPage = lazy(() => import('./pages/ConsultationLandingPage'));
const WorkSafeBCDiagnosticPage = lazy(() => import('./pages/WorkSafeBCDiagnosticPage'));
const DiagnosticsPage = lazy(() => import('./pages/DiagnosticsPage'));
const DiagnosticsSubscribePage = lazy(() => import('./pages/DiagnosticsSubscribePage'));
const BCPSTDiagnosticPage = lazy(() => import('./pages/BCPSTDiagnosticPage'));
const PSTDiagnostic = lazy(() => import('./pages/PSTDiagnostic'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const MentalHealthForecasterPage = lazy(() => import('./pages/tools/MentalHealthForecasterPage'));
const ProvinceComparatorPage = lazy(() => import('./pages/tools/ProvinceComparatorPage'));
const SuppressionAuditPage = lazy(() => import('./pages/tools/SuppressionAuditPage'));
const ExperienceRatingOptimizerPage = lazy(() => import('./pages/tools/ExperienceRatingOptimizerPage'));
const SurplusAlertPage = lazy(() => import('./pages/tools/SurplusAlertPage'));
const ExecutiveRiskBriefPage = lazy(() => import('./pages/tools/ExecutiveRiskBriefPage'));
const BCDecarbonizationModelPage = lazy(() => import('./pages/tools/BCDecarbonizationModelPage'));
const VerifyAccessPage = lazy(() => import('./pages/VerifyAccessPage'));
const AdminAccessPage = lazy(() => import('./pages/AdminAccessPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DemoDiagnosticsLandingPage = lazy(() => import('./pages/DemoDiagnosticsLandingPage'));
const DemoVsFullPage = lazy(() => import('./pages/DemoVsFullPage'));

const GA_MEASUREMENT_ID = 'G-BYT5SR4XBR';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: `${location.pathname}${location.search}${location.hash}`,
    });
  }, [location]);

  return null;
}

function RequireFullAccess({ children }: { children: ReactElement }) {
  const { canAccessDiagnostics } = useAccess();
  return canAccessDiagnostics ? children : <Navigate to="/login" replace />;
}

function DemoGuard({ children, fullPath }: { children: ReactElement; fullPath: string }) {
  const { canAccessDiagnostics } = useAccess();
  return canAccessDiagnostics ? <Navigate to={fullPath} replace /> : children;
}

function App() {
  return (
    <Router>
      <AccessProvider>
        <AnalyticsTracker />
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="analysis" element={<WorkPage />} />
              <Route path="work" element={<Navigate to="/analysis" replace />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="method" element={<MethodPage />} />
              <Route path="about" element={<Navigate to="/method" replace />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="public-sector" element={<PublicSectorPage />} />
              <Route path="privacy" element={<PrivacyPolicyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="diagnostics" element={<RequireFullAccess><DiagnosticsPage /></RequireFullAccess>} />
              <Route path="diagnostics/subscribe" element={<DiagnosticsSubscribePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="tools" element={<RequireFullAccess><DiagnosticsPage /></RequireFullAccess>} />

              <Route path="admin-access" element={<AdminAccessPage />} />
              <Route path="demo-vs-full" element={<DemoVsFullPage />} />
              <Route path="diagnostics/demo" element={<DemoDiagnosticsLandingPage />} />

              <Route path="diagnostics/demo/pst-diagnostic" element={<DemoGuard fullPath="/diagnostics/pst-diagnostic"><PSTDiagnostic /></DemoGuard>} />
              <Route path="diagnostics/demo/worksafe-repricing" element={<DemoGuard fullPath="/diagnostics/worksafe-repricing"><WorkSafeBCDiagnosticPage /></DemoGuard>} />
              <Route path="diagnostics/demo/province-comparator" element={<DemoGuard fullPath="/diagnostics/province-comparator"><ProvinceComparatorPage /></DemoGuard>} />
              <Route path="diagnostics/demo/experience-rating" element={<DemoGuard fullPath="/diagnostics/experience-rating"><ExperienceRatingOptimizerPage /></DemoGuard>} />
              <Route path="diagnostics/demo/suppression-audit" element={<DemoGuard fullPath="/diagnostics/suppression-audit"><SuppressionAuditPage /></DemoGuard>} />
              <Route path="diagnostics/demo/mental-health-forecaster" element={<DemoGuard fullPath="/diagnostics/mental-health-forecaster"><MentalHealthForecasterPage /></DemoGuard>} />
              <Route path="diagnostics/demo/surplus-alert" element={<DemoGuard fullPath="/diagnostics/surplus-alert"><SurplusAlertPage /></DemoGuard>} />
              <Route path="diagnostics/demo/bc-decarbonization-model" element={<DemoGuard fullPath="/diagnostics/bc-decarbonization-model"><BCDecarbonizationModelPage /></DemoGuard>} />
              <Route path="diagnostics/demo/executive-risk-brief" element={<DemoGuard fullPath="/diagnostics/executive-risk-brief"><ExecutiveRiskBriefPage /></DemoGuard>} />

              <Route path="worksafebc-repricing-risk-diagnostic" element={<RequireFullAccess><WorkSafeBCDiagnosticPage /></RequireFullAccess>} />
              <Route path="bc-pst-impact-diagnostic" element={<RequireFullAccess><BCPSTDiagnosticPage /></RequireFullAccess>} />
              <Route path="tools/pst-diagnostic" element={<RequireFullAccess><PSTDiagnostic /></RequireFullAccess>} />
              <Route path="tools/mental-health-forecaster" element={<RequireFullAccess><MentalHealthForecasterPage /></RequireFullAccess>} />
              <Route path="tools/province-comparator" element={<RequireFullAccess><ProvinceComparatorPage /></RequireFullAccess>} />
              <Route path="tools/suppression-audit" element={<RequireFullAccess><SuppressionAuditPage /></RequireFullAccess>} />
              <Route path="tools/experience-rating-optimizer" element={<RequireFullAccess><ExperienceRatingOptimizerPage /></RequireFullAccess>} />
              <Route path="tools/surplus-alert" element={<RequireFullAccess><SurplusAlertPage /></RequireFullAccess>} />
              <Route path="tools/executive-risk-brief" element={<RequireFullAccess><ExecutiveRiskBriefPage /></RequireFullAccess>} />
              <Route path="tools/bc-decarbonization-model" element={<RequireFullAccess><BCDecarbonizationModelPage /></RequireFullAccess>} />

              <Route path="diagnostics/pst-diagnostic" element={<RequireFullAccess><PSTDiagnostic /></RequireFullAccess>} />
              <Route path="diagnostics/worksafe-repricing" element={<RequireFullAccess><WorkSafeBCDiagnosticPage /></RequireFullAccess>} />
              <Route path="diagnostics/province-comparator" element={<RequireFullAccess><ProvinceComparatorPage /></RequireFullAccess>} />
              <Route path="diagnostics/suppression-audit" element={<RequireFullAccess><SuppressionAuditPage /></RequireFullAccess>} />
              <Route path="diagnostics/experience-rating" element={<RequireFullAccess><ExperienceRatingOptimizerPage /></RequireFullAccess>} />
              <Route path="diagnostics/mental-health-forecaster" element={<RequireFullAccess><MentalHealthForecasterPage /></RequireFullAccess>} />
              <Route path="diagnostics/surplus-alert" element={<RequireFullAccess><SurplusAlertPage /></RequireFullAccess>} />
              <Route path="diagnostics/executive-risk-brief" element={<RequireFullAccess><ExecutiveRiskBriefPage /></RequireFullAccess>} />
              <Route path="diagnostics/bc-decarbonization-model" element={<RequireFullAccess><BCDecarbonizationModelPage /></RequireFullAccess>} />

              <Route path="dashboard" element={<RequireFullAccess><Dashboard /></RequireFullAccess>} />

              <Route path="consultation" element={<ConsultationLandingPage />} />
              <Route path="consultation/municipality" element={<ConsultationLandingPage sector="municipality" />} />
              <Route path="consultation/union" element={<ConsultationLandingPage sector="union" />} />
              <Route path="consultation/contractor" element={<ConsultationLandingPage sector="contractor" />} />
              <Route path="consultation/law-firm" element={<ConsultationLandingPage sector="law-firm" />} />
              <Route path="consultation/association" element={<ConsultationLandingPage sector="association" />} />
              <Route path="consultation/journalist" element={<ConsultationLandingPage sector="journalist" />} />
              <Route path="consultation/small-business" element={<ConsultationLandingPage sector="small-business" />} />

              <Route path="booking-confirmation" element={<BookingConfirmationPage />} />
              <Route path="booking-confirmation/municipality" element={<BookingConfirmationPage sector="municipality" />} />
              <Route path="booking-confirmation/union" element={<BookingConfirmationPage sector="union" />} />
              <Route path="booking-confirmation/contractor" element={<BookingConfirmationPage sector="contractor" />} />
              <Route path="booking-confirmation/law-firm" element={<BookingConfirmationPage sector="law-firm" />} />
              <Route path="booking-confirmation/association" element={<BookingConfirmationPage sector="association" />} />
              <Route path="booking-confirmation/journalist" element={<BookingConfirmationPage sector="journalist" />} />
              <Route path="booking-confirmation/small-business" element={<BookingConfirmationPage sector="small-business" />} />

              <Route path="verify-access" element={<VerifyAccessPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AccessProvider>
    </Router>
  );
}

export default App;
