import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen" style={{ background: '#0f172a', color: '#e2e8f0' }}>
      <header className="border-b border-slate-700">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/admin" className="font-semibold text-lg">DDA Admin</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/admin" className={location.pathname === '/admin' ? 'underline' : ''}>Dashboard</Link>
            <Link to="/admin/login" className={location.pathname === '/admin/login' ? 'underline' : ''}>Login</Link>
            <Link to="/access">User Access</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
