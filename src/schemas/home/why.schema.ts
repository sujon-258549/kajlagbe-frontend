import { z } from "zod";

export const homeWhyItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export const homeWhySectionSchema = z.object({
  badge: z.string().min(1, "Badge is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  mainImage: z.string().url("Must be a valid URL"),
  points: z.array(homeWhyItemSchema).min(1),
});

export type HomeWhyFormData = z.infer<typeof homeWhySectionSchema>;
