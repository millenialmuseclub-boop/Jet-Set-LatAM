import { TravelCompanion } from '@/components/TravelCompanion';
import { tripPhase } from '@/lib/tripLifecycle';
import { getEffectiveItinerary } from '@/lib/storage';
import { useTripClock } from '@/lib/useTripClock';
import { useState } from "react";
import { openMap } from "@/lib/links";
import { Link, useSearchParams } from "react-router-dom";
import { Trash2, BookmarkX } from "lucide-react";
import {
  getLibrary,
  getSavedTrips,
  removeTrip,
  toggleSavedPlace,
  toggleSavedDestination,
  toggleSavedGuide,
} from "@/lib/storage";
import {
  destinations,
  getPlace,
  getDestinationById,
  getDestinationForPlace,
  getGuide,
  getPlacePhoto,
  archivePhotos,
} from "@/data";
import { Photo } from "@/components/Photo";
import { StoryCard } from "@/components/StoryCard";
import { ConfirmSheet } from "@/components/ConfirmSheet";
import { AddToTripControl } from "@/components/AddToTripControl";
const tabs = [
  "My Trips",
  "Active Trip",
  "Trip Stories",
  "Saved Places",
  "Saved Destinations",
  "Saved Guides",
] as const;
type Tab = (typeof tabs)[number];
export function Saved() {
  const [params] = useSearchParams();
  const [tab, setTab] = useState<Tab>(() => params.get('tab') === 'places' ? 'Saved Places' : 'My Trips');
  const [placeLimit, setPlaceLimit] = useState(18);
  const [city, setCity] = useState(() => params.get('city') || '');
  const [lib, setLib] = useState(getLibrary);
  const [trips, setTrips] = useState(getSavedTrips);
  const [pending, setPending] = useState<string | null>(null);
  const now=useTripClock();
  const phase=(t: typeof trips[number])=>tripPhase(t,getEffectiveItinerary(t.itineraryId),now);
  const upcoming=trips.filter(t=>['upcoming','undated'].includes(phase(t))),active=trips.filter(t=>phase(t)==='active'),past=trips.filter(t=>phase(t)==='ended');
  const places = lib.savedPlaceIds.map(getPlace).filter((p) => !!p);
  const cities = [...new Set(places.map(p => p.city))].sort();
  const selectedCity = destinations.some(d => d.city === city) ? city : '';
  if (selectedCity && !cities.includes(selectedCity)) cities.unshift(selectedCity);
  const filteredPlaces = selectedCity ? places.filter(p => p.city === selectedCity) : places;
  const dests = lib.savedDestinationIds
    .map(getDestinationById)
    .filter((d) => !!d);
  const guides = lib.savedGuideIds.map(getGuide).filter((g) => !!g);
  const counts = [
    upcoming.length,
    active.length,
    past.length,
    places.length,
    dests.length,
    guides.length,
  ];
  const currentTrips = tab === "Trip Stories" ? past : tab === "Active Trip" ? active : upcoming;
  const count = counts[tabs.indexOf(tab)];
  return (
    <div className="mx-auto max-w-4xl px-5 pb-10 pt-5 md:px-8">
      <div className="relative overflow-hidden rounded-2xl">
        <Photo
          src={archivePhotos[4].src}
          seed="saved-cover"
          alt={archivePhotos[4].caption}
          className="h-48 w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
          <p className="eyebrow text-gold-light">Keep what moves you</p>
          <h1 className="mt-1 font-display text-4xl italic">
            Your travel collection.
          </h1>
          <p className="mt-2 text-xs text-cream/80">
            Little discoveries. Future adventures. All yours.
          </p>
        </div>
      </div>
      <div className="library-summary" aria-label="Your travel library">
        <button onClick={() => setTab('My Trips')}><strong>{upcoming.length}</strong> upcoming {upcoming.length === 1 ? 'trip' : 'trips'}</button>
        <button onClick={() => setTab('Saved Places')}><strong>{places.length}</strong> {places.length === 1 ? 'place' : 'places'}</button>
        <button onClick={() => setTab('Saved Destinations')}><strong>{dests.length}</strong> {dests.length === 1 ? 'city' : 'cities'}</button>
      </div>
      {active.length > 0 && <Link to="/" className="resume-ticket"><div><p className="eyebrow text-terracotta">Travel day</p><h2>Open today’s plan →</h2><p>Your next stop, maps and saved ideas.</p></div></Link>}
      <TravelCompanion library/>
      <div
        className="-mx-5 mb-7 mt-6 flex gap-2 overflow-x-auto px-5 pb-3"
        aria-label="Saved collections"
      >
        {tabs.map((t, i) => (
          <button
            key={t}
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
            className={`min-h-11 shrink-0 rounded-full border px-4 text-xs ${tab === t ? "border-terracotta bg-terracotta text-cream" : "border-ink/15 bg-transparent"}`}
          >
            {t} <span className="ml-1 opacity-70">{counts[i]}</span>
          </button>
        ))}
      </div>
      <h2 className="mb-4 font-display text-3xl">{tab}</h2>
      {!count && (
        <div className="rounded-2xl border border-terracotta/15 bg-cream p-6">
          <h3 className="font-display text-2xl italic">
            {tab === "My Trips"
              ? "The next chapter is yours."
              : tab === "Trip Stories"
                ? "A place for your memories."
                : "Something worth keeping."}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft/70">
            {tab === "My Trips"
              ? "Build an itinerary, then save it here for the journey."
              : tab === "Trip Stories"
                ? "Trips with ended dates or marked as past become stories. Confirm your visits and keep your memories here."
                : tab === "Active Trip" ? "Add dates to a saved trip. It will appear here while you are traveling." : `Save ${tab === "Saved Places" ? "places" : tab === "Saved Destinations" ? "cities" : "stories"} as you explore. They’ll be waiting here.`}
          </p>
          <Link
            to={tab === "My Trips" ? "/plan" : tab === "Active Trip" ? "/saved" : "/explore"}
            onClick={() => { if (tab === "Active Trip") setTab("My Trips"); }}
            className="mt-5 inline-flex min-h-11 items-center rounded-full bg-jungle-dark px-5 text-xs text-cream"
          >
            {tab === "My Trips"
              ? "Plan a little escape"
              : tab === "Active Trip" ? "Choose a trip and add dates" : "Find your next favorite"}{" "}
            ↗
          </Link>
        </div>
      )}
      {(tab === "My Trips" || tab === "Trip Stories" || tab === "Active Trip") && (
        <div className="grid gap-5 sm:grid-cols-2">
          {currentTrips.map((t) => {
            const d = getDestinationById(t.destinationId);
            return (
              <div key={t.id} className="overflow-hidden rounded-2xl bg-cream">
                <Link to={`/saved/trips/${t.id}${tab === "Trip Stories" ? "/story" : ""}`}>
                  <Photo
                    src={d?.heroPhoto}
                    seed={t.id}
                    alt={d?.city || t.title}
                    className="h-48 w-full"
                    rounded="rounded-none"
                  />
                  <div className="p-4">
                    <p className="eyebrow text-terracotta">{d?.city}</p>
                    <h3 className="mt-1 font-display text-2xl">{t.title}</h3>
                    <p className="mt-2 text-xs text-ink-soft">{getEffectiveItinerary(t.itineraryId)?.days.length || 0} days · {t.startDate || "Add dates in your trip"}</p>
                    <span className="mt-3 inline-block text-xs text-terracotta">
                      {tab === "Trip Stories" ? "Open story ↗" : "Open trip ↗"}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setPending(t.id)}
                  aria-label={`Delete ${t.title}`}
                  className="mb-2 ml-3 flex min-h-11 items-center gap-2 px-2 text-xs text-ink-soft/60"
                >
                  <Trash2 size={13} />
                  Delete trip
                </button>
              </div>
            );
          })}
        </div>
      )}
      {tab === "Saved Destinations" && (
        <div className="grid grid-cols-2 gap-4">
          {dests.map((d) => (
            <div key={d.id}>
              <Link to={`/destinations/${d.slug}`}>
                <Photo
                  src={d.heroPhoto}
                  seed={d.id}
                  alt={d.city}
                  className="h-40 w-full"
                />
                <h3 className="mt-2 font-display text-2xl">{d.city}</h3>
                <p className="text-xs text-terracotta">{d.country}</p>
              </Link>
              <Link className="inline-flex min-h-11 items-center text-xs text-terracotta" to={`/plan?destination=${d.slug}`}>Plan this escape →</Link>
              <button
                onClick={() => {
                  toggleSavedDestination(d.id);
                  setLib(getLibrary());
                }}
                className="flex min-h-11 items-center gap-2 text-xs text-ink-soft/60"
                aria-label={`Unsave ${d.city}`}
              >
                <BookmarkX size={13} />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {tab === "Saved Guides" && (
        <div className="grid gap-5 sm:grid-cols-2">
          {guides.map((g) => (
            <div key={g.id}>
              <StoryCard guide={g} />
              <button
                onClick={() => {
                  toggleSavedGuide(g.id);
                  setLib(getLibrary());
                }}
                className="flex min-h-11 items-center gap-2 text-xs text-ink-soft/60"
                aria-label={`Unsave ${g.title}`}
              >
                <BookmarkX size={13} />
                Remove story
              </button>
            </div>
          ))}
        </div>
      )}
      {tab === "Saved Places" && places.length > 0 && <label className="mb-5 block text-sm">Find your places by city<select className="mt-2 block min-h-11 w-full border border-ink/20 bg-cream p-3" value={selectedCity} onChange={e => { setCity(e.target.value); setPlaceLimit(18); }}><option value="">All cities · {places.length} {places.length === 1 ? 'place' : 'places'}</option>{cities.map(value => <option key={value} value={value}>{value} · {places.filter(p => p.city === value).length}</option>)}</select></label>}
      {tab === "Saved Places" && selectedCity && filteredPlaces.length === 0 && <p className="mb-4 text-sm text-ink-soft">No places saved in {selectedCity} yet. Choose All cities to see your other favorites.</p>}
      {tab === "Saved Places" && (
        <div className="space-y-4">
          {filteredPlaces.slice(0, placeLimit).map((p) => {
            const d = getDestinationForPlace(p),
              photo = getPlacePhoto(p);
            return (
              <div key={p.id} className="rounded-2xl bg-cream p-3">
                <div className="flex gap-3">
                  <figure className="w-24 shrink-0">
                    <Photo
                      src={photo.src}
                      seed={p.id}
                      alt={photo.caption}
                      className="h-24 w-24"
                    />
                    {!p.photos.length && (
                      <figcaption className="mt-1 text-[9px] text-ink-soft/50">
                        City context
                      </figcaption>
                    )}
                  </figure>
                  <div className="min-w-0">
                    <Link to={`/destinations/${d?.slug}`}>
                      <h3 className="font-display text-2xl">{p.name}</h3>
                      <p className="text-xs text-terracotta">{p.city}{p.neighborhood ? ` · ${p.neighborhood}` : ""}</p>
                    </Link>
                    <p className="mt-2 line-clamp-2 text-xs text-ink-soft">{p.pickDetails?.goFor || p.description}</p>
                    <div className="flex flex-wrap items-center gap-3"><AddToTripControl place={p} />{p.mapUrl && <button className="min-h-11 text-xs text-terracotta" onClick={() => openMap(p.mapUrl)}>Open map ↗</button>}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    toggleSavedPlace(p.id);
                    setLib(getLibrary());
                  }}
                  className="mt-1 flex min-h-11 items-center gap-2 text-xs text-ink-soft/60"
                >
                  <BookmarkX size={13} />
                  Remove place
                </button>
              </div>
            );
          })}
        </div>
      )}
      {tab === 'Saved Places' && filteredPlaces.length > placeLimit && <button className="mt-4 min-h-11 border border-ink/20 px-4 text-sm" onClick={() => setPlaceLimit(limit => limit + 18)}>Show more places ({filteredPlaces.length - placeLimit} left)</button>}
      <p className="mt-8 text-center text-xs text-ink-soft/50">
        Saved on this device · no account needed
      </p>
      <ConfirmSheet
        open={!!pending}
        title="Delete this trip?"
        body="The trip will be removed from this device."
        confirmLabel="Delete Trip"
        onCancel={() => setPending(null)}
        onConfirm={() => {
          if (pending) removeTrip(pending);
          setTrips(getSavedTrips());
          setPending(null);
        }}
      />
    </div>
  );
}
