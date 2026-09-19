import { useState } from 'react'
import { Link } from 'react-router-dom'
import { destinations, getDestinationById, getPlacesByDestination } from '@/data'
import { getEffectiveItinerary, getSavedTrips } from '@/lib/storage'
import { getTravelMemory, clearTravelMemory } from '@/lib/travelMemory'
import { tripPhase } from '@/lib/tripLifecycle'
import { useTripClock } from '@/lib/useTripClock'
import { Photo } from './Photo'
import { Sheet } from './Sheet'
const moods=[{label:'Art & design',categories:['museum','shop']},{label:'A long lunch',categories:['restaurant','cafe']},{label:'Outside, please',categories:['beach','park','experience']}] as const
export function TravelCompanion({library=false}:{library?:boolean}){
  const now=useTripClock()
  const [memory,setMemory]=useState(getTravelMemory)
  const [open,setOpen]=useState(false)
  const [mood,setMood]=useState(0)
  const [choice,setChoice]=useState(0)
  const trips=getSavedTrips().filter(t=>tripPhase(t,getEffectiveItinerary(t.itineraryId),now)!=='ended').sort((a,b)=>{
    const activeA=tripPhase(a,getEffectiveItinerary(a.itineraryId),now)==='active'
    const activeB=tripPhase(b,getEffectiveItinerary(b.itineraryId),now)==='active'
    return Number(activeB)-Number(activeA)||(a.startDate||'9999').localeCompare(b.startDate||'9999')||b.createdAt.localeCompare(a.createdAt)
  })
  const trip=trips[0],dest=trip?getDestinationById(trip.destinationId):undefined
  const recent=memory.recent.map(getDestinationById).filter(d=>!!d)
  const matches=destinations.filter(d=>d.status!=='coming-soon').map(d=>({destination:d,count:getPlacesByDestination(d.id).filter(p=>(moods[mood].categories as readonly string[]).includes(p.category)).length})).filter(d=>d.count>0).sort((a,b)=>b.count-a.count)
  const match=matches[choice%matches.length]
  return <section className="travel-companion" aria-label="Your next chapter">
    {trip&&dest&&<Link to={`/saved/trips/${trip.id}`} className="resume-ticket"><Photo src={dest.heroPhoto} alt={dest.city} seed={dest.id} className="h-28 w-24 shrink-0" rounded="rounded-none"/><div><p className="eyebrow">{tripPhase(trip,getEffectiveItinerary(trip.itineraryId),now)==='active'?'Your trip is happening':'Pick up where you left off'}</p><h2>{trip.title}</h2><p>{trip.startDate||'Dates still open'} · {getEffectiveItinerary(trip.itineraryId)?.days.length} days</p></div><span aria-hidden="true">↗</span></Link>}
    {!library&&<button className="somewhere-prompt" onClick={()=>setOpen(true)}><span><small>FOLLOW YOUR MOOD</small><strong>Find your somewhere.</strong></span><span aria-hidden="true">＋</span></button>}
    {(recent.length>0||memory.preferences)&&<div className="recent-destinations"><div className="flex items-center justify-between"><p className="eyebrow">Recently explored</p><button className="experience-link" onClick={()=>{clearTravelMemory();setMemory({recent:[]})}}>Clear recent & preferences</button></div><div className="flex flex-wrap gap-2">{recent.map(d=><Link key={d.id} to={`/destinations/${d.slug}`}>{d.city}</Link>)}</div></div>}
    <Sheet open={open} title="Where does your mood take you?" onClose={()=>setOpen(false)}>
      <div className="tuning-options">{moods.map((m,i)=><button key={m.label} aria-pressed={mood===i} onClick={()=>{setMood(i);setChoice(0)}}>{m.label}</button>)}</div>
      {match&&<div className="mood-match" key={match.destination.id}><Photo src={match.destination.heroPhoto} seed={match.destination.id} alt={match.destination.city} className="h-64 w-full" rounded="rounded-none"/><div><p className="eyebrow">{match.destination.country}</p><h3>{match.destination.city}</h3><p>{match.count} places in our collection match this mood.</p><Link className="experience-action" to={`/destinations/${match.destination.slug}`} onClick={()=>setOpen(false)}>Meet {match.destination.city}</Link></div></div>}
      <button className="experience-link" disabled={matches.length<2} onClick={()=>setChoice(c=>c+1)}>Another possibility</button>
      <p className="mt-3 text-xs text-ink-soft">Matched from the Jet Set collection. No live availability or AI-generated recommendations.</p>
    </Sheet>
  </section>
}
