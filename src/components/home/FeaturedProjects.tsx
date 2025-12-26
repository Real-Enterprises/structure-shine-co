import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectInterior from "@/assets/project-interior.jpg";
import projectResidential from "@/assets/project-residential.jpg";
import projectGreyStructure from "@/assets/project-grey-structure.jpg";

const projects = [
  {
    id: 1,
    title: "Lahore Office Tower",
    category: "Commercial",
    location: "Lahore",
    image: projectCommercial,
    status: "Completed",
  },
  {
    id: 2,
    title: "DHA Villa Interior",
    category: "Interior",
    location: "Islamabad",
    image: projectInterior,
    status: "Completed",
  },
  {
    id: 3,
    title: "Bahria Town Residence",
    category: "Residential",
    location: "Rawalpindi",
    image: projectResidential,
    status: "Completed",
  },
  {
    id: 4,
    title: "Gulberg Plaza",
    category: "Grey Structure",
    location: "Lahore",
    image: projectGreyStructure,
    status: "Ongoing",
  },
];

export function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
              Portfolio
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Explore Our Projects
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/portfolio">
              <Button variant="heroLight">
                See All
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/portfolio`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
                    project.status === "Completed"
                      ? "bg-green-500/20 text-green-100"
                      : "bg-accent/20 text-accent"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-primary-foreground/70 text-xs font-medium uppercase tracking-wider mb-2 block">
                  {project.category}
                </span>
                <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-primary-foreground/60 text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  {project.location}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
