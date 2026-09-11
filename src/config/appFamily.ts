import { Compass, Shirt, Baby, Bike, type LucideIcon } from 'lucide-react'
import type { TripContext } from '@/types'

// ---------------------------------------------------------------------------
// The Jordypop family — travel apps sharing one traveler, none of them
// merged into this one. This is a display/config seam only: no cross-app
// API, no account linking, no data sync. See `TripContext`
// (src/types/index.ts) and `getTripContext()` (src/lib/tripContext.ts) for
// the only data a sibling app could ever read, and only if a future pass
// wires up a real handoff.
//
// All four apps are published (per Jordann, Sept 2026) — none of them are
// framed as "coming soon" or ordered/numbered relative to each other in any
// UI. Real webURL/iOSURL values still need to be added below the moment
// they're verified — leaving a URL field undefined just means that app's
// card isn't a clickable link yet, not that the app isn't real.
// ---------------------------------------------------------------------------

export type AppFamilyId = 'jet-set-latam' | 'luxe-jetter' | 'little-jetter' | 'rallii'

export interface AppFamilyMember {
  id: AppFamilyId
  name: string
  description: string
  icon: LucideIcon
  webURL?: string
  iOSURL?: string
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
    webURL: 'https://jetsetlatam.com',
    status: 'live',
    oneLiner: 'Plan the trip',
    supportedDestinations: 'all',
  },
  'luxe-jetter': {
    id: 'luxe-jetter',
    name: 'Luxe Jetter',
    description: 'Outfit planning built around your itinerary — what to wear, where you\'re going.',
    icon: Shirt,
    status: 'live',
    oneLiner: 'Dress for it',
    supportedDestinations: 'all',
  },
  'little-jetter': {
    id: 'little-jetter',
    name: 'Little Jetter',
    description: 'A parent-facing companion for traveling with kids — prep and packing, not a kids\' app.',
    icon: Baby,
    status: 'live',
    oneLiner: 'Bring the little travelers along',
    supportedDestinations: 'all',
  },
  rallii: {
    id: 'rallii',
    name: 'Rallii',
    description: 'Scenic rail, mountain-biking and trail routes for the days you want to move.',
    icon: Bike,
    status: 'live',
    oneLiner: 'Take the scenic route',
    // Scoped to destinations with a verified railiiConnection only (see the
    // Destination type) — populated by the app at render time, not hardcoded
    // here, so it never drifts out of sync with what's actually documented.
    supportedDestinations: [],
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
