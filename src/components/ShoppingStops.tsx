import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Guide } from '@/types'
import { getPlace } from '@/data'
import { AddToTripControl } from './AddToTripControl'
import { isSavedPlace, toggleSavedPlace } from '@/lib/storage'
import { openExternal } from '@/lib/links'

export function ShoppingStops({ notes }: { notes: NonNullable<Guide['shoppingNotes']> }) {
  const [, refresh] = useState(0)
  return <section aria-label="Shopping Notes stops" className="space-y-4">
    <h2 className="font-display text-3xl">Your shopping notes</h2>
    <p className="text-xs text-ink-soft">Reviewed {notes.checkedAt}. Browse at your own pace; suggested browsing time is separate from walking time.</p>
    <ol className="space-y-4">
      {notes.stops.map(stop => {
        const place = getPlace(stop.placeId)
        if (!place) return null
        const leg = notes.legs.find(l => l.fromPlaceId === place.id)
        return <li key={place.id} className="rounded-2xl bg-cream p-4">
          <p className="eyebrow text-terracotta">{place.category === 'cafe' ? 'Café pause' : 'Shopping stop'}</p>
          <h3 className="font-display text-2xl">{stop.number}. {place.name}</h3>
          <p className="mt-2 text-sm">{stop.reasonToVisit}</p>
          {!!stop.whatToBuy.length && <p className="mt-2 text-sm">Look for: {stop.whatToBuy.join(', ')}.</p>}
          {stop.browseMinutes && <p className="mt-2 text-xs">Suggested browsing pause: {stop.browseMinutes} minutes.</p>}
          {place.practicalNotes && <p className="mt-2 text-xs">{place.practicalNotes}</p>}
          <div className="mt-2 flex flex-wrap gap-x-4">
            <button className="min-h-11 text-xs text-terracotta" onClick={() => { toggleSavedPlace(place.id); refresh(n => n + 1) }}>{isSavedPlace(place.id) ? 'Saved place' : 'Save place'}</button>
            {place.website && <button className="min-h-11 text-xs text-terracotta" onClick={() => openExternal(place.website!)}>Visit website ↗</button>}
            {place.mapUrl && <button className="min-h-11 text-xs text-terracotta" onClick={() => openExternal(place.mapUrl!)}>View verified location ↗</button>}
          </div>
          <AddToTripControl place={place}/>
          {place.offer && <aside className="mt-3 border-t border-ink/10 pt-3 text-xs" aria-label="Commercial link">
            <button className="min-h-11 text-terracotta" onClick={() => openExternal(place.offer!.affiliateUrl || place.offer!.bookingUrl)}>Booking or shopping partner ↗</button>
            {place.offer.disclosure && <p>{place.offer.disclosure}</p>}
          </aside>}
          {leg && <div className="mt-3 border-t border-ink/10 pt-3 text-xs">
            <button className="min-h-11 text-terracotta" onClick={() => openExternal(leg.url)}>Walk to {getPlace(leg.toPlaceId)?.name} ↗</button>
            <p>Pedestrian estimate: {leg.walkingMinutes} minutes · {leg.distanceMeters} m. Browsing time excluded.</p>
            <button className="min-h-11 underline" onClick={() => openExternal(leg.sourceUrl)}>Route source · checked {leg.checkedAt}</button>
          </div>}
        </li>
      })}
    </ol>
    <Link to="/saved" className="inline-flex min-h-11 items-center text-xs text-terracotta">Open saved places →</Link>
  </section>
}
