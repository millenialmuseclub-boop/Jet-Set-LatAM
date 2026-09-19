import jetSetIcon from '@/assets/family/jet-set-latam.webp'
import luxeIcon from '@/assets/family/luxe-jetter.webp'
import littleIcon from '@/assets/family/little-jetter.webp'
import ralliiIcon from '@/assets/family/rallii.webp'
import eatIcon from '@/assets/family/let-them-eat.webp'
import { Compass, Shirt, Baby, Bike, UtensilsCrossed, type LucideIcon } from 'lucide-react'
import type { TripContext } from '@/types'

// ---------------------------------------------------------------------------
// The Jordypop family — travel apps sharing one traveler, none of them
// merged into this one. This is a display/config seam only: no cross-app
// API, no account linking, no data sync. See `TripContext`
// (src/types/index.ts) and `getTripContext()` (src/lib/tripContext.ts) for
// the only data a sibling app could ever read, and only if a future pass
// wires up a real handoff.
//
// Icons use the current local iOS app assets. Little Jetter is awaiting
// approval; keep it visible without an outbound link until a URL is supplied.
// ---------------------------------------------------------------------------

export type AppFamilyId = 'jet-set-latam' | 'luxe-jetter' | 'little-jetter' | 'rallii' | 'let-them-eat'

// The creator's own portfolio — verified live (jordypop.vercel.app: Studio
// Art student / multidisciplinary digital artist, lists LuxeJetter, Rallii
// and Let Them Eat as released apps, Little Jetter as a work in progress).
// Every "@jordypop" credit in the app links here.
export const CREATOR_PORTFOLIO_URL = 'https://jordypop.vercel.app'

export interface AppFamilyMember {
  id: AppFamilyId
  name: string
  description: string
  icon: LucideIcon
  webURL?: string
  iOSURL?: string
  iconUrl?: string
  deepLinkScheme?: string
  status: 'live' | 'coming-soon'
  /** A short, tasteful one-line description of what this app does for the
   *  traveler — used in the "Our World" section (Discover) and About. Kept
   *  separate from `description` so that copy can stay a longer sentence
   *  while this stays a punchy fragment ("Plan the trip", "Dress for it"). */
  oneLiner: string
  /** Destination ids this app is relevant to. `'all'` means every
   *  destination; undefined/empty means it hasn't been scoped yet. */
  supportedDestinations: string[] | 'all'
}

export const appFamily: Record<AppFamilyId, AppFamilyMember> = {
  'jet-set-latam': {
    id: 'jet-set-latam',
    name: 'Jet Set LatAm',
    description: 'Real, editorial travel guides and a trip planner for Latin America — this app.',
    icon: Compass,
    iconUrl: jetSetIcon,
    webURL: 'https://jetsetlatam.com',
    status: 'live',
    oneLiner: 'Plan the trip',
    supportedDestinations: 'all',
  },
  'luxe-jetter': {
    id: 'luxe-jetter',
    name: 'LuxeJetter',
    description: 'Destination-led wardrobes, complete looks and beauty rituals for the way you actually travel.',
    icon: Shirt,
    iOSURL: 'https://apps.apple.com/us/app/luxejetter/id6808023085',
    iconUrl: luxeIcon,
    status: 'live',
    oneLiner: 'Dress the trip',
    supportedDestinations: 'all',
  },
  'little-jetter': {
    id: 'little-jetter',
    name: 'Little Jetter',
    description: 'A parent-facing companion for traveling with kids — prep and packing, not a kids\' app.',
    icon: Baby,
    iconUrl: littleIcon,
    status: 'coming-soon',
    oneLiner: 'Bring the little travelers along',
    supportedDestinations: 'all',
  },
  rallii: {
    id: 'rallii',
    name: 'Rallii',
    description: 'Discover adventures by rail, trail, mountain bike, golf course and snow.',
    icon: Bike,
    iOSURL: 'https://apps.apple.com/us/app/rallii-rail/id6804085679',
    iconUrl: ralliiIcon,
    status: 'live',
    oneLiner: 'Take the scenic route',
    // Scoped to destinations with a verified railiiConnection only (see the
    // Destination type) — populated by the app at render time, not hardcoded
    // here, so it never drifts out of sync with what's actually documented.
    supportedDestinations: [],
  },
  'let-them-eat': {
    id: 'let-them-eat',
    name: 'Let Them Eat',
    description: 'Cakes, ramen, cookies and noodles — stories, global traditions, flavor guides and pairings.',
    icon: UtensilsCrossed,
    iOSURL: 'https://apps.apple.com/us/app/let-them-eat/id6801655009',
    iconUrl: eatIcon,
    status: 'live',
    oneLiner: 'Taste the world',
    supportedDestinations: 'all',
  },
}

export const appFamilyList = Object.values(appFamily)

// ---------------------------------------------------------------------------
// Luxe Jetter deep-link "receiving contract" (Pass 10) — documentation only.
//
// Luxe Jetter's deep-link URL isn't wired into this file yet, so this is
// deliberately NOT a link builder that produces a clickable URL. It's the
// shape a future handoff would use once `luxe-jetter.webURL` (or a real
// `deepLinkScheme`) is added above: the query params a real link would
// carry, generated from the same `TripContext` this app already derives via
// `getTripContext()` (src/lib/tripContext.ts). Until that URL is wired in,
// this function is unused by any UI — it exists purely as a written
// contract so the eventual wiring is a one-line change, not a redesign.
//
// Params such a link would carry (all optional, all already real fields on
// TripContext — nothing new to collect):
//   destination   — TripContext.destinationName (e.g. "Cartagena")
//   days          — TripContext.days
//   style         — TripContext.style ('value' | 'comfortable' | 'luxe')
//   interests     — TripContext.interests, comma-joined
//   occasions     — the itinerary's derived moment types (see
//                    deriveWardrobeMoments in src/lib/luxeJetterCopy.ts),
//                    comma-joined — e.g. "beach-day,old-city,dinner"
//   startDate/endDate — TripContext.startDate/endDate, when the app ever
//                    collects real calendar dates (it doesn't yet)
export function buildLuxeJetterHandoffParams(context: TripContext, occasions: string[]): Record<string, string> {
  const params: Record<string, string> = {
    destination: context.destinationName,
    days: String(context.days),
  }
  if (context.style) params.style = context.style
  if (context.interests?.length) params.interests = context.interests.join(',')
  if (occasions.length) params.occasions = occasions.map((o) => o.toLowerCase().replace(/\s+/g, '-')).join(',')
  if (context.startDate) params.startDate = context.startDate
  if (context.endDate) params.endDate = context.endDate
  return params
}
