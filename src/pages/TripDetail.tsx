import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getDestinationById, getPlace, getPlacesByDestination } from '@/data'
import {
  getTrip, getEffectiveItinerary, saveUserItinerary, renameTrip, removeTrip, getLibrary,
} from '@/lib/storage'
import { Photo } from '@/components/Photo'
import { ItineraryEditor } from '@/components/ItineraryEditor'
import { EmptyState } from '@/components/EmptyState'
import { Pencil, Trash2, ArrowLeft, Shirt, Baby } from 'lucide-react'
import type { Itinerary } from '@/types'

export function TripDetail() {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const trip = tripId ? getTrip(tripId) : undefined
  const destination = trip ? getDestinationById(trip.destinationId) : undefined
  const [itinerary, setItinerary] = useState<Itinerary | undefined>(
    () => trip && getEffectiveItinerary(trip.itineraryId)
  )
  const [editingTitle, setEditingTitle] = useState(false)
  const [titleDraft, setTitleDraft] = useState(trip?.title ?? '')

  if (!trip || !destination || !itinerary) {
    return (
      <EmptyState
        title="Trip not found"
        body="This trip may have been deleted, or the link is out of date."
        action={<Link to="/saved" className="mt-2 rounded-full bg-terracotta px-5 py-2 text-sm text-cream">Back to Saved</Link>}
      />
    )
  }

  function persist(updated: Itinerary) {
    saveUserItinerary(updated)
    setItinerary(updated)
  }

  function commitTitle() {
    setEditingTitle(false)
    const title = titleDraft.trim()
    if (!title || !tripId) return
    renameTrip(tripId, title)
    persist({ ...itinerary!, title })
  }

  function handleDelete() {
    if (!tripId) return
    removeTrip(tripId)
    navigate('/saved')
  }

  const usedPlaceIds = new Set(itinerary.days.flatMap((d) => d.activities.map((a) => a.placeId).filter(Boolean)))
  const savedPlaceIds = getLibrary().savedPlaceIds
  const addablePlaces = savedPlaceIds
    .map(getPlace)
    .filter((p): p is NonNullable<typeof p> => !!p && p.city === destination.city && !usedPlaceIds.has(p.id))

  const answers = itinerary.answers

  return (
    <div className="animate-fade-in pb-6">
      <div className="relative">
        <Photo src={destination.heroPhoto} seed={destination.id} alt={destination.city} priority className="h-56 w-full md:h-72" rounded="rounded-none" />
        <Link to="/saved" className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink/50 text-cream backdrop-blur-sm">
          <ArrowLeft size={16} />
        </Link>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 pt-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-light">{destination.city}, {destination.country}</p>
          {editingTitle ? (
            <input
              autoFocus
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={commitTitle}
              onKeyDown={(e) => e.key === 'Enter' && commitTitle()}
              className="w-full border-b-2 border-cream bg-transparent font-display text-3xl text-cream outline-none"
            />
          ) : (
            <button onClick={() => { setTitleDraft(itinerary.title); setEditingTitle(true) }} className="flex items-center gap-2 text-left">
              <h1 className="font-display text-3xl text-cream">{itinerary.title}</h1>
              <Pencil size={14} className="shrink-0 text-cream/50" />
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-6 px-5 pt-5 md:px-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-soft/70">
          <span className="rounded-full bg-cream px-3 py-1 ring-1 ring-ink/10">{itinerary.days.length} days</span>
          {answers?.companions && <span className="rounded-full bg-cream px-3 py-1 capitalize ring-1 ring-ink/10">{answers.companions}</span>}
          {answers?.style && <span className="rounded-full bg-cream px-3 py-1 capitalize ring-1 ring-ink/10">{answers.style}</span>}
          {answers?.pace && <span className="rounded-full bg-cream px-3 py-1 capitalize ring-1 ring-ink/10">{answers.pace.replace('-', ' ')}</span>}
          {answers?.interests?.map((i) => (
            <span key={i} className="rounded-full bg-terracotta/10 px-3 py-1 capitalize text-terracotta">{i}</span>
          ))}
        </div>

        <ItineraryEditor
          itinerary={itinerary}
          onChange={persist}
          fallbackHero={destination.heroPhoto}
          candidatePlaces={getPlacesByDestination(destination.id)}
          addablePlaces={addablePlaces}
        />

        <div className="flex gap-3 pt-2">
          <Link to={`/destinations/${destination.slug}`} className="flex-1 rounded-full bg-cream py-3 text-center text-sm font-medium text-ink-soft ring-1 ring-ink/10">
            Back to {destination.city}
          </Link>
          <button onClick={handleDelete} className="flex items-center gap-1.5 rounded-full bg-cream px-4 py-3 text-sm font-medium text-red-500 ring-1 ring-ink/10">
            <Trash2 size={14} /> Delete Trip
          </button>
        </div>
        <p className="text-center text-[11px] text-ink-soft/40">
          Assembled from the Jet Set LatAm {destination.city} Place database — not AI-generated. Changes save automatically on this device.
        </p>

        <MakeItYours />
      </div>
    </div>
  )
}

// Subtle, Trip Detail-only teaser for two sibling products that read this
// trip's shape (see `src/lib/tripContext.ts`) without merging their
// functionality into Jet Set LatAm. Editorial in tone, no fake interactivity
// — both cards are plainly "coming soon" and do nothing when tapped.
function MakeItYours() {
  return (
    <div className="border-t border-ink/10 pt-6">
      <p className="text-center text-[11px] uppercase tracking-[0.2em] text-ink-soft/40">Make It Yours</p>
      <p className="mx-auto mt-1.5 max-w-sm text-center text-xs text-ink-soft/50">
        Two companions to this trip, on the way.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-cream p-4 ring-1 ring-ink/5">
          <Shirt size={18} className="text-terracotta" />
          <p className="mt-2 font-display text-base text-ink">Luxe Jetter</p>
          <p className="mt-0.5 text-xs leading-relaxed text-ink-soft/60">What am I wearing? Outfit planning built around this itinerary.</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-ink-soft/40">Coming soon</p>
        </div>
        <div className="rounded-2xl bg-cream p-4 ring-1 ring-ink/5">
          <Baby size={18} className="text-jungle" />
          <p className="mt-2 font-display text-base text-ink">Little Jetter</p>
          <p className="mt-0.5 text-xs leading-relaxed text-ink-soft/60">How are the kids joining? Prep made for traveling with them.</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-ink-soft/40">Coming soon</p>
        </div>
      </div>
    </div>
  )
}
