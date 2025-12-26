import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  return (
    <section className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-accent font-medium text-sm tracking-widest uppercase mb-4 block">
              Our Portfolio
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our latest constructions that showcase our commitment to quality and innovation.
            </p>
          </div>
          <Link to="/portfolio">
            <Button variant="premium" size="lg">
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/portfolio/${project.id}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/3]"
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-slate-dark/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === "Completed"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-accent/20 text-accent"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-accent text-sm font-medium mb-2 block">
                  {project.category}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-primary-foreground mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                  <MapPin className="w-4 h-4" />
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
