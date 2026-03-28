import DdaLogo from '../components/DdaLogo';
import { Link } from 'react-router-dom';

const frontDoors = [
  {
    eyebrow: 'Door 1',
    title: 'Public interest analysis',
    audience: 'For policy readers, journalists, advocates, and researchers following published investigations and briefs.',
    body: 'Read independent, evidence-led analysis of institutional behaviour and accountability.',
    cta: 'Read the work',
    href: '/work',
    style: 'border-[#D4A03A]/45',
  },
  {
    eyebrow: 'Door 2',
    title: 'Employer diagnostic tools',
    audience: 'For HR, finance, risk, and operations leaders managing WorkSafeBC and compliance exposure.',
    body: 'Use technical decision-support diagnostics in a neutral employer-facing environment.',
    cta: 'Open diagnostics',
    href: '/tools',
    style: 'border-[#6D8FA6]/45',
  },
  {
    eyebrow: 'Door 3',
    title: 'Research and engagements',
    audience: 'For procurement teams, legal counsel, and organizations scoping custom analysis.',
    body: 'Review methods, engagement structure, and outputs before starting a commissioned project.',
    cta: 'Explore engagements',
    href: '/services',
    style: 'border-[#6FA680]/45',
  },
];

const HomePage = () => {
  return (
    <div className="pt-24 pb-20 px-6 lg:px-[8vw] space-y-16">
      <section className="space-y-6 max-w-5xl">
        <DdaLogo className="mb-2" />
        <p className="eyebrow">Data-driven Decisions Analytics</p>
        <h1 className="headline-lg max-w-4xl">
          Three services. Three audiences. Choose your entry point.
        </h1>
        <p className="body-text body-text-secondary max-w-3xl">
          DDA operates across public-interest investigations, employer diagnostics, and commissioned research.
          Start in the section built for your mandate.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {frontDoors.map((door) => (
          <article
            key={door.title}
            className={`card space-y-4 border-l-2 ${door.style} bg-[#0e454c]/70 backdrop-blur-sm`}
          >
            <p className="eyebrow text-[#D4A03A]">{door.eyebrow}</p>
            <h2 className="headline-sm">{door.title}</h2>
            <p className="text-[#F3EFE6]/90 text-sm">{door.audience}</p>
            <p className="text-[#F3EFE6]/75 text-sm">{door.body}</p>
            <Link to={door.href} className="btn-secondary inline-flex w-full justify-center">
              {door.cta}
            </Link>
          </article>
        ))}
      </section>

      <section className="card space-y-4 max-w-5xl">
        <p className="eyebrow">What DDA does</p>
        <h2 className="headline-md">Public evidence systems analysis for accountability and decision support</h2>
        <p className="text-[#F3EFE6]/82 max-w-4xl">
          We synthesize published records across years, departments, and institutions to surface structural patterns.
          The same method powers editorial investigations, employer risk diagnostics, and scoped research
          engagements.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link to="/work" className="btn-primary">
            Latest analysis
          </Link>
          <Link to="/contact" className="btn-secondary">
            Commission research
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
