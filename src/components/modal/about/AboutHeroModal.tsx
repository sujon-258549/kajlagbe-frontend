"use client";

import React from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  aboutHeroSchema,
  AboutHeroFormData,
} from "@/schemas/about/hero.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AboutHeroModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  image: string;
  bgImage?: string;
  onUpdate?: (data: AboutHeroFormData) => void;
}

const AboutHeroModal: React.FC<AboutHeroModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  image,
  bgImage,
  onUpdate,
}) => {
  const form = useForm<AboutHeroFormData>({
    resolver: zodResolver(aboutHeroSchema) as any,
    defaultValues: {
      title: title,
      subtitle: subtitle || "",
      image: image,
      bgImage: bgImage || "",
    },
  });
  const onSubmit = (data: AboutHeroFormData) => {
    console.log("Hero Section Updated Data (Validated):", data);
    if (onUpdate) {
      onUpdate(data);
    }
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
      <Form {...form}>
        <form
          id="hero-edit-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Title</FormLabel>
                  <FormControl>
                    <FormInput
                      placeholder="Enter hero title"
                      error={form.formState.errors.title}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Subtitle</FormLabel>
                  <FormControl>
                    <FormInput
                      placeholder="Enter hero subtitle (optional)"
                      error={form.formState.errors.subtitle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Hero Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        className="bg-slate-50 border-slate-200"
                        error={form.formState.errors.image}
                        {...field}
                      />
                    </FormControl>
                    {image && (
                      <div className="mt-2 text-[10px] text-slate-400 truncate">
                        Current: {image}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bgImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        className="bg-slate-50 border-slate-200"
                        error={form.formState.errors.bgImage}
                        {...field}
                      />
                    </FormControl>
                    {bgImage && (
                      <div className="mt-2 text-[10px] text-slate-400 truncate">
                        Current: {bgImage}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default AboutHeroModal;
