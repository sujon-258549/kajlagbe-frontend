"use client";

import { ExternalLink, Plus } from "lucide-react";

const projects = [
  {
    title: "Modern App Design",
    category: "Software Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    color: "bg-secondary"
  },
  {
    title: "Luxury Home Reno",
    category: "Home Services",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80",
    color: "bg-[#9b6ef3]"
  },
  {
    title: "Global Cloud Migration",
    category: "IT Consulting",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    color: "bg-[#2196f3]"
  },
  {
    title: "Eco Garden Design",
    category: "Landscaping",
    image: "https://images.unsplash.com/photo-1558905612-1433f4868427?auto=format&fit=crop&q=80",
    color: "bg-secondary"
  },
  {
    title: "Smart Security Setup",
    category: "Home Automation",
    image: "https://images.unsplash.com/photo-1558002038-103792e07172?auto=format&fit=crop&q=80",
    color: "bg-[#9b6ef3]"
  },
  {
    title: "Corporate Identity",
    category: "Brand Design",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
    color: "bg-[#2196f3]"
  }
];

export default function PortfolioSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-xl space-y-4">
            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm">// Our Work Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-black text-black">Explore Our Recent <span className="text-primary">Achievements</span></h2>
          </div>
          <div className="flex gap-4">
            {["All", "Tech", "Home", "Creative"].map((tab, i) => (
              <button key={i} className={`px-6 py-2 font-bold transition-all ${i === 0 ? "bg-secondary text-white" : "text-slate-400 hover:text-secondary"}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="group relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 space-y-3">
                  <span className="text-sm font-black text-primary uppercase tracking-widest">{project.category}</span>
                  <h3 className="text-2xl font-black text-white">{project.title}</h3>
                  <div className="flex gap-4 pt-4">
                    <button className="w-12 h-12 bg-primary flex items-center justify-center text-white rounded-full hover:bg-white hover:text-primary transition-all">
                      <Plus className="w-5 h-5" />
                    </button>
                    <button className="w-12 h-12 bg-white/10 flex items-center justify-center text-white rounded-full hover:bg-white hover:text-secondary transition-all">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
