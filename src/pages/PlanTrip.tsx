import { WebsitePlanning } from '@/components/WebsitePlanning';
import { CuratingTrip } from '@/components/CuratingTrip';
import { editorialMotion,gentleSpring } from '@/lib/motion';
import { RalliiBridge } from '@/components/RalliiBridge';
import { rio2025 } from '@/data/rio-2025';
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import type {
  TripCompanions,
  TripInterest,
  TripPace,
  TripQuizAnswers,
  TripStyle,
  Itinerary,
} from "@/types";
import {
  getGuidesByDestination,
  flagshipDestination,
  destinations,
  getPlacesByDestination,
} from "@/data";
import { generateItinerary } from "@/lib/planner";
import { addUpcomingTrip, saveUserItinerary } from "@/lib/storage";
import { StoryCard } from "@/components/StoryCard";
import { Photo } from "@/components/Photo";
import { ItineraryEditor } from "@/components/ItineraryEditor";
import {
  Check,
  Pencil,
  Baby,
  User,
  Heart,
  Users,
  Utensils,
  Landmark,
  Waves,
  ShoppingBag,
  Moon,
  Leaf,
  Wallet,
  Coffee,
  Gem,
  Turtle,
  Scale,
  Zap,

} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// A destination is offered in the planner only once it has enough real
// Places to generate a useful itinerary without filler — not just because
// it exists in the destinations list. LIVE destinations with 6+ Places
// qualify automatically (currently Mexico City, Rio de Janeiro, Cartagena
// and São Paulo); "Places" here includes both Jet Set Picks (Jordann's own
// firsthand recommendations) and Verified Places (real, independently
// researched, sourceUrl-cited places not yet personally covered) — see
// src/data/destinations/sao-paulo.ts for the isJetSetPick distinction.
// GUIDE-tier destinations like Guadalajara are excluded on purpose — real
// content exists, but not enough category variety yet for a trip that
// doesn't lean on filler. Coming-soon stubs are excluded automatically
// since getPlacesByDestination returns an empty array for them.
const PLANNER_READY_DESTINATIONS = destinations.filter(
  (d) => d.status === "live" && getPlacesByDestination(d.id).length >= 6,
);

const DAY_OPTIONS = [3, 4, 5, 7];
const COMPANION_OPTIONS: {
  value: TripCompanions;
  label: string;
  icon: typeof User;
}[] = [
  { value: "solo", label: "Solo", icon: User },
  { value: "couple", label: "Couple", icon: Heart },
  { value: "friends", label: "Friends", icon: Users },
  { value: "family", label: "Family", icon: Baby },
];
const INTEREST_OPTIONS: {
  value: TripInterest;
  label: string;
  icon: typeof User;
}[] = [
  { value: "food", label: "Food", icon: Utensils },
  { value: "culture", label: "Culture", icon: Landmark },
  { value: "beach", label: "Beach", icon: Waves },
  { value: "shopping", label: "Shopping", icon: ShoppingBag },
  { value: "nightlife", label: "Nightlife", icon: Moon },
  { value: "relaxation", label: "Relaxation", icon: Leaf },
];
const STYLE_OPTIONS: {
  value: TripStyle;
  label: string;
  icon: typeof User;
  hint: string;
}[] = [
  {
    value: "value",
    label: "Value",
    icon: Wallet,
    hint: "Smart picks, real experiences",
  },
  {
    value: "comfortable",
    label: "Comfortable",
    icon: Coffee,
    hint: "A balance of nice and easy",
  },
  { value: "luxe", label: "Luxe", icon: Gem, hint: "The best of the best" },
];
const PACE_OPTIONS: {
  value: TripPace;
  label: string;
  icon: typeof User;
  hint: string;
}[] = [
  {
    value: "slow",
    label: "Slow",
    icon: Turtle,
    hint: "3 activities a day, room to wander",
  },
  {
    value: "balanced",
    label: "Balanced",
    icon: Scale,
    hint: "4 activities a day",
  },
  {
    value: "pack-it-in",
    label: "Pack It In",
    icon: Zap,
    hint: "6 activities a day, go go go",
  },
];

