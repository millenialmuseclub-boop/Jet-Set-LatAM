import catalog from '@/config/luxeDestinations.json'
import type { Itinerary } from '@/types'
import { getPlace } from '@/data'

const origin = 'https://luxe-jetter-frontend.vercel.app'
const destinations: Record<string, { id: string; name: string; country: string }> = catalog.destinations

/** Use the receiving app's published routes and accepted query keys only. */
export function wardrobeIntentForTrip(itinerary?:Itinerary): 'City Break' | 'Beach Week' {
  return itinerary?.answers?.interests?.includes('beach') || itinerary?.days.some(day=>day.activities.some(a=>a.placeId&&getPlace(a.placeId)?.category==='beach')) ? 'Beach Week' : 'City Break'
}
export function luxeJetterLink(destinationId: string, intent: 'looks' | 'packing' = 'looks', packingIntent:'City Break'|'Beach Week'='City Break') {
  const match = destinations[destinationId]
  const url = new URL(intent === 'looks' && match ? `/destinations/${encodeURIComponent(match.id)}` : '/wardrobe-builder', origin)
  url.searchParams.set('via', 'jetset')
  if (url.pathname === '/wardrobe-builder') {
    url.searchParams.set('intent', packingIntent)
    if (match) url.searchParams.set('destination', match.id)
  }
  return { url: url.href, matched: !!match, destinationName: match?.name }
}
