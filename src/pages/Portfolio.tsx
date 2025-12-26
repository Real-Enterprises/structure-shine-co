import { MainLayout } from "@/components/layout";
import { MapPin } from "lucide-react";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectInterior from "@/assets/project-interior.jpg";
import projectResidential from "@/assets/project-residential.jpg";
import projectGreyStructure from "@/assets/project-grey-structure.jpg";

const projects = [
  { id: 1, title: "Lahore Office Tower", category: "Commercial", location: "Lahore", image: projectCommercial, status: "Completed" },
  { id: 2, title: "DHA Villa Interior", category: "Interior", location: "Islamabad", image: projectInterior, status: "Completed" },
  { id: 3, title: "Bahria Town Residence", category: "Residential", location: "Rawalpindi", image: projectResidential, status: "Completed" },
  { id: 4, title: "Gulberg Plaza", category: "Grey Structure", location: "Lahore", image: projectGreyStructure, status: "Ongoing" },
];

const Portfolio = () => {
  return (
    <MainLayout>
      <section className="pt-32 pb-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Our <span className="text-accent">Portfolio</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Explore our completed and ongoing projects across Pakistan.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-lg aspect-[4/3]">
                <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-slate-dark/50 to-transparent opacity-80" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === "Completed" ? "bg-green-500/20 text-green-300" : "bg-accent/20 text-accent"}`}>{project.status}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-accent text-sm font-medium mb-2 block">{project.category}</span>
                  <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-primary-foreground/70 text-sm"><MapPin className="w-4 h-4" />{project.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Portfolio;
