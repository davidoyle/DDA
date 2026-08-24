import React from 'react';
import { CheckoutError } from '@/lib/stripe/checkout';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: CheckoutError) => void;
}

interface State {
  error: CheckoutError | null;
}

export class CheckoutErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: unknown): State {
    if (error instanceof CheckoutError) {
      return { error };
    }

    const fallbackMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      error: new CheckoutError(
        fallbackMessage,
        'BOUNDARY_ERROR',
        'Something went wrong. Please try again.',
      ),
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Checkout error:', error, errorInfo);
    this.props.onError?.(error as CheckoutError);
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="card" role="alert">
          <h3 className="headline-sm">Unable to process payment</h3>
          <p className="mt-2 text-sm">{this.state.error.userFriendlyMessage}</p>
          <div className="mt-4 flex gap-3">
            <button className="btn-secondary" onClick={() => { window.location.href = '/contact?context=payment_error'; }}>
              Contact Support
            </button>
            <button className="btn-primary" onClick={() => this.setState({ error: null })}>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
