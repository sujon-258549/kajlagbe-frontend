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
  subscriptionBenefitsSchema,
  SubscriptionBenefitsFormData,
} from "@/schemas/subscription/benefits.schema";

interface SubscriptionBenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: SubscriptionBenefitsFormData;
  onUpdate: (data: SubscriptionBenefitsFormData) => void;
}

const SubscriptionBenefitsModal: React.FC<SubscriptionBenefitsModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<SubscriptionBenefitsFormData>({
    resolver: zodResolver(subscriptionBenefitsSchema) as any,
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "benefits",
  });

  const onSubmit = (data: SubscriptionBenefitsFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Subscription Benefits"
      description="Update why customers should choose your subscription."
      showBackground={true}
      maxWidth="3xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="benefits-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update Benefits
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="benefits-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-1"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Title</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Enter section title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Description</FormLabel>
                  <FormControl>
                    <FormInput
                      placeholder="Enter section description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <hr className="border-slate-100" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-secondary uppercase tracking-widest">
                Benefits List
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() =>
                  append({ iconType: "zap", title: "", description: "" })
                }
              >
                <Plus className="w-4 h-4" /> Add Benefit
              </Button>
            </div>

            <div className="space-y-4">
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
                      name={`benefits.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Benefit Title</FormLabel>
                          <FormControl>
                            <FormInput
                              placeholder="e.g. Eco-Friendly"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`benefits.${index}.iconType`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Font Awesome Icon Class</FormLabel>
                          <FormControl>
                            <FormInput
                              placeholder="e.g. fa-solid fa-leaf"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`benefits.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <FormInput
                            placeholder="Enter benefit description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default SubscriptionBenefitsModal;
