import Image from "next/image";
import Link from "next/link";
import { PremiumIcon, premiumIcons } from "@/components/icons/premium-icons";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/content";

interface Props {
  projects: Project[];
}

// Option B: Simple responsive grid — removed broken activeIndex state and prev/next buttons
export function FeaturedProjects({ projects }: Props) {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
              Portfolio
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Explore Our Projects
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/portfolio">
              <Button variant="heroLight">
                See All
                <PremiumIcon
                  icon={premiumIcons.arrowUpRight}
                  className="w-4 h-4"
                  strokeWidth={1.8}
                />
              </Button>
            </Link>
          </div>
        </div>

        {/* Responsive Projects Grid */}
        {projects.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            No featured projects yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.category}/${project.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4]"
              >
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                    {project.status === "completed" ? "Completed" : "Ongoing"}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-primary-foreground/60 text-xs font-medium uppercase tracking-wider mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-primary-foreground/60 text-sm">
                    <PremiumIcon
                      icon={premiumIcons.mapPin}
                      className="w-3.5 h-3.5"
                      strokeWidth={1.85}
                    />
                    {project.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
