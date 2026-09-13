import { tripPhase } from '@/lib/tripLifecycle'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Place } from '@/types'
import { getDestinationForPlace } from '@/data'
import { getSavedTrips, addPlaceToTripItinerary, getEffectiveItinerary } from '@/lib/storage'
import { Plus, Check } from 'lucide-react'

// The "Add to Trip" affordance used anywhere a Place is rendered (destination
// category tabs, Jet Set Pick cards, Saved Places). Handles all three real
// cases: no matching trip yet, exactly one, or several — always asking for
// a day rather than silently dropping the place on the last one.
export function AddToTripControl({ place }: { place: Place }) {
  const [open, setOpen] = useState(false)
  const [tripId, setTripId] = useState<string | null>(null)
  const [added, setAdded] = useState(false)

  const destination = getDestinationForPlace(place)
  const trips = destination
    ? getSavedTrips().filter((t) => tripPhase(t,getEffectiveItinerary(t.itineraryId)) !== 'ended' && t.destinationId === destination.id)
    : []

  if (added) {
    return (
      <span className="flex items-center gap-1 text-[11px] text-terracotta">
        <Check size={12} /> Added
      </span>
    )
  }

  if (trips.length === 0) {
    return destination ? (
      <Link to={`/plan?destination=${destination.slug}`} className="flex items-center gap-1 text-[11px] text-ink-soft/60 hover:text-terracotta">
        <Plus size={12} /> Start a Trip
      </Link>
    ) : null
  }

  if (!open) {
    return (
      <button onClick={() => { setOpen(true); if (trips.length === 1) setTripId(trips[0].id) }} className="flex items-center gap-1 text-[11px] text-ink-soft/60 hover:text-terracotta">
        <Plus size={12} /> {trips.length === 1 ? `Add to ${trips[0].title}` : 'Add to Trip'}
      </button>
    )
  }

  const activeTrip = trips.find((t) => t.id === tripId)
  const itinerary = activeTrip ? getEffectiveItinerary(activeTrip.itineraryId) : undefined

  function confirmAdd(dayIndex: number) {
    if (!activeTrip || !itinerary) return
    addPlaceToTripItinerary(itinerary, place.id, dayIndex)
    setAdded(true)
    setOpen(false)
  }

  return (
    <div className="w-full rounded-lg bg-parchment p-2 text-xs">
      {trips.length > 1 && !tripId && (
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.08em] text-ink-soft/50">Choose trip</p>
          {trips.map((t) => (
            <button key={t.id} onClick={() => setTripId(t.id)} className="block w-full rounded-md bg-cream px-2 py-1 text-left text-ink hover:bg-terracotta hover:text-cream">
              {t.title}
            </button>
          ))}
        </div>
      )}
      {tripId && itinerary && (
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.08em] text-ink-soft/50">Choose day</p>
          <div className="flex flex-wrap gap-1">
            {itinerary.days.map((d, i) => (
              <button key={d.day} onClick={() => confirmAdd(i)} className="rounded-full bg-cream px-2.5 py-1 text-ink hover:bg-terracotta hover:text-cream">
                Day {d.day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
