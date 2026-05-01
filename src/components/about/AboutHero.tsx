"use client";

import { useEffect, useState } from "react";
import CommonHero from "@/components/common/CommonHero";
import AboutHeroModal from "@/components/modal/about/AboutHeroModal";
import { AboutHeroFormData } from "@/schemas/about/hero.schema";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";

export default function AboutHero() {
  const [, setIsLoading] = useState(true);
  const [, setIsUpdating] = useState(false);
  const [data, setData] = useState<AboutHeroFormData>({
    title: "About Us",
    subtitle: "",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
    bgImage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSettingsMap("about");
      if (res.success && res.data.about_hero) {
        setData(res.data.about_hero.value);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleUpdate = async (newData: AboutHeroFormData) => {
    setIsUpdating(true);
    try {
      const merged = { ...data, ...newData };
      const res = await upsertSetting({
        key: "about_hero",
        value: merged,
        group: "about",
        description: "About Page Hero Section Settings",
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

  return (
    <CommonHero
      title={data.title}
      subtitle={data.subtitle}
      breadcrumb="About Us"
      image={data.image}
      imageId={data.imageId}
      bgImage={data.bgImage}
      bgImageId={data.bgImageId}
      ModalComponent={AboutHeroModal}
      onUpdate={handleUpdate}
    />
  );
}
