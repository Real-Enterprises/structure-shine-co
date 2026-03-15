import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import YouTubeEmbed from "@/components/YouTubeEmbed";

interface Props {
  params: { category: string; slug: string };
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.seoTitle || project.title,
    description: project.seoDescription || project.description,
    openGraph: { images: [project.coverImage] },
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const categoryLabel = project.category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-12 bg-gradient-sky">
        <div className="container mx-auto px-4 lg:px-8">
          <Link href="/portfolio">
            <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          <div className="max-w-3xl">
            <span className="inline-block bg-accent/10 text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {categoryLabel}
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {project.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {project.startDate}
                {project.completionDate ? ` – ${project.completionDate}` : " – Ongoing"}
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {project.status}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="bg-background">
        <div className="container mx-auto px-4 lg:px-8 -mt-2">
          <div className="max-w-5xl mx-auto">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full aspect-[2/1] object-cover rounded-2xl shadow-elevated"
            />
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">About This Project</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{project.description}</p>
          </div>
        </div>
      </section>

      {/* YouTube Video */}
      {project.youtubeId && (
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Project Walkthrough</h2>
              <YouTubeEmbed videoId={project.youtubeId} title={`${project.title} walkthrough`} />
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.images.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.images.map((img, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src={img.url}
                    alt={img.alt || `${project.title} photo ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Interested in a Similar Project?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Let&apos;s discuss your vision and create something extraordinary together.
          </p>
          <Link href="/contact">
            <Button variant="hero" size="lg">Get a Free Quote</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
