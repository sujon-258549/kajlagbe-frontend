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
  subscriptionCTASchema,
  SubscriptionCTAFormData,
} from "@/schemas/subscription/cta.schema";

interface SubscriptionCTAModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: SubscriptionCTAFormData;
  onUpdate: (data: SubscriptionCTAFormData) => void;
}

const SubscriptionCTAModal: React.FC<SubscriptionCTAModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<SubscriptionCTAFormData>({
    resolver: zodResolver(subscriptionCTASchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: SubscriptionCTAFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Call to Action"
      description="Update the conversion section at the bottom of the page."
      showBackground={true}
      maxWidth="2xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="cta-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update CTA
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="cta-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-1"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Title</FormLabel>
                <FormControl>
                  <FormInput placeholder="Ready to accelerate?" {...field} />
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
                    className="w-full min-h-[100px] p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all text-sm"
                    placeholder="Enter description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase">
                Primary Button
              </h4>
              <FormField
                control={form.control}
                name="primaryButtonText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <FormInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="primaryButtonLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <FormInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase">
                Secondary Button
              </h4>
              <FormField
                control={form.control}
                name="secondaryButtonText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <FormInput {...field} />
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
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <FormInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default SubscriptionCTAModal;
