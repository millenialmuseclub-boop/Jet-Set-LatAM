import { destinations, getItinerary, getPlacesByDestination } from '@/data'
import type { Destination, Itinerary } from '@/types'

export function canPersonalizeTrip(destination: Destination) {
  return destination.status === 'live' && getPlacesByDestination(destination.id).length >= 6
}
export function starterItinerary(destination: Destination) {
  return destination.itineraryIds.map(getItinerary).find((it): it is Itinerary => !!it)
}
export const planningDestinations = destinations.filter(d => canPersonalizeTrip(d) || !!starterItinerary(d))
export function copyStarterItinerary(template: Itinerary): Itinerary {
  const id=crypto.randomUUID?.() ?? Array.from(crypto.getRandomValues(new Uint8Array(16)),n=>n.toString(16).padStart(2,'0')).join('')
  return {...template,id:`it-copy-${id}`,isReadyMade:false,days:template.days.map(day=>({...day,activities:day.activities.map(a=>({...a}))}))}
}
