import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { ArrowRight, Check, CircleAlert } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { pageByRoute, pageManifest, pages, type PublicPage } from '@/content/siteContent';

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

/* --- Per-service evidence modules --- */

function FiscalModule(){
  const steps=[
    ['01','Population','Projection baseline'],
    ['02','Housing','Type and timing'],
    ['03','Infrastructure','Servicing requirements'],
    ['04','Cost','Capital and operating'],
    ['05','Revenue','Taxes and levies'],
    ['06','Scenario','Assumption sensitivity'],
  ];
  return <figure className="analysis-module analysis-p03">
    <figcaption><span>Decision instrument</span><strong>Scenario architecture</strong></figcaption>
    <div className="fiscal-chain">
      {steps.map(([n,label,sub],i)=><div key={label} className="fiscal-step">
        <div className="fiscal-step-body">
          <span>{n}</span><b>{label}</b><small>{sub}</small>
        </div>
        {i<steps.length-1&&<ArrowRight aria-hidden="true" className="fiscal-arrow"/>}
      </div>)}
    </div>
    <p><Check aria-hidden="true"/> Each assumption is traceable to its fiscal consequence.</p>
  </figure>
}

function OcpModule(){
  const rows:[string,'actual'|'proxy'|'flag'][]=[
    ['Land capacity','actual'],
    ['Servicing alignment','proxy'],
    ['Approval mechanism','actual'],
    ['Development phasing','proxy'],
    ['Bill 44 compliance','flag'],
  ];
  const labels:{actual:string;proxy:string;flag:string}={actual:'Supported',proxy:'Partial',flag:'Gap'};
  return <figure className="analysis-module analysis-p04">
    <figcaption><span>Decision instrument</span><strong>Policy-to-delivery trace</strong></figcaption>
    <div className="ocp-table">
      <div className="ocp-head"><span>Plan element</span><span>Evidence status</span></div>
      {rows.map(([el,status])=><div key={el} className="ocp-row">
        <span>{el}</span>
        <span className={`status-label status-${status}`}>{labels[status]}</span>
      </div>)}
    </div>
    <p><Check aria-hidden="true"/> Every plan element is tested against the evidence supporting it.</p>
  </figure>
}

function EconDevModule(){
  const conditions=['Locally owned','Infrastructure-ready','Labour-accessible','Sequenced'];
  const opportunities:[string,boolean[]][]=[
    ['Local opportunity',   [true,  true,  false, true ]],
    ['Export-linked sector',[true,  false, true,  false]],
    ['Service expansion',   [false, true,  true,  true ]],
    ['Tech transfer',       [true,  true,  false, false]],
  ];
  return <figure className="analysis-module analysis-p05">
    <figcaption><span>Decision instrument</span><strong>Opportunity screen</strong></figcaption>
    <div className="constraint-matrix">
      <div className="matrix-head">
        <span></span>
        {conditions.map(c=><span key={c}>{c}</span>)}
      </div>
      {opportunities.map(([opp,cells])=><div key={opp} className="matrix-row">
        <span className="matrix-opp">{opp}</span>
        {cells.map((pass,j)=><span key={j} className={pass?'matrix-pass':'matrix-gap'}>{pass?'✓':'—'}</span>)}
      </div>)}
    </div>
    <p><Check aria-hidden="true"/> Each opportunity is tested against the conditions that constrain it.</p>
  </figure>
}

