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
  contactInfoSchema,
  ContactInfoFormData,
} from "@/schemas/contact/info.schema";

interface ContactInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ContactInfoFormData;
  onUpdate: (data: ContactInfoFormData) => void;
}

const ContactInfoModal: React.FC<ContactInfoModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<ContactInfoFormData>({
    resolver: zodResolver(contactInfoSchema) as any,
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "cards",
  });

  const onSubmit = (data: ContactInfoFormData) => {
    console.log("Contact Info Updated Data:", data);
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Contact Info Cards"
      description="Update contact details like phone, email, address, and hours."
      showBackground={true}
      maxWidth="3xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="contact-info-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update Info
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="contact-info-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-1"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">
                Contact Cards
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() =>
                  append({ title: "", lines: [""], iconType: "phone" })
                }
              >
                <Plus className="w-4 h-4" /> Add Card
              </Button>
            </div>

            <div className="space-y-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4 relative group"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="absolute -top-2 -right-2 h-8 w-8 text-red-500 bg-red-50 rounded-full border border-red-200 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`cards.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Title</FormLabel>
                          <FormControl>
                            <FormInput
                              placeholder="e.g. Contact Us"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`cards.${index}.iconType`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Font Awesome Icon Class</FormLabel>
                          <FormControl>
                            <FormInput
                              placeholder="e.g. fa-solid fa-phone"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-3">
                    <FormLabel>Info Lines</FormLabel>
                    <ContactLinesFieldArray
                      cardIndex={index}
                      control={form.control}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

// Sub-component for handling lines within each card
const ContactLinesFieldArray = ({
  cardIndex,
  control,
}: {
  cardIndex: number;
  control: any;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `cards.${cardIndex}.lines`,
  });

  return (
    <div className="space-y-2 ml-4 border-l-2 border-slate-100 pl-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-center">
          <div className="flex-1">
            <FormField
              control={control}
              name={`cards.${cardIndex}.lines.${index}`}
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <FormInput
                      size="sm"
                      placeholder="Line content..."
                      {...field}
                    />
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
              className="h-8 w-8 text-slate-400 hover:text-red-500"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-primary text-xs h-7 hover:bg-primary/5"
        onClick={() => append("")}
      >
        <Plus className="w-3 h-3 mr-1" /> Add Line
      </Button>
    </div>
  );
};

export default ContactInfoModal;
