"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const services = [
  {
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
    title: "Sofa Steam Cleaning",
    price: "29",
  },
  {
    image: "https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80",
    title: "Home Deep Cleaning",
    price: "49",
  },
  {
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80",
    title: "Commercial Office Cleaning",
    price: "39",
  },
  {
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80",
    title: "AC Servicing & Repair",
    price: "25",
  },
  {
    image: "https://images.unsplash.com/photo-1562654508-a187af463c78?auto=format&fit=crop&q=80",
    title: "Kitchen Chimney Cleaning",
    price: "19",
  },
  {
    image: "https://images.unsplash.com/photo-1621905252507-b354bcadc4cf?auto=format&fit=crop&q=80",
    title: "Interior Painting",
    price: "99",
  }
];

export default function ServiceBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = services.length;
  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  return (
    <section className="py-12 bg-[#F9F8F3] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative flex items-center justify-center gap-4 lg:gap-8">
          
          {/* Controls - Left */}
          <button 
            onClick={prevSlide}
            className="hidden md:flex w-12 h-12 rounded-full border border-secondary/20 items-center justify-center text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all flex-shrink-0 z-10 bg-white/50 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Slider Container */}
          <div className="bg-white rounded-[40px] p-6 md:p-10 shadow-sm border border-slate-100 flex-1 max-w-6xl overflow-hidden relative">
            <div 
              className="flex transition-transform duration-700 ease-in-out gap-8 lg:gap-12"
              style={{ transform: `translateX(calc(-${currentIndex * (100 / itemsPerView.desktop)}%))` }}
            >
              {services.map((service, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-6 group min-w-[calc(100%/1)] md:min-w-[calc(100%/3-2rem)] lg:min-w-[calc(100%/3-3rem)]"
                >
                  {/* Square Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden flex-shrink-0 shadow-lg group-hover:shadow-primary/20 transition-all duration-500">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg md:text-xl font-bold text-secondary leading-tight min-h-[3rem]">
                      {service.title}
                    </h3>
                    <Button 
                      variant="outline" 
                      className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white hover:border-primary px-6 font-bold w-fit text-sm"
                    >
                      From ${service.price}
                    </Button>
                  </div>

                  {/* Vertical Divider (Desktop only, if not the very last item in absolute list) */}
                  {i < services.length - 1 && (
                    <div className="hidden lg:block h-20 w-[1px] bg-slate-100 ml-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Controls - Right */}
          <button 
            onClick={nextSlide}
            className="hidden md:flex w-12 h-12 rounded-full border border-secondary/20 items-center justify-center text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all flex-shrink-0 z-10 bg-white/50 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Mobile Dots */}
          <div className="absolute -bottom-6 flex gap-2 md:hidden">
            {services.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all ${currentIndex === i ? "bg-primary w-4" : "bg-slate-300"}`}
              ></div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
