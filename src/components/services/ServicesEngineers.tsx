"use client";

import { ArrowRight, Share2, Lightbulb } from "lucide-react";
import CustomImage from "../common/CustomImage";
import Heading2 from "../common/Headings/Heading2";
import { Button } from "../ui/button";

const engineers = [
  {
    id: 1,
    name: "Penelope Miller",
    role: "Team Manager",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Denial Pasha",
    role: "Team Manager",
    image:
      "https://images.unsplash.com/photo-1573496359-7013acad27dc?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Joshua Sendu",
    role: "CEO-Founder",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    name: "John Maxwell",
    role: "Co-Founder",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 5,
    name: "Sarah Jenkins",
    role: "Senior Engineer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 6,
    name: "Michael Chen",
    role: "Project Lead",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
  },
];

export default function ServicesEngineers() {
  return (
    <section className="py-20 bg-white overflow-hidden relative">
      <div className="main-container">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Content */}
          <div className="w-full lg:w-1/3 relative">
            {/* Decorative Dotted Arrow (SVG representation) */}
            <div className="absolute -top-40 -left-10 w-40 h-40 pointer-events-none hidden lg:block opacity-50">
              <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-[#063022]"
              >
                <path
                  d="M20 180 C 20 100, 100 20, 180 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                />
                <path
                  d="M170 15 L 180 20 L 170 25"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex items-center gap-2 text-slate-500 font-medium mb-4">
              <Lightbulb className="w-5 h-5 text-[#fbbf24]" />
              <span className="uppercase tracking-wider text-sm">
                Econest Workers
              </span>
            </div>

            <Heading2 className="text-[#063022] mb-8 leading-tight">
              Our Professionals <br /> Engineers
            </Heading2>

            <Button size="xl" className="">
              Explore More
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Right Grid */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {engineers.map((item) => (
                <div
                  key={item.id}
                  className="bg-secondary border border-white rounded-lg p-3 group text-center relative transition-transform duration-300"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                    <CustomImage
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700"
                    />
                    {/* Share Icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-[#fbbf24] rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors z-20">
                      <Share2 className="w-4 h-4 text-[#063022]" />
                    </div>
                  </div>

                  <div className="pb-2">
                    <h3 className="text-white text-lg font-bold mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-xs">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
