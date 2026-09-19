import { rioCity2025 } from '@/data/rio-city-2025';
import { RalliiBridge } from './RalliiBridge';
import { getDestinationById } from '@/data';
import { rio2025 } from '@/data/rio-2025';
import { useState } from "react";
import type { Itinerary, ItineraryDay, Place } from "@/types";
import { getPlace } from "@/data";
import { Photo } from "./Photo";
import {
  MapPin,
  Trash2,
  ArrowUp,
  ArrowDown,
  Shuffle,
  Map,
  Globe,
  Plus,
  X,
  Sparkle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { openExternal, openMap } from "@/lib/links";
import { REPEATABLE_CATEGORIES } from "@/lib/planner";
import { ConfirmSheet } from "./ConfirmSheet";

// Shared day-by-day itinerary UI — used by both Plan a Trip (right after
// generating a trip) and Trip Detail (editing a trip you already saved).
// Fully controlled: the caller owns persistence via onChange.
export function ItineraryEditor({
  itinerary,
  onChange,
  fallbackHero,
  candidatePlaces,
  addablePlaces,
}: {
  itinerary: Itinerary;
  onChange: (itinerary: Itinerary) => void;
  fallbackHero?: string;
  /** Verified Places from the destination, used to fill a slot when "Shuffle" is clicked. */
  candidatePlaces: Place[];
  /** When provided, each day gets an "Add a saved place" affordance drawing from this list
   *  (e.g. the user's saved Places for this destination not already in the itinerary). */
  addablePlaces?: Place[];
}) {
  const [addingToDay, setAddingToDay] = useState<number | null>(null);
  const [pendingRemoval, setPendingRemoval] = useState<{
    dayIndex: number;
    activityId: string;
    label: string;
  } | null>(null);

  function mutateDay(
    dayIndex: number,
    updater: (day: ItineraryDay) => ItineraryDay,
  ) {
    const days = itinerary.days.map((d, i) =>
      i === dayIndex ? updater(d) : d,
    );
    onChange({ ...itinerary, days });
  }

  function removeActivity(dayIndex: number, activityId: string) {
    mutateDay(dayIndex, (day) => ({
      ...day,
      activities: day.activities.filter((a) => a.id !== activityId),
    }));
  }

  function moveActivity(dayIndex: number, activityId: string, dir: -1 | 1) {
    mutateDay(dayIndex, (day) => {
      const idx = day.activities.findIndex((a) => a.id === activityId);
      const target = idx + dir;
      if (idx < 0 || target < 0 || target >= day.activities.length) return day;
      const activities = [...day.activities];
      [activities[idx], activities[target]] = [
        activities[target],
        activities[idx],
      ];
      return { ...day, activities: activities.map((activity, index) => ({ ...activity, time: day.activities[index].time })) };
    });
  }

  function replaceActivity(dayIndex: number, activityId: string) {
    const usedIds = new Set(
      itinerary.days.flatMap((d) =>
        d.activities.map((a) => a.placeId).filter(Boolean),
      ),
    );
    const current = itinerary.days[dayIndex].activities.find(
      (a) => a.id === activityId,
    );
    const todayIds = new Set(
      itinerary.days[dayIndex].activities.map((a) => a.placeId),
    );
    const pool = candidatePlaces.filter(
      (p) =>
        p.category !== 'hotel' &&
        (itinerary.answers?.companions !== 'family' || !['bar', 'nightlife'].includes(p.category) && !p.tags.some(tag => /tequila|adults.only/i.test(tag))) &&
        !todayIds.has(p.id) &&
        (!["Breakfast", "Lunch", "Dinner"].includes(current?.label || "") ||
          ["cafe", "restaurant"].includes(p.category)),
    );
    // Same semantic-repeat rule as the generator: prefer anything unused
    // trip-wide, and only fall back to a REPEATABLE-category place (never
    // a museum/landmark/restaurant already used elsewhere) before giving
    // up with an intentional free block.
    const candidate =
      pool.find((p) => !usedIds.has(p.id)) ??
      pool.find(
        (p) => usedIds.has(p.id) && REPEATABLE_CATEGORIES.has(p.category),
      );
    mutateDay(dayIndex, (day) => ({
      ...day,
      activities: day.activities.map((a) =>
        a.id === activityId
          ? candidate
            ? { ...a, placeId: candidate.id, notes: undefined }
            : {
                ...a,
                placeId: undefined,
                label: "Free Time",
                notes:
                  "Nothing left to swap in without repeating a museum, landmark or dinner spot — explore this neighborhood at your own pace instead.",
              }
          : a,
      ),
    }));
  }

  function addPlaceToDay(dayIndex: number, placeId: string) {
    mutateDay(dayIndex, (day) => ({
      ...day,
      activities: [
        ...day.activities,
        {
          id: `act-added-${placeId}-${Date.now()}`,
          time: "Flexible",
          label: "Added from Saved",
          placeId,
        },
      ],
    }));
    setAddingToDay(null);
  }

  return (
    <div className="space-y-6">
      <ConfirmSheet
        open={!!pendingRemoval}
        title="Remove this from the trip?"
        body={
          pendingRemoval
            ? `"${pendingRemoval.label}" will come out of this day's plan. You can add it back from Saved Places any time.`
            : undefined
        }
        confirmLabel="Remove"
        onCancel={() => setPendingRemoval(null)}
        onConfirm={() => {
          if (pendingRemoval)
            removeActivity(pendingRemoval.dayIndex, pendingRemoval.activityId);
          setPendingRemoval(null);
        }}
      />
      {itinerary.days.map((day, dayIndex) => {
        const dayPhoto = day.activities
          .map((a) => (a.placeId ? getPlace(a.placeId)?.photos[0] : undefined))
          .find(Boolean);
        return (
          <div
            key={day.day}
            className="itinerary-day overflow-hidden rounded-2xl bg-cream ring-1 ring-ink/5"
          >
            <div className="relative">
              <Photo
                src={dayPhoto ?? (itinerary.destinationId === "rio-de-janeiro" && day.activities.some(a => a.placeId && ["museum", "landmark"].includes(getPlace(a.placeId)?.category || "")) ? rio2025[dayIndex % 2 ? 7 : 9].src : itinerary.destinationId === "rio-de-janeiro" ? rioCity2025[[8,3,2][dayIndex % 3]].src : fallbackHero)}
                seed={`day-${day.day}`}
                alt={day.theme}
                className="h-24 w-full"
                rounded="rounded-none"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 to-transparent p-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-gold-light">
                    Day {day.day}
                  </p>
                  <p className="font-display text-xl leading-tight text-cream">
                    {day.theme}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-0 px-4 py-3">
              <AnimatePresence initial={false}>
                {day.activities.map((a, i) => {
                  const place = a.placeId ? getPlace(a.placeId) : undefined;
                  const isLast = i === day.activities.length - 1;
                  return (
                    <motion.div
                      key={a.id}
                      layout
                      initial={false}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="itinerary-row group relative"
                    >
                      <div className="flex w-14 shrink-0 flex-col items-center pt-0.5">
                        <span className="text-[11px] font-medium tabular-nums text-ink-soft/60">
                          {a.time}
                        </span>
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-terracotta" />
                        {!isLast && (
                          <span className="mt-1 w-px flex-1 bg-ink/10" />
                        )}
                      </div>

                      {place && getDestinationById(itinerary.destinationId) && <RalliiBridge compact destination={getDestinationById(itinerary.destinationId)!} itinerary={itinerary} placeId={place.id} />}
                      {place?.photos[0] && (
                        <Photo
                          src={place.photos[0]}
                          seed={place.id}
                          alt={place.name}
                          className="activity-photo h-11 w-11 shrink-0"
                        />
                      )}
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="text-[10px] uppercase tracking-[0.1em] text-terracotta/80">
                          {a.label}
                        </p>
                        {place ? (
                          <>
                            <p className="flex items-center gap-1 text-sm font-medium leading-tight text-ink">
                              {place.name}
                              {place.isJetSetPick && (
                                <span title="A Jordann/blog firsthand recommendation, not just a verified place">
                                  <Sparkle
                                    size={11}
                                    className="shrink-0 fill-gold text-gold"
                                  />
                                </span>
                              )}
                            </p>
                            <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft/60">
                              <MapPin size={10} />{" "}
                              {place.neighborhood ?? place.city}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm leading-snug text-ink-soft/70">
                            {a.notes}
                          </p>
                        )}
                        {place && (a.notes || place.practicalNotes) && <p className="mt-2 text-xs leading-relaxed text-ink-soft">{a.notes || place.practicalNotes}</p>}
                        <details className="mt-2 text-xs text-ink-soft">
                          <summary className="cursor-pointer py-2">Edit time &amp; personal notes</summary>
                          <label className="block">Time<input aria-label={`Time for ${place?.name || a.label}`} value={a.time} maxLength={30} className="my-1 block min-h-11 w-full border border-ink/20 bg-parchment p-2" onChange={e => mutateDay(dayIndex, d => ({...d, activities:d.activities.map(item => item.id === a.id ? {...item,time:e.target.value} : item)}))}/></label>
                          <label className="block">Notes<textarea aria-label={`Notes for ${place?.name || a.label}`} value={a.notes || ''} maxLength={1000} className="my-1 block w-full border border-ink/20 bg-parchment p-2" onChange={e => mutateDay(dayIndex, d => ({...d, activities:d.activities.map(item => item.id === a.id ? {...item,notes:e.target.value} : item)}))}/></label>
                        </details>
                      </div>
                      <div className="activity-controls flex flex-wrap items-start gap-0.5">
                        {place?.mapUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openMap(place.mapUrl);
                            }}
                            className="flex h-11 w-11 items-center justify-center rounded-full text-ink-soft/60 active:bg-ink/5 active:text-terracotta"
                            aria-label={`Open ${place.name} in Maps`}
                          >
                            <Map size={14} />
                          </button>
                        )}
                        {place?.website && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openExternal(place.website);
                            }}
                            className="flex h-11 w-11 items-center justify-center rounded-full text-ink-soft/60 active:bg-ink/5 active:text-terracotta"
                            aria-label={`Open ${place.name}'s website`}
                          >
                            <Globe size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => moveActivity(dayIndex, a.id, -1)}
                          disabled={i === 0}
                          aria-label="Move earlier"
                          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-soft/60 active:bg-ink/5 active:text-ink disabled:opacity-20"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          onClick={() => moveActivity(dayIndex, a.id, 1)}
                          disabled={isLast}
                          aria-label="Move later"
                          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-soft/60 active:bg-ink/5 active:text-ink disabled:opacity-20"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          onClick={() => replaceActivity(dayIndex, a.id)}
                          aria-label="Swap for another place"
                          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-soft/60 active:bg-ink/5 active:text-terracotta"
                        >
                          <Shuffle size={14} />
                        </button>
                        <button
                          onClick={() =>
                            setPendingRemoval({
                              dayIndex,
                              activityId: a.id,
                              label: place?.name ?? a.label,
                            })
                          }
                          aria-label="Remove from itinerary"
                          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-soft/60 active:bg-red-500/10 active:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {addablePlaces &&
                addablePlaces.length > 0 &&
                (addingToDay === dayIndex ? (
                  <div className="mt-1 space-y-1.5 rounded-xl bg-parchment p-2.5">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-[0.1em] text-ink-soft/50">
                        Add a saved place
                      </p>
                      <button
                        onClick={() => setAddingToDay(null)}
                        aria-label="Close saved places"
                        className="min-h-11 min-w-11 text-ink-soft/40 hover:text-ink"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    {addablePlaces.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => addPlaceToDay(dayIndex, p.id)}
                        className="block w-full rounded-lg bg-cream px-2.5 py-1.5 text-left text-xs text-ink hover:bg-terracotta hover:text-cream"
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingToDay(dayIndex)}
                    className="mt-1 flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.08em] text-terracotta"
                  >
                    <Plus size={12} /> Add a saved place
                  </button>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
