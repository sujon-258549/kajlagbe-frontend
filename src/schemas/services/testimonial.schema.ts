import { z } from "zod";

export const ServicesTestimonialItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  title: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  image: z.string().optional(),
  imageId: z.string().optional(),
  status: z.boolean().optional(),
  order: z.number().optional(),
});

export type ServicesTestimonialItem = z.infer<
  typeof ServicesTestimonialItemSchema
>;

export const ServicesTestimonialSectionSchema = z.object({
  subtitle: z.string().min(1, "Subtitle is required"),
  title: z.string().min(1, "Title is required"),
  backgroundImage: z.string().min(1, "Background image is required"),
});

export type ServicesTestimonialSectionData = z.infer<
  typeof ServicesTestimonialSectionSchema
>;
