"use client";

import { useState } from "react";
import Heading2 from "@/components/common/Headings/Heading2";
import Heading4 from "@/components/common/Headings/Heading4";
import { Edit } from "lucide-react";
import * as LucideIcons from "lucide-react";
import AdminOnly from "../common/auth/AdminOnly";
import ServicesProcessModal, {
  ProcessFormData,
} from "../modal/services/ServicesProcessModal";

const initialSteps = [
  {
    icon: "Clipboard",
    number: "01",
    title: "Consultation",
    description: "We discuss your needs and assess your land's potential.",
  },
  {
    icon: "PenTool",
    number: "02",
    title: "Planning",
    description: "Expert garden design and crop selection tailored to you.",
  },
  {
    icon: "Sprout",
    number: "03",
    title: "Planting",
    description: "Our team prepares the soil and plants with care.",
  },
  {
    icon: "Trees",
    number: "04",
    title: "Maintenance",
    description: "Ongoing care to ensure your harvest thrives.",
  },
];

export default function ServicesProcess() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processData, setProcessData] = useState<ProcessFormData>({
    subtitle: "HOW WE WORK",
    title: "Our proven process for perfect results",
    steps: initialSteps.map((s) => ({
      id: s.title,
      number: s.number,
      title: s.title,
      description: s.description,
      icon: s.icon,
    })),
  });

  const handleUpdate = (data: ProcessFormData) => {
    setProcessData(data);
  };

  const renderIcon = (iconName: string) => {
    // Check if it's a FontAwesome class
    if (iconName.startsWith("fa-")) {
      return <i className={iconName} />;
    }

    // Check if it's a Lucide icon
    const LucideIcon = (LucideIcons as any)[iconName];
    if (LucideIcon) {
      return (
        <LucideIcon className="w-6 h-6 md:w-8 md:h-8 text-secondary group-hover:scale-110 transition-transform duration-300" />
      );
    }

    // Default fallback (maybe a generic icon or null)
    return (
      <LucideIcons.HelpCircle className="w-6 h-6 md:w-8 md:h-8 text-secondary group-hover:scale-110 transition-transform duration-300" />
    );
  };

  return (
    <section className="pb-10 pt-0 md:py-16 lg:py-24 bg-white relative group/section">
      <div className="main-container relative">
        <AdminOnly>
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-0 right-4 md:right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white shadow-lg"
            title="Edit Process"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16 relative">
          <span className="text-secondary font-bold text-sm tracking-uppercase mb-2 block">
            {processData.subtitle}
          </span>
          <Heading2 className="text-secondary">{processData.title}</Heading2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-secondary/5 -z-10 translate-y-4 w-[75%] mx-auto rounded-full" />

          {processData.steps.map((step, idx) => {
            return (
              <div
                key={idx}
                className="relative group text-center bg-white p-5 md:p-6 rounded-2xl transition-all duration-300 border border-white/10"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-white rounded-full border border-gray-100 flex items-center justify-center mb-6 group-hover:border-primary group-hover:shadow-[0_0_0_4px_rgba(134,184,107,0.2)] transition-all duration-300 relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#f5fbf0] rounded-full flex items-center justify-center group-hover:scale-95 transition-transform duration-300">
                    {renderIcon(step.icon)}
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm ring-4 ring-white">
                    {step.number}
                  </div>
                </div>
                <Heading4 className="text-secondary mb-3">
                  {step.title}
                </Heading4>
                <p className="text-slate-500 text-sm leading-relaxed px-2">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <ServicesProcessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={processData}
        onUpdate={handleUpdate}
      />
    </section>
  );
}
