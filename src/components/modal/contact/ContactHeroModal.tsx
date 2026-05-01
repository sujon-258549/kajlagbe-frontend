"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import MediaLibraryImageUploader from "@/components/common/MediaLibraryImageUploader";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  contactHeroSchema,
  ContactHeroFormData,
} from "@/schemas/contact/hero.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ContactHeroModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  image: string;
  bgImage?: string;
  onUpdate?: (data: ContactHeroFormData) => any;
  isLoading?: boolean;
}

const ContactHeroModal: React.FC<ContactHeroModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  image,
  bgImage,
  onUpdate,
  isLoading = false,
}) => {
  const form = useForm<ContactHeroFormData>({
    resolver: zodResolver(contactHeroSchema),
    defaultValues: {
      title: title,
      subtitle: subtitle || "",
      image: image,
      bgImage: bgImage || "",
    },
  });

  useEffect(() => {
    form.reset({
      title: title,
      subtitle: subtitle || "",
      image: image,
      bgImage: bgImage || "",
    });
  }, [title, subtitle, image, bgImage, form, isOpen]);

  const onSubmit = async (data: ContactHeroFormData) => {
    if (onUpdate) {
      const success = await onUpdate(data);
      if (success === true) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Contact Hero"
      description="Update your contact page hero content instantly."
      showBackground={true}
      maxWidth="2xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="contact-hero-form"
            disabled={isLoading}
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            {isLoading ? "Updating..." : "Update Hero"}
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="contact-hero-form"
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
                      <MediaLibraryImageUploader 
                        value={field.value} 
                        onChange={field.onChange} 
                      />
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
                      <MediaLibraryImageUploader 
                        value={field.value} 
                        onChange={field.onChange} 
                      />
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

export default ContactHeroModal;
