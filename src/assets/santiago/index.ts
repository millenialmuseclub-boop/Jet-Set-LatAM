// ---------------------------------------------------------------------------
// Santiago — photography status (Santiago build pass)
//
// UNLIKE most other destinations' asset folders, nothing here is Jordann's
// own firsthand travel photography — she has no documented Santiago trip in
// the source material available to this pass. The plan for this file was
// to source 4-6 genuinely verified Santiago photos from Wikimedia Commons
// (checking each file's Commons description page for confirmed location/
// license before use, per this app's "never invent" content doctrine).
//
// That could not be completed this pass: this session's network egress
// policy blocked every image-hosting/reference host attempted —
// commons.wikimedia.org, upload.wikimedia.org, wikidata.org,
// en.wikipedia.org's File:/API namespaces, web.archive.org — each either a
// hard "connect_rejected / policy denial" from the environment's egress
// proxy, or a "cache-only, cannot be fetched" response from the sandboxed
// web-fetch tool. (Per the proxy's own guidance, policy denials are not to
// be retried or routed around.) No photo files could be downloaded or their
// Commons license/location verified as a result. This is the same blocker
// already hit and documented in src/assets/oaxaca/index.ts.
//
// Rather than fabricate or guess at imagery — or use an unverified photo
// under a false attribution — santiagoPhotos is left empty on purpose.
// Santiago's Destination/Neighborhood/Place entries use '' / photos: []
// throughout (the same honest-placeholder pattern already used for Buenos
// Aires and Oaxaca in this codebase), which the shared <Photo> component
// renders as a seeded placeholder rather than a broken or mismatched image.
//
// TODO (next pass, once image hosts are reachable): source and verify
// Wikimedia Commons photography for Plaza de Armas / the Metropolitan
// Cathedral, Cerro San Cristóbal and its funicular, the Mercado Central's
// cast-iron hall, Barrio Lastarria, and a Casablanca Valley vineyard —
// checking each file's Commons description page for confirmed Santiago,
// Chile location (not Santiago de Compostela or Santiago de Cuba) and a
// CC-BY / CC-BY-SA / public-domain license before use — then populate this
// object and Destination.photoCredits together, crediting each photographer
// by name with a link to the file's Commons page.
// ---------------------------------------------------------------------------

export const santiagoPhotos = {} as const
