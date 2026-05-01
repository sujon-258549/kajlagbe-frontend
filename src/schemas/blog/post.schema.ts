import { z } from "zod";

export const blogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  image: z.string().min(1, "Image is required"),
  imageId: z.string().optional(),
  date: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  authorName: z.string().optional(),
  authorAvatar: z.string().optional(),
  tags: z.string().optional(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;
