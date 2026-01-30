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
import ImageUpload from "@/components/common/ImageUpload";

// Schema for Blog Items
export const blogItemSchema = z.object({
  id: z.number().optional(),
  date: z.string().min(1, "Date is required"),
  month: z.string().min(1, "Month is required"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  image: z.string().min(1, "Image is required"),
});

export type BlogItem = z.infer<typeof blogItemSchema>;

interface ServicesBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: BlogItem;
  onSave: (data: BlogItem) => void;
  onDelete?: () => void;
}

const ServicesBlogModal: React.FC<ServicesBlogModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
  onDelete,
}) => {
  const form = useForm<BlogItem>({
    resolver: zodResolver(blogItemSchema),
    defaultValues: {
      id: undefined,
      date: "",
      month: "",
      author: "Admin",
      category: "General",
      title: "",
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
          date: new Date().getDate().toString(),
          month: new Date().toLocaleString("default", { month: "short" }),
          author: "Admin",
          category: "General",
          title: "",
          image: "",
        });
      }
    }
  }, [item, isOpen, form]);

  const handleSubmit = (data: BlogItem) => {
    onSave(data);
    onClose();
  };

  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);

  return (
    <>
      <CommonModal
        isOpen={isOpen}
        onClose={onClose}
        title={item ? "Edit Blog Post" : "Add Blog Post"}
        description="Manage your blog content."
        showBackground={false}
        maxWidth="2xl"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Blog Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Admin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Solar" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4 col-span-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date (DD)</FormLabel>
                      <FormControl>
                        <FormInput placeholder="24" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month (MMM)</FormLabel>
                      <FormControl>
                        <FormInput placeholder="Jan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
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
                  Delete Post
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
        title="Delete Blog Post"
        description="Are you sure you want to delete this post? This action cannot be undone."
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

export default ServicesBlogModal;
