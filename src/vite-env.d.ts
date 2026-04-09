/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?: string;
  readonly NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY?: string;
  readonly NEXT_PUBLIC_STRIPE_PRICE_PRO_ANNUAL?: string;
  readonly NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY?: string;
  readonly NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_ANNUAL?: string;
  readonly VITE_STRIPE_PUBLISHABLE_KEY?: string;
  readonly VITE_STRIPE_PRICE_PRO_MONTHLY?: string;
  readonly VITE_STRIPE_PRICE_PRO_ANNUAL?: string;
  readonly VITE_STRIPE_PRICE_ENTERPRISE_MONTHLY?: string;
  readonly VITE_STRIPE_PRICE_ENTERPRISE_ANNUAL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
