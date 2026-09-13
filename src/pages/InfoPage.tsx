import { appFamilyList, CREATOR_PORTFOLIO_URL } from "@/config/appFamily";
import { openExternal } from "@/lib/links";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
export function InfoPage({
  kind,
}: {
  kind: "privacy" | "disclosure" | "world";
}) {
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-5 py-8">
      <p className="eyebrow text-terracotta">Jet Set LatAm</p>
      <h1 className="font-display text-4xl">
        {kind === "privacy"
          ? "Your travels, your space."
          : kind === "disclosure"
            ? "Affiliate disclosure"
            : "Our World"}
      </h1>
      {kind === "privacy" ? (
        <div className="space-y-5 text-sm leading-relaxed">
          <h2 className="font-display text-2xl">Privacy in the app</h2>
          <p>
            Saved places, guides, destinations and itineraries are stored
            locally on this device. This version has no account or cloud sync.
            Your saved library is not sent to Jet Set LatAm when you use the
            planner.
          </p>
          <p>
            Removing the app or clearing its local data can erase your library.
            Use the remove and delete controls in Saved to manage individual
            items.
          </p>
          <p>
            Links to maps, shops, the website and other apps open external
            services. Those services have their own privacy policies and may
            collect information when you visit them.
          </p>
          <button
            onClick={() =>
              openExternal("https://thebrunchmanifesto.blog/privacy/")
            }
            className="text-terracotta underline"
          >
            Read the website privacy policy ↗
          </button>
        </div>
      ) : kind === "disclosure" ? (
        <div className="space-y-5 text-sm leading-relaxed">
          <AffiliateDisclosure />
          <p>
            Some shopping or booking links may earn a commission. Editorial
            recommendations and Jet Set Picks are separate from these commercial
            links.
          </p>
          <p>
            Original articles retain their published recommendations. Check
            current details with the venue before you go.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-ink-soft/70">
            Plan the trip. Dress the trip. Explore beyond the itinerary.
          </p>
          <div className="space-y-3">
            {appFamilyList.map((app) => (
              <div
                key={app.id}
                className="flex items-center gap-4 rounded-2xl bg-cream p-5"
              >
                {app.iconUrl && <img src={app.iconUrl} alt={app.name + " app icon"} loading="lazy" className="h-14 w-14 shrink-0 rounded-xl" />}
                <div className="flex-1">
                  <h2 className="font-display text-2xl">{app.name}</h2>
                  <p className="text-sm text-ink-soft/65">{app.oneLiner}</p>
                  {(app.iOSURL || app.webURL) && (
                    <button
                      onClick={() => openExternal(app.iOSURL || app.webURL)}
                      className="mt-2 min-h-10 text-xs text-terracotta"
                    >
                      Explore {app.name} ↗
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => openExternal(CREATOR_PORTFOLIO_URL)}
            className="text-sm text-terracotta"
          >
            Made by @jordypop ↗
          </button>
        </>
      )}
    </div>
  );
}
