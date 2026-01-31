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
  aboutSectionSchema,
  AboutSectionFormData,
} from "@/schemas/home/aboutSection.schema";

interface AboutSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: AboutSectionFormData;
  onUpdate: (data: AboutSectionFormData) => void;
}

const AboutSectionModal: React.FC<AboutSectionModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<AboutSectionFormData>({
    resolver: zodResolver(aboutSectionSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "points" as any, // Cast to any to handle array of strings with useFieldArray which usually expects array of objects
  });

  // Since points is array of strings, useFieldArray might be tricky.
  // Let's use standard map and form.watch/setValue instead for simpler array of strings.

  const points = form.watch("points");

  useEffect(() => {
    if (isOpen) {
      form.reset(initialData);
    }
  }, [isOpen, initialData, form]);

  const onSubmit = (data: AboutSectionFormData) => {
    onUpdate(data);
    onClose();
  };

  const addPoint = () => {
    form.setValue("points", [...points, ""]);
  };

  const removePoint = (index: number) => {
    form.setValue(
      "points",
      points.filter((_, i) => i !== index),
    );
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit About Section"
      description="Update the main about section content."
      maxWidth="4xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="badge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Badge Text</FormLabel>
                  <FormControl>
                    <FormInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating Label</FormLabel>
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
                <FormItem className="md:col-span-2">
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <FormInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Image URL</FormLabel>
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <FormTextarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2 space-y-4">
              <FormLabel>Key Points</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {points.map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <FormInput
                      value={points[index]}
                      onChange={(e) => {
                        const newPoints = [...points];
                        newPoints[index] = e.target.value;
                        form.setValue("points", newPoints);
                      }}
                      placeholder={`Point ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePoint(index)}
                      className="text-red-500 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addPoint}
                  className="border-dashed"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Point
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="buttonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button Text</FormLabel>
                  <FormControl>
                    <FormInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default AboutSectionModal;
