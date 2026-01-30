"use client";

import { useState } from "react";
import { Check, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Heading2 from "@/components/common/Headings/Heading2";
import AdminOnly from "../common/auth/AdminOnly";
import ServicesPricingSectionModal, {
  PricingSectionFormData,
} from "../modal/services/ServicesPricingSectionModal";
import ServicesPricingCardModal, {
  PricingCardFormData,
} from "../modal/services/ServicesPricingCardModal";

const initialPlans = [
  {
    name: "Standard",
    price: "49",
    features: [
      "Garden design consultation",
      "Soil health analysis",
      "Basic planting plan",
      "1 month support",
    ],
    recommended: false,
  },
  {
    name: "Premium",
    price: "99",
    features: [
      "Everything in Standard",
      "Full landscape design",
      "Irrigation system setup",
      "3 months support",
      "Seasonal maintenance guide",
    ],
    recommended: true,
  },
  {
    name: "Professional",
    price: "199",
    features: [
      "Everything in Premium",
      "Monthly on-site visits",
      "Pest control monitoring",
      "Harvest assistance",
      "Priority expert support",
    ],
    recommended: false,
  },
];

export default function ServicesPricing() {
  const [sectionData, setSectionData] = useState<PricingSectionFormData>({
    tagline: "PRICING PLANS",
    title: "Choose the right plan for your farm",
  });
  const [plans, setPlans] = useState<PricingCardFormData[]>(initialPlans);

  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [editingCardIndex, setEditingCardIndex] = useState<number | null>(null);

  const handleSectionUpdate = (data: PricingSectionFormData) => {
    setSectionData(data);
  };

  const handleCardUpdate = (data: PricingCardFormData) => {
    if (editingCardIndex !== null) {
      const updatedPlans = [...plans];
      updatedPlans[editingCardIndex] = data;
      setPlans(updatedPlans);
    }
  };

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-secondary relative group/section">
      <div className="main-container relative">
        <AdminOnly>
          <button
            onClick={() => setIsSectionModalOpen(true)}
            className="absolute top-0 right-0 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white opacity-0 group-hover/section:opacity-100 transition-all hover:bg-white hover:text-secondary"
            title="Edit Title & Tagline"
          >
            <Edit className="w-5 h-5" />
          </button>
        </AdminOnly>

        <div className="text-center max-w-2xl mx-auto mb-16 relative group/header">
          <span className="text-[#86b86b] font-bold text-sm tracking-uppercase mb-2 block">
            {sectionData.tagline}
          </span>
          <Heading2 className="text-white">{sectionData.title}</Heading2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl p-8 transition-all duration-300 bg-white group/card ${
                plan.recommended
                  ? "border border-[#86b86b] lg:scale-105 z-10"
                  : "border border-gray-100"
              }`}
            >
              <AdminOnly>
                <button
                  onClick={() => setEditingCardIndex(idx)}
                  className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 opacity-0 group-hover/card:opacity-100 transition-all hover:bg-primary hover:text-white"
                  title="Edit Card"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </AdminOnly>

              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </div>
              )}
              <div className="text-center mb-8">
                <h4
                  className={`text-lg font-bold mb-4 ${
                    plan.recommended ? "text-secondary" : "text-slate-500"
                  }`}
                >
                  {plan.name}
                </h4>
                <div className="flex items-start justify-center">
                  <span className="text-2xl font-bold mt-2">$</span>
                  <span className="text-6xl font-bold">{plan.price}</span>
                  <span className="text-sm font-medium mt-auto mb-2 opacity-70">
                    /mo
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        plan.recommended
                          ? "bg-secondary text-white"
                          : "bg-[#f5fbf0] text-secondary"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </div>
                    <span className={`text-sm text-slate-600`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full h-12 rounded-xl font-bold transition-transform hover:scale-[1.02] ${
                  plan.recommended
                    ? "bg-secondary text-white hover:bg-[#86b86b]"
                    : "bg-[#f5fbf0] text-secondary hover:bg-secondary hover:text-white"
                }`}
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </div>

      <ServicesPricingSectionModal
        isOpen={isSectionModalOpen}
        onClose={() => setIsSectionModalOpen(false)}
        initialData={sectionData}
        onUpdate={handleSectionUpdate}
      />

      {editingCardIndex !== null && (
        <ServicesPricingCardModal
          isOpen={true} // It's controlled by the index being non-null
          onClose={() => setEditingCardIndex(null)}
          initialData={plans[editingCardIndex]}
          onUpdate={handleCardUpdate}
        />
      )}
    </section>
  );
}
