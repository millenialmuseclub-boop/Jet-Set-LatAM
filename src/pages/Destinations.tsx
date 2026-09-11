import { destinations } from '@/data'
import { Photo } from '@/components/Photo'
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder'
import { Link } from 'react-router-dom'
import type { Destination } from '@/types'

// Country grouping so the index reads as an atlas rather than a flat grid —
// order reflects how much of the world Jet Set LatAm actually covers today.
const COUNTRY_ORDER = ['Mexico', 'Colombia', 'Brazil']

function groupByCountry(dests: Destination[]) {
  const groups = new Map<string, Destination[]>()
  for (const d of dests) {
    const list = groups.get(d.country) ?? []
    list.push(d)
    groups.set(d.country, list)
  }
  const ordered = [...COUNTRY_ORDER, ...[...groups.keys()].filter((c) => !COUNTRY_ORDER.includes(c))]
  return ordered.filter((c) => groups.has(c)).map((c) => ({ country: c, cities: groups.get(c)! }))
}

export function Destinations() {
  const groups = groupByCountry(destinations)

  return (
    <div className="animate-fade-in mx-auto max-w-5xl space-y-10 pt-6 pb-6 md:pt-10">
      <header className="px-5 md:px-8">
        <h1 className="font-display text-3xl text-ink md:text-4xl">Destinations</h1>
        <p className="text-sm text-ink-soft/70">A growing map of Latin America, one real city at a time.</p>
      </header>
      {groups.map(({ country, cities }) => (
        <section key={country} className="space-y-3">
          <div className="px-5 md:px-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">{country}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 px-5 md:grid-cols-4 md:gap-5 md:px-8">
            {cities.map((d) => {
              const clickable = d.status !== 'coming-soon'
              return (
                <Link
                  key={d.id}
                  to={clickable ? `/destinations/${d.slug}` : '#'}
                  aria-disabled={!clickable}
                  className={!clickable ? 'pointer-events-none opacity-50' : ''}
                >
                  {d.status === 'coming-soon' ? (
                    <PhotoPlaceholder seed={d.id} label={d.country} className="h-36 w-full md:h-52" />
                  ) : (
                    <Photo src={d.heroPhoto} seed={d.id} alt={d.city} className="h-36 w-full md:h-52" />
                  )}
                  <div className="mt-2">
                    <p className="font-display text-xl leading-tight text-ink">{d.city}</p>
                    <p className="text-xs uppercase tracking-[0.1em] text-ink-soft/50">
                      {d.status === 'live' && 'Full guide + planner'}
                      {d.status === 'guide' && 'Guide'}
                      {d.status === 'coming-soon' && 'Coming soon'}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
