"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import FormTextarea from "@/components/common/FormTextarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Check, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { pricingSchema, PricingFormData } from "@/schemas/home/pricing.schema";
import { Checkbox } from "@/components/ui/checkbox";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: PricingFormData;
  onUpdate: (data: PricingFormData) => void;
  isLoading?: boolean;
}

const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
  isLoading = false,
}) => {
  const form = useForm<PricingFormData>({
    resolver: zodResolver(pricingSchema),
    defaultValues: initialData,
  });

  const { fields: planFields } = useFieldArray({
    control: form.control,
    name: "plans",
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialData);
    }
  }, [isOpen, initialData, form]);

  const onSubmit = (data: PricingFormData) => {
    onUpdate(data);
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Pricing Section"
      description="Update pricing plans and features."
      maxWidth="5xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-xl bg-slate-50/50">
            <FormField
              control={form.control as any}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <FormInput placeholder="// Our Pricing Plans" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control as any}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Choose Your Perfect Plan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control as any}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <FormTextarea rows={2} placeholder="Enter description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {planFields.map((planField, planIndex) => (
              <div key={planField.id} className="p-5 border border-gray-300 rounded-md bg-white shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <h4 className="font-bold text-secondary uppercase tracking-wider text-sm">Plan {planIndex + 1}</h4>
                  <FormField
                    control={form.control as any}
                    name={`plans.${planIndex}.recommended`}
                    render={({ field }) => (
                      <div className="flex items-center gap-2">
                        <FormLabel className="text-xs cursor-pointer">Recommended</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control as any}
                    name={`plans.${planIndex}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Plan Name</FormLabel>
                        <FormControl>
                          <FormInput size="sm" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control as any}
                    name={`plans.${planIndex}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Price (Monthly)</FormLabel>
                        <FormControl>
                          <FormInput size="sm" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <FormLabel className="text-xs font-bold block mb-2">Features</FormLabel>
                  <FeatureList planIndex={planIndex} form={form} />
                </div>

                <div className="pt-4 border-t space-y-3">
                  <FormField
                    control={form.control as any}
                    name={`plans.${planIndex}.buttonText`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Button Text</FormLabel>
                        <FormControl>
                          <FormInput size="sm" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control as any}
                    name={`plans.${planIndex}.buttonLink`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Button Link</FormLabel>
                        <FormControl>
                          <FormInput size="sm" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-secondary text-white px-10">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

const FeatureList = ({ planIndex, form }: { planIndex: number; form: any }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `plans.${planIndex}.features`,
  });

  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2 group">
          <FormField
            control={form.control as any}
            name={`plans.${planIndex}.features.${index}.included`}
            render={({ field }) => (
              <FormControl>
                <div 
                  onClick={() => field.onChange(!field.value)}
                  className={`cursor-pointer p-1 rounded-full border transition-colors ${field.value ? 'bg-secondary/10 border-secondary' : 'bg-slate-100 border-slate-200'}`}
                >
                  {field.value ? <Check className="w-2.5 h-2.5 text-secondary" /> : <X className="w-2.5 h-2.5 text-slate-300" />}
                </div>
              </FormControl>
            )}
          />
          <FormField
            control={form.control as any}
            name={`plans.${planIndex}.features.${index}.text`}
            render={({ field }) => (
              <FormControl>
                <input
                  {...field}
                  className="flex-grow text-xs border-b border-transparent hover:border-slate-200 focus:border-secondary outline-none py-0.5"
                  placeholder="Feature text..."
                />
              </FormControl>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-500 hover:bg-red-50"
            onClick={() => remove(index)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="dashed"
        size="sm"
        className="text-[10px] h-7 w-full mt-1 flex gap-2 items-center justify-center"
        onClick={() => append({ text: "", included: true })}
      >
        <Plus className="h-3 w-3 mr-1" /> Add Feature
      </Button>
    </div>
  );
};

export default PricingModal;
