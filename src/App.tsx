import { Component, type ErrorInfo, type ReactNode, Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
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

type RouteChunkErrorBoundaryProps = {
  children: ReactNode;
};

type RouteChunkErrorBoundaryState = {
  hasError: boolean;
};

class RouteChunkErrorBoundary extends Component<RouteChunkErrorBoundaryProps, RouteChunkErrorBoundaryState> {
  state: RouteChunkErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Route chunk failed to load', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">We hit a loading problem.</h1>
          <p className="mt-3 max-w-lg text-slate-600">
            A recent update may have changed this page. Please refresh to load the latest version.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="mt-6 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            Refresh page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <AnalyticsTracker />
      <RouteChunkErrorBoundary>
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
          <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="diagnostics" element={<DiagnosticsPage />} />
            <Route path="worksafebc-repricing-risk-diagnostic" element={<WorkSafeBCDiagnosticPage />} />
            <Route path="bc-pst-impact-diagnostic" element={<BCPSTDiagnosticPage />} />
            <Route path="tools/pst-diagnostic" element={<PSTDiagnostic />} />
            <Route path="tools/mental-health-forecaster" element={<MentalHealthForecasterPage />} />
            <Route path="tools/province-comparator" element={<ProvinceComparatorPage />} />
            <Route path="tools/suppression-audit" element={<SuppressionAuditPage />} />
            <Route path="tools/experience-rating-optimizer" element={<ExperienceRatingOptimizerPage />} />
            <Route path="tools/surplus-alert" element={<SurplusAlertPage />} />
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
      </RouteChunkErrorBoundary>
    </Router>
  );
}

export default App;
