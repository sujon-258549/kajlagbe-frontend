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
  aboutTestimonialsSchema,
  AboutTestimonialsFormData,
} from "@/schemas/about/testimonials.schema";

interface AboutTestimonialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: AboutTestimonialsFormData;
  onUpdate: (data: AboutTestimonialsFormData) => void;
}

const AboutTestimonialsModal: React.FC<AboutTestimonialsModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<AboutTestimonialsFormData>({
    resolver: zodResolver(aboutTestimonialsSchema) as any,
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (data: AboutTestimonialsFormData) => {
    console.log("About Testimonials Updated Data:", data);
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit About Testimonials"
      description="Update testimonials content."
      showBackground={true}
      maxWidth="3xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="about-testimonials-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update Testimonials
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="about-testimonials-form"
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
                    <FormInput placeholder="e.g. TESTIMONIALS" {...field} />
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
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">
              Testimonial Items
            </h3>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 rounded-lg border border-slate-200 bg-white relative group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`items.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-semibold text-slate-500">
                            Name
                          </FormLabel>
                          <FormControl>
                            <FormInput
                              size="sm"
                              placeholder="Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.role`}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-semibold text-slate-500">
                            Role
                          </FormLabel>
                          <FormControl>
                            <FormInput
                              size="sm"
                              placeholder="Role"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.rating`}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-semibold text-slate-500">
                            Rating (1-5)
                          </FormLabel>
                          <FormControl>
                            <FormInput
                              type="number"
                              size="sm"
                              placeholder="5"
                              max={5}
                              min={1}
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`items.${index}.content`}
                    render={({ field }) => (
                      <FormItem className="space-y-1 mt-3">
                        <FormLabel className="text-xs font-semibold text-slate-500">
                          Content
                        </FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            className="w-full min-h-[60px] p-2 rounded border border-slate-200 text-sm focus:border-secondary outline-none"
                            placeholder="Testimonial content"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

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
              onClick={() =>
                append({ name: "", role: "", content: "", rating: 5 })
              }
            >
              <Plus className="w-4 h-4" />
              Add New Testimonial
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default AboutTestimonialsModal;
