# Jet Set Shopping Notes

The bundled app uses `src/data/shopping-notes.generated.json`. It never fetches WordPress or a master record at startup. No approved masters were supplied for this release: **zero Shopping Notes imports**. The existing Jardins article (`wp-8659`) remains untouched.

## Editorial workflow

1. Copy `master.template.json` into `masters/<guide-id>.json`. Keep the template outside `masters/`. Retain research, unresolved questions, price evidence, firsthand notes and the change log in this master.
2. Reuse the app's destination and Place IDs. The Jardins pilot must use **`wp-8659`**, `sao-paulo`, city `São Paulo`, country `Brazil`. The existing article is background, not proof of current business status or a visit.
3. Once reviewed, set `recordType: "editorial-master"`, `status: "approved"`, and `appAdaptation.exportStatus: "approved"`. Increment `revision` whenever approved content changes. Keep missing facts null; do not substitute estimates.
4. Run `node scripts/import-shopping-notes.mjs` for a dry run. Run `node scripts/check-shopping-notes.mjs` for validation regression tests. Use `node scripts/import-shopping-notes.mjs --write` only after editorial approval. All records validate before the generated file is replaced; the master then records `publication.appRevision`. This is an import revision, **not** proof of an OTA deployment.
5. Review the generated diff and run the content, photography, build and OTA checks. Publication remains the existing separate OTA release process.

Keep `masters/.gitkeep` so an empty master directory works in a fresh checkout. Drafts should be kept outside `masters/`: the importer rejects rather than silently skips unapproved files. Removing a previously imported master is rejected to avoid accidentally removing a saved guide. Existing canonical Place data is reused without overwriting its editorial status, offers or details. Changes to an existing canonical business require an explicit reviewed edit in its owning data file. Previous generated places remain available for saved references.

## Evidence contract

Each place requires `status: "verified"`, `verification.checkedAt` and dated evidence objects:

```json
{"field":"businessStatus","sourceUrl":"https://official-business.example/","checkedAt":"2026-09-27"}
```

This is a schema illustration, not a verified source. Accepted evidence fields must cover each populated fact: `businessStatus`, `productCategories`, `website`, `address`, `mapUrl`, `mapPin`, `coordinates`, `hoursNote`, `appointmentNote`, `accessibilityNote`, `priceLevel`. Dates must be real, non-future ISO dates. Business status and product categories must be resolved before publication. An otherwise verified business with an unresolved address can be included **without** address, coordinates, map URL or walking legs. Unresolved questions remain in the master.

`firsthandNotes` entries require `{id, note, author, visitedAt}`; every `firsthandNoteIds` reference must resolve. A firsthand editorial basis requires documented notes. `priceSnapshots` require `{item, amount, currency, checkedAt, sourceUrl}`; prices remain evidence in the master, not silently inferred app price levels. Prices/hours are never populated by the importer. Editorial truth still requires human review: a validator cannot determine whether a source really substantiates a claim.

Every imported business has `isJetSetPick: false`. Offers live in the separate `offer` object; affiliate URLs require a disclosure. URL strings are copied byte for byte, retaining query order and tracking escapes. Generated business matching uses normalized name/city/country, stable IDs and shared website/address checks. Distinct branches should have distinct stable IDs and clearly disambiguated names.

## Stops, media and routes

- `appAdaptation` requires title, dek, body, section `shop`, canonical `sourceUrl`, unique `placeIds`, related guide IDs and `coverGuideId`. Reuse **`wp-8659`** as the pilot's cover source. New covers need a reviewed bundled asset assignment; the importer intentionally rejects arbitrary remote media. `media` and place `photos` stay empty in this first importer. Do not duplicate a current Journal cover for a new guide: use the existing photography checks when reviewing the import.
- Every place has one consecutively numbered stop `{number, placeId, reasonToVisit, suggestedBrowseMinutes?}`. `whatToBuy` supplies the shopping focus; a cafe category labels a café pause. `pairWithPlaceId` must resolve inside the guide. The approved `appAdaptation.body` carries the introduction, focus and before-you-go notes. Practical notes carry only evidenced hours/appointment/accessibility facts.
- Unverified routes use `status: "not-verified"` with empty legs/share URLs and no distance or walking estimate. Numbered editorial stops remain useful without a map-ready route.
- A verified route requires `basis: "pedestrian-directions"`, `checkedAt`, `mobileTestedAt`, ordered `stopIds`, and one leg between each adjacent stop. Each leg requires `{fromPlaceId, toPlaceId, walkingMinutes, distanceMeters, sourceUrl, checkedAt}`. Every endpoint requires verified address, map URL and map-pin evidence, with no unresolved location question.
- The app builds external Google pedestrian directions from verified endpoints. Sourced walking estimates are shown per leg, separately from suggested browsing minutes. It uses the existing external-link handoff, so iOS's map-search conversion cannot strip the walking route. No map SDK, straight-line estimate or new permission is introduced.

Approved notes automatically join Destination → Shop, Journal → Shopping Notes, numbered place cards, Save, Add to Trip, related articles and the contextual Luxe Jetter card. The Journal filter appears only when an approved note is bundled. All test businesses live in the test script and never enter the app.
