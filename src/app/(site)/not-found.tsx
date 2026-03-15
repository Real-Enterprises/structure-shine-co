import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-24 px-4 text-center">
      {/* Large 404 */}
      <div
        className="font-display font-bold leading-none mb-6 select-none"
        style={{ fontSize: "clamp(6rem, 20vw, 14rem)", color: "#1A3C5E" }}
        aria-hidden="true"
      >
        404
      </div>

      {/* Heading */}
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
        Page Not Found
      </h1>

      {/* Subtext */}
      <p className="text-muted-foreground text-lg max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/">
          <Button variant="hero" size="lg">
            Go to Homepage
          </Button>
        </Link>
        <Link href="/portfolio">
          <Button variant="outline" size="lg">
            View Our Projects
          </Button>
        </Link>
      </div>
    </div>
  );
}
