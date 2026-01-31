import { z } from "zod";

export const serviceSliderItemSchema = z.object({
  id: z.number(),
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  image: z.string().min(1, "Image is required"),
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
