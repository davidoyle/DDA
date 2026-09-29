import { Suspense, createContext, Fragment, lazy, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { fileRoutes, pageByRoute, pageManifest, pages, titleRoutes, type PublicPage } from '@/content/siteContent';
const AnalysisModule = lazy(() => import('./EvidenceModules').then((m) => ({ default: m.AnalysisModule })));
import { trail } from '@/lib/seo.mjs';
import { inlineText, parsePage, type Inline, type MdBlock } from '@/lib/markdown.mjs';

/*
 * Renders the approved copy in /content exactly as written. Templates supply
 * layout only. Every visible sentence on a public page comes from a Markdown file.
 */

type Heading = Extract<MdBlock, { type: 'heading' }>;
type Section = { heading?: Heading; blocks: MdBlock[] };

const isHeading = (b: MdBlock): b is Heading => b.type === 'heading';
const firstToken = (b: MdBlock) => (b.type === 'paragraph' ? b.lines[0][0] : undefined);

// A paragraph that holds one link and nothing else: rendered as a button.
function ctaOf(b: MdBlock): { href: string; primary: boolean; text: Inline[] } | undefined {
  if (b.type !== 'paragraph' || b.lines.length !== 1 || b.lines[0].length !== 1) return undefined;
  const t = b.lines[0][0];
  if (t.t === 'link' && !t.auto) return { href: t.href, primary: false, text: t.c };
  if (t.t === 'strong' && t.c.length === 1 && t.c[0].t === 'link' && !t.c[0].auto) return { href: t.c[0].href, primary: true, text: t.c[0].c };
  return undefined;
}
const isCta = (b: MdBlock) => !!ctaOf(b);
// A paragraph that opens with a bold link: a card in a list of pages.
const isPageCard = (b: MdBlock) => { const t = firstToken(b); return !!t && t.t === 'strong' && t.c[0]?.t === 'link'; };

function structure(blocks: MdBlock[], opts: { closingCta?: boolean } = {}) {
  const h1i = blocks.findIndex((b) => isHeading(b) && b.level === 1);
  const pre = blocks.slice(0, h1i);
  const h1 = blocks[h1i] as Heading;
  const rest = blocks.slice(h1i + 1);
  let k = 0;
  let tagline: Heading | undefined;
  if (rest[0] && isHeading(rest[0]) && rest[0].level === 2) { tagline = rest[0]; k = 1; }
  const hero: MdBlock[] = [];
  for (; k < rest.length; k++) {
    const b = rest[k];
    if (b.type === 'rule' || b.type === 'heading') break;
    hero.push(b);
  }
  const tail = rest.slice(k)[0]?.type === 'rule' ? rest.slice(k + 1) : rest.slice(k);
  const primary = Math.min(6, ...tail.filter(isHeading).map((b) => b.level));
  const sections: Section[] = [];
  let cur: Section = { blocks: [] };
  const push = () => { if (cur.heading || cur.blocks.length) sections.push(cur); };
  for (const b of tail) {
    if (b.type === 'rule') { push(); cur = { blocks: [] }; continue; }
    if (isHeading(b) && b.level === primary) { push(); cur = { heading: b, blocks: [] }; continue; }
    cur.blocks.push(b);
  }
  push();
  let closing: MdBlock[] = [];
  const last = sections[sections.length - 1];
  if (opts.closingCta && last && isCta(last.blocks[last.blocks.length - 1])) closing = [last.blocks.pop()!];
  const levels = [...new Set(blocks.filter(isHeading).map((b) => b.level))].sort((a, b) => a - b);
  return { pre, h1, tagline, hero, sections, closing, levels, toc: hero.find((b) => b.type === 'toc') };
}

// Heading levels in the DOM never skip. A page that jumps from "#" to "###" gets h2.
const LevelContext = createContext<(sourceLevel: number) => number>((n) => n);

function Rich({ tokens }: { tokens: Inline[] }): ReactNode {
  return <>{tokens.map((t, i) => {
    if (t.t === 'text') return <Fragment key={i}>{t.v}</Fragment>;
    if (t.t === 'strong') return <strong key={i}><Rich tokens={t.c} /></strong>;
    if (t.t === 'em') return <em key={i}><Rich tokens={t.c} /></em>;
    return <SiteLink key={i} href={t.href}><Rich tokens={t.c} /></SiteLink>;
  })}</>;
}

function SiteLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (href.startsWith('/') && !/\.\w+$/.test(href)) return <Link className={className} to={href}>{children}</Link>;
  const external = /^https?:/.test(href);
  return <a className={className} href={href} {...(external ? { rel: 'noopener noreferrer' } : {})}>{children}</a>;
}

