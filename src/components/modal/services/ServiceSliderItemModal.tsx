"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import MediaLibraryImageUploader from "@/components/common/MediaLibraryImageUploader";
import RichTextEditor from "@/components/common/RichTextEditor";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  serviceSliderItemSchema,
  ServiceSliderItem,
} from "@/schemas/services/slider.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ServiceSliderItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: ServiceSliderItem;
  onSave: (data: ServiceSliderItem) => any;
  onDelete?: () => void;
  isLoading?: boolean;
}

const ServiceSliderItemModal: React.FC<ServiceSliderItemModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
  onDelete,
  isLoading = false,
}) => {
  const form = useForm<ServiceSliderItem>({
    resolver: zodResolver(serviceSliderItemSchema),
    defaultValues: {
      id: 0,
      category: "",
      title: "",
      slug: "",
      description: "",
      content: "",
      image: "",
      imageId: "",
      number: "01",
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        ...item,
        imageId: item.imageId || "",
      });
    } else {
      form.reset({
        id: Date.now(),
        category: "",
        title: "",
        slug: "",
        description: "",
        content: "",
        image: "",
        imageId: "",
        number: "",
      });
    }
  }, [item, form, isOpen]);

  const handleSubmit = async (data: ServiceSliderItem) => {
    const success = await onSave(data);
    if (success === true) {
      onClose();
    }
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? "Edit Project" : "Add New Project"}
      description="Update project details for the slider."
      showBackground={true}
      maxWidth="4xl"
      footer={
        <div className="flex justify-between w-full">
          <div>
            {item && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  if (
                    confirm("Are you sure you want to delete this project?")
                  ) {
                    onDelete();
                    onClose();
                  }
                }}
              >
                Delete Project
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              form="slider-item-form"
              className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
              disabled={isLoading}
            >
              {isLoading
                ? item
                  ? "Updating..."
                  : "Adding..."
                : item
                  ? "Update Project"
                  : "Add Project"}
            </Button>
          </div>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="slider-item-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Image</FormLabel>
                <FormControl>
                  <MediaLibraryImageUploader
                    value={field.value}
                    onChange={(url, id) => {
                      field.onChange(url);
                      // Only set imageId if the field exists in the form
                      if (id && "imageId" in form.getValues()) {
                        (form as any).setValue("imageId", id);
                      }
                    }}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <FormInput placeholder="e.g. Eco Friendly" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Project Title" {...field} />
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
                  <FormLabel>Slug (Optional)</FormLabel>
                  <FormControl>
                    <FormInput placeholder="project-slug" {...field} />
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
                <FormLabel>Short Overview / Tagline</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="w-full min-h-[80px] p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-sm outline-none"
                    placeholder="Brief overview..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Content / Case Study</FormLabel>
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
        </form>
      </Form>
    </CommonModal>
  );
};

export default ServiceSliderItemModal;
