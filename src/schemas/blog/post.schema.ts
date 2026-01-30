import { z } from "zod";

export const blogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().min(1, "Image is required"),
  date: z.string().min(1, "Date is required"),
  category: z.string().min(1, "Category is required"),
  authorName: z.string().min(1, "Author Name is required"),
  authorAvatar: z.string().min(1, "Author Avatar is required"),
  tags: z.string().min(1, "Tags are required (comma separated)"),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;
