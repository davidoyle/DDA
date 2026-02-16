import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-[#0B3C43]">
      <div className="grain-overlay" />

      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled ? 'bg-[#0B3C43]/95 backdrop-blur-md py-3 border-b border-[#F3EFE6]/10' : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-6 lg:px-10 flex items-center justify-between">
          <Link to="/" className="font-mono text-xs uppercase tracking-[0.14em] text-[#F3EFE6] hover:text-[#D4A03A] transition-colors">
            DDA
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`nav-link ${location.pathname === link.path ? 'text-[#D4A03A]' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#F3EFE6] hover:text-[#D4A03A] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-[#0B3C43]/98 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-heading text-2xl font-bold text-[#F3EFE6] hover:text-[#D4A03A] transition-colors ${location.pathname === link.path ? 'text-[#D4A03A]' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <main className="relative">
        <Outlet />
      </main>

      <footer className="border-t border-[#F3EFE6]/10 px-6 lg:px-[8vw] py-8 bg-[#0B3C43]">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#F3EFE6]/75">
          <Link to="/privacy" className="hover:text-[#D4A03A] transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-[#D4A03A] transition-colors">Terms of Service</Link>
          <Link to="/contact" className="hover:text-[#D4A03A] transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
