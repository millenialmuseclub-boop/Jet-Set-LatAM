import type { Destination } from '@/types'

// Stub entries proving the Country → City architecture scales beyond the
// built destinations without inventing content for them. No Places/Guides
// attached — these render as "coming soon" in Discover/Destinations until
// real jetsetlatam.com content is migrated in. Rio de Janeiro graduated out
// of this file in Pass 4; Cartagena and Guadalajara graduated out in Pass 5
// — see src/data/destinations/rio-de-janeiro.ts, cartagena.ts and
// guadalajara.ts. São Paulo has real, specific written source content
// (Mercado Municipal / Hocca Bar) but is held here deliberately: no
// authentic, non-stock photography was found for it this pass (see
// docs/CONTENT_INVENTORY.md) and the project's photography-first rule
// treats that as disqualifying rather than shipping a text-only page.
// Playa del Carmen research (rich article archive found) was interrupted
// by a browser disconnection this pass and is not yet resolved into a
// stub or a built destination — see docs/CONTENT_INVENTORY.md.
export const comingSoonDestinations: Destination[] = [
  {
    id: 'sao-paulo',
    slug: 'sao-paulo',
    city: 'São Paulo',
    country: 'Brazil',
    heroPhoto: '',
    tagline: 'Coming soon',
    status: 'coming-soon',
    content: { overview: '', whyGo: '' },
    neighborhoods: [],
    placeIds: [],
    guideIds: [],
    itineraryIds: [],
  },
  {
    id: 'playa-del-carmen',
    slug: 'playa-del-carmen',
    city: 'Playa del Carmen',
    country: 'Mexico',
    heroPhoto: '',
    tagline: 'Coming soon',
    status: 'coming-soon',
    content: { overview: '', whyGo: '' },
    neighborhoods: [],
    placeIds: [],
    guideIds: [],
    itineraryIds: [],
  },
]
