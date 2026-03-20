import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PremiumIcon, premiumIcons } from "@/components/icons/premium-icons";
import { Button } from "@/components/ui/button";
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

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = getBlogPostsByCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      {/* Hero */}
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

      {/* Featured Image */}
      <section className="bg-background">
        <div className="container mx-auto px-4 lg:px-8 -mt-2">
          <div className="max-w-4xl mx-auto">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full aspect-[2/1] object-cover rounded-2xl shadow-elevated"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <article className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            <p className="text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </article>
        </div>
      </section>

      {/* Related Posts */}
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
