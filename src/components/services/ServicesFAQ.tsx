import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Heading2 from "@/components/common/Headings/Heading2";

const faqs = [
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
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="main-container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border-2 border-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1974&auto=format&fit=crop"
              alt="Farming FAQ"
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-secondary/10 mix-blend-multiply" />
          </div>

          {/* FAQ Content */}
          <div className="w-full lg:w-1/2">
            <div className="text-left mb-10">
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
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border border-secondary/10 rounded-xl px-6 bg-white data-[state=open]:border-primary/30 transition-all duration-300"
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
    </section>
  );
}
