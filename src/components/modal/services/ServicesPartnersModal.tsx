"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus, Trash } from "lucide-react";

export const servicesPartnersSchema = z.object({
  partners: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
    }),
  ),
});

export type ServicesPartnersData = z.infer<typeof servicesPartnersSchema>;

interface ServicesPartnersModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ServicesPartnersData;
  onUpdate: (data: ServicesPartnersData) => void;
}

const ServicesPartnersModal: React.FC<ServicesPartnersModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<ServicesPartnersData>({
    resolver: zodResolver(servicesPartnersSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: ServicesPartnersData) => {
    onUpdate(data);
    onClose();
  };

  const partners = form.watch("partners");

  const addPartner = () => {
    const currentPartners = form.getValues("partners");
    form.setValue("partners", [...currentPartners, { name: "" }]);
  };

  const removePartner = (index: number) => {
    const currentPartners = form.getValues("partners");
    form.setValue(
      "partners",
      currentPartners.filter((_, i) => i !== index),
    );
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Partners"
      description="Manage the list of major partners."
      maxWidth="lg"
      showBackground={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            {partners.map((_, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`partners.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? "sr-only" : ""}>
                          Partner Name
                        </FormLabel>
                        <FormControl>
                          <FormInput placeholder="Partner Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removePartner(index)}
                  className="mb-0.5"
                  title="Remove Partner"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addPartner}
            className="w-full dashed border-2 border-dashed"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Partner
          </Button>

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

export default ServicesPartnersModal;
