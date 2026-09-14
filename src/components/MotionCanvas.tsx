import { useEffect,useRef } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { motionTiming } from '@/lib/motion'

/** Visible-first progressive enhancement. No observer or animation controls content visibility. */
export function MotionCanvas({children}:{children:ReactNode}) {
 const ref=useRef<HTMLElement>(null);const {pathname,search}=useLocation()
 useEffect(()=>{
  const root=ref.current;if(!root)return
  const preference=matchMedia('(prefers-reduced-motion: reduce)');let dispose=()=>{}
  function start(){
   dispose();if(preference.matches||!root)return
   const seen=new WeakSet<Element>(),animations=new Set<Animation>();let frame=0,stagger=0
   function animate(el:Element,frames:Keyframe[],duration=motionTiming.reveal,delay=0){
    if(typeof el.animate!=='function')return
    const a=el.animate(frames,{duration,delay,easing:motionTiming.easing,fill:'none'});animations.add(a);a.onfinish=()=>animations.delete(a)
   }
   animate(root,[{opacity:.82,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],240)
   const reveal=(el:Element)=>{el.classList.add('motion-arrived');animate(el,[{transform:'translateY(10px)',opacity:.78},{transform:'translateY(0)',opacity:1}],motionTiming.reveal,(stagger++%3)*motionTiming.stagger)}
   const observer=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{stagger=0;entries.forEach(e=>{if(e.isIntersecting){reveal(e.target);observer?.unobserve(e.target)}})},{threshold:.06}):undefined
   const heading=root.querySelector('h1,h2');if(heading&&!root.querySelector('[aria-label="Featured destination"]'))animate(heading,[{opacity:.86,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],280)
   const hero=root.querySelector('[aria-label="Featured destination"]');if(hero){const img=hero.querySelector('img');if(img)animate(img,[{transform:'scale(1.03)'},{transform:'scale(1)'}],motionTiming.hero);hero.querySelectorAll('.eyebrow,h1,a').forEach((el,i)=>animate(el,[{opacity:.65,transform:'translateY(9px)'},{opacity:1,transform:'translateY(0)'}],520,i*90))}
   function scan(){frame=0;if(!root)return;root.querySelectorAll('.motion-reveal,.section-heading,.story-card,.jet-set-pick,.itinerary-day,.trail-path > li,.photo-gallery figure,[aria-label="Story photographs"] figure,.carnival-page figure,[aria-label="Trip constellation"] > div,.style-bridge,.rallii-motion,.trip-hero,[aria-label="Jet Set answer"] article').forEach(el=>{if(!seen.has(el)){seen.add(el);observer?.observe(el)}})}
   scan();const mutations=new MutationObserver(()=>{if(!frame)frame=requestAnimationFrame(scan)});mutations.observe(root,{childList:true,subtree:true})
   function celebrate(e:MouseEvent){const target=(e.target as Element).closest('button');if(!target)return;const label=target.getAttribute('aria-label')||target.textContent||'';if(/^save|^add|create recap/i.test(label.trim())&&!/remove|unsave/i.test(label)){target.classList.remove('save-glint');requestAnimationFrame(()=>target.classList.add('save-glint'))}}
   root.addEventListener('click',celebrate)
   dispose=()=>{observer?.disconnect();mutations.disconnect();cancelAnimationFrame(frame);animations.forEach(a=>a.cancel());root.removeEventListener('click',celebrate)}
  }
  start();preference.addEventListener('change',start);return()=>{dispose();preference.removeEventListener('change',start)}
 },[pathname,search])
 return <main ref={ref} data-route={pathname} className="mx-auto min-h-screen bg-parchment pb-24">{children}</main>
}
