"use client";

import React, { useState, useEffect } from "react";
import CommonHero from "@/components/common/CommonHero";
import ContactHeroModal from "@/components/modal/contact/ContactHeroModal";
import { ContactHeroFormData } from "@/schemas/contact/hero.schema";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";
import { toast } from "react-toastify";

export default function ContactHero() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState<ContactHeroFormData>({
    title: "Contact Us",
    subtitle: "Contact",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
    bgImage: "",
  });

  useEffect(() => {
    const fetchHero = async () => {
      const res = await getSettingsMap("contact");
      if (res.success && res.data.contact_hero) {
        setData(res.data.contact_hero.value);
      }
    };
    fetchHero();
  }, []);

  const handleUpdate = async (newData: ContactHeroFormData) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "contact_hero",
        value: newData,
        group: "contact",
        description: "Contact Page Hero Section",
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
      bgImage={data.bgImage}
      ModalComponent={ContactHeroModal}
      onUpdate={handleUpdate}
      isLoading={isUpdating}
    />
  );
}
