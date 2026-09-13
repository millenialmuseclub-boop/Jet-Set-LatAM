// ---------------------------------------------------------------------------
// Jet Set LatAm — core content/data model
//
// Design principle: editorial content (Places, Guides, Picks) is kept
// strictly separate from commercial/affiliate data (Offer). A place's
// editorial status is never influenced by whether it has a booking link.
// ---------------------------------------------------------------------------

export type PriceLevel = '$' | '$$' | '$$$' | '$$$$'

export type PlaceCategory =
  | 'restaurant'
  | 'cafe'
  | 'bar'
  | 'hotel'
  | 'shop'
  | 'museum'
  | 'landmark'
  | 'experience'
  | 'beach'
  | 'nightlife'
  | 'park'

export type TripInterest =
  | 'food'
  | 'culture'
  | 'beach'
  | 'shopping'
  | 'nightlife'
  | 'relaxation'

export type TripCompanions = 'solo' | 'couple' | 'friends' | 'family'
export type TripStyle = 'value' | 'comfortable' | 'luxe'
export type TripPace = 'slow' | 'balanced' | 'pack-it-in'

/** Commercial/affiliate data for a Place. Kept separate from editorial content
 *  so affiliate relationships can never influence whether something is
 *  recommended. Entirely optional — a Place is fully valid without one. */
export interface Offer {
  bookingUrl?: string
  affiliateUrl?: string
  disclosure?: string // e.g. "We may earn a commission at no extra cost to you."
}

/** A canonical Place — the atomic unit of the destination database. A
 *  restaurant mentioned across three guides is one Place, referenced by id
 *  from each guide, not three duplicated blobs of content. */
export interface Place {
  id: string
  name: string
  country: string
  city: string
  neighborhood?: string
  category: PlaceCategory
  coordinates?: { lat: number; lng: number }
  address?: string

  // Editorial
  description: string
  photos: string[]
  isJetSetPick: boolean
  pickDetails?: JetSetPickDetails

  // Practical
  priceLevel?: PriceLevel
  tags: string[]
  mapUrl?: string
  website?: string
  practicalNotes?: string

  // Cross-references (by id)
  relatedGuideIds?: string[]
  relatedItineraryIds?: string[]
  pairWithPlaceId?: string

  // Commercial — separate from editorial judgment
  offer?: Offer

  sourceUrl?: string // provenance: the jetsetlatam.com article this was drawn from
}

/** The editorial content that makes a Jet Set Pick a Jet Set Pick. */
export interface JetSetPickDetails {
  goFor: string
  skipIf?: string
  orderOrDo?: string
  spend?: PriceLevel
}

export interface Neighborhood {
  id: string
  name: string
  city: string
  description: string
  heroPhoto?: string
}

export interface DestinationSection {
  overview: string
  whyGo: string
  bestTime?: string
}

/** Country → City → Neighborhood → Place. A Destination here represents one
 *  bookable city-level entry point (e.g. Mexico City); countries group cities. */
export interface Destination {
  id: string
  slug: string
  city: string
  country: string
  heroPhoto: string
  tagline: string
  isFlagship?: boolean
  content: DestinationSection
  neighborhoods: Neighborhood[]
  placeIds: string[] // all places belonging to this destination
  guideIds: string[]
  itineraryIds: string[]
  // 'live' = PLAN tier — rich enough to browse and plan (Plan a Trip may
  //   offer it).
  // 'guide' = EXPLORE tier — enough real content for a useful destination
  //   page, but not enough verified Places/category variety for full
  //   planner support.
  // 'field-note' = FIELD NOTE tier — a smaller, real editorial destination:
  //   genuine written source content (and usually 0-1 verified Places), but
  //   held without a hero photo because no authentic, non-stock photography
  //   has been found for it yet. Still a real page — not a stub — just
  //   honest about not having a photo essay behind it.
  // 'coming-soon' = no structured real content yet (a name and country
  //   only, or literally nothing built).
  status: 'live' | 'guide' | 'field-note' | 'coming-soon'
  /** Populated ONLY where a genuine, documented connection to Rallii (the
   *  scenic-rail/mountain-biking/trail app in the Jet Set family) exists —
   *  e.g. Guadalajara's José Cuervo Express train. Never added speculatively;
   *  see docs/CONTENT_INVENTORY.md for what's verified. */
  railiiConnection?: {
    type: 'scenic-rail' | 'mountain-biking' | 'trail'
    description: string
  }
}

// ---------------------------------------------------------------------------
// Editorial media moments (video/photo features)
//
// A reusable, destination-agnostic shape for a single editorial video (or
// video-led) moment — e.g. a Cartagena street-dance clip today, a Rio
// Carnival clip once real footage exists. Kept generic on purpose: nothing
// here is Cartagena- or Rio-specific, so the same type and player component
// serve any destination. See src/components/MediaMoment.tsx.
// ---------------------------------------------------------------------------

/** Where the underlying footage actually came from. Always set honestly —
 *  never inferred, never left to imply something stronger than it is. */
export type MediaSource = 'user-footage' | 'archive' | 'stock'

