import type { ImageMetadata } from 'astro';

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