function LabourModule(){
  const steps=[
    {n:'4,200',label:'Total workforce',note:'Regional supply'},
    {n:'1,840',label:'Qualified',note:'Cert. and experience'},
    {n:'890', label:'Geographically mobile',note:'Available to relocate'},
    {n:'340', label:'Available in window',note:'Project timing match'},
    {n:'210', label:'Usable supply',note:'Binding constraint'},
  ];
  const widths=[100,80,65,50,38];
  return <figure className="analysis-module analysis-p06">
    <figcaption><span>Decision instrument</span><strong>Usable-supply decomposition</strong></figcaption>
    <div className="labour-funnel">
      {steps.map((s,i)=><div key={s.label} className={`funnel-step${i===steps.length-1?' funnel-binding':''}`} style={{width:`${widths[i]}%`}}>
        <span className="funnel-n">{s.n}</span>
        <div><b>{s.label}</b><small>{s.note}</small></div>
      </div>)}
    </div>
    <p><Check aria-hidden="true"/> Supply shrinks at each filter — the binding constraint is where it stops.</p>
  </figure>
}

function ResourceModule(){
  const gates:[string,'ok'|'proxy'|'flag',string][]=[
    ['Labour',        'flag',   '90 required / 30 available'],
    ['Infrastructure','proxy',  'Road access confirmed'],
    ['Approvals',     'ok',     'EA certificate issued'],
    ['Capital',       'proxy',  'FID milestone pending'],
    ['Schedule',      'flag',   'Commissioning at risk'],
    ['Community',     'ok',     'IBAs in place'],
  ];
  return <figure className="analysis-module analysis-p07">
    <figcaption><span>Decision instrument</span><strong>Critical dependency map</strong></figcaption>
    <div className="dependency-chain">
      {gates.map(([label,status,detail])=><div key={label} className={`dep-gate dep-${status}`}>
        <span className="dep-label">{label}</span>
        <span className={`status-label status-${status}`}>{status==='ok'?'Ready':status==='proxy'?'Partial':'Gap'}</span>
        <small>{detail}</small>
      </div>)}
    </div>
    <p><Check aria-hidden="true"/> Each dependency is tested against whether it can clear before the fixed project date.</p>
  </figure>
}

function ScenarioModule(){
  const rows:[string,string,string,string,boolean][]=[
    ['Royalty rate',   '4.5%',  '6.0%',  '3.0%',   false],
    ['Project timeline','8 yr', '7 yr',  '11 yr',  false],
    ['Revenue outcome','$4.2B', '$6.1B', '$2.8B',  false],
    ['Capital exposure','$1.8B','$1.6B', '$2.4B',  false],
    ['LNG price',      'FLAG',  'FLAG',  'FLAG',   true ],
  ];
  return <figure className="analysis-module analysis-p08">
    <figcaption><span>Decision instrument</span><strong>Decision scenario register</strong></figcaption>
    <div className="scenario-table">
      <div className="scenario-head"><span>Assumption</span><span>Base</span><span>Optimistic</span><span>Stress</span></div>
      {rows.map(([label,base,opt,stress,flag])=><div key={label} className={`scenario-row${flag?' scenario-flag-row':''}`}>
        <span>{label}</span><span>{base}</span><span>{opt}</span><span>{stress}</span>
      </div>)}
    </div>
    <p><Check aria-hidden="true"/> Flagged inputs are documented — the answer should not depend on them.</p>
  </figure>
}

function InstitutionalModule(){
  const rows:[string,string,'actual'|'proxy'|'flag',string][]=[
    ['Hansard, 2023-11-14','Minister: 500 units delivered by Q4','flag','Target not traceable to project schedule'],
    ['Budget estimates 2024','$42M allocated to housing program','actual','Appropriation confirmed, disbursement unknown'],
    ['Ministerial Q1 update','On track per internal metrics','proxy','Metrics not publicly defined'],
    ['Legislation s.17(4)','Reporting obligation applies','actual','No public disclosure found'],
  ];
  return <figure className="analysis-module analysis-p09">
    <figcaption><span>Decision instrument</span><strong>Claim-and-source register</strong></figcaption>
    <div className="evidence-register" role="region" aria-label="Evidence register" tabIndex={0}>
      <div className="reg-head"><span>Source</span><span>Claim</span><span>Status</span><span>Consequence</span></div>
      {rows.map(([source,claim,status,consequence],i)=><div key={i} className="reg-row">
        <span className="reg-source">{source}</span>
        <span>{claim}</span>
        <span><span className={`status-label status-${status}`}>{status.toUpperCase()}</span></span>
        <span className="reg-consequence">{consequence}</span>
      </div>)}
    </div>
    <p><Check aria-hidden="true"/> Every claim is connected to its source, classification, and material consequence.</p>
  </figure>
}

