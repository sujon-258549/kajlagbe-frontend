"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
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
import {
  processSectionSchema,
  ProcessFormData,
} from "@/schemas/home/process.schema";

interface ProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ProcessFormData;
  onUpdate: (data: ProcessFormData) => void;
}

const ProcessModal: React.FC<ProcessModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<ProcessFormData>({
    resolver: zodResolver(processSectionSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialData);
    }
  }, [isOpen, initialData, form]);

  const onSubmit = (data: ProcessFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Workflow Process"
      description="Customize the steps of your service workflow."
      maxWidth="5xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-xl bg-slate-50/50">
            <FormField
              control={form.control}
              name="badge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Badge</FormLabel>
                  <FormControl>
                    <FormInput {...field} />
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
                  <FormLabel>Main Title</FormLabel>
                  <FormControl>
                    <FormInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <FormInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border rounded-xl bg-white relative group"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-secondary">Step {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name={`steps.${index}.number`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Step Number</FormLabel>
                        <FormControl>
                          <FormInput placeholder="01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`steps.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <FormInput placeholder="Book Service" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`steps.${index}.iconName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>FA Icon Class</FormLabel>
                        <FormControl>
                          <FormInput
                            placeholder="fa-solid fa-message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`steps.${index}.color`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Theme Color (T-Classes)</FormLabel>
                        <FormControl>
                          <FormInput
                            placeholder="from-secondary to-green-600"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`steps.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <FormTextarea rows={2} {...field} />
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
              className="w-full border-dashed border-2 py-6 rounded-xl flex gap-2"
              onClick={() =>
                append({
                  number: (fields.length + 1).toString().padStart(2, "0"),
                  title: "",
                  iconName: "fa-solid fa-check",
                  description: "",
                  color: "from-secondary to-green-600",
                })
              }
            >
              <Plus className="w-5 h-5" />
              <span>Add Step</span>
            </Button>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
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

export default ProcessModal;
