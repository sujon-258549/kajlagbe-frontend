"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  servicesHeaderSchema,
  ServicesHeaderFormData,
} from "@/schemas/services/services.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Settings } from "lucide-react";

interface ServicesHeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ServicesHeaderFormData;
  onUpdate: (data: ServicesHeaderFormData) => void;
}

const ServicesHeaderModal: React.FC<ServicesHeaderModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<ServicesHeaderFormData>({
    resolver: zodResolver(servicesHeaderSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialData);
    }
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: ServicesHeaderFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Services Header"
      description="Update section title and description."
      showBackground={true}
      maxWidth="2xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="bg-gray-50/50 p-4 rounded-lg space-y-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-secondary/10 p-2 rounded-full">
                <Settings className="w-4 h-4 text-secondary" />
              </div>
              <h3 className="font-semibold text-gray-800">Section Settings</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="sectionTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Title</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Our Services" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sectionDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Description</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Description..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sectionBackgroundImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Background Image URL</FormLabel>
                    <FormControl>
                      <FormInput placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

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

export default ServicesHeaderModal;
