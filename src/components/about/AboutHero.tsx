"use client";

import React, { useState } from "react";
import CommonHero from "@/components/common/CommonHero";
import AboutHeroModal from "@/components/modal/about/AboutHeroModal";
import { AboutHeroFormData } from "@/schemas/about/hero.schema";

export default function AboutHero() {
  const [data, setData] = useState<AboutHeroFormData>({
    title: "About Us",
    subtitle: "",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
    bgImage: "", // Optional in schema?
  });

  return (
    <CommonHero
      title={data.title}
      subtitle={data.subtitle}
      breadcrumb="About Us"
      image={data.image}
      bgImage={data.bgImage}
      ModalComponent={AboutHeroModal}
      onUpdate={(newData) => setData((prev) => ({ ...prev, ...newData }))}
    />
  );
}
