"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
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
import { aboutFAQSchema, AboutFAQFormData } from "@/schemas/about/faq.schema";

interface AboutFAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: AboutFAQFormData;
  onUpdate: (data: AboutFAQFormData) => void;
}

const AboutFAQModal: React.FC<AboutFAQModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<AboutFAQFormData>({
    resolver: zodResolver(aboutFAQSchema) as any,
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (data: AboutFAQFormData) => {
    console.log("About FAQ Updated Data:", data);
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Settings"
      description="Update FAQ and details section."
      showBackground={true}
      maxWidth="3xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="about-faq-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="about-faq-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-1"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="badge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Badge Text</FormLabel>
                  <FormControl>
                    <FormInput placeholder="e.g. LEARN MORE" {...field} />
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
                  <FormLabel>Main Title</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className="w-full min-h-[80px] p-3 rounded-md border border-slate-200 focus:outline-none focus:border-secondary"
                        placeholder="Short description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sidebar Image</FormLabel>
                <FormControl>
                  <ImageUpload isSingle={true} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">
              FAQ Questions
            </h3>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 rounded-lg border border-slate-200 bg-white relative group"
                >
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name={`items.${index}.question`}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-semibold text-slate-500">
                            Question
                          </FormLabel>
                          <FormControl>
                            <FormInput
                              size="sm"
                              placeholder="e.g. Is your food organic?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.answer`}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-semibold text-slate-500">
                            Answer
                          </FormLabel>
                          <FormControl>
                            <textarea
                              {...field}
                              className="w-full min-h-[60px] p-2 rounded border border-slate-200 text-sm focus:border-secondary outline-none"
                              placeholder="Enter the answer here..."
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="h-6 w-6 text-red-500 hover:bg-red-50"
                      title="Remove item"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed border"
              onClick={() => append({ question: "", answer: "" })}
            >
              <Plus className="w-4 h-4" />
              Add New Question
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default AboutFAQModal;
