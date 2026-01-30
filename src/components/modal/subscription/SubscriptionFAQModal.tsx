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
import ImageUpload from "@/components/common/ImageUpload";
import {
  subscriptionFAQSchema,
  SubscriptionFAQFormData,
} from "@/schemas/subscription/faq.schema";

interface SubscriptionFAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: SubscriptionFAQFormData;
  onUpdate: (data: SubscriptionFAQFormData) => void;
}

const SubscriptionFAQModal: React.FC<SubscriptionFAQModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<SubscriptionFAQFormData>({
    resolver: zodResolver(subscriptionFAQSchema) as any,
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "faqs",
  });

  const onSubmit = (data: SubscriptionFAQFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit FAQ & Video"
      description="Update your frequently asked questions and marketing video."
      showBackground={true}
      maxWidth="4xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="faq-form"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            Update Section
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="faq-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-1"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: FAQ Settings */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-secondary uppercase tracking-widest border-b pb-2">
                Questions & Answers
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Title</FormLabel>
                      <FormControl>
                        <FormInput placeholder="FAQ Title" {...field} />
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
                      <FormLabel>Main Hint</FormLabel>
                      <FormControl>
                        <FormInput placeholder="Hint text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 relative group"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="absolute -top-2 -right-2 h-7 w-7 text-red-500 bg-white rounded-full border border-red-100 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>

                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name={`faqs.${index}.question`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <FormInput placeholder="Question" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`faqs.${index}.answer`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <textarea
                                {...field}
                                className="w-full min-h-[60px] p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all text-xs"
                                placeholder="Answer"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full border-dashed"
                  onClick={() => append({ question: "", answer: "" })}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add FAQ
                </Button>
              </div>
            </div>

            {/* Right: Video Settings */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-secondary uppercase tracking-widest border-b pb-2">
                Video Settings
              </h3>

              <FormField
                control={form.control}
                name="videoThumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        isSingle={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube Video URL / ID</FormLabel>
                    <FormControl>
                      <FormInput placeholder="e.g. S4L8T2kFFn4" {...field} />
                    </FormControl>
                    <FormMessage className="text-[10px]">
                      Tip: Use the ID after &apos;v=&apos; in the URL.
                    </FormMessage>
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="videoLabel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Label</FormLabel>
                      <FormControl>
                        <FormInput placeholder="Label text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="videoDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Short Description</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          className="w-full min-h-[60px] p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all text-sm"
                          placeholder="Short description..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default SubscriptionFAQModal;
