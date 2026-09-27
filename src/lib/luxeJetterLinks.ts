import catalog from '@/config/luxeDestinations.json'

const origin = 'https://luxe-jetter-frontend.vercel.app'
const destinations: Record<string, { id: string; name: string; country: string }> = catalog.destinations

/** Use the receiving app's published routes and accepted query keys only. */
export function luxeJetterLink(destinationId: string, intent: 'looks' | 'packing' = 'looks') {
  const match = destinations[destinationId]
  const url = new URL(intent === 'looks' && match ? `/destinations/${encodeURIComponent(match.id)}` : '/wardrobe-builder', origin)
  url.searchParams.set('via', 'jetset')
  if (url.pathname === '/wardrobe-builder') {
    url.searchParams.set('intent', 'City Break')
    if (match) url.searchParams.set('destination', match.id)
  }
  return { url: url.href, matched: !!match, destinationName: match?.name }
}
