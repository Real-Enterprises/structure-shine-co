import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Users, Award, Clock } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

const stats = [
  { icon: Clock, value: "25+", label: "Years Experience" },
  { icon: CheckCircle, value: "500+", label: "Projects Completed" },
  { icon: Users, value: "200+", label: "Happy Clients" },
  { icon: Award, value: "50+", label: "Awards Won" },
];

const About = () => {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            About <span className="text-accent">Real Enterprises</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            25 years of building trust, quality, and excellence across Pakistan.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-medium text-sm tracking-widest uppercase mb-4 block">Our Story</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Building Dreams Since 1999
              </h2>
              <p className="text-muted-foreground mb-4">
                Real Enterprises was founded with a simple mission: to deliver exceptional construction quality that stands the test of time. What started as a small residential contractor has grown into one of Pakistan's most trusted construction companies.
              </p>
              <p className="text-muted-foreground mb-8">
                Our commitment to excellence, transparent communication, and client satisfaction has earned us the trust of hundreds of families and businesses across the nation.
              </p>
              <Link to="/contact">
                <Button variant="premium" size="lg">Start Your Project</Button>
              </Link>
            </div>
            <div className="relative">
              <img src={aboutTeam} alt="Real Enterprises team" className="rounded-lg shadow-strong w-full" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                <div className="font-display text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
