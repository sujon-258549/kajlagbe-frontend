import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Play, X, Edit } from "lucide-react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import AdminOnly from "@/components/common/auth/AdminOnly";
import SubscriptionFAQModal from "@/components/modal/subscription/SubscriptionFAQModal";
import { SubscriptionFAQFormData } from "@/schemas/subscription/faq.schema";

export default function SubscriptionFAQ() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [data, setData] = useState<SubscriptionFAQFormData>({
    title: "Frequently Asked Questions",
    description: "Have questions? We&apos;re here to help.",
    faqs: [
      {
        question: "Can I cancel my subscription at any time?",
        answer:
          "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.",
      },
      {
        question: "Is there a free trial available?",
        answer:
          "We offer a 14-day free trial for our Pro plan. No credit card required to start.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
      },
      {
        question: "Can I upgrade or downgrade my plan?",
        answer:
          "Absolutely! You can switch plans at any time from your account settings. Prorated charges or credits will apply.",
      },
      {
        question: "Do you offer discounts for non-profits?",
        answer:
          "Yes, we offer special pricing for non-profit organizations and educational institutions. Contact our sales team for details.",
      },
    ],
    videoThumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    videoUrl: "S4L8T2kFFn4",
    videoLabel: "Watch our walkthrough",
    videoDescription:
      "See how Kajlagbe can transform your farming business in minutes.",
  });

  // Helper to ensure we have a clean embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11
        ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
        : url;
    }
    return `https://www.youtube.com/embed/${url}?autoplay=1`;
  };

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-secondary relative group/section">
      {/* Edit Button */}
      <AdminOnly>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="absolute top-6 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white opacity-0 group-hover/section:opacity-100 transition-all z-50 hover:bg-white hover:text-secondary"
          title="Edit FAQ & Video"
        >
          <Edit className="w-4 h-4" />
        </button>
      </AdminOnly>

      <div className="main-container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* FAQ Content Side */}
          <div className="w-full lg:w-1/2">
            <div className="text-left mb-8 md:mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {data.title}
              </h2>
              <p className="text-white/70">{data.description}</p>
            </div>

            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="w-full space-y-4"
            >
              {data.faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-2xl border-none px-6 md:px-8 shadow-lg overflow-hidden group data-[state=open]:ring-2 data-[state=open]:ring-primary/20 transition-all"
                >
                  <AccordionTrigger className="text-left text-lg font-bold text-secondary hover:text-primary transition-colors py-6 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-6 text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Video Side */}
          <div className="w-full lg:w-1/2">
            <Dialog.Root
              open={isVideoModalOpen}
              onOpenChange={setIsVideoModalOpen}
            >
              <Dialog.Trigger asChild>
                <div className="relative h-[350px] md:h-[500px] lg:h-full min-h-[400px] rounded-3xl overflow-hidden group/video cursor-pointer shadow-2xl">
                  <Image
                    src={data.videoThumbnail}
                    alt="Subscription Benefits Video"
                    fill
                    className="object-cover transition-transform duration-700 group-hover/video:scale-105"
                  />
                  <div className="absolute inset-0 bg-secondary/20 group-hover/video:bg-secondary/40 transition-colors duration-300" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center relative shadow-lg group-hover/video:scale-110 transition-transform duration-300">
                      <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Decorative Label */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                    <h4 className="font-bold text-lg mb-1">
                      {data.videoLabel}
                    </h4>
                    <p className="text-white/70 text-sm">
                      {data.videoDescription}
                    </p>
                  </div>
                </div>
              </Dialog.Trigger>

              <AnimatePresence>
                {isVideoModalOpen && (
                  <Dialog.Portal forceMount>
                    <Dialog.Overlay asChild>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
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
                        className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl outline-none"
                      >
                        <Dialog.Close asChild>
                          <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-10 outline-none">
                            <X className="w-6 h-6" />
                          </button>
                        </Dialog.Close>
                        <iframe
                          width="100%"
                          height="100%"
                          src={getEmbedUrl(data.videoUrl)}
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
        </div>
      </div>

      <AdminOnly>
        <SubscriptionFAQModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={data}
          onUpdate={(newData: SubscriptionFAQFormData) => setData(newData)}
        />
      </AdminOnly>
    </section>
  );
}
