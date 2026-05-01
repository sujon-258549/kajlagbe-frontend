"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Plus, Trash2 } from "lucide-react";

// Schema for Benefits
export const benefitsSchema = z.object({
  sectionTitle: z.string().optional(),
  sectionDesc: z.string().optional(),
  items: z.array(
    z.object({
      id: z.string().optional(),
      title: z.string().min(1, "Title is required"),
      desc: z.string().min(1, "Description is required"),
      icon: z.string().min(1, "Icon is required"), // Added icon field
    }),
  ),
});

export type BenefitsFormData = z.infer<typeof benefitsSchema>;

interface ServicesBenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: BenefitsFormData;
  onUpdate: (data: BenefitsFormData) => any;
  isLoading?: boolean;
}

const ServicesBenefitsModal: React.FC<ServicesBenefitsModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
  isLoading = false,
}) => {
  const form = useForm<BenefitsFormData>({
    resolver: zodResolver(benefitsSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form, isOpen]);

  const handleSubmit = async (data: BenefitsFormData) => {
    const success = await onUpdate(data);
    if (success === true) {
      onClose();
    }
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Services Benefits"
      description="Update the benefits section content."
      maxWidth="3xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-bold text-lg">Section Details</h3>
              <FormField
                control={form.control}
                name="sectionTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Tagline</FormLabel>
                    <FormControl>
                      <FormInput placeholder="WHY CHOOSE US" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sectionDesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Title</FormLabel>
                    <FormControl>
                      <FormTextarea
                        placeholder="We bring excellence to every field we touch"
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold text-lg">Benefits Items</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    title: "",
                    desc: "",
                    icon: "fa-solid fa-star",
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Add Benefit
              </Button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border rounded-lg bg-gray-50 relative space-y-3"
              >
                <div className="flex justify-between items-center mb-2">
                  <FormLabel className="font-bold">
                    Benefit {index + 1}
                  </FormLabel>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 p-0 h-auto"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`items.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <FormInput placeholder="Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.icon`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Font Awesome Icon Class</FormLabel>
                        <FormControl>
                          <FormInput
                            placeholder="e.g. fa-solid fa-star"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={`items.${index}.desc`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <FormTextarea
                          placeholder="Description"
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

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-secondary text-white"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default ServicesBenefitsModal;
