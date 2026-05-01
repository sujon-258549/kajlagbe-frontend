"use client";

import { useState, useEffect } from "react";
import { Check, X, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminOnly from "../common/auth/AdminOnly";
import PricingModal from "../modal/home/PricingModal";
import { PricingFormData } from "@/schemas/home/pricing.schema";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";
import Link from "next/link";

const initialPlans = [
  {
    name: "Basic Plan",
    price: "49",
    features: [
      { text: "Standard Support", included: true },
      { text: "Core Service Access", included: true },
      { text: "1 Project Listing", included: true },
      { text: "Basic Analytics", included: true },
      { text: "Priority Support", included: false },
      { text: "Advanced Tools", included: false },
    ],
    recommended: false,
    buttonText: "Get Started",
    buttonLink: "#",
  },
  {
    name: "Professional",
    price: "99",
    features: [
      { text: "24/7 Premium Support", included: true },
      { text: "Full Service Access", included: true },
      { text: "10 Project Listings", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "Custom Solutions", included: false },
      { text: "Dedicated Manager", included: false },
    ],
    recommended: true,
    buttonText: "Get Started",
    buttonLink: "#",
  },
  {
    name: "Ultimate Elite",
    price: "199",
    features: [
      { text: "Unlimited Everything", included: true },
      { text: "Enterprise Access", included: true },
      { text: "Unlimited Listings", included: true },
      { text: "AI Driven Insights", included: true },
      { text: "Custom Solutions", included: true },
      { text: "Dedicated Team", included: true },
    ],
    recommended: false,
    buttonText: "Get Started",
    buttonLink: "#",
  },
];

export default function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState<PricingFormData>({
    tagline: "// Our Pricing Plans",
    title: "Choose Your Perfect Plan",
    description: "Flexible pricing options tailored to meet the needs of individuals and large-scale enterprises alike.",
    plans: initialPlans,
  });

  useEffect(() => {
    const fetchPricingData = async () => {
      const res = await getSettingsMap("home");
      if (res.success && res.data.home_pricing) {
        setData(res.data.home_pricing.value);
      }
      setIsLoading(false);
    };
    fetchPricingData();
  }, []);

  const handleUpdate = async (newData: PricingFormData) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "home_pricing",
        value: newData,
        group: "home",
        description: "Homepage Pricing Section Settings",
      });
      if (res.success) {
        setData(newData);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="py-24 bg-slate-50 overflow-hidden relative group/section">
      <div className="main-container mx-auto px-6 relative">
        <AdminOnly>
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-0 right-4 md:right-6 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-secondary opacity-0 group-hover/section:opacity-100 transition-all duration-500 hover:bg-secondary hover:text-white shadow-xl"
            title="Edit Pricing"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm">
            {data.tagline}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight">
            {data.title.split("Plan")[0]} <span className="text-primary">Plan</span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch pt-6">
          {data.plans.map((plan, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-8 lg:p-10 border transition-all duration-300 relative flex flex-col h-full ${
                plan.recommended
                  ? "border-secondary scale-105 z-10 ring-4 ring-secondary/5 shadow-2xl"
                  : "border-slate-200 hover:border-primary/30 hover:-translate-y-1 shadow-sm"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-secondary to-green-600 text-white px-8 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase shadow-lg">
                  Most Popular
                </div>
              )}
              <div className="space-y-6 flex-grow">
                <div className="text-center space-y-4 border-b border-slate-50 pb-8">
                  <h3 className="text-xl font-bold text-slate-800 uppercase tracking-widest">
                    {plan.name}
                  </h3>
                  <div className="flex items-center justify-center text-secondary">
                    <span className="text-3xl font-bold self-start mt-2 opacity-60">
                      $
                    </span>
                    <span className="text-6xl md:text-7xl font-bold tracking-tighter">
                      {plan.price}
                    </span>
                    <span className="text-lg font-bold self-end mb-2 text-slate-400">
                      /mo
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-4">
                      {feature.included ? (
                        <div className="mt-1 bg-secondary/10 p-1 rounded-full">
                          <Check className="w-3.5 h-3.5 text-secondary stroke-3" />
                        </div>
                      ) : (
                        <div className="mt-1 bg-slate-100 p-1 rounded-full">
                          <X className="w-3.5 h-3.5 text-slate-300" />
                        </div>
                      )}
                      <span
                        className={`text-sm font-medium leading-tight ${feature.included ? "text-slate-700" : "text-slate-300"}`}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-10">
                <Link href={plan.buttonLink}>
                  <Button className={`w-full rounded-xl font-bold tracking-wide transition-all shadow-lg hover:scale-105 ${plan.recommended ? 'bg-secondary hover:bg-secondary/90 text-white shadow-secondary/20' : 'bg-slate-900 hover:bg-black text-white shadow-slate-200'}`}>
                    {plan.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PricingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={data}
        onUpdate={handleUpdate}
        isLoading={isUpdating}
      />
    </section>
  );
}
