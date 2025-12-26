import { MainLayout } from "@/components/layout";
import { Home, Building2, Paintbrush, HardHat, Key, ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Home,
    title: "Residential Construction",
    description: "Custom homes, villas, and housing societies built with premium materials and modern designs that reflect your lifestyle and aspirations.",
    features: ["Custom floor plans", "Premium materials", "Modern amenities", "Energy efficient"],
  },
  {
    icon: Building2,
    title: "Commercial Projects",
    description: "Plazas, offices, malls, and corporate buildings designed for functionality, efficiency, and lasting impression on your clients.",
    features: ["Office buildings", "Shopping plazas", "Retail spaces", "Corporate HQs"],
  },
  {
    icon: Paintbrush,
    title: "Interior Design",
    description: "Transform spaces with our expert interior solutions—from contemporary minimalism to classic elegance that matches your taste.",
    features: ["Space planning", "Custom furniture", "Lighting design", "Material selection"],
  },
  {
    icon: HardHat,
    title: "Grey Structure",
    description: "Solid foundations and structural work with the highest standards of engineering, safety compliance, and durability.",
    features: ["Foundation work", "Structural frames", "Roof construction", "Quality concrete"],
  },
  {
    icon: Key,
    title: "Turnkey Solutions",
    description: "Complete end-to-end construction services—from initial planning and design to final handover, we handle everything for you.",
    features: ["Full project management", "Single point of contact", "Budget control", "Timely delivery"],
  },
];

const Services = () => {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block animate-fade-up">
              Our Services
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
              Comprehensive
              <br />
              <span className="text-muted-foreground">Construction Solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up animation-delay-200">
              From concept to completion, we provide end-to-end solutions tailored to your vision and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-6">
            {services.map((service, index) => (
              <div key={service.title} className="bg-background rounded-2xl p-6 md:p-8 border border-border">
                <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                  <div className="md:col-span-1">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-foreground" />
                    </div>
                  </div>
                  <div className="md:col-span-7">
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="md:col-span-4">
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Start?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Contact us for a free consultation and let's discuss your project requirements.
          </p>
          <Link to="/contact">
            <Button variant="hero" size="xl">
              Get Free Quote
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default Services;
