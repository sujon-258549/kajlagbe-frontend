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
import {
  contactMarqueeSchema,
  ContactMarqueeFormData,
} from "@/schemas/contact/marquee.schema";

interface ContactMarqueeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ContactMarqueeFormData;
  onUpdate: (data: ContactMarqueeFormData) => void;
}

const ContactMarqueeModal: React.FC<ContactMarqueeModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<ContactMarqueeFormData>({
    resolver: zodResolver(contactMarqueeSchema) as any,
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items" as any,
  });

  const onSubmit = (data: ContactMarqueeFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Marquee Ticker"
      description="Update the scrolling text items shown on the contact page."
      showBackground={true}
      maxWidth="xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="contact-marquee-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update Ticker
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="contact-marquee-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-1"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel className="text-sm font-bold text-secondary uppercase tracking-wider">
                Ticker Items
              </FormLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => append("")}
              >
                <Plus className="w-4 h-4" /> Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`items.${index}`}
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <FormControl>
                            <FormInput placeholder="Item text..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="h-9 w-9 text-red-500 bg-red-50 hover:bg-red-100 rounded-md border border-red-100"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default ContactMarqueeModal;
