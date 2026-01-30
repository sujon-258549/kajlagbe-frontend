"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";

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

  React.useEffect(() => {
    if (isOpen) {
      form.reset(initialData);
    }
  }, [initialData, form, isOpen]);

  const onSubmit = (data: AboutTestimonialsFormData) => {
    onUpdate({ ...initialData, ...data });
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Testimonials Section Content"
      description="Update the content displayed on the left side of the testimonials section."
      showBackground={true}
      maxWidth="2xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="about-testimonials-content-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Save Changes
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="about-testimonials-content-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="badge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Badge Text</FormLabel>
                  <FormControl>
                    <FormInput placeholder="e.g. Testimonials" {...field} />
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
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Enter title" {...field} />
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
                  <Textarea
                    placeholder="Enter section description"
                    className="h-24 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Percentage Value</FormLabel>
                  <FormControl>
                    <FormInput placeholder="e.g. 99%" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="percentageLabel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Percentage Label</FormLabel>
                  <FormControl>
                    <FormInput placeholder="e.g. Positive Reviews" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="reviewSubtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review CTA Subtitle</FormLabel>
                  <FormControl>
                    <FormInput
                      placeholder="e.g. Write your honest"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reviewButtonLabel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review CTA Button Label</FormLabel>
                  <FormControl>
                    <FormInput placeholder="e.g. review" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default AboutTestimonialsModal;
