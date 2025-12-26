import { MainLayout } from "@/components/layout";
import { Home, Building2, Paintbrush, HardHat, Key } from "lucide-react";

const services = [
  { icon: Home, title: "Residential Construction", description: "Custom homes, villas, and housing societies built with premium materials and modern designs." },
  { icon: Building2, title: "Commercial Projects", description: "Plazas, offices, malls, and corporate buildings designed for efficiency and lasting impression." },
  { icon: Paintbrush, title: "Interior Design", description: "Transform spaces with expert interior solutions—from contemporary minimalism to classic elegance." },
  { icon: HardHat, title: "Grey Structure", description: "Solid foundations and structural work with highest standards of engineering and safety." },
  { icon: Key, title: "Turnkey Solutions", description: "Complete end-to-end construction services—from planning to handover." },
];

const Services = () => {
  return (
    <MainLayout>
      <section className="pt-32 pb-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Our <span className="text-accent">Services</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Comprehensive construction solutions tailored to your vision and budget.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="p-8 bg-card rounded-lg border border-border hover:border-accent/50 hover:shadow-gold transition-all">
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Services;
