import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, X, ChevronDown, ArrowRight } from 'lucide-react';
import { pageManifest } from '@/content/siteContent';

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
const searchItems = pageManifest;

export default function Layout(){
 const [menu,setMenu]=useState(false), [mega,setMega]=useState<string|null>(null), [search,setSearch]=useState(false), [query,setQuery]=useState('');
 const loc=useLocation(), nav=useNavigate(), menuButton=useRef<HTMLButtonElement>(null), searchButton=useRef<HTMLButtonElement>(null), mobilePanel=useRef<HTMLDivElement>(null), searchPanel=useRef<HTMLDivElement>(null), searchInput=useRef<HTMLInputElement>(null), hoverTimer=useRef<number|null>(null);
 const openWithIntent=(name:string)=>{if(hoverTimer.current)window.clearTimeout(hoverTimer.current);hoverTimer.current=window.setTimeout(()=>setMega(name),180)};
 useFocusTrap(menu,mobilePanel);useFocusTrap(search,searchPanel);
 useEffect(()=>{window.scrollTo(0,0)},[loc.pathname]);
 useEffect(()=>{document.body.style.overflow=(menu||search)?'hidden':'';if(search){const timer=setTimeout(()=>searchInput.current?.focus(),120);return()=>{clearTimeout(timer);document.body.style.overflow=''}}return()=>{document.body.style.overflow=''}},[menu,search]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){setMega(null);if(search){setSearch(false);searchButton.current?.focus()}if(menu){setMenu(false);menuButton.current?.focus()}}};addEventListener('keydown',key);return()=>removeEventListener('keydown',key)},[menu,search]);
 useEffect(()=>{if(!mega)return;const outside=(event:PointerEvent)=>{if(!(event.target as Element).closest('.site-header'))setMega(null)};document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside)},[mega]);
 const normalized=query.trim().toLowerCase();
 const results=searchItems.filter(item=>!normalized||[item.title,item.description,...item.topics].join(' ').toLowerCase().includes(normalized));
 const current=(path:string)=>loc.pathname===path||path!=='/'&&loc.pathname.startsWith(path);
 return <div className="site-shell" onClick={event=>{if((event.target as Element).closest('a[href]')){setMenu(false);setMega(null);setSearch(false)}}}><a className="skip-link" href="#main">Skip to main content</a>
  <header className="site-header"><div className="nav-wrap"><Link className="brand" to="/" aria-label="DDA home"><span>DDA</span><i/></Link>
   <nav className="desktop-nav" aria-label="Primary navigation">
    <button className={current('/what-we-do/')?'is-current':undefined} onMouseEnter={()=>openWithIntent('work')} onFocus={()=>setMega('work')} onClick={()=>setMega(mega==='work'?null:'work')} aria-expanded={mega==='work'} aria-controls="what-we-do-menu">What we do <ChevronDown/></button>
    <Link aria-current={current('/selected-work/')?'page':undefined} to="/selected-work/">Selected work</Link><Link aria-current={current('/insights/')?'page':undefined} to="/insights/">Insights</Link><Link aria-current={current('/who-we-are/')?'page':undefined} to="/who-we-are/">Who we are</Link><button ref={searchButton} className="icon-button" onClick={()=>setSearch(true)} aria-label="Search"><Search/></button><Link aria-current={current('/contact/')?'page':undefined} className="nav-contact" to="/contact/">Discuss a decision <ArrowRight/></Link>
   </nav>
   <div className="mobile-actions"><button onClick={()=>setSearch(true)} aria-label="Search"><Search/></button><button ref={menuButton} onClick={()=>setMenu(true)} aria-label="Menu"><Menu/></button></div>
  </div>
  {mega&&<div className="mega" id="what-we-do-menu" onMouseLeave={()=>setMega(null)} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setMega(null)}}><div className="mega-inner">
   {mega==='who'&&<><div><p className="eyebrow">About DDA</p><h2>Analysis built around the decision.</h2></div><div className="mega-links"><Link to="/who-we-are/">Who we are <ArrowRight/></Link><p>A principal-led practice for complex public and regulated systems.</p></div></>}
   {mega==='work'&&<><div><p className="eyebrow">Capabilities</p>{['Diagnose','Model','Design','Equip'].map(x=><span className="cap" key={x}>{x}</span>)}</div><div className="mega-service">{services.map(([t,u])=><Link to={u} key={u}>{t}</Link>)}</div><Link className="mega-all" to="/what-we-do/">Explore what we do <ArrowRight/></Link></>}
   {mega==='think'&&<><div><p className="eyebrow">Our thinking</p><h2>Ideas for consequential decisions.</h2></div><div className="mega-service">{insights.map(([t,u])=><Link to={u} key={u}>{t}</Link>)}</div><Link className="mega-all" to="/insights/">View all insights <ArrowRight/></Link></>}
  </div></div>}
  </header>
  {menu&&<div ref={mobilePanel} className="mobile-panel" role="dialog" aria-modal="true" aria-label="Navigation"><div className="mobile-top"><span className="brand">DDA</span><button onClick={()=>{setMenu(false);menuButton.current?.focus()}} aria-label="Close menu"><X/></button></div><nav><details><summary>What we do <ChevronDown/></summary><div className="mobile-sub"><Link to="/what-we-do/"><b>Explore what we do</b></Link><b>How DDA works: Diagnose · Model · Design · Equip</b>{services.map(([t,u])=><Link to={u} key={u}>{t}</Link>)}</div></details><Link to="/selected-work/">Selected work</Link><details><summary>Insights <ChevronDown/></summary><div className="mobile-sub"><Link to="/insights/"><b>View all insights</b></Link>{insights.map(([t,u])=><Link to={u} key={u}>{t}</Link>)}</div></details><Link to="/who-we-are/">Who we are</Link><Link to="/contact/">Discuss a decision</Link></nav></div>}
  {search&&<div ref={searchPanel} className="search-overlay" role="dialog" aria-modal="true" aria-label="Search DDA"><div className="search-box"><div className="search-head"><h2>Search DDA</h2><button onClick={()=>{setSearch(false);searchButton.current?.focus()}} aria-label="Close search"><X/></button></div><label htmlFor="site-search">What are you looking for?</label><div className="search-field"><Search/><input ref={searchInput} id="site-search" value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&results[0])nav(results[0].route)}} placeholder="Search pages and insights"/></div><p aria-live="polite">{query ? `${results.length} result${results.length===1?'':'s'}` : 'Search all 20 DDA pages'}</p>{query&&<ul>{results.map(item=><li key={item.route}><Link to={item.route}><span><b>{item.title}</b><small>{item.type.replace('-', ' ')} · {item.description}</small></span><ArrowRight/></Link></li>)}</ul>}{query&&results.length===0&&<p className="empty">No pages match that search. Try a service, topic, or decision.</p>}</div></div>}
  <main id="main"><Outlet/></main>
  <footer className="site-footer"><div className="footer-lead"><p>Bring the decision.</p><Link to="/contact/">Discuss a decision <ArrowRight/></Link><Link to="/what-we-do/">Explore what we do <ArrowRight/></Link><Link to="/selected-work/">See selected work <ArrowRight/></Link></div><div className="footer-grid"><div><div className="brand">DDA</div><p>Strategic analysis and decision design for complex public and regulated systems.</p><p>Metro Vancouver, British Columbia</p></div><div><h2>Navigate</h2><Link to="/what-we-do/">What we do</Link><Link to="/selected-work/">Selected work</Link><Link to="/insights/">Insights</Link><Link to="/who-we-are/">Who we are</Link><Link to="/contact/">Contact</Link></div><div><h2>Information</h2><Link to="/privacy/">Privacy</Link><Link to="/legal/">Legal</Link><Link to="/terms/">Terms</Link><Link to="/accessibility/">Accessibility</Link></div></div><div className="copyright">© {new Date().getFullYear()} DDA. All rights reserved.</div></footer>
 </div>
}
