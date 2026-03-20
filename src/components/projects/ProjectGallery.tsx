"use client";

import { useMemo, useState } from "react";
import { Expand } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

type GalleryImage = {
  src: string;
  alt: string;
};

interface ProjectGalleryProps {
  title: string;
  images: GalleryImage[];
}

export function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const slides = useMemo(
    () =>
      images.map((image) => ({
        src: image.src,
        alt: image.alt,
      })),
    [images],
  );

  if (images.length === 0) {
    return null;
  }

  const openViewer = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Project Gallery
        </h2>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Tap photo to view full-screen
        </p>
      </div>

      <button
        type="button"
        onClick={() => openViewer(0)}
        aria-label={`Open full-screen image for ${title}: ${images[0].alt}`}
        className="group relative block w-full overflow-hidden rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <img
          src={images[0].src}
          alt={images[0].alt}
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex min-h-9 items-center gap-2 rounded-full border border-border/60 bg-background/85 px-3 text-xs font-semibold text-foreground shadow-soft">
          <Expand className="h-3.5 w-3.5" />
          Zoom
        </span>
      </button>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-4 lg:grid-cols-5">
          {images.slice(1).map((image, index) => {
            const slideIndex = index + 1;

            return (
              <button
                key={`${image.src}-${slideIndex}`}
                type="button"
                onClick={() => openViewer(slideIndex)}
                aria-label={`Open full-screen image for ${title}: ${image.alt}`}
                className="group relative h-28 min-w-[9rem] overflow-hidden rounded-xl border border-border/60 bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:h-32 md:min-w-0"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            );
          })}
        </div>
      )}

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={Math.max(lightboxIndex, 0)}
        slides={slides}
        plugins={[Zoom]}
        controller={{ closeOnBackdropClick: true }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 120,
          scrollToZoom: true,
        }}
        carousel={{ finite: images.length <= 1 }}
      />
    </div>
  );
}
