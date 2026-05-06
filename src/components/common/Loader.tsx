"use client";

import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Loader({ fullScreen = true }: { fullScreen?: boolean }) {
  return (
    <div
      className={cn(
        fullScreen
          ? "fixed inset-0 z-[9999] bg-secondary flex items-center justify-center"
          : "flex items-center justify-center w-full py-8",
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center",
          fullScreen ? "w-20 h-20 lg:w-16 lg:h-16" : "w-12 h-12",
        )}
      >
        {/* Outer Rotating Arcs - Clockwise */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border-[3px] border-transparent animate-spin",
            fullScreen
              ? "border-t-white/80 border-b-white/80"
              : "border-t-secondary border-b-secondary",
          )}
        ></div>

        {/* Inner Rotating Arcs - Counter-Clockwise */}
        <div
          className={cn(
            "absolute rounded-full border-[3px] border-transparent animate-spin-reverse",
            fullScreen
              ? "inset-2 lg:inset-1.5 border-l-white/40 border-r-white/40"
              : "inset-1 border-l-secondary/40 border-r-secondary/40",
          )}
        ></div>

        {/* Center Circle Background */}
        <div
          className={cn(
            "absolute rounded-full shadow-lg flex items-center justify-center animate-pulse",
            fullScreen
              ? "w-10 h-10 lg:w-8 lg:h-8 bg-[#86b86b]"
              : "w-6 h-6 bg-secondary",
          )}
        >
          {/* Earth Icon */}
          <Globe
            className={cn(
              "text-white",
              fullScreen ? "w-5 h-5 lg:w-4 lg:h-4" : "w-3 h-3",
            )}
            strokeWidth={1.5}
          />
        </div>
      </div>
    </div>
  );
}

