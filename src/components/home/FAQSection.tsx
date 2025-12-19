"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What makes KajLagbe unique compared to other services?",
    answer: "KajLagbe combines cutting-edge IT expertise with high-quality on-demand home services, all under one roof. Our focus on certified professionals and premium quality standards ensures an unparalleled customer experience."
  },
  {
    question: "How do I book a service through the platform?",
    answer: "Booking is simple! Just select your desired service, choose a preferred time slot, and our system will match you with a certified professional in your area instantly."
  },
  {
    question: "Are your service providers certified and verified?",
    answer: "Absolutely. Every service provider on our platform undergoes a rigorous background check and must maintain high quality ratings to stay in our network."
  },
  {
    question: "Do you offer custom software development for enterprises?",
    answer: "Yes, our IT division specializes in full-cycle software development, cloud infrastructure, and cybersecurity solutions tailored to specific corporate needs."
  },
  {
    question: "What is your refund and satisfaction policy?",
    answer: "We offer a 100% satisfaction guarantee. If you are not happy with a service, we will rectify it or provide a full refund as per our customer satisfaction terms."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Header Side */}
          <div className="lg:w-2/5 space-y-6">
            <span className="text-[#42b7ff] font-bold tracking-[0.2em] uppercase text-sm">// Common Questions</span>
            <h2 className="text-4xl md:text-5xl font-black text-secondary leading-tight">
              Frequently Asked <span className="text-[#42b7ff]">Questions</span>
            </h2>
            <p className="text-lg text-black/70 leading-relaxed max-w-md font-medium">
              Find answers to the most common questions about our platform, services, and policies.
            </p>
            <div className="pt-4">
              <div className="bg-slate-50 p-8 rounded-2xl border-l-4 border-primary">
                <h4 className="font-black text-secondary text-lg mb-2">Still have questions?</h4>
                <p className="text-black/60 text-sm mb-4">Our support team is here to help you 24/7.</p>
                <button className="text-primary font-bold hover:underline">Contact Support Now →</button>
              </div>
            </div>
          </div>

          {/* Accordion Side */}
          <div className="lg:w-3/5 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all">
                <button 
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white group"
                >
                  <span className={`text-xl font-black transition-colors ${openIndex === index ? "text-secondary" : "text-black group-hover:text-secondary"}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === index ? "bg-secondary text-white rotate-180" : "bg-slate-100 text-black"}`}>
                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="p-6 pt-0 text-black/70 leading-relaxed bg-white font-medium">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
