import { z } from "zod";

export const servicesBlogItemSchema = z.object({
  id: z.number().optional(),
  date: z.string().min(1, "Date is required"),
  month: z.string().min(1, "Month is required"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  image: z.string().min(1, "Image is required"),
});

export const servicesBlogHeaderSchema = z.object({
  tagline: z.string().min(1, "Tagline is required"),
  title: z.string().min(1, "Title is required"),
});

export const servicesBlogSchema = servicesBlogHeaderSchema.extend({
  blogs: z.array(servicesBlogItemSchema),
});

export type ServicesBlogItem = z.infer<typeof servicesBlogItemSchema>;
export type ServicesBlogHeaderFormData = z.infer<
  typeof servicesBlogHeaderSchema
>;
export type ServicesBlogFormData = z.infer<typeof servicesBlogSchema>;
