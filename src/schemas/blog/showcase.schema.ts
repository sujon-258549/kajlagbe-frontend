import { z } from "zod";

export const blogShowcaseItemSchema = z.object({
  id: z.number(),
  number: z.string().min(1, "Number is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image is required"),
});

export const blogShowcaseSchema = z.object({
  items: z.array(blogShowcaseItemSchema),
});

export type BlogShowcaseFormData = z.infer<typeof blogShowcaseSchema>;
export type BlogShowcaseItem = z.infer<typeof blogShowcaseItemSchema>;
