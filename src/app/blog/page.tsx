import type { Metadata } from "next";
import { BlogClient } from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Construction insights, design tips, and industry news from Real Enterprises — Lahore's trusted construction company with 25+ years of expertise across Pakistan.",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-sky">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-accent rounded-full" />
            <span className="text-sm font-medium text-muted-foreground">Our Blog</span>
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Insights & Updates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert articles on construction, design, and industry trends in Pakistan.
          </p>
        </div>
      </section>
      <BlogClient />
    </>
  );
}
