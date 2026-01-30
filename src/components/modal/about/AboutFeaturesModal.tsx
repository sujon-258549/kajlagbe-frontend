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
import {
  aboutFeaturesSchema,
  AboutFeaturesFormData,
} from "@/schemas/about/features.schema";

interface AboutFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: AboutFeaturesFormData;
  onUpdate: (data: AboutFeaturesFormData) => void;
}

const AboutFeaturesModal: React.FC<AboutFeaturesModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<AboutFeaturesFormData>({
    resolver: zodResolver(aboutFeaturesSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (data: AboutFeaturesFormData) => {
    console.log("About Features Updated Data:", data);
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit About Features"
      description="Update the features section content."
      showBackground={true}
      maxWidth="3xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="about-features-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update Features
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="about-features-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-1"
        >
          <FormField
            control={form.control}
            name="badge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Badge Text</FormLabel>
                <FormControl>
                  <FormInput placeholder="e.g. OUR FEATURES" {...field} />
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="w-full min-h-[80px] p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all text-sm"
                    placeholder="Enter description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Features Items */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">
              Features
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 rounded-lg border border-slate-200 bg-white relative group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`items.${index}.title`}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-semibold text-slate-500">
                            Title
                          </FormLabel>
                          <FormControl>
                            <FormInput
                              size="sm"
                              placeholder="Item title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.description`}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-semibold text-slate-500">
                            Description
                          </FormLabel>
                          <FormControl>
                            <FormInput
                              size="sm"
                              placeholder="Item description"
                              {...field}
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
              onClick={() => append({ title: "", description: "" })}
            >
              <Plus className="w-4 h-4" />
              Add New Item
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default AboutFeaturesModal;
