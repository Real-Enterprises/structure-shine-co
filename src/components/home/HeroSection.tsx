"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Building, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroImage = "/assets/hero-construction.jpg";

// VideoEmbed component — replaces the bundled hero-video.mp4 with a Streamable embed
const VideoEmbed = ({ streamableId }: { streamableId: string }) => (
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    <iframe
      src={`https://streamable.com/e/${streamableId}?autoplay=1&muted=1&loop=1&controls=0`}
      className="absolute inset-0 w-full h-full"
      style={{ border: "none", pointerEvents: "none" }}
      allowFullScreen
      allow="autoplay; fullscreen"
      title="Real Enterprises — Construction Excellence"
    />
    {/* Dark overlay to maintain text readability */}
    <div className="absolute inset-0 bg-black/50" />
  </div>
);

export function HeroSection() {
  return (
    // Static fallback background image shows while iframe loads
    <section
      className="relative min-h-screen pt-24 pb-12 overflow-hidden"
      style={{ backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      
      {/* Background Video — TODO: Replace PLACEHOLDER with real Streamable video ID once video is uploaded */}
      <div className="absolute inset-0 z-0">
        <VideoEmbed streamableId="PLACEHOLDER" />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-120px)]">
          
          {/* Left Content */}
          <div className="space-y-8 pt-8 lg:pt-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 animate-fade-up">
              <span className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm font-medium text-primary-foreground/90">25+ Years of Excellence</span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] animate-fade-up animation-delay-100">
              Building Your
              <br />
              <span className="text-primary-foreground/70">Dream Spaces</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-primary-foreground/80 max-w-md animate-fade-up animation-delay-200">
              From luxury homes to commercial landmarks, we transform visions into exceptional construction across Pakistan.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-up animation-delay-300">
              <Link href="/portfolio">
                <Button variant="hero" size="lg">
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="heroLight" size="lg">
                  Free Consultation
                </Button>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 pt-4 animate-fade-up animation-delay-400">
              {[
                { value: "500+", label: "Projects" },
                { value: "200+", label: "Clients" },
                { value: "15+", label: "Cities" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <span className="font-display text-2xl font-bold text-primary-foreground">{stat.value}</span>
                  <span className="text-sm text-primary-foreground/70">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Hero Image Card */}
          <div className="relative animate-fade-up animation-delay-200">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={heroImage}
                alt="Modern construction project"
                className="w-full aspect-[4/3] object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />

              {/* Floating Info Card */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                <div className="bg-card/95 backdrop-blur-xl rounded-2xl p-4 md:p-5 shadow-elevated">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Featured Project</p>
                      <h3 className="font-display font-semibold text-foreground text-lg">Bahria Town Villa</h3>
                    </div>
                    <span className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-medium rounded-full">
                      Completed
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Location</p>
                        <p className="text-xs font-medium text-foreground">Islamabad</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                        <Building className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Type</p>
                        <p className="text-xs font-medium text-foreground">Residential</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Year</p>
                        <p className="text-xs font-medium text-foreground">2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Thumbnails */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 flex flex-col gap-2">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-card/90 backdrop-blur-sm border-2 border-card overflow-hidden shadow-card">
                  <img src={heroImage} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm shadow-card">
                  +12
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
