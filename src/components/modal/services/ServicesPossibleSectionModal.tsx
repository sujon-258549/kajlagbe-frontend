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

export const possibleSectionSchema = z.object({
  tagline: z.string().min(1, "Tagline is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export type PossibleSectionFormData = z.infer<typeof possibleSectionSchema>;

interface ServicesPossibleSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: PossibleSectionFormData;
  onUpdate: (data: PossibleSectionFormData) => void;
}

const ServicesPossibleSectionModal: React.FC<
  ServicesPossibleSectionModalProps
> = ({ isOpen, onClose, initialData, onUpdate }) => {
  const form = useForm<PossibleSectionFormData>({
    resolver: zodResolver(possibleSectionSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: PossibleSectionFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Possible Section"
      description="Update the section title, tagline, and description."
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
                  <FormInput placeholder="What We Do" {...field} />
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
                    placeholder="It's All Possible, We Can Do it Together"
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Quote)</FormLabel>
                <FormControl>
                  <FormTextarea
                    placeholder="Advanced cameras combined with a large display..."
                    rows={3}
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

export default ServicesPossibleSectionModal;
