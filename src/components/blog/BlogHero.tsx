"use client";

import React, { useState } from "react";
import CommonHero from "@/components/common/CommonHero";
import BlogHeroModal from "@/components/modal/blog/BlogHeroModal";
import { BlogHeroFormData } from "@/schemas/blog/hero.schema";

interface BlogHeroProps {
  title?: string;
  date?: string;
  category?: string;
  isDetails?: boolean;
}

export default function BlogHero({
  title: propTitle,
  date,
  category,
  isDetails,
}: BlogHeroProps) {
  const [data, setData] = useState<BlogHeroFormData>({
    title: propTitle || "Blog Grid",
    breadcrumb: propTitle || "Blog Grid",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2664&auto=format&fit=crop",
    bgImage: "",
  });

  return (
    <CommonHero
      title={data.title}
      subtitle={isDetails ? `${category} • ${date}` : undefined}
      breadcrumb={data.breadcrumb}
      image={data.image}
      bgImage={data.bgImage}
      ModalComponent={BlogHeroModal}
      onUpdate={(newData: BlogHeroFormData) => setData(newData)}
    />
  );
}
