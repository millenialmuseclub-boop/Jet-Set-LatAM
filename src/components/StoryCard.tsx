import { Link } from "react-router-dom";
import { Photo } from "./Photo";
import { getDestinationById } from "@/data";
import type { Guide } from "@/types";
export function StoryCard({
  guide,
  compact = false,
}: {
  guide: Guide;
  compact?: boolean;
}) {
  const destination = getDestinationById(guide.destinationId);
  return (
    <Link
      to={`/guides/${guide.id}`}
      className={`story-card group block ${compact ? "w-[255px] shrink-0 snap-start" : ""}`}
    >
      {guide.heroPhoto ? (
        <Photo
          src={guide.heroPhoto}
          seed={guide.id}
          alt={guide.photoCaption || guide.title}
          className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flex aspect-[4/3] items-end rounded-2xl bg-jungle-dark p-5 text-cream">
          <span className="font-display text-3xl">
            Notes from
            <br />
            {destination?.city}
          </span>
        </div>
      )}
      <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-terracotta">
        {destination?.city} /{" "}
        {guide.section === "see" ? "Art + culture" : guide.section}
      </p>
      <h3 className="mt-1 font-display text-[23px] leading-[1.1] text-ink group-hover:text-terracotta">
        {guide.title}
      </h3>
      {!compact && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft/70">
          {guide.dek}
        </p>
      )}
      <span className="mt-3 inline-block text-xs font-medium text-terracotta">
        Read the story ↗
      </span>
    </Link>
  );
}
