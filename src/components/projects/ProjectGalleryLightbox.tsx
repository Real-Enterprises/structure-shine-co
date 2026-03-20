"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

type GallerySlide = {
  src: string;
  alt: string;
};

interface ProjectGalleryLightboxProps {
  slides: GallerySlide[];
  index: number;
  onClose: () => void;
  finite: boolean;
}

export default function ProjectGalleryLightbox({
  slides,
  index,
  onClose,
  finite,
}: ProjectGalleryLightboxProps) {
  return (
    <Lightbox
      open
      close={onClose}
      index={index}
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
      carousel={{ finite }}
    />
  );
}
