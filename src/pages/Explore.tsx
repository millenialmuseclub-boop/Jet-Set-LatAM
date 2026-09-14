import { Photo } from '@/components/Photo';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { guides, destinations } from '@/data';
import { rioCity2025 } from '@/data/rio-city-2025';
import { sambadrome2025 } from '@/data/sambadrome-2025';
import { TrailLinks } from '@/components/TrailLinks';
import { OutdoorJourneys } from '@/components/OutdoorJourneys';
import { StyleBridge } from '@/components/StyleBridge';
import { destinationStyle } from '@/data/style';
const categories=['All','Food','Art + Design','Beaches','Nightlife','Shopping','Style','Trails','Outdoors + Journeys','City Guides','Field Notes','Postcards','Weekend Somewhere','Carnival'];
const sections:Record<string,string[]>={Food:['eat','drink'],'Art + Design':['see'],Beaches:['beaches'],Nightlife:['nightlife'],Shopping:['shop'],'City Guides':['stay','experiences']};
const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function Explore(){
 const [params,setParams]=useSearchParams();
 const category=categories.includes(params.get('category')||'')?params.get('category')!:'All';
 const destination=params.get('destination')||'',query=params.get('q')||'';
 const requestedPage=Number(params.get('page')||1);
 function update(key:string,value:string){const next=new URLSearchParams(params);if(value)next.set(key,value);else next.delete(key);next.delete('page');setParams(next,{replace:true,preventScrollReset:true});}
 const editIds=['rio-table-2025','wp-10225','gd-rio-santa-teresa','wp-8659','rio-centro-2025','wp-10093'];
 const stories=[...guides].sort((a,b)=>{const ai=editIds.indexOf(a.id),bi=editIds.indexOf(b.id);return (ai<0?99:ai)-(bi<0?99:bi)||(b.publishedAt||'').localeCompare(a.publishedAt||'');}).filter(g=>{
  const tags=(g.categories||[]).map(normalize),title=normalize(g.title);
  const matchesCategory=category==='All'||(sections[category]?.includes(g.section))||tags.includes(normalize(category))||(category==='Beaches'&&tags.includes('beach'))||(category==='Field Notes'&&/day \d|adventure|pictures|stroll/.test(title))||(category==='Postcards'&&/postcard|photo|pictures/.test(title))||(category==='Weekend Somewhere'&&/weekend|day|itinerary|escape/.test(title));
  return matchesCategory&&(!destination||g.destinationId===destination||g.relatedDestinationIds?.includes(destination))&&(!query||normalize([g.title,g.dek,...(g.categories||[]),destinations.find(d=>d.id===g.destinationId)?.city].join(' ')).includes(normalize(query)));
 });
 const styleDestinations=destinations.filter(d=>destinationStyle[d.id]&&(!destination||destination===d.id)&&(!query||normalize(d.city+' '+destinationStyle[d.id].headline).includes(normalize(query))));
 const total=category==='Style'?styleDestinations.length:stories.length,perPage=category==='Style'?2:6;
 const pages=Math.max(1,Math.ceil(total/perPage)),page=Math.min(pages,Math.max(1,Number.isInteger(requestedPage)?requestedPage:1));
 const isSpecial=['Trails','Outdoors + Journeys','Carnival'].includes(category);
 function turnPage(nextPage:number){const next=new URLSearchParams(params);next.set('page',String(nextPage));setParams(next,{preventScrollReset:true});requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById('journal-edit')?.scrollIntoView({behavior:'instant',block:'start'}))); }
 const pristine=category==='All'&&!query&&!destination&&page===1;
 return <div className="journal-page mx-auto max-w-5xl px-5 pb-8 pt-5 md:px-8">
  <header className="journal-masthead"><p className="eyebrow text-terracotta">Jet Set LatAm / The travel journal</p><h1 className="font-display">The art of <em>going.</em></h1><span>Places. People. A different point of view.</span></header>
  {pristine&&<Link to="/guides/rio-quiet-2025" className="journal-cover"><img src={rioCity2025[3].src} alt={rioCity2025[3].caption} fetchPriority="high"/><div className="journal-cover-shade"/><div className="journal-cover-copy"><p className="eyebrow">The Rio diaries · 2025</p><h2>When the city<br/><em>exhales.</em></h2><span>Beach days &amp; the hours between <ArrowRight size={16}/></span></div></Link>}
  <nav aria-label="Explore features" className="journal-index">{[['Ask Jet Set','/ask'],['Trails','/explore?category=Trails'],['Carnival','/carnival'],['City guides','/explore?category=City+Guides']].map(([label,to])=><Link key={label} to={to}>{label} <span aria-hidden="true">↗</span></Link>)}</nav>
  <section id="journal-edit" className="journal-library" aria-label="Browse the journal">
   <div className="journal-section-title"><h2 className="font-display">{pristine?'A few good reads.':category==='All'?'From the archive.':category+'.'}</h2><span>{isSpecial?'The collection':`${total} ${category==='Style'?'destinations':'stories'}`}</span></div>
   <div className="journal-search"><Search size={16} aria-hidden="true"/><input type="search" aria-label="Search stories" value={query} onChange={e=>update('q',e.target.value)} placeholder="Find your next good read…"/></div>
   <div className="journal-filters"><label><span className="sr-only">Story category</span><select aria-label="Story category" value={category} onChange={e=>update('category',e.target.value==='All'?'':e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></label><label><span className="sr-only">Destination</span><select aria-label="Destination" value={destination} onChange={e=>update('destination',e.target.value)}><option value="">Every destination</option>{destinations.filter(d=>d.status!=='coming-soon').map(d=><option key={d.id} value={d.id}>{d.city}</option>)}</select></label></div>
   {category==='Carnival'?<Link to="/carnival" className="journal-carnival"><img src={sambadrome2025[6].src} alt={sambadrome2025[6].caption} loading="lazy"/><div><p className="eyebrow text-terracotta">The firsthand archive</p><h2 className="font-display text-4xl italic">Carnival in Rio</h2><p className="mt-3 text-sm">Street celebrations. Sambadrome nights. Enter the full photo essay ↗</p></div></Link>:category==='Trails'?<TrailLinks query={query} destinationId={destination||undefined}/>:category==='Outdoors + Journeys'?<OutdoorJourneys destination={destination} query={query}/>:category==='Style'?<div className="mt-6 grid gap-5 md:grid-cols-2">{styleDestinations.slice((page-1)*perPage,page*perPage).map(d=><StyleBridge key={d.id} destination={d}/>)}</div>:<div className="journal-story-grid">{stories.slice((page-1)*perPage,page*perPage).map((g,i)=><Link key={g.id} to={'/guides/'+g.id} className="journal-story"><div className="journal-story-photo"><Photo src={g.heroPhoto} alt={g.photoCaption||g.title} seed={g.id} className="h-full w-full" rounded="rounded-none"/><span>{String((page-1)*perPage+i+1).padStart(2,'0')}</span></div><p className="journal-story-kicker">{destinations.find(d=>d.id===g.destinationId)?.city||'Latin America'}</p><h3>{g.title}</h3></Link>)}</div>}
   {!isSpecial&&total===0&&<div className="py-10 text-center"><h3 className="font-display text-3xl">A different detour?</h3><p className="my-3 text-sm">No stories match these filters.</p><button className="min-h-11 text-sm underline" onClick={()=>setParams({})}>Clear all filters</button></div>}
   {!isSpecial&&total>0&&<nav aria-label="Journal pages" className="journal-pagination"><button disabled={page===1} onClick={()=>turnPage(page-1)}>← Previous</button><span aria-live="polite">{page} / {pages}</span><button disabled={page===pages} onClick={()=>turnPage(page+1)}>Next →</button></nav>}
  </section>
  <p className="journal-end">A little inspiration. Then, go live it.</p>
 </div>;
}
