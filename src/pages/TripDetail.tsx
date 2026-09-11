import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getDestinationById, getPlace, getPlacesByDestination } from '@/data'
import {
  getTrip, getEffectiveItinerary, saveUserItinerary, renameTrip, removeTrip, getLibrary,
} from '@/lib/storage'
import { Photo } from '@/components/Photo'
import { ItineraryEditor } from '@/components/ItineraryEditor'
import { EmptyState } from '@/components/EmptyState'
import { Pencil, Trash2, ArrowLeft, Bike, Shirt, Baby, ArrowUpRight } from 'lucide-react'
import { ConfirmSheet } from '@/components/ConfirmSheet'
import { getTripContext } from '@/lib/tripContext'
import { generateLuxeJetterCopy, deriveWardrobeMoments } from '@/lib/luxeJetterCopy'
import type { Destination, Itinerary } from '@/types'

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
  const [confirmingDelete, setConfirmingDelete] = useState(false)

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
          <button onClick={() => setConfirmingDelete(true)} className="flex items-center gap-1.5 rounded-full bg-cream px-4 py-3 text-sm font-medium text-red-500 ring-1 ring-ink/10">
            <Trash2 size={14} /> Delete Trip
          </button>
        </div>
        <ConfirmSheet
          open={confirmingDelete}
          title="Delete this trip?"
          body={`"${itinerary.title}" and its itinerary will be removed from this device. This can't be undone.`}
          confirmLabel="Delete Trip"
          onCancel={() => setConfirmingDelete(false)}
          onConfirm={handleDelete}
        />
        <p className="text-center text-[11px] text-ink-soft/40">
          Assembled from the Jet Set LatAm {destination.city} Place database — not AI-generated. Changes save automatically on this device.
        </p>

        <MakeItYours destination={destination} tripId={trip.id} itinerary={itinerary} />
      </div>
    </div>
  )
}

// Contextual, Trip Detail-only surface for the sibling apps in the Jordypop
// family (see src/config/appFamily.ts) that could read this trip's shape
// (src/lib/tripContext.ts) without merging their functionality into Jet Set
// LatAm. Each card only appears when it's genuinely relevant to *this* trip
// — never a static ad block. All three sibling apps are published; their
// deep-link URLs aren't wired into this file yet, so a card reads as a real
// promo for a real app rather than a live button, until a verified webURL/
// iOSURL lands in src/config/appFamily.ts. Copy is generated from this
// trip's real data (see src/lib/luxeJetterCopy.ts) rather than one static
// sentence reused across every destination.
function MakeItYours({ destination, tripId, itinerary }: { destination: Destination; tripId: string; itinerary: Itinerary }) {
  const context = getTripContext(tripId)
  const companions = itinerary.answers?.companions
  const isFamilyTrip = companions === 'family'
  const railii = destination.railiiConnection
  const moments = deriveWardrobeMoments(itinerary)
  const luxeCopy = context ? generateLuxeJetterCopy(context, moments) : undefined

  return (
    <div className="border-t border-ink/10 pt-6">
      <p className="text-center text-[11px] uppercase tracking-[0.2em] text-ink-soft/40">Make It Yours</p>
      <p className="mx-auto mt-1.5 max-w-sm text-center text-xs text-ink-soft/50">
        The rest of the Jet Set family, for the parts of this trip we don't cover.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Luxe Jetter — always relevant. Copy is trip-specific: destination,
            day count, and this itinerary's real occasion mix (see
            deriveWardrobeMoments). */}
        <div className="rounded-2xl bg-gradient-to-br from-terracotta/10 via-cream to-cream p-4 ring-1 ring-terracotta/15 sm:col-span-2">
          <div className="flex items-center gap-2">
            <Shirt size={18} className="text-terracotta" />
            <p className="text-[11px] uppercase tracking-[0.14em] text-terracotta">Luxe Jetter</p>
          </div>
          <p className="mt-2 font-display text-lg text-ink">{luxeCopy?.headline ?? 'What Are You Wearing?'}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-ink-soft/60">
            {luxeCopy?.body ?? 'Luxe Jetter builds an outfit plan around this exact itinerary.'}
          </p>

          {/* Mini wardrobe preview — not Luxe Jetter embedded, just the real
              occasion types this itinerary contains, so the handoff feels
              concrete instead of generic. No products or looks are shown or
              invented here — that's Luxe Jetter's job. */}
          {moments.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.1em] text-ink-soft/40">Your {destination.city} trip:</span>
              {moments.map((m, i) => (
                <span key={m} className="text-xs text-ink-soft/70">
                  {m}{i < moments.length - 1 && <span className="mx-1.5 text-ink-soft/25">/</span>}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs font-medium text-terracotta/80">{luxeCopy?.cta ?? 'Build My Wardrobe'}</p>
            <ArrowUpRight size={13} className="text-terracotta/60" />
          </div>
        </div>

        {/* Little Jetter — only for trips traveling with kids. Parent-facing
            copy only; zero child-directed commerce language. */}
        {isFamilyTrip && (
          <div className="rounded-2xl bg-gradient-to-br from-jungle/10 via-cream to-cream p-4 ring-1 ring-jungle/15">
            <Baby size={18} className="text-jungle" />
            <p className="mt-2 font-display text-lg text-ink">Little Jetters Coming Too?</p>
            <p className="mt-0.5 text-xs leading-relaxed text-ink-soft/60">
              Let them get ready for the trip too — Little Jetter helps you prep and pack for traveling with kids.
            </p>
            <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-jungle/80">
              Explore Little Jetter <ArrowUpRight size={11} />
            </div>
          </div>
        )}

        {/* Rallii — only when this destination has a genuine, documented
            scenic-rail/mountain-biking/trail connection. */}
        {railii && (
          <div className="rounded-2xl bg-gradient-to-br from-gold/15 via-cream to-cream p-4 ring-1 ring-gold/20">
            <Bike size={18} className="text-gold" />
            <p className="mt-2 font-display text-lg text-ink">Take the Scenic Route</p>
            <p className="mt-0.5 text-xs leading-relaxed text-ink-soft/60">There's more to the journey. {railii.description}</p>
            <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-gold/80">
              Explore in Rallii <ArrowUpRight size={11} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
