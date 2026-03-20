import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getAllProjects,
  getProjectBySlug,
  type ProjectImage,
} from "@/lib/content";
import { cldGallery } from "@/lib/cloudinary";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

interface Props {
  params: { category: string; slug: string };
}

function getProjectImageUrl(image: ProjectImage): string | undefined {
  if (image.publicId) {
    return cldGallery(image.publicId);
  }

  return image.url;
}

function renderProjectDescription(description: string) {
  const blocks = description
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 0) return null;

  return blocks.map((block, blockIndex) => {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const content: JSX.Element[] = [];
    let paragraphLines: string[] = [];
    let listItems: string[] = [];

    const flushParagraph = () => {
      if (paragraphLines.length === 0) return;

      const paragraphIndex = content.length;

      content.push(
        <p
          key={`desc-paragraph-${blockIndex}-${paragraphIndex}`}
          className="leading-relaxed text-foreground/80"
        >
          {paragraphLines.map((line, lineIndex) => (
            <span
              key={`desc-line-${blockIndex}-${paragraphIndex}-${lineIndex}`}
            >
              {line}
              {lineIndex < paragraphLines.length - 1 && <br />}
            </span>
          ))}
        </p>,
      );

      paragraphLines = [];
    };

    const flushList = () => {
      if (listItems.length === 0) return;

      const listIndex = content.length;

      content.push(
        <ul
          key={`desc-list-${blockIndex}-${listIndex}`}
          className="list-disc space-y-2 pl-6 text-foreground/85 marker:text-accent"
        >
          {listItems.map((item, itemIndex) => (
            <li key={`desc-list-item-${blockIndex}-${listIndex}-${itemIndex}`}>
              {item}
            </li>
          ))}
        </ul>,
      );

      listItems = [];
    };

    lines.forEach((line) => {
      if (/^[-*]\s+/.test(line)) {
        flushParagraph();
        listItems.push(line.replace(/^[-*]\s+/, ""));
      } else {
        flushList();
        paragraphLines.push(line);
      }
    });

    flushParagraph();
    flushList();

    return (
      <div key={`desc-block-${blockIndex}`} className="space-y-4">
        {content}
      </div>
    );
  });
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  const firstGalleryImage = project.images
    .map((image) => getProjectImageUrl(image))
    .find((imageUrl): imageUrl is string => Boolean(imageUrl));

  const ogImage = firstGalleryImage || project.coverImage;

  return {
    title: project.seoTitle || project.title,
    description: project.seoDescription || project.description,
    openGraph: ogImage ? { images: [ogImage] } : undefined,
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const categoryLabel = project.category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const galleryImages = project.images
    .map((image, index) => {
      const src = getProjectImageUrl(image);

      return {
        src,
        alt: image.alt || `${project.title} photo ${index + 1}`,
      };
    })
    .filter((image): image is { src: string; alt: string } =>
      Boolean(image.src),
    );

  if (galleryImages.length === 0 && project.coverImage) {
    galleryImages.push({
      src: project.coverImage,
      alt: `${project.title} main image`,
    });
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-sky pt-16 pb-4 md:pt-20 md:pb-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link href="/portfolio" className="inline-flex">
              <Button
                variant="ghost"
                className="h-10 rounded-full px-4 text-foreground/75 hover:text-foreground hover:bg-background/70"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Button>
            </Link>

            <div className="mt-3 max-w-4xl">
              <span className="inline-flex min-h-8 items-center rounded-full bg-accent/12 px-3 text-xs font-semibold text-accent-foreground">
                {categoryLabel}
              </span>

              <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
                {project.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {project.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {project.startDate}
                  {project.completionDate
                    ? ` – ${project.completionDate}`
                    : " – Ongoing"}
                </span>
                <span className="inline-flex items-center gap-2 capitalize">
                  <CheckCircle2 className="h-4 w-4" />
                  {project.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="bg-background pt-2 pb-5 md:pt-3 md:pb-6">
          <div className="container mx-auto px-4 lg:px-8">
            <ProjectGallery images={galleryImages} title={project.title} />
          </div>
        </section>
      )}

      {/* Description */}
      <section className="bg-background pt-8 pb-14 md:pt-10 md:pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <article className="max-w-4xl mx-auto rounded-2xl border border-border/60 bg-card/70 p-6 md:p-10 shadow-soft backdrop-blur-sm">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              About This Project
            </h2>
            <div className="space-y-5 text-base md:text-lg">
              {renderProjectDescription(project.description)}
            </div>
          </article>
        </div>
      </section>

      {/* YouTube Video */}
      {project.youtubeId && (
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Project Walkthrough
              </h2>
              <YouTubeEmbed
                videoId={project.youtubeId}
                title={`${project.title} walkthrough`}
              />
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
            Let&apos;s discuss your vision and create something extraordinary
            together.
          </p>
          <Link href="/contact">
            <Button variant="hero" size="lg">
              Get a Free Quote
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
