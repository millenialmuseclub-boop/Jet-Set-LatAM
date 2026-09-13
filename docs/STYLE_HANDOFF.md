# Trip planning → wardrobe intent

Jet Set LatAm plans the trip; Luxe Jetter dresses the trip. Repositories, accounts and editorial rankings remain separate.

StyleHandoff v1 (src/types/index.ts) carries existing destination, country, day count, optional dates, companions, interests, pace and trip style, plus derived occasions and day-by-day activity names. buildStyleHandoff is pure and reads the current itinerary. Copy trip brief is an explicit local clipboard action with selectable-text fallback. It creates no account, backend or network request.

The only verified launch URL is appFamily['luxe-jetter'].iOSURL. All app launch surfaces read that source of truth. No appUrlOpen/associated-domain/URL-scheme receiving implementation was found in the local Project LuxeLook source search. The App Store listing describes destination wardrobes, but does not document a trip-import protocol. Therefore no parameters are appended and no automated trip transfer is claimed. A receiving protocol must be verified before implementing automatic transfer.

Affiliate audit: 2 unique URLs found in current application source and content/documentation. Both previously lived in ShopTheLookCard. No LTK, FlexOffers, CJ or Impact commerce URLs found in the current app. Links are preserved in styleOffers, extending the existing Offer model; no Place or Pick is reclassified based on commission.

2687505 is a clothing collection: 28 visible items. The preview names three existing items, linking to the original collection without guessed retailer URLs, prices, stock claims, or product images. 2799513 is a hotel collection: 8 visible stays; it remains beside the existing Rio hotel context, correctly labeled as stays instead of clothing. Both browser pages returned HTTP 200 and rendered their collections. Luxe Jetter returned HTTP 200, matching developer Jordann Lopez. Evidence: content/style-link-audit.json.

8 destination handoffs plus Explore Style, saved Trip Detail, Carnival, and existing Our World. Home remains 7 sections with no new style section. Carnival uses Build My Carnival Wardrobe; generated trips derive occasions from actual activities. Destination previews are editorial possibilities rather than invented saved itinerary entries. Contextual affiliate disclosure appears once per commerce module.

No fashion imagery is preloaded, no product grid or embedded storefront added. Existing sister-app scoping remains intact. Local only; no push or TestFlight upload.

Final verification: 2/2 unique affiliate URLs clicked from the UI at both 390px and 430px; 0 broken. Luxe Jetter verified from Explore, Destination, Carnival, Trip Detail, and Our World at both widths. 14 initial screenshots plus 2 trip rechecks; no overflow, broken images, or browser page errors. Focused style-brief tests, typecheck/build, lint, integrity, and 180 planner scenarios pass. Capacitor iOS sync completed. Existing large-JavaScript-chunk warning remains. Home stays at 7 sections; Saved stays inside More.
