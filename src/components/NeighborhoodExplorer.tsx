import { Link } from 'react-router-dom'
import type { Destination, Place } from '@/types'
import { neighborhoodPlaces } from '@/lib/discovery'
import { Photo } from './Photo'
import { AddToTripControl } from './AddToTripControl'
import { openMap } from '@/lib/links'

const categoryLabels: Partial<Record<Place['category'], string>> = { restaurant: 'Tables', cafe: 'Cafés', museum: 'Art', landmark: 'Culture', shop: 'Shopping', beach: 'Beach', park: 'Green spaces', bar: 'After dark', nightlife: 'After dark', experience: 'Experiences', hotel: 'Stays' }
export function NeighborhoodExplorer({ destination, places }: { destination: Destination; places: Place[] }) {
  return <div className="grid gap-4 md:grid-cols-2">{destination.neighborhoods.map(n => {
    const local = neighborhoodPlaces(n, places)
    const strengths = [...new Set(local.map(p => categoryLabels[p.category]))].filter(Boolean).slice(0, 3)
    const photo = n.heroPhoto || local.find(p => p.photos.length)?.photos[0]
    return <article key={n.id} className="neighborhood-card bg-cream">
      {photo && <Photo src={photo} seed={n.id} alt={n.heroPhoto ? n.name : local.find(p => p.photos[0] === photo)?.name || n.name} className="h-40 w-full"/>}
      <div className="p-4"><h2 className="font-display text-2xl">{n.name}</h2><p className="my-2 text-xs text-terracotta">{strengths.join(' · ')}</p><p className="text-sm text-ink-soft">{n.description}</p>
      {local.length ? <details className="destination-disclosure mt-2"><summary>{local.length} {local.length === 1 ? 'place' : 'places'} for your itinerary</summary><p className="mb-3 text-xs text-ink-soft">Build a day around this area. Add individual stops to a new or saved trip.</p>{local.map(p => <div key={p.id} className="border-t border-ink/10 py-3"><h3 className="font-display text-xl">{p.name}</h3><p className="mt-1 text-xs text-ink-soft">{p.pickDetails?.goFor || p.description}</p><div className="flex flex-wrap items-center gap-3"><AddToTripControl place={p}/>{p.mapUrl && <button className="min-h-11 text-xs text-terracotta" onClick={() => openMap(p.mapUrl)}>Map ↗</button>}</div></div>)}</details> : <p className="mt-3 text-xs text-ink-soft">Start with the city journal for this neighborhood.</p>}
      <Link className="inline-flex min-h-11 items-center text-xs text-terracotta" to={`/plan?destination=${destination.slug}`}>Make room in your trip →</Link></div>
    </article>
  })}</div>
}
