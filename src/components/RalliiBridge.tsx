import type { Destination, Itinerary } from '@/types'
import { relevantRalliiConnections } from '@/lib/ralliiHandoff'
import { appFamily } from '@/config/appFamily'
import { openExternal } from '@/lib/links'
export function RalliiBridge({destination,itinerary,placeId,compact=false}:{destination:Destination;itinerary?:Itinerary;placeId?:string;compact?:boolean}) {
 const matches=relevantRalliiConnections(destination.id,itinerary,placeId)
 if(!matches.length)return null
 if(compact)return <button onClick={()=>openExternal(appFamily.rallii.iOSURL)} className="min-h-11 text-xs text-terracotta">Explore in Rallii →</button>
 return <section className="rallii-motion rounded-2xl border border-ink/15 bg-cream p-5" aria-label="Rallii adventure handoff"><p className="eyebrow text-terracotta">Explore beyond the itinerary</p><h2 className="my-3 font-display text-3xl italic">{itinerary?'Take the scenic route':'Beyond '+destination.city}</h2><ul className="space-y-3">{matches.map(c=><li key={c.id}><h3 className="font-display text-xl">{c.routeName}</h3><p className="text-xs text-ink-soft">{c.region} · {c.mode.toUpperCase()}</p></li>)}</ul><button onClick={()=>openExternal(appFamily.rallii.iOSURL)} className="mt-4 min-h-11 text-sm text-terracotta">Continue in Rallii →</button></section>
}
