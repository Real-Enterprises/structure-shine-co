import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { PremiumIcon, premiumIcons } from "@/components/icons/premium-icons";
import { Button } from "@/components/ui/button";
import type { BlogBodyBlock } from "@/lib/content";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostsByCategory,
} from "@/lib/content";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: { images: [post.coverImage] },
  };
}

function renderBodyBlock(block: BlogBodyBlock, index: number) {
  switch (block.type) {
    case "lead":
      return (
        <p
          key={`lead-${index}`}
          className="text-lg leading-8 text-foreground md:text-xl"
        >
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2
          key={`heading-${index}`}
          className="pt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
        >
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p
          key={`paragraph-${index}`}
          className="text-base leading-8 text-foreground/80 md:text-lg"
        >
          {block.text}
        </p>
      );
    case "bullets":
      return (
        <section key={`bullets-${index}`} className="space-y-4">
          {block.title ? (
            <h3 className="font-display text-xl font-bold text-foreground">
              {block.title}
            </h3>
          ) : null}
          <ul className="space-y-3 border-l border-border/70 pl-5 text-foreground/80">
            {block.bulletItems.map((item) => (
              <li
                key={item}
                className="relative leading-7 before:absolute before:-left-5 before:top-3 before:h-2 before:w-2 before:rounded-full before:bg-accent before:content-['']"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      );
    case "callout":
      return (
        <section
          key={`callout-${index}`}
          className="border-l-4 border-primary/70 bg-primary/5 px-5 py-4 text-foreground"
        >
          <h3 className="font-display text-lg font-bold text-foreground">
            {block.title}
          </h3>
          <p className="mt-2 leading-7 text-foreground/80">{block.text}</p>
        </section>
      );
    case "stats":
      return (
        <section key={`stats-${index}`} className="grid gap-4 md:grid-cols-3">
          {block.statItems.map((item) => (
            <div key={item.label} className="border-t border-border/70 pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-foreground">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground/70">
                {item.note}
              </p>
            </div>
          ))}
        </section>
      );
    case "table":
      return (
        <section
          key={`table-${index}`}
          className="overflow-hidden rounded-3xl border border-border/60 bg-card/60"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-secondary/60 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <tr>
                  <th className="px-5 py-4 font-semibold">Area</th>
                  <th className="px-5 py-4 font-semibold">
                    Typical positioning
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    What buyers expect
                  </th>
                </tr>
              </thead>
              <tbody>
                {block.tableRows.map((row) => (
                  <tr key={row.area} className="border-t border-border/60">
                    <td className="px-5 py-4 align-top font-medium text-foreground">
                      {row.area}
                    </td>
                    <td className="px-5 py-4 align-top text-foreground/80">
                      {row.positioning}
                    </td>
                    <td className="px-5 py-4 align-top text-foreground/80">
                      {row.expectation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
    default:
      return null;
  }
}

function renderBodyContent(body: unknown[] | string) {
  if (Array.isArray(body)) {
    return (
      <div className="space-y-8">
        {body.map((block, index) =>
          renderBodyBlock(block as BlogBodyBlock, index),
        )}
      </div>
    );
  }

  if (typeof body !== "string" || !body.trim()) return null;

  try {
    const parsed = JSON.parse(body) as unknown;

    if (Array.isArray(parsed)) {
      return (
        <div className="space-y-8">
          {parsed.map((block, index) =>
            renderBodyBlock(block as BlogBodyBlock, index),
          )}
        </div>
      );
    }
  } catch {
    // Fallback for older markdown-based content.
  }

  const ast = Markdoc.parse(body);
  const content = Markdoc.transform(ast);

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-primary prose-strong:text-foreground prose-li:text-foreground/80 prose-blockquote:border-l-primary prose-blockquote:text-foreground prose-table:w-full prose-th:border-border prose-td:border-border prose-td:text-foreground/80 prose-img:rounded-2xl">
      {Markdoc.renderers.react(content, React)}
    </div>
  );
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = getBlogPostsByCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <section className="relative pt-28 pb-12 bg-gradient-sky">
        <div className="container mx-auto px-4 lg:px-8">
          <Link href="/blog">
            <Button
              variant="ghost"
              className="mb-6 text-muted-foreground hover:text-foreground"
            >
              <PremiumIcon
                icon={premiumIcons.arrowLeft}
                className="w-4 h-4 mr-2"
                strokeWidth={1.9}
              />
              Back to Blog
            </Button>
          </Link>
          <div className="max-w-3xl">
            <span className="inline-block bg-accent/10 text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="mb-6 max-w-2xl text-lg leading-8 text-foreground/75 md:text-xl">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <PremiumIcon
                  icon={premiumIcons.user}
                  className="w-4 h-4"
                  strokeWidth={1.9}
                />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <PremiumIcon
                  icon={premiumIcons.calendar}
                  className="w-4 h-4"
                  strokeWidth={1.9}
                />
                {new Date(post.publishedDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background pb-10 pt-6 md:pt-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] shadow-elevated lg:max-w-4xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-[240px] w-full object-cover object-top md:h-[320px] lg:h-[380px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-background pb-16 pt-4 md:pt-6">
        <div className="container mx-auto px-4 lg:px-8">
          <article className="mx-auto max-w-3xl space-y-8">
            {renderBodyContent(post.body) ?? (
              <p className="text-base leading-8 text-foreground/80 md:text-lg">
                {post.excerpt}
              </p>
            )}
          </article>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-elevated transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={rp.coverImage}
                      alt={rp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                      {rp.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {rp.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
