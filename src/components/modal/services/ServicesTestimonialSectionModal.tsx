"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal"; // Adjust path if needed
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  ServicesTestimonialSectionData,
  ServicesTestimonialSectionSchema,
} from "@/schemas/services/testimonial.schema";

interface ServicesTestimonialSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ServicesTestimonialSectionData;
  onUpdate: (data: ServicesTestimonialSectionData) => void;
}

const ServicesTestimonialSectionModal: React.FC<
  ServicesTestimonialSectionModalProps
> = ({ isOpen, onClose, initialData, onUpdate }) => {
  const form = useForm<ServicesTestimonialSectionData>({
    resolver: zodResolver(ServicesTestimonialSectionSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: ServicesTestimonialSectionData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Testimonials Section"
      description="Update the section title, subtitle, and background image."
      maxWidth="lg"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <FormInput placeholder="TESTIMONIALS" {...field} />
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
                  <FormInput placeholder="What People Saying" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="backgroundImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onValueChange={(val) => field.onChange(val)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" className="bg-secondary text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default ServicesTestimonialSectionModal;
