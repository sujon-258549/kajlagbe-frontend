"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import MediaLibraryImageUploader from "@/components/common/MediaLibraryImageUploader";
import RichTextEditor from "@/components/common/RichTextEditor";
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
  blogPostSchema,
  BlogPostFormData,
} from "@/schemas/blog/post.schema";

interface HomeBlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: BlogPostFormData;
  onUpdate: (data: BlogPostFormData) => void;
  onDelete?: () => void;
  isNew?: boolean;
  isLoading?: boolean;
}

const HomeBlogPostModal: React.FC<HomeBlogPostModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
  onDelete,
  isNew = false,
  isLoading = false,
}) => {
  const form = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      category: "",
      authorName: "Admin",
      tags: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(
        initialData || {
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          image: "",
          imageId: "",
          category: "",
          authorName: "Admin",
          tags: "",
        },
      );
    }
  }, [isOpen, initialData, form]);

  const onSubmit = (data: BlogPostFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={isNew ? "Add New Blog Post" : "Edit Blog Post"}
      description="Fill in the details for the blog post."
      maxWidth="4xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 p-4 rounded-md bg-slate-50/50">
            <FormField
              control={form.control as any}
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
              control={form.control as any}
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
              control={form.control as any}
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
              control={form.control as any}
              name="image"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel>Blog Image</FormLabel>
                  <FormControl>
                    <MediaLibraryImageUploader
                      value={field.value}
                      onChange={(url, id) => {
                        field.onChange(url);
                        if (id) form.setValue("imageId", id);
                      }}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control as any}
              name="excerpt"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Excerpt (Summary)</FormLabel>
                  <FormControl>
                    <FormInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control as any}
              name="authorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Name</FormLabel>
                  <FormControl>
                    <FormInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control as any}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma separated)</FormLabel>
                  <FormControl>
                    <FormInput placeholder="plastic, eco, nature" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control as any}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Blog Content</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
              <Button 
                type="submit" 
                className="bg-secondary text-white px-8"
                disabled={isLoading}
              >
                {isLoading ? (isNew ? "Adding..." : "Saving...") : (isNew ? "Add Post" : "Save Changes")}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default HomeBlogPostModal;
