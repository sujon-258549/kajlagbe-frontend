"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormTextarea from "@/components/common/FormTextarea";

export const pricingSectionSchema = z.object({
  tagline: z.string().min(1, "Tagline is required"),
  title: z.string().min(1, "Title is required"),
});

export type PricingSectionFormData = z.infer<typeof pricingSectionSchema>;

interface ServicesPricingSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: PricingSectionFormData;
  onUpdate: (data: PricingSectionFormData) => void;
}

const ServicesPricingSectionModal: React.FC<
  ServicesPricingSectionModalProps
> = ({ isOpen, onClose, initialData, onUpdate }) => {
  const form = useForm<PricingSectionFormData>({
    resolver: zodResolver(pricingSectionSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: PricingSectionFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Pricing Section"
      description="Update the section title and tagline."
      maxWidth="lg"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tagline</FormLabel>
                <FormControl>
                  <FormInput placeholder="PRICING PLANS" {...field} />
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
                  <FormTextarea
                    placeholder="Choose the right plan for your farm"
                    {...field}
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
            <Button type="submit" className="bg-secondary text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default ServicesPricingSectionModal;
