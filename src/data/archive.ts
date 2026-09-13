import archive from "./archive.json";
import type { Guide } from "@/types";
const files = import.meta.glob("../assets/archive/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
export const archivePhotos = archive.photos.map((p) => ({
  ...p,
  src: files[`../assets/archive/${p.file}`],
}));
export const archiveStats = {
  scanned: archive.scanned,
  stories: archive.guides.length,
  photos: archivePhotos.length,
};
export const archiveGuides: Guide[] = archive.guides.map((g) => ({
  ...g,
  section: g.section as Guide["section"],
  photos: g.photoFiles
    .map((file) => archivePhotos.find((p) => p.file === file))
    .filter((p) => !!p)
    .map((p) => ({ src: p.src, caption: p.caption })),
}));
