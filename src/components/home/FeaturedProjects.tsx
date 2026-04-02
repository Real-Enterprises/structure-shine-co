"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { PremiumIcon, premiumIcons } from "@/components/icons/premium-icons";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/content";
import { formatProjectSize } from "@/lib/project-size";

interface Props {
  projects: Project[];
}

const DESKTOP_VISIBLE = 3;

export function FeaturedProjects({ projects }: Props) {
  const [desktopActive, setDesktopActive] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const desktopMax = Math.max(0, projects.length - DESKTOP_VISIBLE);
  const mobileMax = projects.length - 1;

  const prevDesktop = () => setDesktopActive((a) => Math.max(0, a - 1));
  const nextDesktop = () =>
    setDesktopActive((a) => Math.min(desktopMax, a + 1));
  const prevMobile = () => setMobileActive((a) => Math.max(0, a - 1));
  const nextMobile = () => setMobileActive((a) => Math.min(mobileMax, a + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? nextMobile() : prevMobile();
    touchStartX.current = null;
  };

  if (projects.length === 0) {
    return (
      <section className="py-24 bg-card">
        <p className="text-muted-foreground text-center py-12">
          No featured projects yet.
        </p>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 bg-card overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 lg:mb-12">
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-3 block">
              Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Explore Our Projects
            </h2>
          </div>
          <Link href="/portfolio" className="hidden lg:inline-flex">
            <Button variant="outline" className="rounded-full px-7">
              View Gallery
              <PremiumIcon
                icon={premiumIcons.arrowUpRight}
                className="w-4 h-4 ml-2"
                strokeWidth={1.8}
              />
            </Button>
          </Link>
        </div>
      </div>

      {/* ── MOBILE CAROUSEL (< lg) ────────────────────── */}
      <div className="lg:hidden">
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(calc(-${mobileActive} * 100%))` }}
          >
            {projects.map((project) => {
              const projectSize = formatProjectSize(project.size);

              return (
                <div key={project.slug} className="flex-shrink-0 w-full px-4">
                  <Link
                    href={`/projects/${project.category}/${project.slug}`}
                    className="block relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl group"
                  >
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="95vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    {/* Badges top-left */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-accent/90 backdrop-blur-sm rounded-sm px-2.5 py-1">
                        {project.category.replace(/-/g, " ")}
                      </span>
                      {project.status === "completed" && (
                        <span className="text-[10px] font-semibold text-green-100 uppercase tracking-wider border border-green-500/50 bg-green-500/30 backdrop-blur-sm rounded-sm px-2.5 py-1">
                          Completed
                        </span>
                      )}
                    </div>
                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-xl font-bold text-white leading-tight mb-1.5 drop-shadow">
                        {project.title}
                      </h3>
                      <div className="space-y-1.5 text-xs text-white/75">
                        <div className="flex items-center gap-1.5">
                          <PremiumIcon
                            icon={premiumIcons.mapPin}
                            className="w-3.5 h-3.5 text-accent flex-shrink-0"
                            strokeWidth={2}
                          />
                          {project.location}
                        </div>
                        {projectSize && (
                          <div className="flex items-center gap-1.5 text-white/80">
                            <PremiumIcon
                              icon={premiumIcons.expand}
                              className="w-3.5 h-3.5 text-accent flex-shrink-0"
                              strokeWidth={2}
                            />
                            {projectSize}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile controls */}
        <div className="container mx-auto px-4 mt-6 flex flex-col items-center gap-5">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileActive(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === mobileActive
                    ? "w-6 h-2 bg-accent"
                    : "w-2 h-2 bg-foreground/25 hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>

          {/* Arrows + View Gallery */}
          <div className="flex items-center gap-3 w-full">
            {projects.length > 1 && (
              <div className="flex gap-2">
                <button
                  onClick={prevMobile}
                  disabled={mobileActive === 0}
                  aria-label="Previous"
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <PremiumIcon
                    icon={premiumIcons.chevronLeft}
                    className="w-5 h-5"
                    strokeWidth={2}
                  />
                </button>
                <button
                  onClick={nextMobile}
                  disabled={mobileActive === mobileMax}
                  aria-label="Next"
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <PremiumIcon
                    icon={premiumIcons.chevronRight}
                    className="w-5 h-5"
                    strokeWidth={2}
                  />
                </button>
              </div>
            )}
            <Link href="/portfolio" className="flex-1">
              <Button variant="outline" className="rounded-full w-full">
                View Gallery
                <PremiumIcon
                  icon={premiumIcons.arrowUpRight}
                  className="w-4 h-4 ml-2"
                  strokeWidth={1.8}
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── DESKTOP CAROUSEL (lg+) ────────────────────── */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-8">
          {/* Track wrapper */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateX(calc(-${desktopActive} * (33.3333% + 0.5rem)))`,
              }}
            >
              {projects.map((project) => {
                const projectSize = formatProjectSize(project.size);

                return (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.category}/${project.slug}`}
                    className="flex-shrink-0 w-[calc(33.333%-1rem)] group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
                  >
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-opacity duration-500" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-accent/90 backdrop-blur-sm rounded-sm px-2.5 py-1">
                        {project.category.replace(/-/g, " ")}
                      </span>
                      {project.status === "completed" && (
                        <span className="text-[10px] font-semibold text-green-100 uppercase tracking-wider border border-green-500/50 bg-green-500/30 backdrop-blur-sm rounded-sm px-2.5 py-1">
                          Completed
                        </span>
                      )}
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-lg font-bold text-white leading-snug mb-2 drop-shadow">
                        {project.title}
                      </h3>
                      <div className="space-y-1.5 text-xs mb-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                        <div className="flex items-center gap-1.5 text-white/70">
                          <PremiumIcon
                            icon={premiumIcons.mapPin}
                            className="w-3.5 h-3.5 text-accent flex-shrink-0"
                            strokeWidth={2}
                          />
                          {project.location}
                        </div>
                        {projectSize && (
                          <div className="flex items-center gap-1.5 text-white/80">
                            <PremiumIcon
                              icon={premiumIcons.expand}
                              className="w-3.5 h-3.5 text-accent flex-shrink-0"
                              strokeWidth={2}
                            />
                            {projectSize}
                          </div>
                        )}
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 group-hover:text-accent translate-y-1 group-hover:translate-y-0 transition-all duration-300 delay-75">
                        View Details
                        <PremiumIcon
                          icon={premiumIcons.arrowUpRight}
                          className="w-3.5 h-3.5"
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop controls */}
          <div className="mt-8 flex items-center justify-between">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setDesktopActive(Math.min(i, desktopMax))}
                  aria-label={`Go to project ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i >= desktopActive && i < desktopActive + DESKTOP_VISIBLE
                      ? "w-5 h-2 bg-accent"
                      : "w-2 h-2 bg-foreground/25 hover:bg-foreground/50"
                  }`}
                />
              ))}
            </div>

            {/* Nav arrows */}
            {projects.length > DESKTOP_VISIBLE && (
              <div className="flex gap-3">
                <button
                  onClick={prevDesktop}
                  disabled={desktopActive === 0}
                  aria-label="Previous"
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <PremiumIcon
                    icon={premiumIcons.chevronLeft}
                    className="w-5 h-5"
                    strokeWidth={2}
                  />
                </button>
                <button
                  onClick={nextDesktop}
                  disabled={desktopActive === desktopMax}
                  aria-label="Next"
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <PremiumIcon
                    icon={premiumIcons.chevronRight}
                    className="w-5 h-5"
                    strokeWidth={2}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
