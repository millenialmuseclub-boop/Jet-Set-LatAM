import { CartagenaShopMyStays } from '@/components/ShopMyEdit'
import { rememberDestination } from '@/lib/travelMemory';
import { finalTravelPhotos } from '@/data/final-travel-photos';
import { WebsitePlanning } from '@/components/WebsitePlanning';
import { appFamily } from '@/config/appFamily';
import { rioCity2025 } from '@/data/rio-city-2025';
import { TrailLinks } from '@/components/TrailLinks';
import { TrenMayaStories } from '@/components/TrenMayaStories';
import { RalliiBridge } from '@/components/RalliiBridge';
import { StyleBridge } from '@/components/StyleBridge';
import { RioStoryLinks } from '@/components/RioStoryLinks';
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StoryCard } from "@/components/StoryCard";
import { archivePhotos, getPlacePhoto } from "@/data";
import {
  getDestinationBySlug,
  getPlacesByDestination,
  getGuidesByDestination,
  getItinerary,
  getMediaMomentsByDestination,
} from "@/data";
import { Photo } from "@/components/Photo";
import { MediaMomentPlayer } from "@/components/MediaMoment";
import { JetSetPickCard } from "@/components/JetSetPickCard";
import { EmptyState } from "@/components/EmptyState";
import { AddToTripControl } from "@/components/AddToTripControl";
import { ShopTheLookCard } from "@/components/ShopTheLookCard";
import { PostcardGallery } from "@/components/PostcardGallery";
import { cdmxPhotos } from "@/assets/cdmx";
import { rioPhotos } from "@/assets/rio";
import { cartagenaPhotos } from "@/assets/cartagena";
import { tulumPhotos } from "@/assets/tulum";
import { saoPauloPhotos } from "@/assets/sao-paulo";
import { playaDelCarmenPhotos } from "@/assets/playa-del-carmen";
import { openExternal, openMap } from "@/lib/links";
import {
  toggleSavedDestination,
  isSavedDestination,
  toggleSavedPlace,
  isSavedPlace,
} from "@/lib/storage";
import {
  Bookmark,
  BookmarkCheck,
  Map,
  Globe,
} from "lucide-react";
import type { GuideSection, Place } from "@/types";

// Places with a real, verified affiliate surface (see ShopTheLookCard) — a
// tiny allowlist rather than a generic "does this place have an offer"
// check, so the ShopMy cards only ever appear next to the place they were
// actually sourced for.
const SHOP_THE_LOOK_PLACE_IDS = new Set(["pl-copacabana-palace"]);

// Destinations with a strong enough wardrobe-relevant editorial framing to
// earn ONE contextual Luxe Jetter mention on the destination page itself —
// not every destination, just where it genuinely fits (colonial-heat
// Cartagena, beach-to-dinner Rio). Luxe Jetter is a published app; its
// deep-link URL isn't wired into appFamily.ts yet, so this stays a
// destination-specific promo mention, same posture as everywhere
// else Luxe Jetter appears.

const TABS: {
  key: GuideSection | "overview" | "neighborhoods";
  label: string;
}[] = [
  { key: "overview", label: "Overview" },
  { key: "shop", label: "Shop" },
  { key: "experiences", label: "Experiences" },
  { key: "see", label: "See" },
  { key: "eat", label: "Eat" },
  { key: "drink", label: "Drink" },
  { key: "stay", label: "Stay" },
  { key: "neighborhoods", label: "Neighborhoods" },
];

function PlaceActions({ place }: { place: Place }) {
  const [saved, setSaved] = useState(() => isSavedPlace(place.id));

  return (
    <div className="-ml-1 mt-1 flex flex-wrap items-center gap-1">
      {place.mapUrl && (
        <button
          onClick={() => openMap(place.mapUrl)}
          className="flex items-center gap-1 rounded-full px-2 py-2 text-[11px] text-ink-soft/60 active:bg-ink/5 active:text-terracotta"
        >
          <Map size={12} /> Map
        </button>
      )}
      {place.website && (
        <button
          onClick={() => openExternal(place.website)}
          className="flex items-center gap-1 rounded-full px-2 py-2 text-[11px] text-ink-soft/60 active:bg-ink/5 active:text-terracotta"
        >
          <Globe size={12} /> Website
        </button>
      )}
      <button
        onClick={() => setSaved(toggleSavedPlace(place.id))}
        className="flex items-center gap-1 rounded-full px-2 py-2 text-[11px] text-ink-soft/60 active:bg-ink/5 active:text-terracotta"
      >
        {saved ? <BookmarkCheck size={12} /> : <Bookmark size={12} />}{" "}
        {saved ? "Saved" : "Save"}
      </button>
      <AddToTripControl place={place} />
    </div>
  );
}

