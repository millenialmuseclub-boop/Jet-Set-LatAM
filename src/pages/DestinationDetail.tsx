import { useParams, Link, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { getDestinationBySlug, getPlacesByDestination, getGuidesByDestination, getItinerary } from '@/data'
import { Photo } from '@/components/Photo'
import { JetSetPickCard } from '@/components/JetSetPickCard'
import { EmptyState } from '@/components/EmptyState'
import { AddToTripControl } from '@/components/AddToTripControl'
import { ShopTheLookCard } from '@/components/ShopTheLookCard'
import { PostcardGallery } from '@/components/PostcardGallery'
import { appFamily } from '@/config/appFamily'
import { cdmxPhotos } from '@/assets/cdmx'
import { rioPhotos } from '@/assets/rio'
import { cartagenaPhotos } from '@/assets/cartagena'
import { tulumPhotos } from '@/assets/tulum'
import { openExternal, openMap } from '@/lib/links'
import { toggleSavedDestination, isSavedDestination, toggleSavedPlace, isSavedPlace } from '@/lib/storage'
import { Bookmark, BookmarkCheck, Map, Globe } from 'lucide-react'
import type { GuideSection, Place } from '@/types'

// Places with a real, verified affiliate surface (see ShopTheLookCard) — a
// tiny allowlist rather than a generic "does this place have an offer"
// check, so the ShopMy cards only ever appear next to the place they were
// actually sourced for.
const SHOP_THE_LOOK_PLACE_IDS = new Set(['pl-copacabana-palace'])

const TABS: { key: GuideSection | 'overview' | 'neighborhoods'; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'shop', label: 'Shop' },
  { key: 'experiences', label: 'Experiences' },
  { key: 'see', label: 'See' },
  { key: 'eat', label: 'Eat' },
  { key: 'drink', label: 'Drink' },
  { key: 'stay', label: 'Stay' },
  { key: 'neighborhoods', label: 'Neighborhoods' },
]

function PlaceActions({ place }: { place: Place }) {
  const [saved, setSaved] = useState(() => isSavedPlace(place.id))

  return (
    <div className="-ml-1 mt-1 flex flex-wrap items-center gap-1">
      {place.mapUrl && (
        <button onClick={() => openMap(place.mapUrl)} className="flex items-center gap-1 rounded-full px-2 py-2 text-[11px] text-ink-soft/60 active:bg-ink/5 active:text-terracotta">
          <Map size={12} /> Map
        </button>
      )}
      {place.website && (
        <button onClick={() => openExternal(place.website)} className="flex items-center gap-1 rounded-full px-2 py-2 text-[11px] text-ink-soft/60 active:bg-ink/5 active:text-terracotta">
          <Globe size={12} /> Website
        </button>
      )}
      <button onClick={() => setSaved(toggleSavedPlace(place.id))} className="flex items-center gap-1 rounded-full px-2 py-2 text-[11px] text-ink-soft/60 active:bg-ink/5 active:text-terracotta">
        {saved ? <BookmarkCheck size={12} /> : <Bookmark size={12} />} {saved ? 'Saved' : 'Save'}
      </button>
      <AddToTripControl place={place} />
    </div>
  )
}

