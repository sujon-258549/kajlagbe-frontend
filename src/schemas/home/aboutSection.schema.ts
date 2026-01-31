import { z } from "zod";

export const aboutSectionSchema = z.object({
  badge: z.string().min(1, "Badge is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Must be a valid URL"),
  points: z.array(z.string()).min(1, "At least one point is required"),
  rating: z.string().min(1, "Rating is required"),
  buttonText: z.string().min(1, "Button text is required"),
});

export type AboutSectionFormData = z.infer<typeof aboutSectionSchema>;
