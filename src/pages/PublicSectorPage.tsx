import DdaLogo from '../components/DdaLogo';
import { Link } from 'react-router-dom';

const hybridModel = [
  'Core Analytics: Proprietary forecasting and feasibility engines (Remote).',
  'Community Engagement: Facilitated workshops, council sessions, and public consultations (In-Person/Virtual).',
  'Deliverables: Defensible, evidence-based recommendations ready for Council adoption.',
];

const PublicSectorPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="brand-panel space-y-4 max-w-5xl">
        <DdaLogo compact className="mb-4" />
        <p className="eyebrow">Public Sector Engagements</p>
        <h1 className="headline-md">Evidence-Led Urban Growth Strategy & Municipal Planning.</h1>
        <p className="text-xl text-[#F3EFE6]/85 max-w-4xl">
          DDA delivers forensic systems analysis for municipalities and public agencies requiring defensible,
          evidence-led planning outcomes.
        </p>
      </section>

      <section className="card space-y-4 max-w-5xl">
        <h2 className="headline-sm">The Hybrid Model</h2>
        <p className="text-[#F3EFE6]/82">
          DDA applies its proprietary Dual-Engine Modeling approach (Model 1 & Model 2) to municipal strategy
          projects, while partnering with local facilitation specialists to support the human side of implementation.
        </p>
        <ul className="space-y-2 text-[#F3EFE6]/80 list-disc list-inside">
          {hybridModel.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card space-y-4 max-w-5xl">
        <p className="eyebrow">Case study pipeline</p>
        <p className="text-[#F3EFE6]/82">Currently preparing: Saint John Urban Growth Strategy (2026).</p>
      </section>

      <section id="open-rfps" className="card space-y-4 max-w-5xl">
        <h2 className="headline-sm">Current Open RFPs</h2>
        <p className="text-[#F3EFE6]/82">
          DDA is accepting full-scope public sector engagements that combine advanced analytics with structured
          community participation processes.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="btn-primary">
            Discuss an RFP
          </Link>
          <Link to="/services" className="btn-secondary">
            Compare standard tiers
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PublicSectorPage;
