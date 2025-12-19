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
      { text: "Advanced Tools", included: false }
    ],
    color: "border-slate-200",
    button: "outline"
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
      { text: "Dedicated Manager", included: false }
    ],
    color: "border-secondary shadow-2xl scale-105 z-10",
    button: "default",
    recommended: true
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
      { text: "Dedicated Team", included: true }
    ],
    color: "border-slate-200",
    button: "outline"
  }
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm">// Our Pricing Plans</span>
          <h2 className="text-4xl md:text-5xl font-black text-black">Choose Your Perfect <span className="text-primary">Plan</span></h2>
          <p className="text-lg text-slate-500">
            Flexible pricing options tailored to meet the needs of individuals and large-scale enterprises alike.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch pt-6">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white rounded-3xl p-10 border-2 ${plan.color} relative flex flex-col h-full`}>
              {plan.recommended && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-secondary text-white px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
                  Best Choice
                </div>
              )}
              <div className="space-y-6 flex-grow">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black text-secondary uppercase tracking-wider">{plan.name}</h3>
                  <div className="flex items-center justify-center">
                    <span className="text-2xl font-bold text-slate-400 self-start mt-2">$</span>
                    <span className="text-7xl font-black text-secondary">{plan.price}</span>
                    <span className="text-lg font-bold text-slate-400 self-end mb-2">/mo</span>
                  </div>
                </div>
                
                <div className="space-y-4 pt-10">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300 flex-shrink-0" />
                      )}
                      <span className={`font-bold ${feature.included ? "text-black" : "text-slate-300"}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-10">
                <Button 
                  className={`w-full h-14 font-black tracking-widest uppercase rounded-full transition-all ${
                    plan.button === "default" 
                      ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" 
                      : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  }`}
                  variant={plan.button as any}
                >
                  Get Started Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
