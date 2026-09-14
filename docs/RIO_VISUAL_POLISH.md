# Rio visual polish — completed local pass

## New photos
Ingested 10 beach/city files. Original images: **3.81 MB → 1.09 MB** WebP derivatives (71.4% reduction). Originals and supplied ZIP remain unchanged. Eight photographs are used; two files with embedded black borders/phone interface are cataloged but excluded from visible layouts.
Sambadrome batch from the preceding pass: 10 photos, **7.23 MB → 3.44 MB**. Both newer batches total **11.04 MB → 4.53 MB**. Registry records source hashes, dimensions, orientation, focal points, candidacy, related guides and confirmed place associations.

## Discover
Section order, cards, navigation and hierarchy remain. Carnival opening retains its height and archive attribution, Enter Carnival CTA, short gold rule/glow, brief glints and jewel-toned entry particles. Existing motion settles the image and introduces type/CTA without blocking interaction. The user-requested replacement for the middle Plan Something block is a beach-photo postcard with editorial italic type: Make room for a getaway. One direct Plan your trip link replaces the generic solid-color icon panel in the same position.

## Carnival
Eleven distinct stills now appear in the main essay: nine Sambadrome photographs and two street-Carnival photographs, plus the existing film. Daytime streets lead into After dark, spectacle, personal moments and float details. No school, float theme or bloco identity was inferred.

## Rio and destination heroes
The Destinations collection now has a beach-day cover. Rio's detail page has a taller sunset/mountain hero, gently swaying once over nine seconds, with a brief warm light sweep. The motion stops and reduced motion removes it. Existing tabs and information architecture remain.
Rio's postcard sequence mixes beach, Cristo, personal table imagery, dusk and existing Santa Teresa imagery. Two guides enrich Explore: Rio, Between the Celebrations and A Little Taste of Rio. Eat and Drink surface the latter as editorial context, with venue explicitly unconfirmed. Christ the Redeemer photography is attached to existing pl-christ-redeemer, not a duplicate Place.
Fixed a QA finding: destination tab selection now follows URL query changes rather than keeping stale component state.

## Image-role map
- Discover hero: Sambadrome 3 (pink/green spectacle).
- Carnival hero: Sambadrome 4 (green/silver parade).
- Discover lower Carnival card: Sambadrome 7 (night beams).
- Destinations collection: city 8 (beach day).
- Rio detail hero: city 2 (sunset/mountains).
- Trip Detail: city 3 (dusk lights).
- Explore quiet-Rio guide: city 8; drinks guide: city 5.
- Rio landmark: city 1 (Cristo).
- Normal Rio style handoff: city 7 (personal beach postcard).
- Carnival style handoff: Sambadrome 5 (blue/gold float).

## Other surfaces
Planner day headers vary Rio context images while retaining real place photos when available. Saved destination/trip imagery picks up the new Rio photography; Trip Detail has its own dusk image. Trip Story can draw from the new guide archive and landmark media and continues to explicitly distinguish planned from confirmed visits. No visits are auto-confirmed. Rio style handoffs use atmospheric photos; product commerce stays in Luxe Jetter. Rallii coverage gating and existing Carnival date gating are retained.

## Mobile QA
At 390 and 430: captured Home, middle planner postcard, Destinations collection, Rio destination, Eat/Drink feature, Explore, both new guides, Plan Rio, generated itinerary, Saved trip, Trip Detail, Trip Story, Carnival entry/detail, Now, Trail and style constellation. Inspected contact sheets at both widths and full-size Rio/Drink screens. No horizontal overflow or page errors in the full flow; new essay photos load. Plan generation, reorder, Save, postcard-to-plan link, Drink-to-guide link and URL tab selection pass. Reduced motion disables Rio sway and Carnival effects; observer fallback leaves content visible. Existing bottom navigation remains Discover / Destinations / Plan, with Saved in More.

QA files: C:/Users/Jordann Lopez/Documents/ChatGPT/Portfolio/jetset20/rio-final-qa
Contact sheets: C:/Users/Jordann Lopez/Documents/ChatGPT/Portfolio/rio-review-390.png and rio-review-430.png

## Validation
Typecheck, lint and production build passed. Content integrity, archive links and 180 planner scenarios passed. Lifecycle/trip-truth checks, style handoff checks and Rallii/Tren Maya checks passed. Final Capacitor iOS sync passed locally.

## Performance
Compared with the interim pre-beach pass: JS gzip **318.62 → 320.76 kB** (+2.14 kB); CSS gzip **13.39 → 13.72 kB** (+0.33 kB). New optimized image assets add 1.09 MB to the bundle, loaded lazily except visible hero images. No new runtime dependency.
Three alternating desktop browser runs: static control median 8.3 ms / p95 8.5–8.7 ms; motion median 8.3 ms / p95 8.8–8.9 ms. Both recorded zero frames above 50 ms and zero long tasks. This is a desktop browser measurement, not physical iPhone certification. Existing large-JS-chunk warning remains.

## Release
Ready for the next TestFlight build: **yes, local checks passed**. No push, build-number bump or TestFlight upload performed in this pass, as requested. Native device review remains part of the next release.
