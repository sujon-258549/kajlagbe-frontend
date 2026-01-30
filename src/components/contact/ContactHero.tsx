"use client";

import React, { useState } from "react";
import CommonHero from "@/components/common/CommonHero";
import ContactHeroModal from "@/components/modal/contact/ContactHeroModal";
import { ContactHeroFormData } from "@/schemas/contact/hero.schema";

export default function ContactHero() {
  const [data, setData] = useState<ContactHeroFormData>({
    title: "Contact Us",
    subtitle: "Contact",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
    bgImage: "",
  });

  return (
    <CommonHero
      title={data.title}
      breadcrumb={data.subtitle || "Contact"}
      image={data.image}
      bgImage={data.bgImage}
      ModalComponent={ContactHeroModal}
      onUpdate={(newData: ContactHeroFormData) => setData(newData)}
    />
  );
}
