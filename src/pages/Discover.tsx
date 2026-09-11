import { Photo } from '@/components/Photo'
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder'
import { JetSetPickCard } from '@/components/JetSetPickCard'
import { PostcardGallery } from '@/components/PostcardGallery'
import { flagshipDestination, guides, getJetSetPicks, destinations, getPlacesByDestination, getDestinationForPlace } from '@/data'
import { cdmxPhotos } from '@/assets/cdmx'
import { appFamilyList } from '@/config/appFamily'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

// Interleave any number of lists so a horizontal scroll doesn't read as
// "one city, then another" — it should feel like one curated, varied feed.
function interleave<T>(lists: T[][]): T[] {
  const out: T[] = []
  const max = Math.max(0, ...lists.map((l) => l.length))
  for (let i = 0; i < max; i++) {
    for (const l of lists) if (l[i]) out.push(l[i])
  }
  return out
}

export function Discover() {
  const picks = interleave([
    getJetSetPicks('mexico-city'),
    getJetSetPicks('rio-de-janeiro'),
    getJetSetPicks('cartagena'),
    getJetSetPicks('guadalajara'),
  ]).slice(0, 10)
  const sortedGuides = [...guides].sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))
  const [featureGuide, ...restGuides] = sortedGuides
  const smallGuides = restGuides.slice(0, 2)
  const journalPreview = interleave([
    guides.filter((g) => g.destinationId === 'mexico-city'),
    guides.filter((g) => g.destinationId === 'rio-de-janeiro'),
    guides.filter((g) => g.destinationId === 'cartagena'),
    guides.filter((g) => g.destinationId === 'guadalajara'),
  ]).slice(0, 3)
  const comingSoon = destinations.filter((d) => d.status === 'coming-soon')
  const builtDestinations = destinations.filter((d) => d.status === 'live')
  const guideTierDestinations = destinations.filter((d) => d.status === 'guide')
  // A full-width visual break highlighting the destinations beyond the
  // flagship — deliberately excludes Mexico City so the hero above doesn't
  // repeat itself here.
  const destinationMoments = destinations.filter((d) => d.status !== 'coming-soon' && d.id !== flagshipDestination.id)
  const eatAndDrink = interleave([
    getPlacesByDestination('mexico-city').filter((p) => p.category === 'cafe'),
    getPlacesByDestination('rio-de-janeiro').filter((p) => ['restaurant', 'cafe'].includes(p.category)),
    getPlacesByDestination('cartagena').filter((p) => ['restaurant', 'cafe'].includes(p.category)),
  ]).slice(0, 6)
  // ART + DESIGN — museum/landmark places with real category variety across
  // every built destination, not CDMX-only.
  const artAndDesign = interleave([
    getPlacesByDestination('mexico-city').filter((p) => ['museum', 'landmark'].includes(p.category) && p.isJetSetPick),
    getPlacesByDestination('rio-de-janeiro').filter((p) => ['museum', 'landmark'].includes(p.category) && p.isJetSetPick),
    getPlacesByDestination('cartagena').filter((p) => ['museum', 'landmark'].includes(p.category) && p.isJetSetPick),
    getPlacesByDestination('guadalajara').filter((p) => ['museum', 'landmark'].includes(p.category) && p.isJetSetPick),
    getPlacesByDestination('tulum').filter((p) => ['museum', 'landmark'].includes(p.category) && p.isJetSetPick),
  ]).slice(0, 6)
  // WEEKEND SOMEWHERE — the GUIDE-tier destinations, framed as a shorter,
  // less-planned trip rather than hidden as second-class.
  const weekendSomewhere = destinations.filter((d) => d.status === 'guide')

  return (
    <div className="space-y-14 pb-6 md:space-y-24">
      {/* ---------------------------------------------------------------- */}
      {/* HERO */}
      {/* ---------------------------------------------------------------- */}
      <motion.section initial="hidden" animate="show" variants={fadeUp} className="relative">
        <Link to={`/destinations/${flagshipDestination.slug}`} className="block px-5 pt-2 md:px-0 md:pt-0">
          <div className="relative overflow-hidden rounded-3xl md:rounded-none">
            <Photo
              src={flagshipDestination.heroPhoto}
              seed={flagshipDestination.id}
              alt={flagshipDestination.city}
              priority
              className="h-[26rem] w-full md:h-[34rem]"
              rounded="rounded-3xl md:rounded-none"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent p-5 pt-24 md:p-14 md:pt-40">
              <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-light md:text-base">
                Jet Set LatAm
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-cream/70 md:text-xs">Currently Jetting</p>
              <h1 className="font-display text-5xl leading-[0.95] text-cream md:text-8xl">{flagshipDestination.city}</h1>
              <p className="mt-2 max-w-md text-sm text-cream/85 md:text-base">{flagshipDestination.tagline}</p>
              <div className="mt-5 flex gap-3">
                <span className="rounded-full bg-cream px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-ink">
                  Explore Guide
                </span>
                <Link
                  to="/plan"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-full border border-cream/50 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-cream"
                >
                  Plan This Trip
                </Link>
              </div>
            </div>
          </div>
        </Link>
      </motion.section>

      {/* ---------------------------------------------------------------- */}
      {/* THE EDIT — mixed editorial composition */}
      {/* ---------------------------------------------------------------- */}
      {featureGuide && (
        <section className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="mb-5 font-display text-3xl text-ink md:text-4xl">The Edit</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Link to={`/guides/${featureGuide.id}`} className="group relative block overflow-hidden rounded-2xl md:col-span-2 md:row-span-2">
              <Photo src={featureGuide.heroPhoto} seed={featureGuide.id} alt={featureGuide.title} className="h-72 w-full transition-transform duration-700 group-hover:scale-105 md:h-full" rounded="rounded-2xl" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gold-light">{featureGuide.section}</p>
                <p className="font-display text-2xl leading-tight text-cream md:text-3xl">{featureGuide.title}</p>
              </div>
            </Link>
            {smallGuides.map((g) => (
              <Link key={g.id} to={`/guides/${g.id}`} className="group flex gap-3 rounded-2xl bg-cream p-2 ring-1 ring-ink/5 md:block md:p-0 md:ring-0">
                <Photo src={g.heroPhoto} seed={g.id} alt={g.title} className="h-20 w-20 shrink-0 md:h-40 md:w-full" />
                <div className="min-w-0 py-1 md:mt-3 md:py-0">
                  <p className="truncate text-[10px] uppercase tracking-[0.12em] text-terracotta">{g.section}</p>
                  <p className="font-display text-lg leading-tight text-ink line-clamp-2">{g.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* CURRENTLY JETTING — destination reel */}
      {/* ---------------------------------------------------------------- */}
      <section>
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="mb-1 font-display text-3xl text-ink md:text-4xl">Currently Jetting</p>
          <p className="mb-5 text-sm text-ink-soft/60">A real network of cities now — more landing every pass.</p>
        </div>
        <div className="flex gap-4 overflow-x-auto px-5 pb-1 md:mx-auto md:max-w-6xl md:px-8">
          {builtDestinations.map((d) => (
            <Link key={d.id} to={`/destinations/${d.slug}`} className="min-w-[220px] max-w-[220px] shrink-0 md:min-w-0 md:max-w-none md:flex-1">
              <Photo src={d.heroPhoto} seed={d.id} alt={d.city} className="h-64 w-full" />
              <p className="mt-2 font-display text-xl text-ink">{d.city}</p>
              <p className="text-[11px] uppercase tracking-[0.1em] text-terracotta">{d.country}</p>
            </Link>
          ))}
          {guideTierDestinations.map((d) => (
            <Link key={d.id} to={`/destinations/${d.slug}`} className="min-w-[180px] max-w-[180px] shrink-0 md:min-w-0 md:max-w-none md:flex-1">
              <Photo src={d.heroPhoto} seed={d.id} alt={d.city} className="h-64 w-full" />
              <p className="mt-2 font-display text-lg text-ink">{d.city}</p>
              <p className="text-[11px] uppercase tracking-[0.1em] text-ink-soft/50">Guide</p>
            </Link>
          ))}
          {comingSoon.map((d) => (
            <div key={d.id} className="min-w-[160px] max-w-[160px] shrink-0 opacity-70 md:min-w-0 md:max-w-none md:flex-1">
              <PhotoPlaceholder seed={d.id} label={d.country} className="h-64 w-full" />
              <p className="mt-2 font-display text-lg text-ink">{d.city}</p>
              <p className="text-[11px] uppercase tracking-[0.1em] text-ink-soft/50">Coming soon</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* DESTINATION MOMENTS — full-width editorial break */}
      {/* ---------------------------------------------------------------- */}
      {destinationMoments.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {destinationMoments.slice(0, 3).map((d) => (
              <Link key={d.id} to={`/destinations/${d.slug}`} className="group relative block overflow-hidden rounded-2xl">
                <Photo src={d.heroPhoto} seed={d.id} alt={d.city} className="h-56 w-full transition-transform duration-700 group-hover:scale-105" rounded="rounded-2xl" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-gold-light">{d.country}</p>
                  <p className="font-display text-xl leading-tight text-cream">{d.city}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* JET SET PICKS */}
      {/* ---------------------------------------------------------------- */}
      {picks.length > 0 && (
        <section>
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <p className="font-display text-3xl text-ink md:text-4xl">Jet Set Picks</p>
            <p className="mb-5 text-sm text-ink-soft/60">We already narrowed it down for you.</p>
          </div>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1 md:mx-auto md:max-w-6xl md:px-8">
            {picks.map((p) => <JetSetPickCard key={p.id} place={p} />)}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* EAT + DRINK — food-led editorial block, only verified places */}
      {/* ---------------------------------------------------------------- */}
      {eatAndDrink.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="mb-1 font-display text-3xl text-ink md:text-4xl">Eat + Drink</p>
          <p className="mb-5 text-sm text-ink-soft/60">Coffee, kitchens, and a place to sit for a while — across the cities we've covered.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {eatAndDrink.map((p) => (
              <div key={p.id} className="overflow-hidden rounded-2xl bg-cream ring-1 ring-ink/5">
                <Photo src={p.photos[0]} seed={p.id} alt={p.name} className="h-44 w-full" rounded="rounded-none" />
                <div className="p-4">
                  <p className="font-display text-xl leading-tight text-ink">{p.name}</p>
                  {p.neighborhood && <p className="mt-0.5 text-[11px] uppercase tracking-[0.1em] text-terracotta">{p.neighborhood}, {p.city}</p>}
                  <p className="mt-1.5 line-clamp-2 text-sm text-ink-soft/75">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* ART + DESIGN — museums, murals and landmarks, mixed across cities */}
      {/* ---------------------------------------------------------------- */}
      {artAndDesign.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="mb-1 font-display text-3xl text-ink md:text-4xl">Art + Design</p>
          <p className="mb-5 text-sm text-ink-soft/60">Murals, museums and monuments worth planning a morning around.</p>
          <div className="flex snap-x gap-4 overflow-x-auto pb-1">
            {artAndDesign.map((p) => (
              <Link key={p.id} to={`/destinations/${getDestinationForPlace(p)?.slug ?? ''}`} className="group relative block w-56 shrink-0 snap-start overflow-hidden rounded-2xl">
                <Photo src={p.photos[0]} seed={p.id} alt={p.name} className="h-64 w-full transition-transform duration-700 group-hover:scale-105" rounded="rounded-2xl" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-3.5">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-gold-light">{p.city}</p>
                  <p className="font-display text-lg leading-tight text-cream">{p.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* POSTCARDS FROM MEXICO CITY — the richest verified photo set */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-5 flex items-baseline justify-between">
          <div>
            <p className="font-display text-3xl text-ink md:text-4xl">Postcards From Mexico City</p>
            <p className="text-sm text-ink-soft/60">A photo essay from the flagship — the deepest real photo set we have.</p>
          </div>
          <Link to="/destinations/mexico-city" className="shrink-0 text-xs uppercase tracking-[0.1em] text-terracotta">Full gallery</Link>
        </div>
        <PostcardGallery
          images={[
            { src: cdmxPhotos.zocalo, seed: 'disc-zocalo', alt: 'The Zócalo', caption: 'The Zócalo — Mexico City\'s grand central square, best arriving at sunset or after dark.' },
            { src: cdmxPhotos.angelIndependencia, seed: 'disc-angel', alt: 'Ángel de la Independencia' },
            { src: cdmxPhotos.granHotelDome, seed: 'disc-hotel', alt: 'Gran Hotel Ciudad de México dome' },
          ]}
        />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* WEEKEND SOMEWHERE — GUIDE-tier destinations, framed intentionally */}
      {/* ---------------------------------------------------------------- */}
      {weekendSomewhere.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="mb-1 font-display text-3xl text-ink md:text-4xl">Weekend Somewhere</p>
          <p className="mb-5 text-sm text-ink-soft/60">Shorter, less-planned trips — real content, honestly not our deepest planner support yet.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {weekendSomewhere.map((d) => (
              <Link key={d.id} to={`/destinations/${d.slug}`} className="group relative flex overflow-hidden rounded-2xl bg-cream ring-1 ring-ink/5">
                <Photo src={d.heroPhoto} seed={d.id} alt={d.city} className="h-32 w-32 shrink-0 md:h-40 md:w-40" rounded="rounded-none" />
                <div className="min-w-0 p-4">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-terracotta">{d.country}</p>
                  <p className="font-display text-xl leading-tight text-ink">{d.city}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-ink-soft/65">{d.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* BUILD YOUR TRIP */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="overflow-hidden rounded-3xl bg-ink px-6 py-10 text-center md:px-20 md:py-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-light">Going somewhere?</p>
          <p className="mx-auto mt-3 max-w-lg font-display text-3xl leading-tight text-cream md:text-4xl">
            Tell us what kind of trip you're planning and Jet Set will build a starting itinerary from our curated city guides.
          </p>
          <Link
            to="/plan"
            className="mt-6 inline-block rounded-full bg-terracotta px-8 py-3 text-sm font-medium uppercase tracking-[0.1em] text-cream transition-transform hover:scale-[1.03]"
          >
            Plan My Trip
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FROM THE JOURNAL */}
      {/* ---------------------------------------------------------------- */}
      {journalPreview.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-4 md:px-8">
          <div className="mb-5 flex items-baseline justify-between">
            <p className="font-display text-3xl text-ink md:text-4xl">From the Journal</p>
            <Link to="/journal" className="text-xs uppercase tracking-[0.1em] text-terracotta">View all</Link>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
            {journalPreview.map((g) => (
              <Link key={g.id} to={`/guides/${g.id}`} className="flex gap-3 rounded-2xl bg-cream p-2 ring-1 ring-ink/5 md:block md:p-0 md:ring-0">
                <Photo src={g.heroPhoto} seed={g.id} alt={g.title} className="h-20 w-20 shrink-0 md:h-40 md:w-full" />
                <div className="min-w-0 py-1 md:mt-3 md:py-0">
                  <p className="truncate text-[10px] uppercase tracking-[0.12em] text-terracotta">{g.section}</p>
                  <p className="font-display text-lg leading-tight text-ink line-clamp-2">{g.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* OUR WORLD — small, restrained mention of the wider app family */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-5 pb-2 md:px-8">
        <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-ink-soft/40">Our World</p>
        <p className="mb-4 max-w-md text-xs text-ink-soft/50">Jet Set LatAm is the first of a small family of travel apps. The rest are on the way.</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {appFamilyList.map((app) => (
            <div key={app.id} className="rounded-xl bg-cream/60 p-3 ring-1 ring-ink/5">
              <app.icon size={15} className="text-ink-soft/50" />
              <p className="mt-1.5 text-xs font-medium text-ink-soft/80">{app.name}</p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-ink-soft/35">{app.status === 'live' ? 'Available' : 'Coming soon'}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
