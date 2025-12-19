"use client";

const partners = [
  "NEXT VENTURES", "STRIPE", "GOOGLE", "AMAZON", "MICROSOFT", "META"
];

export default function PartnerSection() {
  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs">Trusted by over 500+ global brands</span>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
          {partners.map((partner, index) => (
            <div key={index} className="text-2xl lg:text-3xl font-black text-secondary grayscale hover:grayscale-0 transition-all cursor-crosshair">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