export function DestinationDetail() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const destination = slug ? getDestinationBySlug(slug) : undefined
  const initialTab = (params.get('tab') as typeof TABS[number]['key']) || 'overview'
  const [tab, setTab] = useState<typeof TABS[number]['key']>(TABS.some(t => t.key === initialTab) ? initialTab : 'overview')
  const [saved, setSaved] = useState(() => (destination ? isSavedDestination(destination.id) : false))

  if (!destination) return <EmptyState title="Destination not found" />

  const places = getPlacesByDestination(destination.id)
  const guides = getGuidesByDestination(destination.id)
  const picks = places.filter((p) => p.isJetSetPick)
  const readyMade = destination.itineraryIds.map(getItinerary).filter(Boolean)

  const placesForTab = (section: string) => {
    const catMap: Record<string, string[]> = {
      shop: ['shop'],
      experiences: ['experience', 'park'],
      see: ['landmark', 'museum'],
      eat: ['restaurant'],
      drink: ['cafe', 'bar'],
      stay: ['hotel'],
    }
    const cats = catMap[section] ?? []
    return places.filter((p) => cats.includes(p.category))
  }

  return (
    <div className="animate-fade-in pb-6">
      <div className="relative">
        <Photo src={destination.heroPhoto} seed={destination.id} alt={destination.city} priority className="h-72 w-full md:h-[26rem]" rounded="rounded-none" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 pt-16 md:p-14 md:pt-32">
          <div className="mx-auto max-w-5xl">
            <h1 className="font-display text-5xl text-cream md:text-7xl">{destination.city}</h1>
            <p className="text-sm text-cream/80">{destination.country}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-gold-light">Design · Food · Art · Nightlife</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setSaved(toggleSavedDestination(destination.id))}
                className="flex items-center gap-1.5 rounded-full border border-cream/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-cream"
              >
                {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />} {saved ? 'Saved' : 'Save City'}
              </button>
              <Link to="/plan" className="rounded-full bg-terracotta px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-cream">
                Plan a Trip
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-10 flex gap-1 overflow-x-auto bg-parchment/95 px-5 py-3 backdrop-blur-sm md:justify-center md:px-8">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
              tab === t.key ? 'bg-terracotta text-cream' : 'bg-cream text-ink-soft'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-5xl space-y-6 px-5 pt-2 md:px-8">
        {tab === 'overview' && (
          <div className="space-y-6 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
            <div className="space-y-5 md:col-span-2">
              <p className="text-[15px] leading-relaxed text-ink-soft">{destination.content.overview}</p>
              {readyMade.length > 0 && readyMade[0] && (
                <Link to="/plan" className="block rounded-2xl bg-terracotta p-4 text-cream">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-cream/80">Ready-Made Trip</p>
                  <p className="font-display text-xl">{readyMade[0]!.title}</p>
                </Link>
              )}
              {guides.length > 0 && (
                <div className="space-y-2">
                  <p className="font-display text-xl text-ink">Guides</p>
                  {guides.map((g) => (
                    <Link key={g.id} to={`/guides/${g.id}`} className="flex gap-3 rounded-xl bg-cream p-3 ring-1 ring-ink/5">
                      <Photo src={g.heroPhoto} seed={g.id} alt={g.title} className="h-14 w-14 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-display text-lg text-ink">{g.title}</p>
                        <p className="line-clamp-1 text-xs text-ink-soft/70">{g.dek}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-5">
              <div className="rounded-2xl bg-jungle-dark p-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-gold-light">Know Before You Go</p>
                <dl className="mt-3 space-y-2.5 text-sm text-cream/90">
                  <div>
                    <dt className="text-cream/50">Why go</dt>
                    <dd>{destination.content.whyGo}</dd>
                  </div>
                  <div>
                    <dt className="text-cream/50">Neighborhoods</dt>
                    <dd>{destination.neighborhoods.map((n) => n.name).join(', ')}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {tab === 'overview' && picks.length > 0 && (
          <div className="space-y-3">
            <p className="font-display text-xl text-ink">The Jet Set List</p>
            <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 md:mx-0 md:px-0">
              {picks.map((p) => <JetSetPickCard key={p.id} place={p} />)}
            </div>
          </div>
        )}

        {tab === 'overview' && destination.id === 'mexico-city' && (
          <PostcardGallery
            title="Postcards From Mexico City"
            images={[
              { src: cdmxPhotos.zocalo, seed: 'pc-zocalo', alt: 'The Zócalo at dusk', caption: 'The Zócalo — Mexico City\'s grand central square, best arriving at sunset or after dark.' },
              { src: cdmxPhotos.angelIndependencia, seed: 'pc-angel', alt: 'Ángel de la Independencia' },
              { src: cdmxPhotos.plazaGaribaldi, seed: 'pc-garibaldi', alt: 'Plaza Garibaldi mariachi' },
              { src: cdmxPhotos.granHotelDome, seed: 'pc-hotel-dome', alt: 'Gran Hotel Ciudad de México stained-glass dome', caption: 'Gran Hotel Ciudad de México\'s Tiffany-style stained-glass ceiling — one of the most photographed lobbies in Latin America.' },
              { src: cdmxPhotos.granHotelAtrium, seed: 'pc-hotel-atrium', alt: 'Gran Hotel Ciudad de México atrium' },
              { src: cdmxPhotos.unamLibrary, seed: 'pc-unam', alt: 'Biblioteca Central, UNAM' },
              { src: cdmxPhotos.folkArtAlebrije, seed: 'pc-alebrije', alt: 'Folk art alebrije' },
            ]}
          />
        )}

        {tab === 'overview' && destination.id === 'rio-de-janeiro' && (
          <PostcardGallery
            title="Postcards From Rio de Janeiro"
            images={[
              { src: rioPhotos.sugarloafPanorama, seed: 'pc-rio-sugarloaf', alt: 'Sugarloaf Mountain panorama', caption: 'Pão de Açúcar at golden hour — the classic Rio panorama, cable car included.' },
              { src: rioPhotos.christRedeemerSunset, seed: 'pc-rio-christ-sunset', alt: 'Christ the Redeemer at sunset' },
              { src: rioPhotos.kobraMural, seed: 'pc-rio-kobra', alt: 'Kobra street mural' },
              { src: rioPhotos.christRedeemer, seed: 'pc-rio-christ', alt: 'Christ the Redeemer', caption: 'Cristo Redentor watches over the city from Corcovado — go early to beat both the crowds and the clouds.' },
              { src: rioPhotos.santaTeresaTram, seed: 'pc-rio-tram', alt: 'Santa Teresa tram' },
            ]}
          />
        )}

        {tab === 'overview' && destination.id === 'cartagena' && (
          <PostcardGallery
            title="Postcards From Cartagena"
            images={[
              { src: cartagenaPhotos.cartagenaSkyline, seed: 'pc-cart-skyline', alt: 'Cartagena skyline from Muelle de la Bodeguita', caption: 'The modern skyline from Muelle de la Bodeguita — Cartagena in one frame, old and new.' },
              { src: cartagenaPhotos.walledCityStreet, seed: 'pc-cart-street', alt: 'Walled City street' },
              { src: cartagenaPhotos.palenquerasStreet, seed: 'pc-cart-palenqueras', alt: 'Palenqueras street scene' },
              { src: cartagenaPhotos.walledCityCourtyard, seed: 'pc-cart-courtyard', alt: 'Walled City courtyard outside Museo Histórico', caption: 'A quiet courtyard outside Museo Histórico, in the Walled City\'s oldest streets.' },
              { src: cartagenaPhotos.murallasSunset, seed: 'pc-cart-murallas', alt: 'Las Murallas at sunset' },
            ]}
          />
        )}

        {tab === 'overview' && destination.id === 'tulum' && (
          <PostcardGallery
            title="Postcards From Tulum"
            images={[
              { src: tulumPhotos.tulumRuinsCliff, seed: 'pc-tulum-cliff', alt: 'Tulum ruins atop the cliff over the sea', caption: 'The Tulum ruins, cliffside over the Caribbean — the only Maya site built to face the sunrise over open water.' },
              { src: tulumPhotos.tulumBoardwalkBeach, seed: 'pc-tulum-boardwalk', alt: 'Wooden boardwalk to a turquoise beach' },
              { src: tulumPhotos.tulumRuinsPalm, seed: 'pc-tulum-palm', alt: 'Tulum ruins framed by a palm' },
            ]}
          />
        )}

        {tab === 'neighborhoods' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {destination.neighborhoods.map((n) => (
              <div key={n.id} className="overflow-hidden rounded-2xl bg-cream ring-1 ring-ink/5">
                <Photo src={n.heroPhoto} seed={n.id} alt={n.name} className="h-36 w-full" rounded="rounded-none" />
                <div className="p-4">
                  <p className="font-display text-xl text-ink">{n.name}</p>
                  <p className="mt-1 text-sm text-ink-soft/80">{n.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {['shop', 'experiences', 'see', 'eat', 'drink', 'stay'].includes(tab) && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {placesForTab(tab).length === 0 ? (
              <div className="md:col-span-2">
                <EmptyState
                  title="Coming soon"
                  body={`We haven't published verified Jet Set LatAm content for this section of ${destination.city} yet — we'd rather leave it empty than guess.`}
                />
              </div>
            ) : (
              placesForTab(tab).map((p) => (
                <div key={p.id} className="flex gap-3 rounded-2xl bg-cream p-3 ring-1 ring-ink/5">
                  <Photo src={p.photos[0]} seed={p.id} alt={p.name} className="h-20 w-20 shrink-0" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-display text-lg leading-tight text-ink">{p.name}</p>
                      {p.isJetSetPick && <span className="rounded-full bg-terracotta/10 px-2 py-0.5 text-[9px] uppercase tracking-wide text-terracotta">Pick</span>}
                    </div>
                    {p.neighborhood && <p className="text-[11px] uppercase tracking-[0.08em] text-terracotta/80">{p.neighborhood}</p>}
                    <p className="mt-0.5 line-clamp-2 text-xs text-ink-soft/70">{p.description}</p>
                    <PlaceActions place={p} />
                    {SHOP_THE_LOOK_PLACE_IDS.has(p.id) && (
                      <div className="mt-3">
                        <ShopTheLookCard placeName={p.name} />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'overview' && destination.railiiConnection && (
          <div className="rounded-2xl bg-gradient-to-br from-gold/15 via-cream to-cream p-4 ring-1 ring-gold/20">
            <div className="flex items-center gap-2">
              <appFamily.rallii.icon size={16} className="text-gold" />
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">Rallii</p>
            </div>
            <p className="mt-1.5 font-display text-lg leading-tight text-ink">Take the Scenic Route</p>
            <p className="mt-0.5 text-xs leading-relaxed text-ink-soft/65">{destination.railiiConnection.description} Rallii is building routes like this one.</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-gold/80">Coming soon</p>
          </div>
        )}
      </div>
    </div>
  )
}
