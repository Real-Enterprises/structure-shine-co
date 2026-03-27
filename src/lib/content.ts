import fs from "fs";
import path from "path";
import { cache } from "react";

const contentDir = path.join(process.cwd(), "src/content");

// ── Types ──────────────────────────────────────────

export type ProjectImage = {
  publicId?: string;
  url?: string;
  alt?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  status: string;
  location: string;
  startDate: string;
  completionDate?: string;
  isFeatured: boolean;
  coverImage: string;
  images: ProjectImage[];
  youtubeId?: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  order?: number;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  status: string;
  author: string;
  publishedDate: string;
  coverImage: string;
  excerpt: string;
  body: BlogBodyBlock[] | string;
  seoTitle?: string;
  seoDescription?: string;
  order?: number;
};

export type BlogBodyBlock =
  | {
      type: "lead";
      text: string;
    }
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "bullets";
      title?: string;
      bulletItems: string[];
    }
  | {
      type: "callout";
      title: string;
      text: string;
    }
  | {
      type: "stats";
      statItems: {
        label: string;
        value: string;
        note: string;
      }[];
    }
  | {
      type: "table";
      tableRows: {
        area: string;
        positioning: string;
        expectation: string;
      }[];
    };

export type Testimonial = {
  slug: string;
  clientName: string;
  company?: string;
  body: string;
  rating: string;
  photo?: string;
  isVisible: boolean;
  order?: number;
};

export type ClientInterview = {
  slug: string;
  clientName: string;
  company?: string;
  body: string;
  rating: string;
  photo?: string;
  videoPublicId: string;
  isVisible: boolean;
  order?: number;
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  iconName?: string;
  isVisible: boolean;
};

export type CompanyInfo = {
  phone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  googleMapsEmbedUrl: string;
  heroVideoPublicId?: string;
  officeHours?: { days: string; opens: string; closes: string }[];
};

export type PricingTier = {
  label: string;
  pricePerSqFt: number;
  description: string;
  isPopular: boolean;
};

export type PricingConfig = {
  isEnabled: boolean;
  lastUpdated: string;
  disclaimer: string;
  tiers: PricingTier[];
};

// ── Helpers ────────────────────────────────────────

function readJsonDir<T>(dir: string, withSlug = true): T[] {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(fullPath, f), "utf-8");
      const data = JSON.parse(raw);
      return withSlug ? { ...data, slug: f.replace(".json", "") } : data;
    });
}

const readJsonDirCached = cache((dir: string, withSlug = true) =>
  readJsonDir(dir, withSlug),
);

const readBlogEntries = cache((): BlogPost[] => {
  const fullPath = path.join(contentDir, "blog");
  if (!fs.existsSync(fullPath)) return [];

  return fs.readdirSync(fullPath, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isFile() && entry.name.endsWith(".json")) {
      const slug = entry.name.replace(/\.json$/, "");
      const raw = fs.readFileSync(path.join(fullPath, entry.name), "utf-8");
      const data = JSON.parse(raw) as BlogPost;
      const bodyPath = path.join(fullPath, slug, "body.mdoc");

      return [
        {
          ...data,
          slug,
          body: fs.existsSync(bodyPath)
            ? fs.readFileSync(bodyPath, "utf-8")
            : data.body,
        },
      ];
    }

    if (entry.isDirectory()) {
      const indexJsonPath = path.join(fullPath, entry.name, "index.json");
      const bodyPath = path.join(fullPath, entry.name, "body.mdoc");

      if (!fs.existsSync(indexJsonPath)) return [];

      const raw = fs.readFileSync(indexJsonPath, "utf-8");
      const data = JSON.parse(raw) as BlogPost;

      return [
        {
          ...data,
          slug: entry.name,
          body: fs.existsSync(bodyPath)
            ? fs.readFileSync(bodyPath, "utf-8")
            : data.body,
        },
      ];
    }

    return [];
  });
});

function readSingleton<T>(filename: string): T {
  const fullPath = path.join(contentDir, "singletons", filename);
  return JSON.parse(fs.readFileSync(fullPath, "utf-8")) as T;
}

const readSingletonCached = cache((filename: string) =>
  readSingleton(filename),
);

// ── Projects ───────────────────────────────────────

export const getAllProjects = cache((): Project[] => {
  const items = readJsonDirCached("projects") as Project[];
  if (items.some((p) => p.order != null)) {
    return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
  return items;
});

export const getProjectBySlug = cache((slug: string): Project | undefined =>
  getAllProjects().find((p) => p.slug === slug),
);

export const getFeaturedProjects = cache((): Project[] =>
  getAllProjects().filter((p) => p.isFeatured),
);

export function getProjectsByCategory(category: string): Project[] {
  return getAllProjects().filter((p) => p.category === category);
}

// ── Blog Posts ─────────────────────────────────────

export const getAllBlogPosts = cache((): BlogPost[] => {
  const posts = readBlogEntries().filter((p) => p.status === "published");
  if (posts.some((p) => p.order != null)) {
    return [...posts].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
  return posts.sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  );
});

export const getBlogPostBySlug = cache((slug: string): BlogPost | undefined =>
  readBlogEntries().find((p) => p.slug === slug),
);

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter((p) => p.category === category);
}

export function getLatestBlogPosts(count = 3): BlogPost[] {
  return getAllBlogPosts().slice(0, count);
}

// ── Testimonials ───────────────────────────────────

export const getAllTestimonials = cache((): Testimonial[] => {
  const items = (readJsonDirCached("testimonials") as Testimonial[]).map(
    (t) => ({
      ...t,
      rating: t.rating ?? "5",
      clientName: (t as any).clientName ?? (t as any).slug ?? "",
    }),
  );
  if (items.some((t) => t.order != null)) {
    return items
      .filter((t) => t.isVisible)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
  return items.filter((t) => t.isVisible);
});

// ── Client Interviews ──────────────────────────────

export const getClientInterviews = cache((): ClientInterview[] => {
  const items = readJsonDirCached("client-interviews") as ClientInterview[];
  if (items.some((i) => i.order != null)) {
    return items
      .filter((i) => i.isVisible)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
  return items.filter((i) => i.isVisible);
});

// ── Services ───────────────────────────────────────

export const getServices = cache((): Service[] => {
  const data = readSingletonCached("services.json") as { items: Service[] };
  return data.items.filter((s) => s.isVisible);
});

// ── Company Info ───────────────────────────────────

export const getCompanyInfo = cache(
  (): CompanyInfo => readSingletonCached("company-info.json") as CompanyInfo,
);

// ── Pricing Config ─────────────────────────────────

export const getPricingConfig = cache(
  (): PricingConfig =>
    readSingletonCached("pricing-config.json") as PricingConfig,
);
