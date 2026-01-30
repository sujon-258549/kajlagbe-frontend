import React, { useState } from "react";
import { Check, Edit } from "lucide-react";
import AdminOnly from "@/components/common/auth/AdminOnly";
import SubscriptionPricingModal from "@/components/modal/subscription/SubscriptionPricingModal";
import { SubscriptionPricingFormData } from "@/schemas/subscription/pricing.schema";

export default function SubscriptionPricing() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [data, setData] = useState<SubscriptionPricingFormData>({
    title: "Simple, Transparent Pricing",
    subtitle: "Choose the plan that best fits your needs. No hidden fees.",
    plans: [
      {
        name: "Basic Plan",
        price: "$19",
        period: "/month",
        description: "Perfect for individuals starting their journey",
        features: [
          "Access to basic features",
          "Email support",
          "1 GB Storage",
          "Basic Analytics",
        ],
        isPopular: false,
        buttonText: "Get Started",
      },
      {
        name: "Pro Plan",
        price: "$49",
        period: "/month",
        description: "For professionals who need more power",
        features: [
          "All Basic features",
          "Priority Support",
          "10 GB Storage",
          "Advanced Analytics",
          "Custom Domains",
        ],
        isPopular: true,
        buttonText: "Get Started",
      },
      {
        name: "Enterprise",
        price: "$99",
        period: "/month",
        description: "For organizations requiring scale",
        features: [
          "All Pro features",
          "24/7 Dedicated Support",
          "Unlimited Storage",
          "Custom Integrations",
          "SLA Agreement",
        ],
        isPopular: false,
        buttonText: "Get Started",
      },
    ],
  });

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-gray-50 relative group/section">
      <div className="main-container relative">
        {/* Edit Button */}
        <AdminOnly>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-0 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all z-50 hover:bg-secondary hover:text-white"
            title="Edit Pricing"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              {data.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-xl p-8 transition-all hover:-translate-y-2 duration-300 ${
                plan.isPopular
                  ? "border-2 border-primary"
                  : "border border-gray-200 shadow-sm"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-secondary mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-500 text-sm italic">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-secondary">
                  {plan.price}
                </span>
                <span className="text-gray-500 font-medium">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2.5 rounded-xl font-bold transition-colors ${
                  plan.isPopular
                    ? "bg-primary text-white hover:bg-green-700"
                    : "bg-gray-100 text-secondary hover:bg-gray-200"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      <AdminOnly>
        <SubscriptionPricingModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={data}
          onUpdate={(newData: SubscriptionPricingFormData) => setData(newData)}
        />
      </AdminOnly>
    </section>
  );
}
