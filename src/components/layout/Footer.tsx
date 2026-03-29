import Link from "next/link";
import { PremiumIcon, premiumIcons } from "@/components/icons/premium-icons";
import type { CompanyInfo } from "@/lib/content";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const servicesList = [
  "Residential Construction",
  "Commercial Projects",
  "Interior Design",
  "Grey Structure",
  "Turnkey Solutions",
];

interface Props {
  companyInfo: CompanyInfo;
}

export function Footer({ companyInfo }: Props) {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/logo-icon.png"
                  alt="Logo icon"
                  className="w-full h-full object-contain"
                  style={{ padding: "5%" }}
                  loading="eager"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-display font-bold text-lg leading-tight">
                  Real Enterprises
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary-foreground/50 mt-1">
                  Est. 1999
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Building trust and excellence across Pakistan for over 25 years.
              From residential dreams to commercial landmarks.
            </p>
            <div className="flex gap-3">
              {companyInfo.facebookUrl && (
                <a
                  href={companyInfo.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <PremiumIcon
                    icon={premiumIcons.facebook}
                    className="w-4 h-4"
                    strokeWidth={1.9}
                  />
                </a>
              )}
              {companyInfo.instagramUrl && (
                <a
                  href={companyInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <PremiumIcon
                    icon={premiumIcons.instagram}
                    className="w-4 h-4"
                    strokeWidth={1.9}
                  />
                </a>
              )}
              {companyInfo.linkedinUrl && (
                <a
                  href={companyInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <PremiumIcon
                    icon={premiumIcons.linkedin}
                    className="w-4 h-4"
                    strokeWidth={1.9}
                  />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-base font-semibold mb-6">
              Quick Links
            </h3>
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
            <h3 className="font-display text-base font-semibold mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {servicesList.map((service) => (
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
            <h3 className="font-display text-base font-semibold mb-6">
              Contact Us
            </h3>
            <div className="space-y-4">
              <a
                href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                className="flex items-start gap-3 text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <PremiumIcon
                  icon={premiumIcons.call}
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  strokeWidth={1.9}
                />
                <span className="text-sm">{companyInfo.phone}</span>
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-start gap-3 text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <PremiumIcon
                  icon={premiumIcons.mail}
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  strokeWidth={1.9}
                />
                <span className="text-sm">{companyInfo.email}</span>
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <PremiumIcon
                  icon={premiumIcons.mapPin}
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  strokeWidth={1.9}
                />
                <span className="text-sm whitespace-pre-line">
                  {companyInfo.address}
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
              © {new Date().getFullYear()} Real Enterprises. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#site-top"
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground hover:bg-accent/90 transition-colors"
                aria-label="Scroll to top"
              >
                <PremiumIcon
                  icon={premiumIcons.arrowUp}
                  className="w-4 h-4"
                  strokeWidth={1.95}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
