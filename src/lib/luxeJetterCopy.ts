import type { TripContext, Itinerary, PlaceCategory } from '@/types'
import { getPlace } from '@/data'

// ---------------------------------------------------------------------------
// Trip-aware Luxe Jetter copy generation (Pass 10).
//
// Jet Set LatAm handles travel content and travel affiliate opportunities
// (stays, experiences, tours). Fashion/wardrobe intent belongs to Luxe
// Jetter, a published sibling app — this file never invents a look, a
// product, or a URL (its deep-link URL isn't wired into
// src/config/appFamily.ts yet). It only reads the real
// TripContext / Itinerary this trip already has and turns it into two things:
//   1. A short, destination- and trip-specific headline/body/CTA for the
//      "Make It Yours" card (replacing one static sentence reused everywhere).
//   2. A "mini wardrobe preview" — the real occasion types this itinerary
//      actually contains (Beach Day, Old City, Dinner, ...), so the handoff
//      reads as "here's what you'll need outfits for," not a generic ad.
// ---------------------------------------------------------------------------

export interface LuxeJetterCopy {
  headline: string
  body: string
  cta: string
}

// A small city-level flavor vocabulary — nouns only, not full sentences.
// Sentence assembly below is still driven by real trip data (day count,
// derived occasions); this just keeps the generated copy from reading
// identically across every destination. Add a city here only once it's a
// real destination in src/data — never speculative.
const CITY_FLAVOR: Record<string, string> = {
  Cartagena: 'color, heat and the Caribbean',
  'Rio de Janeiro': 'the beach, Ipanema dinners and later nights',
  'Mexico City': 'gallery mornings, mezcal bars and old libraries',
  Guadalajara: 'plazas, mezcalerías and a day out to Tequila',
  Tulum: 'cenotes, ruins and beach club afternoons',
}

const OCCASION_LABEL_BY_CATEGORY: Partial<Record<PlaceCategory, string>> = {
  beach: 'Beach Day',
  landmark: 'Old City',
  museum: 'Museum Morning',
  experience: 'Excursion',
  shop: 'Shopping',
  nightlife: 'Night Out',
  bar: 'Night Out',
  restaurant: 'Dinner',
  cafe: 'Café Morning',
  park: 'Slow Morning',
}

// Keyword overrides checked against the activity's own label/notes text —
// catches cases a bare category doesn't (an "Island escape" experience
// reads better as "Boat Day" than the generic "Excursion").
const KEYWORD_OVERRIDES: [RegExp, string][] = [
  [/island|boat|speedboat|catamaran/i, 'Boat Day'],
  [/fortress|castillo|ruins|archaeological/i, 'Old City'],
  [/sunset|golden hour/i, 'Golden Hour'],
  [/drinks?/i, 'Night Out'],
]

/** Derives the real occasion types an itinerary actually contains — e.g.
 *  "Beach Day / Old City / Dinner / Boat Day / Travel Day" — from its day
 *  activities and the Places they reference. Never fabricates a moment that
 *  isn't backed by a real activity in the itinerary. */
export function deriveWardrobeMoments(itinerary: Itinerary): string[] {
  const moments: string[] = []
  const seen = new Set<string>()

  for (const day of itinerary.days) {
    let dayMoment: string | undefined
    for (const activity of day.activities) {
      const text = `${activity.label} ${activity.notes ?? ''}`
      const override = KEYWORD_OVERRIDES.find(([re]) => re.test(text))
      if (override) { dayMoment = override[1]; break }
      if (activity.label === 'Dinner') { dayMoment = 'Dinner'; break }
      const place = activity.placeId ? getPlace(activity.placeId) : undefined
      const label = place ? OCCASION_LABEL_BY_CATEGORY[place.category] : undefined
      if (label && !dayMoment) dayMoment = label
    }
    const chosen = dayMoment ?? (day.day === 1 ? 'Travel Day' : undefined)
    if (chosen && !seen.has(chosen)) {
      seen.add(chosen)
      moments.push(chosen)
    }
  }

  // Always ground the first day as arrival if nothing more specific was
  // found and there's room — a real, honest default, not a fabricated one.
  if (moments.length === 0) moments.push('Travel Day')

  return moments.slice(0, 6)
}

/** Generates a headline/body/CTA for the Luxe Jetter "Make It Yours" card
 *  from real TripContext fields — destination, day count, and (via
 *  `moments`) the itinerary's actual occasion mix. Assembled, not
 *  hardcoded per destination: the sentence structure and occasion choice
 *  are computed from the trip; only the closing flavor phrase is looked up
 *  by city name. */
export function generateLuxeJetterCopy(context: TripContext, moments: string[]): LuxeJetterCopy {
  const dayWord = context.days === 1 ? 'One day' : `${numberWord(context.days)} days`
  const flavor = CITY_FLAVOR[context.destinationName]
  const momentPhrase = moments.slice(0, 3).join(', ').replace(/,([^,]*)$/, ' and$1')

  const body = flavor
    ? `${dayWord} of ${flavor}${momentPhrase ? ` — including ${momentPhrase.toLowerCase()}` : ''}.`
    : `${dayWord} in ${context.destinationName}${momentPhrase ? `, including ${momentPhrase.toLowerCase()}` : ''}.`

  return {
    headline: 'What Are You Wearing?',
    body,
    cta: `Plan My ${context.destinationName} Wardrobe →`,
  }
}

function numberWord(n: number): string {
  const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
  return words[n] ?? String(n)
}
