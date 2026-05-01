"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import FormTextarea from "@/components/common/FormTextarea";
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
import { subCategorySchema, SubCategoryFormData } from "@/schemas/category.schema";
import { createSubCategory, updateSubCategory } from "@/actions/subCategory.actions";
import { TSubCategory } from "@/types/subCategory";
import { TCategory } from "@/types/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: TSubCategory | null;
  categories: TCategory[];
  onSuccess: () => void;
}

const SubCategoryModal: React.FC<SubCategoryModalProps> = ({
  isOpen,
  onClose,
  initialData,
  categories,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SubCategoryFormData>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
      categoryId: "",
      description: "",
      icon: "",
      image: "",
      imageId: "",
      status: true,
    },
  });

  const nameValue = form.watch("name");

  useEffect(() => {
    if (!initialData && nameValue) {
      const slug = nameValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      form.setValue("slug", slug);
    }
  }, [nameValue, initialData, form]);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset({
          name: initialData.name,
          slug: initialData.slug,
          categoryId: initialData.categoryId,
          description: initialData.description || "",
          icon: initialData.icon || "",
          image: initialData.image || "",
          imageId: initialData.imageId || "",
          status: initialData.status,
        });
      } else {
        form.reset({
          name: "",
          slug: "",
          categoryId: categories[0]?.id || "",
          description: "",
          icon: "",
          image: "",
          imageId: "",
          status: true,
        });
      }
    }
  }, [isOpen, initialData, form, categories]);

  const onSubmit = async (data: SubCategoryFormData) => {
    setIsLoading(true);
    try {
      // Remove UI-only 'image' field before sending to API
      const { image, ...payload } = data;

      console.log("SubCategory Payload:", payload);
      
      let res;
      if (initialData?.id) {
        res = await updateSubCategory(initialData.id, payload);
      } else {
        res = await createSubCategory(payload);
      }

      console.log("SubCategory Action Result:", res);

      if (res.success) {
        onSuccess();
        onClose();
      } else {
        alert(res.message || "Failed to save sub-category");
      }
    } catch (error) {
      console.error("Error saving sub-category:", error);
      alert("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Sub-Category" : "Add New Sub-Category"}
      description="Fill in the details to manage the sub-category."
      maxWidth="4xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control as any}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-Category Name</FormLabel>
                  <FormControl>
                    <FormInput placeholder="e.g. T-Shirt Printing" {...field} />
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
                    <FormInput placeholder="e.g. t-shirt-printing" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control as any}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <FormTextarea placeholder="Describe this sub-category..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon Name (FontAwesome)</FormLabel>
                <FormControl>
                  <FormInput placeholder="e.g. fa-solid fa-wrench" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image (Optional)</FormLabel>
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
              {isLoading ? "Saving..." : (initialData ? "Update" : "Create")}
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default SubCategoryModal;
