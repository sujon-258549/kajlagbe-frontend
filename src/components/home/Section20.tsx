import React from 'react';

export default function Section20() {
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Feature ${i + 1}`,
    description: `Brief description for feature ${i + 1}`,
  }));

  return (
    <section className="relative py-20 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 tracking-tight">
          Our Premium Offerings
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">
          Explore a curated list of 20 top‑tier services designed to empower your business and personal projects.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-secondary mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
        <a
          href="/services"
          className="inline-block mt-10 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-xl transition-colors shadow-lg"
        >
          Browse All Services
        </a>
      </div>
      {/* Subtle floating circles for visual flair */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-24 h-24 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-1/3 w-32 h-32 bg-secondary/20 rounded-full animate-pulse delay-2000" />
      </div>
    </section>
  );
}
