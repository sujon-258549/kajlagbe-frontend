"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  homeBlogItemSchema,
  HomeBlogItemFormData,
} from "@/schemas/home/blog.schema";

interface HomeBlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: HomeBlogItemFormData;
  onUpdate: (data: HomeBlogItemFormData) => void;
  onDelete?: () => void;
  isNew?: boolean;
}

const HomeBlogPostModal: React.FC<HomeBlogPostModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
  onDelete,
  isNew = false,
}) => {
  const form = useForm<HomeBlogItemFormData>({
    resolver: zodResolver(homeBlogItemSchema),
    defaultValues: initialData || {
      title: "",
      image: "",
      day: "",
      month: "",
      author: "Admin",
      category: "",
      slug: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(
        initialData || {
          title: "",
          image: "",
          day: "",
          month: "",
          author: "Admin",
          category: "",
          slug: "",
        },
      );
    }
  }, [isOpen, initialData, form]);

  const onSubmit = (data: HomeBlogItemFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={isNew ? "Add New Blog Post" : "Edit Blog Post"}
      description="Fill in the details for the blog post."
      maxWidth="3xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <FormInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <FormInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <FormInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel>Blog Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onValueChange={field.onChange}
                      className="aspect-square w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day</FormLabel>
                    <FormControl>
                      <FormInput placeholder="09" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Jan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <FormInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-between gap-3 pt-6 border-t">
            {onDelete && !isNew ? (
              <Button
                variant="destructive"
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                type="button"
              >
                Delete
              </Button>
            ) : (
              <div />
            )}
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button type="submit" className="bg-secondary text-white px-8">
                {isNew ? "Add Post" : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default HomeBlogPostModal;
