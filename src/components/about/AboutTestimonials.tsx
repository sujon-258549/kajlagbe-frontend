"use client";

import React, { useState } from "react";
import { Quote, Edit, Plus } from "lucide-react";
import Image from "next/image";
import AdminOnly from "@/components/common/auth/AdminOnly";
import AboutTestimonialsModal from "@/components/modal/about/AboutTestimonialsModal";
import AboutTestimonialItemModal from "@/components/modal/about/AboutTestimonialItemModal";
import { AboutTestimonialsFormData } from "@/schemas/about/testimonials.schema";
import { AboutTestimonialItem } from "@/schemas/about/testimonial.schema";

export default function AboutTestimonials() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<
    AboutTestimonialItem | undefined
  >(undefined);

  const [data, setData] = useState<AboutTestimonialsFormData>({
    badge: "TESTIMONIALS",
    title: "Trusted by families, loved for flavor, known for quality",
    description:
      "We take pride in delivering the highest quality organic produce to our community.",
    percentage: "99%",
    percentageLabel: "Positive Reviews",
    reviewSubtitle: "Honest Reviews",
    reviewButtonLabel: "Write a Review",
    items: [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Happy Mom",
        content:
          "The freshest vegetables I've ever tasted! My kids actually love eating greens now.",
        rating: 5,
        image: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=S",
      },
      {
        id: 2,
        name: "Mike Peters",
        role: "Chef",
        content:
          "As a chef, quality is everything. This farm delivers the best produce consistently.",
        rating: 5,
        image: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=M",
      },
      {
        id: 3,
        name: "Emily Davis",
        role: "Health Coach",
        content:
          "I recommend this farm to all my clients. The nutritional density is unmatched.",
        rating: 5,
        image: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=E",
      },
    ],
  });

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsItemModalOpen(true);
  };

  const handleEditItem = (item: AboutTestimonialItem) => {
    setEditingItem(item);
    setIsItemModalOpen(true);
  };

  const handleSaveItem = (itemData: AboutTestimonialItem) => {
    if (editingItem) {
      setData((prev) => ({
        ...prev,
        items: prev.items?.map((item) =>
          item.id === editingItem.id ? itemData : item,
        ),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        items: [...(prev.items || []), { ...itemData, id: Date.now() }],
      }));
    }
    setIsItemModalOpen(false);
  };

  const handleDeleteItem = () => {
    if (editingItem) {
      setData((prev) => ({
        ...prev,
        items: prev.items?.filter((item) => item.id !== editingItem.id),
      }));
      setIsItemModalOpen(false);
    }
  };

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-[#f2f9ec] relative group/section">
      <div className="main-container mx-auto px-4 relative">
        {/* Section Action Buttons */}
        <AdminOnly>
          <div className="absolute top-0 right-8 flex gap-3 z-50 transition-all opacity-0 group-hover/section:opacity-100">
            <button
              onClick={handleAddItem}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-white shadow-lg hover:scale-110 transition-transform"
              title="Add Testimonial"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-secondary/20 text-secondary shadow-lg hover:scale-110 transition-transform"
              title="Edit Section Content"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
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
          {data.items?.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-gray-200 relative pt-12 group/card"
            >
              {/* Card Edit Button */}
              <AdminOnly>
                <button
                  onClick={() => handleEditItem(t)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-secondary/10 text-secondary opacity-0 group-hover/card:opacity-100 transition-all hover:bg-secondary hover:text-white z-10"
                  title="Edit Testimonial"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </AdminOnly>

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
                    src={
                      t.image ||
                      `https://placehold.co/100x100/154d2e/FFFFFF/png?text=${t.name.charAt(0)}`
                    }
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
        <AboutTestimonialItemModal
          isOpen={isItemModalOpen}
          onClose={() => setIsItemModalOpen(false)}
          item={editingItem}
          onSave={handleSaveItem}
          onDelete={handleDeleteItem}
        />
      </AdminOnly>
    </section>
  );
}
