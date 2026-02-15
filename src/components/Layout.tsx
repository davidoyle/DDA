import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'How to use', path: '/how-to-use' },
    { label: 'Stories', path: '/stories' },
    { label: 'Tools', path: '/tools' },
    { label: 'Precedents', path: '/precedents' },
    { label: 'Submit', path: '/submit' },
  ];

  return (
    <div className="min-h-screen bg-[#0B3C43]">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled || !isHomePage
            ? 'bg-[#0B3C43]/95 backdrop-blur-md py-3 border-b border-[#F3EFE6]/10'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-[0.14em] text-[#F3EFE6] hover:text-[#D4A03A] transition-colors"
          >
            Workers Toolkit
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${
                  location.pathname === link.path ? 'text-[#D4A03A]' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#F3EFE6] hover:text-[#D4A03A] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-[#0B3C43]/98 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-heading text-2xl font-bold text-[#F3EFE6] hover:text-[#D4A03A] transition-colors ${
                  location.pathname === link.path ? 'text-[#D4A03A]' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#F3EFE6]/10 px-6 lg:px-[8vw] py-8 bg-[#0B3C43]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/glossary" className="nav-link text-sm">Glossary</Link>
            <Link to="/email-templates" className="nav-link text-sm">Email Templates</Link>
            <Link to="/collective-action" className="nav-link text-sm">Collective Action</Link>
            <Link to="/patterns" className="nav-link text-sm">Patterns</Link>
          </div>
          <p className="font-mono text-xs text-[#F3EFE6]/40 uppercase tracking-wider text-center">
            Not legal advice. Independent and worker-led.
          </p>
        </div>
        <div className="mt-6 pt-6 border-t border-[#F3EFE6]/5 text-center">
          <p className="body-text text-[#F3EFE6]/50 text-xs max-w-2xl mx-auto">
            This toolkit is for informational purposes only. It does not constitute legal advice. 
            No solicitor-client relationship is created by using this site. We are independent of 
            WorkSafeBC, employers, unions, and government.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
