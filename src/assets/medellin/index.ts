// MEDELLÍN PHOTOGRAPHY — NONE INGESTED THIS PASS.
//
// Jordann's own blog (thebrunchmanifesto.blog) has zero Medellín-tagged
// content, so this destination was built from legitimate general web
// research (official Medellín/Colombia tourism sites, Wikipedia, reputable
// travel publications) rather than her firsthand photography — see
// src/data/destinations/medellin.ts for the full provenance notes and
// source URLs behind every Place/Guide.
//
// The plan for this pass was to source 4-6 real, verifiably-Medellín photos
// from Wikimedia Commons (checking each file's Commons description page for
// subject + CC/public-domain license before use), download them with curl
// and process them exactly like every other destination's photography. That
// could not be done in this session: the sandbox's egress proxy rejects
// every image-hosting domain it was pointed at — commons.wikimedia.org,
// upload.wikimedia.org, en.wikipedia.org's own media, images.unsplash.com,
// images.pexels.com, cdn.pixabay.com, live.staticflickr.com — all returned
// "403 policy denial" at the CONNECT level (only code-hosting domains like
// github.com/raw.githubusercontent.com were reachable). Per this session's
// own proxy guidance, a policy 403 is something to report, not route around.
//
// Rather than invent stock imagery or mis-source a photo to make the build
// look complete, this destination ships with NO photos and an empty
// `medellinPhotos` export. The app already has a first-class fallback for
// exactly this situation — see src/components/Photo.tsx /
// PhotoPlaceholder.tsx, which renders an intentional on-brand gradient
// placeholder whenever a photo slot is empty — so Medellín renders cleanly
// without any hardcoded photo paths that don't resolve to real files.
//
// NEXT: a future pass with working access to Wikimedia Commons (or real
// photography supplied directly, the way Cartagena's was) should populate
// this file and add photoCredits entries in medellin.ts using the
// `"Photo by <name> / Wikimedia Commons, CC BY-SA 4.0"` + Commons file-page
// sourceUrl convention.

export const medellinPhotos = {}
