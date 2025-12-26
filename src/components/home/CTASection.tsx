import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-primary p-8 md:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Build Your{" "}
              <span className="text-accent">Dream Project?</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-10">
              Contact us today for a free consultation. Our experts will help you bring your vision to life with quality construction and exceptional service.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Get Free Quote
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+923001234567">
                <Button variant="heroOutline" size="xl">
                  <Phone className="w-5 h-5" />
                  Call Now
                </Button>
              </a>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-primary-foreground/60">
              <a href="tel:+923001234567" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                +92 300 123 4567
              </a>
              <a href="mailto:info@realenterprises.pk" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                info@realenterprises.pk
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
