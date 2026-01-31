"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
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
import { heroSchema, HeroFormData } from "@/schemas/home/hero.schema";

interface HeroModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: HeroFormData;
  onUpdate: (data: HeroFormData) => void;
}

const HeroModal: React.FC<HeroModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<HeroFormData>({
    resolver: zodResolver(heroSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "slides",
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialData);
    }
  }, [isOpen, initialData, form]);

  const onSubmit = (data: HeroFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Hero Settings"
      description="Customize your homepage hero slides."
      maxWidth="4xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border rounded-xl bg-slate-50 relative group"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-secondary">
                    Slide {index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`slides.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <FormInput placeholder="Slide Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`slides.${index}.buttonText`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Text</FormLabel>
                        <FormControl>
                          <FormInput placeholder="LEARN MORE" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`slides.${index}.image`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Slide Image</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onValueChange={field.onChange}
                            className="aspect-video w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`slides.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <FormTextarea
                            placeholder="Slide Description"
                            rows={3}
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
              className="w-full border-dashed border-2 py-8 rounded-xl flex flex-col gap-2 hover:bg-secondary/5 transition-colors"
              onClick={() =>
                append({
                  title: "",
                  description: "",
                  image: "",
                  buttonText: "LEARN MORE",
                })
              }
            >
              <Plus className="w-6 h-6" />
              <span>Add New Slide</span>
            </Button>
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

export default HeroModal;
