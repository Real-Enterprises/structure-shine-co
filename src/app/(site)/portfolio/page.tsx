import type { Metadata } from "next";
import { PortfolioClient } from "./PortfolioClient";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Real Enterprises' portfolio of completed construction projects in Lahore and across Pakistan — residential villas, commercial plazas, interior fit-outs, and grey structure work.",
};

export default function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block animate-fade-up">
              Portfolio
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
              Our Completed
              <br />
              <span className="text-muted-foreground">Projects</span>
            </h1>
          </div>
        </div>
      </section>
      <PortfolioClient projects={projects} />
    </>
  );
}
