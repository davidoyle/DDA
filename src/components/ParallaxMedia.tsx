import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

/** Restrained background-only parallax; content, controls, tables, and cards never move. */
export default function ParallaxMedia({children,className=''}:{children?:ReactNode;className?:string}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{const node=ref.current;if(!node||matchMedia('(prefers-reduced-motion: reduce)').matches)return;let frame=0;const update=()=>{frame=0;const rect=node.getBoundingClientRect();const progress=(innerHeight/2-(rect.top+rect.height/2))/innerHeight;node.style.setProperty('--parallax-y',`${Math.max(-1,Math.min(1,progress))*3}vh`)};const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)};update();addEventListener('scroll',scroll,{passive:true});return()=>{removeEventListener('scroll',scroll);if(frame)cancelAnimationFrame(frame)}},[]);
 return <div ref={ref} className={`parallax-media ${className}`} aria-hidden="true">{children}</div>
}
