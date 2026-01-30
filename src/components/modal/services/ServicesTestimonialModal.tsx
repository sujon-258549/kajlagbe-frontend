"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal"; // Adjust path if needed
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  ServicesTestimonialItemSchema,
  ServicesTestimonialItem,
} from "@/schemas/services/testimonial.schema";

interface ServicesTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: ServicesTestimonialItem;
  onSave: (data: ServicesTestimonialItem) => void;
  onDelete?: () => void;
}

const ServicesTestimonialModal: React.FC<ServicesTestimonialModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
  onDelete,
}) => {
  const form = useForm<ServicesTestimonialItem>({
    resolver: zodResolver(ServicesTestimonialItemSchema),
    defaultValues: {
      name: "",
      role: "",
      title: "",
      content: "",
      image: "",
    },
  });

  useEffect(() => {
    if (item) {
      form.reset(item);
    } else {
      form.reset({
        name: "",
        role: "",
        title: "",
        content: "",
        image: "",
      });
    }
  }, [item, form, isOpen]);

  const handleSubmit = (data: ServicesTestimonialItem) => {
    onSave(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? "Edit Testimonial" : "Add Testimonial"}
      description={
        item ? "Edit the testimonial details." : "Add a new testimonial."
      }
      showBackground={false}
      maxWidth="lg"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <FormInput placeholder="John Doe" {...field} />
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
                    <FormInput placeholder="CEO" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Great Service" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write the testimonial here..."
                    className="h-24 resize-none"
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
                <FormLabel>Author Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onValueChange={(val) => field.onChange(val)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4 border-t">
            {item && onDelete && (
              <Button type="button" variant="destructive" onClick={onDelete}>
                Delete
              </Button>
            )}
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button type="submit" className="bg-secondary text-white">
                {item ? "Save Changes" : "Add Testimonial"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default ServicesTestimonialModal;
