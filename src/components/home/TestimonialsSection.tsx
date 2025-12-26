import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    company: "Hassan Developers",
    text: "Real Enterprises transformed our vision into reality. Their attention to detail and commitment to quality is unmatched. The commercial plaza they built exceeded all expectations.",
    rating: 5,
    image: "AH",
  },
  {
    id: 2,
    name: "Fatima Khan",
    company: "Private Residence",
    text: "Building our dream home was a seamless experience with Real Enterprises. From design to final handover, they kept us informed every step. Highly recommended!",
    rating: 5,
    image: "FK",
  },
  {
    id: 3,
    name: "Muhammad Ali",
    company: "Ali & Sons Trading",
    text: "Professional, reliable, and efficient. Real Enterprises delivered our office building on time and within budget. The quality of construction is exceptional.",
    rating: 5,
    image: "MA",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-sky">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Header */}
          <div>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
              Testimonials
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Don't just take our word for it. Here's what our satisfied clients have to say about working with Real Enterprises.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "98%", label: "Satisfaction" },
                { value: "4.9", label: "Avg Rating" },
                { value: "200+", label: "Reviews" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-background rounded-xl">
                  <div className="font-display text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Testimonial Card */}
          <div className="relative">
            <div className="bg-background rounded-2xl p-8 shadow-card border border-border">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg text-foreground leading-relaxed mb-8">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonials[currentIndex].image}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary" : "bg-border"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
