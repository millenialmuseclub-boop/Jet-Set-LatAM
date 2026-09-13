import type { MediaMoment } from '@/types'
import { cartagenaVideos } from '@/assets/cartagena/video'

// ---------------------------------------------------------------------------
// Editorial media moments (video)
//
// PROVENANCE: both clips below are Jordann's own phone video from her
// Cartagena trip, sent to us directly — genuinely 'user-footage', not
// archive or stock. Captions describe only what's visible; no event name,
// date, or context is invented. The dance clip is NOT labeled "Carnival" —
// it isn't dated or confirmed as any specific named event, just a folkloric
// dance procession in traditional dress in the Walled City.
//
// This is the generic, destination-agnostic MediaMoment shape (see
// src/types/index.ts) — the same shape and MediaMoment component are meant
// to carry real Rio Carnival footage once Jordann sends it. Do not add a Rio
// entry here until that footage exists.
// ---------------------------------------------------------------------------
export const cartagenaMediaMoments: MediaMoment[] = [
  {
    id: 'mm-cartagena-palenquera-parade',
    destinationId: 'cartagena',
    year: 2026,
    caption: 'A folkloric dance procession in the Walled City',
    dek: 'Dancers in traditional white ruffled dress move down a cobblestone street at dusk, colonial walls and a passing taxi behind them.',
    videoSrc: cartagenaVideos.palenqueraParadeStreet.video,
    posterSrc: cartagenaVideos.palenqueraParadeStreet.poster,
    durationSeconds: 22,
    orientation: 'portrait',
    source: 'user-footage',
    relatedPlaceIds: ['pl-plaza-santo-domingo'],
    autoplayMuted: true,
    tapToPlay: true,
  },
  {
    id: 'mm-cartagena-getsemani-terrace',
    destinationId: 'cartagena',
    year: 2026,
    caption: 'An evening on a Getsemaní terrace',
    dek: 'String lights, palms and a live musician on a plaza terrace at dusk, a pink colonial façade glowing behind the crowd.',
    videoSrc: cartagenaVideos.plazaTerraceEvening.video,
    posterSrc: cartagenaVideos.plazaTerraceEvening.poster,
    durationSeconds: 7,
    orientation: 'portrait',
    source: 'user-footage',
    autoplayMuted: true,
    tapToPlay: true,
  },
]

// Aggregate across all destinations — currently just Cartagena. When real
// Rio Carnival footage arrives, add a `rioMediaMoments` array above (same
// MediaMoment shape, source: 'user-footage') and spread it in here.
export const mediaMoments: MediaMoment[] = [...cartagenaMediaMoments]

export function getMediaMomentsByDestination(destinationId: string): MediaMoment[] {
  return mediaMoments.filter((m) => m.destinationId === destinationId)
}
