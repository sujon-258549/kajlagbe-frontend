"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Heading2 from "@/components/common/Headings/Heading2";
import { Edit } from "lucide-react";
import AdminOnly from "@/components/common/auth/AdminOnly";
import AboutFAQModal from "@/components/modal/about/AboutFAQModal";
import { AboutFAQFormData } from "@/schemas/about/faq.schema";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";

export default function AboutFAQ() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [, setIsLoading] = useState(true);
  const [, setIsUpdating] = useState(false);
  const [data, setData] = useState<AboutFAQFormData>({
    badge: "LEARN MORE",
    title: "Learn more about our food, our process & our promise",
    description:
      "We believe in transparency. Here are some common questions about our farm and products.",
    image: "https://placehold.co/600x800/154d2e/FFFFFF/png?text=Our+Process",
    items: [
      {
        question: "Is your food 100% organic?",
        answer:
          "Yes, we are fully certified organic. We follow strict farming guidelines to ensure no synthetic pesticides or fertilizers are used.",
      },
      {
        question: "Where do you deliver?",
        answer:
          "We currently deliver to all major metropolitan areas. Check our delivery page for specific zip codes.",
      },
      {
        question: "How fresh is the produce?",
        answer:
          "Our produce is harvested daily and typically delivered within 24-48 hours of leaving the field.",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSettingsMap("about");
      if (res.success && res.data.about_faq) {
        setData(res.data.about_faq.value);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleUpdate = async (newData: AboutFAQFormData) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "about_faq",
        value: newData,
        group: "about",
        description: "About Page FAQ Section Settings",
      });
      if (res.success) {
        setData(newData);
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="py-6 md:py-8 lg:py-12 bg-slate-50 overflow-hidden relative group/section">
      <div className="main-container mx-auto px-4 relative">
        {/* Edit Button */}
        <AdminOnly>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-0 right-8 w-10 h-10 flex items-center justify-center rounded-full text-white bg-white/10 border border-secondary/20 opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white z-50"
            title="Edit Section"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
            <div className="space-y-4">
              <span className="text-[#86b86b] font-bold text-sm tracking-uppercase block">
                {data.badge}
              </span>
              <Heading2 className="text-secondary leading-tight">
                {data.title}
              </Heading2>
              <p className="text-slate-600">{data.description}</p>
            </div>

            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="w-full"
            >
              {data.items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-secondary font-bold text-base md:text-lg text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="w-full lg:w-1/2 relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-secondary/20 z-10" />
            <Image
              src={data.image}
              alt="FAQ Image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <AdminOnly>
        <AboutFAQModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={data}
          onUpdate={handleUpdate}
        />
      </AdminOnly>
    </section>
  );
}
