"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";
import { PremiumIcon, premiumIcons } from "@/components/icons/premium-icons";

type GalleryImage = {
  src: string;
  alt: string;
};

const ProjectGalleryLightbox = dynamic(
  () => import("./ProjectGalleryLightbox"),
  { ssr: false },
);

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
        <Image
          src={images[0].src}
          alt={images[0].alt}
          width={1200}
          height={750}
          sizes="(min-width: 1280px) 72rem, 100vw"
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex min-h-9 items-center gap-2 rounded-full border border-border/60 bg-background/85 px-3 text-xs font-semibold text-foreground shadow-soft">
          <PremiumIcon
            icon={premiumIcons.expand}
            className="h-3.5 w-3.5"
            strokeWidth={1.95}
          />
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
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 24vw, 9rem"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            );
          })}
        </div>
      )}

      {lightboxIndex >= 0 && (
        <ProjectGalleryLightbox
          slides={slides}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          finite={images.length <= 1}
        />
      )}
    </div>
  );
}
