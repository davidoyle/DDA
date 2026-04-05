import { Link } from 'react-router-dom';

const publicSectorCapabilities = [
  'Data Lexicon protocol — every number sourced, every proxy flagged, every gap named before it becomes a liability in a Council chamber or statutory hearing. Delivered as a named, auditable register.',
  'CSD-anchored geography discipline — primary model geography anchored to the Census Subdivision, not conflated with CMA-level data. The distinction is documented and defended.',
  'Two-model architecture — Model 1 (forecast and demand: population, households, housing, employment, land) plus Model 2 (allocation and feasibility: three spatial plans tested against capacity constraints, infrastructure cost indexing, and feasibility ratings). Projections are capped at documented endpoints.',
  'Four-phase engagement system — Council orientation before public materials are released, with scenario workshops designed so Council authors the preferred scenario instead of ratifying a pre-selected path.',
  'Bilingual delivery — baseline, not add-on. Public-facing materials are produced in both official languages.',
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
        <h2 className="headline-sm">A note on what DDA&apos;s models can and cannot do</h2>
        <p className="text-[#F3EFE6]/82">
          Projections are capped at documented study endpoints. Proxies are labelled. Data gaps are named, not papered
          over. The models produce defensible outputs, not certain ones. If your procurement process requires a
          consultant who will express certainty where the data does not support it, DDA is not the right fit.
        </p>
      </section>

      <section className="max-w-5xl">
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
