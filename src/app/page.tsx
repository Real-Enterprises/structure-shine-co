import { HeroSection, ServicesSection, FeaturedProjects, TestimonialsSection, CTASection } from "@/components/home";

// TASK 8 — Local Business JSON-LD Schema
// TODO: Update address, phone, geo coordinates with real data before launch
export default function HomePage() {
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
            openingHoursSpecification: [
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
            ],
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
      <HeroSection />
      <ServicesSection />
      <FeaturedProjects />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
