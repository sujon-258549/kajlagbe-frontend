import { z } from "zod";

export const homeBlogItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.string().url("Must be a valid URL"),
  day: z.string().min(1, "Day is required"),
  month: z.string().min(1, "Month is required"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  slug: z.string().min(1, "Slug is required"),
});

export const homeBlogSectionSchema = z.object({
  badge: z.string().min(1, "Badge is required"),
  title: z.string().min(1, "Title is required"),
  buttonText: z.string().min(1, "Button text is required"),
  posts: z.array(homeBlogItemSchema).min(1),
});

export type HomeBlogFormData = z.infer<typeof homeBlogSectionSchema>;
