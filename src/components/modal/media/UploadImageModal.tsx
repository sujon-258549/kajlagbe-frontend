"use client";

import React from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const imageSchema = z.object({
  name: z.string().min(1, "Image name is required"),
  url: z.string().min(1, "Image is required"),
});

type ImageFormData = z.infer<typeof imageSchema>;

interface UploadImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ImageFormData) => void;
  parentId?: string | null;
}

const UploadImageModal: React.FC<UploadImageModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const form = useForm<ImageFormData>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const handleSubmit = (data: ImageFormData) => {
    onSave(data);
    form.reset();
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Image"
      description="Upload an image to this folder."
      maxWidth="md"
      footer={
        <div className="flex gap-3 justify-end w-full">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="upload-image-form"
            className="bg-secondary hover:bg-secondary/90 text-white font-bold"
          >
            Upload Image
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="upload-image-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Name</FormLabel>
                <FormControl>
                  <FormInput placeholder="e.g. Profile Photo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    {...field}
                    onValueChange={(val) => form.setValue("url", val as string)}
                  />
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

export default UploadImageModal;
