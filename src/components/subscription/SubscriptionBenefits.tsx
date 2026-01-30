import React, { useState } from "react";
import {
  Leaf,
  ShieldCheck,
  Zap,
  Headphones,
  Star,
  Heart,
  Edit,
} from "lucide-react";
import AdminOnly from "@/components/common/auth/AdminOnly";
import SubscriptionBenefitsModal from "@/components/modal/subscription/SubscriptionBenefitsModal";
import { SubscriptionBenefitsFormData } from "@/schemas/subscription/benefits.schema";

const ICON_MAP: Record<string, any> = {
  leaf: Leaf,
  shield: ShieldCheck,
  zap: Zap,
  headphones: Headphones,
  star: Star,
  heart: Heart,
};

export default function SubscriptionBenefits() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [data, setData] = useState<SubscriptionBenefitsFormData>({
    title: "Why Choose Our Subscription?",
    description:
      "Unlock exclusive benefits designed to accelerate your growth and simplify your workflow.",
    benefits: [
      {
        iconType: "leaf",
        title: "Eco-Friendly Solutions",
        description:
          "Our services are designed with the environment in mind, ensuring sustainable practices.",
      },
      {
        iconType: "shield",
        title: "Secure & Reliable",
        description:
          "We prioritize your data security and guarantee 99.9% uptime for all our services.",
      },
      {
        iconType: "zap",
        title: "Lightning Fast",
        description:
          "Optimized for performance to ensure you get what you need instantly.",
      },
      {
        iconType: "headphones",
        title: "24/7 Premium Support",
        description:
          "Our dedicated team is always available to assist you with any questions or issues.",
      },
    ],
  });

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-secondary relative overflow-hidden group/section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
        </svg>
      </div>

      <div className="main-container relative z-10">
        {/* Edit Button */}
        <AdminOnly>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-0 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white opacity-0 group-hover/section:opacity-100 transition-all z-50 hover:bg-white hover:text-secondary"
            title="Edit Benefits"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {data.title}
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">{data.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.benefits.map((benefit, index) => {
            const Icon = ICON_MAP[benefit.iconType] || Zap;
            return (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-primary transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary group-hover:bg-white/20 flex items-center justify-center mb-6 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <AdminOnly>
        <SubscriptionBenefitsModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={data}
          onUpdate={(newData: SubscriptionBenefitsFormData) => setData(newData)}
        />
      </AdminOnly>
    </section>
  );
}
