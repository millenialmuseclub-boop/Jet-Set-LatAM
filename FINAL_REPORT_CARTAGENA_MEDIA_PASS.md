# Cartagena Media Pass — Final Report

Scope for this pass: build a real, honest Cartagena video/photo editorial
feature from the 5 files Jordann actually sent (which turned out to be
Cartagena, not Rio Carnival — confirmed with her directly), and build the
underlying media architecture generically so it's ready for real Rio
Carnival footage later. Build 5 (signing/Codemagic/TestFlight) was
untouched, per instructions.

## CARTAGENA MEDIA

**What was added:**
- 3 new real photos in `src/assets/cartagena/` — Jordann's own phone
  photography from her Cartagena trip, sent directly (not stock, not the
  WordPress archive): `cartagena-clocktower-sunset.jpg` (Torre del Reloj +
  cathedral dome at sunset), `cartagena-taco-stand-sunset.jpg` (a seafood/
  ceviche stand on the waterfront promenade at sunset — "La Torre" signage
  is visible in the source photo but I could not verify it as a specific,
  already-documented business in this dataset via search, so the app
  copy stays generic: "a seafood stand on the waterfront promenade"),
  `cartagena-wedding-setup-fort.jpg` (white chairs + floral arrangements on
  a fort rampart/rooftop at dusk — captioned generically as "an event set
  up on the fort walls," not attributed to any specific venue or occasion
  I can't confirm).
- 2 real video clips in `src/assets/cartagena/video/`, transcoded from the
  source `.mov` files (see MEDIA MODEL below for exact sizes) with
  generated poster frames (a single representative still per clip, hand-
  picked after inspecting several candidate frames — not a random/blurry
  grab).

**Where it appears in the UI:**
- Cartagena destination page (`/#/destinations/cartagena`, Overview tab) —
  a new "Cartagena In Motion" section directly below the existing
  "Postcards From Cartagena" gallery: the 2 videos side-by-side, then the
  3 new photos in a mixed layout, with honest, factual captions (e.g. "A
  folkloric dance procession in the Walled City," "An evening on a
  Getsemaní terrace," "Golden hour over the Torre del Reloj").
- Discover page — a compact "Cartagena In Motion" teaser module (the 2
  videos + a "Full gallery" link to the Cartagena page), placed near the
  other destination-essay modules (Postcards From Mexico City, Rio After
  Dark, Postcards From São Paulo) and before "Weekend Somewhere."

**Honesty checks applied:** the dance clip is never labeled "Carnival" —
it isn't dated or confirmed as any specific named event, so it's described
only as a "folkloric dance procession" in "traditional dress." No event
names, venues, or dates are invented anywhere in the new copy.

## MEDIA MODEL

New, destination-agnostic `MediaMoment` type in `src/types/index.ts`:
id, destinationId, year, caption, optional dek, videoSrc, posterSrc,
durationSeconds, orientation, `source: 'user-footage' | 'archive' |
'stock'` (both current clips are honestly `'user-footage'`),
relatedGuideIds/relatedPlaceIds, autoplayMuted, tapToPlay.

Data lives in `src/data/media.ts` (`cartagenaMediaMoments`, aggregated into
a destination-agnostic `mediaMoments` array and `getMediaMomentsByDestination()`
helper) — a `rioMediaMoments` array can be added there later using the exact
same shape once real Rio Carnival footage exists.

Player component: `src/components/MediaMoment.tsx` (`MediaMomentPlayer`) —
lazy-mounts the `<video>` element only once scrolled into view (poster
`<img loading="lazy">` until then), autoplays muted while in view, tap
toggles sound, and a module-level singleton ensures only one video plays
across the whole app at a time (starting a new one pauses whichever was
previously playing).

**Video processing (ffmpeg/ffprobe):**

| Clip | Original (.mov, HEVC 1080x1920) | Processed (.mp4, H.264 720x1280) |
|---|---|---|
| Getsemaní plaza terrace (6.6s) | 9.63 MB | **5.04 MB** |
| Palenquera parade street (21.9s) | 31.10 MB | **6.99 MB** |

Both encoded with libx264, CRF 26–29, capped bitrate on the longer clip,
96kbps AAC audio kept (ambient street/plaza sound, muted by default in the
UI, unmuted on tap), `faststart` for streaming playback. Poster JPGs are
89–156 KB each. Total new video+poster footprint: ~12.3 MB — reasonable
for two short vertical clips in a mobile bundle.

## DESTINATIONS

Checked `thebrunchmanifesto.blog` for new content on Cartagena, Buenos
Aires, São Paulo and Guadalajara (time-boxed, per instructions):
- Found and added 2 real, addressed, verifiable São Paulo Jardins
  boutiques not previously in the dataset: **Martha Medeiros** (Brazilian
  lace couture, Rua Melo Alves 248) and **Ara Vartanian** (fine jewelry,
  NK Store, Rua Haddock Lobo 1592) — `src/data/destinations/sao-paulo.ts`,
  São Paulo now at 23 verified Places (was 21).
- A new September 2026 Cartagena article covers a boutique
  (Agua by Agua Bendita) already in the dataset — no new Place needed.
- Buenos Aires and Guadalajara: nothing new surfaced beyond what earlier
  passes already captured.
- Did not attempt a full per-post deep-mine of any destination (e.g. the
  previously-flagged Playa del Carmen opportunity) — out of scope for a
  media-focused pass.
- See `docs/CONTENT_INVENTORY.md` for the full, dated writeup.

## DISCOVER

Added the "Cartagena In Motion" teaser module (described above). Placed it
among the other destination-essay modules rather than at the top, so it
doesn't compete with or duplicate the "Currently Jetting" destination reel
or the Jet Set Picks carousel — it reads as one more curated essay in an
already-established pattern, not a bolted-on feature.

## PERFORMANCE

- `npm run build` succeeds cleanly. The two new video files land in
  `dist/assets/` at 5.04 MB and 6.99 MB (see table above) — the only
  meaningfully large new assets; all new photo assets are 127–275 KB,
  consistent with the rest of the photo archive.
- Lazy loading confirmed: `MediaMomentPlayer` renders only a lazy `<img>`
  poster until its container has intersected the viewport at least once;
  the `<video>` element (and its network request for the actual clip) is
  not mounted before that. No component eagerly loads more than one
  video's poster at page-load time beyond what's already visible in the
  initial viewport.
- The pre-existing "chunk larger than 500 kB" build warning is about the
  main JS bundle and predates this pass (unrelated to the video assets,
  which are separate static files, not JS-bundled).

## MOBILE

Used a local Playwright (playwright-core + the pre-installed Chromium)
harness against `vite preview`, HashRouter-aware URLs (`/#/...`).
Screenshotted and visually reviewed at 390px and 430px:
- `/#/destinations/cartagena` (Overview tab, scrolled to "Cartagena In
  Motion") — poster frames, play icon, duration badge, and caption overlay
  all render cleanly at both widths; no overlap with the sticky bottom nav
  or the tab bar.
- `/#/` (Discover, scrolled to "Cartagena In Motion") — two-column video
  grid, both posters/captions legible, "Full gallery" link doesn't crowd
  the section title, no layout jank at either width.
No visible issues found; no fixes were needed. Scratch screenshot scripts
and images were deleted after review.

## RELEASE READINESS

- Grep sweep for TODO/FIXME/console.log/debugger in all new/changed files:
  none found.
- Grep sweep for "Carnival": only appears in code comments explaining what
  was deliberately *not* built and *not* claimed — never in user-facing
  copy.
- No broken links, no dead imports, no debug controls introduced.

## VALIDATION SUITE

All run from the repo root, all pass clean:
- `npx tsc --noEmit` — clean.
- `npx oxlint` — exits 0 (one pre-existing-pattern warning on the video
  player's play/pause-sync effect, which is exactly what that effect is
  for — synchronizing React with the `<video>` element; not a real issue).
- `npx vite-node scripts/data_integrity_check.mjs` — "No data integrity
  errors found" (Destinations: 8, Places: 115, Guides: 14, Itineraries: 5).
- `npm run build` — succeeds.

`/home/claude/incoming-media/` (the raw source files) has been deleted
after processing/copying what was needed into the repo.

## NEXT STEPS

- **Rio Carnival is still pending real footage from Jordann.** Nothing in
  this pass invents, labels, or claims any content as Rio Carnival — the
  `MediaMoment` type, `src/data/media.ts`, and `MediaMomentPlayer` are all
  generic and ready to take a `rioMediaMoments` array the moment real
  Carnival footage arrives; no Cartagena-specific assumptions are baked in.
- If Jordann can confirm the exact name of the waterfront food stand ("La
  Torre" or otherwise) or the fort-wall event, those captions can be made
  more specific.
- Playa del Carmen remains the most promising destination for a deeper
  content-mining pass (per `docs/CONTENT_INVENTORY.md`), not attempted
  here since this pass was scoped to Cartagena media.

## Git

All work is committed locally to `main`. Nothing was pushed, and
Codemagic/signing/build-number files were not touched.
