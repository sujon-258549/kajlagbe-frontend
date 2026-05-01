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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

// Schema for Process Steps
export const processSchema = z.object({
  subtitle: z.string().min(1, "Subtitle is required"),
  title: z.string().min(1, "Title is required"),
  steps: z.array(
    z.object({
      id: z.string().optional(),
      number: z.string().min(1, "Number is required"),
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      icon: z.string().min(1, "Icon is required"),
    }),
  ),
});

export type ProcessFormData = z.infer<typeof processSchema>;

interface ServicesProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ProcessFormData;
  onUpdate: (data: ProcessFormData) => any;
  isLoading?: boolean;
}

const ServicesProcessModal: React.FC<ServicesProcessModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
  isLoading = false,
}) => {
  const form = useForm<ProcessFormData>({
    resolver: zodResolver(processSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form, isOpen]);

  const handleSubmit = async (data: ProcessFormData) => {
    const success = await onUpdate(data);
    if (success === true) {
      onClose();
    }
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Process Section"
      description="Update the section title, subtitle, and process steps."
      maxWidth="3xl"
      showBackground={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <FormInput placeholder="HOW WE WORK" {...field} />
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
                    <FormInput
                      placeholder="Our proven process for perfect results"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Process Steps</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    number: String(fields.length + 1).padStart(2, "0"),
                    title: "",
                    description: "",
                    icon: "Clipboard",
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Add Step
              </Button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border rounded-lg bg-gray-50 relative space-y-3"
              >
                <div className="flex justify-between items-center mb-2">
                  <FormLabel className="font-bold">Step {index + 1}</FormLabel>
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

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name={`steps.${index}.number`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>No.</FormLabel>
                          <FormControl>
                            <FormInput placeholder="01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-10">
                    <FormField
                      control={form.control}
                      name={`steps.${index}.title`}
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
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name={`steps.${index}.icon`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon (Lucide Name or FA Class)</FormLabel>
                        <FormControl>
                          <FormInput
                            placeholder="e.g. Clipboard or fa-solid fa-clipboard"
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
                  name={`steps.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          className="resize-none"
                          rows={2}
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

export default ServicesProcessModal;
