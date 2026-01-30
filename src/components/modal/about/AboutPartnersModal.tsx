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

export const aboutPartnersSchema = z.object({
  partners: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
    }),
  ),
});

export type AboutPartnersData = z.infer<typeof aboutPartnersSchema>;

interface AboutPartnersModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: AboutPartnersData;
  onUpdate: (data: AboutPartnersData) => void;
}

const AboutPartnersModal: React.FC<AboutPartnersModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<AboutPartnersData>({
    resolver: zodResolver(aboutPartnersSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: AboutPartnersData) => {
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
      description="Manage the list of trusted partners for the marquee section."
      maxWidth="lg"
      showBackground={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
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
                  className="mb-0.5 shrink-0"
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
            className="w-full dashed border-2 border-dashed h-12 hover:border-secondary hover:text-secondary group transition-all"
          >
            <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />{" "}
            Add Partner
          </Button>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-secondary text-white px-8 hover:bg-secondary/90 transition-colors"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default AboutPartnersModal;
