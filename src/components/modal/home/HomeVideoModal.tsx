"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  homeVideoSectionSchema,
  HomeVideoFormData,
} from "@/schemas/home/homeVideo.schema";

interface HomeVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: HomeVideoFormData;
  onUpdate: (data: HomeVideoFormData) => void;
}

const HomeVideoModal: React.FC<HomeVideoModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) => {
  const form = useForm<HomeVideoFormData>({
    resolver: zodResolver(homeVideoSectionSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialData);
    }
  }, [isOpen, initialData, form]);

  const onSubmit = (data: HomeVideoFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Video Section"
      description="Update the background video and modal video link."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Video URL (mp4)</FormLabel>
                <FormControl>
                  <FormInput placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="posterImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poster Image URL (Fallback)</FormLabel>
                <FormControl>
                  <FormInput placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="youtubeEmbedUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>YouTube Embed URL</FormLabel>
                <FormControl>
                  <FormInput
                    placeholder="https://www.youtube.com/embed/..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="buttonText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button Text</FormLabel>
                <FormControl>
                  <FormInput placeholder="Watch Video" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" className="bg-secondary text-white px-8">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default HomeVideoModal;
