// Small, reusable affiliate disclosure — rendered only next to the handful
// of places a real affiliate link actually appears (see ShopTheLookCard),
// never omnipresent across the app. Kept as one component so the wording
// stays consistent wherever it's needed.
export function AffiliateDisclosure({ className = '' }: { className?: string }) {
  return (
    <p className={`text-[10px] leading-relaxed text-ink-soft/45 ${className}`}>
      Contains affiliate links. We may earn a small commission at no extra cost to you.
    </p>
  )
}
