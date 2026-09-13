# Contextual Rallii integration

Rallii's current local source and Apple listing both support Rail, Trail, MTB, Green (golf) and Snow. Its canonical App Store URL remains appFamily.rallii.iOSURL. No receiving deep-link handler was found; no parameters are appended and no context transfer is claimed.

Coverage audit: 8 current Jet Set city destinations, 115 Places, 68 existing guides and 5 preset itineraries reviewed alongside Rallii's route/trail/MTB/snow/golf catalogs. No nearby route overlap found for these cities. José Cuervo Express exists in Jet Set, but not Rallii; its previous destination-only promotion was removed. El Chepe Express is in Rallii (Los Mochis–Creel), shown as a separate northern-Mexico journey in unfiltered Outdoors + Journeys, never as a nearby Mexico City/Guadalajara/Tulum route. Rail/trail/MTB/snow modes alone do not establish local coverage.

ralliiDestinationMap explicitly has empty coverage for all 8 cities. RalliiBridge is wired into Destination, generated Plan, saved Trip Detail, and eligible itinerary activities, and renders nothing without verified coverage. Itinerary matching requires an actual matching place, not just a broad culture/relaxation interest. Current quiz has no outdoor-specific interests; no extra question added. New regional coverage can be added centrally only after route and place evidence is verified. Synthetic positive test cases are test fixtures, never app content.

Tren Maya correction: archive posts wp-2142 and wp-1832 imported and linked to Tulum and Playa del Carmen. Official Tren Maya site confirms both stations; live schedule/station information remains linked to the operator. Tren Maya is not in current Rallii source, so no unsupported Rallii route CTA is attached. Outdoors + Journeys now has 9 existing-source editorial stories plus 1 distinct Rallii journey feature. No stock photo is presented as firsthand rail imagery.

Shared version-1 Rallii handoff builder includes destination/country/dates/day-count, verified adventure mode/route/region and actual matching Places; coordinates copied only from existing canonical Places. No backend, tracking, ATT prompt or Rallii repo modifications.

Our World uses official Apple-catalog icons for Rallii, LuxeJetter and Let Them Eat. Jet Set's own icon and Little Jetter's published icon were not verified through Apple in this pass; missing icons are omitted, never replaced by generic icons. Home remains at 7 sections; Saved remains in More.

Verification: 16 mobile screenshots at 390px/430px inspected. 2/2 visible Rallii entry points tested at both widths (4 successful clicks), 0 broken links, 0 overflow or broken images. Negative checks pass for unsupported destination, planner and saved-trip promotions. Typecheck/build, lint, content integrity, 180 planner scenarios, Rallii coverage tests and Capacitor iOS sync pass. 70 guides total. No pushes or TestFlight uploads.
