import { Compass, Shirt, Baby, Bike, type LucideIcon } from 'lucide-react'

// ---------------------------------------------------------------------------
// The Jet Set family — four apps sharing one traveler, none of them merged
// into this one. This is a display/config seam only: no cross-app API, no
// account linking, no data sync. See `TripContext` (src/types/index.ts) and
// `getTripContext()` (src/lib/tripContext.ts) for the only data a sibling
// app could ever read, and only if a future pass wires up a real handoff.
//
// CRITICAL: no invented URLs. As of this pass, no App Store ID, web URL or
// deep-link scheme has been verified in project docs for Luxe Jetter, Little
// Jetter or Rallii — all three are `status: 'coming-soon'` with every URL
// field left undefined. Jet Set LatAm itself is the only app in this family
// that actually exists today. Update this file the moment a real URL is
// verified — never before.
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
    supportedDestinations: 'all',
  },
  'luxe-jetter': {
    id: 'luxe-jetter',
    name: 'Luxe Jetter',
    description: 'Outfit planning built around your itinerary — what to wear, where you\'re going.',
    icon: Shirt,
    status: 'coming-soon',
    supportedDestinations: 'all',
  },
  'little-jetter': {
    id: 'little-jetter',
    name: 'Little Jetter',
    description: 'A parent-facing companion for traveling with kids — prep and packing, not a kids\' app.',
    icon: Baby,
    status: 'coming-soon',
    supportedDestinations: 'all',
  },
  rallii: {
    id: 'rallii',
    name: 'Rallii',
    description: 'Scenic rail, mountain-biking and trail routes for the days you want to move.',
    icon: Bike,
    status: 'coming-soon',
    // Scoped to destinations with a verified railiiConnection only (see the
    // Destination type) — populated by the app at render time, not hardcoded
    // here, so it never drifts out of sync with what's actually documented.
    supportedDestinations: [],
  },
}

export const appFamilyList = Object.values(appFamily)
