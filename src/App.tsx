import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PublicSectorPage = lazy(() => import('./pages/PublicSectorPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const BookingConfirmationPage = lazy(() => import('./pages/BookingConfirmationPage'));
const ConsultationLandingPage = lazy(() => import('./pages/ConsultationLandingPage'));
const WorkSafeBCDiagnosticPage = lazy(() => import('./pages/WorkSafeBCDiagnosticPage'));
const DiagnosticsPage = lazy(() => import('./pages/DiagnosticsPage'));
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
            <Route path="services" element={<ServicesPage />} />
            <Route path="work" element={<WorkPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="public-sector" element={<PublicSectorPage />} />
            <Route path="privacy" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="diagnostics" element={<DiagnosticsPage />} />
            <Route path="tools" element={<DiagnosticsPage />} />
            <Route path="worksafebc-repricing-risk-diagnostic" element={<WorkSafeBCDiagnosticPage />} />
            <Route path="bc-pst-impact-diagnostic" element={<BCPSTDiagnosticPage />} />
            <Route path="tools/pst-diagnostic" element={<PSTDiagnostic />} />
            <Route path="tools/mental-health-forecaster" element={<MentalHealthForecasterPage />} />
            <Route path="tools/province-comparator" element={<ProvinceComparatorPage />} />
            <Route path="tools/suppression-audit" element={<SuppressionAuditPage />} />
            <Route path="tools/experience-rating-optimizer" element={<ExperienceRatingOptimizerPage />} />
            <Route path="tools/surplus-alert" element={<SurplusAlertPage />} />
            <Route path="tools/executive-risk-brief" element={<ExecutiveRiskBriefPage />} />
            <Route path="tools/bc-decarbonization-model" element={<BCDecarbonizationModelPage />} />
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
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
