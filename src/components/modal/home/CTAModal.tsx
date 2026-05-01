"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import FormTextarea from "@/components/common/FormTextarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ctaSchema, CTAFormData } from "@/schemas/home/cta.schema";

interface CTAModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: CTAFormData;
  onUpdate: (data: CTAFormData) => void;
  isLoading?: boolean;
}

const CTAModal: React.FC<CTAModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
  isLoading = false,
}) => {
  const form = useForm<CTAFormData>({
    resolver: zodResolver(ctaSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialData);
    }
  }, [isOpen, initialData, form]);

  const onSubmit = (data: CTAFormData) => {
    onUpdate(data);
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit CTA Section"
      description="Update the call-to-action content and buttons."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control as any}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <FormInput placeholder="Ready to get started?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control as any}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <FormTextarea rows={3} placeholder="Enter description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4 p-4 border rounded-xl bg-slate-50">
              <h4 className="font-bold text-sm text-secondary uppercase tracking-wider">Primary Button</h4>
              <FormField
                control={form.control as any}
                name="primaryButtonText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button Text</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Contact Us" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="primaryButtonLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button Link</FormLabel>
                    <FormControl>
                      <FormInput placeholder="/contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 p-4 border rounded-xl bg-slate-50">
              <h4 className="font-bold text-sm text-secondary uppercase tracking-wider">Secondary Button</h4>
              <FormField
                control={form.control}
                name="secondaryButtonText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button Text</FormLabel>
                    <FormControl>
                      <FormInput placeholder="View Services" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondaryButtonLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button Link</FormLabel>
                    <FormControl>
                      <FormInput placeholder="/services" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-secondary text-white">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default CTAModal;
