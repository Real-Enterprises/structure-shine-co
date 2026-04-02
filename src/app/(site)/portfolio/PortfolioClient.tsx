"use client";

import { useState } from "react";
import Link from "next/link";
import { PremiumIcon, premiumIcons } from "@/components/icons/premium-icons";
import type { Project } from "@/lib/content";
import { formatProjectSize } from "@/lib/project-size";

const categories = [
  "All",
  "Residential",
  "Commercial",
  "Interior",
  "Grey Structure",
  "Turnkey",
];

interface Props {
  projects: Project[];
}

export function PortfolioClient({ projects }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.category.toLowerCase() ===
            activeCategory.toLowerCase().replace(" ", "-"),
        );

  return (
    <>
      {/* Filters */}
      <section className="pb-8 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredProjects.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">
              No projects found in this category yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => {
                const projectSize = formatProjectSize(project.size);

                return (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.category}/${project.slug}`}
                    className="group relative rounded-2xl overflow-hidden aspect-[4/3]"
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-70" />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
                          project.status === "completed"
                            ? "bg-green-500/20 text-green-100"
                            : "bg-accent/30 text-accent"
                        }`}
                      >
                        {project.status === "completed"
                          ? "Completed"
                          : "Ongoing"}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-primary-foreground/60 text-xs font-medium uppercase tracking-wider mb-2 block">
                        {project.category}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2">
                        {project.title}
                      </h3>
                      <div className="space-y-1.5 text-sm text-primary-foreground/60">
                        <div className="flex items-center gap-2">
                          <PremiumIcon
                            icon={premiumIcons.mapPin}
                            className="w-3.5 h-3.5"
                            strokeWidth={1.85}
                          />
                          {project.location}
                        </div>
                        {projectSize && (
                          <div className="flex items-center gap-2">
                            <PremiumIcon
                              icon={premiumIcons.expand}
                              className="w-3.5 h-3.5"
                              strokeWidth={1.85}
                            />
                            {projectSize}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
