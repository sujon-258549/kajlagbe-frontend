"use client";

import React from "react";
import { Play } from "lucide-react";
import CustomImage from "./CustomImage";
import Heading1 from "./Headings/Heading1";

interface CommonHeroProps {
  title: string;
  subtitle: string;
  image: string;
  bgImage?: string;
}

export default function CommonHero({
  title,
  subtitle,
  image,
  bgImage = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80",
}: CommonHeroProps) {
  return (
    <section className="relative h-[400px] md:h-[500px] bg-secondary overflow-hidden">
      {/* Background Overlay/Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mixed-blend-overlay"
        style={{ backgroundImage: `url('${bgImage}')` }}
      ></div>

      <div className="main-container h-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Content */}
        <div className="md:w-1/2 text-white space-y-4 pt-10 md:pt-0">
          <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
            <span className="w-8 h-0.5 bg-primary"></span>
            <span>{subtitle}</span>
          </div>
          <Heading1 className="text-white">{title}</Heading1>
        </div>

        {/* Right Video/Image */}
        <div className="md:w-1/2 h-full relative mt-10 md:mt-0">
          <div className="relative w-full h-full min-h-[300px] border-l-8 border-t-8 border-primary/20 rounded-tl-3xl overflow-hidden bg-secondary">
            <CustomImage
              src={image}
              alt="Hero Image"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer hover:bg-black/30 transition-colors">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 animate-pulse">
                <Play className="w-6 h-6 text-white text-white fill-white ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
