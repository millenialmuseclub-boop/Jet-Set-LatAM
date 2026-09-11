import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { TripCompanions, TripInterest, TripPace, TripQuizAnswers, TripStyle, Itinerary } from '@/types'
import { flagshipDestination, destinations, getPlacesByDestination } from '@/data'
import { generateItinerary } from '@/lib/planner'
import { addUpcomingTrip, saveUserItinerary } from '@/lib/storage'
import { Photo } from '@/components/Photo'
import { ItineraryEditor } from '@/components/ItineraryEditor'
import { Check, Pencil, Baby } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// A destination is offered in the planner only once it has enough real,
// verified Places to generate a useful itinerary without filler — not just
// because it exists in the destinations list. LIVE destinations with 6+
// verified Places qualify automatically (currently Mexico City, Rio de
// Janeiro and Cartagena); GUIDE-tier destinations like Guadalajara are
// excluded on purpose — real content exists, but not enough category
// variety yet for a trip that doesn't lean on filler. Coming-soon stubs
// are excluded automatically since getPlacesByDestination returns an
// empty array for them.
const PLANNER_READY_DESTINATIONS = destinations.filter(
  (d) => d.status === 'live' && getPlacesByDestination(d.id).length >= 6
)

const DAY_OPTIONS = [3, 4, 5, 7]
const COMPANION_OPTIONS: { value: TripCompanions; label: string }[] = [
  { value: 'solo', label: 'Solo' }, { value: 'couple', label: 'Couple' },
  { value: 'friends', label: 'Friends' }, { value: 'family', label: 'Family' },
]
const INTEREST_OPTIONS: { value: TripInterest; label: string }[] = [
  { value: 'food', label: 'Food' }, { value: 'culture', label: 'Culture' },
  { value: 'beach', label: 'Beach' }, { value: 'shopping', label: 'Shopping' },
  { value: 'nightlife', label: 'Nightlife' }, { value: 'relaxation', label: 'Relaxation' },
]
const STYLE_OPTIONS: { value: TripStyle; label: string }[] = [
  { value: 'value', label: 'Value' }, { value: 'comfortable', label: 'Comfortable' }, { value: 'luxe', label: 'Luxe' },
]
const PACE_OPTIONS: { value: TripPace; label: string }[] = [
  { value: 'slow', label: 'Slow' }, { value: 'balanced', label: 'Balanced' }, { value: 'pack-it-in', label: 'Pack It In' },
]

