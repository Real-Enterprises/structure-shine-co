"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

const categories = ["All", "Residential", "Commercial", "Interior", "Grey Structure"];

const projects = [
  { id: 1, title: "Lahore Office Tower", category: "Commercial", location: "Lahore", image: "/assets/project-commercial.jpg", status: "Completed" },
  { id: 2, title: "DHA Villa Interior", category: "Interior", location: "Islamabad", image: "/assets/project-interior.jpg", status: "Completed" },
  { id: 3, title: "Bahria Town Residence", category: "Residential", location: "Rawalpindi", image: "/assets/project-residential.jpg", status: "Completed" },
  { id: 4, title: "Gulberg Plaza", category: "Grey Structure", location: "Lahore", image: "/assets/project-grey-structure.jpg", status: "Ongoing" },
];

export function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Filters */}
      <section className="pb-8 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-70" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${project.status === "Completed" ? "bg-green-500/20 text-green-100" : "bg-accent/30 text-accent"}`}>{project.status}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-primary-foreground/60 text-xs font-medium uppercase tracking-wider mb-2 block">{project.category}</span>
                  <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-primary-foreground/60 text-sm"><MapPin className="w-3.5 h-3.5" />{project.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
