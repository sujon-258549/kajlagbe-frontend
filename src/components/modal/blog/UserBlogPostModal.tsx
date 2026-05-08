"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import ImageUpload from "@/components/common/ImageUpload";
import RichTextEditor from "@/components/common/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { uploadToCloudinary } from "@/lib/imageUpload";
import {
  blogPostSchema,
  BlogPostFormData,
} from "@/schemas/blog/post.schema";

interface UserBlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: BlogPostFormData;
  onUpdate: (data: BlogPostFormData) => void;
  onDelete?: () => void;
  isNew?: boolean;
  isLoading?: boolean;
}

const emptyValues: BlogPostFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image: "",
  imageId: "",
  category: "",
  tags: "",
};

const UserBlogPostModal: React.FC<UserBlogPostModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
  onDelete,
  isNew = false,
  isLoading = false,
}) => {
  const form = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: emptyValues,
  });

  // Local file state — kept out of the schema so users can replace without reuploading on every render
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const data = initialData as Record<string, unknown> | undefined;
    setPendingFile(null);
    form.reset(
      data
        ? {
            ...emptyValues,
            ...(initialData as BlogPostFormData),
            image:
              (data?.cover as { url?: string } | undefined)?.url ||
              (data?.image as string | undefined) ||
              "",
            imageId: "",
          }
        : emptyValues,
    );
  }, [isOpen, initialData, form]);

  const onSubmit = async (data: BlogPostFormData) => {
    let imageUrl = data.image || "";

    if (pendingFile) {
      setUploading(true);
      try {
        imageUrl = await uploadToCloudinary(pendingFile);
      } catch {
        toast.error("Image upload failed");
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    onUpdate({ ...data, image: imageUrl, imageId: undefined });
    onClose();
  };

  const submitting = isLoading || uploading;

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={isNew ? "Add New Blog Post" : "Edit Blog Post"}
      description="Fill in the details for the blog post."
      maxWidth="4xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 border border-gray-300 p-4 rounded-md bg-slate-50/50">
            {/* Cover image — full width on top */}
            <Controller
              control={form.control}
              name="image"
              render={({ field, fieldState }) => (
                <FormItem className="w-full">
                  <FormLabel>Blog Cover Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      error={fieldState.error}
                      className="aspect-auto h-48 w-full"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setPendingFile(file);
                      }}
                      onValueChange={(val) => {
                        if (typeof val === "string") field.onChange(val);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Two-column field grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <FormInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <FormInput {...field} />
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
                      <FormInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma separated)</FormLabel>
                    <FormControl>
                      <FormInput
                        placeholder="plastic, eco, nature"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Excerpt (Summary)</FormLabel>
                    <FormControl>
                      <FormInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Blog Content</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-3 pt-6 border-t">
            {onDelete && !isNew ? (
              <Button
                variant="destructive"
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                type="button"
                disabled={submitting}
              >
                Delete
              </Button>
            ) : (
              <div />
            )}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                type="button"
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
                disabled={submitting}
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {uploading
                  ? "Uploading..."
                  : isLoading
                    ? isNew
                      ? "Adding..."
                      : "Saving..."
                    : isNew
                      ? "Add Post"
                      : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default UserBlogPostModal;
