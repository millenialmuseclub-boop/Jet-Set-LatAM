import type { Place } from '@/types'
import { Photo } from './Photo'
import { AddToTripControl } from './AddToTripControl'
import { Bookmark, BookmarkCheck, ArrowRight, Map, Globe } from 'lucide-react'
import { useState } from 'react'
import { isSavedPlace, toggleSavedPlace } from '@/lib/storage'
import { openExternal, openMap } from '@/lib/links'
import { getPlace, getGuide } from '@/data'
import { Link } from 'react-router-dom'

export function JetSetPickCard({ place }: { place: Place }) {
  const [saved, setSaved] = useState(() => isSavedPlace(place.id))
  const pairWith = place.pairWithPlaceId ? getPlace(place.pairWithPlaceId) : undefined
  const guideId = place.relatedGuideIds?.[0]
  const guide = guideId ? getGuide(guideId) : undefined
  return (
    <article className="min-w-[260px] max-w-[260px] snap-start rounded-2xl bg-cream shadow-sm ring-1 ring-ink/5">
      <div className="relative">
        <Photo src={place.photos[0]} alt={place.name} seed={place.id} className="h-40 w-full" rounded="rounded-t-2xl" />
        <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-cream backdrop-blur-sm">
          Jet Set Pick
        </span>
        <button
          onClick={(e) => {
            e.preventDefault()
            setSaved(toggleSavedPlace(place.id))
          }}
          aria-label={saved ? 'Remove from saved' : 'Save place'}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/50 text-cream backdrop-blur-sm active:scale-90 transition-transform"
        >
          {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg leading-tight text-ink">{place.name}</h3>
          {place.priceLevel && <span className="text-xs text-gold-light font-medium bg-jungle-dark/90 rounded-full px-2 py-0.5 text-cream">{place.priceLevel}</span>}
        </div>
        {place.neighborhood && (
          <p className="mt-0.5 text-xs uppercase tracking-[0.1em] text-terracotta">{place.neighborhood}</p>
        )}
        {place.pickDetails && (
          <div className="mt-3 space-y-1.5 text-sm text-ink-soft">
            <p><span className="font-medium uppercase tracking-[0.06em] text-[11px] text-terracotta/80">Go for</span><br />{place.pickDetails.goFor}</p>
            {pairWith && (
              <p><span className="font-medium uppercase tracking-[0.06em] text-[11px] text-terracotta/80">Pair it with</span><br />{pairWith.name}</p>
            )}
            {place.pickDetails.skipIf && (
              <p><span className="font-medium uppercase tracking-[0.06em] text-[11px] text-terracotta/80">Skip if</span><br />{place.pickDetails.skipIf}</p>
            )}
          </div>
        )}
        <div className="mt-3 flex items-center justify-between gap-2">
          {guide ? (
            <Link to={`/guides/${guide.id}`} className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.08em] text-ink">
              View <ArrowRight size={12} />
            </Link>
          ) : <span />}
          <div className="-mr-1.5 flex items-center gap-0.5">
            {place.mapUrl && (
              <button onClick={() => openMap(place.mapUrl)} className="flex items-center gap-1 rounded-full px-2 py-2 text-[11px] text-ink-soft/50 active:bg-ink/5 active:text-terracotta">
                <Map size={12} /> Map
              </button>
            )}
            {place.website && (
              <button onClick={() => openExternal(place.website)} className="flex items-center gap-1 rounded-full px-2 py-2 text-[11px] text-ink-soft/50 active:bg-ink/5 active:text-terracotta">
                <Globe size={12} /> Site
              </button>
            )}
          </div>
        </div>
        <div className="mt-2">
          <AddToTripControl place={place} />
        </div>
      </div>
    </article>
  )
}
