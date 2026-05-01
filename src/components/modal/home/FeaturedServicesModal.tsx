"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import FormTextarea from "@/components/common/FormTextarea";
import MediaLibraryImageUploader from "@/components/common/MediaLibraryImageUploader";
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
  onUpdate: (data: FeaturedServicesFormData, name: string) => void;
  isLoading?: boolean;
  settingName: string;
  settingKey: string;
}

const FeaturedServicesModal: React.FC<FeaturedServicesModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
  isLoading = false,
  settingName,
  settingKey,
}) => {
  const [prevSettingName, setPrevSettingName] = React.useState(settingName);
  const [localSettingName, setLocalSettingName] = React.useState(settingName);

  if (settingName !== prevSettingName) {
    setPrevSettingName(settingName);
    setLocalSettingName(settingName);
  }

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
    onUpdate(data, localSettingName);
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Featured Services"
      description="Update the grid display of featured services."
      maxWidth="4xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border">
            <FormItem>
              <FormLabel className="text-secondary font-bold">Setting Name</FormLabel>
              <FormControl>
                <FormInput 
                  value={localSettingName}
                  onChange={(e) => setLocalSettingName(e.target.value)}
                  placeholder="e.g. Featured Services"
                />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel className="text-slate-400 font-bold">Setting Key (Read-only)</FormLabel>
              <FormControl>
                <FormInput 
                  value={settingKey}
                  readOnly
                  className="bg-slate-100 cursor-not-allowed opacity-70"
                />
              </FormControl>
            </FormItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-gray-300 rounded-md bg-slate-50/50">
            <h3 className="md:col-span-2 font-bold text-lg text-secondary border-b pb-2">
              Section Header
            </h3>
            <FormField
              control={form.control as any}
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
              control={form.control as any}
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
              control={form.control as any}
              name="mainTitle"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>
                    Main Title
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
              control={form.control as any}
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
                className="p-4 border border-gray-300 rounded-md bg-white relative"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-xs text-secondary">
                    Item {index + 1}
                  </h4>
                </div>

                <div className="space-y-3">
                  <FormField
                    control={form.control as any}
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
                    control={form.control as any}
                    name={`showcase.${index}.image`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Service Image</FormLabel>
                        <FormControl>
                          <MediaLibraryImageUploader
                            value={field.value}
                            onChange={(url, id) => {
                              field.onChange(url);
                              if (id) form.setValue(`showcase.${index}.imageId`, id);
                            }}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control as any}
                    name={`showcase.${index}.link`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">
                          Link URL
                        </FormLabel>
                        <FormControl>
                          <FormInput size="sm" placeholder="#" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control as any}
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
            <Button 
              type="submit" 
              className="bg-secondary text-white px-8"
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

export default FeaturedServicesModal;
