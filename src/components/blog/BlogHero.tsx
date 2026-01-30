"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import Heading1 from "../common/Headings/Heading1";

interface BlogHeroProps {
  title: string;
  date?: string;
  category?: string;
  isDetails?: boolean;
}

export default function BlogHero({
  title,
  date,
  category,
  isDetails = false,
}: BlogHeroProps) {
  return (
    <section className="py-10">
      <div className="main-container mx-auto px-4">
        <div className="relative w-full h-[350px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-[#0B3D2E] flex">
          {/* Background Decorative Texture */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center grayscale" />
          </div>

          {/* Sibling Skewed Layers (matching CommonHero style) */}
          <div className="hidden md:block absolute top-0 bottom-0 right-[-10%] w-[60%] bg-[#0B3D2E] z-10 origin-right -skew-x-12 overflow-hidden shadow-[-20px_0_50px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 opacity-20 skew-x-12 origin-right scale-125">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2664&auto=format&fit=crop"
                alt="Decoration"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="hidden md:block absolute top-0 bottom-0 right-[48%] w-[10px] bg-white/20 z-20 -skew-x-12" />
          <div className="hidden md:block absolute top-0 bottom-0 right-[50%] w-[15px] bg-primary z-20 -skew-x-12" />

          {/* Content Layer */}
          <div className="relative z-30 w-full h-full flex items-center">
            <div className="w-full md:w-2/3 lg:w-1/2 px-6 md:pl-20">
              <div className="space-y-6">
                {/* Breadcrumb / Meta */}
                <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm md:text-base font-medium">
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Home
                  </Link>
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <Link
                    href="/blog"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                  {isDetails && (
                    <>
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span className="text-white truncate max-w-[150px] md:max-w-xs">
                        {title}
                      </span>
                    </>
                  )}
                </div>

                <Heading1 className="text-white text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                  {title}
                </Heading1>

                {isDetails && (date || category) && (
                  <div className="flex flex-wrap items-center gap-6 pt-4">
                    {date && (
                      <div className="flex items-center gap-2 text-white/90 font-bold">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="uppercase tracking-widest text-xs md:text-sm">
                          {date}
                        </span>
                      </div>
                    )}
                    {category && (
                      <div className="flex items-center gap-2 text-white/90 font-bold">
                        <Tag className="w-5 h-5 text-primary" />
                        <span className="uppercase tracking-widest text-xs md:text-sm">
                          {category}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