function OptionGrid<T extends string>({
  options,
  value,
  onChange,
  multi,
  columns = 2,
}: {
  options: { value: T; label: string; icon?: typeof User; hint?: string }[];
  value: T[] | T | null;
  onChange: (v: T) => void;
  multi?: boolean;
  columns?: 2 | 1;
}) {
  const isSelected = (v: T) =>
    multi ? (value as T[]).includes(v) : value === v;
  return (
    <div
      className={`grid gap-2.5 ${columns === 1 ? "grid-cols-1" : "grid-cols-2"}`}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const selected = isSelected(opt.value);
        return (
          <motion.button
            key={opt.value}
            layout
            whileTap={{ scale: 0.985 }}
            onClick={() => onChange(opt.value)}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-medium transition-colors ${
              selected
                ? "bg-terracotta text-cream shadow-sm shadow-terracotta/20"
                : "bg-cream text-ink-soft ring-1 ring-ink/10 active:bg-ink/5"
            }`}
          >
            {Icon && (
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${selected ? "bg-cream/20" : "bg-ink/5"}`}
              >
                <Icon
                  size={16}
                  className={selected ? "text-cream" : "text-terracotta"}
                />
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="block leading-tight">{opt.label}</span>
              {opt.hint && (
                <span
                  className={`mt-0.5 block text-xs font-normal leading-snug ${selected ? "text-cream/75" : "text-ink-soft/50"}`}
                >
                  {opt.hint}
                </span>
              )}
            </span>
            {selected && <Check size={16} className="motion-check shrink-0" />}
          </motion.button>
        );
      })}
    </div>
  );
}

const STEPS = [
  "destination",
  "days",
  "companions",
  "interests",
  "style",
  "pace",
] as const;
const STEP_LABELS = [
  "Destination",
  "Trip length",
  "Companions",
  "Interests",
  "Style",
  "Pace",
];

