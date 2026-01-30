"use client";

import React, { useEffect } from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import ImageUpload from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  whatWeDoItemSchema,
  WhatWeDoItem,
} from "@/schemas/services/whatWeDo.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface WhatWeDoModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: WhatWeDoItem;
  onSave: (data: WhatWeDoItem) => void;
  onDelete?: () => void;
}

const WhatWeDoModal: React.FC<WhatWeDoModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
  onDelete,
}) => {
  const form = useForm<WhatWeDoItem>({
    resolver: zodResolver(whatWeDoItemSchema),
    defaultValues: {
      id: 0,
      title: "",
      number: "1",
      image: "",
    },
  });

  useEffect(() => {
    if (item) {
      form.reset(item);
    } else {
      form.reset({
        id: Date.now(),
        title: "",
        number: "",
        image: "",
      });
    }
  }, [item, form, isOpen]);

  const handleSubmit = (data: WhatWeDoItem) => {
    onSave(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? "Edit Category" : "Add Category"}
      description="Update What We Do category details."
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
                    confirm("Are you sure you want to delete this category?")
                  ) {
                    onDelete();
                    onClose();
                  }
                }}
              >
                Delete Category
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              form="what-we-do-form"
              className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
            >
              {item ? "Update Category" : "Add Category"}
            </Button>
          </div>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="what-we-do-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <FormInput placeholder="1" {...field} />
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
                    <FormInput placeholder="Category Title" {...field} />
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
                <FormLabel>Image</FormLabel>
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

export default WhatWeDoModal;
