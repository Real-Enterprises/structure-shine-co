import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "AfnanHussain10/structure-shine-co",
  },

  ui: {
    brand: { name: "Real Enterprises" },
  },

  collections: {
    // ── PROJECTS ───────────────────────────────
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Project Title",
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Residential", value: "residential" },
            { label: "Commercial", value: "commercial" },
            { label: "Interior", value: "interior" },
            { label: "Grey Structure", value: "grey-structure" },
            { label: "Turnkey", value: "turnkey" },
          ],
          defaultValue: "residential",
        }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Completed", value: "completed" },
            { label: "Ongoing", value: "ongoing" },
          ],
          defaultValue: "completed",
        }),
        location: fields.text({
          label: "Location (e.g. DHA Phase 6, Lahore)",
          validation: { isRequired: true },
        }),
        startDate: fields.text({
          label: "Start Date",
          description: "Format: MM/YYYY — e.g. 03/2023",
          validation: { isRequired: true },
        }),
        completionDate: fields.text({
          label: "Completion Date",
          description:
            "Format: MM/YYYY — e.g. 01/2024. Leave blank if ongoing.",
        }),
        size: fields.conditional(
          fields.select({
            label: "Project Size Unit",
            defaultValue: "none",
            options: [
              { label: "No size", value: "none" },
              { label: "Marla", value: "marla" },
              { label: "Kanal", value: "kanal" },
              { label: "Acre", value: "acre" },
            ],
          }),
          {
            none: fields.empty(),
            marla: fields.number({
              label: "Project Size",
              description: "Use marla for sizes below 20 marla.",
              step: 0.5,
              validation: {
                min: 0.5,
                max: 19.5,
                step: true,
              },
            }),
            kanal: fields.number({
              label: "Project Size",
              description: "Use kanal for sizes below 8 kanal.",
              step: 0.5,
              validation: {
                min: 1,
                max: 7.5,
                step: true,
              },
            }),
            acre: fields.number({
              label: "Project Size",
              description: "Use acre for plots 1 acre and above.",
              step: 0.25,
              validation: {
                min: 1,
                max: 100,
                step: true,
              },
            }),
          },
        ),
        isFeatured: fields.checkbox({
          label: "Show on Homepage (Featured)",
          defaultValue: false,
        }),
        coverImage: fields.text({
          label: "Cover Image URL (Cloudinary)",
          description: "Upload to Cloudinary first, paste URL here",
          validation: { isRequired: true },
        }),
        images: fields.array(
          fields.object({
            publicId: fields.text({
              label: "Image Public ID (Cloudinary)",
              description:
                "Recommended. Upload to Cloudinary and paste the public ID only, e.g. projects/dha/front-view",
            }),
            url: fields.text({
              label: "Image URL (fallback)",
              description:
                "Optional fallback for legacy entries. Use only if a Cloudinary public ID is not available yet.",
            }),
            alt: fields.text({ label: "Image Description" }),
          }),
          {
            label: "Project Gallery",
            description: "Prefer Cloudinary public IDs for optimized delivery.",
            itemLabel: (props) => props.fields.alt.value || "Image",
          },
        ),
        youtubeId: fields.text({
          label: "YouTube Video ID (optional)",
          description:
            "Paste only the ID from the YouTube URL. E.g. for " +
            "youtube.com/watch?v=abc123 paste: abc123",
        }),
        description: fields.text({
          label: "Project Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        seoTitle: fields.text({ label: "SEO Title (optional)" }),
        seoDescription: fields.text({
          label: "SEO Description (optional)",
          multiline: true,
        }),
      },
    }),

    // ── BLOG POSTS ─────────────────────────────
    blogPosts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/blog/*",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Post Title",
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Construction Tips", value: "construction-tips" },
            { label: "Design Inspiration", value: "design-inspiration" },
            { label: "Industry News", value: "industry-news" },
            { label: "Project Spotlight", value: "project-spotlight" },
            { label: "Lahore Real Estate", value: "lahore-real-estate" },
          ],
          defaultValue: "construction-tips",
        }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
          ],
          defaultValue: "draft",
        }),
        author: fields.text({
          label: "Author",
          defaultValue: "Real Enterprises Team",
        }),
        publishedDate: fields.date({
          label: "Published Date",
          validation: { isRequired: true },
        }),
        coverImage: fields.text({
          label: "Cover Image URL (Cloudinary)",
          validation: { isRequired: true },
        }),
        excerpt: fields.text({
          label: "Excerpt (shown on blog listing)",
          multiline: true,
          validation: { isRequired: true },
        }),
        body: fields.text({
          label: "Body JSON",
          multiline: true,
          description:
            'Paste a JSON array of blog blocks here. Copy this prompt into ChatGPT or any AI: "Create a production-ready JSON array for a construction blog post body. Use only these block types: lead, heading, paragraph, bullets, callout, stats, table. For lead, heading, and paragraph use { type, text }. For bullets use { type: \"bullets\", title, bulletItems: [] }. For callout use { type: \"callout\", title, text }. For stats use { type: \"stats\", statItems: [{ label, value, note }] }. For table use { type: \"table\", tableRows: [{ area, positioning, expectation }] }. Return valid JSON only, no markdown, no code fences, no explanation."',
        }),
        seoTitle: fields.text({ label: "SEO Title (optional)" }),
        seoDescription: fields.text({
          label: "SEO Description (optional)",
          multiline: true,
        }),
      },
    }),

    // ── TESTIMONIALS ───────────────────────────
    testimonials: collection({
      label: "Testimonials",
      slugField: "clientName",
      path: "src/content/testimonials/*",
      format: { data: "json" },
      schema: {
        clientName: fields.text({
          label: "Client Name",
          validation: { isRequired: true },
        }),
        company: fields.text({ label: "Company or Project (optional)" }),
        body: fields.text({
          label: "Testimonial",
          multiline: true,
          validation: { isRequired: true },
        }),
        rating: fields.select({
          label: "Star Rating",
          options: [
            { label: "⭐⭐⭐⭐⭐  5 stars", value: "5" },
            { label: "⭐⭐⭐⭐    4 stars", value: "4" },
            { label: "⭐⭐⭐      3 stars", value: "3" },
          ],
          defaultValue: "5",
        }),
        photo: fields.text({
          label: "Client Photo URL (Cloudinary, optional)",
        }),
        isVisible: fields.checkbox({
          label: "Show on website",
          defaultValue: true,
        }),
      },
    }),

    // ── CLIENT INTERVIEWS (video testimonials) ──
    clientInterviews: collection({
      label: "Client Interviews",
      slugField: "clientName",
      path: "src/content/client-interviews/*",
      format: { data: "json" },
      schema: {
        clientName: fields.text({
          label: "Client Name",
          validation: { isRequired: true },
        }),
        company: fields.text({ label: "Company or Project (optional)" }),
        body: fields.text({
          label: "What They Said (quote shown below the video)",
          multiline: true,
          validation: { isRequired: true },
        }),
        rating: fields.select({
          label: "Star Rating",
          options: [
            { label: "⭐⭐⭐⭐⭐  5 stars", value: "5" },
            { label: "⭐⭐⭐⭐    4 stars", value: "4" },
            { label: "⭐⭐⭐      3 stars", value: "3" },
          ],
          defaultValue: "5",
        }),
        photo: fields.text({
          label: "Client Photo URL (Cloudinary, optional)",
        }),
        videoPublicId: fields.text({
          label: "Video Public ID (Cloudinary)",
          description:
            "Upload the interview video to Cloudinary, then paste its Public ID here. " +
            "Do not include the file extension.",
          validation: { isRequired: true },
        }),
        isVisible: fields.checkbox({
          label: "Show on website",
          defaultValue: true,
        }),
      },
    }),
  },

  // ── SINGLETONS (one-off editable sections) ──
  singletons: {
    services: singleton({
      label: "Services",
      path: "src/content/singletons/services",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            slug: fields.text({
              label: "Slug (do not change)",
              validation: { isRequired: true },
            }),
            title: fields.text({
              label: "Service Title",
              validation: { isRequired: true },
            }),
            description: fields.text({
              label: "Description",
              multiline: true,
              validation: { isRequired: true },
            }),
            iconName: fields.text({
              label: "Icon Name (Lucide)",
              description: "e.g. Home, Building2, Paintbrush, HardHat, Key",
            }),
            isVisible: fields.checkbox({
              label: "Show on website",
              defaultValue: true,
            }),
          }),
          {
            label: "Services List",
            itemLabel: (props) => props.fields.title.value || "Service",
          },
        ),
      },
    }),

    companyInfo: singleton({
      label: "Company Info",
      path: "src/content/singletons/company-info",
      format: { data: "json" },
      schema: {
        phone: fields.text({ label: "Phone Number" }),
        email: fields.text({ label: "Email Address" }),
        address: fields.text({ label: "Office Address", multiline: true }),
        whatsappNumber: fields.text({
          label: "WhatsApp Number (digits only, with country code)",
          description: "e.g. 923001234567",
        }),
        officeHours: fields.array(
          fields.object({
            days: fields.text({
              label: "Days (comma separated)",
              description: "e.g. Monday, Tuesday or Mon-Fri",
            }),
            opens: fields.text({
              label: "Opens (24h)",
              description: "HH:MM format, e.g. 09:00",
            }),
            closes: fields.text({
              label: "Closes (24h)",
              description: "HH:MM format, e.g. 18:00",
            }),
          }),
          {
            label: "Office Hours",
            itemLabel: (props) => props.fields.days.value || "Hours",
          },
        ),
        facebookUrl: fields.text({ label: "Facebook URL" }),
        instagramUrl: fields.text({ label: "Instagram URL" }),
        linkedinUrl: fields.text({ label: "LinkedIn URL" }),
        googleMapsEmbedUrl: fields.text({
          label: "Google Maps Embed URL",
          description:
            "From Google Maps → Share → Embed a map → copy the src URL only",
          multiline: true,
        }),
        logoUrl: fields.text({
          label: "Logo Image URL (Cloudinary or /assets path)",
          description:
            "Paste a Cloudinary URL or a relative path like /assets/logo.png",
          validation: { isRequired: true },
        }),
        heroVideoPublicId: fields.text({
          label: "Hero Background Video ID (Cloudinary)",
          description:
            "Upload the video to Cloudinary, then paste its Public ID here. " +
            "Leave blank to show only the static background image.",
        }),
      },
    }),

    pricingConfig: singleton({
      label: "Cost Estimator Pricing",
      path: "src/content/singletons/pricing-config",
      format: { data: "json" },
      schema: {
        isEnabled: fields.checkbox({
          label: "Show Cost Estimator on website",
          defaultValue: true,
        }),
        lastUpdated: fields.date({
          label: "Prices Last Updated",
        }),
        disclaimer: fields.text({
          label: "Disclaimer text (shown below estimate)",
          defaultValue:
            "This is an approximate estimate only. Final costs depend on design, materials, location, and site conditions. Contact us for a detailed quote.",
          multiline: true,
        }),
        tiers: fields.array(
          fields.object({
            label: fields.text({
              label: "Construction Type Label",
              description:
                "e.g. Grey Structure, Standard Finishing, Premium Finishing, Turnkey",
              validation: { isRequired: true },
            }),
            pricePerSqFt: fields.number({
              label: "Price per Square Foot (PKR)",
              validation: { isRequired: true, min: 1 },
            }),
            description: fields.text({
              label: "Short description",
              description: "e.g. Foundation, columns, brickwork, and roof only",
              multiline: true,
            }),
            isPopular: fields.checkbox({
              label: "Mark as Most Popular",
              defaultValue: false,
            }),
          }),
          {
            label: "Pricing Tiers",
            description:
              "Add one row per construction type. Admin can update prices anytime.",
            itemLabel: (props) => props.fields.label.value || "Tier",
          },
        ),
      },
    }),
  },
});
