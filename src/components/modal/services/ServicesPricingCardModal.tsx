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

// Schema for Single Pricing Plan
export const pricingCardSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  features: z.array(z.string().min(1, "Feature cannot be empty")),
  recommended: z.boolean().default(false),
});

export type PricingCardFormData = z.infer<typeof pricingCardSchema>;

interface ServicesPricingCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: PricingCardFormData;
  onUpdate: (data: PricingCardFormData) => void;
}

const ServicesPricingCardModal: React.FC<ServicesPricingCardModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<PricingCardFormData>({
    resolver: zodResolver(pricingCardSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: PricingCardFormData) => {
    onUpdate(data);
    onClose();
  };

  const handleFeatureChange = (featureIndex: number, value: string) => {
    const currentFeatures = form.getValues("features");
    const updatedFeatures = [...currentFeatures];
    updatedFeatures[featureIndex] = value;
    form.setValue("features", updatedFeatures);
  };

  const addFeature = () => {
    const currentFeatures = form.getValues("features");
    const updatedFeatures = [...currentFeatures, ""];
    form.setValue("features", updatedFeatures);
  };

  const removeFeature = (featureIndex: number) => {
    const currentFeatures = form.getValues("features");
    const updatedFeatures = [...currentFeatures];
    updatedFeatures.splice(featureIndex, 1);
    form.setValue("features", updatedFeatures);
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Pricing Card"
      description="Update individual pricing plan details."
      showBackground={false}
      maxWidth="lg"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
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
                name="price"
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
              name="recommended"
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
              {form.watch("features").map((feature, fIdx) => (
                <div key={fIdx} className="flex gap-2">
                  <FormInput
                    value={feature}
                    onChange={(e) => handleFeatureChange(fIdx, e.target.value)}
                    placeholder="Feature description"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFeature(fIdx)}
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
                onClick={addFeature}
                className="w-full"
              >
                + Add Feature
              </Button>
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

export default ServicesPricingCardModal;
