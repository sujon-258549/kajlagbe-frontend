"use client";

import React, { useState } from "react";
import CommonHero from "@/components/common/CommonHero";
import BlogHeroModal from "@/components/modal/blog/BlogHeroModal";
import { BlogHeroFormData } from "@/schemas/blog/hero.schema";

export default function BlogHero() {
  const [data, setData] = useState<BlogHeroFormData>({
    title: "Blog Grid",
    breadcrumb: "Blog Grid",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2664&auto=format&fit=crop",
    bgImage: "",
  });

  return (
    <CommonHero
      title={data.title}
      breadcrumb={data.breadcrumb}
      image={data.image}
      bgImage={data.bgImage}
      ModalComponent={BlogHeroModal}
      onUpdate={(newData: BlogHeroFormData) => setData(newData)}
    />
  );
}
