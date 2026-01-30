"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, ArrowRight, Edit } from "lucide-react";
import Heading1 from "./Headings/Heading1";
import AboutHeroModal from "@/components/modal/about/AboutHeroModal";

interface CommonHeroProps {
  title?: string;
  subtitle?: string;
  image?: string;
  breadcrumb?: string;
}

export default function CommonHero({
  title = "Page Title",
  subtitle,
  image = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2664&auto=format&fit=crop",
  breadcrumb,
}: CommonHeroProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <section className="py-10">
      <div className="main-container mx-auto px-4">
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 flex">
          {/* Right Side Image (Absolute Layer) */}
          <div className="absolute inset-0 z-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            {/* Dark Overlay for Image */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Play Button - Positioned in the right half visually */}
            <div className="absolute inset-0 flex items-center justify-end pr-[10%] md:pr-[15%] pointer-events-none">
              <div className="group cursor-pointer pointer-events-auto relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 rounded-full animate-ping duration-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 rounded-full animate-ping duration-[1.5s]" />
                <div className="relative w-20 h-20 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 transition-transform duration-300 group-hover:scale-110">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-[#0B3D2E] fill-[#0B3D2E] ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Left Green Background with Skew */}
          <div className="hidden md:block absolute top-0 bottom-0 right-1/2 w-[120%] bg-[#0B3D2E] z-10 origin-right -skew-x-12 overflow-hidden">
            {/* Texture inside, clipped by parent */}
            <div className="absolute inset-0 opacity-10 pointer-events-none skew-x-12 origin-right scale-110">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay grayscale" />
            </div>
          </div>
          {/* Mobile Fallback */}
          <div className="md:hidden absolute inset-0 bg-[#0B3D2E] opacity-90 z-10" />

          {/* Double Slanted Dividers */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[15px] -translate-x-[150%] bg-white z-50 origin-center -skew-x-12" />
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[15px] -translate-x-[50%] bg-primary z-50 origin-center -skew-x-12 shadow-[-2px_0_10px_rgba(0,0,0,0.14)]" />

          {/* Content Layer */}
          <div className="relative z-30 w-full h-full flex flex-col md:flex-row">
            {/* Left Content Half */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:pl-20 md:pr-12">
              <div className="relative pt-10 md:pt-0">
                <div className="flex items-center gap-3 text-white/70 text-sm md:text-base font-medium mb-4">
                  <Link
                    href="/"
                    className="hover:text-[#FDD835] transition-colors"
                  >
                    Home
                  </Link>
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-white">{breadcrumb || title}</span>
                </div>

                <Heading1 className=" font-bold text-white tracking-tight leading-tight ">
                  {title}
                </Heading1>
                {subtitle && (
                  <p className="text-white/80 text-lg md:text-xl mt-4 font-medium max-w-2xl">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Right Content Half */}
            <div className="w-full md:w-1/2 h-full hidden md:block relative">
              {/* Edit Icon - Top Right of Hero Content Area */}
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute top-3 right-3 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/30 text-white transition-all border border-white/20 backdrop-blur-md z-40 group shadow-lg"
                title="Edit Hero"
              >
                <Edit className="w-5 h-5 transition-transform group-hover:rotate-12" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <AboutHeroModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={title}
        subtitle={subtitle}
        image={image}
      />
    </section>
  );
}
