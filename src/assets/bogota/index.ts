// ---------------------------------------------------------------------------
// Bogotá — photography status (Pass: Bogotá build)
//
// Jordann has no documented Bogotá trip in the source material available to
// this pass, and thebrunchmanifesto.blog has zero Bogotá-tagged posts
// (confirmed via its own WordPress REST API,
// /wp-json/wp/v2/posts?search=bogota, which returned no results). The plan
// for this file was to source 4-6 genuinely verified Bogotá photos from
// Wikimedia Commons — checking each file's Commons description page for a
// confirmed Bogotá location and a CC-BY / CC-BY-SA / public-domain license
// before use, per this app's "never invent" content doctrine. Candidate
// files were identified by search (Monserrate, La Candelaria street scenes,
// Plaza de Bolívar, Museo del Oro, Usaquén) but could not be verified or
// downloaded.
//
// That could not be completed this pass: this session's network egress
// policy blocks every image-hosting/reference host attempted —
// commons.wikimedia.org, upload.wikimedia.org, en.wikipedia.org,
// api.wikimedia.org, images.unsplash.com, images.pexels.com, even
// example.com — each returning a hard "connect_rejected / policy denial"
// from the environment's egress proxy (confirmed via
// $HTTPS_PROXY/__agentproxy/status: recentRelayFailures shows
// connect_rejected for each host). Outbound access from this sandbox is
// scoped to this repo's own GitHub endpoints and package registries only —
// not general web hosts. Per the proxy's own guidance, policy denials are
// not to be retried or routed around. No photo files could be downloaded
// or verified as a result. (This is the same wall the Oaxaca pass hit —
// see src/assets/oaxaca/index.ts — so it appears to be a standing
// constraint of this environment, not a one-off fluke.)
//
// Rather than fabricate or guess at imagery, bogotaPhotos is left empty on
// purpose — Bogotá's Destination/Neighborhood/Place entries use '' /
// photos: [] throughout (the same honest-placeholder pattern already used
// for Buenos Aires and Oaxaca in this codebase), which the shared <Photo>
// component renders as a seeded placeholder rather than a broken or
// mismatched image.
//
// TODO (next pass, once image hosts are reachable): source and verify
// Wikimedia Commons photography for Monserrate (e.g. "Santuario de
// Monserrate, Bogotá.jpg"), a La Candelaria street scene (e.g. "Calle de
// La Candelaria Bogotá.JPG"), Plaza de Bolívar (e.g. "Plaza de Bolívar
// (Bogotá, Colombia) 1.jpg"), Museo del Oro (Category:Museo del Oro,
// Bogotá), and Usaquén (e.g. "Panorámica de Usaquen, Bogotá D.C.jpg") —
// checking each file's own Commons description page for a confirmed
// Bogotá location and CC-BY / CC-BY-SA / public-domain license before use
// — then populate this object and Destination.photoCredits together.
// ---------------------------------------------------------------------------

export const bogotaPhotos = {} as const
