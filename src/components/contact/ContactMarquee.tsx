"use client";

import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { Edit } from "lucide-react";
import AdminOnly from "@/components/common/auth/AdminOnly";
import ContactMarqueeModal from "@/components/modal/contact/ContactMarqueeModal";
import { ContactMarqueeFormData } from "@/schemas/contact/marquee.schema";

export default function ContactMarquee() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [data, setData] = useState<ContactMarqueeFormData>({
    items: [
      { text: "Everyday Nourishment" },
      { text: "Wholesome Goodness" },
      { text: "Farm Fresh Finds" },
      { text: "Flavors You Love" },
      { text: "Everyday Nourishment" },
      { text: "Wholesome Goodness" },
      { text: "Farm Fresh Finds" },
      { text: "Flavors You Love" },
    ],
  });

  return (
    <div className="bg-primary py-4 overflow-hidden text-white relative group/marquee">
      <div className="main-container mx-auto px-4 relative">
        {/* Edit Button */}
        <AdminOnly>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-1/2 -translate-y-1/2 right-8 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 border border-white/30 text-white opacity-0 group-hover/marquee:opacity-100 transition-all z-50 hover:bg-white hover:text-primary"
            title="Edit Marquee"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
        </AdminOnly>
      </div>

      <Marquee gradient={false} speed={50} pauseOnHover>
        {data.items.map((item, i) => (
          <div key={i} className="flex items-center mx-12 gap-3">
            <span className="text-xl">⛑</span>
            <span className="font-bold uppercase tracking-widest text-sm md:text-base">
              {item.text}
            </span>
          </div>
        ))}
      </Marquee>

      <AdminOnly>
        <ContactMarqueeModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={data}
          onUpdate={(newData: ContactMarqueeFormData) => setData(newData)}
        />
      </AdminOnly>
    </div>
  );
}
