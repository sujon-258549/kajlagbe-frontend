"use client";

const steps = [
  {
    number: "01",
    title: "Project Consultation",
    description: "We start by understanding your specific needs and goals through a deep dive consultation.",
    color: "border-secondary"
  },
  {
    number: "02",
    title: "Strategic Planning",
    description: "Our experts develop a detailed roadmap and strategy tailored to your project requirements.",
    color: "border-primary"
  },
  {
    number: "03",
    title: "Expert Execution",
    description: "Our certified professionals bring your project to life with precision and high-quality craftsmanship.",
    color: "border-secondary"
  },
  {
    number: "04",
    title: "Quality Assurance",
    description: "We perform rigorous testing and quality checks to ensure everything meets our premium standards.",
    color: "border-primary"
  }
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm">// How We Work</span>
          <h2 className="text-4xl md:text-5xl font-black text-black">Our Working <span className="text-primary">Process</span></h2>
          <p className="text-lg text-slate-500">
            We follow a streamlined and transparent process to ensure every project is delivered with excellence and on time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-slate-50 p-8 rounded-2xl border-l-4 border-primary">
                <div className="text-6xl font-black text-slate-50 absolute top-4 right-6 group-hover:text-primary/5 transition-colors">
                  {step.number}
                </div>
                <div className="relative z-10 space-y-4 pt-4">
                  <h3 className="text-xl font-black text-black group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
              {/* Connector for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-slate-200 z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
