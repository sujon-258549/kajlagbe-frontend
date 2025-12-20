"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const heroSlides = [
  {
    title: "END-TO-END DEVELOPMENT",
    description: "We are 100+ professional software engineers with more than 10 years of experience in delivering superior products.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
    buttonText: "LEARN MORE",
  },
  {
    title: "RELIABLE AC SERVICING",
    description: "Keep your cool with our expert AC repair and maintenance services. Trusted by thousands of happy customers.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80",
    buttonText: "VIEW SERVICES",
  },
];

export default function Hero() {
  const swiperRef = useRef<SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-secondary">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        effect="fade"
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-secondary/70 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/40 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-6 h-full relative z-10 flex flex-col justify-center">
              <div className="max-w-3xl transform transition-all duration-1000 translate-y-0 opacity-100">
          
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-white/80 text-base md:text-lg font-medium mb-8 max-w-xl leading-relaxed line-clamp-2 md:line-clamp-none">
                  {slide.description}
                </p>
                <Button 
                  size="lg" 
                  className="bg-primary text-white"
                >
                  {slide.buttonText}
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation - Bottom Left */}
        <div className="absolute bottom-10 left-0 z-20 w-full">
          <div className="container mx-auto px-6 flex items-center gap-6">
            <div className="flex items-center gap-4 text-white font-bold text-lg">
              <button 
                onClick={() => swiperRef.current?.slidePrev()}
                className="hover:text-[#3ABEF9] transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-1 tabular-nums">
                <span>0{activeIndex + 1}</span>
                <span className="opacity-40">/</span>
                <span className="opacity-40">0{heroSlides.length}</span>
              </div>

              <button 
                onClick={() => swiperRef.current?.slideNext()}
                className="hover:text-[#3ABEF9] transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </Swiper>
    </section>
  );
}
