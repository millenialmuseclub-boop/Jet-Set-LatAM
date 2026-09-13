import { guides } from '@/data'
import { outdoorStoryIds,ralliiEditorialJourneys } from '@/data/rallii'
import { StoryCard } from './StoryCard'
import { appFamily } from '@/config/appFamily'
import { openExternal } from '@/lib/links'
export function OutdoorJourneys({destination='',query=''}:{destination?:string;query?:string}) {
 const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
 const stories=guides.filter(g=>outdoorStoryIds.includes(g.id)&&(!destination||g.destinationId===destination||g.relatedDestinationIds?.includes(destination))&&normalize(g.title+' '+g.dek).includes(normalize(query)))
 return <section className="mt-7"><h2 className="font-display text-3xl italic">Outdoors + Journeys</h2><p className="mt-3 mb-6 text-sm text-ink-soft">Rail diaries, bike rides and time beyond the city, from the Jet Set LatAm archive.</p><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{stories.map(g=><StoryCard key={g.id} guide={g}/>)}</div>{!stories.length&&<p className="my-6 text-sm">No outdoor stories match these filters.</p>}
 {!destination&&ralliiEditorialJourneys.filter(j=>normalize(j.name+' '+j.region).includes(normalize(query))).map(j=><article key={j.id} className="mt-8 rounded-2xl border border-ink/15 bg-cream p-6"><p className="eyebrow text-terracotta">Great journeys · Rallii Rail</p><h3 className="my-3 font-display text-3xl">{j.name}</h3><p className="text-xs uppercase tracking-wider text-ink-soft">{j.region}</p><p className="my-4 max-w-lg text-sm leading-relaxed text-ink-soft">{j.description}</p><button onClick={()=>openExternal(appFamily.rallii.iOSURL)} className="min-h-11 text-sm text-terracotta">Explore with Rallii →</button></article>)}
 </section>
}
