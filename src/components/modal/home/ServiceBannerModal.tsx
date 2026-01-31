"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
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
  serviceBannerSchema,
  ServiceBannerFormData,
} from "@/schemas/home/serviceBanner.schema";

interface ServiceBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ServiceBannerFormData;
  onUpdate: (data: ServiceBannerFormData) => void;
}

const ServiceBannerModal: React.FC<ServiceBannerModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<ServiceBannerFormData>({
    resolver: zodResolver(serviceBannerSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "services",
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialData);
    }
  }, [isOpen, initialData, form]);

  const onSubmit = (data: ServiceBannerFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Service Banner"
      description="Manage the sliding services banner."
      maxWidth="5xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border rounded-xl bg-slate-50 relative group"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-sm text-secondary">
                    Service {index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="h-8 w-8 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name={`services.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Title</FormLabel>
                        <FormControl>
                          <FormInput
                            size="sm"
                            placeholder="Service Title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`services.${index}.slug`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Slug</FormLabel>
                        <FormControl>
                          <FormInput
                            size="sm"
                            placeholder="service-slug"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`services.${index}.image`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Image URL</FormLabel>
                        <FormControl>
                          <FormInput
                            size="sm"
                            placeholder="https://..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="h-full min-h-[150px] border-dashed border-2 rounded-xl flex flex-col gap-2 hover:bg-secondary/5 transition-colors"
              onClick={() =>
                append({
                  title: "",
                  slug: "",
                  image: "",
                })
              }
            >
              <Plus className="w-5 h-5" />
              <span className="text-sm font-medium">Add Service</span>
            </Button>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t mt-4">
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

export default ServiceBannerModal;
