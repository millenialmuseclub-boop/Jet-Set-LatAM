import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { appFamilyList } from '@/config/appFamily'
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure'

// A short, editorial About/Credits screen — not a founder biography, not a
// settings page. Reachable from a restrained link in Discover's "Our World"
// footer and the desktop TopNav. This is one of the 2-3 tasteful places the
// "© 2026 @jordypop" creator credit actually appears in the product (see
// also Discover's Our World footer and Destinations' page footer).
export function About() {
  return (
    <div className="animate-fade-in mx-auto max-w-xl space-y-8 px-5 pt-6 pb-10 md:px-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-ink-soft/60">
        <ArrowLeft size={14} /> Back
      </Link>

      <div className="space-y-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">About</p>
        <h1 className="font-display text-4xl leading-tight text-ink">Jet Set LatAm</h1>
        <p className="text-[15px] leading-relaxed text-ink-soft/80">
          A photographic travel guide and trip-planning companion built from places we've
          actually explored. Every Place, Guide and photo in this app is real — traced back
          to a real trip, a real article, or a real photograph. No AI-generated content,
          no stock photography, no filler.
        </p>
        <p className="text-[15px] leading-relaxed text-ink-soft/80">
          Created by <span className="font-medium text-ink">@jordypop</span>.
        </p>
        <p className="text-sm text-ink-soft/50">© 2026 @jordypop</p>
      </div>

      <div className="border-t border-ink/10 pt-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft/40">Affiliate Disclosure</p>
        <AffiliateDisclosure className="mt-2 text-xs" />
      </div>

      <div className="border-t border-ink/10 pt-6">
        <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-ink-soft/40">Our World</p>
        <p className="mb-4 text-xs text-ink-soft/50">Jet Set LatAm is the first of a small family of travel apps.</p>
        <div className="space-y-2.5">
          {appFamilyList.map((app) => (
            <div key={app.id} className="flex items-center gap-3 rounded-xl bg-cream/60 p-3 ring-1 ring-ink/5">
              <app.icon size={16} className="shrink-0 text-ink-soft/50" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink-soft/85">{app.name}</p>
                <p className="text-[11px] text-ink-soft/45">{app.oneLiner}</p>
              </div>
              <span className="ml-auto shrink-0 text-[10px] uppercase tracking-[0.1em] text-ink-soft/35">
                {app.status === 'live' ? 'Available' : 'Coming soon'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="pt-4 text-center text-[11px] italic text-ink-soft/40">A @jordypop project</p>
    </div>
  )
}
