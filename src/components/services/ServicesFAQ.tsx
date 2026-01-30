"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, Edit } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Heading2 from "@/components/common/Headings/Heading2";
import AdminOnly from "../common/auth/AdminOnly";
import ServicesFAQModal, {
  FAQFormData,
} from "../modal/services/ServicesFAQModal";

const initialFaqs = [
  {
    q: "Do you offer organic farming solutions?",
    a: "Yes, we specialize in 100% organic farming methods that avoid synthetic pesticides and fertilizers.",
  },
  {
    q: "Can I customize my service package?",
    a: "Absolutely! We understand every farm is unique. Contact us to create a tailored plan.",
  },
  {
    q: "What areas do you service?",
    a: "We currently serve major agricultural regions in the state. Please check our coverage map or call us.",
  },
  {
    q: "Do you provide soil testing?",
    a: "Yes, comprehensive soil health analysis is included in our Standard and above plans.",
  },
];

export default function ServicesFAQ() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faqData, setFaqData] = useState<FAQFormData>({
    faqs: initialFaqs.map((f) => ({ id: f.q, q: f.q, a: f.a })),
  });

  const handleUpdate = (data: FAQFormData) => {
    setFaqData(data);
  };

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-secondary relative group/section">
      <div className="main-container">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 items-stretch">
          {/* Image/Video Side */}
          <div className="w-full lg:w-1/2">
            <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
              <Dialog.Trigger asChild>
                <div className="relative h-[350px] md:h-[500px] lg:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1974&auto=format&fit=crop"
                    alt="Farming FAQ Video"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-secondary/20 group-hover:bg-secondary/40 transition-colors duration-300" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center relative shadow-lg group-hover:scale-110 transition-all duration-300">
                      <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Decorative Label */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                    <h4 className="font-bold text-lg mb-1">
                      Our Organic Promise
                    </h4>
                    <p className="text-white/70 text-sm">
                      Watch how we maintain the highest standards in every
                      harvest.
                    </p>
                  </div>
                </div>
              </Dialog.Trigger>

              <AnimatePresence mode="wait">
                {isOpen && (
                  <Dialog.Portal forceMount>
                    <Dialog.Overlay asChild>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 text-white flex items-center justify-center"
                      />
                    </Dialog.Overlay>
                    <Dialog.Content asChild>
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                          x: "-50%",
                          y: "-30%",
                        }}
                        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                        exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-30%" }}
                        className="fixed top-1/2 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl outline-none"
                      >
                        <Dialog.Close asChild>
                          <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-10 outline-none">
                            <X className="w-6 h-6" />
                          </button>
                        </Dialog.Close>
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/S4L8T2kFFn4?autoplay=1"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </motion.div>
                    </Dialog.Content>
                  </Dialog.Portal>
                )}
              </AnimatePresence>
            </Dialog.Root>
          </div>

          {/* FAQ Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center relative">
            <AdminOnly>
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute top-0 right-0 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white opacity-0 group-hover/section:opacity-100 transition-all hover:scale-110 hover:bg-white hover:text-secondary"
                title="Edit FAQ"
              >
                <Edit className="w-5 h-5" />
              </button>
            </AdminOnly>

            <div className="text-left mb-8 md:mb-10">
              <span className="text-[#86b86b] font-bold text-sm tracking-uppercase mb-2 block">
                FAQ
              </span>
              <Heading2 className="text-white">
                Frequently Asked Questions
              </Heading2>
            </div>

            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="w-full space-y-4"
            >
              {faqData.faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border-none rounded-xl px-6 bg-white data-[state=open]:ring-2 data-[state=open]:ring-primary/20 transition-all duration-300 shadow-md"
                >
                  <AccordionTrigger className="text-secondary font-bold text-lg hover:no-underline py-6 text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-6 text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      <ServicesFAQModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={faqData}
        onUpdate={handleUpdate}
      />
    </section>
  );
}
