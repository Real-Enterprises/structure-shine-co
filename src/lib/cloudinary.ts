const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

type CloudinaryOptions = {
  width?: number;
  height?: number;
  quality?: number | "auto";
  format?: "auto" | "webp" | "avif";
  crop?: "fill" | "fit" | "scale";
};

export function cloudinaryUrl(
  publicId: string,
  options: CloudinaryOptions = {},
): string {
  const {
    width,
    height,
    quality = "auto",
    format = "auto",
    crop = "fill",
  } = options;

  const transforms = [
    `f_${format}`,
    `q_${quality}`,
    width && `w_${width}`,
    height && `h_${height}`,
    (width || height) && `c_${crop}`,
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

// ── Video ─────────────────────────────────────────────────────────────────

export function cloudinaryVideoUrl(
  publicId: string,
  format: "mp4" | "webm" = "mp4",
): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_auto,f_${format}/${publicId}`;
}

// Returns both format URLs for use in <source> elements
export function cldHeroVideo(publicId: string): { webm: string; mp4: string } {
  return {
    webm: cloudinaryVideoUrl(publicId, "webm"),
    mp4: cloudinaryVideoUrl(publicId, "mp4"),
  };
}

// ── Image presets ──────────────────────────────────────────────────────────

// Presets for common use cases
export const cldCover = (id: string) =>
  cloudinaryUrl(id, { width: 800, height: 500, format: "auto" });

export const cldGallery = (id: string) =>
  cloudinaryUrl(id, { width: 1200, height: 800, format: "auto" });

export const cldThumb = (id: string) =>
  cloudinaryUrl(id, { width: 400, height: 300, format: "auto" });

export const cldAvatar = (id: string) =>
  cloudinaryUrl(id, { width: 100, height: 100, crop: "fill", format: "auto" });
