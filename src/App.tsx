import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const PublicInterestPage = lazy(() => import('./pages/PublicInterestPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const MethodPage = lazy(() => import('./pages/MethodPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
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
const DemoDiagnosticsLandingPage = lazy(() => import('./pages/DemoDiagnosticsLandingPage'));
const DemoVsFullPage = lazy(() => import('./pages/DemoVsFullPage'));
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccessPage'));
const ModelApp = lazy(() => import('./pages/model'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

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

function App() {
  return (
    <Router>
        <AnalyticsTracker />
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="analysis" element={<WorkPage />} />
              <Route path="work" element={<Navigate to="/analysis" replace />} />
              <Route path="services" element={<Navigate to="/" replace />} />
              <Route path="services/:serviceSlug" element={<Navigate to="/" replace />} />
              <Route path="public-interest" element={<PublicInterestPage />} />
              <Route path="method" element={<MethodPage />} />
              <Route path="about" element={<Navigate to="/method" replace />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="public-sector" element={<Navigate to="/" replace />} />
              <Route path="privacy" element={<PrivacyPolicyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="diagnostics" element={<DiagnosticsPage />} />
              <Route path="diagnostics/subscribe" element={<DiagnosticsSubscribePage />} />
              <Route path="login" element={<Navigate to="/tools" replace />} />
              <Route path="tools" element={<DiagnosticsPage />} />

              <Route path="demo-vs-full" element={<DemoVsFullPage />} />
              <Route path="diagnostics/demo" element={<DemoDiagnosticsLandingPage />} />

              <Route path="diagnostics/demo/pst-diagnostic" element={<PSTDiagnostic />} />
              <Route path="diagnostics/demo/worksafe-repricing" element={<WorkSafeBCDiagnosticPage />} />
              <Route path="diagnostics/demo/province-comparator" element={<ProvinceComparatorPage />} />
              <Route path="diagnostics/demo/experience-rating" element={<ExperienceRatingOptimizerPage />} />
              <Route path="diagnostics/demo/suppression-audit" element={<SuppressionAuditPage />} />
              <Route path="diagnostics/demo/mental-health-forecaster" element={<MentalHealthForecasterPage />} />
              <Route path="diagnostics/demo/surplus-alert" element={<SurplusAlertPage />} />
              <Route path="diagnostics/demo/bc-decarbonization-model" element={<BCDecarbonizationModelPage />} />
              <Route path="diagnostics/demo/executive-risk-brief" element={<ExecutiveRiskBriefPage />} />

              <Route path="worksafebc-repricing-risk-diagnostic" element={<WorkSafeBCDiagnosticPage />} />
              <Route path="bc-pst-impact-diagnostic" element={<BCPSTDiagnosticPage />} />
              <Route path="tools/worksafe-repricing" element={<WorkSafeBCDiagnosticPage />} />
              <Route path="tools/pst-diagnostic" element={<PSTDiagnostic />} />
              <Route path="tools/mental-health-forecaster" element={<MentalHealthForecasterPage />} />
              <Route path="tools/province-comparator" element={<ProvinceComparatorPage />} />
              <Route path="tools/suppression-audit" element={<SuppressionAuditPage />} />
              <Route path="tools/experience-rating-optimizer" element={<ExperienceRatingOptimizerPage />} />
              <Route path="tools/surplus-alert" element={<SurplusAlertPage />} />
              <Route path="tools/executive-risk-brief" element={<ExecutiveRiskBriefPage />} />
              <Route path="tools/bc-decarbonization-model" element={<BCDecarbonizationModelPage />} />

              <Route path="diagnostics/pst-diagnostic" element={<PSTDiagnostic />} />
              <Route path="diagnostics/worksafe-repricing" element={<WorkSafeBCDiagnosticPage />} />
              <Route path="diagnostics/province-comparator" element={<ProvinceComparatorPage />} />
              <Route path="diagnostics/suppression-audit" element={<SuppressionAuditPage />} />
              <Route path="diagnostics/experience-rating" element={<ExperienceRatingOptimizerPage />} />
              <Route path="diagnostics/mental-health-forecaster" element={<MentalHealthForecasterPage />} />
              <Route path="diagnostics/surplus-alert" element={<SurplusAlertPage />} />
              <Route path="diagnostics/executive-risk-brief" element={<ExecutiveRiskBriefPage />} />
              <Route path="diagnostics/bc-decarbonization-model" element={<BCDecarbonizationModelPage />} />

              <Route path="dashboard" element={<Dashboard />} />

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
              <Route path="payment-success" element={<PaymentSuccessPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            <Route path="/admin/*" element={<Navigate to="/tools" replace />} />
            <Route path="/model" element={<ModelApp />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
    </Router>
  );
}

export default App;