function AnalysisModule({page}:{page:PublicPage}){
  const map:Record<string,()=>ReactNode>={
    '/what-we-do/fiscal-impact-growth-modelling/':      ()=><FiscalModule/>,
    '/what-we-do/official-community-plan-policy-analysis/': ()=><OcpModule/>,
    '/what-we-do/economic-development-strategy/':       ()=><EconDevModule/>,
    '/what-we-do/labour-market-analysis/':              ()=><LabourModule/>,
    '/what-we-do/resource-sector-complex-planning-analysis/':()=><ResourceModule/>,
    '/what-we-do/long-range-financial-scenario-planning/':   ()=><ScenarioModule/>,
    '/what-we-do/institutional-policy-analysis/':       ()=><InstitutionalModule/>,
  };
  const render=map[page.route];
  return render?<>{render()}</>:<></>;
}

/* --- Static data --- */

const recognitionStats=[
  {n:'90 / 30',label:'workers required vs. available',note:'A specific commissioning trade at a fixed project date — not aggregate labour supply — controlled the schedule.'},
  {n:'291',label:'housing units needed',note:'Historical delivery: 3.6 per year. Local builders could not meet the stated cost range. The delivery chain was never tested.'},
  {n:'48',label:'model assumptions',note:'36 royalty-rate scenarios. Twelve documented FLAG defaults. Each assumption traceable to its fiscal consequence.'},
];

