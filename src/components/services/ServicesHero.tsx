"use client";

import React, { useState } from "react";
import CommonHero from "@/components/common/CommonHero";
import ServicesHeroModal from "@/components/modal/services/ServicesHeroModal";
import { ServicesHeroFormData } from "@/schemas/services/hero.schema";

export default function ServicesHero() {
  const [data, setData] = useState<ServicesHeroFormData>({
    title: "Our Services",
    subtitle: "Services",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
    bgImage: "",
  });

  return (
    <CommonHero
      title={data.title}
      breadcrumb={data.subtitle || "Services"}
      image={data.image}
      bgImage={data.bgImage}
      ModalComponent={ServicesHeroModal}
      onUpdate={(newData: ServicesHeroFormData) => setData(newData)}
    />
  );
}
