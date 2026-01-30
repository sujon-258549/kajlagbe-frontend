import { z } from "zod";

export const ServicesTestimonialItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().min(1, "Image is required"),
});

export type ServicesTestimonialItem = z.infer<
  typeof ServicesTestimonialItemSchema
>;
