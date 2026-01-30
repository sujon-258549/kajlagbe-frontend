"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  aboutTestimonialItemSchema,
  AboutTestimonialItem,
} from "@/schemas/about/testimonial.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface AboutTestimonialItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: AboutTestimonialItem;
  onSave: (data: AboutTestimonialItem) => void;
  onDelete?: () => void;
}

const AboutTestimonialItemModal: React.FC<AboutTestimonialItemModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
  onDelete,
}) => {
  const form = useForm<AboutTestimonialItem>({
    resolver: zodResolver(aboutTestimonialItemSchema),
    defaultValues: {
      id: 0,
      name: "",
      role: "",
      image: "",
      rating: 5,
      content: "",
    },
  });

  useEffect(() => {
    if (item) {
      form.reset(item);
    } else {
      form.reset({
        id: Date.now(),
        name: "",
        role: "",
        image: "",
        rating: 5,
        content: "",
      });
    }
  }, [item, form, isOpen]);

  const handleSubmit = (data: AboutTestimonialItem) => {
    onSave(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? "Edit Testimonial" : "Add Testimonial"}
      description="Update testimonial details."
      showBackground={true}
      maxWidth="xl"
      footer={
        <div className="flex justify-between w-full">
          <div>
            {item && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  if (
                    confirm("Are you sure you want to delete this testimonial?")
                  ) {
                    onDelete();
                    onClose();
                  }
                }}
              >
                Delete Testimonial
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              form="testimonial-item-form"
              className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
            >
              {item ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="testimonial-item-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Reviewer Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <FormInput placeholder="e.g. CEO, Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (1-5)</FormLabel>
                <FormControl>
                  <FormInput
                    type="number"
                    min="1"
                    max="5"
                    placeholder="5"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write the testimonial here..."
                    className="h-32 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Image</FormLabel>
                <FormControl>
                  <ImageUpload {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </CommonModal>
  );
};

export default AboutTestimonialItemModal;
