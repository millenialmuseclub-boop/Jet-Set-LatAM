import { TrailLinks } from '@/components/TrailLinks';
import { OutdoorJourneys } from '@/components/OutdoorJourneys';
import { StyleBridge } from '@/components/StyleBridge';
import { destinationStyle } from '@/data/style';
import { RioStoryLinks } from '@/components/RioStoryLinks';
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import {
  guides,
  destinations,
  archivePhotos,
  getMediaMomentsByDestination,
} from "@/data";
import { StoryCard } from "@/components/StoryCard";
import { Photo } from "@/components/Photo";
import { MediaMomentPlayer } from "@/components/MediaMoment";
const categories = [
  "All",
  "Food",
  "Art + Design",
  "Beaches",
  "Nightlife",
  "Shopping",
  "Style",
  "Trails",
  "Outdoors + Journeys",
  "City Guides",
  "Field Notes",
  "Postcards",
  "Weekend Somewhere",
  "Carnival",
];
const sections: Record<string, string[]> = {
  Food: ["eat", "drink"],
  "Art + Design": ["see"],
  Beaches: ["beaches"],
  Nightlife: ["nightlife"],
  Shopping: ["shop"],
  "City Guides": ["stay", "experiences"],
};
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function Explore() {
  const [params, setParams] = useSearchParams();
  const category = categories.includes(params.get("category") || "")
    ? params.get("category")!
    : "All";
  const destination = params.get("destination") || "";
  const query = params.get("q") || "";
  const [limit, setLimit] = useState(18);
  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
    setLimit(18);
  }
  const sorted = [...guides].sort((a, b) =>
    (b.publishedAt || "").localeCompare(a.publishedAt || ""),
  );
  const stories = sorted.filter(
    (g) =>
      (!destination ||
        g.destinationId === destination ||
        g.relatedDestinationIds?.includes(destination)) &&
      (!query ||
        normalize(
          [
            g.title,
            g.dek,
            ...(g.categories || []),
            destinations.find((d) => d.id === g.destinationId)?.city,
          ].join(" "),
        ).includes(normalize(query))) &&
      (!sections[category] || sections[category].includes(g.section)) &&
      (category !== "Field Notes" ||
        /day \d|adventure|pictures|stroll/i.test(g.title)) &&
      (category !== "Weekend Somewhere" ||
        /weekend|day|itinerary|escape/i.test(g.title)),
  );
  const browsing = !query && !destination;
  return (
    <div className="mx-auto max-w-6xl px-5 pb-10 pt-7 md:px-8">
      <div className="mb-6">
        <p className="eyebrow text-terracotta">The travel journal</p>
        <h1 className="mt-2 font-display text-5xl">Go a little deeper.</h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft/70">
          Stories to get lost in. Places to find yourself. Browse the Jet Set
          LatAm archive, one good detour at a time.
        </p>
      </div>
      <nav aria-label="Explore features" className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">{[["Ask Jet Set","/ask"],["Trails","/explore?category=Trails"],["Carnival","/carnival"],["Guides","/explore?category=City+Guides"]].map(([label,to])=><Link key={label} to={to} className="rounded-xl border border-ink/15 bg-cream px-4 py-3 text-center text-sm text-terracotta">{label} →</Link>)}</nav>
      <div className="explore-controls">
        <div className="flex items-center gap-2 rounded-full border border-ink/15 bg-cream px-4">
          <Search size={18} className="shrink-0 text-ink-soft/50" />
          <input
            aria-label="Search stories"
            type="search"
            value={query}
            onChange={(e) => update("q", e.target.value)}
            placeholder="A city, a story, a feeling…"
            className="min-h-12 min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
          {query && (
            <button
              onClick={() => update("q", "")}
              aria-label="Clear search"
              className="p-2"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <label htmlFor="explore-destination" className="sr-only">
            Destination
          </label>
          <select
            id="explore-destination"
            value={destination}
            onChange={(e) => update("destination", e.target.value)}
            className="min-h-11 max-w-full rounded-full border border-ink/15 bg-cream px-4 text-sm"
          >
            <option value="">Every destination</option>
            {destinations
              .filter((d) => d.status !== "coming-soon")
              .map((d) => (
                <option key={d.id} value={d.id}>
                  {d.city}
                </option>
              ))}
          </select>
          <span className="text-xs text-ink-soft/50">
            {guides.length} stories to explore
          </span>
        </div>
        <div
          className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-3"
          aria-label="Story categories"
        >
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => update("category", c === "All" ? "" : c)}
              className={`min-h-10 shrink-0 rounded-full border px-4 text-xs ${category === c ? "border-ink bg-ink text-cream" : "border-ink/15 bg-transparent"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      {(category === "All" || category === "Postcards") && browsing && (
        <section className="my-8">
          <div className="section-heading">
            <h2>Postcards from Cartagena</h2>
            <Link to="/guides/wp-10225">The photo diary ↗</Link>
          </div>
          <div className="photo-rail">
            {archivePhotos.slice(0, 8).map((p) => (
              <Link
                to="/guides/wp-10225"
                key={p.file}
                className="w-[185px] shrink-0 snap-start"
              >
                <Photo
                  src={p.src}
                  seed={p.file}
                  alt={p.caption}
                  className="h-56 w-full"
                />
                <p className="mt-2 line-clamp-2 text-xs text-ink-soft/65">
                  {p.caption}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
      {(category === "All" || category === "Carnival" || destination === "rio-de-janeiro") && !query && (!destination || destination === "rio-de-janeiro") && <RioStoryLinks />}
      {category === "Carnival" && (
        <section className="my-8">
          <p className="eyebrow text-terracotta">Rio de Janeiro · 2025</p>
          <h2 className="mb-4 mt-2 font-display text-3xl">
            From the Sambadrome film diary
          </h2>
          <div className="max-w-md">
            {getMediaMomentsByDestination("rio-de-janeiro").map((m) => (
              <MediaMomentPlayer
                key={m.id}
                moment={m}
                className="aspect-[3/4] w-full"
              />
            ))}
          </div>
          <Link
            to="/destinations/rio-de-janeiro"
            className="mt-4 inline-block text-sm text-terracotta"
          >
            Explore Rio de Janeiro ↗
          </Link>
        </section>
      )}
      {category === "Style" && <section className="mt-7"><p className="mb-5 text-sm text-ink-soft">Plan the trip here. Explore the wardrobe in Luxe Jetter.</p>{!destinations.some(d=>destinationStyle[d.id]&&(!destination||destination===d.id)&&(!query||normalize(d.city+" "+destinationStyle[d.id].headline).includes(normalize(query)))) && <p className="my-6 text-sm">No wardrobe stories match these filters.</p>}<div className="grid gap-5 md:grid-cols-2">{destinations.filter(d=>destinationStyle[d.id]&&(!destination||destination===d.id)&&(!query||normalize(d.city+" "+destinationStyle[d.id].headline).includes(normalize(query)))).map(d=><StyleBridge key={d.id} destination={d}/>)}</div>{(!destination || destination === "rio-de-janeiro") && !query && <div className="mt-5"><StyleBridge destination={destinations.find(d=>d.id === "rio-de-janeiro")!} carnival /></div>}</section>}
      {category === "Outdoors + Journeys" && <OutdoorJourneys destination={destination} query={query} />}
      {category === "Trails" && <TrailLinks query={query} destinationId={destination||undefined}/>}
      {category !== "Trails" && category !== "Carnival" && category !== "Style" && category !== "Outdoors + Journeys" && (
        <section className="mt-7">
          <div className="section-heading">
            <h2>
              {category === "All"
                ? "Latest / The Edit"
                : category === "Nightlife"
                  ? "City After Dark"
                  : category === "Postcards"
                    ? "Stories behind the postcards"
                    : category}
            </h2>
            <span className="text-xs text-ink-soft/60" aria-live="polite">
              {stories.length} stories
            </span>
          </div>
          {stories.length ? (
            <>
              <div className="grid grid-cols-1 gap-x-5 gap-y-8 min-[420px]:grid-cols-2 lg:grid-cols-3">
                {stories.slice(0, limit).map((g) => (
                  <StoryCard key={g.id} guide={g} />
                ))}
              </div>
              {limit < stories.length && (
                <button
                  onClick={() => setLimit((n) => n + 18)}
                  className="mx-auto mt-8 block min-h-12 rounded-full border border-ink/20 px-7 text-sm"
                >
                  More stories ({stories.length - limit} remaining)
                </button>
              )}
            </>
          ) : (
            <div className="rounded-2xl bg-cream p-8 text-center">
              <h2 className="font-display text-2xl">A different detour?</h2>
              <p className="mt-2 text-sm">No stories match these filters.</p>
              <button
                onClick={() => {
                  setParams({});
                  setLimit(18);
                }}
                className="mt-5 text-sm text-terracotta"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      )}
      {category === "All" && browsing && (
        <section className="mt-10">
          <div className="section-heading">
            <h2>Cartagena In Motion</h2>
            <Link to="/destinations/cartagena">Keep exploring ↗</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {getMediaMomentsByDestination("cartagena").map((m) => (
              <MediaMomentPlayer
                key={m.id}
                moment={m}
                className="aspect-[4/3] w-full"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
