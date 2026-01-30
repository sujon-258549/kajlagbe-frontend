"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  id: string;
  items: FAQ[];
}

const FAQSection = ({ title, id, items }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div id={id} className="scroll-mt-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-black text-secondary">
        {title}
      </h2>
      <div className="space-y-4">
        {items.map((faq, idx) => (
          <div
            key={idx}
            className={cn(
              "rounded-xl border transition-all duration-300",
              openIndex === idx
                ? "bg-[#86b86b] border-[#86b86b]"
                : "bg-slate-50 border-slate-100 hover:border-[#86b86b]/50",
            )}
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span
                className={cn(
                  "font-bold text-[16px] transition-colors",
                  openIndex === idx ? "text-white" : "text-secondary",
                )}
              >
                {`${idx + 1}. ${faq.question}`}
              </span>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                  openIndex === idx
                    ? "bg-white text-[#86b86b]"
                    : "bg-slate-200 text-slate-400",
                )}
              >
                {openIndex === idx ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </div>
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                <p className="text-white/95 text-sm font-medium leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const faqData = [
  {
    title: "Product Related Questions",
    id: "product",
    items: [
      {
        question: "Are your products made with natural ingredients?",
        answer:
          "Our products are made using natural, high-quality ingredients. We avoid artificial colors, flavors, and preservatives to ensure that every bite you enjoy is set only.",
      },
      {
        question: "How long do your food items stay fresh?",
        answer:
          "Our products are made using natural, high-quality ingredients. We avoid artificial colors, flavors, and preservatives to ensure that every bite you enjoy is set only.",
      },
      {
        question: "Do your products contain any allergens or additives?",
        answer:
          "Our products are made using natural, high-quality ingredients. We avoid artificial colors, flavors, and preservatives.",
      },
      {
        question: "Are your food items suitable for vegetarians or vegans?",
        answer:
          "Our products are made using natural, high-quality ingredients. We avoid artificial colors, flavors, and preservatives.",
      },
    ],
  },
  {
    title: "Ordering And Shipping",
    id: "shipping",
    items: [
      {
        question: "How long does it usually take to deliver orders?",
        answer:
          "Our delivery usually takes 3-5 business days depending on your location.",
      },
      {
        question: "Can I easily track my shipment online?",
        answer:
          "Our products are made using natural, high-quality ingredients. We avoid artificial colors, flavors, and preservatives to ensure that every bite you enjoy is set only.",
      },
      {
        question: "Do you currently offer free shipping options?",
        answer: "Yes, we offer free shipping on orders over $50.",
      },
      {
        question: "What should I do if my order arrives damaged?",
        answer:
          "Please contact our support team within 24 hours with photos of the damaged items.",
      },
    ],
  },
  {
    title: "Ingredients And Nutrition",
    id: "nutrition",
    items: [
      {
        question: "What ingredients do you use, and are they natural?",
        answer:
          "We use 100% natural and organic ingredients sourced directly from farmers.",
      },
      {
        question:
          "Are your items free from artificial preservatives and colors?",
        answer:
          "Our products are made using natural, high-quality ingredients. We avoid artificial colors, flavors, and preservatives to ensure that every bite you enjoy is set only.",
      },
      {
        question:
          "Do your products contain common allergens like nuts or dairy?",
        answer: "Allergens are clearly marked on each product package.",
      },
      {
        question: "Where can I find nutritional info for each product?",
        answer:
          "Nutritional information is available on each product page and on the packaging.",
      },
    ],
  },
  {
    title: "Returns And Refunds",
    id: "returns",
    items: [
      {
        question:
          "What is your return policy if I'm not satisfied with the product?",
        answer: "We have a 7-day satisfaction guarantee for all our products.",
      },
      {
        question: "How many days do I have to request a return or exchange?",
        answer:
          "Our products are made using natural, high-quality ingredients. We avoid artificial colors, flavors, and preservatives to ensure that every bite you enjoy is set only.",
      },
      {
        question: "Do you offer full refunds or only store credit on returns?",
        answer:
          "We offer full refunds for eligible returns back to your original payment method.",
      },
      {
        question: "What should I do if I receive an incorrect or expired item?",
        answer: "Contact our support team immediately for a free replacement.",
      },
    ],
  },
];

export default function FAQContent() {
  return (
    <div className="space-y-20">
      {faqData.map((section, idx) => (
        <FAQSection key={idx} {...section} />
      ))}
    </div>
  );
}