function HeadingTag({ block, className }: { block: Heading; className?: string }) {
  const level = useContext(LevelContext)(block.level);
  const Tag = `h${level}` as 'h2';
  return <Tag id={block.id} className={className}><Rich tokens={block.tokens} /></Tag>;
}

function Lines({ lines }: { lines: Inline[][] }) {
  return <>{lines.map((l, i) => <Fragment key={i}>{i > 0 && <br />}<Rich tokens={l} /></Fragment>)}</>;
}

function Blocks({ blocks, ids, forcePrimary }: { blocks: MdBlock[]; ids?: Set<string>; forcePrimary?: boolean }) {
  // A table is named by the heading or bold caption line that introduces it.
  const labels: string[] = [];
  blocks.reduce((label, b) => {
    labels.push(label);
    if (b.type === 'heading') return inlineText(b.tokens);
    const t = firstToken(b);
    return t && t.t === 'strong' && b.type === 'paragraph' && b.lines.length === 1 && b.lines[0].length === 1 ? inlineText(t.c) : label;
  }, '');
  return <>{blocks.map((b, i) => {
    switch (b.type) {
      case 'heading': return <HeadingTag key={i} block={b} className={`md-h${b.level}`} />;
      case 'paragraph': {
        const cta = ctaOf(b);
        if (cta) return <p className="cta-line" key={i}><SiteLink className={cta.primary || forcePrimary ? 'button-primary' : 'button-secondary'} href={cta.href}><Rich tokens={cta.text} /> <ArrowRight aria-hidden="true" /></SiteLink></p>;
        return <p key={i}><Lines lines={b.lines} /></p>;
      }
      case 'list': return <ul key={i}>{b.items.map((x, j) => <li key={j}><Rich tokens={x} /></li>)}</ul>;
      case 'quote': return <blockquote key={i}><p><Lines lines={b.lines} /></p></blockquote>;
      case 'image': {
        const wide = b.src.includes('delivery-chain');
        return <figure className="article-figure" key={i}>
          <div className="figure-scroll" role="region" aria-label="Figure" tabIndex={0}><img src={b.src} alt={b.alt} loading="lazy" decoding="async" width={wide ? 980 : 800} height={wide ? 330 : 250} /></div>
          {b.caption && <figcaption><Rich tokens={b.caption} /></figcaption>}
        </figure>;
      }
      case 'toc': return <Toc key={i} block={b} ids={ids} />;
      case 'table': return <DataTable key={i} block={b} label={labels[i]} />;
      default: return null;
    }
  })}</>;
}

function DataTable({ block, label }: { block: Extract<MdBlock, { type: 'table' }>; label: string }) {
  return <div className="public-table" role="region" aria-label={label || 'Table'} tabIndex={0}>
    <table>
      <thead><tr>{block.header.map((h, i) => <th scope="col" key={i}>{h.length ? <Rich tokens={h} /> : <span className="sr-only">Number</span>}</th>)}</tr></thead>
      <tbody>{block.rows.map((row, r) => <tr key={r}>{row.map((c, ci) => ci === 0 ? <th scope="row" key={ci}><Rich tokens={c} /></th> : <td key={ci}><Rich tokens={c} /></td>)}</tr>)}</tbody>
    </table>
  </div>;
}

function Toc({ block, ids }: { block: Extract<MdBlock, { type: 'toc' }>; ids?: Set<string> }) {
  return <nav className="on-page" aria-label={block.label}>
    <strong>{block.label}</strong>
    {block.items.map((x) => ids?.has(x.slug) ? <a key={x.slug} href={`#${x.slug}`}>{x.text}</a> : <span key={x.slug}>{x.text}</span>)}
  </nav>;
}

