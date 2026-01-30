"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Edit } from "lucide-react";

import Heading2 from "@/components/common/Headings/Heading2";
import Heading3 from "@/components/common/Headings/Heading3";
import Heading4 from "@/components/common/Headings/Heading4";
import AboutStoryModal from "@/components/modal/about/AboutStoryModal";
import AdminOnly from "@/components/common/auth/AdminOnly";
import { AboutStoryFormData } from "@/schemas/about/story.schema";

export default function AboutStory() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [data, setData] = useState<AboutStoryFormData>({
    badge: "About Us",
    title: "Pure is the only one farm that need no cover & extra fertilizer",
    description:
      "We believe that nature knows best. That,s why our farm is dedicated to growing produce the way it was meant to be grew—without artificial covers or synthetic fertilizers. Just pure sunlight, rich soil, and fresh water.",
    images: [
      "https://placehold.co/400x600/154d2e/FFFFFF/png?text=Fresh+Farm",
      "https://placehold.co/400x600/86b86b/FFFFFF/png?text=Vegetables",
    ],
    organicPercentage: "100%",
    features: [
      {
        title: "Only Pure Ingredients",
        description: "We never compromise on the quality of our inputs.",
      },
      {
        title: "Sustainability First",
        description:
          "Our farming practices enrich the land rather than depleting it.",
      },
    ],
  });

  return (
    <section className="pt-5 pb-10 md:py-16 lg:py-24 overflow-hidden relative group/section">
      <div className="main-container mx-auto px-4 relative">
        {/* Edit Button - Inside Container (Admin Only) */}
        <AdminOnly>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-6 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all z-40 hover:bg-secondary hover:text-white"
            title="Edit Section"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Image Grid */}
          <div className="w-full lg:w-1/2 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-6 md:pt-12">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                  <Image
                    src={
                      data.images[0] ||
                      "https://placehold.co/400x600/154d2e/FFFFFF/png?text=Image+1"
                    }
                    alt="Story Image 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-[#bce68a]/30 p-6 rounded-2xl text-center">
                  <Heading3 className="text-3xl font-bold text-secondary">
                    {data.organicPercentage}
                  </Heading3>
                  <p className="text-secondary font-medium">Organic Food</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-secondary p-6 rounded-2xl text-center text-white">
                  <Check className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">Certified Product</p>
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                  <Image
                    src={
                      data.images[1] ||
                      "https://placehold.co/400x600/86b86b/FFFFFF/png?text=Image+2"
                    }
                    alt="Story Image 2"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-block px-3 py-1 bg-secondary/10 rounded-full text-secondary font-medium text-sm">
              {data.badge}
            </div>
            <Heading2 className="text-secondary leading-snug">
              {data.title}
            </Heading2>
            <p className="text-slate-600 leading-relaxed">{data.description}</p>

            <div className="space-y-4 pt-4">
              {data.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#86b86b] flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <Heading4 className="text-secondary">
                      {feature.title}
                    </Heading4>
                    <p className="text-sm text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AdminOnly>
        <AboutStoryModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={data}
          onUpdate={(newData: AboutStoryFormData) => setData(newData)}
        />
      </AdminOnly>
    </section>
  );
}