function OptionGrid<T extends string>({
  options, value, onChange, multi,
}: { options: { value: T; label: string }[]; value: T[] | T | null; onChange: (v: T) => void; multi?: boolean }) {
  const isSelected = (v: T) => (multi ? (value as T[]).includes(v) : value === v)
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {options.map((opt) => (
        <motion.button
          key={opt.value}
          whileTap={{ scale: 0.96 }}
          onClick={() => onChange(opt.value)}
          className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
            isSelected(opt.value) ? 'bg-terracotta text-cream' : 'bg-cream text-ink-soft ring-1 ring-ink/10'
          }`}
        >
          {opt.label}
          {isSelected(opt.value) && <Check size={15} />}
        </motion.button>
      ))}
    </div>
  )
}

const STEPS = ['destination', 'days', 'companions', 'interests', 'style', 'pace'] as const

export function PlanTrip() {
  const [params] = useSearchParams()
  const [step, setStep] = useState(0)
  const [destinationId, setDestinationId] = useState<string | null>(() => {
    const fromQuery = params.get('destination')
    const preselected = fromQuery && PLANNER_READY_DESTINATIONS.find((d) => d.slug === fromQuery)
    if (preselected) return preselected.id
    return PLANNER_READY_DESTINATIONS.length === 1 ? PLANNER_READY_DESTINATIONS[0].id : null
  })
  const [days, setDays] = useState<number | null>(null)
  const [companions, setCompanions] = useState<TripCompanions | null>(null)
  const [interests, setInterests] = useState<TripInterest[]>([])
  const [style, setStyle] = useState<TripStyle | null>(null)
  const [pace, setPace] = useState<TripPace | null>(null)
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [savedMsg, setSavedMsg] = useState(false)
  const [editingTitle, setEditingTitle] = useState(false)

  const selectedDestination = destinations.find((d) => d.id === destinationId) ?? flagshipDestination

  const canAdvance = [!!destinationId, days, companions, interests.length > 0, style, pace][step]

  function next() {
    if (step < STEPS.length - 1) return setStep(step + 1)
    const answers: TripQuizAnswers = {
      destinationId: destinationId ?? flagshipDestination.id,
      days: days!, companions: companions!, interests, style: style!, pace: pace!,
    }
    setItinerary(generateItinerary(answers))
  }

  // Saving persists both the trip record (what Saved lists) AND the
  // itinerary's actual day-by-day content — without this, a planner-
  // generated itinerary only ever lived in this page's React state and
  // vanished the moment you navigated away, leaving Saved with no real
  // itinerary to show or edit.
  function saveTrip() {
    if (!itinerary) return
    saveUserItinerary(itinerary)
    addUpcomingTrip({
      id: `trip-${itinerary.id}`,
      itineraryId: itinerary.id,
      destinationId: itinerary.destinationId,
      title: itinerary.title,
      createdAt: new Date().toISOString(),
      status: 'upcoming',
    })
    setSavedMsg(true)
  }

  if (itinerary) {
    return (
      <div className="animate-fade-in mx-auto max-w-3xl space-y-6 px-5 pt-6 pb-6 md:px-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-terracotta">Your Trip</p>
          {editingTitle ? (
            <input
              autoFocus
              value={itinerary.title}
              onChange={(e) => setItinerary({ ...itinerary, title: e.target.value })}
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditingTitle(false)}
              className="w-full border-b-2 border-terracotta bg-transparent font-display text-3xl text-ink outline-none"
            />
          ) : (
            <button onClick={() => setEditingTitle(true)} className="flex items-center gap-2 text-left">
              <h1 className="font-display text-3xl text-ink">{itinerary.title}</h1>
              <Pencil size={15} className="shrink-0 text-ink-soft/40" />
            </button>
          )}
        </div>
        <ItineraryEditor
          itinerary={itinerary}
          onChange={setItinerary}
          fallbackHero={selectedDestination.heroPhoto}
          candidatePlaces={getPlacesByDestination(itinerary.destinationId)}
        />
        <div className="flex gap-3 pt-2">
          <button onClick={() => { setItinerary(null); setStep(0) }} className="flex-1 rounded-full bg-cream py-3 text-sm font-medium text-ink-soft ring-1 ring-ink/10">
            Start over
          </button>
          <button onClick={saveTrip} className="flex-1 rounded-full bg-terracotta py-3 text-sm font-medium text-cream">
            {savedMsg ? 'Saved ✓' : 'Save trip'}
          </button>
        </div>
        <p className="text-center text-[11px] text-ink-soft/40">
          Assembled from the Jet Set LatAm {selectedDestination.city} Place database — not AI-generated. Hover an activity to reorder, swap or remove it.
        </p>
        {itinerary.answers?.companions === 'family' && (
          <div className="flex items-center gap-2.5 rounded-2xl bg-jungle/10 p-3.5 ring-1 ring-jungle/15">
            <Baby size={16} className="shrink-0 text-jungle" />
            <p className="text-xs leading-relaxed text-ink-soft/70">
              Traveling with kids — <span className="font-medium text-ink">Little Jetter</span> (coming soon) will help you prep and pack for this one.
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-5 pt-0 pb-6 md:px-8">
      <div className="relative -mx-5 mb-6 overflow-hidden md:mx-0 md:rounded-3xl">
        <Photo src={selectedDestination.heroPhoto} seed={selectedDestination.id} alt="" className="h-40 w-full" rounded="rounded-none" />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 to-ink/10 p-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-light">Let's Go Somewhere</p>
          <p className="font-display text-2xl text-cream">
            {destinationId ? `Build a ${selectedDestination.city} trip from places Jet Set LatAm actually recommends.` : 'Build a trip from places Jet Set LatAm actually recommends.'}
          </p>
        </div>
      </div>

      <div className="mb-6 flex gap-1.5">
        {STEPS.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-terracotta' : 'bg-ink/10'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          className="space-y-8"
        >
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl text-ink">Where to?</h2>
              <div className="grid grid-cols-2 gap-3">
                {PLANNER_READY_DESTINATIONS.map((d) => (
                  <motion.button
                    key={d.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setDestinationId(d.id)}
                    className={`relative overflow-hidden rounded-2xl text-left ${destinationId === d.id ? 'ring-2 ring-terracotta' : ''}`}
                  >
                    <Photo src={d.heroPhoto} seed={d.id} alt={d.city} className="h-28 w-full" rounded="rounded-none" />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 to-transparent p-3">
                      <p className="font-display text-lg leading-tight text-cream">{d.city}</p>
                    </div>
                    {destinationId === d.id && (
                      <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-terracotta text-cream">
                        <Check size={14} />
                      </span>
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
                  <motion.button whileTap={{ scale: 0.94 }} key={d} onClick={() => setDays(d)} className={`rounded-xl py-4 text-center text-sm font-medium ${days === d ? 'bg-terracotta text-cream' : 'bg-cream text-ink-soft ring-1 ring-ink/10'}`}>
                    {d}d
                  </motion.button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl text-ink">Who's going?</h2>
              <OptionGrid options={COMPANION_OPTIONS} value={companions} onChange={setCompanions} />
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl text-ink">What matters most?</h2>
              <p className="text-xs text-ink-soft/60">Select all that apply</p>
              <OptionGrid
                options={INTEREST_OPTIONS}
                value={interests}
                multi
                onChange={(v) => setInterests((cur) => cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v])}
              />
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl text-ink">Trip style</h2>
              <OptionGrid options={STYLE_OPTIONS} value={style} onChange={setStyle} />
            </div>
          )}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl text-ink">Pace</h2>
              <OptionGrid options={PACE_OPTIONS} value={pace} onChange={setPace} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="rounded-full bg-cream px-5 py-3 text-sm font-medium text-ink-soft ring-1 ring-ink/10">
            Back
          </button>
        )}
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={!canAdvance}
          onClick={next}
          className="flex-1 rounded-full bg-terracotta py-3 text-sm font-medium text-cream disabled:opacity-30"
        >
          {step === STEPS.length - 1 ? 'Build my itinerary' : 'Continue'}
        </motion.button>
      </div>
    </div>
  )
}