export function PlanTrip() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [destinationId, setDestinationId] = useState<string | null>(() => {
    const fromQuery = params.get("destination");
    const preselected =
      fromQuery && PLANNER_READY_DESTINATIONS.find((d) => d.slug === fromQuery);
    if (preselected) return preselected.id;
    return PLANNER_READY_DESTINATIONS.length === 1
      ? PLANNER_READY_DESTINATIONS[0].id
      : null;
  });
  const [days, setDays] = useState<number | null>(null);
  const [companions, setCompanions] = useState<TripCompanions | null>(null);
  const [interests, setInterests] = useState<TripInterest[]>([]);
  const [style, setStyle] = useState<TripStyle | null>(null);
  const [pace, setPace] = useState<TripPace | null>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [generating, setGenerating] = useState(false);

  const selectedDestination =
    destinations.find((d) => d.id === destinationId) ?? flagshipDestination;

  const canAdvance = [
    !!destinationId,
    days,
    companions,
    interests.length > 0,
    style,
    pace,
  ][step];

  function next() {
    if (step < STEPS.length - 1) return setStep(step + 1);
    // A brief, real "curating" beat before the itinerary appears — this is a
    // deterministic, near-instant computation, but a trip you'll spend real
    // money on should feel considered, not spat out. Kept short on purpose.
    setGenerating(true);
    const answers: TripQuizAnswers = {
      destinationId: destinationId ?? flagshipDestination.id,
      days: days!,
      companions: companions!,
      interests,
      style: style!,
      pace: pace!,
    };
    window.setTimeout(() => {
      setItinerary(generateItinerary(answers));
      setGenerating(false);
    }, 900);
  }

  // Saving persists both the trip record (what Saved lists) AND the
  // itinerary's actual day-by-day content — without this, a planner-
  // generated itinerary only ever lived in this page's React state and
  // vanished the moment you navigated away, leaving Saved with no real
  // itinerary to show or edit.
  function saveTrip() {
    if (!itinerary) return;
    saveUserItinerary(itinerary);
    addUpcomingTrip({
      id: `trip-${itinerary.id}`,
      itineraryId: itinerary.id,
      destinationId: itinerary.destinationId,
      title: itinerary.title,
      createdAt: new Date().toISOString(),
      status: "upcoming",
    });
    setSavedMsg(true);
  }

  if (generating) return <CuratingTrip destination={selectedDestination}/>;

  if (itinerary) {
    return (
      <div className="animate-fade-in mx-auto max-w-3xl space-y-6 px-5 pt-6 pb-6 md:px-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-terracotta">
            Your Trip
          </p>
          {editingTitle ? (
            <input
              autoFocus
              value={itinerary.title}
              onChange={(e) =>
                setItinerary({ ...itinerary, title: e.target.value })
              }
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
              className="w-full border-b-2 border-terracotta bg-transparent font-display text-3xl text-ink outline-none"
            />
          ) : (
            <button
              onClick={() => setEditingTitle(true)}
              className="flex items-center gap-2 text-left"
            >
              <h1 className="font-display text-3xl text-ink">
                {itinerary.title}
              </h1>
              <Pencil size={15} className="shrink-0 text-ink-soft/40" />
            </button>
          )}
        </div>
        <RalliiBridge destination={selectedDestination} itinerary={itinerary} />
          <ItineraryEditor
          itinerary={itinerary}
          onChange={setItinerary}
          fallbackHero={selectedDestination.heroPhoto}
          candidatePlaces={getPlacesByDestination(itinerary.destinationId)}
        />
        <section>
          <div className="section-heading">
            <h2>Read before you go</h2>
          </div>
          <div className="photo-rail">
            {getGuidesByDestination(selectedDestination.id)
              .slice(0, 3)
              .map((g) => (
                <StoryCard key={g.id} guide={g} compact />
              ))}
          </div>
        </section>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => {
              setItinerary(null);
              setStep(0);
            }}
            className="flex-1 rounded-full bg-cream py-3 text-sm font-medium text-ink-soft ring-1 ring-ink/10"
          >
            Start over
          </button>
          <button
            onClick={saveTrip}
            className="flex-1 rounded-full bg-terracotta py-3 text-sm font-medium text-cream"
          >
            {savedMsg ? "Saved ✓" : "Save trip"}
          </button>
        </div>
        <p className="text-center text-[11px] text-ink-soft/40">
          Assembled from the Jet Set LatAm {selectedDestination.city} Place
          database — not AI-generated. Tap an activity's icons to reorder, swap
          or remove it.
        </p>
        {itinerary.answers?.companions === "family" && (
          <div className="flex items-center gap-2.5 rounded-2xl bg-jungle/10 p-3.5 ring-1 ring-jungle/15">
            <Baby size={16} className="shrink-0 text-jungle" />
            <p className="text-xs leading-relaxed text-ink-soft/70">
              <span className="font-medium text-ink">
                Little Jetters coming too?
              </span>{" "}
              Let them get ready for the trip. Explore Little Jetter.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-5 pt-0 pb-6 md:px-8">
      <div className="relative -mx-5 mb-6 overflow-hidden md:mx-0 md:rounded-3xl">
        <Photo
          src={selectedDestination.id === "rio-de-janeiro" ? rio2025[9].src : selectedDestination.heroPhoto}
          seed={selectedDestination.id}
          alt=""
          className="h-40 w-full"
          rounded="rounded-none"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 to-ink/10 p-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-light">
            Let's Go Somewhere
          </p>
          <p className="font-display text-2xl text-cream">
            {destinationId
              ? `Build a ${selectedDestination.city} trip from places Jet Set LatAm actually recommends.`
              : "Build a trip from places Jet Set LatAm actually recommends."}
          </p>
        </div>
      </div>

      {step === 0 && <WebsitePlanning/>}
      <div className="mb-2 flex items-baseline justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-terracotta">
          Step {step + 1} of {STEPS.length}
        </p>
        <p className="text-[11px] uppercase tracking-[0.1em] text-ink-soft/40">
          {STEP_LABELS[step]}
        </p>
      </div>
      <div className="mb-6 flex gap-1.5">
        {STEPS.map((_, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              backgroundColor:
                i <= step ? "var(--color-terracotta)" : "rgba(26,22,20,0.1)",
            }}
            transition={{ duration: 0.3 }}
            className="h-1.5 flex-1 rounded-full"
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: .8, x: -8 }}
          transition={editorialMotion}
          className="motion-reveal space-y-8"
        >
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl text-ink">Where to?</h2>
              <div className="grid grid-cols-2 gap-3">
                {PLANNER_READY_DESTINATIONS.map((d) => (
                  <motion.button
                    key={d.id}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setDestinationId(d.id)}
                    className={`relative overflow-hidden rounded-2xl text-left transition-shadow ${destinationId === d.id ? "ring-2 ring-terracotta shadow-md shadow-terracotta/20" : "ring-1 ring-ink/5"}`}
                  >
                    <Photo
                      src={d.id === "rio-de-janeiro" ? rio2025[7].src : d.heroPhoto}
                      seed={d.id}
                      alt={d.city}
                      className="h-28 w-full"
                      rounded="rounded-none"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-3">
                      <p className="font-display text-lg leading-tight text-cream">
                        {d.city}
                      </p>
                    </div>
                    {destinationId === d.id && (
                      <motion.span
                        initial={false}
                        transition={gentleSpring}
                        animate={{ scale: 1 }}
                        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-terracotta text-cream"
                      >
                        <Check size={14} className="motion-check" />
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl text-ink">How long?</h2>
              <div className="grid grid-cols-4 gap-2">
                {DAY_OPTIONS.map((d) => (
                  <motion.button
                    whileTap={{ scale: 0.985 }}
                    key={d}
                    onClick={() => setDays(d)}
                    className={`rounded-2xl py-4 text-center text-sm font-medium transition-colors ${days === d ? "bg-terracotta text-cream shadow-sm shadow-terracotta/20" : "bg-cream text-ink-soft ring-1 ring-ink/10 active:bg-ink/5"}`}
                  >
                    <span className="block text-base font-semibold">{d}</span>
                    <span className="block text-[10px] uppercase tracking-wide opacity-70">
                      days
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl text-ink">Who's going?</h2>
              <OptionGrid
                options={COMPANION_OPTIONS}
                value={companions}
                onChange={setCompanions}
              />
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-2xl text-ink">
                  What matters most?
                </h2>
                <p className="mt-1 text-xs text-ink-soft/50">
                  Select all that apply
                </p>
              </div>
              <OptionGrid
                options={INTEREST_OPTIONS}
                value={interests}
                multi
                onChange={(v) =>
                  setInterests((cur) =>
                    cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v],
                  )
                }
              />
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl text-ink">Trip style</h2>
              <OptionGrid
                options={STYLE_OPTIONS}
                value={style}
                onChange={setStyle}
                columns={1}
              />
            </div>
          )}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl text-ink">Pace</h2>
              <OptionGrid
                options={PACE_OPTIONS}
                value={pace}
                onChange={setPace}
                columns={1}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="rounded-full bg-cream px-5 py-3 text-sm font-medium text-ink-soft ring-1 ring-ink/10 active:bg-ink/5"
          >
            Back
          </button>
        )}
        <motion.button
          whileTap={canAdvance ? { scale: 0.97 } : undefined}
          disabled={!canAdvance}
          onClick={next}
          className="flex-1 rounded-full bg-terracotta py-3 text-sm font-medium text-cream shadow-sm shadow-terracotta/20 transition-opacity disabled:opacity-30 disabled:shadow-none"
        >
          {step === STEPS.length - 1 ? "Build my itinerary" : "Continue"}
        </motion.button>
      </div>
    </div>
  );
}