function Breadcrumbs({ page }: { page: PublicPage }) {
  const crumbs = trail(page, pageManifest);
  return <nav className="public-breadcrumb" aria-label="Breadcrumb">
    {crumbs.map((c, i) => i < crumbs.length - 1
      ? <Fragment key={c.route}><Link to={c.route}>{c.name}</Link><span aria-hidden="true">/</span></Fragment>
      : <span key={c.route} aria-current="page">{c.name}</span>)}
  </nav>;
}

type Doc = ReturnType<typeof structure>;

function Hero({ doc, full, image, aside }: { doc: Doc; full?: boolean; image?: string; aside?: ReactNode }) {
  const actions = doc.hero.filter(isCta);
  const text = doc.hero.filter((b) => !isCta(b) && b.type !== 'toc');
  return <header className={['page-hero', full && 'page-hero-full', aside && 'page-hero-aside', image && 'page-hero-image'].filter(Boolean).join(' ')}>
    {image && <img className="hero-bg" src={image} alt="" aria-hidden="true" width={1672} height={941} fetchPriority="high" decoding="async" />}
    {aside && <div className="public-container hero-aside">{aside}</div>}
    <div className="public-container">
      <h1><Rich tokens={doc.h1.tokens} /></h1>
      {doc.tagline && <HeadingTag block={doc.tagline} className="hero-dek" />}
      {text.length > 0 && <div className="hero-summary"><Blocks blocks={text} /></div>}
      {actions.length > 0 && <div className="hero-actions">{actions.map((a, i) => <Blocks key={i} blocks={[a]} forcePrimary={i === 0 && !actions.some((x) => ctaOf(x)?.primary)} />)}</div>}
    </div>
  </header>;
}

/* Section bodies: lead blocks, page cards, and sub-sections in source order. */

function splitSubs(blocks: MdBlock[]) {
  const first = blocks.findIndex(isHeading);
  if (first < 0) return { lead: blocks, subs: [] as { heading: Heading; blocks: MdBlock[] }[] };
  const level = (blocks[first] as Heading).level;
  const subs: { heading: Heading; blocks: MdBlock[] }[] = [];
  for (const b of blocks.slice(first)) {
    if (isHeading(b) && b.level === level) subs.push({ heading: b, blocks: [] });
    else subs[subs.length - 1].blocks.push(b);
  }
  return { lead: blocks.slice(0, first), subs };
}

function SectionBody({ blocks, subLayout, ids }: { blocks: MdBlock[]; subLayout: 'grid' | 'insight' | 'plain'; ids?: Set<string> }) {
  const { lead, subs } = splitSubs(blocks);
  const cards = lead.filter(isPageCard);
  const asCards = subLayout === 'grid' && cards.length >= 3;
  const before = asCards ? lead.slice(0, lead.findIndex(isPageCard)) : lead;
  const after = asCards ? lead.slice(lead.lastIndexOf(cards[cards.length - 1]) + 1) : [];
  return <>
    <Blocks blocks={before} ids={ids} />
    {asCards && <div className="application-grid">{cards.map((c, i) => <article key={i}><Blocks blocks={[c]} /></article>)}</div>}
    <Blocks blocks={after} ids={ids} />
    {subs.length > 0 && (subLayout === 'plain'
      ? subs.map((s) => <div className="detail-subsection" key={s.heading.id}><HeadingTag block={s.heading} className="md-sub" /><Blocks blocks={s.blocks} /></div>)
      : <div className={subLayout === 'grid' ? 'method-grid' : 'insight-layout'}>{subs.map((s, i) => <article className={subLayout === 'insight' ? (i === 0 ? 'insight-lead' : 'insight-card') : undefined} key={s.heading.id}>
          <HeadingTag block={s.heading} className="md-sub" /><Blocks blocks={s.blocks} />
        </article>)}</div>)}
  </>;
}

function Sections({ sections, className, subLayout, keyed = false, wrap, extra }: { sections: Section[]; className: string; subLayout: 'grid' | 'insight' | 'plain'; keyed?: boolean; wrap?: string; extra?: (index: number) => ReactNode }) {
  const ids = useMemo(() => new Set(sections.flatMap((s) => (s.heading ? [s.heading.id] : []))), [sections]);
  return <>{sections.map((s, i) => <section key={s.heading?.id ?? `tail-${i}`} id={keyed ? s.heading?.id : undefined} className={[className, s.heading ? '' : 'md-tail', s.blocks.some((b) => b.type === 'table') ? 'has-table' : ''].join(' ').trim()}>
    {s.heading && <HeadingTag block={s.heading} className="md-section-title" />}
    {wrap ? <div className={wrap}><SectionBody blocks={s.blocks} subLayout={subLayout} ids={ids} /></div> : <SectionBody blocks={s.blocks} subLayout={subLayout} ids={ids} />}
    {extra?.(i)}
  </section>)}</>;
}

