"use client";

import SubscriptionHero from "@/components/subscription/SubscriptionHero";
import SubscriptionPricing from "@/components/subscription/SubscriptionPricing";
import SubscriptionBenefits from "@/components/subscription/SubscriptionBenefits";
import SubscriptionFAQ from "@/components/subscription/SubscriptionFAQ";
import SubscriptionTestimonials from "@/components/subscription/SubscriptionTestimonials";
import SubscriptionCTA from "@/components/subscription/SubscriptionCTA";

export default function SubscriptionPage() {
  return (
    <main className="min-h-screen bg-white">
      <SubscriptionHero />

      <SubscriptionPricing />
      <SubscriptionBenefits />
      <SubscriptionTestimonials />
      <SubscriptionFAQ />
      <SubscriptionCTA />
    </main>
  );
}
