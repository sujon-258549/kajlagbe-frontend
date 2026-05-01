"use client";

import React, { useEffect, useState } from "react";
import CommonHero from "@/components/common/CommonHero";
import BlogHeroModal from "@/components/modal/blog/BlogHeroModal";
import { BlogHeroFormData } from "@/schemas/blog/hero.schema";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";

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
  const [, setIsLoading] = useState(true);
  const [, setIsUpdating] = useState(false);
  const [data, setData] = useState<BlogHeroFormData>({
    title: propTitle || "Blog Grid",
    subtitle: "",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2664&auto=format&fit=crop",
    imageId: "",
    bgImage: "",
    bgImageId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSettingsMap("blog");
      if (res.success && res.data?.blog_hero) {
        setData((prev) => ({ ...prev, ...res.data.blog_hero.value }));
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleUpdate = async (newData: BlogHeroFormData) => {
    setIsUpdating(true);
    try {
      const merged = { ...data, ...newData };
      const res = await upsertSetting({
        key: "blog_hero",
        value: merged,
        group: "blog",
        description: "Blog Page Hero Section Settings",
      });
      if (res.success) {
        setData(merged);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const computedSubtitle = isDetails
    ? `${category} • ${date}`
    : data.subtitle || undefined;

  return (
    <CommonHero
      title={propTitle || data.title}
      subtitle={computedSubtitle}
      breadcrumb={propTitle || data.title}
      image={data.image}
      imageId={data.imageId}
      bgImage={data.bgImage}
      bgImageId={data.bgImageId}
      ModalComponent={BlogHeroModal}
      onUpdate={handleUpdate}
    />
  );
}
