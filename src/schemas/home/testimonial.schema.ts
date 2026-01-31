import { z } from "zod";

export const homeTestimonialItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().url("Must be a valid URL"),
  rating: z.number().min(0).max(5),
});

export const homeTestimonialSectionSchema = z.object({
  badge: z.string().min(1, "Badge is required"),
  title: z.string().min(1, "Title is required"),
  googleRating: z.string().min(1, "Google rating is required"),
  mainImage: z.string().url("Must be a valid URL"),
  testimonials: z.array(homeTestimonialItemSchema).min(1),
});

export type HomeTestimonialFormData = z.infer<
  typeof homeTestimonialSectionSchema
>;