/* Templates */

const insightImages: Record<string, string> = { 'When a housing target is larger than delivery': '/images/housing-target-delivery.webp' };

function HomeTemplate({ doc }: { doc: Doc }) {
  return <>
    <Hero doc={doc} full image="/images/home-hero.webp" />
    {doc.sections.map((s, i) => {
      const last = i === doc.sections.length - 1;
      const { lead, subs } = splitSubs(s.blocks);
      const cta = lead.filter(isCta);
      return <section key={s.heading?.id ?? i} className={last ? 'home-section home-close public-container' : 'home-section public-container'}>
        {last
          ? <><div>{s.heading && <HeadingTag block={s.heading} className="md-section-title" />}<Blocks blocks={lead.filter((b) => !isCta(b))} /></div><div className="home-close-actions"><Blocks blocks={cta} /></div></>
          : <>
            {s.heading && <HeadingTag block={s.heading} className="md-section-title" />}
            <div className="home-copy"><Blocks blocks={lead} /></div>
            {subs.length > 0 && <div className="insight-layout">{subs.map((x, j) => <article className={[j === 0 ? 'insight-lead' : 'insight-card', insightImages[x.heading.text] ? 'insight-media' : ''].join(' ').trim()} key={x.heading.id}>
              {insightImages[x.heading.text] && <img className="insight-media-img" src={insightImages[x.heading.text]} alt="" aria-hidden="true" width={1152} height={768} loading="lazy" decoding="async" />}
              <HeadingTag block={x.heading} className="md-sub" /><Blocks blocks={x.blocks} />
            </article>)}</div>}
          </>}
      </section>;
    })}
  </>;
}

function HubTemplate({ doc, page }: { doc: Doc; page: PublicPage }) {
  return <>
    <Breadcrumbs page={page} />
    <Hero doc={doc} />
    <div className="public-container hub-content"><Sections sections={doc.sections} className="standard-section" subLayout="grid" /></div>
  </>;
}

function DetailTemplate({ doc, page }: { doc: Doc; page: PublicPage }) {
  const ids = useMemo(() => new Set(doc.sections.flatMap((s) => (s.heading ? [s.heading.id] : []))), [doc]);
  return <>
    <Breadcrumbs page={page} />
    <Hero doc={doc} />
    <div className={`detail-layout public-container${doc.toc ? '' : ' detail-layout-single'}`}>
      {doc.toc && <aside><Blocks blocks={[doc.toc]} ids={ids} /></aside>}
      <div className="detail-main"><Sections sections={doc.sections} className="detail-section" subLayout="plain" keyed extra={(i) => (i === 1 ? <Suspense fallback={null}><AnalysisModule route={page.route} /></Suspense> : null)} /></div>
    </div>
  </>;
}

function InsightsHubTemplate({ doc, page }: { doc: Doc; page: PublicPage }) {
  return <>
    <Breadcrumbs page={page} />
    <Hero doc={doc} />
    <div className="public-container insights-editorial">
      <Sections sections={doc.sections} className="insight-entry-block" subLayout="plain" />
      {doc.closing.length > 0 && <div className="closing-cta"><Blocks blocks={doc.closing} /></div>}
    </div>
  </>;
}

