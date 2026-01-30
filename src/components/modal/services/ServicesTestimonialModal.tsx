"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ServicesTestimonialItem,
  testimonialSchema,
} from "@/schemas/services/testimonial.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/common/ImageUpload";

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
    resolver: zodResolver(testimonialSchema) as any,
    defaultValues: {
      id: undefined,
      name: "",
      role: "",
      title: "",
      content: "",
      image: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (item) {
        form.reset(item);
      } else {
        form.reset({
          id: undefined,
          name: "",
          role: "",
          title: "",
          content: "",
          image: "",
        });
      }
    }
  }, [item, isOpen, form]);

  const handleSubmit = (data: ServicesTestimonialItem) => {
    onSave(data);
    onClose();
  };

  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);

  return (
    <>
      <CommonModal
        isOpen={isOpen}
        onClose={onClose}
        title={item ? "Edit Testimonial" : "Add Testimonial"}
        description={
          item
            ? "Modify the testimonial details below."
            : "Fill in the details to add a new testimonial."
        }
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Jane Doe" {...field} />
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
                      <FormInput placeholder="Manager" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Review Title" {...field} />
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
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write the review here..."
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
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center pt-4">
              {item && onDelete ? (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setDeleteConfirmOpen(true)}
                >
                  Delete Testimonial
                </Button>
              ) : (
                <div />
              )}
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} type="button">
                  Cancel
                </Button>
                <Button type="submit" className="bg-secondary text-white">
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CommonModal>

      {/* Delete Confirmation Modal */}
      <CommonModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Delete Testimonial"
        description="Are you sure you want to delete this testimonial? This action cannot be undone."
        maxWidth="sm"
      >
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (onDelete) onDelete();
              setDeleteConfirmOpen(false);
            }}
          >
            Delete
          </Button>
        </div>
      </CommonModal>
    </>
  );
};

export default ServicesTestimonialModal;
