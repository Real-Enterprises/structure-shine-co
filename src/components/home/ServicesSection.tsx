import { Link } from "react-router-dom";
import { Home, Building2, Paintbrush, HardHat, Key, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Home,
    title: "Residential Construction",
    description: "Custom homes and housing societies with premium materials and modern designs.",
    count: "150+",
  },
  {
    icon: Building2,
    title: "Commercial Projects",
    description: "Plazas, offices, malls designed for functionality and lasting impression.",
    count: "80+",
  },
  {
    icon: Paintbrush,
    title: "Interior Design",
    description: "Transform spaces with expert solutions from minimalism to classic elegance.",
    count: "200+",
  },
  {
    icon: HardHat,
    title: "Grey Structure",
    description: "Solid foundations with highest standards of engineering and safety.",
    count: "120+",
  },
  {
    icon: Key,
    title: "Turnkey Solutions",
    description: "Complete end-to-end construction services from planning to handover.",
    count: "90+",
  },
];

export function ServicesSection() {
  return (
    <section className="py-14 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
            Our Services
          </h2>
          <Link to="/services">
            <Button variant="accent" size="sm">
              View All
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Compact horizontal scroll on mobile, grid on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {services.map((service) => (
            <Link
              key={service.title}
              to="/services"
              className="group p-4 bg-primary-foreground/5 rounded-xl border border-primary-foreground/10 hover:bg-primary-foreground/10 hover:border-primary-foreground/20 transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors mx-auto mb-3">
                <service.icon className="w-4 h-4" />
              </div>
              <h3 className="font-display text-sm font-semibold text-primary-foreground mb-1">
                {service.title}
              </h3>
              <p className="text-xs text-primary-foreground/50 leading-snug line-clamp-2">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
