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
import { Switch } from "@/components/ui/switch";
import ImageUpload from "@/components/common/ImageUpload";

// Schema for Pricing Plan
export const pricingSchema = z.object({
  plans: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      price: z.string().min(1, "Price is required"),
      features: z.array(z.string().min(1, "Feature cannot be empty")),
      recommended: z.boolean().default(false),
    }),
  ),
});

export type PricingFormData = z.infer<typeof pricingSchema>;

interface ServicesPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: PricingFormData;
  onUpdate: (data: PricingFormData) => void;
}

const ServicesPricingModal: React.FC<ServicesPricingModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<PricingFormData>({
    resolver: zodResolver(pricingSchema) as any,
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: PricingFormData) => {
    onUpdate(data);
    onClose();
  };

  const handleFeatureChange = (
    planIndex: number,
    featureIndex: number,
    value: string,
  ) => {
    const currentPlans = form.getValues("plans");
    const updatedPlans = [...currentPlans];
    updatedPlans[planIndex].features[featureIndex] = value;
    form.setValue("plans", updatedPlans);
  };

  const addFeature = (planIndex: number) => {
    const currentPlans = form.getValues("plans");
    const updatedPlans = [...currentPlans];
    updatedPlans[planIndex].features.push("");
    form.setValue("plans", updatedPlans);
  };

  const removeFeature = (planIndex: number, featureIndex: number) => {
    const currentPlans = form.getValues("plans");
    const updatedPlans = [...currentPlans];
    updatedPlans[planIndex].features.splice(featureIndex, 1);
    form.setValue("plans", updatedPlans);
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Pricing Plans"
      description="Update pricing details."
      showBackground={false}
      maxWidth="4xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 max-h-[60vh] overflow-y-auto p-1">
            {form.watch("plans").map((plan, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-gray-50 relative space-y-3"
              >
                <div className="flex justify-between items-center mb-2">
                  <FormLabel className="font-bold text-lg">
                    Plan {index + 1}
                  </FormLabel>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`plans.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Name</FormLabel>
                        <FormControl>
                          <FormInput placeholder="Standard" {...field} />
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
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <FormInput placeholder="49" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`plans.${index}.recommended`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Recommended</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Features</FormLabel>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex gap-2">
                      <FormInput
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, fIdx, e.target.value)
                        }
                        placeholder="Feature description"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFeature(index, fIdx)}
                      >
                        <span className="sr-only">Remove</span>
                        &times;
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addFeature(index)}
                    className="w-full"
                  >
                    + Add Feature
                  </Button>
                </div>
              </div>
            ))}
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

export default ServicesPricingModal;
