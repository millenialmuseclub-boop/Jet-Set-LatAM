import type {
  TripQuizAnswers, Itinerary, ItineraryDay, ItineraryActivity, Place, TripInterest,
} from '@/types'
import { getPlacesByDestination, destinations } from '@/data'

// ---------------------------------------------------------------------------
// Deterministic trip planner.
//
// This intentionally does NOT call an LLM. It assembles itineraries from the
// curated Place database using rule-based scoring + templates, per the
// product brief: "prioritize a convincing functional planner architecture
// over sophisticated AI... Plans should primarily be assembled from our
// curated Jet Set LatAm destination/place database."
// ---------------------------------------------------------------------------

const INTEREST_TO_CATEGORY: Record<TripInterest, Place['category'][]> = {
  food: ['restaurant', 'cafe'],
  culture: ['museum', 'landmark', 'experience'],
  beach: ['beach'],
  shopping: ['shop'],
  nightlife: ['bar', 'nightlife'],
  relaxation: ['park', 'cafe'],
}

const PACE_ACTIVITIES_PER_DAY: Record<TripQuizAnswers['pace'], number> = {
  slow: 3,
  balanced: 4,
  'pack-it-in': 6,
}

const DAY_SLOTS = ['9:00', '10:30', '13:00', '15:00', '17:30', '19:30', '21:00']
const SLOT_LABELS: Record<string, string> = {
  '9:00': 'Breakfast',
  '10:30': 'Experience',
  '13:00': 'Lunch',
  '15:00': 'Explore',
  '17:30': 'Reset',
  '19:30': 'Dinner',
  '21:00': 'Drinks',
}

function scorePlace(place: Place, interests: TripInterest[]): number {
  let score = 0
  for (const interest of interests) {
    if (INTEREST_TO_CATEGORY[interest]?.includes(place.category)) score += 2
  }
  if (place.isJetSetPick) score += 1
  return score
}

// Kept destination-agnostic on purpose — this array is shared across every
// city in the planner, so no city-specific proper nouns (a Mexico City
// neighborhood name here would leak into a Rio de Janeiro itinerary, and
// vice versa). Per-day flavor instead comes from the real Place names and
// neighborhoods the planner slots in underneath each theme.
const CULTURE_THEMES = ['Culture + Old Town', 'Icons + Architecture', 'Museums + Landmarks']
const FOOD_THEMES = ['Food + Neighborhood Wander', 'Markets + Cafés', 'A Slower Table']
const RELAX_THEMES = ['Parks + Slow Mornings', 'Green Reset', 'Easy Pace']
const SHOP_THEMES = ['Arrival + Boutique Walk', 'Neighborhood Deep Dive', 'Shopping + Design']

function themeForDay(dayNum: number, interests: TripInterest[]): string {
  const i = (dayNum - 1) % 3
  if (interests.includes('shopping')) return SHOP_THEMES[i]
  if (interests.includes('culture')) return CULTURE_THEMES[i]
  if (interests.includes('food')) return FOOD_THEMES[i]
  if (interests.includes('relaxation')) return RELAX_THEMES[i]
  return `Day ${dayNum}`
}

export function generateItinerary(answers: TripQuizAnswers): Itinerary {
  const allPlaces = getPlacesByDestination(answers.destinationId)
  const ranked = [...allPlaces].sort((a, b) => scorePlace(b, answers.interests) - scorePlace(a, answers.interests))

  const perDay = PACE_ACTIVITIES_PER_DAY[answers.pace]
  const used = new Set<string>()
  const days: ItineraryDay[] = []

  for (let d = 1; d <= answers.days; d++) {
    const slots = DAY_SLOTS.slice(0, perDay)
    const activities: ItineraryActivity[] = slots.map((time, i) => {
      // Pull the next unused, highest-scoring place that isn't a meal slot
      // mismatch (best-effort — we don't have per-place meal tagging yet).
      const candidate = ranked.find((p) => !used.has(p.id))
      const label = SLOT_LABELS[time] ?? 'Activity'
      if (candidate && (label !== 'Breakfast' && label !== 'Lunch' && label !== 'Dinner')) {
        used.add(candidate.id)
        return { id: `${d}-${i}`, time, label, placeId: candidate.id }
      }
      // For meal slots, prefer a café/restaurant if one is unused
      if (label === 'Breakfast' || label === 'Lunch' || label === 'Dinner') {
        const meal = ranked.find((p) => !used.has(p.id) && ['cafe', 'restaurant'].includes(p.category))
        if (meal) {
          used.add(meal.id)
          return { id: `${d}-${i}`, time, label, placeId: meal.id }
        }
      }
      return { id: `${d}-${i}`, time, label, notes: 'Open block — no verified Jet Set Pick left for this slot yet' }
    })
    days.push({ day: d, theme: themeForDay(d, answers.interests), activities })
  }

  const destCity = destinations.find((d) => d.id === answers.destinationId)?.city ?? 'Trip'

  return {
    id: `it-${answers.destinationId}-${Date.now()}`,
    destinationId: answers.destinationId,
    title: `${answers.days}-Day ${destCity} Itinerary`,
    days,
    answers,
    isReadyMade: false,
  }
}
