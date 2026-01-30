"use client";

import { Leaf, ShieldCheck, Zap, Headphones } from "lucide-react";

export default function SubscriptionBenefits() {
  const benefits = [
    {
      icon: <Leaf className="w-8 h-8 text-white" />,
      title: "Eco-Friendly Solutions",
      description:
        "Our services are designed with the environment in mind, ensuring sustainable practices.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      title: "Secure & Reliable",
      description:
        "We prioritize your data security and guarantee 99.9% uptime for all our services.",
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Lightning Fast",
      description:
        "Optimized for performance to ensure you get what you need instantly.",
    },
    {
      icon: <Headphones className="w-8 h-8 text-white" />,
      title: "24/7 Premium Support",
      description:
        "Our dedicated team is always available to assist you with any questions or issues.",
    },
  ];

  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
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

      <div className="main-container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Why Choose Our Subscription?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Unlock exclusive benefits designed to accelerate your growth and
            simplify your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-primary transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary group-hover:bg-white/20 flex items-center justify-center mb-6 transition-colors duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
