"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const featured = [
  {
    title: "AC Repair & Service",
    price: "Starts at $15",
    rating: "4.8 (2.5k)",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80",
    discount: "20% OFF"
  },
  {
    title: "Full Home Deep Cleaning",
    price: "Starts at $45",
    rating: "4.9 (1.8k)",
    image: "https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80",
    discount: "HOT"
  },
  {
    title: "Expert Home Tutor",
    price: "Starts at $20/hr",
    rating: "4.7 (950)",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80",
    discount: "NEW"
  },
  {
    title: "Patient & Elder Care",
    price: "Starts at $30",
    rating: "4.9 (1.2k)",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80",
    discount: "POPULAR"
  }
];

export default function FeaturedServices() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-xl space-y-4">
            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm">// High Demand Services</span>
            <h2 className="text-4xl md:text-5xl font-black text-black leading-tight">Trending <span className="text-primary">Services</span> Right Now</h2>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white font-black tracking-widest uppercase h-14 px-10 rounded-full">
            View All Services
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((service, index) => (
            <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 hover:-translate-y-2 transition-all duration-500">
              <div className="relative h-44">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full animate-pulse uppercase tracking-widest">
                  {service.discount}
                </div>
              </div>
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{service.rating}</span>
                </div>
                <h3 className="text-xl font-black text-secondary leading-tight min-h-[3rem]">{service.title}</h3>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-primary font-black">{service.price}</span>
                  <Button size="icon" variant="ghost" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
