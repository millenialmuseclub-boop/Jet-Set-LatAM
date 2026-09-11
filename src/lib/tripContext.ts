import type { TripContext } from '@/types'
import { getDestinationById } from '@/data'
import { getTrip, getEffectiveItinerary } from '@/lib/storage'

// Ecosystem foundation only — see the `TripContext` type for the full
// rationale. Nothing in Jet Set LatAm calls this today; it's the smallest
// possible seam for a future Luxe Jetter/Little Jetter handoff to read a
// saved trip's shape without reaching into this app's storage internals
// directly. Purely derived (never stored) so there is nothing new to keep in
// sync, and no behavior here changes if it's never called.
export function getTripContext(tripId: string): TripContext | undefined {
  const trip = getTrip(tripId)
  if (!trip) return undefined

  const destination = getDestinationById(trip.destinationId)
  if (!destination) return undefined

  const itinerary = getEffectiveItinerary(trip.itineraryId)
  const answers = itinerary?.answers

  const selectedPlaces = itinerary
    ? [...new Set(itinerary.days.flatMap((d) => d.activities.map((a) => a.placeId).filter((id): id is string => !!id)))]
    : []

  return {
    tripId: trip.id,
    destinationId: destination.id,
    destinationName: destination.city,
    city: destination.city,
    country: destination.country,
    days: answers?.days ?? itinerary?.days.length ?? 0,
    companions: answers?.companions,
    interests: answers?.interests,
    style: answers?.style,
    pace: answers?.pace,
    selectedPlaces,
  }
}
