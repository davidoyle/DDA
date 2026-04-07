import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Analysis', href: '/work' },
    { label: 'Research', href: '/services' },
    { label: 'Public Sector', href: '/public-sector' },
    { label: 'Municipal Models', href: '/tools/municipal-models' },
    { label: 'About', href: '/about' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <nav className="fixed top-0 left-0 right-0 z-[100] h-14 border-b" style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}>
        <div className="h-full px-6 lg:px-16 flex items-center justify-between gap-4">
          <Link to="/" className="text-[18px] font-semibold tracking-[-0.02em]">
            DDA.
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="nav-link"
                style={{ color: location.pathname === link.href ? 'var(--text-primary)' : undefined, fontWeight: location.pathname === link.href ? 500 : 400 }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link to="/contact" className="btn-primary">
              Describe your situation →
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-xl"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? '×' : '≡'}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-14 z-[99] border-b md:hidden" style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}>
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} onClick={() => setIsMobileMenuOpen(false)} className="nav-link">
                {link.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full">
              Describe your situation →
            </Link>
          </div>
        </div>
      )}

      <main className="pt-14">
        <Outlet />
      </main>

      <footer className="border-t px-6 lg:px-16 py-8" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-[1120px] mx-auto flex flex-wrap items-center gap-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
          <a href="mailto:david.doyle@ddanalysis.ca" className="hover:underline">david.doyle@ddanalysis.ca</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
