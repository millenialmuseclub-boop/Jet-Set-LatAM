import { ShopMyEdit } from '@/components/ShopMyEdit'
import { rioCity2025 } from '@/data/rio-city-2025';
import { sambadrome2025 } from '@/data/sambadrome-2025';
import { useState } from 'react'
import type { Destination, TripContext, Itinerary } from '@/types'
import { destinationStyle } from '@/data/style'
import { appFamily } from '@/config/appFamily'
import { openExternal } from '@/lib/links'
import { buildStyleHandoff, formatStyleBrief } from '@/lib/styleHandoff'
import { luxeJetterLink } from '@/lib/luxeJetterLinks'
export function StyleBridge({destination,context,itinerary,carnival=false,commerce=true,variant='destination'}: {destination:Destination;context?:TripContext;itinerary?:Itinerary;carnival?:boolean;commerce?:boolean;variant?:'destination'|'trip'|'shopping'|'neighborhood'}) {
 const [brief,setBrief]=useState(''); const [copied,setCopied]=useState(false)
 const copy=destinationStyle[destination.id]; if(!copy) return null
 const tripContext=context || (itinerary ? {...itinerary.answers,tripId:itinerary.id,destinationId:destination.id,destinationName:destination.city,city:destination.city,country:destination.country,days:itinerary.days.length} : undefined)
 const handoff=tripContext&&itinerary?buildStyleHandoff(tripContext,itinerary):undefined
 const occasions=handoff?.occasions || (carnival?['Bloco','Sambadrome','Beach Day','Dinner','Travel Day']:copy.occasions)
 const city=destination.id==='rio-de-janeiro'?'Rio':destination.city
 const trip=variant==='trip'||!!itinerary
 const partner=luxeJetterLink(destination.id,trip?'packing':'looks')
 const headline=trip?'Pack for This Trip':variant==='shopping'?'Build a look around the journey':variant==='neighborhood'?'Dress for a day of exploring':copy.headline
 return <section aria-label={'Style for '+(carnival?'Carnival':destination.city)} className="style-bridge rounded-2xl border border-terracotta/20 bg-cream p-5 text-left">
 {destination.id==='rio-de-janeiro'&&<img src={carnival?sambadrome2025[5].src:rioCity2025[7].src} alt={carnival?sambadrome2025[5].caption:rioCity2025[7].caption} loading="lazy" className="mb-5 h-44 w-full rounded-xl object-cover"/>}
 <p className="eyebrow text-terracotta">Jet Set LatAm plans the trip. Luxe Jetter dresses it.</p>
 <h2 className="my-3 font-display text-3xl italic">{carnival?'What are you wearing to Carnival?':headline}</h2>
 <p className="text-sm leading-relaxed text-ink-soft">{handoff?handoff.trip.days+' days in '+destination.city+', with a wardrobe for the plans you’ve made.':copy.body}</p>
 <div className="my-4 flex flex-wrap gap-2">{occasions.map(o=><span key={o} className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink-soft">{o}</span>)}</div>
 <button onClick={()=>openExternal(partner.url)} className="min-h-12 text-left text-sm font-medium text-terracotta">{trip?'Pack for This Trip':variant==='shopping'?'Build a Look':variant==='neighborhood'?'Shop and Pack for the Day':`Explore ${carnival?'Carnival':city} Looks`} → Luxe Jetter</button>
 {!partner.matched&&<p className="text-xs leading-relaxed text-ink-soft">Open the wardrobe builder and choose an available destination for inspiration.</p>}
 <div><button onClick={()=>openExternal(appFamily['luxe-jetter'].iOSURL)} className="min-h-11 text-xs underline text-ink-soft">Get Luxe Jetter for iPhone</button></div>
 {handoff&&<div><button className="min-h-11 text-xs underline text-ink-soft" onClick={async()=>{const text=formatStyleBrief(handoff);try{await navigator.clipboard.writeText(text);setCopied(true)}catch{setBrief(text)}}}>Copy trip brief</button><p className="text-xs text-ink-soft" role="status">{copied?'Trip brief copied.':'Keep your itinerary handy while styling your trip.'}</p>{brief&&<textarea aria-label="Trip style brief" readOnly value={brief} className="mt-3 h-36 w-full border border-ink/20 p-3 text-xs" onFocus={e=>e.target.select()}/>}</div>}
 {commerce&&<ShopMyEdit destinationId={destination.id} compact/>}
 </section>
}
