import { useSearchParams } from 'react-router-dom';
import { getPlacesByDestination } from '@/data';
import { rioCity2025 } from '@/data/rio-city-2025';
import { destinations, getGuidesByDestination } from "@/data";
import { Photo } from "@/components/Photo";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { appFamily, CREATOR_PORTFOLIO_URL } from "@/config/appFamily";
import { openExternal } from "@/lib/links";
import { Link } from "react-router-dom";
import type { Destination } from "@/types";

// Country grouping so the index reads as an atlas rather than a flat grid —
// order reflects how much of the world Jet Set LatAm actually covers today.
const COUNTRY_ORDER = ["Mexico", "Colombia", "Brazil"];

function groupByCountry(dests: Destination[]) {
  const groups = new Map<string, Destination[]>();
  for (const d of dests) {
    const list = groups.get(d.country) ?? [];
    list.push(d);
    groups.set(d.country, list);
  }
  const ordered = [
    ...COUNTRY_ORDER,
    ...[...groups.keys()].filter((c) => !COUNTRY_ORDER.includes(c)),
  ];
  return ordered
    .filter((c) => groups.has(c))
    .map((c) => ({ country: c, cities: groups.get(c)! }));
}

const moods=['Every mood','Adventure','Fashion','Art + culture','Beach days','Food + nights'];
function matchesMood(d:Destination,mood:string){
 const places=getPlacesByDestination(d.id),stories=getGuidesByDestination(d.id);
 if(mood==='Every mood')return true;
 if(mood==='Fashion')return places.some(p=>p.category==='shop')||stories.some(g=>g.section==='shop'||g.categories?.includes('Style'));
 if(mood==='Art + culture')return places.some(p=>['museum','landmark'].includes(p.category))||stories.some(g=>g.section==='see');
 if(mood==='Beach days')return stories.some(g=>g.section==='beaches'||g.categories?.some(c=>/beach/i.test(c)))||places.some(p=>/beach/i.test([p.name,...p.tags].join(' ')));
 if(mood==='Food + nights')return places.some(p=>['restaurant','cafe','bar'].includes(p.category));
 return stories.some(g=>/trail|hiking|outdoor|rail|train|cenote|tequila express|nature/i.test([g.title,...(g.categories||[])].join(' ')))||places.some(p=>/trail|hike|cable car|cenote|nature/i.test([p.name,...p.tags].join(' ')));
}
export function Destinations() {
 const [params,setParams]=useSearchParams();
 const mood=moods.includes(params.get('mood')||'')?params.get('mood')!:'Every mood';
  const groups = groupByCountry(
    destinations.filter((d) => d.status !== "coming-soon" && matchesMood(d,mood)),
  );

  return (
    <div className="destination-mood-page animate-fade-in mx-auto max-w-5xl space-y-10 pt-6 pb-6 md:pt-10">
      <header className="px-5 md:px-8"><div className="destination-atlas-hero relative isolate overflow-hidden rounded-2xl bg-ink text-cream"><img src={rioCity2025[8].src} alt={rioCity2025[8].caption} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"/><div className="relative px-6 pb-7 pt-48 md:pt-64"><p className="eyebrow text-gold-light">The destination collection</p><h1 className="my-3 font-display text-5xl italic leading-none md:text-7xl">Somewhere<br/>wonderful.</h1><p className="max-w-xs text-sm text-cream/90">A growing map of Latin America, one real city at a time.</p><Link to="/destinations/rio-de-janeiro" className="mt-5 inline-flex min-h-11 items-center border-b border-gold-light/60 text-xs">On the cover: Rio de Janeiro ↗</Link></div></div></header>
      <section className="px-5 md:px-8" aria-labelledby="destination-mood-title"><div className="flex items-baseline justify-between gap-4"><h2 id="destination-mood-title" className="font-display text-3xl italic">What moves you?</h2><span className="text-[10px] text-ink-soft" aria-live="polite">{groups.reduce((n,g)=>n+g.cities.length,0)} places to go</span></div><p className="mt-2 mb-4 text-xs text-ink-soft">Follow a feeling. Find your city.</p><div className="mood-buttons">{moods.map(m=><button key={m} aria-pressed={mood===m} onClick={()=>{const next=new URLSearchParams(params);if(m==='Every mood')next.delete('mood');else next.set('mood',m);setParams(next,{replace:true,preventScrollReset:true});}}>{m}</button>)}</div></section>
      <section aria-label="Style and scenic journeys" className="sister-passports mx-5 md:mx-8"><button onClick={()=>openExternal(appFamily['luxe-jetter'].iOSURL)} className="sister-passport sister-fashion"><p className="eyebrow">Luxe Jetter</p><h2>Go beautifully.<br/><em>Dress the trip.</em></h2><span>Your destination wardrobe ↗</span></button><button onClick={()=>openExternal(appFamily.rallii.iOSURL)} className="sister-passport sister-adventure"><p className="eyebrow">Rallii Rail</p><h2>Take the<br/><em>scenic route.</em></h2><span>Explore rail journeys ↗</span></button></section>
      {groups.length===0&&<p className="px-5 py-8 text-sm">No cities in this collection yet. Try another mood.</p>}
      {groups.map(({ country, cities }) => (
        <section key={country} className="space-y-3">
          <div className="px-5 md:px-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">
              {country}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 px-5 md:grid-cols-4 md:gap-5 md:px-8">
            {cities.map((d) => {
              const clickable = d.status !== "coming-soon";
              return (
                <Link
                  key={d.id}
                  to={clickable ? `/destinations/${d.slug}` : "#"}
                  aria-disabled={!clickable}
                  className={!clickable ? "pointer-events-none opacity-50" : ""}
                >
                  {d.heroPhoto ? (
                    <Photo
                      src={d.heroPhoto}
                      seed={d.id}
                      alt={d.city}
                      className="h-36 w-full md:h-52"
                    />
                  ) : (
                    <PhotoPlaceholder
                      seed={d.id}
                      label={d.country}
                      className="h-36 w-full md:h-52"
                    />
                  )}
                  <div className="mt-2">
                    <p className="font-display text-xl leading-tight text-ink">
                      {d.city}
                    </p>
                    <p className="mt-1 text-xs text-ink-soft/65">
                      {getGuidesByDestination(d.id).length} stories to discover
                    </p>
                    <p
                      className={`text-xs uppercase tracking-[0.1em] ${
                        d.status === "live"
                          ? "text-terracotta"
                          : d.status === "guide"
                            ? "text-jungle"
                            : d.status === "field-note"
                              ? "text-gold"
                              : "text-ink-soft/50"
                      }`}
                    >
                      {d.status === "live" && "Plan"}
                      {d.status === "guide" && "Explore"}
                      {d.status === "field-note" && "Field Note"}
                      {d.status === "coming-soon" && "Coming soon"}
                    </p>
                    {d.railiiConnection && (
                      <p className="mt-0.5 flex items-center gap-1 text-[10px] text-ink-soft/40">
                        <appFamily.rallii.icon size={11} /> Scenic route
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
      <p className="px-5 pt-2 text-center text-[11px] italic text-ink-soft/35 md:px-8">
        A{" "}
        <button
          type="button"
          onClick={() => openExternal(CREATOR_PORTFOLIO_URL)}
          className="underline decoration-ink-soft/20 underline-offset-2"
        >
          @jordypop
        </button>{" "}
        project
      </p>
    </div>
  );
}
