"use client";

import { useState } from "react";
import {
  Plus,
  Minus,
  HelpCircle,
  MessageSquare,
  Phone,
  Edit,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Heading5 from "../common/Headings/Heading5";
import Heading4 from "../common/Headings/Heading4";
import AdminOnly from "../common/auth/AdminOnly";
import HomeFaqModal from "../modal/home/HomeFaqModal";
import { HomeFaqFormData } from "@/schemas/home/faq.schema";

const initialFaqs = [
  {
    question: "What makes KajLagbe unique compared to other services?",
    answer:
      "KajLagbe combines cutting-edge IT expertise with high-quality on-demand home services, all under one roof. Our focus on certified professionals and premium quality standards ensures an unparalleled customer experience.",
  },
  {
    question: "How do I book a service through the platform?",
    answer:
      "Booking is simple! Just select your desired service, choose a preferred time slot, and our system will match you with a certified professional in your area instantly.",
  },
  {
    question: "Are your service providers certified and verified?",
    answer:
      "Absolutely. Every service provider on our platform undergoes a rigorous background check and must maintain high quality ratings to stay in our network.",
  },
  {
    question: "Do you offer custom software development for enterprises?",
    answer:
      "Yes, our IT division specializes in full-cycle software development, cloud infrastructure, and cybersecurity solutions tailored to specific corporate needs.",
  },
  {
    question: "What is your refund and satisfaction policy?",
    answer:
      "We offer a 100% satisfaction guarantee. If you are not happy with a service, we will rectify it or provide a full refund as per our customer satisfaction terms.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<HomeFaqFormData>({
    badge: "Support Center",
    title: "Frequently Asked Questions",
    description:
      "Find answers to the most common questions about our platform, services, and policies.",
    ctaTitle: "Still have questions?",
    ctaDescription:
      "Can't find the answer you're looking for? Our dedicated team is available 24/7 to help.",
    ctaButtonText: "Contact Now",
    faqs: initialFaqs,
  });

  return (
    <section className=" md:py-24 py-10 bg-slate-50/50 relative overflow-hidden group/section">
      <AdminOnly>
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-8 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white shadow-lg"
          title="Edit FAQs"
        >
          <Edit className="w-4 h-4" />
        </button>
      </AdminOnly>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-2xl blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-2xl blur-3xl opacity-60" />

      <div className="main-container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Header Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/5 space-y-8"
          >
            <div className="space-y-5">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-sm border border-slate-200 text-primary font-bold tracking-wider uppercase text-xs"
              >
                <span className="w-2 h-2 rounded-lg bg-primary animate-pulse" />
                {data.badge}
              </motion.span>
              <Heading4 className="text-4xl md:text-5xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                {data.title.split("Questions")[0]}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-orange-600">
                  Questions
                </span>
              </Heading4>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {data.description}
              </p>
            </div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-2xl shadow-slate-200/50 border-2 border-dashed border-secondary relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 bg-secondary/5 rounded-bl-2xl">
                <MessageSquare className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
              </div>
              <Heading5 className="font-bold text-slate-900 text-xl mb-3">
                {data.ctaTitle}
              </Heading5>
              <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                {data.ctaDescription}
              </p>
              <button className="flex items-center gap-3 px-6 py-3 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/25 cursor-pointer">
                {data.ctaButtonText} <Phone className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>

          {/* Accordion Side */}
          <div className="lg:w-3/5 space-y-3">
            {data.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group rounded-xl transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "bg-secondary shadow-xl cursor-pointer shadow-secondary/25 border-transparent"
                    : "bg-white/50 border border-slate-200 hover:border-secondary/40 hover:bg-white"
                }`}
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex cursor-pointer items-center justify-between p-5 text-left focus:outline-hidden"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        openIndex === index
                          ? "bg-white/20 text-white shadow-lg scale-110"
                          : "bg-slate-100 text-slate-400 group-hover:bg-secondary/10 group-hover:text-secondary"
                      }`}
                    >
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-lg font-semibold transition-colors duration-300 ${
                        openIndex === index
                          ? "text-white"
                          : "text-slate-700 group-hover:text-slate-900"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer duration-300 ${
                      openIndex === index
                        ? "bg-white/20 text-white rotate-180"
                        : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                    }`}
                  >
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 lg:ml-16">
                        <div className="h-px bg-white/20 mb-4" />
                        <p className="text-white/90 leading-relaxed text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <HomeFaqModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={data}
        onUpdate={(newData: HomeFaqFormData) => setData(newData)}
      />
    </section>
  );
}
