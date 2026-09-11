import { guides } from '@/data'
import { Photo } from '@/components/Photo'
import { Link } from 'react-router-dom'

export function Journal() {
  const sorted = [...guides].sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))
  return (
    <div className="animate-fade-in mx-auto max-w-5xl space-y-8 px-5 pt-8 pb-6 md:px-8 md:pt-14">
      <header className="max-w-xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">From the Journal</p>
        <h1 className="font-display text-4xl text-ink md:text-5xl">Long-form Jet Set LatAm</h1>
        <p className="mt-2 text-sm text-ink-soft/70">
          The editorial layer of the product — guides, style stories and destination deep-dives. Every canonical
          place mentioned links back into the destination database below.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {sorted.map((g) => (
          <Link key={g.id} to={`/guides/${g.id}`} className="group block">
            <Photo src={g.heroPhoto} seed={g.id} className="h-48 w-full transition-transform duration-500 group-hover:scale-[1.02]" alt={g.title} />
            <p className="mt-3 text-[10px] uppercase tracking-[0.12em] text-terracotta">{g.section}</p>
            <p className="font-display text-xl leading-tight text-ink">{g.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-ink-soft/70">{g.dek}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
