"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  servicesBlogHeaderSchema,
  ServicesBlogHeaderFormData,
} from "@/schemas/services/blog.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ServicesBlogHeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ServicesBlogHeaderFormData;
  onUpdate: (data: ServicesBlogHeaderFormData) => void;
}

const ServicesBlogHeaderModal: React.FC<ServicesBlogHeaderModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<ServicesBlogHeaderFormData>({
    resolver: zodResolver(servicesBlogHeaderSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialData);
    }
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: ServicesBlogHeaderFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Blog Section Header"
      description="Update section tagline and title."
      maxWidth="2xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <FormInput placeholder="News & Blog" {...field} />
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
                    <FormInput placeholder="Our Daily Update" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

export default ServicesBlogHeaderModal;
