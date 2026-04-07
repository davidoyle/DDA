import { Link } from 'react-router-dom';

const DiagnosticsSubscribePage = () => {
  return (
    <div className="px-6 lg:px-16 py-[var(--space-10)]">
      <section className="max-w-[680px] mx-auto card">
        <p className="eyebrow">Diagnostic access</p>
        <h1 className="headline-md mt-3">Nine tools. Built from public evidence.</h1>
        <p className="mt-4 text-[17px]" style={{ color: 'var(--text-secondary)' }}>
          Annual subscription — $399.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#" className="btn-primary">Subscribe →</a>
          <Link to="/diagnostics?sub=active" className="btn-secondary">Already subscribed? Sign in</Link>
        </div>
      </section>
    </div>
  );
};

export default DiagnosticsSubscribePage;
