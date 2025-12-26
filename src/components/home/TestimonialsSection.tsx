import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    company: "Hassan Developers",
    text: "Real Enterprises transformed our vision into reality. Their attention to detail and commitment to quality is unmatched. The commercial plaza they built for us exceeded all expectations.",
    rating: 5,
  },
  {
    id: 2,
    name: "Fatima Khan",
    company: "Private Residence",
    text: "Building our dream home was a seamless experience with Real Enterprises. From the initial design to the final handover, they kept us informed every step of the way. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Muhammad Ali",
    company: "Ali & Sons Trading",
    text: "Professional, reliable, and efficient. Real Enterprises delivered our office building on time and within budget. The quality of construction is exceptional.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sara Malik",
    company: "Interior Boutique",
    text: "The interior design team at Real Enterprises has incredible taste. They completely redesigned our showroom and the results are stunning. Our customers love the new space!",
    rating: 5,
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

  const testimonial = testimonials[currentIndex];

  return (
    <section className="py-20 lg:py-32 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-accent font-medium text-sm tracking-widest uppercase mb-4 block">
              Testimonials
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
              What Our Clients Say
            </h2>
          </div>

          {/* Testimonial Card */}
          <div className="relative bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-primary-foreground/10">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 md:left-12">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-6 pt-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-display text-xl md:text-2xl text-primary-foreground leading-relaxed mb-8">
              "{testimonial.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-primary-foreground text-lg">
                  {testimonial.name}
                </div>
                <div className="text-primary-foreground/60 text-sm">
                  {testimonial.company}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-3">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-accent" : "bg-primary-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
