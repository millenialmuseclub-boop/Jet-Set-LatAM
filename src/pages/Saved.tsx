import { useState } from 'react'
import { getLibrary, getSavedTrips, removeTrip, toggleSavedPlace } from '@/lib/storage'
import { getPlace, getDestinationById, getDestinationForPlace, getGuide } from '@/data'
import { Photo } from '@/components/Photo'
import { EmptyState } from '@/components/EmptyState'
import { AddToTripControl } from '@/components/AddToTripControl'
import { openExternal } from '@/lib/links'
import { Link } from 'react-router-dom'
import { Trash2, Map as MapIcon, Globe, BookmarkX } from 'lucide-react'
import type { Place } from '@/types'

export function Saved() {
  const [lib, setLib] = useState(getLibrary())
  const [trips, setTrips] = useState(getSavedTrips())

  const upcoming = trips.filter((t) => t.status === 'upcoming')
  const past = trips.filter((t) => t.status === 'past')
  const places = lib.savedPlaceIds.map(getPlace).filter((p): p is Place => !!p)
  const savedDests = lib.savedDestinationIds.map(getDestinationById).filter(Boolean)
  const savedGuides = lib.savedGuideIds.map(getGuide).filter(Boolean)

  // Group saved Places by destination city so this reads as a real personal
  // library rather than one undifferentiated pile once more than one or two
  // cities are in the mix.
  const placesByCity = new Map<string, Place[]>()
  for (const p of places) {
    const list = placesByCity.get(p.city) ?? []
    list.push(p)
    placesByCity.set(p.city, list)
  }

  function unsavePlace(placeId: string) {
    toggleSavedPlace(placeId)
    setLib(getLibrary())
  }

  const nothingSaved = trips.length === 0 && places.length === 0 && savedDests.length === 0 && savedGuides.length === 0

  return (
    <div className="animate-fade-in mx-auto max-w-3xl space-y-8 px-5 pt-6 pb-6 md:px-8 md:pt-10">
      <h1 className="font-display text-3xl text-ink">My Trips & Saves</h1>

      {nothingSaved && (
        <EmptyState
          title="Nothing saved yet"
          body="Save destinations, Jet Set Picks and trips as you explore — no account required, everything lives on this device."
          action={<Link to="/" className="mt-2 rounded-full bg-terracotta px-5 py-2 text-sm text-cream">Start exploring</Link>}
        />
      )}

      {upcoming.length > 0 && (
        <section className="space-y-3">
          <p className="font-display text-xl text-ink">My Trips</p>
          {upcoming.map((t) => {
            const dest = getDestinationById(t.destinationId)
            return (
              <div key={t.id} className="relative overflow-hidden rounded-2xl">
                <Photo src={dest?.heroPhoto} seed={t.destinationId} alt={dest?.city ?? ''} className="h-40 w-full" rounded="rounded-2xl" />
                <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-4">
                  <div>
                    <p className="font-display text-xl text-cream">{t.title}</p>
                    <p className="text-xs text-cream/70">Saved {new Date(t.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link to={`/saved/trips/${t.id}`} className="rounded-full bg-cream px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-ink">
                      Open Trip
                    </Link>
                    <button onClick={() => { removeTrip(t.id); setTrips(getSavedTrips()) }} className="text-cream/70" aria-label="Delete trip">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      )}

      {savedDests.length > 0 && (
        <section className="space-y-3">
          <p className="font-display text-xl text-ink">Saved Destinations</p>
          <div className="grid grid-cols-2 gap-3">
            {savedDests.map((d) => d && (
              <Link key={d.id} to={`/destinations/${d.slug}`}>
                <Photo src={d.heroPhoto} seed={d.id} alt={d.city} className="h-24 w-full" />
                <p className="mt-1 font-display text-base text-ink">{d.city}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {places.length > 0 && (
        <section className="space-y-5">
          <p className="font-display text-xl text-ink">Saved Places</p>
          {[...placesByCity.entries()].map(([city, cityPlaces]) => (
            <div key={city} className="space-y-2">
              {placesByCity.size > 1 && (
                <p className="text-[11px] uppercase tracking-[0.14em] text-terracotta">{city}</p>
              )}
              {cityPlaces.map((p) => {
                const dest = getDestinationForPlace(p)
                return (
                  <div key={p.id} className="flex gap-3 rounded-xl bg-cream p-3 ring-1 ring-ink/5">
                    {dest ? (
                      <Link to={`/destinations/${dest.slug}`} className="shrink-0">
                        <Photo src={p.photos[0]} seed={p.id} alt={p.name} className="h-14 w-14" />
                      </Link>
                    ) : (
                      <Photo src={p.photos[0]} seed={p.id} alt={p.name} className="h-14 w-14 shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      {dest ? (
                        <Link to={`/destinations/${dest.slug}`}>
                          <p className="font-display text-base leading-tight text-ink">{p.name}</p>
                        </Link>
                      ) : (
                        <p className="font-display text-base leading-tight text-ink">{p.name}</p>
                      )}
                      <p className="text-xs text-ink-soft/60">{p.neighborhood}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-3">
                        {p.mapUrl && (
                          <button onClick={() => openExternal(p.mapUrl)} className="flex items-center gap-1 text-[11px] text-ink-soft/60 hover:text-terracotta">
                            <MapIcon size={12} /> Map
                          </button>
                        )}
                        {p.website && (
                          <button onClick={() => openExternal(p.website)} className="flex items-center gap-1 text-[11px] text-ink-soft/60 hover:text-terracotta">
                            <Globe size={12} /> Website
                          </button>
                        )}
                        <AddToTripControl place={p} />
                        <button onClick={() => unsavePlace(p.id)} className="flex items-center gap-1 text-[11px] text-ink-soft/60 hover:text-red-500">
                          <BookmarkX size={12} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </section>
      )}

      {savedGuides.length > 0 && (
        <section className="space-y-3">
          <p className="font-display text-xl text-ink">Saved Guides</p>
          {savedGuides.map((g) => g && (
            <Link key={g.id} to={`/guides/${g.id}`} className="block rounded-xl bg-cream p-3 ring-1 ring-ink/5">
              <p className="font-display text-base text-ink">{g.title}</p>
            </Link>
          ))}
        </section>
      )}

      {past.length > 0 && (
        <section className="space-y-3">
          <p className="font-display text-xl text-ink">Past Trips</p>
          {past.map((t) => (
            <div key={t.id} className="rounded-2xl bg-cream p-4 ring-1 ring-ink/5 opacity-70">
              <p className="font-display text-lg text-ink">{t.title}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
