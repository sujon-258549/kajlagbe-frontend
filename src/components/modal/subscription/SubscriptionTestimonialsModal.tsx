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
  subscriptionTestimonialsSchema,
  SubscriptionTestimonialsFormData,
} from "@/schemas/subscription/testimonials.schema";

interface SubscriptionTestimonialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: SubscriptionTestimonialsFormData;
  onUpdate: (data: SubscriptionTestimonialsFormData) => void;
}

const SubscriptionTestimonialsModal: React.FC<
  SubscriptionTestimonialsModalProps
> = ({ isOpen, onClose, initialData, onUpdate }) => {
  const form = useForm<SubscriptionTestimonialsFormData>({
    resolver: zodResolver(subscriptionTestimonialsSchema) as any,
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "testimonials",
  });

  const onSubmit = (data: SubscriptionTestimonialsFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Testimonials"
      description="Update what your customers are saying."
      showBackground={true}
      maxWidth="3xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="testimonials-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update Testimonials
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="testimonials-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-1"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Title</FormLabel>
                  <FormControl>
                    <FormInput
                      placeholder="e.g. Trusted by Thousands"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Enter section subtext" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <hr className="border-slate-100" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-secondary uppercase tracking-widest">
                Customer Reviews
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() =>
                  append({ name: "", role: "", image: "", quote: "" })
                }
              >
                <Plus className="w-4 h-4" /> Add Testimonial
              </Button>
            </div>

            <div className="space-y-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4 relative group"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="absolute -top-2 -right-2 h-8 w-8 text-red-500 bg-red-50 rounded-full border border-red-200 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-32 shrink-0">
                      <FormField
                        control={form.control}
                        name={`testimonials.${index}.image`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Avatar</FormLabel>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={field.onChange}
                                isSingle={true}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`testimonials.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <FormInput placeholder="Jan Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`testimonials.${index}.role`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role/Title</FormLabel>
                              <FormControl>
                                <FormInput
                                  placeholder="CEO at Comp"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name={`testimonials.${index}.quote`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Testimonial Quote</FormLabel>
                            <FormControl>
                              <textarea
                                {...field}
                                className="w-full min-h-[80px] p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all text-sm"
                                placeholder="Enter customer quote..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default SubscriptionTestimonialsModal;
