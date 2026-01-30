"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SubscriptionFAQ() {
  const faqs = [
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
  ];

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-secondary">
      <div className="main-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-white/70">
              Have questions? We&apos;re here to help.
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="w-full space-y-4"
          >
            {faqs.map((faq, index) => (
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
      </div>
    </section>
  );
}
