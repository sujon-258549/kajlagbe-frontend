"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
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
  aboutMissionSchema,
  AboutMissionFormData,
} from "@/schemas/about/mission.schema";

interface AboutMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: AboutMissionFormData;
  onUpdate: (data: AboutMissionFormData) => void;
}

const AboutMissionModal: React.FC<AboutMissionModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<AboutMissionFormData>({
    resolver: zodResolver(aboutMissionSchema) as any,
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const onSubmit = (data: AboutMissionFormData) => {
    console.log("About Mission Updated Data:", data);
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit About Mission"
      description="Update the mission section content, images, and features."
      showBackground={true}
      maxWidth="3xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="about-mission-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update Mission
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="about-mission-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-1"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="badge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Badge Text</FormLabel>
                  <FormControl>
                    <FormInput placeholder="e.g. About Us" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="satisfactionRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Satisfaction Rate (%)</FormLabel>
                  <FormControl>
                    <FormInput
                      type="number"
                      placeholder="e.g. 98"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Title</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="mainImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        isSingle={true}
                        className="bg-slate-50 border-slate-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1">
              <FormField
                control={form.control}
                name="secondaryImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        isSingle={true}
                        className="bg-slate-50 border-slate-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="w-full min-h-[100px] p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all text-sm"
                    placeholder="Enter description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Features List (Ant Design Style) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">
              Features List
            </h3>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg border border-slate-200 bg-white hover:border-primary/30 transition-all relative group"
                >
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <FormField
                      control={form.control}
                      name={`features.${index}.title`}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-semibold text-slate-500">
                            Title
                          </FormLabel>
                          <FormControl>
                            <FormInput
                              size="sm"
                              placeholder="Feature title"
                              className="focus:ring-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`features.${index}.description`}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-semibold text-slate-500">
                            Description
                          </FormLabel>
                          <FormControl>
                            <FormInput
                              size="sm"
                              placeholder="Short description"
                              className="focus:ring-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="h-7 w-7 text-red-500 bg-red-50 rounded-md border border-red-200 hover:border-red-500 hover:bg-red-100 transition-colors shrink-0"
                      title="Remove feature"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed border"
              onClick={() => append({ title: "", description: "" })}
            >
              <Plus className="w-4 h-4" />
              Add New Feature
            </Button>

            {form.formState.errors.features?.message && (
              <p className="text-xs text-red-500 font-medium text-center">
                {form.formState.errors.features.message}
              </p>
            )}
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default AboutMissionModal;
