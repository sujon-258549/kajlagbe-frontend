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
  subscriptionPricingSchema,
  SubscriptionPricingFormData,
} from "@/schemas/subscription/pricing.schema";
import { Switch } from "@/components/ui/switch";

interface SubscriptionPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: SubscriptionPricingFormData;
  onUpdate: (data: SubscriptionPricingFormData) => void;
}

const SubscriptionPricingModal: React.FC<SubscriptionPricingModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<SubscriptionPricingFormData>({
    resolver: zodResolver(subscriptionPricingSchema) as any,
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "plans",
  });

  const onSubmit = (data: SubscriptionPricingFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Subscription Plans"
      description="Update your pricing strategy, plans, and features."
      showBackground={true}
      maxWidth="4xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="pricing-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update Pricing
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="pricing-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-1"
        >
          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <FormInput placeholder="e.g. Simple Pricing" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Subtitle</FormLabel>
                  <FormControl>
                    <FormInput placeholder="e.g. Choose your plan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <hr className="border-slate-100" />

          {/* Plans List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-secondary uppercase tracking-widest">
                Pricing Plans
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() =>
                  append({
                    name: "",
                    price: "",
                    period: "/month",
                    description: "",
                    features: [""],
                    isPopular: false,
                    buttonText: "Get Started",
                  })
                }
              >
                <Plus className="w-4 h-4" /> Add Plan
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6 relative group"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="absolute -top-3 -right-3 h-8 w-8 text-red-500 bg-white rounded-full border border-red-100 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name={`plans.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plan Name</FormLabel>
                          <FormControl>
                            <FormInput placeholder="e.g. Basic" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`plans.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <FormInput placeholder="e.g. $19" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`plans.${index}.period`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Period</FormLabel>
                          <FormControl>
                            <FormInput placeholder="e.g. /month" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name={`plans.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <FormInput
                              placeholder="Small description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`plans.${index}.buttonText`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Button Text</FormLabel>
                          <FormControl>
                            <FormInput placeholder="Get Started" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`plans.${index}.isPopular`}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-bold text-primary">
                          Mark as Popular Plan
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormLabel className="text-sm font-bold">
                      Plan Features
                    </FormLabel>
                    <PricingFeaturesFieldArray
                      planIndex={index}
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

const PricingFeaturesFieldArray = ({
  planIndex,
  control,
}: {
  planIndex: number;
  control: any;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `plans.${planIndex}.features`,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-center">
          <FormField
            control={control}
            name={`plans.${planIndex}.features.${index}`}
            render={({ field }) => (
              <FormItem className="flex-1 space-y-0">
                <FormControl>
                  <FormInput size="sm" placeholder="Feature..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
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
        variant="outline"
        size="sm"
        className="border-dashed border-primary/30 text-primary hover:bg-primary/5 h-9"
        onClick={() => append("")}
      >
        <Plus className="w-4 h-4 mr-2" /> Add Feature
      </Button>
    </div>
  );
};

export default SubscriptionPricingModal;
