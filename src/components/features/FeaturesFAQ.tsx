"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import Heading5 from "../common/Headings/Heading5";

const faqs = [
  {
    question: "How fresh are your pantry products?",
    answer:
      "Our pantry staples are sourced daily and packed within 24 hours to ensure maximum freshness and nutritional value.",
  },
  {
    question: "Is all your packaging eco-friendly?",
    answer:
      "Yes, we use 100% biodegradable or recyclable materials for all our shipments and packaging.",
  },
  {
    question: "Do you offer doorstep delivery globally?",
    answer:
      "Currently we deliver across the country. We are working on expanding our reach to international flavor seekers soon.",
  },
  {
    question: "Can I visit your organic farms?",
    answer:
      "Absolutely! We love hosting families. You can book a farm visit through our contact page to see how we grow your food.",
  },
];

export default function FeaturesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="main-container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="lg:w-1/2 space-y-12">
            <div className="space-y-4">
              <span className="text-[#86b86b] font-bold text-sm tracking-widest uppercase">
                LEARN MORE
              </span>
              <h2 className="text-3xl lg:text-5xl font-black text-secondary leading-tight">
                Learn more about our food, our process & our promise
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 ${
                    openIndex === index
                      ? "bg-[#86b86b] border-[#86b86b]"
                      : "bg-white border-slate-200 hover:border-[#86b86b]/50"
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span
                      className={`font-bold text-lg transition-colors ${
                        openIndex === index ? "text-white" : "text-secondary"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        openIndex === index
                          ? "bg-white text-[#86b86b] rotate-180"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {openIndex === index ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-white/90 font-medium leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden">
              <Image
                src="https://placehold.co/800x1200/154d2e/FFFFFF/png?text=Our+Promise"
                alt="Our Process"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-secondary/60 to-transparent" />

              {/* Floating Review Card */}
              <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 text-white space-y-4">
                <div className="flex gap-1 text-[#86b86b]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-xl">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-lg italic font-medium leading-relaxed">
                  &quot;The quality of their oils and grains is unmatched. You
                  can really taste the purity in every bite.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#86b86b]">
                    <Image
                      src="https://placehold.co/100x100/86b86b/FFFFFF/png?text=U"
                      alt="User"
                      fill
                    />
                  </div>
                  <div>
                    <Heading5 className="font-bold">Sarah Jenkins</Heading5>
                    <p className="text-white/60 text-sm">Happy Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
