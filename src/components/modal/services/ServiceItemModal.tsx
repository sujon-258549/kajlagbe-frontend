"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  serviceItemSchema,
  ServiceItem,
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

interface ServiceItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: ServiceItem;
  onSave: (data: ServiceItem) => void;
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

const ServiceItemModal: React.FC<ServiceItemModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
}) => {
  const form = useForm<ServiceItem>({
    resolver: zodResolver(serviceItemSchema),
    defaultValues: {
      title: "",
      slug: "",
      iconName: "Wrench",
    },
  });

  useEffect(() => {
    if (item) {
      form.reset(item);
    } else {
      form.reset({
        title: "",
        slug: "",
        iconName: "Wrench",
      });
    }
  }, [item, form, isOpen]);

  const handleSubmit = (data: ServiceItem) => {
    onSave(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? "Edit Service" : "Add Service"}
      description={item ? "Edit the service details." : "Add a new service."}
      showBackground={true}
      maxWidth="md"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
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
            name="slug"
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
            name="iconName"
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
                            {IconComp && <IconComp className="w-4 h-4" />}
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

export default ServiceItemModal;
