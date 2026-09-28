import { tripOverlapsCarnival } from '@/lib/carnivalSeason'
import type { Destination,Itinerary } from '@/types'
import { tripExtensions } from '@/lib/constellation'
import { getTripContext } from '@/lib/tripContext'
import { getPlace } from '@/data'
import { foodCompanion, familyCompanion, destinationFoodCompanion } from '@/lib/companionLinks'
import { CompanionReading } from './CompanionReading'
import { StyleBridge } from './StyleBridge'
import { RalliiBridge } from './RalliiBridge'

export function TripConstellation({destination,tripId,itinerary}:{destination:Destination;tripId:string;itinerary:Itinerary}) {
  const context=getTripContext(tripId)
  const extensions=tripExtensions(itinerary)
  const foodText=itinerary.days.flatMap(d=>d.activities).flatMap(a=>{
    const place=a.placeId?getPlace(a.placeId):undefined
    return place&&['restaurant','cafe'].includes(place.category)?[place.name+' '+place.description]:[]
  }).join(' ')
  return <section aria-label="Trip constellation" className="my-7 border-t border-ink/15 pt-6">
    <h2 className="text-center font-display text-3xl italic">Make this trip yours.</h2>
    <div className="mx-auto my-5 max-w-sm rounded-full border border-terracotta/25 bg-cream px-6 py-5 text-center">
      <p className="eyebrow text-terracotta">Your trip, at the center</p>
      <p className="mt-2 font-display text-2xl">{destination.city}</p>
      <p className="mt-1 text-xs text-ink-soft">{itinerary.days.length} days · {itinerary.answers?.companions||'your travel plans'}</p>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2"><StyleBridge destination={destination} context={context} itinerary={itinerary} commerce={false} carnival={tripOverlapsCarnival(destination.id,context?.startDate,itinerary.days.length)}/></div>
      {extensions.food&&<CompanionReading link={foodCompanion(foodText)||destinationFoodCompanion(destination.id)}/>}
      <CompanionReading link={familyCompanion(destination.id,extensions.family)}/>
      {extensions.adventure&&<RalliiBridge destination={destination} itinerary={itinerary}/>}
    </div>
  </section>
}