export interface MediaMoment {
  id: string
  destinationId: string
  /** Year the footage was captured, when known — not a publish/edit date. */
  year: number
  /** Short factual line: what's actually visible, no invented event names,
   *  dates or context beyond what the footage shows (e.g. "A folkloric
   *  dance procession in the Walled City", not "Carnival"). */
  caption: string
  /** Longer optional editorial line for detail views. */
  dek?: string
  videoSrc: string
  posterSrc: string
  /** Seconds, rounded — for UI duration badges, not playback logic. */
  durationSeconds: number
  orientation: 'portrait' | 'landscape' | 'square'
  /** Honest provenance — see MediaSource. These are real, user-shot trip
   *  footage, so always 'user-footage' for now; never claimed as 'archive'
   *  or 'stock' unless genuinely true. */
  source: MediaSource
  relatedGuideIds?: string[]
  relatedPlaceIds?: string[]
  autoplayMuted: boolean
  tapToPlay: boolean
}

export type GuideSection =
  | 'stay' | 'eat' | 'drink' | 'see' | 'shop' | 'beaches' | 'nightlife' | 'experiences'

/** A Guide is an editorial article — the original long-form unit — now
 *  linked to structured Places rather than duplicating their content. */
export interface Guide {
  id: string
  title: string
  destinationId: string
  section: GuideSection
  dek: string
  body: string // markdown-ish plain text pulled/adapted from the source article
  heroPhoto?: string
  placeIds: string[]
  sourceUrl: string
  publishedAt?: string
  photos?: { src: string; caption: string }[]
  photoCaption?: string
  relatedDestinationIds?: string[]
  relatedGuideIds?: string[]
  categories?: string[]
  itineraryRelevance?: string[]
}

// ---------------------------------------------------------------------------
// Plan a Trip
// ---------------------------------------------------------------------------

export interface TripQuizAnswers {
  destinationId: string
  days: number
  companions: TripCompanions
  interests: TripInterest[]
  style: TripStyle
  pace: TripPace
}

export interface ItineraryActivity {
  id: string
  time: string // "9:00"
  label: string // "Breakfast", "Experience", "Free Afternoon"
  placeId?: string
  notes?: string
}

export interface ItineraryDay {
  day: number
  theme: string // "Beach + Old City"
  activities: ItineraryActivity[]
}

export interface Itinerary {
  id: string
  destinationId: string
  title: string
  days: ItineraryDay[]
  answers?: TripQuizAnswers // present when generated from Plan a Trip
  isReadyMade?: boolean // curated template vs. user-generated
}

// ---------------------------------------------------------------------------
// Saved / My Trips (local-first)
// ---------------------------------------------------------------------------

export interface SavedTrip {
  id: string
  itineraryId: string
  destinationId: string
  title: string
  createdAt: string
  status: 'upcoming' | 'past'
  startDate?: string
  visitedActivityIds?: string[]
  storyNotes?: Record<string,string>
}

export interface SavedLibrary {
  upcomingTripIds: string[]
  pastTripIds: string[]
  savedDestinationIds: string[]
  savedPlaceIds: string[]
  savedGuideIds: string[]
}

// ---------------------------------------------------------------------------
// Ecosystem foundation (not wired into Jet Set LatAm's UI or planner)
//
// A tiny, additive shape describing "the trip" in terms a sibling product
// could use without importing anything else from this app: Luxe Jetter (an
// outfit-planning companion — "what am I wearing?") and Little Jetter (a
// kids'-prep companion — "how are the kids joining/preparing?"). Jet Set
// LatAm stays a single-purpose travel-planning app; this type exists only so
// a future handoff has a stable shape to hand data through, and is derived
// from existing data on demand rather than stored or synced anywhere. See
// `getTripContext()` in `src/lib/tripContext.ts`.
// ---------------------------------------------------------------------------
export interface TripContext {
  tripId: string
  destinationId: string
  destinationName: string
  city: string
  country: string
  /** ISO date strings, when the app ever collects real trip dates — it
   *  doesn't yet (trips are planned by day-count, not calendar dates). */
  startDate?: string
  endDate?: string
  days: number
  companions?: TripCompanions
  interests?: TripInterest[]
  style?: TripStyle
  pace?: TripPace
  /** Place ids referenced by the itinerary's day activities, deduped —
   *  lets a sibling product know which real, named places this trip
   *  actually touches without re-deriving it from storage itself. */
  selectedPlaces?: string[]
}

/** Commercial collection, independent of Places and editorial ranking. */
export interface StyleOffer extends Offer {
  id: string
  kind: 'wardrobe' | 'stay'
  title: string
  network: 'ShopMy'
  cta: string
  destinationIds: string[]
  source: string
  verifiedAt: string
  status: 'active' | 'disabled'
  previewItems?: string[]
}
/** Local, versioned wardrobe brief. No receiving API is assumed. */
export interface StyleHandoff {
  version: 1
  source: 'jet-set-latam'
  trip: Pick<TripContext, 'destinationId' | 'destinationName' | 'country' | 'days' | 'startDate' | 'endDate' | 'companions' | 'interests' | 'pace' | 'style'>
  occasions: string[]
  moments: { day: number; theme: string; activities: string[] }[]
}
