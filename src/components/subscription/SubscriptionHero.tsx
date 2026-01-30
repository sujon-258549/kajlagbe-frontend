"use client";

import React, { useState } from "react";
import CommonHero from "@/components/common/CommonHero";
import SubscriptionHeroModal from "@/components/modal/subscription/SubscriptionHeroModal";
import { SubscriptionHeroFormData } from "@/schemas/subscription/hero.schema";

export default function SubscriptionHero() {
  const [data, setData] = useState<SubscriptionHeroFormData>({
    title: "Choose Your Plan",
    subtitle: "Subscription",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    bgImage: "",
  });

  return (
    <CommonHero
      title={data.title}
      breadcrumb={data.subtitle || "Subscription"}
      image={data.image}
      bgImage={data.bgImage}
      ModalComponent={SubscriptionHeroModal}
      onUpdate={(newData: SubscriptionHeroFormData) => setData(newData)}
    />
  );
}
