// Small, reusable affiliate disclosure — rendered only next to the handful
// of places a real affiliate link actually appears (see ShopTheLookCard),
// never omnipresent across the app. Kept as one component so the wording
// stays consistent wherever it's needed.
export function AffiliateDisclosure({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-ink-soft/75 ${className}`}>
      Some product links may earn Jet Set LatAm or Luxe Jetter a commission at no additional cost to you. Editorial recommendations remain independent.
    </p>
  )
}
