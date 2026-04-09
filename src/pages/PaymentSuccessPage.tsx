import { Link, useSearchParams } from 'react-router-dom';

export default function PaymentSuccessPage() {
  const [params] = useSearchParams();
  const returnTo = params.get('returnTo') || '/diagnostics';

  return (
    <div className="px-6 lg:px-16 py-16 max-w-3xl space-y-4">
      <h1 className="headline-md">Payment Successful</h1>
      <p>Your checkout completed successfully. Your access will refresh automatically.</p>
      <Link to={returnTo} className="btn-primary">Continue</Link>
    </div>
  );
}
