# Jet Set ↔ Luxe Jetter

Read-only inspection of the local Luxe frontend confirmed `/destinations/:destinationId` and `/wardrobe-builder`. The live public destination catalog was checked on 2026-09-27. `src/config/luxeDestinations.json` records the 14 verified matches. Jet Set uses the deployed web origin `https://luxe-jetter-frontend.vercel.app` and the existing native external-link helper; no custom scheme or new native configuration is claimed.

## Receiving contract

- Destination/style links open the matching Luxe destination page.
- Planner, upcoming/active Saved cards and saved-trip detail use **Pack for This Trip** and open `/wardrobe-builder?via=jetset&intent=City+Break&destination=<real-id>`.
- San Juan, Antigua Guatemala, Montevideo, Panama City and San José Costa Rica have no matching Luxe catalog entry. They open the general wardrobe builder, where the traveler chooses an available destination. Antigua Guatemala must **never** use Luxe's Antigua and Barbuda entry.
- Tulum and Playa del Carmen use the existing Riviera Maya wardrobe destination. All other matched destinations use their city entry.
- Luxe accepts destination and intent queries. It does not currently accept trip length, start/end dates or itinerary notes through this route. Jet Set therefore does **not** silently send those fields. A local **Copy trip brief** action retains duration, dates when available and relevant wardrobe context for the traveler. No automatic cross-app saved-trip synchronization is implied.
- Existing App Store buttons and all ShopMy/affiliate URLs remain intact.

## Placement audit

| Surface | Result |
| --- | --- |
| Destination overview | Existing editorial style card now opens a matched destination. Five new cities have contextual wardrobe copy. |
| Destination Shop / Neighborhoods | One contextual card for that active tab, with Build a Look / Shop and Pack for the Day wording. |
| Shopping Notes / Journal shopping or Style-tagged article | One contextual card following editorial content; numbered boutique/café cards remain focused on Save, website and Add to Trip. |
| Planner result | Pack for This Trip before the editable itinerary; existing packing/commerce content preserved. |
| Saved upcoming/active card | Direct Pack for This Trip action. |
| Saved trip detail | Existing constellation card now uses the specific wardrobe route and trip brief. |
| Journal Style collection | Existing style cards inherit verified city links. |
| Discover / general partner modules | Existing placements retained; no additional banner added. Follow a destination into the contextual wardrobe flow. |

Weather language is planning context and asks the traveler to consult the forecast; this adds no weather API or claimed live conditions. No restaurant-specific dress code is invented.

## Future links back — no Luxe repository edits

Luxe already has `jet_set_guide_url` fields pointing to Jet Set's website articles. Preserve those useful public fallbacks. Live Lima verification also found that the separate **Plan My Trip** CTA resolves to the current Luxe page; that is a concrete future reciprocal-link improvement, left untouched here. Future reciprocal CTAs could connect a destination look to its Jet Set destination, a boutique look to an approved Shopping Notes guide, and a completed wardrobe to the traveler's existing Jet Set planning flow. Jet Set currently uses hash routes (`/#/destinations/<slug>`, `/#/guides/<id>`, `/#/plan?destination=<slug>`). An installed-app return link needs an explicitly supported universal/deep-link contract before implementation; do not invent a native scheme or put private trip IDs into public URLs.
