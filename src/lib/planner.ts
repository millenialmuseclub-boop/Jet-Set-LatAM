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

// Which categories a real traveler would happily do twice on one trip vs.
// which ones feel absurd repeated (a second visit to the same ticketed
// museum, landmark, or fine-dining dinner) once the fallback below has to
// fill a slot with something already used. `experience` and `hotel` are
// deliberately NOT repeatable — most Experiences in this data set are
// one-time tours/activities, not a flexible drop-in.
export const REPEATABLE_CATEGORIES = new Set<Place['category']>(['cafe', 'park', 'beach', 'shop', 'nightlife', 'bar'])

// A short, destination-agnostic word for what a category contributes to a
// day's theme — used to build a real theme like "Art + Jardins" from what
// was actually scheduled, never a hardcoded per-city phrase.
const CATEGORY_THEME_WORD: Record<Place['category'], string> = {
  museum: 'Art', landmark: 'Icons', experience: 'Adventure', beach: 'Beach',
  park: 'Green', shop: 'Design', restaurant: 'Food', cafe: 'Food',
  bar: 'Nights', nightlife: 'Nights', hotel: 'Leisure',
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

// Fallback only — used when a day somehow has no non-meal activity to
// derive a real theme from (e.g. every slot fell back to a free block).
function fallbackThemeForDay(dayNum: number, interests: TripInterest[]): string {
  const i = (dayNum - 1) % 3
  if (interests.includes('shopping')) return SHOP_THEMES[i]
  if (interests.includes('culture')) return CULTURE_THEMES[i]
  if (interests.includes('food')) return FOOD_THEMES[i]
  if (interests.includes('relaxation')) return RELAX_THEMES[i]
  return `Day ${dayNum}`
}

// Builds a real theme like "Art + Jardins" from what was actually
// scheduled that day, instead of a precomputed generic phrase. Meal slots
// are excluded from the word count (breakfast/lunch/dinner would just make
// every day read as "Food") but do count toward the neighborhood tally,
// since where you eat is still part of "what part of the city was this
// day in." Never leaks a city-specific proper noun — every word here comes
// from the real Place data for whatever destination is being planned.
function themeFromDay(dayNum: number, interests: TripInterest[], dayPlaces: { place: Place; isMeal: boolean }[]): string {
  const wordCounts = new Map<string, number>()
  for (const { place, isMeal } of dayPlaces) {
    if (isMeal) continue
    const word = CATEGORY_THEME_WORD[place.category]
    wordCounts.set(word, (wordCounts.get(word) ?? 0) + 1)
  }
  const neighborhoodCounts = new Map<string, number>()
  for (const { place } of dayPlaces) {
    if (!place.neighborhood) continue
    neighborhoodCounts.set(place.neighborhood, (neighborhoodCounts.get(place.neighborhood) ?? 0) + 1)
  }
  const topWord = [...wordCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]
  const topNeighborhood = [...neighborhoodCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]

  if (topWord && topNeighborhood) return `${topWord} + ${topNeighborhood}`
  if (topWord) return `${topWord} Day`
  if (topNeighborhood) return topNeighborhood
  return fallbackThemeForDay(dayNum, interests)
}

export function generateItinerary(answers: TripQuizAnswers): Itinerary {
  const allPlaces = getPlacesByDestination(answers.destinationId)
  const ranked = [...allPlaces].sort((a, b) => scorePlace(b, answers.interests) - scorePlace(a, answers.interests))

  const perDay = PACE_ACTIVITIES_PER_DAY[answers.pace]
  const days: ItineraryDay[] = []
  const destCity = destinations.find((d) => d.id === answers.destinationId)?.city ?? 'Trip'

  // A short trip-length or a thin destination shouldn't ever produce a
  // broken "no place left" block — once every place has appeared once, the
  // planner starts intelligently revisiting places instead of giving up.
  // `useCount` tracks how many times each place has already been used
  // across the whole trip; `usedToday` only prevents the same place
  // appearing twice on one day.
  const useCount = new Map<string, number>()
  for (const p of allPlaces) useCount.set(p.id, 0)

  // Lightweight geographic affinity, not a routing engine: once a
  // neighborhood has been visited today, a same-neighborhood place gets a
  // scoring bonus for the rest of the day, so a generated day tends to
  // stay in one part of the city instead of bouncing across it.
  function scoreForSlot(place: Place, dayNeighborhoods: Map<string, number>): number {
    let score = scorePlace(place, answers.interests)
    if (place.neighborhood && dayNeighborhoods.has(place.neighborhood)) score += 3
    return score
  }

  // Priority order for filling a slot: (1) an unused, highest-scoring
  // place, (2) any other unused place, (3) — only once nothing unused is
  // left — the least-used REPEATABLE place (cafés, parks, beaches, shops,
  // nightlife spots: things a real trip returns to). A museum, landmark,
  // fine-dining restaurant or one-time experience is never revisited just
  // to fill a slot; the caller falls back to an intentional free block
  // instead of an absurd "visit the same museum twice."
  function pickBest(pool: Place[], usedToday: Set<string>, dayNeighborhoods: Map<string, number>): Place | undefined {
    const unused = pool.filter((p) => !usedToday.has(p.id) && (useCount.get(p.id) ?? 0) === 0)
    if (unused.length > 0) {
      return [...unused].sort((a, b) => scoreForSlot(b, dayNeighborhoods) - scoreForSlot(a, dayNeighborhoods))[0]
    }
    const repeatable = pool.filter((p) => !usedToday.has(p.id) && REPEATABLE_CATEGORIES.has(p.category))
    if (repeatable.length > 0) {
      const byUseThenScore = (a: Place, b: Place) => {
        const countDiff = (useCount.get(a.id) ?? 0) - (useCount.get(b.id) ?? 0)
        if (countDiff !== 0) return countDiff
        return scoreForSlot(b, dayNeighborhoods) - scoreForSlot(a, dayNeighborhoods)
      }
      // On a thin destination, a naive "least-used wins" tie-break can
      // surface a category the traveler never asked for (e.g. Nightlife
      // filling days on a food/culture/shopping trip just because it's
      // been touched less than the cafés) — and once that place drives a
      // day's activity count, the theme label reads as if the trip were
      // about nightlife. Prefer repeatable places that actually match a
      // requested interest; only fall back to the traveler's least-favorite
      // repeatable category once nothing interest-relevant is left either.
      const relevant = repeatable.filter((p) => scorePlace(p, answers.interests) > 0)
      const candidates = relevant.length > 0 ? relevant : repeatable
      return [...candidates].sort(byUseThenScore)[0]
    }
    return undefined
  }

  for (let d = 1; d <= answers.days; d++) {
    const slots = DAY_SLOTS.slice(0, perDay)
    const usedToday = new Set<string>()
    const dayNeighborhoods = new Map<string, number>()
    const dayPlaces: { place: Place; isMeal: boolean }[] = []
    const activities: ItineraryActivity[] = slots.map((time, i) => {
      const label = SLOT_LABELS[time] ?? 'Activity'
      const isMeal = label === 'Breakfast' || label === 'Lunch' || label === 'Dinner'
      // Meal slots prefer a café/restaurant, but fall back to any
      // candidate rather than an open block if none of those are left.
      const mealPool = ranked.filter((p) => ['cafe', 'restaurant'].includes(p.category))
      const candidate = isMeal
        ? pickBest(mealPool, usedToday, dayNeighborhoods)
        : pickBest(ranked, usedToday, dayNeighborhoods)
      if (candidate) {
        usedToday.add(candidate.id)
        useCount.set(candidate.id, (useCount.get(candidate.id) ?? 0) + 1)
        if (candidate.neighborhood) dayNeighborhoods.set(candidate.neighborhood, (dayNeighborhoods.get(candidate.neighborhood) ?? 0) + 1)
        dayPlaces.push({ place: candidate, isMeal })
        return { id: `${d}-${i}`, time, label, placeId: candidate.id }
      }
      // Nothing left that's fair to repeat — an intentional free block
      // beats forcing a second visit to a museum or fine-dining dinner.
      // Labeled "Free Time" (not the original slot label) and phrased as
      // a real recommendation, not a technical fallback message — this
      // should read as a deliberate part of the trip, never an error state.
      const freeIn = [...dayNeighborhoods.keys()][0]
      const note = freeIn ? `Explore ${freeIn} at your own pace.` : `Explore ${destCity} at your own pace.`
      return { id: `${d}-${i}`, time, label: 'Free Time', notes: note }
    })
    days.push({ day: d, theme: themeFromDay(d, answers.interests, dayPlaces), activities })
  }

  return {
    id: `it-${answers.destinationId}-${Date.now()}`,
    destinationId: answers.destinationId,
    title: `${answers.days}-Day ${destCity} Itinerary`,
    days,
    answers,
    isReadyMade: false,
  }
}
