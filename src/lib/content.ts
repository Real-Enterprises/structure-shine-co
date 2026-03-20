import fs from "fs";
import path from "path";

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

function readBlogEntries(): BlogPost[] {
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
}

function readSingleton<T>(filename: string): T {
  const fullPath = path.join(contentDir, "singletons", filename);
  return JSON.parse(fs.readFileSync(fullPath, "utf-8")) as T;
}

// ── Projects ───────────────────────────────────────

export function getAllProjects(): Project[] {
  return readJsonDir<Project>("projects");
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.isFeatured);
}

export function getProjectsByCategory(category: string): Project[] {
  return getAllProjects().filter((p) => p.category === category);
}

// ── Blog Posts ─────────────────────────────────────

export function getAllBlogPosts(): BlogPost[] {
  return readBlogEntries()
    .filter((p) => p.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime(),
    );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const all = readBlogEntries();
  return all.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter((p) => p.category === category);
}

export function getLatestBlogPosts(count = 3): BlogPost[] {
  return getAllBlogPosts().slice(0, count);
}

// ── Testimonials ───────────────────────────────────

export function getAllTestimonials(): Testimonial[] {
  return readJsonDir<Testimonial>("testimonials").filter((t) => t.isVisible);
}

// ── Client Interviews ──────────────────────────────

export function getClientInterviews(): ClientInterview[] {
  return readJsonDir<ClientInterview>("client-interviews").filter(
    (i) => i.isVisible,
  );
}

// ── Services ───────────────────────────────────────

export function getServices(): Service[] {
  const data = readSingleton<{ items: Service[] }>("services.json");
  return data.items.filter((s) => s.isVisible);
}

// ── Company Info ───────────────────────────────────

export function getCompanyInfo(): CompanyInfo {
  return readSingleton<CompanyInfo>("company-info.json");
}

// ── Pricing Config ─────────────────────────────────

export function getPricingConfig(): PricingConfig {
  return readSingleton<PricingConfig>("pricing-config.json");
}
