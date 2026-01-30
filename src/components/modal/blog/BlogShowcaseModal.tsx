"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/common/ImageUpload";
import {
  blogShowcaseSchema,
  BlogShowcaseFormData,
} from "@/schemas/blog/showcase.schema";

interface BlogShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: BlogShowcaseFormData;
  onUpdate: (data: BlogShowcaseFormData) => void;
}

const BlogShowcaseModal: React.FC<BlogShowcaseModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<BlogShowcaseFormData>({
    resolver: zodResolver(blogShowcaseSchema) as any,
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (data: BlogShowcaseFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Blog Showcase"
      description="Update your blog showcase items. These appear at the bottom of the blog page."
      showBackground={true}
      maxWidth="5xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="blog-showcase-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update Showcase
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="blog-showcase-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50 relative group"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="absolute -top-2 -right-2 h-8 w-8 text-red-500 bg-white rounded-full border border-red-100 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <X className="w-4 h-4" />
                </Button>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`items.${index}.number`}
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
                      name={`items.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Item Title</FormLabel>
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
                    name={`items.${index}.description`}
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
                    name={`items.${index}.image`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Showcase Image</FormLabel>
                        <FormControl>
                          <ImageUpload
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
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-14 border-dashed border-2 hover:bg-slate-50"
            onClick={() =>
              append({
                id: Date.now(),
                number: String(fields.length + 1).padStart(2, "0"),
                title: "",
                description: "",
                image: "",
              })
            }
          >
            <Plus className="w-5 h-5 mr-3" /> Add New Showcase Item
          </Button>
        </form>
      </Form>
    </CommonModal>
  );
};

export default BlogShowcaseModal;
