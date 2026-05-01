"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import MediaLibraryImageUploader from "@/components/common/MediaLibraryImageUploader";
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
  imageId?: string;
  bgImage?: string;
  bgImageId?: string;
  onUpdate?: (data: BlogHeroFormData) => void;
}

const BlogHeroModal: React.FC<BlogHeroModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  image,
  imageId,
  bgImage,
  bgImageId,
  onUpdate,
}) => {
  const form = useForm<BlogHeroFormData>({
    resolver: zodResolver(blogHeroSchema) as any,
    defaultValues: {
      title: title,
      subtitle: subtitle || "",
      image: image,
      imageId: imageId,
      bgImage: bgImage || "",
      bgImageId: bgImageId,
    },
  });

  useEffect(() => {
    form.reset({
      title: title,
      subtitle: subtitle || "",
      image: image,
      imageId: imageId,
      bgImage: bgImage || "",
      bgImageId: bgImageId,
    });
  }, [title, subtitle, image, imageId, bgImage, bgImageId, form, isOpen]);

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
                    <FormInput
                      placeholder="Enter hero subtitle (optional)"
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
                      <MediaLibraryImageUploader
                        value={field.value}
                        onChange={(url, id) => {
                          field.onChange(url);
                          if (id) form.setValue("imageId", id);
                        }}
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
                        onChange={(url, id) => {
                          field.onChange(url);
                          if (id) form.setValue("bgImageId", id);
                        }}
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

export default BlogHeroModal;
