import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";
import type { MediaMoment as MediaMomentType } from "@/types";

// Only one MediaMomentPlayer plays at a time across the whole app — when any
// instance starts playback it pauses whichever instance was previously
// playing. Simple module-level singleton rather than context/state
// management, since this only needs to coordinate <video> elements.
let currentlyPlaying: HTMLVideoElement | null = null;
function claimPlayback(el: HTMLVideoElement) {
  if (currentlyPlaying && currentlyPlaying !== el) currentlyPlaying.pause();
  currentlyPlaying = el;
}

/** Renders one editorial video moment (see MediaMoment type). Lazy: the
 *  <video> element (and its network request) is only mounted once the
 *  player has scrolled into view at least once — until then, only the
 *  lightweight poster <img loading="lazy"> is rendered. Muted-autoplay
 *  while in view when the moment allows it; tap toggles sound (or,
 *  when autoplay isn't allowed, starts/stops playback). */
export function MediaMomentPlayer({
  moment,
  className = "",
}: {
  moment: MediaMomentType;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [everInView, setEverInView] = useState(false);
  const [inView, setInView] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setEverInView(true);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !everInView) return;
    if (inView && moment.autoplayMuted) {
      v.muted = true;
      claimPlayback(v);
      v.play().catch(() => {});
    } else if (!inView) {
      v.pause();
    }
  }, [inView, everInView, moment.autoplayMuted]);

  function toggleSound(e: React.MouseEvent) {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (!v.paused) claimPlayback(v);
  }

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      claimPlayback(v);
      v.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  const minutes = Math.floor(moment.durationSeconds / 60);
  const seconds = moment.durationSeconds % 60;
  const durationLabel = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl bg-ink/10 ${className}`}
    >
      {everInView ? (
        <video
          ref={videoRef}
          poster={moment.posterSrc}
          className="h-full w-full cursor-pointer object-cover"
          playsInline
          loop
          muted={muted}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
          onClick={moment.tapToPlay ? togglePlay : undefined}
        >
          <source src={moment.videoSrc} type="video/mp4" />
        </video>
      ) : (
        <img
          src={moment.posterSrc}
          alt={moment.caption}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      )}

      {everInView && !playing && (
        <button
          onClick={togglePlay}
          aria-label={`Play ${moment.caption}`}
          className="video-play-control absolute inset-0 flex items-center justify-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/50 backdrop-blur-sm">
            <Play size={18} className="ml-0.5 text-cream" fill="currentColor" />
          </div>
        </button>
      )}

      <div className="absolute right-2.5 top-2.5 rounded-full bg-ink/50 px-2 py-0.5 text-[10px] text-cream/90 backdrop-blur-sm">
        {durationLabel}
      </div>

      {everInView && playing && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Unmute" : "Mute"}
          className="video-sound-control absolute bottom-2.5 right-2.5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink/50 text-cream backdrop-blur-sm"
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-3 pr-16 pt-8">
        <p className="text-sm leading-snug text-cream [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
          {moment.caption}
        </p>
      </div>
    </div>
  );
}
