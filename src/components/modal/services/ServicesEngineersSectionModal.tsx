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

export const engineersSectionSchema = z.object({
  tagline: z.string().min(1, "Tagline is required"),
  title: z.string().min(1, "Title is required"),
  exploreText: z.string().optional(),
});

export type EngineersSectionFormData = z.infer<typeof engineersSectionSchema>;

interface ServicesEngineersSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: EngineersSectionFormData;
  onUpdate: (data: EngineersSectionFormData) => void;
}

const ServicesEngineersSectionModal: React.FC<
  ServicesEngineersSectionModalProps
> = ({ isOpen, onClose, initialData, onUpdate }) => {
  const form = useForm<EngineersSectionFormData>({
    resolver: zodResolver(engineersSectionSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: EngineersSectionFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Engineers Section"
      description="Update section texts."
      maxWidth="lg"
      showBackground={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tagline (Top Label)</FormLabel>
                <FormControl>
                  <FormInput placeholder="ECONEST WORKERS" {...field} />
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
                  <FormTextarea
                    placeholder="Our Professionals Engineers"
                    rows={2}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="exploreText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button Text (Explore More)</FormLabel>
                <FormControl>
                  <FormInput placeholder="Explore More" {...field} />
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

export default ServicesEngineersSectionModal;
