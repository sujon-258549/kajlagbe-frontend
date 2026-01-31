"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import FormTextarea from "@/components/common/FormTextarea";
import ImageUpload from "@/components/common/ImageUpload";
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
  featuredServicesSchema,
  FeaturedServicesFormData,
} from "@/schemas/home/featuredServices.schema";

interface FeaturedServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: FeaturedServicesFormData;
  onUpdate: (data: FeaturedServicesFormData) => void;
}

const FeaturedServicesModal: React.FC<FeaturedServicesModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<FeaturedServicesFormData>({
    resolver: zodResolver(featuredServicesSchema),
    defaultValues: initialData,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "showcase",
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialData);
    }
  }, [isOpen, initialData, form]);

  const onSubmit = (data: FeaturedServicesFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Featured Services"
      description="Update the grid display of featured services."
      maxWidth="5xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-xl bg-slate-50/50">
            <h3 className="md:col-span-2 font-bold text-lg text-secondary border-b pb-2">
              Section Header
            </h3>
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagline (Italic)</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Features" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buttonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button Text</FormLabel>
                  <FormControl>
                    <FormInput placeholder="View All Services" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainTitle"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>
                    Main Title (HTML allowed for <br />)
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      placeholder="Premier One-Stop Print Solutions"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainDescription"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Main Description</FormLabel>
                  <FormControl>
                    <FormTextarea
                      rows={3}
                      placeholder="Enter description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="md:col-span-full font-bold text-lg text-secondary border-b pb-2">
              Grid Items (Requires exactly 6)
            </h3>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border rounded-xl bg-white relative"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-xs text-secondary">
                    Item {index + 1}
                  </h4>
                </div>

                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name={`showcase.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Title</FormLabel>
                        <FormControl>
                          <FormInput size="sm" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`showcase.${index}.image`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Service Image</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onValueChange={field.onChange}
                            className="aspect-square w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`showcase.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">
                          Hover Description
                        </FormLabel>
                        <FormControl>
                          <FormInput size="sm" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
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

export default FeaturedServicesModal;
