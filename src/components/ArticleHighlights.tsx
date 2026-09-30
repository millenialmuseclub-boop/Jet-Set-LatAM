import { Link } from 'react-router-dom'
import type { Guide, Destination, Place } from '@/types'
import { storyHighlights, neighborhoodReads } from '@/lib/editorialExperience'
export function ArticleHighlights({guide,destination,places}:{guide:Guide;destination?:Destination;places:Place[]}){
 const highlights=storyHighlights(guide)
 const areas=destination?.neighborhoods.filter(n=>neighborhoodReads(destination,n.name,[guide]).length).slice(0,3)||[]
 if(!highlights.length&&!areas.length&&!places.length)return null
 return <section className="article-highlights" data-section={guide.section} aria-label="Quick highlights"><p className="eyebrow">Quick highlights</p>{highlights.length>0&&<ul>{highlights.map(h=><li key={h.id}><button onClick={()=>{const target=document.getElementById(h.id);target?.scrollIntoView({block:'start'});target?.focus({preventScroll:true})}}>{h.text} <span aria-hidden="true">↓</span></button></li>)}</ul>}{areas.length>0&&<p className="text-xs mt-3">Neighborhoods in the story: {areas.map((n,i)=><span key={n.id}>{i>0?' · ':''}<Link className="underline" to={`/destinations/${destination!.slug}?tab=neighborhoods`}>{n.name}</Link></span>)}</p>}{places.length>0&&<a className="inline-flex min-h-11 items-center text-xs underline" href="#story-places" onClick={e=>{e.preventDefault();document.getElementById('story-places')?.scrollIntoView({block:'start'})}}>{places.length} places to explore or add to your trip ↓</a>}</section>
}
