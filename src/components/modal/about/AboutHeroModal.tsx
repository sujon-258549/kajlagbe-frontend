"use client";

import React from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

interface AboutHeroModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  image: string;
  bgImage?: string;
}

interface HeroFormData {
  title: string;
  subtitle?: string;
  image: string;
  bgImage?: string;
}

const AboutHeroModal: React.FC<AboutHeroModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  image,
  bgImage,
}) => {
  const { register, handleSubmit } = useForm<HeroFormData>({
    defaultValues: {
      title: title,
      subtitle: subtitle,
      image: image,
      bgImage: bgImage,
    },
  });

  const onSubmit = (data: HeroFormData) => {
    console.log("Hero Section Updated Data:", data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit About Hero"
      description="Update your about page hero content and images instantly."
      showBackground={true}
      maxWidth="2xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="hero-edit-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update Hero
          </Button>
        </div>
      }
    >
      <form
        id="hero-edit-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6">
          <FormInput
            label="Hero Title"
            placeholder="Enter hero title"
            {...register("title")}
          />
          <FormInput
            label="Hero Subtitle"
            placeholder="Enter hero subtitle (optional)"
            {...register("subtitle")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ImageUpload
                label="Main Hero Image"
                className="bg-slate-50 border-slate-200"
                register={register("image")}
              />
              {image && (
                <div className="mt-2 text-[10px] text-slate-400 truncate">
                  Current: {image}
                </div>
              )}
            </div>

            <div>
              <ImageUpload
                label="Background Image"
                className="bg-slate-50 border-slate-200"
                register={register("bgImage")}
              />
              {bgImage && (
                <div className="mt-2 text-[10px] text-slate-400 truncate">
                  Current: {bgImage}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </CommonModal>
  );
};

export default AboutHeroModal;