export function DestinationDetail() {
  const { slug } = useParams();
  const [params, setParams] = useSearchParams();
  const destination = slug ? getDestinationBySlug(slug) : undefined;
  const initialTab =
    (params.get("tab") as (typeof TABS)[number]["key"]) || "overview";
  const tab = TABS.some(t => t.key === initialTab) ? initialTab : "overview";
  const [saved, setSaved] = useState(() =>
    destination ? isSavedDestination(destination.id) : false,
  );

  useEffect(()=>{if(destination)rememberDestination(destination.id)},[destination]);

  if (!destination) return <EmptyState title="Destination not found" />;

  const places = getPlacesByDestination(destination.id);
  const guides = getGuidesByDestination(destination.id);
  const picks = places.filter((p) => p.isJetSetPick);
  const mediaMoments = getMediaMomentsByDestination(destination.id);
  const readyMade = destination.itineraryIds.map(getItinerary).filter(Boolean);

  const placesForTab = (section: string) => {
    const catMap: Record<string, string[]> = {
      shop: ["shop"],
      experiences: ["experience", "park", "beach"],
      see: ["landmark", "museum"],
      eat: ["restaurant"],
      drink: ["cafe", "bar", "nightlife"],
      stay: ["hotel"],
    };
    const cats = catMap[section] ?? [];
    return places.filter((p) => cats.includes(p.category));
  };

  return (
    <div className="animate-fade-in pb-6">
      <div className={destination.id === "rio-de-janeiro" ? "rio-dancing-hero relative" : "relative"}>
        <Photo
          src={destination.heroPhoto}
          seed={destination.id}
          alt={destination.city}
          priority
          className={destination.id === "rio-de-janeiro" ? "h-[420px] w-full md:h-[540px]" : "h-72 w-full md:h-[26rem]"}
          rounded="rounded-none"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 pt-16 md:p-14 md:pt-32">
          <div className="mx-auto max-w-5xl">
            <h1 className="font-display text-5xl text-cream md:text-7xl">
              {destination.city}
            </h1>
            <p className="text-sm text-cream/80">{destination.country}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-gold-light">
              Design · Food · Art · Nightlife
            </p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setSaved(toggleSavedDestination(destination.id))}
                className="flex items-center gap-1.5 rounded-full border border-cream/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-cream"
              >
                {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}{" "}
                {saved ? "Saved" : "Save City"}
              </button>
              <Link
                to={`/plan?destination=${destination.slug}`}
                className="rounded-full bg-terracotta px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-cream"
              >
                Plan a Trip
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-[var(--app-header-height)] z-10 flex gap-1 overflow-x-auto bg-parchment/95 px-5 py-3 backdrop-blur-sm md:justify-center md:px-8">
        {TABS.filter(t => t.key === "overview" || t.key === "stay" || (t.key === "neighborhoods" ? destination.neighborhoods.length > 0 : placesForTab(t.key).length > 0)).map((t) => (
          <button
            key={t.key}
            aria-pressed={tab === t.key}
            onClick={() => setParams(previous => { const next = new URLSearchParams(previous); next.set("tab", t.key); return next; }, { replace: true, preventScrollReset: true })}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
              tab === t.key
                ? "bg-terracotta text-cream"
                : "bg-cream text-ink-soft"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-5xl space-y-6 px-5 pt-2 md:px-8">
        {tab === "overview" && destination.id === "rio-de-janeiro" && <RioStoryLinks />}
        {destination.id === "rio-de-janeiro" && (tab === "eat" || tab === "drink") && <Link to="/guides/rio-table-2025" className="my-6 flex items-center gap-5 rounded-2xl bg-cream p-4"><img src={rioCity2025[5].src} alt={rioCity2025[5].caption} loading="lazy" className="h-40 w-28 rounded-xl object-cover"/><div><p className="eyebrow text-terracotta">From our Rio diary</p><h2 className="my-2 font-display text-3xl">A little taste of Rio ↗</h2><p className="text-xs text-ink-soft">A drink and a moment at the table. Venue unconfirmed.</p></div></Link>}
        {tab === "overview" && (
          <div className="space-y-6 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
            <div className="space-y-5 md:col-span-2">
              <p className="text-[15px] leading-relaxed text-ink-soft">
                {destination.content.overview}
              </p>
              {readyMade.length > 0 && readyMade[0] && (
                <Link
                  to={`/plan?destination=${destination.slug}&itinerary=${readyMade[0]!.id}`}
                  className="block rounded-2xl bg-terracotta p-4 text-cream"
                >
                  <p className="text-[11px] uppercase tracking-[0.14em] text-cream/80">
                    Ready-Made Trip
                  </p>
                  <p className="font-display text-xl">{readyMade[0]!.title}</p>
                </Link>
              )}
              {guides.length > 0 && (
                <div className="space-y-2">
                  <p className="font-display text-xl text-ink">
                    From the Journal
                  </p>
                  {guides.slice(0, 2).map((g) => (
                    <Link
                      key={g.id}
                      to={`/guides/${g.id}`}
                      className="flex gap-3 rounded-xl bg-cream p-3 ring-1 ring-ink/5"
                    >
                      <Photo
                        src={g.heroPhoto}
                        seed={g.id}
                        alt={g.title}
                        className="h-24 w-24 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-display text-lg text-ink">
                          {g.title}
                        </p>
                        <p className="line-clamp-1 text-xs text-ink-soft/70">
                          {g.dek}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-5">
              <details className="destination-disclosure rounded-2xl bg-jungle-dark p-4"><summary>Know before you go</summary>
                <p className="text-[11px] uppercase tracking-[0.14em] text-gold-light">
                  Know Before You Go
                </p>
                <dl className="mt-3 space-y-2.5 text-sm text-cream/90">
                  <div>
                    <dt className="text-cream/50">Why go</dt>
                    <dd>{destination.content.whyGo}</dd>
                  </div>
                  {destination.neighborhoods.length > 0 && <div>
                    <dt className="text-cream/50">Neighborhoods</dt>
                    <dd>
                      {destination.neighborhoods.map((n) => n.name).join(", ")}
                    </dd>
                  </div>}
                  {destination.content.bestTime && (
                    <div>
                      <dt className="text-cream/50">Best time to go</dt>
                      <dd>{destination.content.bestTime}</dd>
                    </div>
                  )}
                </dl>
              </details>
            </div>
          </div>
        )}

        {tab === "overview" && guides.length > 2 && (
          <details className="destination-disclosure"><summary>More stories from {destination.city}</summary>
            <div className="section-heading">
              <h2>More from {destination.city}</h2>
              <Link to={"/explore?destination=" + destination.id}>
                All {guides.length} stories ↗
              </Link>
            </div>
            <div className="photo-rail">
              {guides.slice(2, 8).map((g) => (
                <StoryCard key={g.id} guide={g} compact />
              ))}
            </div>
          </details>
        )}
        {tab === "overview" && destination.id === "cartagena" && (
          <section>
            <div className="section-heading">
              <h2>A Caribbean photo diary</h2>
              <Link to="/guides/wp-10225">See all 30 photographs ↗</Link>
            </div>
            <div className="photo-rail">
              {archivePhotos.slice(8, 16).map((p) => (
                <Link
                  key={p.file}
                  to="/guides/wp-10225"
                  className="w-44 shrink-0"
                >
                  <Photo
                    src={p.src}
                    seed={p.file}
                    alt={p.caption}
                    className="h-52 w-full"
                  />
                  <p className="mt-2 line-clamp-2 text-xs text-ink-soft/65">
                    {p.caption}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
        {tab === "overview" && picks.length > 0 && (
          <div className="space-y-3">
            <p className="font-display text-xl text-ink">The Jet Set List</p>
            <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 md:mx-0 md:px-0">
              {picks.map((p) => (
                <JetSetPickCard key={p.id} place={p} />
              ))}
            </div>
          </div>
        )}

        {tab === "overview" && destination.id === "mexico-city" && (
          <PostcardGallery
            title="Postcards From Mexico City"
            images={[
              {
                src: cdmxPhotos.zocalo,
                seed: "pc-zocalo",
                alt: "The Zócalo at dusk",
                caption:
                  "The Zócalo — Mexico City's grand central square, best arriving at sunset or after dark.",
              },
              {
                src: cdmxPhotos.angelIndependencia,
                seed: "pc-angel",
                alt: "Ángel de la Independencia",
              },
              {
                src: cdmxPhotos.plazaGaribaldi,
                seed: "pc-garibaldi",
                alt: "Plaza Garibaldi mariachi",
              },
              {
                src: cdmxPhotos.granHotelDome,
                seed: "pc-hotel-dome",
                alt: "Gran Hotel Ciudad de México stained-glass dome",
                caption:
                  "Gran Hotel Ciudad de México's Tiffany-style stained-glass ceiling — one of the most photographed lobbies in Latin America.",
              },
              {
                src: cdmxPhotos.granHotelAtrium,
                seed: "pc-hotel-atrium",
                alt: "Gran Hotel Ciudad de México atrium",
              },
              {
                src: cdmxPhotos.unamLibrary,
                seed: "pc-unam",
                alt: "Biblioteca Central, UNAM",
              },
              {
                src: cdmxPhotos.folkArtAlebrije,
                seed: "pc-alebrije",
                alt: "Folk art alebrije",
              },
            ]}
          />
        )}

        {tab === "overview" && destination.id === "rio-de-janeiro" && (
          <PostcardGallery
            title="Postcards From Rio de Janeiro"
            images={[...finalTravelPhotos.rio,...([8,1,0,3] as const).map(i=>({src:rioCity2025[i].src,seed:rioCity2025[i].id,alt:rioCity2025[i].caption,caption:rioCity2025[i].caption+' · Jet Set archive, 2025'})),{src:rioPhotos.santaTeresaTram,seed:'rio-centro',alt:'Santa Teresa tram',caption:'Another side of Rio · the city archive'}]}
          />
        )}

        {tab === "overview" && destination.id === "cartagena" && (
          <PostcardGallery
            title="Postcards From Cartagena"
            images={[
              ...finalTravelPhotos.cartagena,
              {
                src: cartagenaPhotos.cartagenaSkyline,
                seed: "pc-cart-skyline",
                alt: "Cartagena skyline from Muelle de la Bodeguita",
                caption:
                  "The modern skyline from Muelle de la Bodeguita — Cartagena in one frame, old and new.",
              },
              {
                src: cartagenaPhotos.walledCityStreet,
                seed: "pc-cart-street",
                alt: "Walled City street",
              },
              {
                src: cartagenaPhotos.palenquerasStreet,
                seed: "pc-cart-palenqueras",
                alt: "Palenqueras street scene",
              },
              {
                src: cartagenaPhotos.walledCityCourtyard,
                seed: "pc-cart-courtyard",
                alt: "Walled City courtyard outside Museo Histórico",
                caption:
                  "A quiet courtyard outside Museo Histórico, in the Walled City's oldest streets.",
              },
              {
                src: cartagenaPhotos.murallasSunset,
                seed: "pc-cart-murallas",
                alt: "Las Murallas at sunset",
              },
            ]}
          />
        )}

        {tab === "overview" &&
          destination.id === "cartagena" &&
          mediaMoments.length > 0 && (
            <section className="space-y-4">
              <div>
                <p className="font-display text-2xl text-ink md:text-3xl">
                  Cartagena In Motion
                </p>
                <p className="text-sm text-ink-soft/60">
                  Real video from a real trip — tap a clip for sound.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {mediaMoments.map((m) => (
                  <MediaMomentPlayer
                    key={m.id}
                    moment={m}
                    className="aspect-[9/16] w-full"
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 overflow-hidden rounded-2xl">
                  <Photo
                    src={cartagenaPhotos.clocktowerSunset}
                    seed="pc-cart-clocktower"
                    alt="Torre del Reloj at sunset"
                    className="h-40 w-full md:h-56"
                    rounded="rounded-2xl"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <Photo
                    src={cartagenaPhotos.weddingSetupFort}
                    seed="pc-cart-fort-event"
                    alt="An event set up on the fort walls at dusk"
                    className="h-40 w-full md:h-56"
                    rounded="rounded-2xl"
                  />
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl">
                <Photo
                  src={cartagenaPhotos.tacoStandSunset}
                  seed="pc-cart-foodstand"
                  alt="A seafood stand on the waterfront promenade at sunset"
                  className="h-44 w-full md:h-64"
                  rounded="rounded-2xl"
                />
              </div>
              <div className="space-y-1 text-xs text-ink-soft/55">
                <p>
                  Golden hour over the Torre del Reloj and the cathedral dome.
                </p>
                <p>
                  An event set up along the fort walls at dusk — colonial
                  rooftops behind it.
                </p>
                <p>
                  A seafood stand glowing on the waterfront promenade as the sun
                  goes down.
                </p>
              </div>
            </section>
          )}

        {/* Rio Carnival — real footage from Jordann's own trip to the
            Sambadrome (Carnaval 2025), verified by the event banner visible
            in-frame. Only one clip exists so far; more may be added here as
            real footage arrives, but this section never pads itself with
            invented moments. Kept as one layer of the Rio page, not a
            takeover — the rest of the destination (beaches, food, art,
            neighborhoods) still leads. */}
        {tab === "overview" &&
          destination.id === "rio-de-janeiro" &&
          mediaMoments.length > 0 && (
            <section className="space-y-4">
              <div>
                <p className="font-display text-2xl text-ink md:text-3xl">
                  Carnaval, As It Actually Felt
                </p>
                <p className="text-sm text-ink-soft/60">
                  Real footage from the Sambadrome — tap for sound.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {mediaMoments.map((m) => (
                  <MediaMomentPlayer
                    key={m.id}
                    moment={m}
                    className="aspect-[9/16] w-full"
                  />
                ))}
              </div>
            </section>
          )}

        {tab === "overview" && destination.id === "tulum" && (
          <PostcardGallery
            title="Postcards From Tulum"
            images={[
              {
                src: tulumPhotos.tulumRuinsCliff,
                seed: "pc-tulum-cliff",
                alt: "Tulum ruins atop the cliff over the sea",
                caption:
                  "The Tulum ruins, cliffside over the Caribbean — from the Jet Set photo archive.",
              },
              {
                src: tulumPhotos.tulumBoardwalkBeach,
                seed: "pc-tulum-boardwalk",
                alt: "Wooden boardwalk to a turquoise beach",
              },
              {
                src: tulumPhotos.tulumRuinsPalm,
                seed: "pc-tulum-palm",
                alt: "Tulum ruins framed by a palm",
              },
            ]}
          />
        )}

        {tab === "overview" && destination.id === "sao-paulo" && (
          <PostcardGallery
            title="Postcards From São Paulo"
            images={[
              ...finalTravelPhotos["sao-paulo"],
              {
                src: saoPauloPhotos.becoDoBatmanBirdMural,
                seed: "pc-sp-bird",
                alt: "Psychedelic bird mural, Beco do Batman",
                caption:
                  "One wall of Beco do Batman, Vila Madalena — repainted often enough that no two visits look the same.",
              },
              {
                src: saoPauloPhotos.becoDoBatmanDragonMural,
                seed: "pc-sp-dragon",
                alt: "Dragon and eye murals, Beco do Batman",
              },
              {
                src: saoPauloPhotos.becoDoBatmanButterflyMural,
                seed: "pc-sp-butterfly",
                alt: "Butterfly mural, Beco do Batman",
                caption:
                  "A monarch mural big enough to pose in front of — one of the alley's most photographed walls.",
              },
              {
                src: saoPauloPhotos.becoDoBatmanGeometricMural,
                seed: "pc-sp-geometric",
                alt: "Geometric face mural, Beco do Batman",
              },
              {
                src: saoPauloPhotos.becoDoBatmanMarketAlley,
                seed: "pc-sp-market",
                alt: "Vendor tables along Beco do Batman",
              },
            ]}
          />
        )}

        {tab === "overview" && destination.id === "playa-del-carmen" && (
          <PostcardGallery
            title="Postcards From Playa del Carmen"
            images={[
              ...finalTravelPhotos["playa-del-carmen"],
              {
                src: playaDelCarmenPhotos.xcaretLagoonCove,
                seed: "pc-pdc-lagoon",
                alt: "Xcaret lagoon cove with palapa restaurant",
                caption:
                  "One of Xcaret's natural lagoons — thatched-roof palapas, dugout canoes, and water calm enough to swim across.",
              },
              {
                src: playaDelCarmenPhotos.xcaretButterflySanctuarySign,
                seed: "pc-pdc-butterfly-sign",
                alt: "Xcaret butterfly sanctuary photo arch",
              },
              {
                src: playaDelCarmenPhotos.xcaretButterflySanctuaryPortrait,
                seed: "pc-pdc-butterfly-portrait",
                alt: "Traveler at the Xcaret butterfly sanctuary",
                caption:
                  '"Your time as a caterpillar has expired, your wings are ready" — bilingual, and one of the park\'s most-photographed corners.',
              },
            ]}
          />
        )}

        {tab === "neighborhoods" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {destination.neighborhoods.map((n) => (
              <div
                key={n.id}
                className="overflow-hidden rounded-2xl bg-cream ring-1 ring-ink/5"
              >
                <Photo
                  src={n.heroPhoto || destination.heroPhoto}
                  seed={n.id}
                  alt={
                    n.heroPhoto
                      ? n.name
                      : `${destination.city} destination context`
                  }
                  className="h-36 w-full"
                  rounded="rounded-none"
                />
                <div className="p-4">
                  <p className="font-display text-xl text-ink">{n.name}</p>
                  {!n.heroPhoto && (
                    <p className="text-[9px] text-ink-soft/50">
                      {destination.city} · destination context
                    </p>
                  )}
                  <p className="mt-1 text-sm text-ink-soft/80">
                    {n.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {["shop", "experiences", "see", "eat", "drink", "stay"].includes(
          tab,
        ) && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {placesForTab(tab).length === 0 ? (
              <div className="md:col-span-2">
                <EmptyState
                  title="Explore the stories"
                  body={`Find more ideas in our ${destination.city} journal.`}
                  action={
                    <Link
                      to={`/explore?destination=${destination.slug}`}
                      className="mt-4 text-sm text-terracotta"
                    >
                      Browse the journal ↗
                    </Link>
                  }
                />
              </div>
            ) : (
              placesForTab(tab).map((p) => (
                <div
                  key={p.id}
                  className="flex gap-3 rounded-2xl bg-cream p-3 ring-1 ring-ink/5"
                >
                  <Photo
                    src={getPlacePhoto(p).src}
                    seed={p.id}
                    alt={getPlacePhoto(p).caption}
                    className="h-20 w-20 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-display text-lg leading-tight text-ink">
                        {p.name}
                      </p>
                      {p.isJetSetPick && (
                        <span className="rounded-full bg-terracotta/10 px-2 py-0.5 text-[9px] uppercase tracking-wide text-terracotta">
                          Pick
                        </span>
                      )}
                    </div>
                    {p.neighborhood && (
                      <p className="text-[11px] uppercase tracking-[0.08em] text-terracotta/80">
                        {p.neighborhood}
                      </p>
                    )}
                    <p className="mt-0.5 line-clamp-2 text-xs text-ink-soft/70">
                      {p.description}
                    </p>
                    {p.practicalNotes && <p className="mt-2 text-xs leading-relaxed text-ink-soft">{p.practicalNotes}</p>}
                    <PlaceActions place={p} />
                    {!p.photos.length && (
                      <p className="text-[9px] text-ink-soft/55">
                        Photo: {p.city} context
                      </p>
                    )}
                    {p.relatedGuideIds?.[0] && (
                      <Link
                        to={`/guides/${p.relatedGuideIds[0]}`}
                        className="mt-2 inline-block text-xs text-terracotta"
                      >
                        Read the supporting story ↗
                      </Link>
                    )}
                    {SHOP_THE_LOOK_PLACE_IDS.has(p.id) && (
                      <div className="mt-3">
                        <ShopTheLookCard placeName={p.name} />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "stay" && <WebsitePlanning />}
        {tab === "eat" && placesForTab('eat').length > 0 && <section className="border-t border-ink/10 py-5"><h2 className="font-display text-2xl">Go deeper into food</h2><p className="my-2 text-sm text-ink-soft">Keep these {destination.city} tables in your trip. For food stories, flavors and traditions beyond this guide, explore Let Them Eat.</p><button className="min-h-11 text-sm text-terracotta" onClick={() => openExternal(appFamily['let-them-eat'].iOSURL)}>Explore Let Them Eat ↗</button></section>}
        {tab === "overview" && <TrailLinks destinationId={destination.id}/>}
        {tab === "overview" && <TrenMayaStories destinationId={destination.id} />}
        {tab === "overview" && <RalliiBridge destination={destination} />}

        {tab === "stay" && destination.id === "cartagena" && <CartagenaShopMyStays/>}
        {tab === "overview" && <StyleBridge destination={destination} />}
      </div>
    </div>
  );
}
