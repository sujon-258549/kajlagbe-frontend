"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { serviceBannerItemSchema } from "@/schemas/home/serviceBanner.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/common/ImageUpload";
import { z } from "zod";

export type ServiceBannerItem = z.infer<typeof serviceBannerItemSchema>;

interface ServiceBannerItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: ServiceBannerItem;
  onSave: (data: ServiceBannerItem) => void;
}

const ServiceBannerItemModal: React.FC<ServiceBannerItemModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
}) => {
  const form = useForm<ServiceBannerItem>({
    resolver: zodResolver(serviceBannerItemSchema),
    defaultValues: {
      title: "",
      slug: "",
      image: "",
    },
  });

  useEffect(() => {
    if (isOpen && item) {
      form.reset(item);
    }
  }, [item, isOpen, form]);

  const handleSubmit = (data: ServiceBannerItem) => {
    onSave(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Service"
      description="Update service information."
      maxWidth="xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Title</FormLabel>
                <FormControl>
                  <FormInput
                    placeholder="Home Repair & Maintenance"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <FormInput placeholder="home-repair-maintenance" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Image</FormLabel>
                <FormControl>
                  <ImageUpload {...field} />
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

export default ServiceBannerItemModal;
