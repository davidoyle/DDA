import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { ArrowRight, Check, CircleAlert } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { pageByRoute, pageManifest, pages, type PublicPage } from '@/content/siteContent';
import { BASE_ASSUMPTIONS } from '@/lib/model/assumptions';

const fileRoutes: Record<string,string>={
 '01-home.md':'/','02-what-we-do.md':'/what-we-do/','03-fiscal-impact-growth-modelling.md':'/what-we-do/fiscal-impact-growth-modelling/','04-official-community-plan-policy-analysis.md':'/what-we-do/official-community-plan-policy-analysis/','05-economic-development-strategy.md':'/what-we-do/economic-development-strategy/','06-labour-market-analysis.md':'/what-we-do/labour-market-analysis/','07-resource-sector-complex-planning-analysis.md':'/what-we-do/resource-sector-complex-planning-analysis/','08-long-range-financial-scenario-planning.md':'/what-we-do/long-range-financial-scenario-planning/','09-public-interest-research-evidence-packages.md':'/what-we-do/institutional-policy-analysis/','10-who-we-are.md':'/who-we-are/','11-insights.md':'/insights/','12-insight-housing-target-delivery.md':'/insights/when-a-housing-target-outruns-delivery/','13-insight-trade-gap-workforce-number.md':'/insights/the-trade-gap-hidden-inside-a-workforce-number/','14-insight-what-a-flag-tells-you.md':'/insights/when-an-unsupported-number-carries-the-answer/','16-contact.md':'/contact/','17-privacy.md':'/privacy/','18-legal.md':'/legal/','19-terms.md':'/terms/','20-accessibility.md':'/accessibility/'
};

type Block={kind:'p'|'list'|'table';text?:string;items?:string[];rows?:string[][]};
type Subsection={title:string;blocks:Block[]};
type Section={title:string;blocks:Block[];subsections:Subsection[]};
type Document={title:string;intro:Block[];sections:Section[]};

