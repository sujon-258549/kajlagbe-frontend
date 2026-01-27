import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function AboutFAQ() {
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="main-container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="text-[#86b86b] font-bold text-sm tracking-uppercase block">
              LEARN MORE
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#154d2e]">
              Learn more about our food, our process & our promise
            </h2>
            <p className="text-slate-600 mb-8">
              We believe in transparency. Here are some common questions about
              our farm and products.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-[#154d2e] font-bold text-lg">
                  Is your food 100% organic?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Yes, we are fully certified organic. We follow strict farming
                  guidelines to ensure no synthetic pesticides or fertilizers
                  are used.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-[#154d2e] font-bold text-lg">
                  Where do you deliver?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  We currently deliver to all major metropolitan areas. Check
                  our delivery page for specific zip codes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-[#154d2e] font-bold text-lg">
                  How fresh is the produce?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Our produce is harvested daily and typically delivered within
                  24-48 hours of leaving the field.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="w-full lg:w-1/2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            {/* Using a placeholder or appropriate image */}
            <div className="absolute inset-0 bg-[#154d2e]/20 z-10" />
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
