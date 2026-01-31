import { z } from "zod";
import { aboutTestimonialItemSchema } from "./testimonial.schema";

export const aboutTestimonialsSchema = z.object({
  badge: z.string().min(1, "Badge text is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(5, "Description is required"),
  percentage: z.string().min(1, "Percentage is required"),
  percentageLabel: z.string().min(1, "Label is required"),
  reviewSubtitle: z.string().min(1, "Review subtitle is required"),
  reviewButtonLabel: z.string().min(1, "Button label is required"),
  items: z.array(aboutTestimonialItemSchema).optional(),
});

export type AboutTestimonialsFormData = z.infer<typeof aboutTestimonialsSchema>;
