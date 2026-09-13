import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  getGuide,
  getPlacesByIds,
  getDestinationById,
  getGuidesByDestination,
  getPlacePhoto,
} from "@/data";
import { Photo } from "@/components/Photo";
import { StoryCard } from "@/components/StoryCard";
import { EmptyState } from "@/components/EmptyState";
import { AddToTripControl } from "@/components/AddToTripControl";
import { Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { isSavedGuide, toggleSavedGuide } from "@/lib/storage";
import { openExternal } from "@/lib/links";
export function GuideDetail() {
  const { id } = useParams();
  const [saved, setSaved] = useState(() => (id ? isSavedGuide(id) : false));
  const guide = id ? getGuide(id) : undefined;
  if (!guide) return <EmptyState title="Guide not found" />;
  const destination = getDestinationById(guide.destinationId);
  const places = getPlacesByIds(guide.placeIds);
  const related = getGuidesByDestination(guide.destinationId)
    .filter((g) => g.id !== guide.id)
    .sort(
      (a, b) =>
        Number(b.section === guide.section) -
        Number(a.section === guide.section),
    )
    .slice(0, 3);
  const relatedDests = [
    ...new Set([guide.destinationId, ...(guide.relatedDestinationIds || [])]),
  ]
    .map(getDestinationById)
    .filter((d) => !!d);
  return (
    <article className="pb-10">
      {guide.heroPhoto ? (
        <figure>
          <Photo
            src={guide.heroPhoto}
            seed={guide.id}
            alt={guide.photoCaption || guide.title}
            priority
            className="h-[290px] w-full md:h-[450px]"
            rounded="rounded-none"
          />
          <figcaption className="mx-auto max-w-3xl px-5 pt-2 text-[10px] text-ink-soft/55">
            {guide.photoCaption}
          </figcaption>
        </figure>
      ) : (
        <div className="bg-jungle-dark px-5 py-10 text-cream">
          <p className="eyebrow">A letter from</p>
          <p className="font-display text-5xl">{destination?.city}</p>
        </div>
      )}
      <div className="mx-auto max-w-3xl space-y-7 px-5 pt-6 md:px-8">
        <div>
          <div className="flex items-center justify-between gap-3">
            <Link
              to={`/destinations/${destination?.slug}`}
              className="eyebrow text-terracotta"
            >
              {destination?.city} / {guide.section}
            </Link>
            <button
              aria-label={saved ? "Unsave guide" : "Save guide"}
              onClick={() => setSaved(toggleSavedGuide(guide.id))}
              className="flex min-h-11 items-center gap-2 text-xs text-terracotta"
            >
              {saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}{" "}
              {saved ? "Saved" : "Save story"}
            </button>
          </div>
          <h1 className="mt-3 font-display text-4xl leading-[1.06] md:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-4 border-l-2 border-gold pl-4 font-display text-xl italic text-ink-soft">
            {guide.dek}
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-widest text-ink-soft/50">
            Jet Set LatAm{" "}
            {guide.publishedAt &&
              `· ${new Date(guide.publishedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {relatedDests.map((d) => (
            <Link
              key={d.id}
              to={`/destinations/${d.slug}`}
              className="rounded-full border border-ink/15 px-4 py-3 text-xs"
            >
              Explore {d.city} ↗
            </Link>
          ))}
          {destination?.status === "live" && (
            <Link
              to={`/plan?destination=${destination.slug}`}
              className="rounded-full bg-jungle-dark px-4 py-3 text-xs text-cream"
            >
              Plan this trip ↗
            </Link>
          )}
        </div>
        <div className="article-body text-ink-soft">
          {guide.body.split(/\n\n+/).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {!!guide.photos?.length && (
          <section aria-label="Story photographs">
            <h2 className="mb-4 font-display text-3xl">Through our lens</h2>
            <div className="grid grid-cols-2 gap-3">
              {guide.photos.map((p, i) => (
                <figure key={p.src} className={i % 5 === 0 ? "col-span-2" : ""}>
                  <Photo
                    src={p.src}
                    seed={p.src}
                    alt={p.caption}
                    className={`${i % 5 === 0 ? "h-64" : "h-52"} w-full`}
                  />
                  <figcaption className="mt-2 text-xs leading-relaxed text-ink-soft/65">
                    {p.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
        {!!places.length && (
          <section>
            <h2 className="mb-4 font-display text-3xl">Places in this story</h2>
            <div className="space-y-3">
              {places.map((p) => {
                const photo = getPlacePhoto(p);
                return (
                  <div
                    key={p.id}
                    className="flex gap-3 rounded-2xl bg-cream p-3"
                  >
                    <figure className="w-20 shrink-0">
                      <Photo
                        src={photo.src}
                        seed={p.id}
                        alt={photo.caption}
                        className="h-20 w-20"
                      />
                      {!p.photos.length && (
                        <figcaption className="mt-1 text-[9px] text-ink-soft/50">
                          City context
                        </figcaption>
                      )}
                    </figure>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-xl">{p.name}</p>
                      <p className="text-xs text-terracotta">
                        {p.neighborhood}
                        {p.isJetSetPick ? " · Jet Set Pick" : ""}
                      </p>
                      <AddToTripControl place={p} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
        <div className="border-t border-ink/15 pt-5">
          {guide.sourceUrl && <button
            onClick={() => openExternal(guide.sourceUrl)}
            className="flex min-h-11 items-center gap-2 text-xs text-terracotta"
          >
            Read the original published story <ExternalLink size={13} />
          </button>}
          <p className="mt-2 text-xs leading-relaxed text-ink-soft/55">
            From the Jet Set LatAm archive. Opening hours, prices and
            availability may have changed since publication.
          </p>
        </div>
        <section>
          <div className="section-heading">
            <h2>Stay a little longer</h2>
            <Link to={`/explore?destination=${guide.destinationId}`}>
              All stories ↗
            </Link>
          </div>
          <div className="photo-rail">
            {related.map((g) => (
              <StoryCard key={g.id} guide={g} compact />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
