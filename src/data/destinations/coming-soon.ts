import type { Destination } from '@/types'

// ---------------------------------------------------------------------------
// True COMING-SOON tier: destinations with no structured real content at
// all — not even enough for a FIELD NOTE. São Paulo and Playa del Carmen
// graduated out of this file in Pass 12 into
// src/data/destinations/field-notes.ts once the project's tier model
// loosened to allow a photo-less FIELD NOTE tier for real written content
// held back only on photography.
//
// Napa and San Francisco/Chinatown were re-searched this pass via the
// jetsetlatam.com WordPress API (posts + media). Napa turns up only as a
// side-mention ("Napa Valley wine tours") inside three unrelated World Cup
// travel-planning articles — no dedicated Napa content. San Francisco/
// Chinatown returned zero posts. Neither has enough real material for even
// a FIELD NOTE, so neither gets a stub here — building one would mean
// inventing content, which this project doesn't do.
// ---------------------------------------------------------------------------

export const comingSoonDestinations: Destination[] = []
