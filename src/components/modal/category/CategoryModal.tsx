"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import MediaLibraryImageUploader from "@/components/common/MediaLibraryImageUploader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { categorySchema, CategoryFormData } from "@/schemas/category.schema";
import { createCategory, updateCategory } from "@/actions/category.actions";
import { TCategory } from "@/types/category";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: TCategory | null;
  onSuccess: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      url: "",
      imageId: "",
      status: true,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset({
          name: initialData.name,
          url: initialData.url || "",
          imageId: initialData.imageId || "",
          status: initialData.status,
        });
      } else {
        form.reset({
          name: "",
          url: "",
          imageId: "",
          status: true,
        });
      }
    }
  }, [isOpen, initialData, form]);

  const onSubmit = async (data: CategoryFormData) => {
    setIsLoading(true);
    try {
      let res;
      if (initialData?.id) {
        res = await updateCategory(initialData.id, data);
      } else {
        res = await createCategory(data);
      }

      if (res.success) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Category" : "Add New Category"}
      description="Fill in the details to manage the category."
      maxWidth="lg"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <FormInput placeholder="e.g. T-Shirt Printing" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
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

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-secondary text-white px-8"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : (initialData ? "Update Category" : "Create Category")}
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default CategoryModal;
