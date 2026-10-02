import { Carousel } from '@/components/Carousel';
import { WebsiteReading } from '@/components/WebsiteReading';
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
import { distinctStories } from '@/lib/destinationReading';
const categories=['All','Food','Art + Design','Beaches','Nightlife','Shopping',...(guides.some(g=>g.shoppingNotes)?['Shopping Notes']:[]),'Style','Trails','Outdoors + Journeys','City Guides','Field Notes','Postcards','Weekend Somewhere','Carnival'];
const sections:Record<string,string[]>={Food:['eat','drink'],'Art + Design':['see'],Beaches:['beaches'],Nightlife:['nightlife'],Shopping:['shop'],'City Guides':['stay','experiences']};
const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const journalCountries=[...new Set(guides.flatMap(g=>g.countries||[]))].sort();
const readingDestinations=[...new Set(guides.flatMap(g=>g.storyLocations||[]))].filter(location=>location!=='Latin America'&&!journalCountries.includes(location)&&!destinations.some(d=>d.city===location)).sort();
export function Explore(){
 const [params,setParams]=useSearchParams();
 const category=categories.includes(params.get('category')||'')?params.get('category')!:'All';
 const destination=params.get('destination')||'',country=params.get('country')||'',query=params.get('q')||'';
 const requestedPage=Number(params.get('page')||1);
 function update(key:string,value:string){const next=new URLSearchParams(params);if(value)next.set(key,value);else next.delete(key);if(key==='country')next.delete('destination');next.delete('page');setParams(next,{replace:true,preventScrollReset:true});}
 const editIds=['rio-table-2025','wp-10225','gd-rio-santa-teresa','wp-8659','rio-centro-2025','wp-10093'];
 const stories=distinctStories(guides).sort((a,b)=>{const ai=editIds.indexOf(a.id),bi=editIds.indexOf(b.id);return (ai<0?99:ai)-(bi<0?99:bi)||(b.publishedAt||'').localeCompare(a.publishedAt||'');}).filter(g=>{
  const tags=(g.categories||[]).map(normalize),title=normalize(g.title);
  const matchesCategory=category==='All'||(sections[category]?.includes(g.section))||tags.includes(normalize(category))||(category==='Beaches'&&tags.includes('beach'))||(category==='Field Notes'&&/day \d|adventure|pictures|stroll/.test(title))||(category==='Postcards'&&/postcard|photo|pictures/.test(title))||(category==='Weekend Somewhere'&&/weekend|day|itinerary|escape/.test(title));
  return matchesCategory&&(!country||g.countries?.includes(country))&&(!destination||(destination.startsWith('reading:')?g.storyLocations?.includes(destination.slice(8)):g.destinationId===destination||g.relatedDestinationIds?.includes(destination)))&&(!query||normalize([g.title,g.dek,...(g.categories||[]),...(g.storyLocations||[]),...(g.countries||[])].join(' ')).includes(normalize(query)));
 });
 const styleDestinations=destinations.filter(d=>destinationStyle[d.id]&&(!country||d.country===country)&&(!destination||destination===d.id)&&(!query||normalize(d.city+' '+destinationStyle[d.id].headline).includes(normalize(query))));
 const total=category==='Style'?styleDestinations.length:stories.length,perPage=category==='Style'?2:12;
 const pages=Math.max(1,Math.ceil(total/perPage)),page=Math.min(pages,Math.max(1,Number.isInteger(requestedPage)?requestedPage:1));
 const isSpecial=['Trails','Outdoors + Journeys','Carnival'].includes(category);
 function turnPage(nextPage:number){const next=new URLSearchParams(params);next.set('page',String(nextPage));setParams(next,{preventScrollReset:true});requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById('journal-edit')?.scrollIntoView({behavior:'instant',block:'start'}))); }
 const pristine=category==='All'&&!query&&!destination&&!country&&page===1;
 return <div data-journal-category={category} className="journal-page mx-auto max-w-5xl px-5 pb-8 pt-5 md:px-8">
  <header className="journal-masthead"><p className="eyebrow text-terracotta">Jet Set LatAm / The travel journal</p><h1 className="font-display">The art of <em>going.</em></h1><span>Places. People. A different point of view.</span></header>
  {pristine&&<Link to="/guides/rio-quiet-2025" className="journal-cover"><img src={rioCity2025[3].src} alt={rioCity2025[3].caption} fetchPriority="high"/><div className="journal-cover-shade"/><div className="journal-cover-copy"><p className="eyebrow">The Rio diaries · 2025</p><h2>When the city<br/><em>exhales.</em></h2><span>Beach days &amp; the hours between <ArrowRight size={16}/></span></div></Link>}
  <nav aria-label="Explore features" className="journal-index">{[['Ask Jet Set','/ask'],['Trails','/explore?category=Trails'],['Carnival','/carnival'],['City guides','/explore?category=City+Guides']].map(([label,to])=><Link key={label} to={to}>{label} <span aria-hidden="true">↗</span></Link>)}</nav>
  <section id="journal-edit" className="journal-library" aria-label="Browse the journal">
   <div className="journal-section-title"><h2 className="font-display">{pristine?'A few good reads.':category==='All'?'From the archive.':category+'.'}</h2><span>{isSpecial?'The collection':`${total} ${category==='Style'?'destinations':total===1?'story':'stories'}`}</span></div>
   <div className="journal-search"><Search size={16} aria-hidden="true"/><input type="search" aria-label="Search stories" value={query} onChange={e=>update('q',e.target.value)} placeholder="Find your next good read…"/></div>
   <div className="journal-filters journal-geography-filters">
    <label><span>Country</span><select aria-label="Country" value={country} onChange={e=>update('country',e.target.value)}><option value="">All countries</option>{journalCountries.map(c=><option key={c}>{c}</option>)}</select></label>
    <label><span>Destination</span><select aria-label="Destination" value={destination} onChange={e=>update('destination',e.target.value)}><option value="">Every destination</option><optgroup label="City guides">{destinations.filter(d=>d.status!=='coming-soon'&&(!country||d.country===country)).map(d=><option key={d.id} value={d.id}>{d.city}</option>)}</optgroup><optgroup label="More places to read about">{readingDestinations.filter(location=>guides.some(g=>g.storyLocations?.includes(location)&&(!country||g.countries?.includes(country)))).map(location=><option key={location} value={`reading:${location}`}>{location}</option>)}</optgroup></select></label>
    <label><span>Topic</span><select aria-label="Story category" value={category} onChange={e=>update('category',e.target.value==='All'?'':e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
   </div>
   {category==='Carnival'?<Link to="/carnival" className="journal-carnival"><img src={sambadrome2025[6].src} alt={sambadrome2025[6].caption} loading="lazy"/><div><p className="eyebrow text-terracotta">The firsthand archive</p><h2 className="font-display text-4xl italic">Carnival in Rio</h2><p className="mt-3 text-sm">Street celebrations. Sambadrome nights. Enter the full photo essay ↗</p></div></Link>:category==='Trails'?<TrailLinks query={query} destinationId={destination||undefined}/>:category==='Outdoors + Journeys'?<OutdoorJourneys destination={destination} query={query}/>:category==='Style'?<Carousel label="Destination style" className="mt-6">{styleDestinations.slice((page-1)*perPage,page*perPage).map(d=><StyleBridge key={d.id} destination={d}/>)}</Carousel>:<div className="journal-results" role="region" aria-label="Journal stories">{stories.slice((page-1)*perPage,page*perPage).map(g=><Link key={g.id} to={'/guides/'+g.id} className={`journal-story journal-result${g.heroPhoto?'':' journal-result-text'}`}>{g.heroPhoto&&<Photo src={g.heroPhoto} alt={g.photoCaption||g.title} seed={g.id} className="journal-result-photo" rounded="rounded-none"/>}<div><p className="journal-story-kicker">{g.storyLocation||'Latin America'} · {g.section}</p><h3>{g.title}</h3></div></Link>)}</div>}
   {!isSpecial&&total===0&&<div className="py-10 text-center"><h3 className="font-display text-3xl">A different detour?</h3><p className="my-3 text-sm">No stories match these filters.</p><button className="min-h-11 text-sm underline" onClick={()=>setParams({})}>Clear all filters</button></div>}
   {!isSpecial&&total>0&&<nav aria-label="Journal pages" className="journal-pagination"><button disabled={page===1} onClick={()=>turnPage(page-1)}>← Previous</button><span aria-live="polite">{page} / {pages}</span><button disabled={page===pages} onClick={()=>turnPage(page+1)}>Next →</button></nav>}
  </section>
  {!country&&!destination.startsWith('reading:')&&<WebsiteReading destination={destination} category={category} query={query} excludedPhotos={stories.slice((page-1)*perPage,page*perPage).flatMap(g=>g.heroPhoto?[g.heroPhoto]:[])}/>}
  <p className="journal-end">A little inspiration. Then, go live it.</p>
 </div>;
}
