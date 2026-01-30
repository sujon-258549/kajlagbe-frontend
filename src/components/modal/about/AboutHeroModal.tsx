"use client";

import React from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";

interface AboutHeroModalProps {
  isOpen: boolean;
  onClose: () => void;
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
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold">
            Update Hero
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <FormInput
            label="Hero Title"
            defaultValue={title}
            placeholder="Enter hero title"
          />
          <FormInput
            label="Hero Subtitle"
            defaultValue={subtitle}
            placeholder="Enter hero subtitle (optional)"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ImageUpload
                label="Main Hero Image"
                className="bg-slate-50 border-slate-200"
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
              />
              {bgImage && (
                <div className="mt-2 text-[10px] text-slate-400 truncate">
                  Current: {bgImage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

export default AboutHeroModal;