function parse(source:string):Document{
  const lines=source.trim().split('\n');
  const doc:Document={title:lines[0].replace(/^# /,''),intro:[],sections:[]};
  let section:Section|undefined,sub:Subsection|undefined;
  const target=()=>sub?.blocks??section?.blocks??doc.intro;
  for(let i=1;i<lines.length;){
    const line=lines[i].trim();
    if(!line){i++;continue}
    if(line.startsWith('## ')){section={title:line.slice(3),blocks:[],subsections:[]};doc.sections.push(section);sub=undefined;i++;continue}
    if(line.startsWith('### ')){sub={title:line.slice(4),blocks:[]};section?.subsections.push(sub);i++;continue}
    if(line.startsWith('|')){const rows:string[][]=[];while(i<lines.length&&lines[i].trim().startsWith('|')){const row=lines[i].split('|').slice(1,-1).map(x=>x.trim());if(!/^[-: ]+$/.test(row.join('')))rows.push(row);i++}target().push({kind:'table',rows});continue}
    if(line.startsWith('- ')){const items:string[]=[];while(i<lines.length&&lines[i].trim().startsWith('- ')){items.push(lines[i].trim().slice(2));i++}target().push({kind:'list',items});continue}
    let text=line;i++;
    while(i<lines.length&&lines[i].trim()&&!/^(#{2,3}) |^- |^\|/.test(lines[i].trim())){text+=' '+lines[i].trim();i++}
    target().push({kind:'p',text})
  }
  return doc
}

function Rich({text}:{text:string}){
  const bits:ReactNode[]=[];
  const re=/(\*\*([^*]+)\*\*|\[([^\]]+)\]\(\.\/([^)]+)\))/g;
  let last=0,m:RegExpExecArray|null;
  while((m=re.exec(text))){
    bits.push(text.slice(last,m.index));
    bits.push(m[2]?<strong key={m.index}>{m[2]}</strong>:<Link key={m.index} to={fileRoutes[m[4]]??'/'}>{m[3]} <ArrowRight aria-hidden="true"/></Link>);
    last=re.lastIndex
  }
  bits.push(text.slice(last));
  return <>{bits}</>
}

function Blocks({blocks}:{blocks:Block[]}){
  return <>{blocks.map((b,i)=>
    b.kind==='p'?<p className={b.text?.startsWith('[Talk to')?'cta-text-link':undefined} key={i}><Rich text={b.text!}/></p>
    :b.kind==='list'?<ul key={i}>{b.items!.map(x=><li key={x}><Rich text={x}/></li>)}</ul>
    :<div className="public-table" role="region" aria-label="Evidence table" tabIndex={0} key={i}><table><thead><tr>{b.rows![0].map(x=><th scope="col" key={x}><Rich text={x}/></th>)}</tr></thead><tbody>{b.rows!.slice(1).map((row,r)=><tr key={r}>{row.map((x,c)=>c===0?<th scope="row" key={x}><Rich text={x}/></th>:<td key={x}><Rich text={x}/></td>)}</tr>)}</tbody></table></div>
  )}</>
}

function Breadcrumbs({page}:{page:PublicPage}){
  return <nav className="public-breadcrumb" aria-label="Breadcrumb">
    <Link to="/">Home</Link><span>/</span>
    {page.type==='capability-detail'&&<><Link to="/what-we-do/">What we do</Link><span>/</span></>}
    {page.type==='article'&&<><Link to="/insights/">Insights</Link><span>/</span></>}
    <span aria-current="page">{page.title}</span>
  </nav>
}

function PageHero({doc,kicker,actions=true,showSummary=true,fullViewport=false}:{doc:Document;kicker:string;actions?:boolean;showSummary?:boolean;fullViewport?:boolean}){
  const opening=doc.intro.length?doc.intro:doc.sections[0]?.blocks??[];
  return <header className={fullViewport?'page-hero page-hero-full':'page-hero'}>
    <div className="public-container">
      <p className="kicker">{kicker}</p>
      <h1>{doc.title}</h1>
      {!doc.intro.length&&doc.sections[0]&&<h2 className="hero-dek">{doc.sections[0].title}</h2>}
      {showSummary&&<div className="hero-summary"><Blocks blocks={opening}/></div>}
      {actions&&<div className="hero-actions">
        <Link className="button-primary" to="/what-we-do/">Explore what we do <ArrowRight/></Link>
        <Link className="button-secondary" to="/contact/">Talk to DDA <ArrowRight/></Link>
      </div>}
    </div>
  </header>
}

function ContactBand(){
  return <section className="contact-band">
    <div><p className="kicker">Talk to DDA</p><h2>Show us what you are working on.</h2></div>
    <Link className="button-primary" to="/contact/">Talk to DDA <ArrowRight/></Link>
  </section>
}

/* --- Per-service evidence modules: populated only from repository sources --- */

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

function OcpModule(){
  return <EvidenceModule title="Target-to-delivery trace" source={<>Village of Fruitvale housing and planning materials, including a 2024 duplex procurement. Full analysis: <Link to="/insights/when-a-housing-target-outruns-delivery/">When a housing target outruns delivery</Link>.</>}>
    <Register label="Target-to-delivery trace" columns={['Link','Evidence in the review']} rows={[
      {cells:['Target','Stated need of 291 units over twenty years'],status:'actual'},
      {cells:['Delivery','Historical production of 3.6 units a year'],status:'actual'},
      {cells:['Construction','2024 duplex procurement: builders could not deliver at the stated $300,000 to $320,000'],status:'actual'},
      {cells:['Market','Vacancy fell from 12% to 3% between 2015 and 2017 across Trail, Warfield, and Fruitvale. Regional and dated.'],status:'proxy'},
      {cells:['Land and servicing','Not established in the published review. A missing input council can commission.']},
    ]}/>
  </EvidenceModule>
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
  return <EvidenceModule title="Usable-supply decomposition" source={<>Resource-project workforce analysis, project anonymized. Method: <Link to="/insights/the-trade-gap-hidden-inside-a-workforce-number/">The trade gap hidden inside a workforce number</Link>.</>}>
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
  return <EvidenceModule title="Scenario register" source={<>DDA's B.C. Energy Fiscal Decision Model, public assumption register. <Link to="/model">Open the model</Link></>}>
    <Register label="Scenario register" compare columns={['Assumption','Low','Base','High','Basis']} rows={[
      {cells:['B.C. plant inlet price, C$/GJ',a['price.bcPlantInlet.low'].value,a['price.bcPlantInlet.base'].value,a['price.bcPlantInlet.high'].value,a['price.bcPlantInlet.base'].source],status:'actual'},
      {cells:['Weighted average cost of capital','8%',pct(a['macro.wacc'].flagDefault),'12%',a['macro.wacc'].flagDefaultBasis],status:'flag'},
      {cells:['JKM LNG price, US$/MMBtu','',Number(a['price.jkm.base'].flagDefault).toFixed(2),'',a['price.jkm.base'].flagDefaultBasis],status:'flag'},
      {cells:['CCA rate, LNG facility','',pct(a['tax.ccaLNGFacility'].flagDefault),'',a['tax.ccaLNGFacility'].flagDefaultBasis],status:'flag'},
    ]}/>
  </EvidenceModule>
}

function InstitutionalModule(){
  return <EvidenceModule title="Claim register" source={<>Worked example from <Link to="/insights/when-an-unsupported-number-carries-the-answer/">When an unsupported number carries the answer</Link>. Each FLAG is a condition the conclusion depends on and the count does not establish.</>}>
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

function AnalysisModule({page}:{page:PublicPage}){
  const map:Record<string,()=>ReactNode>={
    '/what-we-do/official-community-plan-policy-analysis/': ()=><OcpModule/>,
    '/what-we-do/labour-market-analysis/':              ()=><LabourModule/>,
    '/what-we-do/resource-sector-complex-planning-analysis/':()=><ResourceModule/>,
    '/what-we-do/long-range-financial-scenario-planning/':   ()=><ScenarioModule/>,
    '/what-we-do/institutional-policy-analysis/':       ()=><InstitutionalModule/>,
  };
  const render=map[page.route];
  return render?<>{render()}</>:<></>;
}

/* --- Static data --- */

const diagnosticTools=[
  {name:'WorkSafeBC Repricing Risk Diagnostic',href:'/tools/worksafe-repricing',desc:'Models repricing exposure versus sector and system benchmarks using published rate tables.'},
  {name:'B.C. Energy Fiscal Decision Model',href:'/model',desc:'Tests royalty and fiscal scenarios for B.C. LNG against a sourced assumption register. Executive, analyst, and audit views.'},
  {name:'BC Decarbonization Model',href:'/tools/bc-decarbonization',desc:'Stress-tests emissions pathways against statutory targets. Sector-level feasibility gaps and dependency sequences.'},
];

/* --- Cross-link maps (Task 3) --- */

const articleToService:Record<string,string>={
  '/insights/when-a-housing-target-outruns-delivery/':           '/what-we-do/official-community-plan-policy-analysis/',
  '/insights/the-trade-gap-hidden-inside-a-workforce-number/':  '/what-we-do/labour-market-analysis/',
  '/insights/when-an-unsupported-number-carries-the-answer/':   '/what-we-do/institutional-policy-analysis/',
};

const serviceToArticles:Record<string,string[]>={
  '/what-we-do/official-community-plan-policy-analysis/':    ['/insights/when-a-housing-target-outruns-delivery/'],
  '/what-we-do/labour-market-analysis/':                     ['/insights/the-trade-gap-hidden-inside-a-workforce-number/'],
  '/what-we-do/resource-sector-complex-planning-analysis/':  ['/insights/the-trade-gap-hidden-inside-a-workforce-number/'],
  '/what-we-do/institutional-policy-analysis/':              ['/insights/when-an-unsupported-number-carries-the-answer/'],
};

/* --- Page templates --- */

const workOutputs=[
  {label:'Decision models',detail:'Fiscal, economic, workforce, land, and project models that connect assumptions to consequences and allow scenarios to be tested.'},
  {label:'Evidence registers',detail:'Structured evidence bases that separate sourced facts, derived values, assumptions, and unresolved gaps, with source and reasoning kept traceable.'},
  {label:'Impact assessments',detail:'Analysis that follows a policy, investment, or project change through the firms, institutions, places, revenues, costs, and dependencies it affects.'},
  {label:'Data and decision architecture',detail:'Common definitions, transparent derivations, linked datasets, maps, and analytical structures that give a team a reliable basis for subsequent work.'},
];

const leadFigures:Record<string,{n:string;label:string}>={
  'The trade gap hidden inside a workforce number':{n:'90 / 30',label:'Workers required at commissioning in one trade, against workers available'},
};

function HomeTemplate({doc}:{doc:Document}){
  const insights=doc.sections.find(x=>x.title==='Evidence of how DDA thinks')!;
  const mandate=doc.sections.find(x=>x.title==='Already holding the mandate?')!;
  const contact=doc.sections.find(x=>x.title==='Show us what you are working on')!;
  return <>
    <PageHero doc={doc} kicker="Investigation · Evidence · Analysis" fullViewport={true}/>

    <section className="work-outputs-section public-container" aria-labelledby="work-outputs-heading">
      <div className="section-heading">
        <h2 id="work-outputs-heading">What the work produces</h2>
        <p className="section-subhead">Analysis built to be used</p>
        <p className="section-intro">The final product depends on the problem. DDA builds the model, evidence base, assessment, map, or decision tool needed to make the underlying issue visible and usable.</p>
      </div>
      <div className="work-outputs-grid">
        {workOutputs.map(({label,detail})=><article className="work-output-item" key={label}>
          <h3>{label}</h3><p>{detail}</p>
        </article>)}
      </div>
    </section>

    <section className="editorial-section public-container">
      <div className="section-heading"><p className="kicker">Inside the evidence</p><h2>{insights.title}</h2></div>
      <div className="insight-layout">
        {insights.subsections.map((section,i)=><article className={i===0?'insight-lead':'insight-card'} key={section.title}>
          {i===0&&leadFigures[section.title]&&<p className="lead-figure"><b>{leadFigures[section.title].n}</b><span>{leadFigures[section.title].label}</span></p>}
          <span>0{i+1} / Insight</span><h3>{section.title}</h3><Blocks blocks={section.blocks}/>
        </article>)}
      </div>
    </section>

    <section className="tools-strip">
      <div className="public-container">
        <div className="section-heading"><p className="kicker">Open tools</p><h2>Analytical models available now</h2></div>
        <div className="tools-strip-grid">
          {diagnosticTools.map(({name,href,desc})=><div className="tool-strip-item" key={href}>
            <strong>{name}</strong><p>{desc}</p>
            <Link to={href}>Open tool <ArrowRight/></Link>
          </div>)}
        </div>
      </div>
    </section>

    <section className="work-home">
      <div className="public-container">
        <div className="section-heading"><p className="kicker">For consulting teams</p><h2>{mandate.title}</h2></div>
        <div className="mandate-copy"><Blocks blocks={mandate.blocks}/></div>
      </div>
    </section>

    <section className="home-close public-container">
      <div><p className="kicker">Talk to DDA</p><h2>{contact.title}</h2><Blocks blocks={contact.blocks}/></div>
      <Link className="button-primary" to="/contact/">Talk to DDA <ArrowRight/></Link>
    </section>
  </>
}

function HubTemplate({doc}:{doc:Document}){
  const approach=doc.sections.find(x=>x.title==='How DDA gets into a problem')!;
  const apps=doc.sections.find(x=>x.title==='Areas where we commonly work')!;
  return <>
    <PageHero doc={doc} kicker="What we do" actions={false}/>
    <main className="public-container hub-content">
      <section>
        <div className="section-heading"><p className="kicker">How the work develops</p><h2>{approach.title}</h2></div>
        <div className="method-grid">
          {approach.subsections.map((section,i)=><article key={section.title}>
            <span>0{i+1}</span><h3>{section.title}</h3><Blocks blocks={section.blocks}/>
          </article>)}
        </div>
      </section>
      <section>
        <div className="section-heading"><p className="kicker">Common areas of work</p><h2>{apps.title}</h2></div>
        <Blocks blocks={apps.blocks}/>
        <div className="application-grid">
          {apps.subsections.map(section=><article key={section.title}>
            <h3>{section.title}</h3><Blocks blocks={section.blocks}/>
          </article>)}
        </div>
      </section>
      {doc.sections.filter(x=>x!==approach&&x!==apps).map(section=><section className="standard-section" key={section.title}>
        <h2>{section.title}</h2><Blocks blocks={section.blocks}/>
      </section>)}
    </main>
    <ContactBand/>
  </>
}

function sectionId(title:string){
  return title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
}

function DetailTemplate({doc,page}:{doc:Document;page:PublicPage}){
  const longForm=['/what-we-do/fiscal-impact-growth-modelling/','/what-we-do/economic-development-strategy/'].includes(page.route);
  const heroSection=longForm&&!doc.intro.length?doc.sections[0]:undefined;
  const sections=heroSection?doc.sections.slice(1):doc.intro.length?doc.sections:doc.sections.slice(1);
  const relatedArticles=(serviceToArticles[page.route]??[]).map(route=>pageManifest.find(x=>x.route===route)).filter((p):p is PublicPage=>!!p);
  return <>
    <Breadcrumbs page={page}/>
    <PageHero doc={doc} kicker="What we do" actions={false} showSummary={!heroSection}/>
    {heroSection&&<section className={`detail-introduction detail-introduction-${page.id.toLowerCase()}`}><div><Blocks blocks={heroSection.blocks}/></div></section>}
    <div className={`detail-layout detail-${page.id.toLowerCase()} public-container`}>
      <aside className="on-page">
        <strong>On this page</strong>
        {sections.map(x=><a key={x.title} href={`#${sectionId(x.title)}`}>{x.title}</a>)}
      </aside>
      <main>
        {sections.map((s,i)=>{
          const showModule=i===1&&!longForm;
          const last=i===sections.length-1;
          return <Fragment key={s.title}>
            {last&&relatedArticles.length>0&&<section className="detail-insights-link">
              <p className="kicker">See this in practice</p>
              <ul>{relatedArticles.map(p=><li key={p.route}><Link to={p.route}>{p.title} <ArrowRight/></Link></li>)}</ul>
            </section>}
            <section id={sectionId(s.title)} className={showModule?'analysis-section':'detail-section'}>
              <p className="section-number">{String(i+1).padStart(2,'0')}</p>
              <h2>{s.title}</h2>
              <Blocks blocks={s.blocks}/>
              {s.subsections.map(x=><div className="detail-subsection" key={x.title}><h3>{x.title}</h3><Blocks blocks={x.blocks}/></div>)}
              {showModule&&<AnalysisModule page={page}/>}
            </section>
          </Fragment>
        })}
      </main>
    </div>
  </>
}

function InsightsHubTemplate({doc}:{doc:Document}){
  const [lead,...rest]=pageManifest.filter(p=>p.type==='article');
  return <>
    <PageHero doc={doc} kicker="Insights" actions={false}/>
    <main className="public-container insights-editorial">
      <article className="featured-insight insight-hub-lead">
        <p className="kicker">{lead.topics.join(' · ')}{lead.readTime&&` · ${lead.readTime}`}</p>
        <h2><Link to={lead.route}>{lead.title}</Link></h2>
        {lead.finding&&<p className="insight-hub-finding">{lead.finding}</p>}
        <p>{lead.description}</p>
        <Link className="button-primary" to={lead.route}>Read the analysis <ArrowRight/></Link>
      </article>
      {rest.map((a,i)=><article className="insight-entry" key={a.route}>
        <span>{String(i+2).padStart(2,'0')}</span>
        <div className="insight-entry-body">
          <div className="insight-entry-tags">
            {a.topics.map(t=><span key={t}>{t}</span>)}
            {a.readTime&&<span>{a.readTime}</span>}
          </div>
          <h2><Link to={a.route}>{a.title}</Link></h2>
          {a.finding&&<p className="insight-entry-finding">{a.finding}</p>}
          <p>{a.description}</p>
          <Link className="insight-entry-read" to={a.route}>Read <ArrowRight/></Link>
        </div>
      </article>)}
    </main>
    <ContactBand/>
  </>
}

function ArticleTemplate({doc,page}:{doc:Document;page:PublicPage}){
  const intro=doc.intro.filter(block=>block.kind!=='p'||!block.text?.startsWith('**Perspective'));
  const related=pageManifest.filter(p=>p.type==='article'&&p.route!==page.route).slice(0,3);
  const relatedService=articleToService[page.route]?pageManifest.find(p=>p.route===articleToService[page.route]):undefined;
  return <>
    <Breadcrumbs page={page}/>
    <div className="article-with-rail public-container">
      <article className="article-shell">
        <header>
          <div className="article-meta">
            <span>Perspective</span><span>{page.topics[0]}</span><span>{page.readTime}</span>
          </div>
          <h1>{doc.title}</h1>
          {page.finding&&<div className="key-finding" role="note">
            <span className="kicker">Key finding</span>
            <p>{page.finding}</p>
          </div>}
          <Blocks blocks={intro}/>
        </header>
        {doc.sections.map(s=><section key={s.title} className={s.blocks.some(x=>x.kind==='table')?'article-evidence':''}>
          <h2>{s.title}</h2>
          <Blocks blocks={s.blocks}/>
          {s.subsections.map(x=><div key={x.title}><h3>{x.title}</h3><Blocks blocks={x.blocks}/></div>)}
        </section>)}
      </article>
      <aside className="article-rail">
        <div className="rail-block">
          <p className="kicker">About this piece</p>
          <div className="rail-meta">
            <span>{page.topics[0]}</span>
            {page.readTime&&<span>{page.readTime}</span>}
          </div>
        </div>
        <div className="rail-block">
          <p className="kicker">Source status</p>
          <ul className="rail-sources">
            <li><span className="status-label status-actual">ACTUAL</span> Named primary sources</li>
            <li><span className="status-label status-proxy">PROXY</span> Derived or estimated values</li>
            <li><span className="status-label status-flag">FLAG</span> Material unresolved inputs</li>
          </ul>
        </div>
        {relatedService&&<div className="rail-block">
          <p className="kicker">This analysis came from</p>
          <Link className="rail-service-link" to={relatedService.route}>{relatedService.navTitle} <ArrowRight/></Link>
        </div>}
        {related.length>0&&<div className="rail-block">
          <p className="kicker">Related</p>
          <ul className="rail-related">
            {related.map(p=><li key={p.route}><Link to={p.route}>{p.title}</Link></li>)}
          </ul>
        </div>}
      </aside>
    </div>
    {relatedService
      ?<div className="article-service-cta public-container">
          <div>
            <p className="kicker">See this in practice</p>
            <h3>{relatedService.navTitle}</h3>
            <p>{relatedService.description}</p>
          </div>
          <Link className="button-primary" to={relatedService.route}>Explore this capability <ArrowRight/></Link>
        </div>
      :<ContactBand/>
    }
  </>
}

function AboutTemplate({doc}:{doc:Document}){
  const sections=doc.intro.length?doc.sections:doc.sections.slice(1);
  return <>
    <PageHero doc={doc} kicker="Who we are" actions={false}/>
    <main className="about-layout public-container">
      {sections.map((s,i)=><section key={s.title} className={i===0?'about-lead':''}>
        <span>0{i+1}</span>
        <h2>{s.title}</h2>
        <Blocks blocks={s.blocks}/>
        {s.subsections.length>0&&<div className="method-grid">
          {s.subsections.map(x=><article key={x.title}><h3>{x.title}</h3><Blocks blocks={x.blocks}/></article>)}
        </div>}
      </section>)}
      {import.meta.env.DEV&&<section className="about-method-todo">
        <span>05</span>
        <div>
          <p className="kicker todo-marker">Development placeholder — owner approval required</p>
          <h2>One decision the work turns on</h2>
          <p className="about-todo-body">Add one specific methodological decision: a choice made in this practice that would surprise a peer, a constraint taken seriously that others ignore, or a point where the evidence forced a different answer. One paragraph. No generalities.</p>
          <p className="about-todo-fields"><strong>Required fields:</strong> the specific decision · what it replaced · why it changed the result</p>
        </div>
      </section>}
    </main>
    <ContactBand/>
  </>
}

function ContactForm(){
  const [state,setState]=useState<'idle'|'sending'|'success'|'error'>('idle');
  const [errors,setErrors]=useState<Record<string,string>>({});
  const summary=useRef<HTMLDivElement>(null);
  const fields=[['name','Name','text',true],['organization','Organization, optional','text',false],['email','Email','email',true],['message','What are you working on?','textarea',true]] as const;
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(state==='sending')return;
    const form=new FormData(e.currentTarget),next:Record<string,string>={};
    for(const [id,label,,required] of fields){
      const value=String(form.get(id)??'').trim();
      if(required&&!value)next[id]=`${label} is required.`;
      if(id==='email'&&value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))next[id]='Enter a valid email address.'
    }
    if(Object.keys(next).length){setErrors(next);setTimeout(()=>summary.current?.focus());return}
    setErrors({});setState('sending');
    try{
      const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(form))});
      if(!response.ok)throw new Error();
      setState('success')
    }catch{setState('error')}
  }
  return <section className="intake">
    <div className="intake-intro">
      <p className="kicker">Start here</p>
      <h2>Start with what you are working on.</h2>
      <p>A few sentences are enough. Tell us what you are trying to solve, what changed, or what you have been asked to deliver. You can also paste a public link to the project, RFP, report, dataset, or issue.</p>
      <div className="confidentiality">
        <CircleAlert/>
        <p>Do not send privileged, personal, or commercially confidential information in an unsecured first message. A suitable transfer method can be arranged.</p>
      </div>
    </div>
    <div>
      {Object.keys(errors).length>0&&<div className="error-summary" role="alert" tabIndex={-1} ref={summary}><strong>Check the following fields</strong><ul>{Object.entries(errors).map(([id,x])=><li key={id}><a href={`#${id}`}>{x}</a></li>)}</ul></div>}
      {state==='success'
        ?<div className="form-success" role="status"><Check/><h2>Inquiry sent.</h2><p>DDA will review the problem and get in touch to start a conversation where there is a fit.</p></div>
        :<form onSubmit={submit} noValidate>
          {fields.map(([id,label,type,required])=><div className="form-field" key={id}>
            <label htmlFor={id}>{label} {required&&<span>Required</span>}</label>
            {type==='textarea'?<textarea id={id} name={id} aria-invalid={!!errors[id]} aria-describedby={errors[id]?`${id}-error`:undefined}/>:<input id={id} name={id} type={type} aria-invalid={!!errors[id]} aria-describedby={errors[id]?`${id}-error`:undefined}/>}
            {errors[id]&&<small id={`${id}-error`}>{errors[id]}</small>}
          </div>)}
          <button className="button-primary" disabled={state==='sending'}>{state==='sending'?'Sending…':'Send inquiry'} <ArrowRight/></button>
          {state==='error'&&<p className="form-failure" role="alert">The inquiry could not be sent. Your entries remain in place; please try again.</p>}
        </form>
      }
      <p className="disclaimer">Sending an inquiry does not create a client relationship or engagement. Work begins only under agreed written terms.</p>
    </div>
  </section>
}

