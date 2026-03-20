"use client";

import Link from "next/link";
import {
  PremiumIcon,
  premiumIcons,
  serviceIconMap,
} from "@/components/icons/premium-icons";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/content";

interface Props {
  services: Service[];
}

export function ServicesSection({ services }: Props) {
  return (
    <section className="py-14 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
            Our Services
          </h2>
          <Link href="/services">
            <Button variant="accent" size="sm">
              View All
              <PremiumIcon
                icon={premiumIcons.arrowUpRight}
                className="w-3.5 h-3.5"
                strokeWidth={1.85}
              />
            </Button>
          </Link>
        </div>

        {/* Compact horizontal scroll on mobile, grid on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {services.map((service) => {
            const icon = service.iconName
              ? (serviceIconMap[service.iconName] ?? premiumIcons.home)
              : premiumIcons.home;

            return (
              <Link
                key={service.slug}
                href="/services"
                className="group p-4 bg-primary-foreground/5 rounded-xl border border-primary-foreground/10 hover:bg-primary-foreground/10 hover:border-primary-foreground/20 transition-all duration-300 text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors mx-auto mb-3">
                  <PremiumIcon
                    icon={icon}
                    className="w-4 h-4"
                    strokeWidth={1.9}
                  />
                </div>
                <h3 className="font-display text-sm font-semibold text-primary-foreground mb-1">
                  {service.title}
                </h3>
                <p className="text-xs text-primary-foreground/50 leading-snug line-clamp-2">
                  {service.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
