"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Edit } from "lucide-react";
import AdminOnly from "@/components/common/auth/AdminOnly";
import ContactInfoModal from "@/components/modal/contact/ContactInfoModal";
import { ContactInfoFormData } from "@/schemas/contact/info.schema";

const ICON_MAP: Record<string, any> = {
  phone: Phone,
  mail: Mail,
  map: MapPin,
  clock: Clock,
};

export default function ContactInfo() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [data, setData] = useState<ContactInfoFormData>({
    cards: [
      {
        iconType: "phone",
        title: "Contact Us",
        lines: ["+ (123) 456-789", "+ (978) 645-132"],
      },
      {
        iconType: "mail",
        title: "E - mail",
        lines: ["info@domainname.com", "support@domain.com"],
      },
      {
        iconType: "map",
        title: "Address",
        lines: ["1234 Maple Avenue, Suite 567", "United States"],
      },
      {
        iconType: "clock",
        title: "Working hours",
        lines: ["Mon-Sat : 10am to 07pm", "Sunday: Closed"],
      },
    ],
  });

  return (
    <section className="my-16 space-y-20 relative group/section">
      <div className="main-container mx-auto px-4 relative">
        {/* Edit Button */}
        <AdminOnly>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-0 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white z-50"
            title="Edit Contact Info"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.cards.map((card, idx) => {
            const Icon = ICON_MAP[card.iconType] || Phone;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl border border-gray-200 flex flex-col items-start space-y-4 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-xl text-secondary">
                  {card.title}
                </h3>
                <div className="space-y-1 text-left w-full">
                  {card.lines.map((line, i) => (
                    <p key={i} className="text-gray-500 text-sm break-words">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AdminOnly>
        <ContactInfoModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={data}
          onUpdate={(newData: ContactInfoFormData) => setData(newData)}
        />
      </AdminOnly>
    </section>
  );
}
