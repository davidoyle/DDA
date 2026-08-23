import { Link } from 'react-router-dom';

export default function UserAccessPage() {
  return (
    <div className="px-6 py-16 max-w-2xl mx-auto space-y-5">
      <h1 className="headline-md">User Access / Magic Link</h1>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Use the secure access link sent to your email to sign in. Access links route through <code>/verify-access</code> and grant plan-based diagnostics access.
      </p>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        If you do not have a link, contact your administrator or request support.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link className="btn-primary" to="/contact">Contact Support</Link>
        <Link className="btn-secondary" to="/admin/login">Admin Login</Link>
      </div>
    </div>
  );
}
