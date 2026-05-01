import { z } from "zod";

export const blogHeroSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  image: z.string().min(1, "Image is required"),
  imageId: z.string().optional(),
  bgImage: z.string().optional(),
  bgImageId: z.string().optional(),
});

export type BlogHeroFormData = z.infer<typeof blogHeroSchema>;
