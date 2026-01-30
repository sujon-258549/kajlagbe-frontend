"use client";

import CommonHero from "@/components/common/CommonHero";
import SubscriptionPricing from "@/components/subscription/SubscriptionPricing";
import SubscriptionBenefits from "@/components/subscription/SubscriptionBenefits";
import SubscriptionFAQ from "@/components/subscription/SubscriptionFAQ";
import SubscriptionTestimonials from "@/components/subscription/SubscriptionTestimonials";
import SubscriptionCTA from "@/components/subscription/SubscriptionCTA";
import SubscriptionHeroModal from "@/components/modal/subscription/SubscriptionHeroModal";

export default function SubscriptionPage() {
  return (
    <main className="min-h-screen bg-white">
      <CommonHero
        title="Choose Your Plan"
        breadcrumb="Subscription"
        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
        ModalComponent={SubscriptionHeroModal}
      />

      <SubscriptionPricing />
      <SubscriptionBenefits />
      <SubscriptionTestimonials />
      <SubscriptionFAQ />
      <SubscriptionCTA />
    </main>
  );
}
