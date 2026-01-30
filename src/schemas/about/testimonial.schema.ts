import { z } from "zod";

export const aboutTestimonialItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  image: z.string().min(1, "Image is required"),
  rating: z.number().min(1).max(5).default(5),
  content: z.string().min(1, "Content is required"),
});

export const aboutTestimonialSchema = z.object({
  testimonials: z.array(aboutTestimonialItemSchema),
});

export type AboutTestimonialItem = z.infer<typeof aboutTestimonialItemSchema>;
export type AboutTestimonialFormData = z.infer<typeof aboutTestimonialSchema>;
