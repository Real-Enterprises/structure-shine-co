import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Real Enterprises in Lahore for a free construction consultation. Residential, commercial, and interior projects. We respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block animate-fade-up">
              Contact
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
              Let&apos;s Build
              <br />
              <span className="text-muted-foreground">Together</span>
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up animation-delay-200">
              Get in touch for a free consultation. We respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <ContactClient />
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <Phone className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    {/* TODO: Replace with real number */}
                    <a href="tel:+923000000000" className="font-medium text-foreground hover:text-accent transition-colors">+92 300 000 0000</a>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <Mail className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    {/* TODO: Confirm real email */}
                    <a href="mailto:info@realenterprises.pk" className="font-medium text-foreground hover:text-accent transition-colors">info@realenterprises.pk</a>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Office</p>
                    {/* TODO: Replace with real office address */}
                    <p className="font-medium text-foreground">123 Main Boulevard, DHA Phase 5, Lahore</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <Clock className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Working Hours</p>
                    <p className="font-medium text-foreground">Mon - Sat: 9AM - 6PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
