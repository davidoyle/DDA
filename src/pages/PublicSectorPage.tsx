import DdaLogo from '../components/DdaLogo';
import { Link } from 'react-router-dom';

const PublicSectorPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="brand-panel space-y-4 max-w-5xl">
        <DdaLogo compact className="mb-4" />
        <p className="eyebrow">Public Sector & Municipal Strategy</p>
        <h1 className="headline-md">Evidence-Led Urban Growth Strategy & Municipal Planning.</h1>
        <p className="text-xl text-[#F3EFE6]/85">
          DDA combines forensic systems analysis with delivery structures designed for full-scope municipal RFP engagements.
        </p>
      </section>

      <section className="card space-y-4 max-w-5xl">
        <p className="eyebrow">The Hybrid Model</p>
        <p className="text-[#F3EFE6]/82">
          DDA brings proprietary Dual-Engine Modeling (Model 1 & Model 2) to public projects and pairs that analytics
          stack with facilitation partners to deliver robust engagement, workshops, and council-ready decision support.
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#F3EFE6]/82">
          <li><strong>Core Analytics:</strong> Proprietary forecasting and feasibility engines (Remote).</li>
          <li><strong>Community Engagement:</strong> Facilitated workshops, council sessions, and public consultations (In-Person/Virtual).</li>
          <li><strong>Deliverables:</strong> Defensible, evidence-based recommendations ready for Council adoption.</li>
        </ul>
      </section>

      <section className="card space-y-3 max-w-5xl">
        <p className="eyebrow">Case Study Pipeline</p>
        <p className="text-[#F3EFE6]/82">Currently preparing: <strong>Saint John Urban Growth Strategy (2026)</strong>.</p>
      </section>

      <section className="card space-y-4 max-w-5xl">
        <p className="eyebrow">Engagement Structure</p>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-md border border-[#F3EFE6]/12 p-4">
            <p className="font-semibold text-[#F3EFE6]">David Doyle — Lead Analyst & Modeling Engine</p>
            <p className="mt-2 text-sm text-[#F3EFE6]/75">Leads quantitative diagnostics, scenario development, and evidence synthesis.</p>
          </article>
          <article className="rounded-md border border-[#F3EFE6]/12 p-4">
            <p className="font-semibold text-[#F3EFE6]">Local Facilitation Partner</p>
            <p className="mt-2 text-sm text-[#F3EFE6]/75">
              For public engagement and in-person workshops, DDA collaborates with accredited Atlantic Canada planning firms to
              ensure robust community participation.
            </p>
          </article>
        </div>
      </section>

      <section id="open-rfps" className="card space-y-3 max-w-5xl">
        <p className="eyebrow">Open RFPs</p>
        <p className="text-[#F3EFE6]/82">DDA is currently accepting full-scope municipal and public-sector opportunities.</p>
        <Link to="/contact" className="btn-primary inline-flex">Submit an RFP opportunity</Link>
      </section>
    </div>
  );
};

export default PublicSectorPage;
