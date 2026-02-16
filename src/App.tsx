import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import ConsultationLandingPage from './pages/ConsultationLandingPage';

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
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />

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
    </Router>
  );
}

export default App;
