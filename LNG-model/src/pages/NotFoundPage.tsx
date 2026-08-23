import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <section className="min-h-screen px-6 py-28 lg:px-[8vw]" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
    <div className="mx-auto max-w-3xl space-y-6 text-center">
      <p className="eyebrow">404 error</p>
      <h1 className="headline-md">This page is outside the model boundary.</h1>
      <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
        The page you requested may have moved, been renamed, or is no longer available. Return to DDA or explore the diagnostics library.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">Back to home</Link>
        <Link to="/tools" className="btn-secondary">View tools</Link>
        <Link to="/contact" className="btn-secondary">Contact DDA</Link>
      </div>
    </div>
  </section>
);

export default NotFoundPage;