function ArticleTemplate({ doc, page }: { doc: Doc; page: PublicPage }) {
  const meta = doc.pre.flatMap((b) => (b.type === 'paragraph' ? b.lines : []));
  const bylineFirst = doc.hero[0];
  const hasByline = bylineFirst?.type === 'paragraph' && inlineText(bylineFirst.lines[0]).startsWith('By ');
  const service = pageManifest.find((p) => p.route === page.relatedService);
  const related = pageManifest.filter((p) => p.type === 'article' && p.route !== page.route);
  return <>
    <Breadcrumbs page={page} />
    <div className="article-with-rail public-container">
      <article className="article-shell">
        <header>
          <div className="article-meta">{meta.map((l, i) => <span key={i}><Rich tokens={l} /></span>)}</div>
          <h1><Rich tokens={doc.h1.tokens} /></h1>
          {doc.tagline && <HeadingTag block={doc.tagline} className="article-dek" />}
          {hasByline && bylineFirst.type === 'paragraph' && <p className="article-byline"><Lines lines={bylineFirst.lines} /></p>}
          {page.finding && <div className="key-finding" role="note"><span className="kicker">Key finding</span><p>{page.finding}</p></div>}
          <Blocks blocks={hasByline ? doc.hero.slice(1) : doc.hero} />
        </header>
        <Sections sections={doc.sections} className="article-section" subLayout="plain" />
      </article>
      <aside className="article-rail" aria-label="Related to this article">
        <div className="rail-block">
          <p className="kicker">Source status</p>
          <ul className="rail-sources">
            <li><span className="status-label status-actual">ACTUAL</span> Named primary sources</li>
            <li><span className="status-label status-proxy">PROXY</span> Derived or estimated values</li>
            <li><span className="status-label status-flag">FLAG</span> Material unresolved inputs</li>
          </ul>
        </div>
        {service && <div className="rail-block">
          <p className="kicker">Related service</p>
          <Link className="rail-service-link" to={service.route}>{service.navTitle} <ArrowRight aria-hidden="true" /></Link>
        </div>}
        {related.length > 0 && <div className="rail-block">
          <p className="kicker">Related</p>
          <ul className="rail-related">{related.map((p) => <li key={p.route}><Link to={p.route}>{p.title}</Link></li>)}</ul>
        </div>}
      </aside>
    </div>
  </>;
}

function AboutTemplate({ doc, page }: { doc: Doc; page: PublicPage }) {
  return <>
    <Breadcrumbs page={page} />
    <Hero doc={doc} aside={<figure className="principal-portrait"><img src="/images/david-doyle.jpg" alt="David Doyle" width={800} height={800} fetchPriority="high" /><figcaption><strong>David Doyle</strong><span>Principal, DDA</span></figcaption></figure>} />
    <div className="about-layout public-container"><Sections sections={doc.sections} className="about-section" subLayout="plain" wrap="about-body" /></div>
  </>;
}

function ProseTemplate({ doc, page }: { doc: Doc; page: PublicPage }) {
  return <>
    <Breadcrumbs page={page} />
    <Hero doc={doc} />
    <div className="public-container prose-layout"><Sections sections={doc.sections} className="detail-section" subLayout="plain" /></div>
  </>;
}

const FORM_FIELDS = [['name', 'Name', 'text', true], ['organization', 'Organization, optional', 'text', false], ['email', 'Email', 'email', true], ['message', 'What are you working on?', 'textarea', true]] as const;

function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const summary = useRef<HTMLDivElement>(null);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'sending') return;
    const form = new FormData(e.currentTarget), next: Record<string, string> = {};
    for (const [id, label, , required] of FORM_FIELDS) {
      const value = String(form.get(id) ?? '').trim();
      if (required && !value) next[id] = `${label} is required.`;
      if (id === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) next[id] = 'Enter a valid email address.';
    }
    if (Object.keys(next).length) { setErrors(next); setTimeout(() => summary.current?.focus()); return; }
    setErrors({}); setState('sending');
    try {
      const response = await fetch('/api/contact/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(form)) });
      if (!response.ok) throw new Error();
      setState('success');
    } catch { setState('error'); }
  }
  return <div className="contact-form-slot">
    {Object.keys(errors).length > 0 && <div className="error-summary" role="alert" tabIndex={-1} ref={summary}><strong>Check the following fields</strong><ul>{Object.entries(errors).map(([id, x]) => <li key={id}><a href={`#${id}`}>{x}</a></li>)}</ul></div>}
    {state === 'success'
      ? <div className="form-success" role="status"><Check aria-hidden="true" /><p><strong>Inquiry sent.</strong> DDA will review the problem and get in touch to start a conversation where there is a fit.</p></div>
      : <form onSubmit={submit} noValidate aria-label="Send an inquiry">
        {FORM_FIELDS.map(([id, label, type, required]) => <div className="form-field" key={id}>
          <label htmlFor={id}>{label} {required && <span>Required</span>}</label>
          {type === 'textarea' ? <textarea id={id} name={id} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-error` : undefined} /> : <input id={id} name={id} type={type} autoComplete={id === 'email' ? 'email' : id === 'name' ? 'name' : id === 'organization' ? 'organization' : undefined} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-error` : undefined} />}
          {errors[id] && <small id={`${id}-error`}>{errors[id]}</small>}
        </div>)}
        <button className="button-primary" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send inquiry'} <ArrowRight aria-hidden="true" /></button>
        {state === 'error' && <p className="form-failure" role="alert">The inquiry could not be sent. Your entries remain in place. Please try again.</p>}
      </form>}
  </div>;
}

