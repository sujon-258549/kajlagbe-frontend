"use client";

import React from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  servicesHeroSchema,
  ServicesHeroFormData,
} from "@/schemas/services/hero.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ServicesHeroModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  image: string;
  bgImage?: string;
}

const ServicesHeroModal: React.FC<ServicesHeroModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  image,
  bgImage,
}) => {
  const form = useForm<ServicesHeroFormData>({
    resolver: zodResolver(servicesHeroSchema),
    defaultValues: {
      title: title,
      subtitle: subtitle || "",
      image: image,
      bgImage: bgImage || "",
    },
  });

  const onSubmit = (data: ServicesHeroFormData) => {
    console.log("Services Hero Updated Data:", data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Services Hero"
      description="Update your services page hero content instantly."
      showBackground={true}
      maxWidth="2xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="services-hero-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update Hero
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="services-hero-form"
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
                    <FormInput placeholder="Enter hero title" {...field} />
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
                    <FormInput placeholder="Enter subtitle" {...field} />
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
                      <ImageUpload {...field} />
                    </FormControl>
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
                      <ImageUpload {...field} />
                    </FormControl>
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

export default ServicesHeroModal;
