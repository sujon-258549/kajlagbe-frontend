"use client";

import { Globe } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-secondary flex items-center justify-center">
      <div className="relative flex items-center justify-center w-20 h-20 lg:w-16 lg:h-16">
        {/* Outer Rotating Arcs - Clockwise */}
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-white/80 border-b-white/80 animate-spin"></div>

        {/* Inner Rotating Arcs - Counter-Clockwise */}
        <div className="absolute inset-2 lg:inset-1.5 rounded-full border-[3px] border-transparent border-l-white/40 border-r-white/40 animate-spin-reverse"></div>

        {/* Center Circle Background */}
        <div className="absolute w-10 h-10 lg:w-8 lg:h-8 bg-[#86b86b] rounded-full shadow-lg flex items-center justify-center animate-pulse">
          {/* Earth Icon */}
          <Globe
            className="w-5 h-5 lg:w-4 lg:h-4 text-white"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </div>
  );
}
