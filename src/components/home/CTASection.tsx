"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-primary-foreground/70 text-lg mb-8">
                Contact us today for a free consultation. Our experts will help you bring your vision to life.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button variant="accent" size="xl">
                    Get Free Quote
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                {/* TODO: Replace +923000000000 with real WhatsApp/phone number */}
                <a href="tel:+923000000000">
                  <Button size="xl" className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 rounded-full">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>

            {/* Right - Contact Cards */}
            <div className="grid gap-4">
              <div className="flex items-center gap-4 bg-primary-foreground/10 rounded-2xl p-5">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-primary-foreground/60 text-sm">Call Us</div>
                  <div className="text-primary-foreground font-semibold">+92 300 000 0000</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-primary-foreground/10 rounded-2xl p-5">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-primary-foreground/60 text-sm">Email Us</div>
                  <div className="text-primary-foreground font-semibold">info@realenterprises.pk</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-primary-foreground/10 rounded-2xl p-5">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-primary-foreground/60 text-sm">Visit Us</div>
                  <div className="text-primary-foreground font-semibold">123 Main Boulevard, DHA Phase 5, Lahore</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
