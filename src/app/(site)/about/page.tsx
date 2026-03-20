import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PremiumIcon, premiumIcons } from "@/components/icons/premium-icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Real Enterprises — 25 years of trusted construction excellence in Lahore, Pakistan. Residential, commercial, and interior projects built with integrity.",
};

const stats = [
  { icon: premiumIcons.clock, value: "25+", label: "Years Experience" },
  { icon: premiumIcons.checkBadge, value: "500+", label: "Projects Completed" },
  { icon: premiumIcons.team, value: "200+", label: "Happy Clients" },
  { icon: premiumIcons.award, value: "50+", label: "Awards Won" },
];

const values = [
  {
    title: "Quality First",
    description: "We never compromise on construction quality and materials.",
  },
  {
    title: "Transparency",
    description:
      "Clear communication and honest pricing throughout the project.",
  },
  {
    title: "Innovation",
    description: "Modern techniques and sustainable building practices.",
  },
  {
    title: "Reliability",
    description: "On-time delivery with budget adherence guaranteed.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block animate-fade-up">
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
              25 Years of Building
              <br />
              <span className="text-muted-foreground">Trust & Excellence</span>
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up animation-delay-200">
              From humble beginnings to becoming one of Pakistan's most trusted
              construction companies.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-2xl p-6 border border-border text-center"
              >
                <PremiumIcon
                  icon={stat.icon}
                  className="w-6 h-6 text-accent mx-auto mb-3"
                  strokeWidth={1.9}
                />
                <div className="font-display text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <img
                src="/assets/about-team.jpg"
                alt="Real Enterprises team"
                className="rounded-2xl shadow-card w-full"
                loading="lazy"
              />
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
                Our Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Building Dreams Since 1999
              </h2>
              <p className="text-muted-foreground mb-4">
                Real Enterprises was founded with a simple mission: to deliver
                exceptional construction quality that stands the test of time.
                What started as a small residential contractor has grown into
                one of Pakistan's most trusted construction companies.
              </p>
              <p className="text-muted-foreground mb-8">
                Our commitment to excellence, transparent communication, and
                client satisfaction has earned us the trust of hundreds of
                families and businesses across the nation.
              </p>
              <Link href="/contact">
                <Button variant="hero" size="lg">
                  Start Your Project
                  <PremiumIcon
                    icon={premiumIcons.arrowUpRight}
                    className="w-4 h-4"
                    strokeWidth={1.8}
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
              Our Values
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              What We Stand For
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Ready to Build With Us?
          </h2>
          <p className="text-muted-foreground mb-8">
            Contact our team for a free consultation on your next project.
          </p>
          {/* TODO: Replace with real number */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button variant="hero" size="lg">
                Get Free Quote
              </Button>
            </Link>
            <a href="tel:+923000000000">
              <Button variant="outline" size="lg">
                +92 300 000 0000
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
