"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Heading2 from "@/components/common/Headings/Heading2";
import { ArrowRight, Edit } from "lucide-react";
import AdminOnly from "../common/auth/AdminOnly";
import ServicesCTAModal, {
  CTAFormData,
} from "../modal/services/ServicesCTAModal";

export default function ServicesCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ctaData, setCtaData] = useState<CTAFormData>({
    title: "Ready to transform your land into a thriving harvest?",
    description:
      "Join hundreds of happy farmers who have partnered with us for sustainable and profitable agriculture.",
    primaryButtonText: "Get Started",
    secondaryButtonText: "Contact Us",
  });

  const handleUpdate = (data: CTAFormData) => {
    setCtaData(data);
  };

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-white relative group/section">
      <div className="main-container">
        <div className="bg-secondary rounded-2xl p-8 md:p-12 lg:p-20 text-center relative overflow-hidden border border-white/10 group/card">
          <AdminOnly>
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white text-secondary opacity-0 group-hover/card:opacity-100 transition-all hover:scale-110"
              title="Edit CTA"
            >
              <Edit className="w-5 h-5" />
            </button>
          </AdminOnly>

          {/* Background Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <Heading2 className="text-white">{ctaData.title}</Heading2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {ctaData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="xl"
                className="px-10  bg-primary text-white hover:bg-white hover:text-secondary   transition-all duration-300 group"
              >
                {ctaData.primaryButtonText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="px-10  border-white/20 text-white bg-transparent hover:bg-white hover:text-secondary  transition-all duration-300"
              >
                {ctaData.secondaryButtonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ServicesCTAModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={ctaData}
        onUpdate={handleUpdate}
      />
    </section>
  );
}
