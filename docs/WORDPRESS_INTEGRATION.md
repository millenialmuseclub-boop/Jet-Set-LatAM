# WordPress → Jet Set LatAm App: Content Relationship (Plan, Not Built)

This documents the cleanest low-risk path to let jetsetlatam.com (WordPress)
feed the app, without merging the two products. Nothing in this document has
been implemented — it is a plan for a future pass, per explicit instruction:
"Do not attempt to run the React app inside WordPress... do not perform a
giant CMS migration now."

## Architecture

```
WordPress (thebrunchmanifesto.blog / jetsetlatam.com)
  — content authoring, SEO, media library, canonical URLs
        │
        │  WordPress REST API (read-only, public endpoints — no plugin needed)
        │  /wp-json/wp/v2/posts?categories=<id>&_embed
        │  /wp-json/wp/v2/media/<id>
        ▼
Ingestion layer (new, small, future pass)
  — a scheduled or on-demand script (Node) that:
    1. Pulls posts by destination category/tag
    2. Extracts: title, excerpt/dek, featured image URL, body text,
       publish date, category → GuideSection mapping, canonical URL
    3. Downloads/derives optimized image variants (the same auto-crop +
       resize pipeline already used for this pass's sourced photography)
    4. Writes structured JSON matching the app's existing Guide/Place
       shape (src/types/index.ts) — NOT a live API call from the app
        │
        ▼
Jet Set LatAm app (React/Capacitor)
  — imports the generated JSON the same way src/data/destinations/*.ts
    does today. The app never calls WordPress directly at runtime —
    this keeps it fast, offline-friendly, and App Store-safe (no
    dependency on a third-party server being up).
```

## Why this shape

- **No runtime coupling.** The app ships with data baked in at build time
  (as it does today), so WordPress being slow/down never affects the app.
  This also avoids any "remote content" App Store review complications.
- **WordPress keeps doing what it's good at**: SEO, long-form authoring,
  the existing editorial workflow, and the public website.
- **The ingestion layer is the only new thing**, and it's a small, ownable
  script — not a CMS migration, not a headless-WordPress rebuild.
- **A person still reviews before publish.** The ingestion step produces
  a diffable JSON file, so editorial judgment (is this really a Jet Set
  Pick? does this photo work as a hero?) stays a manual step before a
  destination gets added to the app, consistent with this project's
  "real content only" principle.

## What would be needed to build it (future pass)

1. A small Node script using `fetch()` against the public REST endpoints
   (no auth needed for published posts).
2. A mapping table: WordPress category/tag → `GuideSection` /
   `PlaceCategory`, since these taxonomies don't line up 1:1 today.
3. Reuse of the screenshot-free path: WordPress media URLs can be fetched
   directly by a Node script (unlike this session's sandboxed browser
   flow), so image sourcing gets much faster once this exists.
4. A manual review/approval step before generated Place/Guide data enters
   `src/data/` — never auto-publish.

## Explicitly out of scope for this plan

- Running the app inside WordPress or as a WordPress theme/plugin.
- Two-way sync (the app never writes back to WordPress).
- Real-time/live fetching from the app at runtime.
- Migrating WordPress's CMS role to the app.
