"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import MediaLibraryImageUploader from "@/components/common/MediaLibraryImageUploader";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  blogShowcaseItemSchema,
  BlogShowcaseItem,
} from "@/schemas/blog/showcase.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface BlogShowcaseItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: BlogShowcaseItem;
  onSave: (data: BlogShowcaseItem) => void;
  onDelete?: () => void;
  isLoading?: boolean;
}

const BlogShowcaseItemModal: React.FC<BlogShowcaseItemModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
  onDelete,
  isLoading = false,
}) => {
  const form = useForm<BlogShowcaseItem>({
    resolver: zodResolver(blogShowcaseItemSchema),
    defaultValues: {
      number: "01",
      title: "",
      description: "",
      image: "",
      imageId: "",
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        id: item.id,
        number: item.number || "",
        title: item.title || "",
        description: item.description || "",
        image: item.image || "",
        imageId: item.imageId || "",
      });
    } else {
      form.reset({
        number: "",
        title: "",
        description: "",
        image: "",
        imageId: "",
      });
    }
  }, [item, form, isOpen]);

  const handleSubmit = (data: BlogShowcaseItem) => {
    onSave(data);
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? "Edit Gallery Item" : "Add Gallery Item"}
      description="Update the gallery item details."
      showBackground={true}
      maxWidth="xl"
      footer={
        <div className="flex justify-between w-full">
          <div>
            {item && onDelete && (
              <Button
                type="button"
                variant="destructive"
                disabled={isLoading}
                onClick={() => {
                  if (confirm("Are you sure you want to delete this item?")) {
                    onDelete();
                  }
                }}
              >
                Delete Item
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="showcase-item-form"
              disabled={isLoading}
              className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
            >
              {isLoading ? "Saving..." : item ? "Update Item" : "Add Item"}
            </Button>
          </div>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="showcase-item-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number Badge</FormLabel>
                  <FormControl>
                    <FormInput placeholder="01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="w-full min-h-[80px] p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-sm outline-none"
                    placeholder="Brief description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
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
        </form>
      </Form>
    </CommonModal>
  );
};

export default BlogShowcaseItemModal;
