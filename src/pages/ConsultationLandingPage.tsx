import { defaultContent, sectorConfig, type SectorKey } from '../lib/consultationContent';

type ConsultationLandingPageProps = {
  sector?: SectorKey;
};

const ConsultationLandingPage = ({ sector }: ConsultationLandingPageProps) => {
  const content = sector ? sectorConfig[sector] : defaultContent;

  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-14">
      <section className="space-y-6 max-w-5xl">
        <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight">{content.headline}</h1>
        <p className="text-xl md:text-2xl text-[#F3EFE6]/80">{content.subheadline}</p>
      </section>

      <section className="card max-w-5xl space-y-4">
        <h2 className="headline-md uppercase">{content.sectionTitle}</h2>
        <ul className="space-y-2">
          {content.bullets.map((item) => (
            <li key={item} className="text-[#F3EFE6]/85">
              ✓ {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="card max-w-5xl space-y-4">
        <p className="font-heading text-4xl font-bold">{content.priceHeadline}</p>
        <p className="text-[#F3EFE6]/75">{content.priceSubline}</p>
        <a
          href={content.ctaHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-[#D4A03A] px-6 py-3 font-semibold text-[#0B1110] hover:bg-[#e3b14f] transition-colors"
        >
          {content.ctaLabel}
        </a>
      </section>

      <section className="card max-w-5xl space-y-4">
        <h2 className="headline-md uppercase">{content.nextStepsTitle}</h2>
        <ul className="space-y-2 text-[#F3EFE6]/85">
          {content.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
        <p className="text-sm text-[#F3EFE6]/70">{content.closingLine}</p>
      </section>
    </div>
  );
};

export default ConsultationLandingPage;
