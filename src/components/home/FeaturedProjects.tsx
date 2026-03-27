"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { PremiumIcon, premiumIcons } from "@/components/icons/premium-icons";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/content";

interface Props {
  projects: Project[];
}

export function FeaturedProjects({ projects }: Props) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setActive((a) => Math.max(0, a - 1));
  const next = () => setActive((a) => Math.min(projects.length - 1, a + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0)
        next(); // swiped left
      else prev(); // swiped right
    }
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
    <section className="py-20 lg:py-32 bg-card overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-xl">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">
              Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Explore Our Projects
            </h2>
          </div>
          
          {/* Desktop "View Gallery" button stays in header */}
          <div className="hidden lg:flex items-center">
            <Link href="/portfolio">
              <Button variant="outline" className="rounded-full px-8 text-base">
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

      {/* --- MOBILE & TABLET CAROUSEL VIEW --- */}
      <div className="lg:hidden">
        <div
          className="relative w-full overflow-visible"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative min-h-[550px] md:min-h-[650px] perspective-1000 touch-pan-y">
            {projects.map((project, index) => {
              const offset = index - active;
              const isAbsoluteActive = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.category}/${project.slug}`}
                  className="absolute top-1/2 left-1/2 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-[90vw] sm:w-[65vw] block"
                  style={{
                    transform: `translate(calc(-50% + ${offset * 85}%), -50%) scale(${1 - Math.abs(offset) * 0.1})`,
                    opacity: isAbsoluteActive
                      ? 1
                      : Math.max(0, 1 - Math.abs(offset) * 0.4),
                    zIndex: 20 - Math.abs(offset),
                  }}
                  onClick={(e) => {
                    if (!isAbsoluteActive) {
                      e.preventDefault();
                      setActive(index);
                    }
                  }}
                >
                  <div
                    className={`relative aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${!isAbsoluteActive ? "cursor-pointer grayscale-[20%]" : ""}`}
                  >
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 90vw, 50vw"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                    <div
                      className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-all duration-700 transform ${isAbsoluteActive ? "translate-y-0 opacity-100 delay-200" : "translate-y-8 opacity-0"}`}
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-xs font-bold text-white uppercase tracking-widest bg-accent/90 backdrop-blur-sm rounded-sm px-3 py-1">
                          {project.category}
                        </span>
                        {project.status === "completed" && (
                          <span className="text-xs font-semibold text-green-100 uppercase tracking-widest border border-green-500/50 bg-green-500/30 rounded-sm px-3 py-1 backdrop-blur-md">
                            Completed
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-3xl md:text-4xl text-white font-bold mb-4 drop-shadow-md">
                        {project.title}
                      </h3>

                      <div className="flex items-center gap-4 text-white/80 text-sm font-medium mb-6">
                        <div className="flex items-center gap-1.5">
                          <PremiumIcon
                            icon={premiumIcons.mapPin}
                            className="w-4 h-4 text-accent"
                            strokeWidth={2}
                          />
                          {project.location}
                        </div>
                      </div>

                      <div
                        className={`inline-flex items-center gap-2 text-white font-semibold group-hover:text-accent transition-colors ${!isAbsoluteActive ? "pointer-events-none" : ""}`}
                      >
                        View Project Details
                        <PremiumIcon
                          icon={premiumIcons.arrowUpRight}
                          className="w-4 h-4 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Navigation & CTA inserted below carousel on mobile */}
          <div className="container mx-auto px-4 mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            {projects.length > 1 && (
              <div className="flex gap-4">
                <button
                  onClick={prev}
                  disabled={active === 0}
                  aria-label="Previous project"
                  className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-border disabled:hover:text-foreground disabled:cursor-not-allowed"
                >
                  <PremiumIcon
                    icon={premiumIcons.chevronLeft}
                    className="w-6 h-6"
                    strokeWidth={2}
                  />
                </button>
                <button
                  onClick={next}
                  disabled={active === projects.length - 1}
                  aria-label="Next project"
                  className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-border disabled:hover:text-foreground disabled:cursor-not-allowed"
                >
                  <PremiumIcon
                    icon={premiumIcons.chevronRight}
                    className="w-6 h-6"
                    strokeWidth={2}
                  />
                </button>
              </div>
            )}

            <Link href="/portfolio" className="w-full sm:w-auto">
              <Button variant="outline" className="rounded-full px-6 w-full py-6 text-base sm:py-2 hover:bg-accent hover:text-accent-foreground">
                View Gallery
                <PremiumIcon
                  icon={premiumIcons.arrowUpRight}
                  className="w-5 h-5 ml-2"
                  strokeWidth={1.8}
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* --- DESKTOP STATIC GRID VIEW --- */}
      <div className="hidden lg:block container mx-auto px-8">
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.category}/${project.slug}`}
              className="group relative block aspect-[4/5] xl:aspect-[3/4] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-out"
            >
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(min-width: 1280px) 33vw, 50vw"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-accent/90 backdrop-blur-sm rounded-sm px-2 py-0.5 shadow-sm">
                    {project.category}
                  </span>
                  {project.status === "completed" && (
                    <span className="text-[10px] font-semibold text-green-100 uppercase tracking-wider border border-green-500/50 bg-green-500/30 rounded-sm px-2 py-0.5 backdrop-blur-md shadow-sm">
                      Completed
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl xl:text-3xl text-white font-bold mb-2 drop-shadow-md leading-tight">
                  {project.title}
                </h3>

                <div className="flex items-center gap-4 text-white/80 text-xs font-medium mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <div className="flex items-center gap-1.5">
                    <PremiumIcon
                      icon={premiumIcons.mapPin}
                      className="w-4 h-4 text-accent"
                      strokeWidth={2}
                    />
                    {project.location}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-white text-sm font-semibold group-hover:text-accent transition-colors opacity-0 group-hover:opacity-100 duration-500 delay-150">
                  View Project Details
                  <PremiumIcon
                    icon={premiumIcons.arrowUpRight}
                    className="w-3.5 h-3.5 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
