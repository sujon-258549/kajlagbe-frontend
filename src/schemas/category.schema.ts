import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Valid URL is required").optional().or(z.literal("")),
  imageId: z.string().optional(),
  status: z.boolean(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export const subCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  categoryId: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  imageId: z.string().optional(),
  status: z.boolean(),
});

export type SubCategoryFormData = z.infer<typeof subCategorySchema>;
