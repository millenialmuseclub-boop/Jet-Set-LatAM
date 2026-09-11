import { useParams, Link } from 'react-router-dom'
import { getGuide, getPlacesByIds, guides } from '@/data'
import { Photo } from '@/components/Photo'
import { JetSetPickCard } from '@/components/JetSetPickCard'
import { EmptyState } from '@/components/EmptyState'
import { ExternalLink, Bookmark } from 'lucide-react'
import { useState } from 'react'
import { isSavedPlace, toggleSavedPlace } from '@/lib/storage'
import { openExternal } from '@/lib/links'

export function GuideDetail() {
  const { id } = useParams()
  const guide = id ? getGuide(id) : undefined
  if (!guide) return <EmptyState title="Guide not found" />
  const places = getPlacesByIds(guide.placeIds)
  const pickPlaces = places.filter((p) => p.isJetSetPick)
  const otherPlaces = places.filter((p) => !p.isJetSetPick)
  const issueNo = String(guides.findIndex((g) => g.id === guide.id) + 1).padStart(2, '0')
  const nextGuide = guides[(guides.findIndex((g) => g.id === guide.id) + 1) % guides.length]
  const pairPhotos = pickPlaces.slice(0, 2).filter((p) => p.photos[0])

  return (
    <div className="animate-fade-in pb-10">
      <div className="relative">
        <Photo src={guide.heroPhoto} seed={guide.id} alt={guide.title} priority className="h-80 w-full md:h-[32rem]" rounded="rounded-none" />
        <p className="absolute left-5 top-5 rounded-full bg-ink/50 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cream backdrop-blur-sm md:left-8 md:top-8">
          Field Notes No. {issueNo}
        </p>
      </div>
      <div className="mx-auto max-w-2xl space-y-6 px-5 pt-6 md:px-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-terracotta">{guide.section}</p>
          <h1 className="font-display text-4xl leading-[1.05] text-ink md:text-5xl">{guide.title}</h1>
          <p className="mt-3 border-l-2 border-gold pl-4 font-display text-xl italic leading-snug text-ink-soft/80">{guide.dek}</p>
          {guide.publishedAt && (
            <p className="mt-2 text-xs uppercase tracking-[0.1em] text-ink-soft/40">
              Jet Set LatAm · {new Date(guide.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
        </div>

        <p className="text-[17px] leading-[1.7] text-ink-soft">{guide.body}</p>

        {pairPhotos.length === 2 && (
          <div className="-mx-5 grid grid-cols-2 gap-2 md:mx-0">
            {pairPhotos.map((p) => (
              <Photo key={p.id} src={p.photos[0]} seed={p.id} alt={p.name} className="h-56 w-full" rounded="rounded-none" />
            ))}
          </div>
        )}

        {pickPlaces.length > 0 && (
          <div className="space-y-3 pt-2">
            <p className="font-display text-2xl text-ink">Jet Set Picks in this story</p>
            <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 md:mx-0 md:px-0">
              {pickPlaces.map((p) => <JetSetPickCard key={p.id} place={p} />)}
            </div>
          </div>
        )}

        {otherPlaces.length > 0 && (
          <div className="space-y-2 pt-2">
            <p className="font-display text-xl text-ink">Also mentioned</p>
            {otherPlaces.map((p) => <MentionedPlaceRow key={p.id} placeId={p.id} name={p.name} address={p.address} />)}
          </div>
        )}

        <p className="border-t border-ink/10 pt-4 text-xs leading-relaxed text-ink-soft/50">
          Jet Set LatAm may earn a commission on bookings made through partner links at no extra cost to you. Editorial
          recommendations are never influenced by affiliate relationships.
        </p>

        <button
          onClick={() => openExternal(guide.sourceUrl)}
          className="flex items-center gap-1.5 text-xs text-ink-soft/50"
        >
          Original story on jetsetlatam.com <ExternalLink size={12} />
        </button>
        <Link to={`/destinations/${guide.destinationId}`} className="block text-sm text-terracotta">
          ← Back to destination
        </Link>

        {nextGuide && nextGuide.id !== guide.id && (
          <Link to={`/guides/${nextGuide.id}`} className="group block overflow-hidden rounded-2xl border-t border-ink/10 pt-6">
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-soft/40">Next Story</p>
            <div className="mt-2 flex items-center gap-3">
              <Photo src={nextGuide.heroPhoto} seed={nextGuide.id} alt={nextGuide.title} className="h-16 w-16 shrink-0" />
              <p className="font-display text-xl leading-tight text-ink transition-colors group-hover:text-terracotta">{nextGuide.title}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

function MentionedPlaceRow({ placeId, name, address }: { placeId: string; name: string; address?: string }) {
  const [saved, setSaved] = useState(() => isSavedPlace(placeId))
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-cream p-3 ring-1 ring-ink/5">
      <div className="min-w-0">
        <p className="font-display text-base leading-tight text-ink">{name}</p>
        {address && <p className="truncate text-xs text-ink-soft/60">{address}</p>}
      </div>
      <button
        onClick={() => setSaved(toggleSavedPlace(placeId))}
        className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] ${
          saved ? 'bg-terracotta text-cream' : 'bg-parchment text-ink-soft ring-1 ring-ink/10'
        }`}
      >
        <Bookmark size={11} /> {saved ? 'Added' : 'Add to My Trip'}
      </button>
    </div>
  )
}
