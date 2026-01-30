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
  aboutStatsSchema,
  AboutStatsFormData,
} from "@/schemas/about/stats.schema";

interface AboutStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: AboutStatsFormData;
  onUpdate: (data: AboutStatsFormData) => void;
}

const AboutStatsModal: React.FC<AboutStatsModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<AboutStatsFormData>({
    resolver: zodResolver(aboutStatsSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (data: AboutStatsFormData) => {
    console.log("About Stats Updated Data:", data);
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit About Stats"
      description="Update the stats numbers and labels."
      showBackground={true}
      maxWidth="xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="about-stats-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update Stats
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="about-stats-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-1"
        >
          {/* Stats Items */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">
              Statistics
            </h3>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 bg-white relative group"
                >
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`items.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-semibold text-slate-500">
                            Value
                          </FormLabel>
                          <FormControl>
                            <FormInput
                              size="sm"
                              placeholder="e.g. 50+"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.label`}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-semibold text-slate-500">
                            Label
                          </FormLabel>
                          <FormControl>
                            <FormInput
                              size="sm"
                              placeholder="Label"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="h-8 w-8 text-red-500 hover:bg-red-50 shrink-0"
                    title="Remove stat"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed border"
              onClick={() => append({ value: "00", label: "New Stat" })}
            >
              <Plus className="w-4 h-4" />
              Add New Stat
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default AboutStatsModal;
