import { TripConstellation } from '@/components/TripConstellation';
import { TrailLinks } from '@/components/TrailLinks';
import { TripDates } from '@/components/TripDates';
import { RioStoryLinks } from '@/components/RioStoryLinks';
import { rioCity2025 } from '@/data/rio-city-2025';
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getDestinationById,
  getPlace,
  getGuidesByDestination,
  getPlacesByDestination,
} from "@/data";
import {
  getTrip,
  getEffectiveItinerary,
  saveUserItinerary,
  renameTrip,
  removeTrip,
  getLibrary,
  setTripStatus,
} from "@/lib/storage";
import { StoryCard } from "@/components/StoryCard";
import { Photo } from "@/components/Photo";
import { ItineraryEditor } from "@/components/ItineraryEditor";
import { EmptyState } from "@/components/EmptyState";
import {
  Pencil,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { ConfirmSheet } from "@/components/ConfirmSheet";
import type { Itinerary } from "@/types";

export function TripDetail() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const trip = tripId ? getTrip(tripId) : undefined;
  const destination = trip ? getDestinationById(trip.destinationId) : undefined;
  const [itinerary, setItinerary] = useState<Itinerary | undefined>(
    () => trip && getEffectiveItinerary(trip.itineraryId),
  );
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(trip?.title ?? "");
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  if (!trip || !destination || !itinerary) {
    return (
      <EmptyState
        title="Trip not found"
        body="This trip may have been deleted, or the link is out of date."
        action={
          <Link
            to="/saved"
            className="mt-2 rounded-full bg-terracotta px-5 py-2 text-sm text-cream"
          >
            Back to Saved
          </Link>
        }
      />
    );
  }

  function persist(updated: Itinerary) {
    saveUserItinerary(updated);
    setItinerary(updated);
  }

  function commitTitle() {
    setEditingTitle(false);
    const title = titleDraft.trim();
    if (!title || !tripId) return;
    renameTrip(tripId, title);
    persist({ ...itinerary!, title });
  }

  function handleDelete() {
    if (!tripId) return;
    removeTrip(tripId);
    navigate("/saved");
  }

  const usedPlaceIds = new Set(
    itinerary.days.flatMap((d) =>
      d.activities.map((a) => a.placeId).filter(Boolean),
    ),
  );
  const savedPlaceIds = getLibrary().savedPlaceIds;
  const addablePlaces = savedPlaceIds
    .map(getPlace)
    .filter(
      (p): p is NonNullable<typeof p> =>
        !!p && p.city === destination.city && !usedPlaceIds.has(p.id),
    );

  const answers = itinerary.answers;

  return (
    <div className="animate-fade-in pb-6">
      <div className="trip-hero relative">
        <Photo
          src={destination.id === "rio-de-janeiro" ? rioCity2025[3].src : destination.heroPhoto}
          seed={destination.id}
          alt={destination.city}
          priority
          className="h-56 w-full md:h-72"
          rounded="rounded-none"
        />
        <Link
          to="/saved"
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink/50 text-cream backdrop-blur-sm"
        >
          <ArrowLeft size={16} />
        </Link>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 pt-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-light">
            {destination.city}, {destination.country}
          </p>
          {editingTitle ? (
            <input
              autoFocus
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={commitTitle}
              onKeyDown={(e) => e.key === "Enter" && commitTitle()}
              className="w-full border-b-2 border-cream bg-transparent font-display text-3xl text-cream outline-none"
            />
          ) : (
            <button
              onClick={() => {
                setTitleDraft(itinerary.title);
                setEditingTitle(true);
              }}
              className="flex items-center gap-2 text-left"
            >
              <h1 className="font-display text-3xl text-cream">
                {itinerary.title}
              </h1>
              <Pencil size={14} className="shrink-0 text-cream/50" />
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-6 px-5 pt-5 md:px-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-soft/70">
          <span className="rounded-full bg-cream px-3 py-1 ring-1 ring-ink/10">
            {itinerary.days.length} days
          </span>
          {answers?.companions && (
            <span className="rounded-full bg-cream px-3 py-1 capitalize ring-1 ring-ink/10">
              {answers.companions}
            </span>
          )}
          {answers?.style && (
            <span className="rounded-full bg-cream px-3 py-1 capitalize ring-1 ring-ink/10">
              {answers.style}
            </span>
          )}
          {answers?.pace && (
            <span className="rounded-full bg-cream px-3 py-1 capitalize ring-1 ring-ink/10">
              {answers.pace.replace("-", " ")}
            </span>
          )}
          {answers?.interests?.map((i) => (
            <span
              key={i}
              className="rounded-full bg-terracotta/10 px-3 py-1 capitalize text-terracotta"
            >
              {i}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4"><Link className="min-h-11 text-sm text-terracotta" to={"/saved/trips/"+trip.id+"/story"}>Your Trip Story →</Link><Link className="min-h-11 text-sm text-terracotta" to={"/ask?trip="+trip.id}>Ask about this trip →</Link><Link className="min-h-11 text-sm text-terracotta" to="/">Jet Set Now →</Link></div>
        <TripDates trip={trip} itinerary={itinerary}/>
        <ItineraryEditor
          itinerary={itinerary}
          onChange={persist}
          fallbackHero={destination.heroPhoto}
          candidatePlaces={getPlacesByDestination(destination.id)}
          addablePlaces={addablePlaces}
        />

        <div className="flex gap-3 pt-2">
          <Link
            to={`/destinations/${destination.slug}`}
            className="flex-1 rounded-full bg-cream py-3 text-center text-sm font-medium text-ink-soft ring-1 ring-ink/10"
          >
            Back to {destination.city}
          </Link>
          <button
            onClick={() => {
              setTripStatus(
                trip.id,
                trip.status === "past" ? "upcoming" : "past",
              );
              navigate("/saved");
            }}
            className="rounded-full bg-cream px-4 py-3 text-sm ring-1 ring-ink/10"
          >
            {trip.status === "past" ? "Move to My Trips" : "Mark as past trip"}
          </button>
          <button
            onClick={() => setConfirmingDelete(true)}
            className="flex items-center gap-1.5 rounded-full bg-cream px-4 py-3 text-sm font-medium text-red-500 ring-1 ring-ink/10"
          >
            <Trash2 size={14} /> Delete Trip
          </button>
        </div>
        <ConfirmSheet
          open={confirmingDelete}
          title="Delete this trip?"
          body={`"${itinerary.title}" and its itinerary will be removed from this device. This can't be undone.`}
          confirmLabel="Delete Trip"
          onCancel={() => setConfirmingDelete(false)}
          onConfirm={handleDelete}
        />
        <section>
          <div className="section-heading">
            <h2>Your destination reading list</h2>
            <Link to={"/explore?destination=" + destination.id}>
              All stories ↗
            </Link>
          </div>
          <div className="photo-rail">
            {getGuidesByDestination(destination.id)
              .slice(0, 3)
              .map((g) => (
                <StoryCard key={g.id} guide={g} compact />
              ))}
          </div>
        </section>
        <p className="text-center text-[11px] text-ink-soft/40">
          Assembled from the Jet Set LatAm {destination.city} Place database —
          not AI-generated. Changes save automatically on this device.
        </p>

        {destination.id === "rio-de-janeiro" && <RioStoryLinks />}
        <TrailLinks destinationId={destination.id}/>
        <TripConstellation
          destination={destination}
          tripId={trip.id}
          itinerary={itinerary}
        />
      </div>
    </div>
  );
}

// Contextual, Trip Detail-only surface for the sibling apps in the Jordypop
// family (see src/config/appFamily.ts) that could read this trip's shape
// (src/lib/tripContext.ts) without merging their functionality into Jet Set
// LatAm. Each card only appears when it's genuinely relevant to *this* trip
// — never a static ad block. All three sibling apps are published; their
// deep-link URLs aren't wired into this file yet, so a card reads as a real
// promo for a real app rather than a live button, until a verified webURL/
// iOSURL lands in src/config/appFamily.ts. Copy is generated from this
// trip's real data (see src/lib/luxeJetterCopy.ts) rather than one static
// sentence reused across every destination.
