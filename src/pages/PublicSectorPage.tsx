import { Link } from 'react-router-dom';

const publicSectorCapabilities = [
  'Data Lexicon protocol: every number sourced, every proxy flagged, every gap named before it becomes a liability.',
  'CSD-anchored geography discipline (not CMA conflation).',
  'Two-model architecture: forecast demand engine + allocation feasibility engine.',
  'Four-phase engagement system with Council ownership built in.',
  'Bilingual delivery as baseline, not add-on.',
];

const PublicSectorPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="brand-panel space-y-4 max-w-5xl">
        <p className="eyebrow">Public sector</p>
        <h1 className="headline-md max-w-5xl">
          Municipal planning decisions go to Council. Council decisions go to statutory hearings. The numbers have to
          hold up at every stage.
        </h1>
      </section>

      <section className="card space-y-4 max-w-5xl">
        <h2 className="headline-sm">What DDA brings to public sector work</h2>
        <ul className="space-y-2 text-[#F3EFE6]/82 list-disc list-inside">
          {publicSectorCapabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </section>

      <section className="card space-y-4 max-w-5xl">
        <h2 className="headline-sm">Current engagements</h2>
        <p className="text-[#F3EFE6]/82">Urban growth strategy — Atlantic Canada municipality, 2026.</p>
      </section>

      <section className="card space-y-4 max-w-5xl">
        <h2 className="headline-sm">Scope note</h2>
        <p className="text-[#F3EFE6]/82">
          Full-scope public sector engagements operate under a different structure than standard tiers. In-person
          visits, stakeholder facilitation, council sessions, and statutory hearing support are included where required
          by mandate and procurement terms.
        </p>
        <Link
          to="/contact?context=Public%20sector%20%E2%80%94%20RFP%20or%20municipal%20engagement"
          className="btn-primary inline-flex w-fit"
        >
          Discuss an RFP →
        </Link>
      </section>
    </div>
  );
};

export default PublicSectorPage;
