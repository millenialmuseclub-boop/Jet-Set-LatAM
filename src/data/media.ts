import type { MediaMoment } from '@/types'
import { cartagenaVideos } from '@/assets/cartagena/video'
import { rioVideos } from '@/assets/rio/video'

// ---------------------------------------------------------------------------
// Editorial media moments (video)
//
// PROVENANCE (Cartagena): both clips are Jordann's own phone video from her
// Cartagena trip, sent to us directly — genuinely 'user-footage', not
// archive or stock. Captions describe only what's visible; no event name,
// date, or context is invented. The dance clip is NOT labeled "Carnival" —
// it isn't dated or confirmed as any specific named event, just a folkloric
// dance procession in traditional dress in the Walled City.
//
// PROVENANCE (Rio): the Carnaval 2025 clip below is Jordann's own footage
// from the actual Sambadrome, sent to us directly — verified by the visible
// "CARNAVAL 2025" event banner and a real parade float in the frame. This
// one genuinely is Carnival, so it's captioned as such. Only one clip
// exists so far (she has more but they haven't come through); add
// additional entries here as more real footage arrives — never invent
// additional moments to pad this out.
//
// This is the generic, destination-agnostic MediaMoment shape (see
// src/types/index.ts).
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

export const rioMediaMoments: MediaMoment[] = [
  {
    id: 'mm-rio-carnaval-2025-float',
    destinationId: 'rio-de-janeiro',
    year: 2025,
    caption: 'Inside the Sambadrome — Carnaval 2025',
    dek: 'A parade float rolls past packed grandstands under the "Carnaval 2025" banner, dancers filling the runway behind it.',
    videoSrc: rioVideos.carnaval2025SambadromeFloat.video,
    posterSrc: rioVideos.carnaval2025SambadromeFloat.poster,
    durationSeconds: 18,
    orientation: 'portrait',
    source: 'user-footage',
    autoplayMuted: true,
    tapToPlay: true,
  },
]

// Aggregate across all destinations.
export const mediaMoments: MediaMoment[] = [...cartagenaMediaMoments, ...rioMediaMoments]

export function getMediaMomentsByDestination(destinationId: string): MediaMoment[] {
  return mediaMoments.filter((m) => m.destinationId === destinationId)
}
