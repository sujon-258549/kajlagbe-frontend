"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
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
import ImageUpload from "@/components/common/ImageUpload";
import {
  serviceSliderSchema,
  ServiceSliderFormData,
} from "@/schemas/services/slider.schema";

interface SliderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ServiceSliderFormData;
  onUpdate: (data: ServiceSliderFormData) => void;
}

const SliderModal: React.FC<SliderModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<ServiceSliderFormData>({
    resolver: zodResolver(serviceSliderSchema) as any,
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const onSubmit = (data: ServiceSliderFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Projects Slider"
      description="Update the sticky project items that appear in the vertical slider."
      showBackground={true}
      maxWidth="5xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="slider-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update Slider
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="slider-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50 relative group"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="absolute -top-2 -right-2 h-8 w-8 text-red-500 bg-white rounded-full border border-red-100 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <X className="w-4 h-4" />
                </Button>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`projects.${index}.category`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <FormInput
                              placeholder="e.g. Tree Plantation"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`projects.${index}.number`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number Badge</FormLabel>
                          <FormControl>
                            <FormInput placeholder="01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`projects.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title / Tagline</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            className="w-full min-h-[80px] p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-sm outline-none"
                            placeholder="Enter project tagline..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`projects.${index}.image`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Image</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-14 border-dashed border-2 hover:bg-slate-50"
            onClick={() =>
              append({
                id: Date.now(),
                category: "",
                title: "",
                image: "",
                number: String(fields.length + 1).padStart(2, "0"),
              })
            }
          >
            <Plus className="w-5 h-5 mr-3" /> Add New Project Item
          </Button>
        </form>
      </Form>
    </CommonModal>
  );
};

export default SliderModal;
