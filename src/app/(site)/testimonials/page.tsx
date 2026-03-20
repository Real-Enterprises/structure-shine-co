import type { Metadata } from "next";
import { FilledStarIcon } from "@/components/icons/premium-icons";
import { getAllTestimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "See what clients say about Real Enterprises. Hundreds of satisfied homeowners and businesses across Lahore and Pakistan trust us for quality construction.",
};

export default function TestimonialsPage() {
  const testimonials = getAllTestimonials();
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block animate-fade-up">
              Testimonials
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
              What Our Clients
              <br />
              <span className="text-muted-foreground">Say About Us</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-3 gap-4 max-w-xl">
            {[
              { value: "98%", label: "Satisfaction Rate" },
              { value: "4.9", label: "Average Rating" },
              { value: "200+", label: "Happy Clients" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl p-5 text-center border border-border"
              >
                <div className="font-display text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.slug}
                className="bg-background rounded-2xl p-6 border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: parseInt(t.rating, 10) }).map(
                    (_, i) => (
                      <FilledStarIcon
                        key={i}
                        className="w-4 h-4 text-[#C8A951] drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]"
                      />
                    ),
                  )}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">
                  &ldquo;{t.body}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.clientName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      {t.clientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {t.clientName}
                    </div>
                    {t.company && (
                      <div className="text-xs text-muted-foreground">
                        {t.company}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
