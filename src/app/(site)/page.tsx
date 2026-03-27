import { HeroSection, CTASection } from "@/components/home";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { VideoTestimonialsSection } from "@/components/home/VideoTestimonialsSection";
import { BlogTeaserSection } from "@/components/home/BlogTeaserSection";
import CostEstimator from "@/components/CostEstimator";
import {
  getFeaturedProjects,
  getAllTestimonials,
  getClientInterviews,
  getServices,
  getLatestBlogPosts,
  getCompanyInfo,
  getPricingConfig,
} from "@/lib/content";

// TASK 8 — Local Business JSON-LD Schema
// TODO: Update address, phone, geo coordinates with real data before launch
export default function HomePage() {
  const projects = getFeaturedProjects();
  const testimonials = getAllTestimonials();
  const clientInterviews = getClientInterviews();
  const services = getServices();
  const posts = getLatestBlogPosts(3);
  const companyInfo = getCompanyInfo();
  const pricingConfig = getPricingConfig();

  const openingHoursSpecification =
    companyInfo.officeHours && companyInfo.officeHours.length
      ? companyInfo.officeHours.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: (h.days || "").split(",").map((d) => d.trim()),
          opens: h.opens || "09:00",
          closes: h.closes || "18:00",
        }))
      : [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "GeneralContractor",
            name: "Real Enterprises",
            description:
              "Premium construction company in Lahore with 25+ years of experience in residential, commercial, and interior construction.",
            url: "https://realenterprises.pk",
            telephone: "+92-300-000-0000",
            email: "info@realenterprises.pk",
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Main Boulevard, DHA Phase 5",
              addressLocality: "Lahore",
              addressRegion: "Punjab",
              postalCode: "54000",
              addressCountry: "PK",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 31.5204,
              longitude: 74.3587,
            },
            openingHoursSpecification: openingHoursSpecification,
            sameAs: [
              "https://facebook.com/realenterprises",
              "https://instagram.com/realenterprises",
            ],
            areaServed: {
              "@type": "City",
              name: "Lahore",
            },
            foundingDate: "2000",
            numberOfEmployees: {
              "@type": "QuantitativeValue",
              minValue: 50,
            },
          }),
        }}
      />
      <HeroSection videoPublicId={companyInfo.heroVideoPublicId} />
      <ServicesSection services={services} />
      {clientInterviews.length > 0 && (
        <VideoTestimonialsSection interviews={clientInterviews} />
      )}
      <FeaturedProjects projects={projects} />
      {pricingConfig.isEnabled && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#1A3C5E] mb-3">
                Estimate Your Construction Cost
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Use our instant calculator to get a ballpark figure for your
                project. Updated{" "}
                {new Date(pricingConfig.lastUpdated).toLocaleDateString(
                  "en-PK",
                  {
                    month: "long",
                    year: "numeric",
                  },
                )}
                .
              </p>
            </div>
            <CostEstimator config={pricingConfig} />
          </div>
        </section>
      )}
      <TestimonialsSection testimonials={testimonials} />
      <BlogTeaserSection posts={posts} />
      <CTASection companyInfo={companyInfo} />
    </>
  );
}
