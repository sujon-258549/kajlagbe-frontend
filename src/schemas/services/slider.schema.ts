import { z } from "zod";

export const serviceSliderItemSchema = z.object({
  id: z.any(),
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  image: z.string().min(1, "Image is required"),
  imageId: z.string().optional(),
  number: z.string().min(1, "Number is required"),
});

export const serviceSliderHeaderSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const serviceSliderSchema = serviceSliderHeaderSchema.extend({
  projects: z.array(serviceSliderItemSchema),
});

export type ServiceSliderFormData = z.infer<typeof serviceSliderSchema>;
export type ServiceSliderHeaderFormData = z.infer<
  typeof serviceSliderHeaderSchema
>;
export type ServiceSliderItem = z.infer<typeof serviceSliderItemSchema>;
