"use client";

import React from "react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
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

const folderSchema = z.object({
  name: z.string().min(1, "Folder name is required"),
});

type FolderFormData = z.infer<typeof folderSchema>;

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string }) => void;
  parentId?: string | null;
}

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const form = useForm<FolderFormData>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = (data: FolderFormData) => {
    onSave(data);
    form.reset();
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Folder"
      description="Enter a name for your new folder."
      maxWidth="md"
      footer={
        <div className="flex gap-3 justify-end w-full">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-folder-form"
            className="bg-secondary hover:bg-secondary/90 text-white font-bold"
          >
            Create Folder
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="create-folder-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Folder Name</FormLabel>
                <FormControl>
                  <FormInput placeholder="e.g. Project Assets" {...field} />
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

export default CreateFolderModal;
