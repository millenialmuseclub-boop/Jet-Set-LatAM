# Jet Set LatAM Handoff

## Current release — updated September 24, 2026

This section supersedes the older handoff below. Always verify remote main before editing.

- Build 14 source: `e43481f`, 12 live destinations and 87 Journal articles.
- OTA bootstrap: `9dc5a6b4e350c7fefe6154a7ec054a9c83a6d0ed`, iOS 1.0.1 build 15.
- Build 15 succeeded, including TestFlight publishing:
  https://codemagic.io/app/6aa3635e87dae0b68fd6af11/build/6ab570903f90aeed96588dcd
- Production OTA publishing succeeded; encrypted bundle and public manifest verified HTTP 200:
  https://github.com/millenialmuseclub-boop/Let-Them-Eat-Cake/actions/runs/36043852803
- Read `OTA_UPDATES.md` for the existing publisher, isolated R2 namespace and native compatibility tag.
- Future ordinary main pushes do not trigger native builds. Explicit `ios-*` tags do.
- Build 14 cannot receive OTA. Install build 15 once. Apple processing/device installation
  and actual device OTA activation have not been independently verified.
- On September 24, 2026, at the user's request, build 14 was withdrawn from review
  and version 1.0.1 build 15 was submitted. Apple confirmed **Waiting for Review**.
  Automatic release after approval is retained. Review submission:
  https://appstoreconnect.apple.com/apps/6810912801/distribution/reviewsubmissions/details/93d0c6b7-9445-4a96-bda2-7a68c934864f
- Earlier stale growth-pass work is preserved on `codex/editorial-product-pass`; do not
  merge it wholesale over this newer baseline. Untracked CLAUDE.md/takeover notes are stale.

## Historical handoff (superseded)

_Written 2026-09-24 at the end of a short Claude polish pass. Codex resumes Saturday._

## Current State

- **Repo:** `github.com/millenialmuseclub-boop/Jet-Set-LatAM`
- **Branch:** `main`
- **HEAD:** the commit that adds this file, sitting on top of `1a0a0b3` (the polish pass). Run `git log --oneline -3` to confirm.
- **Remote sync status when this was written:** local `main` was **2 commits ahead** of `origin/main` (`9bd7545`, build 13) and 0 behind. Claude's cloud sandbox could not push because the repo isn't in that session's authorized git sources. Jordann pushes from her machine using a bundle (see Git Handoff). **Before starting, check that `origin/main` contains `1a0a0b3`.** If it doesn't, the push hasn't happened yet.
- **Build status:** `npx tsc -b` passes, `npx oxlint` passes, `npm run build` passes, and all 7 release checks pass (`check-content`, `check-experience`, `check-lifecycle`, `check-product-depth`, `check-rallii`, `check-release`, `check-style`).
- **Last shipped iOS build:** 1.0.1 (13) on TestFlight (Internal Testers), built from `9bd7545`. This polish pass is **not** in a TestFlight build yet.

## Work Completed

This was a small pass with no architecture changes and no screen redesigns.

1. **Little Jetter is live.** Added its App Store URL. Removed the `'coming-soon'` status from `AppFamilyMember`, since all five apps are live. No "coming soon" / "in review" / "beta" copy for Little Jetter remains anywhere in `src/`.
2. **App Store URLs in the app-family config.** Added Jet Set LatAM's own App Store URL. Rallii now uses the canonical `/rallii/` slug (same id, `6804085679`).
3. **Our World page (`/our-world`) and About page.** Every sibling app opens its App Store page through `openExternal()`. About previously used `<a target="_blank">`, which is unreliable inside the iOS WebView. Jet Set shows "You're here" instead of linking to itself.
4. **Plan a Trip, family trips.** Added a small "Pack with Little Jetter ↗" link inside the existing "Little Jetters coming too?" note.
5. **The last `target="_blank"` anchors** (Ask Jet Set source/map links, Carnival LIESA source) now use `openExternal` / `openMap` like the rest of the app. A grep for `_blank` in `src/` returns 0 results.
6. **Tap targets.** Place-card Save, Start a Trip, Add to Trip, Jet Set Pick "View", and the trip/day picker chips are now 40–44px high. Previously they measured under 32px at 390px width.
7. **Small interaction detail.** When "Added" appears after adding a place to a trip, it pops in with a small gold spark. This is CSS only and switches off under `prefers-reduced-motion`.
8. **Destination hero line.** Every city previously showed the hardcoded line "Design · Food · Art · Nightlife". It now shows the top four labels derived from that city's real Place categories.
9. **Style bridge for build-13 destinations.** Added `destinationStyle` copy for Santiago, Medellín, Bogotá and Oaxaca. Before this, `StyleBridge` returned `null` for them, so their trips had no Luxe Jetter or wardrobe module. Bogotá maps to the existing "Quiet Luxury Layering" ShopMy edit, since the city sits at altitude. **No new URLs were created.**
10. **Docs.** Added dated one-line notes to older docs that said Little Jetter was unlinked or unbuilt. The historical text itself was left as written.

