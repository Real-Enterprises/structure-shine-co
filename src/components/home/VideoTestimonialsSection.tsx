"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PremiumIcon, premiumIcons } from "@/components/icons/premium-icons";
import type { ClientInterview } from "@/lib/content";
import { cldHeroVideo } from "@/lib/cloudinary";

interface Props {
  interviews: ClientInterview[];
}

export function VideoTestimonialsSection({ interviews }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (interviews.length === 0) return null;

  const current = interviews[currentIndex];
  const { webm, mp4 } = cldHeroVideo(current.videoPublicId);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(
        ((index % interviews.length) + interviews.length) % interviews.length,
      );
    },
    [interviews.length],
  );

  const handleEnded = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  // Sync muted state to the video element after every remount (key change resets the DOM node)
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [currentIndex, muted]);

  // Reset to playing when switching videos
  useEffect(() => {
    setPlaying(true);
  }, [currentIndex]);

  const toggleMute = () => {
    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
    setMuted((m) => !m);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
            Client Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Hear From Our Clients
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-md mx-auto">
            Don&apos;t just take our word for it — watch what our clients have
            to say about building with Real Enterprises.
          </p>
        </div>

        <div className="max-w-sm mx-auto mt-10">
          {/* 9:16 portrait video */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-elevated bg-black"
            style={{ aspectRatio: "9/16" }}
          >
            <video
              ref={videoRef}
              key={current.videoPublicId}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted={muted}
              onEnded={handleEnded}
            >
              <source src={webm} type="video/webm" />
              <source src={mp4} type="video/mp4" />
            </video>

            {/* Overlay controls */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-4 bg-gradient-to-t from-black/60 to-transparent">
              {/* Previous */}
              <button
                onClick={() => goTo(currentIndex - 1)}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/35 transition-colors disabled:opacity-30"
                disabled={interviews.length < 2}
                aria-label="Previous video"
              >
                <PremiumIcon
                  icon={premiumIcons.chevronLeft}
                  className="w-5 h-5"
                  strokeWidth={1.95}
                />
              </button>

              {/* Mute / Unmute */}
              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/35 transition-colors"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? (
                  <PremiumIcon
                    icon={premiumIcons.volumeOff}
                    className="w-5 h-5"
                    strokeWidth={1.95}
                  />
                ) : (
                  <PremiumIcon
                    icon={premiumIcons.volumeOn}
                    className="w-5 h-5"
                    strokeWidth={1.95}
                  />
                )}
              </button>

              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/35 transition-colors"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <PremiumIcon
                    icon={premiumIcons.pause}
                    className="w-5 h-5"
                    strokeWidth={1.95}
                  />
                ) : (
                  <PremiumIcon
                    icon={premiumIcons.play}
                    className="w-5 h-5"
                    strokeWidth={1.95}
                  />
                )}
              </button>

              {/* Next */}
              <button
                onClick={() => goTo(currentIndex + 1)}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/35 transition-colors disabled:opacity-30"
                disabled={interviews.length < 2}
                aria-label="Next video"
              >
                <PremiumIcon
                  icon={premiumIcons.chevronRight}
                  className="w-5 h-5"
                  strokeWidth={1.95}
                />
              </button>
            </div>
          </div>

          {/* Dot navigation — only shown when there are multiple videos */}
          {interviews.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {interviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentIndex ? "bg-primary" : "bg-border"
                  }`}
                  aria-label={`Go to video ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
