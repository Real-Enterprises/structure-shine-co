import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ArrowUp } from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const services = [
  "Residential Construction",
  "Commercial Projects",
  "Interior Design",
  "Grey Structure",
  "Turnkey Solutions",
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <span className="font-display font-bold text-accent-foreground text-lg">R</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight">Real Enterprises</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary-foreground/50">Est. 1999</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Building trust and excellence across Pakistan for over 25 years. From residential dreams to commercial landmarks.
            </p>
            <div className="flex gap-3">
              {/* TODO: Update with real social URL */}
              <a href="https://facebook.com/realenterprises" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              {/* TODO: Update with real social URL */}
              <a href="https://instagram.com/realenterprises" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              {/* TODO: Update with real social URL */}
              <a href="https://linkedin.com/company/realenterprises" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-base font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-base font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-base font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              {/* TODO: Replace with real number */}
              <a href="tel:+923000000000" className="flex items-start gap-3 text-primary-foreground/70 hover:text-accent transition-colors">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">+92 300 000 0000</span>
              </a>
              {/* TODO: Confirm real email */}
              <a href="mailto:info@realenterprises.pk" className="flex items-start gap-3 text-primary-foreground/70 hover:text-accent transition-colors">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">info@realenterprises.pk</span>
              </a>
              {/* TODO: Replace with real office address */}
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  123 Main Boulevard, DHA Phase 5<br />
                  Lahore, Punjab, Pakistan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/50">
              © {new Date().getFullYear()} Real Enterprises. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/admin" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors">
                Admin
              </Link>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground hover:bg-accent/90 transition-colors"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
