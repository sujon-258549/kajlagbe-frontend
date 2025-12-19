"use client";

import { Star, MapPin, ShieldCheck } from "lucide-react";

const experts = [
  {
    name: "Rahim Uddin",
    role: "Master Plumber",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
    rating: 4.9,
    jobs: 124,
    location: "Gulshan, Dhaka"
  },
  {
    name: "Salma Begum",
    role: "Professional Cleaner",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    rating: 4.8,
    jobs: 89,
    location: "Banani, Dhaka"
  },
  {
    name: "Arif Ahmed",
    role: "AC Technician",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    rating: 5.0,
    jobs: 215,
    location: "Dhanmondi, Dhaka"
  },
  {
    name: "Tania Khan",
    role: "Home Tutor",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80",
    rating: 4.7,
    jobs: 56,
    location: "Uttara, Dhaka"
  }
];

export default function TopRatedExperts() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm">// Top Rated Professionals</span>
          <h2 className="text-4xl md:text-5xl font-black text-black">Our Highest Rated <span className="text-primary">Experts</span></h2>
          <p className="text-lg text-slate-500">
            Hand-picked and background verified professionals who have consistently delivered 5-star services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experts.map((expert, index) => (
            <div key={index} className="group bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="relative aspect-[4/5]">
                <img 
                  src={expert.image} 
                  alt={expert.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-xs font-black text-black">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {expert.rating} ({expert.jobs} Jobs)
                </div>
                <div className="absolute bottom-4 right-4 bg-primary p-2 rounded-xl text-white shadow-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="p-5 md:p-6 space-y-2">
                <h3 className="text-xl font-black text-black group-hover:text-primary transition-colors">{expert.name}</h3>
                <p className="text-secondary font-bold text-sm uppercase tracking-widest">{expert.role}</p>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold pt-2">
                  <MapPin className="w-3 h-3" />
                  {expert.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
