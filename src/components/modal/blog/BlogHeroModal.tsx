"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { blogHeroSchema, BlogHeroFormData } from "@/schemas/blog/hero.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface BlogHeroModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  image: string;
  bgImage?: string;
  onUpdate?: (data: BlogHeroFormData) => void;
}

const BlogHeroModal: React.FC<BlogHeroModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  image,
  bgImage,
  onUpdate,
}) => {
  const form = useForm<BlogHeroFormData>({
    resolver: zodResolver(blogHeroSchema),
    defaultValues: {
      title: title,
      subtitle: subtitle || "",
      image: image,
      bgImage: bgImage || "",
    },
  });

  // Effect to update form values when props change
  useEffect(() => {
    form.reset({
      title: title,
      subtitle: subtitle || "",
      image: image,
      bgImage: bgImage || "",
    });
  }, [title, subtitle, image, bgImage, form, isOpen]);

  const onSubmit = (data: BlogHeroFormData) => {
    if (onUpdate) {
      onUpdate(data);
    }
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Blog Hero"
      description="Update your blog page hero content instantly."
      showBackground={true}
      maxWidth="2xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="blog-hero-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update Hero
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="blog-hero-form"
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

export default BlogHeroModal;
