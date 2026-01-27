"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
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
    color: "border-slate-200",
    button: "outline",
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
    color: "border-secondary shadow-2xl scale-105 z-10",
    button: "default",
    recommended: true,
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
    color: "border-slate-200",
    button: "outline",
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="main-container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm">
            {"// Our Pricing Plans"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight">
            Choose Your Perfect <span className="text-primary">Plan</span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            Flexible pricing options tailored to meet the needs of individuals
            and large-scale enterprises alike.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch pt-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-8 lg:p-10 border transition-all duration-300 relative flex flex-col h-full ${
                plan.recommended
                  ? "border-secondary scale-105 z-10 ring-4 ring-secondary/5"
                  : "border-slate-200 hover:border-primary/30 hover:-translate-y-1"
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
                <Button className="w-full rounded-xl font-bold tracking-wide transition-all shadow-lg shadow-secondary/20 hover:scale-105">
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
