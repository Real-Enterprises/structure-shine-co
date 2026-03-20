import Link from "next/link";
import { PremiumIcon, premiumIcons } from "@/components/icons/premium-icons";
import { Button } from "@/components/ui/button";
import { cldHeroVideo } from "@/lib/cloudinary";

const heroImage = "/assets/hero-construction.jpg";

const CloudinaryVideo = ({ publicId }: { publicId: string }) => {
  const { webm, mp4 } = cldHeroVideo(publicId);
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
      {/* Dark overlay to maintain text readability */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};

export function HeroSection({ videoPublicId }: { videoPublicId?: string }) {
  return (
    // Static fallback background image shows while iframe loads
    <section
      className="relative min-h-screen pt-24 pb-12 overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Video — rendered only when a Cloudinary public ID is configured */}
      {videoPublicId && (
        <div className="absolute inset-0 z-0">
          <CloudinaryVideo publicId={videoPublicId} />
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-120px)]">
          {/* Left Content */}
          <div className="space-y-8 pt-8 lg:pt-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 animate-fade-up">
              <span className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm font-medium text-primary-foreground/90">
                25+ Years of Excellence
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] animate-fade-up animation-delay-100">
              Building Your
              <br />
              <span className="text-primary-foreground/70">Dream Spaces</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-primary-foreground/80 max-w-md animate-fade-up animation-delay-200">
              From luxury homes to commercial landmarks, we transform visions
              into exceptional construction across Pakistan.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-up animation-delay-300">
              <Link href="/portfolio">
                <Button variant="hero" size="lg">
                  View Projects
                  <PremiumIcon
                    icon={premiumIcons.arrowRight}
                    className="w-4 h-4"
                    strokeWidth={1.8}
                  />
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
                  <span className="font-display text-2xl font-bold text-primary-foreground">
                    {stat.value}
                  </span>
                  <span className="text-sm text-primary-foreground/70">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Hero Image Card */}
          <div className="relative animate-fade-up animation-delay-200">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />

              {/* Side Thumbnails */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 flex flex-col gap-2">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-card/90 backdrop-blur-sm border-2 border-card overflow-hidden shadow-card">
                  <img
                    src={heroImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
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
