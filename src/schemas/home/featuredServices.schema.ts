import { z } from "zod";

export const featuredServiceItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Must be a valid URL"),
});

export const featuredServicesSchema = z.object({
  tagline: z.string().min(1, "Tagline is required"),
  mainTitle: z.string().min(1, "Main Title is required"),
  mainDescription: z.string().min(1, "Main Description is required"),
  buttonText: z.string().min(1, "Button text is required"),
  showcase: z
    .array(featuredServiceItemSchema)
    .length(6, "Exactly 6 items are required for the layout"),
});

export type FeaturedServicesFormData = z.infer<typeof featuredServicesSchema>;
