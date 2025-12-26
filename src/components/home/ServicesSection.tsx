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
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
              What We Do
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Our Services
            </h2>
          </div>
          <Link to="/services">
            <Button variant="heroLight" size="lg">
              All Services
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to="/services"
              className="group relative p-6 bg-background rounded-2xl border border-border hover:border-primary/20 hover:shadow-card transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-muted-foreground/30 font-display">
                  {service.count}
                </span>
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                Learn more
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
