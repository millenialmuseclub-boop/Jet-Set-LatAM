# Editorial + experience release

483 website posts catalogued; all 29 destinations compared. Five published articles brought native, three verified Santiago places and twenty existing-place relationships added. Shared source-heading highlights, section color accents, neighborhood reads, Saved-place reads and Saved-city Journal links added. Existing Add to Trip, Save, related stories, destination, planner, ShopMy and wardrobe components reused. No new destinations, images, dependencies or native changes.

See WEBSITE_TO_APP_OPPORTUNITIES.md for five discoveries and ranked future candidates; APP_EDITORIAL_REQUESTS.md for five targeted prompts; EDITORIAL_UPGRADE_SOURCES.json for imported source URLs.

Pre-existing unstaged ShopMyEdit.tsx change is preserved locally and excluded from this release. Production build/OTA uses only the committed source.
Validation completed: lint, TypeScript/build, content integrity, 29-city completeness/photo checks, exact baseline preservation, OTA safety, 8,640 generated plans, 120,960 adjustments and lifecycle regressions passed. Mobile 390px highlights, heading focus, places jump, Save/Unsave restoration and neighborhood reads passed with no overflow or broken loaded photos. New story/store URLs and Let Them Eat Cookies return 200; Booking resolves (202); Viator redirects with tracking but blocks automated access (403), so availability there is not certified. Existing build large-chunk advisory remains.
