"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
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
import { statsSchema, StatsFormData } from "@/schemas/home/stats.schema";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: StatsFormData;
  onUpdate: (data: StatsFormData) => void;
}

const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<StatsFormData>({
    resolver: zodResolver(statsSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "stats",
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialData);
    }
  }, [isOpen, initialData, form]);

  const onSubmit = (data: StatsFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Statistics"
      description="Update counter values and labels."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="backgroundImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image URL</FormLabel>
                <FormControl>
                  <FormInput placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border rounded-xl bg-slate-50 relative group grid grid-cols-2 gap-3"
              >
                <div className="col-span-2 flex justify-between items-center mb-2">
                  <h4 className="font-bold text-secondary">Stat {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name={`stats.${index}.iconName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>FA Icon Class</FormLabel>
                      <FormControl>
                        <FormInput placeholder="fa-solid fa-users" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`stats.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <FormInput placeholder="10k+" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`stats.${index}.label`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <FormInput placeholder="Happy Clients" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`stats.${index}.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color Theme (Tailwind classes)</FormLabel>
                      <FormControl>
                        <FormInput
                          placeholder="from-secondary to-green-600"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed border-2 py-6 rounded-xl flex gap-2"
              onClick={() =>
                append({
                  iconName: "fa-solid fa-check",
                  value: "0",
                  label: "New Stat",
                  color: "from-primary to-orange-600",
                })
              }
            >
              <Plus className="w-5 h-5" />
              <span>Add Counter</span>
            </Button>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" className="bg-secondary text-white px-8">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default StatsModal;
