import { mexicoCityDestination, cdmxPlaces, cdmxGuides, cdmxReadyMadeItinerary } from './destinations/mexico-city'
import { rioDeJaneiroDestination, rioPlaces, rioGuides, rioReadyMadeItinerary } from './destinations/rio-de-janeiro'
import { cartagenaDestination, cartagenaPlaces, cartagenaGuides, cartagenaReadyMadeItinerary } from './destinations/cartagena'
import { guadalajaraDestination, guadalajaraPlaces, guadalajaraGuides } from './destinations/guadalajara'
import { tulumDestination, tulumPlaces } from './destinations/tulum'
import { comingSoonDestinations } from './destinations/coming-soon'
import { fieldNoteDestinations } from './destinations/field-notes'
import { saoPauloDestination, saoPauloPlaces } from './destinations/sao-paulo'
import type { Destination, Place, Guide, Itinerary } from '@/types'

export const destinations: Destination[] = [mexicoCityDestination, rioDeJaneiroDestination, cartagenaDestination, guadalajaraDestination, tulumDestination, saoPauloDestination, ...fieldNoteDestinations, ...comingSoonDestinations]
export const places: Place[] = [...cdmxPlaces, ...rioPlaces, ...cartagenaPlaces, ...guadalajaraPlaces, ...tulumPlaces, ...saoPauloPlaces]
export const guides: Guide[] = [...cdmxGuides, ...rioGuides, ...cartagenaGuides, ...guadalajaraGuides]
export const itineraries: Itinerary[] = [cdmxReadyMadeItinerary, rioReadyMadeItinerary, cartagenaReadyMadeItinerary]

export const flagshipDestination = mexicoCityDestination

export function getDestinationBySlug(slug: string) {
  return destinations.find((d) => d.slug === slug)
}
export function getDestinationById(id: string) {
  return destinations.find((d) => d.id === id)
}
/** A Place doesn't carry a destinationId directly (it's identified by
 *  city/country, same as the rest of the content model) — this resolves
 *  the Destination a Place belongs to, for wiring "Add to Trip" and similar
 *  cross-cutting actions from anywhere a Place is rendered. */
export function getDestinationForPlace(place: Place) {
  return destinations.find((d) => d.city === place.city)
}
export function getPlace(id: string) {
  return places.find((p) => p.id === id)
}
export function getPlacesByIds(ids: string[]) {
  return ids.map(getPlace).filter((p): p is Place => !!p)
}
export function getGuide(id: string) {
  return guides.find((g) => g.id === id)
}
export function getGuidesByIds(ids: string[]) {
  return ids.map(getGuide).filter((g): g is Guide => !!g)
}
export function getItinerary(id: string) {
  return itineraries.find((i) => i.id === id)
}
export function getJetSetPicks(destinationId?: string) {
  return places.filter((p) => p.isJetSetPick && (!destinationId || p.city === destinations.find(d=>d.id===destinationId)?.city))
}
export function getPlacesByDestination(destinationId: string) {
  const dest = destinations.find((d) => d.id === destinationId)
  if (!dest) return []
  return getPlacesByIds(dest.placeIds)
}
export function getGuidesByDestination(destinationId: string) {
  const dest = destinations.find((d) => d.id === destinationId)
  if (!dest) return []
  return getGuidesByIds(dest.guideIds)
}
