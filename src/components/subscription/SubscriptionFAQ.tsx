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
    <section className="py-20 bg-white">
      <div className="main-container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Have questions? We,re here to help.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold text-secondary hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
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
