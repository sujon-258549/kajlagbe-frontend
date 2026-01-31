"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import FormTextarea from "@/components/common/FormTextarea";
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
  homeBenefitsSchema,
  HomeBenefitsFormData,
} from "@/schemas/home/homeBenefits.schema";

interface HomeBenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: HomeBenefitsFormData;
  onUpdate: (data: HomeBenefitsFormData) => void;
}

const HomeBenefitsModal: React.FC<HomeBenefitsModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<HomeBenefitsFormData>({
    resolver: zodResolver(homeBenefitsSchema),
    defaultValues: initialData,
  });

  const left = useFieldArray({ control: form.control, name: "leftBenefits" });
  const right = useFieldArray({ control: form.control, name: "rightBenefits" });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialData);
    }
  }, [isOpen, initialData, form]);

  const onSubmit = (data: HomeBenefitsFormData) => {
    onUpdate(data);
    onClose();
  };

  const renderBenefitFields = (
    array: any,
    name: "leftBenefits" | "rightBenefits",
  ) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-secondary capitalize">
          {name.replace("Benefits", " Side")}
        </h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            array.append({ title: "", desc: "", iconName: "fa-solid fa-star" })
          }
        >
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>
      {array.fields.map((field: any, index: number) => (
        <div
          key={field.id}
          className="p-3 border rounded-lg bg-slate-50 space-y-2 relative"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => array.remove(index)}
            className="absolute top-1 right-1 h-7 w-7 text-red-500 hover:bg-red-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
          <FormField
            control={form.control}
            name={`${name}.${index}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Title</FormLabel>
                <FormControl>
                  <FormInput size="sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${name}.${index}.iconName`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">FA Icon</FormLabel>
                <FormControl>
                  <FormInput size="sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${name}.${index}.desc`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Description</FormLabel>
                <FormControl>
                  <FormTextarea rows={2} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Benefits"
      description="Update the benefits section layout and content."
      maxWidth="5xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="badge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Badge</FormLabel>
                  <FormControl>
                    <FormInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="centerImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Center Image URL</FormLabel>
                  <FormControl>
                    <FormInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Main Title</FormLabel>
                  <FormControl>
                    <FormInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar">
            {renderBenefitFields(left, "leftBenefits")}
            {renderBenefitFields(right, "rightBenefits")}
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

export default HomeBenefitsModal;
