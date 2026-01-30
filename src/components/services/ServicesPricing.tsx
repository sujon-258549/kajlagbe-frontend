import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Heading2 from "@/components/common/Headings/Heading2";

const plans = [
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
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="main-container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#86b86b] font-bold text-sm tracking-uppercase mb-2 block">
            PRICING PLANS
          </span>
          <Heading2 className="text-white">
            Choose the right plan for your farm
          </Heading2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl p-8 transition-all duration-300 bg-white ${
                plan.recommended
                  ? "border border-[#86b86b] scale-105 z-10"
                  : "border border-gray-100"
              }`}
            >
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
    </section>
  );
}
