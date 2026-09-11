import { NavLink, Link } from 'react-router-dom'

const LINKS = [
  { to: '/destinations', label: 'Destinations' },
  { to: '/destinations/mexico-city?tab=eat', label: 'Eat' },
  { to: '/destinations/mexico-city?tab=stay', label: 'Stay' },
  { to: '/destinations/mexico-city?tab=experiences', label: 'Things to Do' },
  { to: '/journal', label: 'Journal' },
]

// Desktop/web navigation — hidden below md. The app keeps BottomNav; this is
// the "publication" layer of the same brand, same design tokens.
export function TopNav() {
  return (
    <header className="sticky top-0 z-40 hidden border-b border-ink/10 bg-parchment/90 backdrop-blur-md md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        <Link to="/" className="font-display text-2xl tracking-[0.04em] text-ink">
          JET SET <span className="text-terracotta">LATAM</span>
        </Link>
        <nav className="hidden items-center gap-7 text-[13px] font-medium uppercase tracking-[0.12em] text-ink-soft lg:flex">
          {LINKS.map((l) => (
            <NavLink key={l.label} to={l.to} className="transition-colors hover:text-terracotta">
              {l.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/plan"
          className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.1em] text-cream transition-colors hover:bg-terracotta"
        >
          Plan a Trip
        </Link>
      </div>
    </header>
  )
}
