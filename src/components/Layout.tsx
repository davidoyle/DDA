import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, X, ChevronDown, ArrowRight } from 'lucide-react';

function useFocusTrap(active:boolean, container:RefObject<HTMLElement|null>){
 useEffect(()=>{if(!active||!container.current)return;const node=container.current;const focusable=()=>[...node.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,summary,[tabindex]:not([tabindex="-1"])')];const onKey=(event:KeyboardEvent)=>{if(event.key!=='Tab')return;const items=focusable();if(!items.length)return;const first=items[0],last=items[items.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}};node.addEventListener('keydown',onKey);focusable()[0]?.focus();return()=>node.removeEventListener('keydown',onKey)},[active,container]);
}

const services = [
  ['Fiscal impact and growth modelling','/what-we-do/fiscal-impact-growth-modelling/'],
  ['Official Community Plan review and policy analysis','/what-we-do/official-community-plan-policy-analysis/'],
  ['Economic development strategy','/what-we-do/economic-development-strategy/'],
  ['Labour market analysis','/what-we-do/labour-market-analysis/'],
  ['Resource-sector and complex planning analysis','/what-we-do/resource-sector-complex-planning-analysis/'],
  ['Long-range financial and scenario planning','/what-we-do/long-range-financial-scenario-planning/'],
  ['Institutional and policy analysis','/what-we-do/public-interest-research-evidence-packages/'],
];
const insights = [
  ['When a housing target outruns delivery','/insights/when-a-housing-target-outruns-delivery/'],
  ['The trade gap hidden inside a workforce number','/insights/the-trade-gap-hidden-inside-a-workforce-number/'],
  ['What a FLAG tells you','/insights/what-a-flag-tells-you/'],
];
const searchItems = [
  ['Home','/'],['Who we are','/who-we-are/'],['What we do','/what-we-do/'],...services,
  ['Our thinking','/insights/'],...insights,['Selected work','/selected-work/'],['Contact','/contact/'],
  ['Privacy','/privacy/'],['Legal','/legal/'],['Terms of use','/terms/'],['Accessibility','/accessibility/']
];

export default function Layout(){
 const [menu,setMenu]=useState(false), [mega,setMega]=useState<string|null>(null), [search,setSearch]=useState(false), [query,setQuery]=useState(''), [searchReady,setSearchReady]=useState(false);
 const loc=useLocation(), nav=useNavigate(), menuButton=useRef<HTMLButtonElement>(null), searchButton=useRef<HTMLButtonElement>(null), mobilePanel=useRef<HTMLDivElement>(null), searchPanel=useRef<HTMLDivElement>(null), searchInput=useRef<HTMLInputElement>(null);
 useFocusTrap(menu,mobilePanel);useFocusTrap(search,searchPanel);
 useEffect(()=>{setMenu(false);setMega(null);setSearch(false);window.scrollTo(0,0)},[loc.pathname]);
 useEffect(()=>{document.body.style.overflow=(menu||search)?'hidden':'';if(search){setSearchReady(false);const timer=setTimeout(()=>{setSearchReady(true);searchInput.current?.focus()},120);return()=>{clearTimeout(timer);document.body.style.overflow=''}}return()=>{document.body.style.overflow=''}},[menu,search]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){setMega(null);if(search){setSearch(false);searchButton.current?.focus()}if(menu){setMenu(false);menuButton.current?.focus()}}};addEventListener('keydown',key);return()=>removeEventListener('keydown',key)},[menu,search]);
 const results=searchItems.filter(([t])=>t.toLowerCase().includes(query.toLowerCase()));
 return <div className="site-shell"><a className="skip-link" href="#main">Skip to main content</a>
  <header className="site-header"><div className="nav-wrap"><Link className="brand" to="/" aria-label="DDA home"><span>DDA</span><i/></Link>
   <nav className="desktop-nav" aria-label="Primary navigation">
    <button onMouseEnter={()=>setMega('who')} onFocus={()=>setMega('who')} onClick={()=>setMega(mega==='who'?null:'who')} aria-expanded={mega==='who'}>Who we are <ChevronDown/></button>
    <button onMouseEnter={()=>setMega('work')} onFocus={()=>setMega('work')} onClick={()=>setMega(mega==='work'?null:'work')} aria-expanded={mega==='work'}>What we do <ChevronDown/></button>
    <button onMouseEnter={()=>setMega('think')} onFocus={()=>setMega('think')} onClick={()=>setMega(mega==='think'?null:'think')} aria-expanded={mega==='think'}>Our Thinking <ChevronDown/></button>
    <Link to="/selected-work/">Selected work</Link><button ref={searchButton} className="icon-button" onClick={()=>setSearch(true)} aria-label="Search"><Search/></button><Link className="nav-contact" to="/contact/">Contact <ArrowRight/></Link>
   </nav>
   <div className="mobile-actions"><button onClick={()=>setSearch(true)} aria-label="Search"><Search/></button><button ref={menuButton} onClick={()=>setMenu(true)} aria-label="Menu"><Menu/></button></div>
  </div>
  {mega&&<div className="mega" onMouseLeave={()=>setMega(null)} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setMega(null)}}><div className="mega-inner">
   {mega==='who'&&<><div><p className="eyebrow">About DDA</p><h2>Analysis built around the decision.</h2></div><div className="mega-links"><Link to="/who-we-are/">Who we are <ArrowRight/></Link><p>A principal-led practice for complex public and regulated systems.</p></div></>}
   {mega==='work'&&<><div><p className="eyebrow">Capabilities</p>{['Diagnose','Model','Design','Equip'].map(x=><span className="cap" key={x}>{x}</span>)}</div><div className="mega-service">{services.map(([t,u])=><Link to={u} key={u}>{t}</Link>)}</div><Link className="mega-all" to="/what-we-do/">Explore what we do <ArrowRight/></Link></>}
   {mega==='think'&&<><div><p className="eyebrow">Our thinking</p><h2>Ideas for consequential decisions.</h2></div><div className="mega-service">{insights.map(([t,u])=><Link to={u} key={u}>{t}</Link>)}</div><Link className="mega-all" to="/insights/">View all insights <ArrowRight/></Link></>}
  </div></div>}
  </header>
  {menu&&<div ref={mobilePanel} className="mobile-panel" role="dialog" aria-modal="true" aria-label="Navigation"><div className="mobile-top"><span className="brand">DDA</span><button onClick={()=>{setMenu(false);menuButton.current?.focus()}} aria-label="Close menu"><X/></button></div><nav><Link to="/who-we-are/">Who we are</Link><details><summary>What we do <ChevronDown/></summary><div className="mobile-sub"><b>Diagnose · Model · Design · Equip</b>{services.map(([t,u])=><Link to={u} key={u}>{t}</Link>)}</div></details><details><summary>Our Thinking <ChevronDown/></summary><div className="mobile-sub">{insights.map(([t,u])=><Link to={u} key={u}>{t}</Link>)}</div></details><Link to="/selected-work/">Selected work</Link><Link to="/contact/">Contact</Link></nav></div>}
  {search&&<div ref={searchPanel} className="search-overlay" role="dialog" aria-modal="true" aria-label="Search DDA"><div className="search-box"><div className="search-head"><h2>Search DDA</h2><button onClick={()=>{setSearch(false);searchButton.current?.focus()}} aria-label="Close search"><X/></button></div>{!searchReady?<p role="status" className="search-loading">Loading search…</p>:<><label htmlFor="site-search">What are you looking for?</label><div className="search-field"><Search/><input ref={searchInput} id="site-search" value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&results[0])nav(results[0][1])}} placeholder="Search pages and insights"/></div><p aria-live="polite">{query ? `${results.length} result${results.length===1?'':'s'}` : 'Search all 20 DDA pages'}</p>{query&&<ul>{results.map(([t,u])=><li key={u}><Link to={u}>{t}<ArrowRight/></Link></li>)}</ul>}{query&&results.length===0&&<p className="empty">No pages match that search. Try a service, topic, or decision.</p>}</>}</div></div>}
  <main id="main"><Outlet/></main>
  <footer className="site-footer"><div className="footer-lead"><p>Let&apos;s connect.</p><Link to="/contact/">Get in touch <ArrowRight/></Link><Link to="/what-we-do/">Explore what we do <ArrowRight/></Link><Link to="/who-we-are/">Learn about DDA <ArrowRight/></Link></div><div className="footer-grid"><div><div className="brand">DDA</div><p>A strategic analysis and decision-design practice for complex public and regulated systems.</p><p>Metro Vancouver, British Columbia</p></div><div><h2>Navigate</h2><Link to="/who-we-are/">Who we are</Link><Link to="/what-we-do/">What we do</Link><Link to="/insights/">Our Thinking</Link><Link to="/selected-work/">Selected work</Link><Link to="/contact/">Contact</Link></div><div><h2>Information</h2><Link to="/privacy/">Privacy</Link><Link to="/legal/">Legal</Link><Link to="/terms/">Terms</Link><Link to="/accessibility/">Accessibility</Link></div></div><div className="copyright">© {new Date().getFullYear()} DDA. All rights reserved.</div></footer>
 </div>
}
