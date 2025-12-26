import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact", path: "/contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="w-10 h-10 bg-accent rounded-sm flex items-center justify-center">
                <span className="font-display font-bold text-accent-foreground text-xl">R</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-bold text-lg leading-tight ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}>
                Real Enterprises
              </span>
              <span className={`text-xs tracking-widest uppercase ${isScrolled ? 'text-muted-foreground' : 'text-primary-foreground/70'}`}>
                Since 1999
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative group ${
                  isActive(link.path)
                    ? isScrolled ? "text-accent" : "text-accent"
                    : isScrolled
                    ? "text-foreground hover:text-accent"
                    : "text-primary-foreground/90 hover:text-accent"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+923001234567" className={`flex items-center gap-2 text-sm ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}>
              <Phone className="w-4 h-4" />
              +92 300 123 4567
            </a>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`} />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-20 left-0 right-0 bg-background border-b border-border shadow-medium transition-all duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium py-2 transition-colors ${
                    isActive(link.path)
                      ? "text-accent"
                      : "text-foreground hover:text-accent"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border mt-2">
                <a href="tel:+923001234567" className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Phone className="w-4 h-4" />
                  +92 300 123 4567
                </a>
                <Link to="/contact">
                  <Button variant="hero" className="w-full">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