## Files Changed

| File | Why |
|---|---|
| `src/config/appFamily.ts` | Little Jetter live + URL, Jet Set URL, Rallii slug, `status` type narrowed to `'live'`, comments updated |
| `src/pages/About.tsx` | App-family rows are `openExternal` buttons; "You're here" / "App Store ↗" labels |
| `src/pages/InfoPage.tsx` | Our World rows: "View on the App Store ↗", "You're here", coming-soon branch removed |
| `src/pages/PlanTrip.tsx` | "Pack with Little Jetter" link on family trips (imports `appFamily`, `openExternal`) |
| `src/pages/AskJetSet.tsx` | Source/map anchors → `openExternal` / `openMap` |
| `src/components/CarnivalSeasonNote.tsx` | LIESA source anchor → `openExternal` |
| `src/components/AddToTripControl.tsx` | 44px tap targets; `added-pop` class + `role="status"` on "Added" |
| `src/components/JetSetPickCard.tsx` | "View" link gets `min-h-11` |
| `src/pages/DestinationDetail.tsx` | `destinationStrengths()` replaces the hardcoded hero line; place Save button `min-h-11` |
| `src/data/style.ts` | `destinationStyle` entries for santiago, medellin, bogota, oaxaca |
| `src/data/shopmy.ts` | `bogota → layers` in the regional map (existing collection) |
| `src/app-polish.css` | Appended a labeled block: `.family-row` press state, `.added-pop` animation |
| `docs/NATIVE_HANDOFF.md`, `docs/PRODUCT_DEPTH_GROWTH.md`, `docs/RELEASE_CANDIDATE_2026-09-20.md` | Dated "Little Jetter is live" notes |
| `CODEX_HANDOFF.md` | This file |

## Existing Work Preserved

- **This clone was clean.** It was a fresh clone of `origin/main` at `9bd7545` with no uncommitted or untracked files before this pass.
- **Remote branches were left alone.** Two branches exist on GitHub that are **not merged into `main`**. They were not merged, rebased or deleted:
  - `codex/editorial-product-pass`: 1 commit ahead of main (`7ebe71f` Prepare signed Android release bundle), 5 behind.
  - `codex/google-play-android-20260913`: 1 commit ahead (`3939294` Prepare Google Play Android validation and preserve iOS behavior), 8 behind.
- **Jordann's local folder `C:\Users\Jordann Lopez\Dev\jetsetlatam-app-new` was never touched.** It holds about 101 uncommitted changes plus an Android release commit. Nothing in it was read, written, reset, stashed or merged in this pass or the build-13 sync. Reconciling it is its own separate job; see Recommended Next Steps.
- **`content/release-link-audit.json` was deliberately not regenerated.** The sandbox's network returns false 403s for almost every external site, including apple.com and jetsetlatam.com. It still lists the old `rallii-rail` URL until the audit is re-run somewhere with normal network.

## App Store Links

| App | URL |
|---|---|
| Jet Set LatAM | https://apps.apple.com/us/app/jet-set-latam/id6810912801 |
| LuxeJetter | https://apps.apple.com/us/app/luxejetter/id6808023085 |
| Rallii | https://apps.apple.com/us/app/rallii/id6804085679 |
| Let Them Eat | https://apps.apple.com/us/app/let-them-eat/id6801655009 |
| Little Jetter | https://apps.apple.com/us/app/little-jetter/id6810346538 |