const diagnosticTools=[
  {name:'WorkSafeBC Repricing Risk Diagnostic',href:'/tools/worksafe-repricing',desc:'Models repricing exposure versus sector and system benchmarks using published rate tables.'},
  {name:'B.C. Energy Fiscal Decision Model',href:'/model',desc:'48 assumptions, 36 royalty-rate scenarios across four LNG projects. Executive, analyst, and audit views.'},
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

const capabilities=[
  ['Learn the system','Trace the organizations, policy, infrastructure, labour, economics, and timing that belong to the problem.'],
  ['Reconstruct the evidence','Connect fragmented sources, definitions, dates, datasets, and claims.'],
  ['Test what matters','Find the constraint, gap, dependency, assumption, or exposure and establish what it changes.'],
  ['Build the response','Produce the analysis or working asset the situation requires.'],
];

const workOutputs=[
  {label:'Fiscal decision model',detail:'48 assumptions, 36 royalty-rate scenarios, Monte Carlo analysis across four LNG projects. Thirty-six assumptions ACTUAL; twelve documented FLAG defaults.'},
  {label:'Evidence register',detail:'243 rows separating sourced facts, derived values, and structural gaps — built to support a constraint-sequenced regional economic development strategy.'},
  {label:'Policy impact assessment',detail:'586-paragraph assessment of revenue, cascade effects, and firm-level absorption from a provincial tax expansion analysis.'},
  {label:'Data Lexicon',detail:'37 entries establishing common definitions and transparent derivations before land demand, servicing, absorption, and workforce-housing constraints were modelled.'},
];

function HomeTemplate({doc}:{doc:Document}){
  const insights=doc.sections.find(x=>x.title==='Evidence of how DDA thinks')!;
  const mandate=doc.sections.find(x=>x.title==='Already holding the mandate?')!;
  const contact=doc.sections.find(x=>x.title==='Show us what you are working on')!;
  return <>
    {/* 1. Hero */}
    <PageHero doc={doc} kicker="Investigation · Evidence · Analysis" fullViewport={true}/>

    {/* 2. Proof — what the work produces */}
    <section className="work-outputs-section public-container">
      <div className="section-heading"><p className="kicker">What the work produces</p><h2>Analytical instruments that live in the decision</h2></div>
      <div className="work-outputs-grid">
        {workOutputs.map(({label,detail})=><div className="work-output-item" key={label}>
          <strong>{label}</strong><p>{detail}</p>
        </div>)}
      </div>
    </section>

    {/* 3. Recognition — specific evidence figures */}
    <div className="stats-row" aria-label="Evidence figures">
      <div className="public-container">
        {recognitionStats.map(s=><div className="stats-item" key={s.n}>
          <span className="stats-n">{s.n}</span>
          <strong>{s.label}</strong>
          <p>{s.note}</p>
        </div>)}
      </div>
    </div>

    {/* 4. Investigation — insights with analytical context */}
    <section className="editorial-section public-container">
      <div className="section-heading"><p className="kicker">Inside the evidence</p><h2>{insights.title}</h2></div>
      <div className="insight-layout">
        {insights.subsections.map((section,i)=><article className={i===0?'insight-lead':'insight-card'} key={section.title}>
          <span>0{i+1} / Insight</span><h3>{section.title}</h3><Blocks blocks={section.blocks}/>
        </article>)}
      </div>
    </section>

    {/* 5. How DDA joins a mandate */}
    <section className="work-home">
      <div className="public-container">
        <div className="section-heading"><p className="kicker">For consulting teams</p><h2>{mandate.title}</h2></div>
        <div className="mandate-copy"><Blocks blocks={mandate.blocks}/></div>
      </div>
    </section>

    {/* Diagnostic tools in public use */}
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

    {/* 6. One primary CTA */}
    <section className="home-close public-container">
      <div><p className="kicker">Talk to DDA</p><h2>{contact.title}</h2><Blocks blocks={contact.blocks}/></div>
      <Link className="button-primary" to="/contact/">Show us what you are working on <ArrowRight/></Link>
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
          const showModule=i===3&&!longForm;
          return <section id={sectionId(s.title)} className={showModule?'analysis-section':'detail-section'} key={s.title}>
            <p className="section-number">{String(i+1).padStart(2,'0')}</p>
            <h2>{s.title}</h2>
            <Blocks blocks={s.blocks}/>
            {s.subsections.map(x=><div className="detail-subsection" key={x.title}><h3>{x.title}</h3><Blocks blocks={x.blocks}/></div>)}
            {showModule&&<AnalysisModule page={page}/>}
          </section>
        })}
        {(serviceToArticles[page.route]??[]).length>0&&<section className="detail-insights-link">
          <p className="kicker">See this in practice</p>
          <ul>{(serviceToArticles[page.route]??[]).map(route=>{const p=pageManifest.find(x=>x.route===route);return p?<li key={route}><Link to={route}>{p.title} <ArrowRight/></Link></li>:null})}</ul>
        </section>}
      </main>
    </div>
  </>
}

function InsightsHubTemplate({doc}:{doc:Document}){
  const articles=pageManifest.filter(p=>p.type==='article');
  return <>
    <PageHero doc={doc} kicker="Insights" actions={false}/>
    <main className="public-container insights-editorial">
      {articles.map((a,i)=><article className="insight-entry" key={a.route}>
        <span>{String(i+1).padStart(2,'0')}</span>
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
      <section className="about-method-todo">
        <span>05</span>
        <div>
          <p className="kicker todo-marker">Development placeholder — owner approval required</p>
          <h2>One decision the work turns on</h2>
          <p className="about-todo-body">Add one specific methodological decision: a choice made in this practice that would surprise a peer, a constraint taken seriously that others ignore, or a point where the evidence forced a different answer. One paragraph. No generalities.</p>
          <p className="about-todo-fields"><strong>Required fields:</strong> the specific decision · what it replaced · why it changed the result</p>
        </div>
      </section>
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
