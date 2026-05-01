"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import MediaLibraryImageUploader from "@/components/common/MediaLibraryImageUploader";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  serviceEngineerItemSchema,
  ServiceEngineerItem,
} from "@/schemas/services/engineers.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ServiceEngineerItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: ServiceEngineerItem;
  onSave: (data: ServiceEngineerItem) => Promise<any>;
  onDelete?: () => void;
  isLoading?: boolean;
}

const ServiceEngineerItemModal: React.FC<ServiceEngineerItemModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
  onDelete,
  isLoading = false,
}) => {
  const form = useForm<ServiceEngineerItem>({
    resolver: zodResolver(serviceEngineerItemSchema),
    defaultValues: {
      id: 0,
      name: "",
      role: "",
      image: "",
      imageId: "",
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        ...item,
        imageId: item.imageId || "",
      });
    } else {
      form.reset({
        id: Date.now(),
        name: "",
        role: "",
        image: "",
        imageId: "",
      });
    }
  }, [item, form, isOpen]);

  const handleSubmit = async (data: ServiceEngineerItem) => {
    const success = await onSave(data);
    if (success === true) {
      onClose();
    }
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? "Edit Engineer" : "Add New Engineer"}
      description="Update engineer details."
      showBackground={true}
      maxWidth="xl"
      footer={
        <div className="flex justify-between w-full">
          <div>
            {item && onDelete && (
              <Button
                type="button"
                variant="destructive"
                disabled={isLoading}
                onClick={() => {
                  if (
                    confirm("Are you sure you want to delete this engineer?")
                  ) {
                    onDelete();
                    onClose();
                  }
                }}
              >
                Delete Engineer
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              form="engineer-item-form"
              disabled={isLoading}
              className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
            >
              {isLoading ? "Saving..." : item ? "Update Engineer" : "Add Engineer"}
            </Button>
          </div>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="engineer-item-form"
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
                    <FormInput placeholder="Engineer Name" {...field} />
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
                    <FormInput placeholder="e.g. Senior Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <MediaLibraryImageUploader 
                    value={field.value} 
                    onChange={(url, id) => {
                      field.onChange(url);
                      if (id) form.setValue("imageId", id);
                    }} 
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

export default ServiceEngineerItemModal;
