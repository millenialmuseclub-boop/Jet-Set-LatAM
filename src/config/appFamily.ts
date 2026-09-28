import jetSetIcon from '@/assets/family/jet-set-latam.webp'
import luxeIcon from '@/assets/family/luxe-jetter.webp'
import littleIcon from '@/assets/family/little-jetter.webp'
import ralliiIcon from '@/assets/family/rallii.webp'
import eatIcon from '@/assets/family/let-them-eat.webp'
import { Compass, Shirt, Baby, Bike, UtensilsCrossed, type LucideIcon } from 'lucide-react'


// ---------------------------------------------------------------------------
// App identity and public fallbacks. Contextual URL handoffs are centralized
// in lib/companionLinks.ts; no cross-app accounts or data synchronization.
//
// Icons use the current local iOS app assets. All five apps are live on the
// App Store (Little Jetter went live Sept 2026); every member carries its
// real App Store URL.
// ---------------------------------------------------------------------------

export type AppFamilyId = 'jet-set-latam' | 'luxe-jetter' | 'little-jetter' | 'rallii' | 'let-them-eat'

// The creator's own portfolio — verified live (jordypop.vercel.app: Studio
// Art student / multidisciplinary digital artist; lists the Jordypop apps).
// Every "@jordypop" credit in the app links here.
export const CREATOR_PORTFOLIO_URL = 'https://jordypop.vercel.app'

export interface AppFamilyMember {
  id: AppFamilyId
  name: string
  description: string
  icon: LucideIcon
  webURL?: string
  iOSURL?: string
  iconUrl?: string
  deepLinkScheme?: string
  status: 'live'
  /** A short, tasteful one-line description of what this app does for the
   *  traveler — used in the "Our World" section (Discover) and About. Kept
   *  separate from `description` so that copy can stay a longer sentence
   *  while this stays a punchy fragment ("Plan the trip", "Dress for it"). */
  oneLiner: string
  /** Destination ids this app is relevant to. `'all'` means every
   *  destination; undefined/empty means it hasn't been scoped yet. */
  supportedDestinations: string[] | 'all'
}

export const appFamily: Record<AppFamilyId, AppFamilyMember> = {
  'jet-set-latam': {
    id: 'jet-set-latam',
    name: 'Jet Set LatAm',
    description: 'Real, editorial travel guides and a trip planner for Latin America — this app.',
    icon: Compass,
    iconUrl: jetSetIcon,
    iOSURL: 'https://apps.apple.com/us/app/jet-set-latam/id6810912801',
    webURL: 'https://jetsetlatam.com',
    status: 'live',
    oneLiner: 'Plan the trip',
    supportedDestinations: 'all',
  },
  'luxe-jetter': {
    id: 'luxe-jetter',
    name: 'LuxeJetter',
    webURL: 'https://luxe-jetter-frontend.vercel.app',
    description: 'Destination-led wardrobes, complete looks and beauty rituals for the way you actually travel.',
    icon: Shirt,
    iOSURL: 'https://apps.apple.com/us/app/luxejetter/id6808023085',
    iconUrl: luxeIcon,
    status: 'live',
    oneLiner: 'Dress the trip',
    supportedDestinations: 'all',
  },
  'little-jetter': {
    id: 'little-jetter',
    name: 'Little Jetter',
    description: 'Destination dress-up and discoveries for little travelers and their grown-ups.',
    icon: Baby,
    iOSURL: 'https://apps.apple.com/us/app/little-jetter/id6810346538',
    iconUrl: littleIcon,
    status: 'live',
    oneLiner: 'Bring the little travelers along',
    supportedDestinations: 'all',
  },
  rallii: {
    id: 'rallii',
    name: 'Rallii',
    description: 'Discover adventures by rail, trail, mountain bike, golf course and snow.',
    icon: Bike,
    iOSURL: 'https://apps.apple.com/us/app/rallii/id6804085679',
    iconUrl: ralliiIcon,
    status: 'live',
    oneLiner: 'Take the scenic route',
    // Scoped to destinations with a verified railiiConnection only (see the
    // Destination type) — populated by the app at render time, not hardcoded
    // here, so it never drifts out of sync with what's actually documented.
    supportedDestinations: [],
  },
  'let-them-eat': {
    id: 'let-them-eat',
    name: 'Let Them Eat',
    description: 'Cakes, ramen, cookies and noodles — stories, global traditions, flavor guides and pairings.',
    icon: UtensilsCrossed,
    iOSURL: 'https://apps.apple.com/us/app/let-them-eat/id6801655009',
    iconUrl: eatIcon,
    status: 'live',
    oneLiner: 'Taste the world',
    supportedDestinations: 'all',
  },
}

export const appFamilyList = Object.values(appFamily)

// Verified contextual handoffs live in src/lib/companionLinks.ts.
