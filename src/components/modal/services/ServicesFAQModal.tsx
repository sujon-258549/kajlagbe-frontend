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
import { Textarea } from "@/components/ui/textarea";

// Schema for FAQ
export const faqSchema = z.object({
  faqs: z.array(
    z.object({
      id: z.string().optional(),
      q: z.string().min(1, "Question is required"),
      a: z.string().min(1, "Answer is required"),
    }),
  ),
});

export type FAQFormData = z.infer<typeof faqSchema>;

interface ServicesFAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: FAQFormData;
  onUpdate: (data: FAQFormData) => void;
}

const ServicesFAQModal: React.FC<ServicesFAQModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<FAQFormData>({
    resolver: zodResolver(faqSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: FAQFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit FAQs"
      description="Update Frequently Asked Questions."
      showBackground={false}
      maxWidth="3xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            {form.watch("faqs").map((_, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-gray-50 relative space-y-3"
              >
                <div className="flex justify-between items-center mb-2">
                  <FormLabel className="font-bold">
                    Question {index + 1}
                  </FormLabel>
                </div>

                <FormField
                  control={form.control}
                  name={`faqs.${index}.q`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <FormInput placeholder="Is it organic?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`faqs.${index}.a`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Yes, it is..."
                          className="resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3">
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

export default ServicesFAQModal;
