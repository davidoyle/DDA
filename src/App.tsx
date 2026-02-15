import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import HowToUsePage from './pages/HowToUsePage';
import StoriesPage from './pages/StoriesPage';
import ToolsPage from './pages/ToolsPage';
import PrecedentsPage from './pages/PrecedentsPage';
import SubmitPage from './pages/SubmitPage';
import GlossaryPage from './pages/GlossaryPage';
import EmailTemplatesPage from './pages/EmailTemplatesPage';
import CollectiveActionPage from './pages/CollectiveActionPage';
import PatternsPage from './pages/PatternsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="how-to-use" element={<HowToUsePage />} />
          <Route path="stories" element={<StoriesPage />} />
          <Route path="tools" element={<ToolsPage />} />
          <Route path="precedents" element={<PrecedentsPage />} />
          <Route path="submit" element={<SubmitPage />} />
          <Route path="glossary" element={<GlossaryPage />} />
          <Route path="email-templates" element={<EmailTemplatesPage />} />
          <Route path="collective-action" element={<CollectiveActionPage />} />
          <Route path="patterns" element={<PatternsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
