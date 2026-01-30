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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Icons from "lucide-react";

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ServicesFormData;
  onUpdate: (data: ServicesFormData) => void;
}

// List of common icons to choose from
const ICON_OPTIONS = [
  "Wrench",
  "Sparkles",
  "Hammer",
  "Axe",
  "Droplets",
  "Zap",
  "Palette",
  "Leaf",
  "Bug",
  "Settings",
  "Thermometer",
  "Home",
  "Square",
  "Shield",
  "Cpu",
  "Truck",
  "Trash2",
  "Eye",
  "Activity",
  "Anchor",
  "Archive",
  "Award",
  "Briefcase",
  "Camera",
];

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
      title="Manage Services"
      description="Add, edit, or remove services."
      showBackground={false}
      maxWidth="4xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 max-h-[60vh] overflow-y-auto p-1">
            {form.watch("services").map((service, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-gray-50 relative space-y-3"
              >
                <div className="flex justify-between items-center mb-2">
                  <FormLabel className="font-bold text-lg">
                    Service {index + 1}
                  </FormLabel>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeService(index)}
                  >
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`services.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <FormInput placeholder="Home Repair" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`services.${index}.slug`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <FormInput placeholder="home-repair" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`services.${index}.iconName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an icon" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[200px]">
                            {ICON_OPTIONS.map((iconName) => {
                              const IconComp = (Icons as any)[iconName];
                              return (
                                <SelectItem key={iconName} value={iconName}>
                                  <div className="flex items-center gap-2">
                                    {IconComp && (
                                      <IconComp className="w-4 h-4" />
                                    )}
                                    <span>{iconName}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
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
              onClick={addService}
              className="w-full"
            >
              + Add New Service
            </Button>
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
