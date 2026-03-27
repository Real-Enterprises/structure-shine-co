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
  const displayed = services.slice(0, 5);

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {displayed.map((service, index) => {
            const icon = service.iconName
              ? (serviceIconMap[service.iconName] ?? premiumIcons.home)
              : premiumIcons.home;

            return (
              <Link
                key={service.slug}
                href="/services"
                className={`group p-5 bg-primary-foreground/5 rounded-2xl border border-primary-foreground/10 hover:bg-primary-foreground/10 hover:border-accent/50 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[150px] ${index === 4 ? "hidden lg:flex" : ""}`}
              >
                <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center text-primary-foreground group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground group-hover:shadow-[0_0_15px_rgba(var(--accent),0.4)] transition-all duration-300 mx-auto mb-4">
                  <PremiumIcon
                    icon={icon}
                    className="w-7 h-7"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="font-display text-sm sm:text-base font-semibold text-primary-foreground mb-1 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
