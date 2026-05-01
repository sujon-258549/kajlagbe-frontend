"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
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
import MediaLibraryImageUploader from "@/components/common/MediaLibraryImageUploader";
import {
  ServicesTestimonialItemSchema,
  ServicesTestimonialItem,
} from "@/schemas/services/testimonial.schema";

interface ServicesTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: ServicesTestimonialItem;
  onSave: (data: ServicesTestimonialItem) => Promise<any>;
  isLoading?: boolean;
}

const ServicesTestimonialModal: React.FC<ServicesTestimonialModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
  isLoading = false,
}) => {
  const form = useForm<ServicesTestimonialItem>({
    resolver: zodResolver(ServicesTestimonialItemSchema),
    defaultValues: {
      name: "",
      role: "",
      title: "",
      content: "",
      image: "",
      imageId: "",
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        ...item,
        image: item.image || "",
        imageId: item.imageId || "",
      });
    } else {
      form.reset({
        name: "",
        role: "",
        title: "",
        content: "",
        image: "",
        imageId: "",
      });
    }
  }, [item, form, isOpen]);

  const handleSubmit = async (data: ServicesTestimonialItem) => {
    const success = await onSave(data);
    if (success === true) {
      onClose();
    }
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? "Edit Testimonial" : "Add Testimonial"}
      description={
        item ? "Edit the testimonial details." : "Add a new testimonial."
      }
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
            name="imageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Image</FormLabel>
                <FormControl>
                  <MediaLibraryImageUploader
                    value={field.value}
                    onChange={(val, url) => {
                      field.onChange(val);
                      if (url) form.setValue("image", url);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-4 border-t gap-2">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-secondary text-white"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : item ? "Save Changes" : "Add Testimonial"}
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default ServicesTestimonialModal;
