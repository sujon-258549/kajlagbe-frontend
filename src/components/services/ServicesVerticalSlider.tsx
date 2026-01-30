"use client";

import { ArrowRight } from "lucide-react";
import CustomImage from "../common/CustomImage";
import Heading3 from "../common/Headings/Heading3";

const projects = [
  {
    id: 1,
    category: "Tree Plantation",
    title: "Planting trees today helps grow a greener, healthier tomorrow.",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b7e?auto=format&fit=crop&q=80&w=800",
    number: "03",
  },
  {
    id: 2,
    category: "Waste Management",
    title: "Smart waste handling keeps our environment clean and safe.",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800",
    number: "04",
  },
  {
    id: 3,
    category: "Cleaning & Recycling",
    title: "Recycling and cleaning reduce pollution and protect the planet.",
    image:
      "https://images.unsplash.com/photo-1591193686104-fddba4d0e4d8?auto=format&fit=crop&q=80&w=800",
    number: "05",
  },
  {
    id: 4,
    category: "Renewable Energy",
    title: "Clean energy powers the future without harming the planet.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
    number: "06",
  },
];

export default function ServicesVerticalSlider() {
  return (
    <section className="bg-white pt-6 pb-12 md:py-16 lg:pt-6 lg:pb-6 mb-0">
      <div className="main-container px-4 md:px-6">
        {/* Sticky Container */}
        <div className="flex flex-col gap-10">
          {projects.map((item, index) => (
            <div
              key={item.id}
              className="sticky top-20 md:top-32 w-full"
              style={{ zIndex: index + 1 }}
            >
              <div className="bg-secondary border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[450px] md:h-[300px] lg:h-[350px] relative">
                {/* Image Section with Custom Shape */}
                <div className="h-[200px] md:h-full md:w-1/2 relative">
                  {/* Custom Mask Shape using CSS clip-path or overlay */}
                  <div className="absolute inset-0 z-10 pointer-events-none md:block hidden">
                    {/* Yellow Decoration on Top Left */}
                    <div className="absolute top-0 left-0 w-24 h-24 z-20">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full text-primary fill-current"
                      >
                        <path d="M0 0 L60 0 L30 30 L0 60 Z" />
                      </svg>
                    </div>
                    {/* Diagonal Cut Effect */}
                    <div className="absolute top-0 right-0 h-full w-16 bg-[#063022] transform skew-x-12 translate-x-1/2 z-10 hidden md:block"></div>
                  </div>

                  <CustomImage
                    src={item.image}
                    alt={item.category}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="flex-1 md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative z-20">
                  <span className="text-white/80 text-xs font-semibold mb-2 uppercase tracking-wide">
                    {item.category}
                  </span>

                  <Heading3 className="text-white mb-6 leading-snug text-2xl md:text-3xl">
                    {item.title}
                  </Heading3>

                  <button className="bg-primary text-white px-5 py-2.5 rounded-full font-bold text-xs w-fit flex items-center gap-2 hover:bg-white hover:text-secondary transition-colors group/btn">
                    Explore Project
                    <span className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center group-hover/btn:rotate-45 transition-transform text-white">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>

                  {/* Background Number */}
                  <div className="absolute bottom-2 right-6 text-[#ffffff]/5 text-6xl md:text-8xl font-black select-none pointer-events-none">
                    {item.number}
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
