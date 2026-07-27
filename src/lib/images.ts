import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

// Local page-image registry. Every file in src/assets/images is eager-imported so a data-driven
// frontmatter string (a path or URL) can resolve to an astro:assets ImageMetadata — emitted,
// content-hashed and served same-origin. See handover/HANDOVER-images-astro-assets.md for why this
// resolver approach is used instead of the content-collection image() helper (which hard-fails on
// existing public paths).
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/*.{avif,webp,png,jpg,jpeg,svg}',
  { eager: true },
);

// Keyed by basename, e.g. "cpd-building-tas-hero.avif" -> ImageMetadata.
const byName: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(modules)) {
  const name = path.split('/').pop();
  if (name) byName[name] = mod.default;
}

/**
 * Resolve a frontmatter image value to a local ImageMetadata when its basename matches a file in
 * src/assets/images, otherwise return the value unchanged. Migrating an image is therefore just
 * moving the file into that folder — no frontmatter or schema change needed (basename match).
 */
export function resolveImage(src?: string): string | ImageMetadata | undefined {
  if (!src) return undefined;
  const name = src.split('/').pop();
  return (name && byName[name]) || src;
}

/**
 * The URL string to put in a raw `<img src>`. For a migrated local image this is the hashed,
 * same-origin asset URL; otherwise the original string (public path or remote URL). A no-op until
 * the file is moved into src/assets/images. (srcset/resize is a later upgrade via getImage().)
 */
export function imageUrl(src?: string): string | undefined {
  const resolved = resolveImage(src);
  return typeof resolved === 'string' || resolved === undefined ? resolved : resolved.src;
}

/**
 * An ABSOLUTE image URL, for JSON-LD (structured data wants a full URL, not a relative hashed path).
 * Resolves via imageUrl(), then absolutises a local/relative result against `base` (the page's
 * canonical); an already-absolute URL (e.g. a not-yet-migrated remote) is returned as-is.
 */
export function imageUrlAbs(src: string | undefined, base: string | URL): string | undefined {
  const url = imageUrl(src);
  if (!url) return undefined;
  return url.startsWith('http') ? url : new URL(url, base).href;
}

export interface Responsive { src: string; srcset?: string; sizes?: string; width?: number; height?: number; }

/**
 * Resolve `src` and, for a MIGRATED local image, run it through getImage() to produce a width-based
 * `srcset` (+ intrinsic width/height) for a responsive raw <img>. A not-yet-migrated public path or
 * remote URL comes back as a plain `{ src }` (no srcset), so callers render exactly as before.
 *
 * `sizes` describes the image's DISPLAY width per viewport and MUST accompany a width `srcset`; a
 * generous default is safe (the browser only ever over-picks slightly, never under-serves). Pass a
 * tighter `sizes` from a caller that knows its column width. Widths above the source are ignored by
 * Astro (no upscaling); the intrinsic width is always included so full-res stays available.
 */
export async function responsiveImg(
  src: string | undefined,
  opts: { widths?: number[]; sizes?: string } = {},
): Promise<Responsive | null> {
  const resolved = resolveImage(src);
  if (!resolved) return null;
  if (typeof resolved === 'string') return { src: resolved }; // remote/unmigrated: plain <img>, no srcset
  const widths = Array.from(
    new Set([...(opts.widths ?? [400, 800, 1200]), resolved.width].filter((w) => w <= resolved.width)),
  );
  const img = await getImage({ src: resolved, format: 'avif', widths });
  return {
    src: img.src,
    srcset: img.srcSet.attribute || undefined,
    sizes: opts.sizes ?? '(max-width: 800px) 100vw, 640px',
    width: Number(img.attributes.width) || undefined,
    height: Number(img.attributes.height) || undefined,
  };
}
