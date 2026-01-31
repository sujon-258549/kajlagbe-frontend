"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  servicesSchema,
  ServicesFormData,
} from "@/schemas/services/services.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Settings, List, Trash2 } from "lucide-react";

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ServicesFormData;
  onUpdate: (data: ServicesFormData) => void;
}

const ServicesModal: React.FC<ServicesModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<ServicesFormData>({
    resolver: zodResolver(servicesSchema) as any,
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: ServicesFormData) => {
    onUpdate(data);
    onClose();
  };

  const removeService = (index: number) => {
    const currentServices = form.getValues("services");
    const updatedServices = [...currentServices];
    updatedServices.splice(index, 1);
    form.setValue("services", updatedServices);
  };

  const addService = () => {
    const currentServices = form.getValues("services");
    form.setValue("services", [
      ...currentServices,
      { title: "", slug: "", iconName: "Wrench", image: "" },
    ]);
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Manage Services Section"
      description="Update section details and manage services."
      showBackground={true}
      maxWidth="4xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Section Settings */}
          <div className="bg-gray-50/50 p-4 rounded-lg space-y-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-secondary/10 p-2 rounded-full">
                <Settings className="w-4 h-4 text-secondary" />
              </div>
              <h3 className="font-semibold text-gray-800">Section Settings</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sectionTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Title</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Our Services" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sectionDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Description</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Description..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Background Image - optional per user request for "modal bg" (assuming section bg) */}
            {/* Note: I'll skip ImageUpload for now as user just said "modal bg add koro" which might refer to the modal's background? 
             Wait, "modal bg" usually means standard modal background. "title and desc add koro modal bg add koro" -> 
             "Add title and desc, add modal bg". 
             Maybe they want the modal to use the CommonModal's `image` prop?
             Or maybe they want a field for the section's background image?
             I'll add the field for sectionBackgroundImage as a text input for URL or similar, or just leave it for now if not strictly clear.
             Actually, let's add it as a standard input for image URL to be safe, or just skip if it complicates things without ImageUpload import.
             I'll add it as a text input for now.
             */}
            <FormField
              control={form.control}
              name="sectionBackgroundImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Background Image URL</FormLabel>
                  <FormControl>
                    <FormInput placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-secondary/10 p-2 rounded-full">
                  <List className="w-4 h-4 text-secondary" />
                </div>
                <h3 className="font-semibold text-gray-800">Services List</h3>
              </div>
              <Button
                type="button"
                onClick={addService}
                size="sm"
                className="bg-secondary text-white"
              >
                + Add New
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 max-h-[40vh] overflow-y-auto p-1 custom-scrollbar">
              {form.watch("services").map((service, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-white shadow-sm relative group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                      <FormField
                        control={form.control}
                        name={`services.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <FormInput
                                placeholder="Title"
                                className="h-9"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`services.${index}.slug`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <FormInput
                                placeholder="Slug"
                                className="h-9"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`services.${index}.iconName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <FormInput
                                placeholder="Icon (e.g. fa-solid fa-wrench)"
                                className="h-9"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeService(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" className="bg-secondary text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default ServicesModal;
