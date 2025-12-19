import Services from "@/components/home/Services";

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <section className="relative bg-secondary py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern/grid.png')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Explore our wide range of professional services tailored to meet your daily needs.
          </p>
        </div>
      </section>
      
      {/* Reuse the Services component but maybe hide the title if it's redundant, 
          or just let it render as is. Use a wrapper to differentiate. */}
      <div className="-mt-20">
        <Services />
      </div>
    </div>
  );
}
