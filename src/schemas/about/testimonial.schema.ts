import { z } from "zod";

export const aboutTestimonialItemSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  image: z.string().min(1, "Image is required"),
  rating: z.coerce.number().min(1).max(5),
  content: z.string().min(1, "Content is required"),
  videoUrl: z.string().optional(),
});

export type AboutTestimonialItem = z.infer<typeof aboutTestimonialItemSchema>;

export const aboutTestimonialSchema = z.object({
  badge: z.string().min(1, "Badge text is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  items: z.array(aboutTestimonialItemSchema),
});

export type AboutTestimonialFormData = z.infer<typeof aboutTestimonialSchema>;
