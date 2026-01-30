import { z } from "zod";

export const blogHeroSchema = z.object({
  title: z.string().min(1, "Title is required"),
  breadcrumb: z.string().min(1, "Breadcrumb is required"),
  image: z.string().min(1, "Image is required"),
  bgImage: z.string().optional(),
});

export type BlogHeroFormData = z.infer<typeof blogHeroSchema>;
