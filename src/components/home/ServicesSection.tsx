import { Link } from "react-router-dom";
import { Home, Building2, Paintbrush, HardHat, Key, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Home,
    title: "Residential Construction",
    description: "Custom homes and housing societies built with premium materials and modern designs that reflect your lifestyle.",
  },
  {
    icon: Building2,
    title: "Commercial Projects",
    description: "Plazas, offices, malls, and corporate buildings designed for functionality, efficiency, and lasting impression.",
  },
  {
    icon: Paintbrush,
    title: "Interior Design",
    description: "Transform spaces with our expert interior solutions—from contemporary minimalism to classic elegance.",
  },
  {
    icon: HardHat,
    title: "Grey Structure",
    description: "Solid foundations and structural work with the highest standards of engineering and safety compliance.",
  },
  {
    icon: Key,
    title: "Turnkey Solutions",
    description: "Complete end-to-end construction services—from planning to handover, we handle everything.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm tracking-widest uppercase mb-4 block">
            What We Offer
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comprehensive Construction Services
          </h2>
          <p className="text-muted-foreground text-lg">
            From concept to completion, we provide end-to-end construction solutions tailored to your vision and budget.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative p-8 bg-card rounded-lg border border-border hover:border-accent/50 hover:shadow-gold transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <service.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Link */}
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/services">
            <Button variant="premium" size="lg">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
