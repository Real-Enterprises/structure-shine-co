"use client";

import { useState } from "react";
import Link from "next/link";
import { PremiumIcon, premiumIcons } from "@/components/icons/premium-icons";
import type { BlogPost } from "@/lib/content";

interface Props {
  posts: BlogPost[];
}

export function BlogClient({ posts }: Props) {
  const allCategories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category))),
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Filters */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">
              No posts yet. Check back soon!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <span className="inline-block bg-accent/10 text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <PremiumIcon
                          icon={premiumIcons.calendar}
                          className="w-3 h-3"
                          strokeWidth={1.9}
                        />
                        {new Date(post.publishedDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </div>
                      <PremiumIcon
                        icon={premiumIcons.arrowRight}
                        className="w-4 h-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary"
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
