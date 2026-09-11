// Real photography hasn't been migrated from jetsetlatam.com yet (assets are
// hosted on WordPress.com and weren't pulled in this pass). Rather than
// invent stock imagery, every "photo" slot renders this intentional,
// on-brand placeholder until real photography is wired in — see NEXT in the
// kickoff report. Swap for <img src={place.photos[0]} /> once photos exist.
const GRADIENTS = [
  'from-terracotta/70 via-terracotta-dark/60 to-jungle/70',
  'from-jungle/70 via-jungle-dark/60 to-ink/50',
  'from-gold/60 via-terracotta-light/50 to-jungle-dark/60',
  'from-terracotta-dark/70 via-ink/40 to-gold/50',
]

function hashToIndex(seed: string, mod: number) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return h % mod
}

export function PhotoPlaceholder({
  seed,
  label,
  className = '',
  rounded = 'rounded-2xl',
}: {
  seed: string
  label?: string
  className?: string
  rounded?: string
}) {
  const gradient = GRADIENTS[hashToIndex(seed, GRADIENTS.length)]
  return (
    <div
      className={`relative overflow-hidden ${rounded} bg-gradient-to-br ${gradient} ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
      {label && (
        <span className="absolute bottom-2 left-2 right-2 truncate text-[10px] uppercase tracking-[0.14em] text-cream/70">
          {label}
        </span>
      )}
    </div>
  )
}
