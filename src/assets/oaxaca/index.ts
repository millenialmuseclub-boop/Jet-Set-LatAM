// ---------------------------------------------------------------------------
// Oaxaca — photography status (Pass: Oaxaca build)
//
// UNLIKE most other destinations' asset folders, nothing here is Jordann's
// own firsthand travel photography — she has no documented Oaxaca trip in
// the source material available to this pass. The plan for this file was
// to source 4-6 genuinely verified Oaxaca photos from Wikimedia Commons
// (checking each file's Commons description page for confirmed location/
// license before use, per this app's "never invent" content doctrine).
//
// That could not be completed this pass: this session's network egress
// policy blocked every image-hosting/reference host attempted —
// commons.wikimedia.org, upload.wikimedia.org, en.wikipedia.org,
// images.unsplash.com, images.pexels.com — each returning a hard
// "connect_rejected / policy denial" from the environment's egress proxy,
// not a content problem. (Per the proxy's own guidance, policy denials are
// not to be retried or routed around.) No photo files could be downloaded
// or verified as a result.
//
// Rather than fabricate or guess at imagery, oaxacaPhotos is left empty on
// purpose — Oaxaca's Destination/Neighborhood/Place entries use '' /
// photos: [] throughout (the same honest-placeholder pattern already used
// for Buenos Aires in this codebase), which the shared <Photo> component
// renders as a seeded placeholder rather than a broken image.
//
// TODO (next pass, once image hosts are reachable): source and verify
// Wikimedia Commons photography for Templo de Santo Domingo, the Zócalo,
// Monte Albán, Mercado 20 de Noviembre, and Teotitlán del Valle weaving —
// checking each file's Commons description page for confirmed Oaxaca
// location and a CC-BY / CC-BY-SA / public-domain license before use —
// then populate this object and Destination.photoCredits together.
// ---------------------------------------------------------------------------

export const oaxacaPhotos = {} as const