// The form sits directly under the "What to send" section.
function ContactTemplate({ doc, page }: { doc: Doc; page: PublicPage }) {
  return <>
    <Breadcrumbs page={page} />
    <Hero doc={doc} />
    <div className="public-container prose-layout">
      {doc.sections.map((s, i) => <Fragment key={s.heading?.id ?? i}>
        <Sections sections={[s]} className="detail-section" subLayout="plain" />
        {s.heading?.text === 'What to send' && <ContactForm />}
      </Fragment>)}
    </div>
  </>;
}

function UtilityTemplate({ doc, page }: { doc: Doc; page: PublicPage }) {
  const [active, setActive] = useState('');
  const ids = useMemo(() => doc.sections.flatMap((s) => (s.heading ? [s.heading.id] : [])), [doc]);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => { const vis = entries.find((e) => e.isIntersecting); if (vis) setActive(vis.target.id); }, { rootMargin: '-15% 0px -65% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return <>
    <Breadcrumbs page={page} />
    <details className="utility-contents-mobile"><summary>Contents</summary><ul>{doc.sections.filter((s) => s.heading).map((s) => <li key={s.heading!.id}><a href={`#${s.heading!.id}`}>{s.heading!.text}</a></li>)}</ul></details>
    <div className="utility-with-contents">
      <nav className="utility-contents-desktop" aria-label="Page contents"><strong>Contents</strong><ul>{doc.sections.filter((s) => s.heading).map((s) => <li key={s.heading!.id}><a href={`#${s.heading!.id}`} className={active === s.heading!.id ? 'is-active' : undefined}>{s.heading!.text}</a></li>)}</ul></nav>
      <article className="utility-shell">
        <header><h1><Rich tokens={doc.h1.tokens} /></h1><Blocks blocks={doc.hero} /></header>
        <Sections sections={doc.sections} className="utility-section" subLayout="plain" keyed />
      </article>
    </div>
  </>;
}

export default function WebsitePage() {
  const { pathname } = useLocation();
  const key = pathname === '/' ? '/' : pathname.endsWith('/') ? pathname : `${pathname}/`;
  const page = pageByRoute[key];
  const doc = useMemo(() => structure(parsePage(pages[key], page.file, fileRoutes, titleRoutes, key), { closingCta: page.type === 'insights-hub' }), [key, page.file, page.type]);
  const level = useMemo(() => (n: number) => Math.min(6, doc.levels.indexOf(n) + 1 || n), [doc]);
  useEffect(() => {
    document.documentElement.dataset.publicPage = page.type;
    return () => { delete document.documentElement.dataset.publicPage; };
  }, [page.type]);
  return <LevelContext.Provider value={level}>{(() => {
    switch (page.type) {
      case 'home': return <HomeTemplate doc={doc} />;
      case 'hub': return <HubTemplate doc={doc} page={page} />;
      case 'capability': case 'area': case 'public-interest': return <DetailTemplate doc={doc} page={page} />;
      case 'insights-hub': return <InsightsHubTemplate doc={doc} page={page} />;
      case 'article': return <ArticleTemplate doc={doc} page={page} />;
      case 'about': return <AboutTemplate doc={doc} page={page} />;
      case 'consulting': return <ProseTemplate doc={doc} page={page} />;
      case 'contact': return <ContactTemplate doc={doc} page={page} />;
      default: return <UtilityTemplate doc={doc} page={page} />;
    }
  })()}</LevelContext.Provider>;
}
