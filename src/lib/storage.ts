import type { SavedLibrary, SavedTrip, Itinerary } from '@/types'
import { getItinerary } from '@/data'

// Local-first persistence for Saved/My Trips. No account required.
// A thin wrapper so the storage backend (localStorage today; could become
// Capacitor Preferences/SQLite later) is swappable in one place.

const LIB_KEY = 'jsl.savedLibrary.v1'
const TRIPS_KEY = 'jsl.savedTrips.v1'
const ITIN_KEY = 'jsl.userItineraries.v1'

const emptyLibrary: SavedLibrary = {
  upcomingTripIds: [],
  pastTripIds: [],
  savedDestinationIds: [],
  savedPlaceIds: [],
  savedGuideIds: [],
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
function write<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // best-effort; local storage may be unavailable (private mode, etc.)
  }
}

export function getLibrary(): SavedLibrary {
  return read(LIB_KEY, emptyLibrary)
}
function saveLibrary(lib: SavedLibrary) {
  write(LIB_KEY, lib)
}

export function getSavedTrips(): SavedTrip[] {
  return read(TRIPS_KEY, [] as SavedTrip[])
}
function saveSavedTrips(trips: SavedTrip[]) {
  write(TRIPS_KEY, trips)
}

export function getUserItineraries(): Itinerary[] {
  return read(ITIN_KEY, [] as Itinerary[])
}
export function saveUserItinerary(itinerary: Itinerary) {
  const all = getUserItineraries()
  write(ITIN_KEY, [...all.filter((i) => i.id !== itinerary.id), itinerary])
}

/** Prefers a locally-edited copy of an itinerary (e.g. one a Place was added
 *  to) over the static/ready-made version with the same id. */
export function getUserItineraryOverride(id: string): Itinerary | undefined {
  return getUserItineraries().find((i) => i.id === id)
}

/** The itinerary actually shown to the user for a given id: a locally-saved
 *  copy (planner-generated, or a ready-made trip that's been edited) takes
 *  priority over the static/ready-made definition. This is the single
 *  source of truth Trip Detail and Plan a Trip's post-save state should
 *  both read from. */
export function getEffectiveItinerary(id: string): Itinerary | undefined {
  return getUserItineraryOverride(id) ?? getItinerary(id)
}

export function toggleSavedPlace(placeId: string) {
  const lib = getLibrary()
  const has = lib.savedPlaceIds.includes(placeId)
  lib.savedPlaceIds = has
    ? lib.savedPlaceIds.filter((id) => id !== placeId)
    : [...lib.savedPlaceIds, placeId]
  saveLibrary(lib)
  return !has
}
export function toggleSavedDestination(destinationId: string) {
  const lib = getLibrary()
  const has = lib.savedDestinationIds.includes(destinationId)
  lib.savedDestinationIds = has
    ? lib.savedDestinationIds.filter((id) => id !== destinationId)
    : [...lib.savedDestinationIds, destinationId]
  saveLibrary(lib)
  return !has
}
export function toggleSavedGuide(guideId: string) {
  const lib = getLibrary()
  const has = lib.savedGuideIds.includes(guideId)
  lib.savedGuideIds = has
    ? lib.savedGuideIds.filter((id) => id !== guideId)
    : [...lib.savedGuideIds, guideId]
  saveLibrary(lib)
  return !has
}

export function isSavedPlace(placeId: string) {
  return getLibrary().savedPlaceIds.includes(placeId)
}
export function isSavedDestination(destinationId: string) {
  return getLibrary().savedDestinationIds.includes(destinationId)
}
export function isSavedGuide(guideId: string) {
  return getLibrary().savedGuideIds.includes(guideId)
}

// Adds a Place to an existing trip's itinerary as a new activity on a given
// day (defaults to the last day). Works against the local-first model only
// — no accounts, no sync. The itinerary (ready-made or user-generated) is
// copied into the user-itinerary store under its existing id so it persists
// going forward.
export function addPlaceToTripItinerary(itinerary: Itinerary, placeId: string, dayIndex?: number) {
  const targetIndex = dayIndex ?? itinerary.days.length - 1
  const days = itinerary.days.length
    ? itinerary.days.map((d, i) =>
        i === targetIndex
          ? {
              ...d,
              activities: [
                ...d.activities,
                { id: `act-added-${placeId}-${Date.now()}`, time: 'Flexible', label: 'Added from your browsing', placeId },
              ],
            }
          : d
      )
    : itinerary.days
  const updated: Itinerary = { ...itinerary, days }
  saveUserItinerary(updated)
  return updated
}

export function addUpcomingTrip(trip: SavedTrip) {
  const trips = getSavedTrips()
  saveSavedTrips([...trips.filter((t) => t.id !== trip.id), trip])
  const lib = getLibrary()
  if (!lib.upcomingTripIds.includes(trip.id)) {
    lib.upcomingTripIds.push(trip.id)
    saveLibrary(lib)
  }
}
export function removeTrip(tripId: string) {
  saveSavedTrips(getSavedTrips().filter((t) => t.id !== tripId))
  const lib = getLibrary()
  lib.upcomingTripIds = lib.upcomingTripIds.filter((id) => id !== tripId)
  lib.pastTripIds = lib.pastTripIds.filter((id) => id !== tripId)
  saveLibrary(lib)
}
export function getTrip(tripId: string): SavedTrip | undefined {
  return getSavedTrips().find((t) => t.id === tripId)
}
/** Renames a saved trip — updates both the trip record's title (what Saved
 *  lists) and the underlying itinerary's title (what Trip Detail/Plan a
 *  Trip display), so the two never drift apart. */
export function renameTrip(tripId: string, title: string) {
  const trips = getSavedTrips()
  const trip = trips.find((t) => t.id === tripId)
  if (!trip) return
  saveSavedTrips(trips.map((t) => (t.id === tripId ? { ...t, title } : t)))
  const itinerary = getEffectiveItinerary(trip.itineraryId)
  if (itinerary) saveUserItinerary({ ...itinerary, title })
}
