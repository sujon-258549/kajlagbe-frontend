import { z } from "zod";

export const heroSlideSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Must be a valid URL"),
  buttonText: z.string().min(1, "Button text is required"),
});

export const heroSchema = z.object({
  slides: z.array(heroSlideSchema).min(1, "At least one slide is required"),
});

export type HeroFormData = z.infer<typeof heroSchema>;
export type HeroSlide = z.infer<typeof heroSlideSchema>;
