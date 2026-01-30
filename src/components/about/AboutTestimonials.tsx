"use client";

import React, { useState } from "react";
import { Quote, Edit } from "lucide-react";
import Image from "next/image";
import AdminOnly from "@/components/common/auth/AdminOnly";
import AboutTestimonialsModal from "@/components/modal/about/AboutTestimonialsModal";
import { AboutTestimonialsFormData } from "@/schemas/about/testimonials.schema";

export default function AboutTestimonials() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [data, setData] = useState<AboutTestimonialsFormData>({
    badge: "TESTIMONIALS",
    title: "Trusted by families, loved for flavor, known for quality",
    items: [
      {
        name: "Sarah Johnson",
        role: "Happy Mom",
        content:
          "The freshest vegetables I've ever tasted! My kids actually love eating greens now.",
        rating: 5,
      },
      {
        name: "Mike Peters",
        role: "Chef",
        content:
          "As a chef, quality is everything. This farm delivers the best produce consistently.",
        rating: 5,
      },
      {
        name: "Emily Davis",
        role: "Health Coach",
        content:
          "I recommend this farm to all my clients. The nutritional density is unmatched.",
        rating: 5,
      },
    ],
  });

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-[#f2f9ec] relative group/section">
      <div className="main-container mx-auto px-4 relative">
        {/* Edit Button */}
        <AdminOnly>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-0 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white z-50"
            title="Edit Section"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-[#86b86b] font-bold text-sm tracking-uppercase mb-2 block lowercase">
            {data.badge}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-gray-200 relative pt-12"
            >
              <div className="absolute -top-6 left-8 w-12 h-12 bg-[#86b86b] rounded-full flex items-center justify-center text-white">
                <Quote size={20} fill="currentColor" />
              </div>

              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <p className="text-slate-600 mb-6 italic">{t.content}</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden relative">
                  <Image
                    src={`https://placehold.co/100x100/154d2e/FFFFFF/png?text=${t.name.charAt(0)}`}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-secondary leading-snug">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500 uppercase">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AdminOnly>
        <AboutTestimonialsModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={data}
          onUpdate={(newData) => setData(newData)}
        />
      </AdminOnly>
    </section>
  );
}