The single source of truth for these is `src/config/appFamily.ts`. The icons are real local assets in `src/assets/family/*.webp`.

## Known Issues

- **Codemagic reported "post-processing failed"** on build #18 (1.0.1 (13)) in its "App Store distribution" step. The build uploaded fine and reached Internal Testers, but the log wouldn't load. Check the log before sending a build to external testers or App Store review.
- **Codemagic did not auto-trigger** on the push to `main`, even though `codemagic.yaml` has a push trigger. Build 13 was started manually. The GitHub webhook may be missing.
- **Photography gaps for the Wikimedia-only destinations.** Many Oaxaca, Santiago, Medellín and Bogotá Places have no photo of their own and fall back to the city hero image, captioned "destination context". This is honest, but repetitive in the Eat tab. Don't fill these with stock photos. Use Jordann's own photos or verified CC images only.
- **Oaxaca is still `status: 'guide'`**, so it isn't in Plan a Trip. That was a deliberate choice, not a bug.
- **No ShopMy regional edit for Santiago, Medellín or Oaxaca.** They fall back to "Jet Set Essentials". Add regional edits only if Jordann creates real collections.
- **The in-app `Photo` chunk is about 620 kB** (Vite warns about the size). Pre-existing, not addressed.
- **Not verified on a physical device:** the new `openExternal` paths on the About and Our World pages. The logic is identical to paths already covered by `check-release`.

## Recommended Next Steps

1. **Confirm `origin/main` contains `1a0a0b3`** and the handoff commit. If it doesn't, push the bundle from Jordann's machine first.
2. **Reconcile `jetsetlatam-app-new`** (the 101 uncommitted changes plus the Android commit) against current `main` on a new branch. Diff first. Never reset it.
3. **Decide on the two `codex/*` Android branches:** rebase them onto `main`, or close them.
4. **Fix the Codemagic webhook** and read the build #18 post-processing log.
5. **Bump the build number to 14** (`CURRENT_PROJECT_VERSION` in `ios/App/App.xcodeproj/project.pbxproj`) and ship this polish pass to TestFlight.
6. **Re-run `scripts/audit-release-links.mjs` from a machine with normal network** and commit the refreshed JSON.

## Git Handoff

```
$ git status
On branch main
Your branch is ahead of 'origin/main' by 2 commits.
nothing to commit, working tree clean

$ git log --oneline -10
<handoff>  Add CODEX_HANDOFF.md for Saturday's Codex session
1a0a0b3    Safe polish pass: Little Jetter live, app-family links, tap targets, new-destination style
9bd7545    Prepare iOS build 13: Santiago, Medellín, Bogotá, Oaxaca and Isla Barú content
c3a13c1    Add Oaxaca journal guides (Centro, eat, mezcal/Jalatlaco, Valles Centrales)
44655b8    Add CC-licensed Wikimedia Commons photography for the 4 new destinations
4126da0    Major content expansion: 4 new destinations + Isla Barú photography
1b718a7    Add Café do Alto (Santa Teresa) to Rio from Jordann's own trip photos
af8e2cc    Stabilize planner and native interactions for iOS build 12
c9876d2    Prepare iOS build 11 with trip experience and contextual ShopMy edits
8bc1bee    Prepare product depth and original photography for iOS 1.0.1 build 10
```

- **Is all work from this pass committed?** Yes.
- **Was it pushed?** Not from the sandbox. Git refused with "not in this session's authorized repository set". It was delivered as `jetset-polish.bundle` to Jordann's Downloads folder, to be pushed from her machine as a fast-forward:
  ```
  cd ~/Dev/jsl-push
  git pull ~/Downloads/jetset-polish.bundle main --ff-only
  git push origin main
  ```
- **Commits created this pass:** `1a0a0b3` (polish) and the follow-up commit that adds this file. That commit's hash can't be written inside itself; it's the first line of `git log --oneline -1`.
