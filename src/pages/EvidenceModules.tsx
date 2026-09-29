import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BASE_ASSUMPTIONS } from '@/lib/model/assumptions';

type Status='actual'|'proxy'|'flag';

function StatusTag({status}:{status:Status}){
  return <span className={`status-label status-${status}`}>{status.toUpperCase()}</span>
}

function EvidenceModule({title,source,children}:{title:string;source:ReactNode;children:ReactNode}){
  return <figure className="analysis-module">
    <figcaption><span>Evidence module</span><strong>{title}</strong></figcaption>
    {children}
    <p className="module-source">{source}</p>
  </figure>
}

type RegisterRow={cells:ReactNode[];status?:Status};

function Register({label,columns,rows,compare=false}:{label:string;columns:string[];rows:RegisterRow[];compare?:boolean}){
  return <div className={compare?'module-register module-register-compare':'module-register'} role="region" aria-label={label} tabIndex={0}>
    <table>
      <thead><tr>{columns.map(c=><th scope="col" key={c}>{c}</th>)}<th scope="col">Status</th></tr></thead>
      <tbody>{rows.map((row,r)=><tr key={r} className={row.status?`row-${row.status}`:undefined}>
        {row.cells.map((cell,c)=>c===0
          ?<th scope="row" key={c} data-label={columns[c]}>{cell}</th>
          :<td key={c} data-label={columns[c]}>{cell}</td>)}
        <td data-label="Status">{row.status?<StatusTag status={row.status}/>:<span className="status-none">Not established</span>}</td>
      </tr>)}</tbody>
    </table>
  </div>
}

function LabourModule(){
  const filters=[
    ['Headline requirement','The workforce total in the plan'],
    ['Occupation','Work no other trade can cover'],
    ['Qualification','Certified and deployable'],
    ['Place','Able to reach and stay at the project'],
    ['Timing','Available in the commissioning window'],
    ['Competition','Not drawn off by concurrent projects'],
  ];
  return <EvidenceModule title="Usable-supply decomposition" source={<>Resource-project workforce analysis, project anonymized. Method: <Link to="/insights/trade-gap-hidden-inside-a-workforce-number/">The trade gap hidden inside a workforce number</Link>.</>}>
    <ol className="labour-funnel">
      {filters.map(([label,note],i)=><li key={label} className="funnel-step" style={{width:`${100-i*8}%`}}>
        <span className="funnel-index">{String(i+1).padStart(2,'0')}</span>
        <div><b>{label}</b><small>{note}</small></div>
      </li>)}
      <li className="funnel-step funnel-binding" style={{width:'48%'}}>
        <span className="funnel-n">30</span>
        <div><b>Usable supply in the commissioning trade</b><small>Against 90 required</small></div>
      </li>
    </ol>
  </EvidenceModule>
}

function ResourceModule(){
  const gates=['Logistics and roads','Power','Regulation','Concurrent projects'];
  return <EvidenceModule title="Gates against a fixed date" source="Resource-project workforce analysis and regional planning material, anonymized. Only the labour gate carries a status because it is the only gate the published analysis resolves.">
    <ol className="dependency-chain">
      <li className="dep-gate dep-flag"><span className="dep-label">Labour</span><StatusTag status="flag"/><small>90 required, 30 available in the commissioning trade</small></li>
      {gates.map(g=><li className="dep-gate" key={g}><span className="dep-label">{g}</span><small>Mapped against the same window</small></li>)}
      <li className="dep-gate dep-fixed"><span className="dep-label">Commissioning date</span><small>Fixed. Every gate is tested against it.</small></li>
    </ol>
  </EvidenceModule>
}

function ScenarioModule(){
  const a=BASE_ASSUMPTIONS;
  const pct=(v:number|string)=>`${Math.round(Number(v)*100)}%`;
  return <EvidenceModule title="Scenario register" source="DDA's B.C. Energy Fiscal Decision Model, public assumption register.">
    <Register label="Scenario register" compare columns={['Assumption','Low','Base','High','Basis']} rows={[
      {cells:['B.C. plant inlet price, C$/GJ',a['price.bcPlantInlet.low'].value,a['price.bcPlantInlet.base'].value,a['price.bcPlantInlet.high'].value,a['price.bcPlantInlet.base'].source],status:'actual'},
      {cells:['Weighted average cost of capital','8%',pct(a['macro.wacc'].flagDefault),'12%',a['macro.wacc'].flagDefaultBasis],status:'flag'},
      {cells:['JKM LNG price, US$/MMBtu','',Number(a['price.jkm.base'].flagDefault).toFixed(2),'',a['price.jkm.base'].flagDefaultBasis],status:'flag'},
      {cells:['CCA rate, LNG facility','',pct(a['tax.ccaLNGFacility'].flagDefault),'',a['tax.ccaLNGFacility'].flagDefaultBasis],status:'flag'},
    ]}/>
  </EvidenceModule>
}

function InstitutionalModule(){
  return <EvidenceModule title="Claim register" source={<>Worked example from <Link to="/insights/unsupported-number-carries-the-answer/">When an unsupported number carries the answer</Link>. Each FLAG is a condition the conclusion depends on and the count does not establish.</>}>
    <p className="module-claim"><span>Claim tested</span>Apprenticeship registrations show that labour is available.</p>
    <Register label="Claim register" columns={['Condition the claim depends on','What the evidence shows']} rows={[
      {cells:['Registrations recorded','May be accurate. Measures entry to training, not available workers.'],status:'proxy'},
      {cells:['Workers complete training','Not established by a registration count'],status:'flag'},
      {cells:['Workers remain in the region','Not established by a registration count'],status:'flag'},
      {cells:['Workers enter the required occupation','Not established by a registration count'],status:'flag'},
      {cells:['Workers are available in the project window','Not established by a registration count'],status:'flag'},
    ]}/>
  </EvidenceModule>
}

// Evidence modules, by page route. Each sits after the second section of its page.
const modules: Record<string, () => ReactNode> = {
  '/what-we-do/capabilities/labour-and-workforce-analysis/': () => <LabourModule />,
  '/what-we-do/areas/mining-and-critical-minerals/': () => <ResourceModule />,
  '/what-we-do/capabilities/fiscal-and-scenario-modelling/': () => <ScenarioModule />,
  '/what-we-do/capabilities/institutional-and-policy-analysis/': () => <InstitutionalModule />,
};

export function AnalysisModule({ route }: { route: string }) {
  const render = modules[route];
  return render ? <>{render()}</> : null;
}
