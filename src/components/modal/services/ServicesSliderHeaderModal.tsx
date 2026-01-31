"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  serviceSliderHeaderSchema,
  ServiceSliderHeaderFormData,
} from "@/schemas/services/slider.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ServicesSliderHeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ServiceSliderHeaderFormData;
  onUpdate: (data: ServiceSliderHeaderFormData) => void;
}

const ServicesSliderHeaderModal: React.FC<ServicesSliderHeaderModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<ServiceSliderHeaderFormData>({
    resolver: zodResolver(serviceSliderHeaderSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialData);
    }
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: ServiceSliderHeaderFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Slider Header"
      description="Update the title for the latest projects section."
      maxWidth="xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section Title</FormLabel>
                <FormControl>
                  <FormInput placeholder="Our Latest Projects" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" className="bg-secondary text-white px-8">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default ServicesSliderHeaderModal;
