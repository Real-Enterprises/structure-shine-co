import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PremiumIcon,
  premiumIcons,
  serviceIconMap,
} from "@/components/icons/premium-icons";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Real Enterprises offers comprehensive construction services in Lahore — residential homes, commercial buildings, interior design, grey structure, and turnkey solutions across Pakistan.",
};

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
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
              <span className="text-muted-foreground">
                Construction Solutions
              </span>
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up animation-delay-200">
              From concept to completion, we provide end-to-end solutions
              tailored to your vision and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-6">
            {services.map((service) => {
              const icon =
                (service.iconName && serviceIconMap[service.iconName]) ||
                premiumIcons.wrench;

              return (
                <div
                  key={service.slug}
                  className="bg-background rounded-2xl p-6 md:p-8 border border-border"
                >
                  <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                    <div className="md:col-span-1">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                        <PremiumIcon
                          icon={icon}
                          className="w-5 h-5 text-foreground"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-11">
                      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Start?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Get a free consultation and quote for your project today.
          </p>
          <Link href="/contact">
            <Button variant="hero" size="lg">
              Get Free Quote
              <PremiumIcon
                icon={premiumIcons.arrowUpRight}
                className="w-4 h-4"
              />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
