"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Tag, Edit } from "lucide-react";
import Heading1 from "../common/Headings/Heading1";
import AdminOnly from "../common/auth/AdminOnly";
import BlogHeroModal from "../modal/blog/BlogHeroModal";
import { BlogHeroFormData } from "@/schemas/blog/hero.schema";

interface BlogHeroProps {
  title: string;
  breadcrumb?: string;
  date?: string;
  category?: string;
  isDetails?: boolean;
}

export default function BlogHero({
  title: initialTitle,
  breadcrumb: initialBreadcrumb,
  date,
  category,
  isDetails = false,
}: BlogHeroProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [data, setData] = useState<BlogHeroFormData>({
    title: initialTitle,
    breadcrumb: initialBreadcrumb || "Blog",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2664&auto=format&fit=crop",
    bgImage:
      "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2670&auto=format&fit=crop",
  });

  return (
    <section className="py-10 group/section relative">
      <div className="main-container mx-auto px-4">
        <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-[#0B3D2E] flex">
          {/* Edit Button */}
          {!isDetails && (
            <AdminOnly>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/30 text-white transition-all border border-white/20 backdrop-blur-md z-50 group shadow-lg"
                title="Edit Hero"
              >
                <Edit className="w-5 h-5" />
              </button>
            </AdminOnly>
          )}

          {/* Background Decorative Texture */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div
              className="absolute inset-0 bg-cover bg-center grayscale"
              style={{ backgroundImage: `url(${data.bgImage})` }}
            />
          </div>

          {/* Sibling Skewed Layers (matching CommonHero style) */}
          <div className="hidden md:block absolute top-0 bottom-0 right-[-10%] w-[60%] bg-[#0B3D2E] z-10 origin-right -skew-x-12 overflow-hidden shadow-[-20px_0_50px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 opacity-20 skew-x-12 origin-right scale-125">
              <Image
                src={data.image}
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
                    {data.breadcrumb}
                  </Link>
                  {isDetails && (
                    <>
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span className="text-white truncate max-w-[150px] md:max-w-xs">
                        {data.title}
                      </span>
                    </>
                  )}
                </div>

                <Heading1 className="text-white  font-black leading-tight tracking-tight">
                  {data.title}
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

      {!isDetails && (
        <BlogHeroModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={data.title}
          breadcrumb={data.breadcrumb}
          image={data.image}
          bgImage={data.bgImage}
          onUpdate={(newData: BlogHeroFormData) => setData(newData)}
        />
      )}
    </section>
  );
}
