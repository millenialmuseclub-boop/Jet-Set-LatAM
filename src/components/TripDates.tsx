import { useState } from 'react'
import type { SavedTrip,Itinerary } from '@/types'
import { setTripStartDate } from '@/lib/storage'
import { dateAfter } from '@/lib/tripLifecycle'
export function TripDates({trip,itinerary}:{trip:SavedTrip;itinerary:Itinerary}) {
 const [date,setDate]=useState(trip.startDate||''); const [message,setMessage]=useState('')
 return <section className="my-5 rounded-2xl border border-ink/15 bg-cream p-5"><h2 className="font-display text-2xl">When are you going?</h2><p className="my-2 text-xs text-ink-soft">Dates bring your daily itinerary to Home during the trip.</p><label className="block text-xs">Trip start date<input aria-label="Trip start date" type="date" value={date} onChange={e=>{setDate(e.target.value);setMessage('')}} className="mt-2 block min-h-11 max-w-full rounded-lg border border-ink/20 bg-parchment px-3"/></label>{date&&<p className="mt-3 text-xs">{itinerary.days.length} days · ends {dateAfter(date,itinerary.days.length-1)}</p>}<button className="mt-3 min-h-11 text-sm text-terracotta" onClick={()=>{try{setTripStartDate(trip.id,date);setMessage(date?'Trip dates saved.':'Trip dates cleared.')}catch(e){setMessage((e as Error).message)}}}>Save dates</button><p role="status" className="text-xs text-ink-soft">{message}</p></section>
}
