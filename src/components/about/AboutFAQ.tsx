import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Heading2 from "@/components/common/Headings/Heading2";

export default function AboutFAQ() {
  return (
    <section className="py-10 md:py-16 lg:py-24 bg-slate-50 overflow-hidden">
      <div className="main-container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
            <div className="space-y-4">
              <span className="text-[#86b86b] font-bold text-sm tracking-uppercase block">
                LEARN MORE
              </span>
              <Heading2 className="text-secondary leading-tight">
                Learn more about our food, our process & our promise
              </Heading2>
              <p className="text-slate-600">
                We believe in transparency. Here are some common questions about
                our farm and products.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-secondary font-bold text-base md:text-lg text-left">
                  Is your food 100% organic?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Yes, we are fully certified organic. We follow strict farming
                  guidelines to ensure no synthetic pesticides or fertilizers
                  are used.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-secondary font-bold text-base md:text-lg text-left">
                  Where do you deliver?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  We currently deliver to all major metropolitan areas. Check
                  our delivery page for specific zip codes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-secondary font-bold text-base md:text-lg text-left">
                  How fresh is the produce?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Our produce is harvested daily and typically delivered within
                  24-48 hours of leaving the field.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="w-full lg:w-1/2 relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            {/* Using a placeholder or appropriate image */}
            <div className="absolute inset-0 bg-secondary/20 z-10" />
            <Image
              src="https://placehold.co/600x800/154d2e/FFFFFF/png?text=Our+Process"
              alt="FAQ Image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