function ContactTemplate({doc,page}:{doc:Document;page:PublicPage}){
  return <>
    <Breadcrumbs page={page}/>
    <PageHero doc={doc} kicker="Contact" actions={false}/>
    <main className="public-container"><ContactForm/></main>
  </>
}

function UtilityTemplate({doc,page}:{doc:Document;page:PublicPage}){
  const [active,setActive]=useState('');
  const ids=useMemo(()=>doc.sections.map(s=>sectionId(s.title)),[doc]);
  useEffect(()=>{
    const obs=new IntersectionObserver(
      entries=>{const vis=entries.find(e=>e.isIntersecting);if(vis)setActive(vis.target.id)},
      {rootMargin:'-15% 0px -65% 0px'}
    );
    ids.forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el)});
    return()=>obs.disconnect()
  },[ids]);
  return <>
    <Breadcrumbs page={page}/>
    <details className="utility-contents-mobile">
      <summary>Contents</summary>
      <ul>{doc.sections.map(s=><li key={s.title}><a href={`#${sectionId(s.title)}`}>{s.title}</a></li>)}</ul>
    </details>
    <div className="utility-with-contents">
      <nav className="utility-contents-desktop" aria-label="Page contents">
        <strong>Contents</strong>
        <ul>{doc.sections.map(s=>{const id=sectionId(s.title);return <li key={s.title}><a href={`#${id}`} className={active===id?'is-active':undefined}>{s.title}</a></li>})}</ul>
      </nav>
      <article className="utility-shell">
        <header>
          <p className="kicker">Information</p>
          <h1>{doc.title}</h1>
          <Blocks blocks={doc.intro}/>
        </header>
        {doc.sections.map(s=><section id={sectionId(s.title)} key={s.title}>
          <h2>{s.title}</h2>
          <Blocks blocks={s.blocks}/>
          {s.subsections.map(x=><div key={x.title}><h3>{x.title}</h3><Blocks blocks={x.blocks}/></div>)}
        </section>)}
      </article>
    </div>
  </>
}

export default function WebsitePage(){
  const {pathname}=useLocation();
  const key=pathname==='/'?'/':pathname.endsWith('/')?pathname:`${pathname}/`;
  const page=pageByRoute[key];
  const doc=useMemo(()=>parse(pages[key]),[key]);
  useEffect(()=>{
    document.documentElement.dataset.publicPage=page.type;
    return()=>{delete document.documentElement.dataset.publicPage}
  },[page.type]);
  switch(page.type){
    case'home':            return <HomeTemplate doc={doc}/>;
    case'capability-hub':  return <HubTemplate doc={doc}/>;
    case'capability-detail':return <DetailTemplate doc={doc} page={page}/>;
    case'about':           return <AboutTemplate doc={doc}/>;
    case'insights-hub':    return <InsightsHubTemplate doc={doc}/>;
    case'article':         return <ArticleTemplate doc={doc} page={page}/>;
    case'contact':         return <ContactTemplate doc={doc} page={page}/>;
    default:               return <UtilityTemplate doc={doc} page={page}/>;
  }
}
