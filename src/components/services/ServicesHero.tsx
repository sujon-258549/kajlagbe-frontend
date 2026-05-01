"use client";

import React, { useState, useEffect } from "react";
import CommonHero from "@/components/common/CommonHero";
import ServicesHeroModal from "@/components/modal/services/ServicesHeroModal";
import { ServicesHeroFormData } from "@/schemas/services/hero.schema";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";
import { toast } from "react-toastify";

export default function ServicesHero() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState<ServicesHeroFormData>({
    title: "Our Services",
    subtitle: "Services",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
    imageId: "",
    bgImage: "",
    bgImageId: "",
  });

  useEffect(() => {
    const fetchHero = async () => {
      const res = await getSettingsMap("services");
      if (res.success && res.data.services_hero) {
        setData(res.data.services_hero.value);
      }
    };
    fetchHero();
  }, []);

  const handleUpdate = async (newData: ServicesHeroFormData) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "services_hero",
        value: newData,
        group: "services",
        description: "Services Page Hero Section",
      });
      if (res.success) {
        setData(newData);
        toast.success("Hero updated successfully!");
        return true;
      } else {
        toast.error(res.message || "Failed to update hero.");
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <CommonHero
      title={data.title}
      subtitle={data.subtitle}
      image={data.image}
      imageId={data.imageId}
      bgImage={data.bgImage}
      bgImageId={data.bgImageId}
      ModalComponent={ServicesHeroModal}
      onUpdate={handleUpdate}
      isLoading={isUpdating}
    />
  );
}
