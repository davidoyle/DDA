import { Link } from 'react-router-dom';
import { defaultContent, sectorConfig, type SectorKey } from '../lib/consultationContent';

type ConsultationLandingPageProps = {
  sector?: SectorKey;
};

const credibilityPoints = [
  '$1.7B in annual systemic costs',
  '129,786 missing claims',
  'WorkSafeBC Institutional Analysis',
  '6 economic models now cited in constitutional challenge prep',
];

const ConsultationLandingPage = ({ sector }: ConsultationLandingPageProps) => {
  const content = sector ? sectorConfig[sector] : defaultContent;

  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-14">
      <section className="space-y-6 max-w-5xl">
        <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-tight">
          Your {content.label} {content.focus}
        </h1>
        <p className="text-xl md:text-2xl italic text-[#F3EFE6]/70">{content.heroPain}</p>
        <p className="text-lg">30 minutes. Your numbers. A plan.</p>
      </section>

      <section className="card max-w-5xl">
        <p className="font-semibold tracking-[0.12em] text-sm uppercase text-[#D4A03A]">Pain Timeline</p>
        <div className="mt-5 grid grid-cols-4 gap-3 text-center text-sm md:text-base">
          {['2026', '2027', '2028', '2029'].map((year) => (
            <span key={year}>{year}</span>
          ))}
        </div>

        <div className="relative mt-4">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#D4A03A]/45" />
          <div className="relative grid grid-cols-4 gap-3 text-center">
            {['Now', 'Hike', 'Peak', 'Normal'].map((stage) => (
              <div key={stage} className="space-y-2">
                <div className="mx-auto h-4 w-4 rounded-full border border-[#D4A03A] bg-[#D4A03A]" />
                <span className="block text-sm text-[#F3EFE6]/75">{stage}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 text-[#F3EFE6]/85">
          Your exposure starts now. Most organizations won&apos;t see it until it&apos;s too late.
        </p>
      </section>

      <section className="space-y-4 max-w-5xl">
        <h2 className="headline-md">What You&apos;ll See In 30 Minutes</h2>
        <ul className="space-y-2">
          {content.valueBullets.map((item) => (
            <li key={item} className="text-[#F3EFE6]/85">
              ✓ {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 md:grid-cols-2 max-w-5xl">
        <article className="card border border-red-400/40 bg-red-950/20">
          <h3 className="font-heading text-xl uppercase text-red-300">Without This Analysis</h3>
          <ul className="mt-4 space-y-2 text-[#F3EFE6]/85">
            {content.fearWithout.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
        <article className="card border border-emerald-300/40 bg-emerald-950/20">
          <h3 className="font-heading text-xl uppercase text-emerald-200">With It</h3>
          <ul className="mt-4 space-y-2 text-[#F3EFE6]/85">
            {content.fearWith.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="card max-w-5xl space-y-4">
        <h2 className="headline-md">The Same Methodology Used For</h2>
        <ul className="space-y-2 text-[#F3EFE6]/85">
          {credibilityPoints.map((point) => (
            <li key={point}>• {point}</li>
          ))}
        </ul>
        <p className="text-[#D4A03A]">{content.credibilityExample}</p>
        <p className="text-[#F3EFE6]/60 text-sm">Featured in: [placeholder]</p>
      </section>

      <section className="max-w-5xl">
        <p className="text-xl md:text-2xl italic text-[#F3EFE6]/75">{content.painLine}</p>
      </section>

      <section className="card max-w-5xl space-y-4">
        <p className="font-heading text-4xl font-bold">$500 CAD</p>
        <p className="text-[#F3EFE6]/75">(One payment. No subscriptions.)</p>
        <p className="text-[#F3EFE6]/85">Only 10 consultations available this month.</p>
        <a
          href="https://calendly.com/username/30-minute-exposure-analysis"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-[#D4A03A] px-6 py-3 font-semibold text-[#0B1110] hover:bg-[#e3b14f] transition-colors"
        >
          BOOK YOUR 30-MINUTE CALL
        </a>
        <p className="text-sm text-[#F3EFE6]/65">Most weeks book within 48 hours of email send.</p>
        <Link
          to={sector ? `/booking-confirmation/${sector}` : '/booking-confirmation'}
          className="inline-block text-sm underline text-[#D4A03A]"
        >
          Preview post-booking page
        </Link>
      </section>

      <section className="space-y-4 max-w-5xl">
        <h2 className="headline-md">What You&apos;ll Get</h2>
        <ul className="space-y-2 text-[#F3EFE6]/85">
          {content.deliverables.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>

        <div className="rounded-xl border border-[#F3EFE6]/20 bg-[#F3EFE6]/5 p-5 h-28 md:h-[120px] relative overflow-hidden">
          <p className="font-semibold tracking-[0.08em] text-xs uppercase text-[#F3EFE6]/70">Sample - Confidential</p>
          <div className="mt-3 space-y-2 blur-[1px]">
            <div className="h-2 bg-[#F3EFE6]/20 rounded" />
            <div className="h-2 bg-[#F3EFE6]/25 rounded w-10/12" />
            <div className="h-2 bg-[#F3EFE6]/15 rounded w-8/12" />
            <div className="h-2 bg-[#F3EFE6]/20 rounded w-11/12" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsultationLandingPage;
